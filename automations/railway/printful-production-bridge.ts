// Printful Production Bridge — READ-ONLY readiness validation. Do not publish, sync, order, or spend.
// Restricted to merchant's selected Shopify shop and Supabase project.
const SHOP="kefuqu-mv.myshopify.com";
const DB="https://ujkizgblscqcejghxemb.supabase.co";
const env=(key:string)=>Bun.env[key]?.trim() || "";
async function getJson(url:string,headers:Record<string,string>){
 const response=await fetch(url,{method:"GET",headers,signal:AbortSignal.timeout(25000)});
 const data=await response.json().catch(()=>null) as Record<string,unknown>|null;
 if(!response.ok)throw Error("Provider API returned HTTP "+response.status+" for "+new URL(url).pathname);
 if(!data)throw Error("Provider JSON response invalid");
 return data;
}
async function audit(){
 const printfulToken=env("PRINTFUL_API_TOKEN");
 if(!printfulToken){console.log("PRINTFUL_TOKEN_REQUIRED: Add private token with sync_products/read scope to Railway Variables; Shopify app installation alone does not authorize the Printful API.");return;}
 const headers:Record<string,string>={Authorization:"Bearer "+printfulToken};
 const stores=await getJson("https://api.printful.com/stores",headers);
 const storeRecords=Array.isArray(stores.result)?stores.result as Array<Record<string,unknown>>:[];
 const relevant=storeRecords.filter(s=>{
  const fields=JSON.stringify({name:s.name,website:s.website,url:s.url});
  return fields.toLowerCase().includes("kefuqu-mv");
 });
 let storeId=env("PRINTFUL_STORE_ID");
 if(!storeId){
  if(relevant.length!==1){
   console.log(JSON.stringify({status:"PRINTFUL_STORE_SELECTION_REQUIRED",accessibleStoreCount:storeRecords.length,matchingStoreCount:relevant.length,
    instruction:"Set PRINTFUL_STORE_ID to the verified store ID for kefuqu-mv.myshopify.com; no writes performed."}));
   return;
  }
  storeId=String(relevant[0].id);
 }
 const matched=storeRecords.some(x=>String(x.id)===storeId && (JSON.stringify({name:x.name,url:x.url,website:x.website}).toLowerCase().includes("kefuqu-mv")));
 if(!matched){
  console.log(JSON.stringify({status:"PRINTFUL_STORE_MISMATCH",storeIdVerified:false,accessibleStores:storeRecords.length,
   instruction:"Verify the Printful Store ID matches Shopify domain kefuqu-mv.myshopify.com before using this bridge."}));
  return;
 }
 headers["X-PF-Store-Id"]=storeId;
 const products=await getJson("https://api.printful.com/sync/products?limit=100",headers);
 const rows=Array.isArray(products.result)?products.result as Array<Record<string,unknown>>:[];
 const stats={
  status:"PRINTFUL_READ_ONLY_REVIEW",
  merchantShop:SHOP,
  printfulStoreVerified:true,
  providerSyncedProducts:rows.length,
  synced:rows.filter(x=>Number(x.synced)>0).length,
  unsynced:rows.filter(x=>Number(x.synced)===0).length,
  moreProviderPages:Number((products.paging as Record<string,unknown>|undefined)?.total||0)>rows.length,
  noMutations:true,
 };
 const key=env("JORDI_SHOPIFY_SUPABASE_SECRET_KEY");
 if(key){
  const h:Record<string,string>={apikey:key,"Content-Type":"application/json",Prefer:"return=minimal"};
  if(!key.startsWith("sb_secret_"))h.Authorization="Bearer "+key;
  const response=await fetch(DB+"/rest/v1/commerce_events",{
   method:"POST",headers:h,
   body:JSON.stringify({agent:"Printful Production Bridge",action:"Read-only verified Printful store sync audit",result:"Provider has "+stats.providerSyncedProducts+" imported/sync products; synced="+stats.synced+", unsynced="+stats.unsynced+". No products published or ordered."}),
   signal:AbortSignal.timeout(20000)
  });
  if(!response.ok)throw Error("Supabase audit event failed HTTP "+response.status);
 }
 console.log(JSON.stringify(stats));
}
try{await audit()}catch(e){console.error("PRINTFUL_BRIDGE_ERROR: "+(e instanceof Error?e.message:"unknown"));process.exitCode=1}
