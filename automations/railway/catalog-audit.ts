// 366 Shopify Automation | scheduled catalog review only: no publishing, spending or fulfillment.
const shop="kefuqu-mv.myshopify.com", sb="https://ujkizgblscqcejghxemb.supabase.co";
const E=(n:string)=>Bun.env[n]?.trim()||"";
type Variant={price:string};type P={title:string;status:string;featuredImage:{url:string}|null;variants:{nodes:Variant[]}};
async function token(){
 if(E("SHOPIFY_ACCESS_TOKEN"))return E("SHOPIFY_ACCESS_TOKEN");
 const id=E("SHOPIFY_CLIENT_ID"),secret=E("SHOPIFY_CLIENT_SECRET");
 if(!id||!secret)throw Error("Shopify credentials missing.");
 const r=await fetch("https://"+shop+"/admin/oauth/access_token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({grant_type:"client_credentials",client_id:id,client_secret:secret}),signal:AbortSignal.timeout(20000)});
 if(!r.ok)throw Error("Shopify token exchange HTTP "+r.status);
 const j=await r.json() as {access_token?:string};if(!j.access_token)throw Error("No Shopify token");return j.access_token;
}
async function sbFetch(path:string,key:string,method="GET",body?:unknown){
 const headers:Record<string,string>={apikey:key,"Content-Type":"application/json"};
 if(!key.startsWith("sb_secret_"))headers.Authorization="Bearer "+key;
 if(method==="POST")headers.Prefer="return=minimal";
 const r=await fetch(sb+"/rest/v1/"+path,{method,headers,body:body===undefined?undefined:JSON.stringify(body),signal:AbortSignal.timeout(20000)});
 if(!r.ok)throw Error("Supabase HTTP "+r.status);
 return r;
}
async function main(){
 if(E("SHOPIFY_SHOP")&&E("SHOPIFY_SHOP")!=="kefuqu-mv")throw Error("Shop target mismatch");
 const key=E("JORDI_SHOPIFY_SUPABASE_SECRET_KEY"),hasShop=Boolean(E("SHOPIFY_ACCESS_TOKEN")||(E("SHOPIFY_CLIENT_ID")&&E("SHOPIFY_CLIENT_SECRET")));
 if(!key||!hasShop){console.log(JSON.stringify({status:"SETUP_REQUIRED",supabase:Boolean(key),shopify:hasShop}));return;}
 const q='query { shop { currencyCode } products(first:100,query:"tag:barangay-sidekick-apparel") { nodes { title status featuredImage { url } variants(first:10) { nodes { price } } } pageInfo { hasNextPage } } }';
 const r=await fetch("https://"+shop+"/admin/api/2026-10/graphql.json",{method:"POST",headers:{"Content-Type":"application/json","X-Shopify-Access-Token":await token()},body:JSON.stringify({query:q}),signal:AbortSignal.timeout(25000)});
 if(!r.ok)throw Error("Shopify catalog HTTP "+r.status);
 const data=await r.json() as {data?:{shop:{currencyCode:string};products:{nodes:P[];pageInfo:{hasNextPage:boolean}}};errors?:unknown[]};
 if(data.errors?.length||!data.data?.products)throw Error("Shopify catalog GraphQL failed");
 const items=data.data.products.nodes;
 const flags=items.flatMap(p=>[p.status!=="DRAFT"?"LIVE_REVIEW_REQUIRED":"",!p.featuredImage?"MISSING_ARTWORK":"",p.variants.nodes.some(v=>Number(v.price)<=0)?"UNPRICED":""].filter(Boolean).map(f=>p.title+": "+f));
 const summary="Audited "+items.length+" Sidekick items in "+data.data.shop.currencyCode+"; review flags="+flags.length+"; no publishing or spend.";
 await sbFetch("commerce_events",key,"POST",{agent:"Railway Catalog Agent",action:"Scheduled read-only catalog audit",result:summary});
 if(items.length){
  const d=new Date(),monday=new Date(Date.UTC(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate()));monday.setUTCDate(monday.getUTCDate()-((monday.getUTCDay()+6)%7));
  const title="Barangay Sidekick weekly preview — "+monday.toISOString().slice(0,10);
  const exists=await (await sbFetch("commerce_promotions?select=id&title=eq."+encodeURIComponent(title),key)).json() as unknown[];
  if(!exists.length)await sbFetch("commerce_promotions",key,"POST",{title,kind:"product_launch",channel:"Draft — not scheduled",destination_url:"",notes:("Review before publishing. Represent Your Barangay! Products: "+items.map(x=>x.title).join(", ")+". Missing: "+flags.join("; ")+". Must approve garment art, pricing, supplier and availability before any campaign.").slice(0,1190),planned_budget_usd:0,status:"draft"});
 }
 console.log(JSON.stringify({status:"COMPLETE",scanned:items.length,flags,currency:data.data.shop.currencyCode,truncated:data.data.products.pageInfo.hasNextPage,spent:0,published:0}));
}
try{await main()}catch(e){console.error("AUDIT FAILED: "+(e instanceof Error?e.message:"Unknown"));process.exitCode=1}
