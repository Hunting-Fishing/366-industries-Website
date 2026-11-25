import sharp from "sharp";
import opentype from "opentype.js";

const SUPABASE = "https://ujkizgblscqcejghxemb.supabase.co";
const BUCKET = "barangay-sidekick-merch";
const source = "https://cdn.shopify.com/s/files/1/0842/6782/7426/files/barangay-sidekick-approved-logo.webp?v=1795612938";
const key = Bun.env.JORDI_SHOPIFY_SUPABASE_SECRET_KEY || "";
if (!key) {
  console.log("SIDEKICK_ART_GENERATOR: SETUP_REQUIRED — supply JORDI_SHOPIFY_SUPABASE_SECRET_KEY.");
} else {
  const response = await fetch(source, {signal:AbortSignal.timeout(30000)});
  if (!response.ok) throw new Error("Approved logo source unavailable: HTTP " + response.status);
  const logoBytes = Buffer.from(await response.arrayBuffer());
  const meta = await sharp(logoBytes).metadata();
  if (!meta.width || !meta.height || meta.width < 500) throw new Error("Logo source too small.");
  console.log("SOURCE_LOGO", meta.width, meta.height, "approved original proportions");

  const output = [];
  const headers = {apikey:key,"Content-Type":"image/png",...(key.startsWith("sb_secret_")?{}:{Authorization:"Bearer "+key})};
  async function upload(path:string,bytes:Buffer) {
    const r = await fetch(SUPABASE + "/storage/v1/object/" + BUCKET + "/" + path,{
      method:"POST",headers:{...headers,"x-upsert":"true","cache-control":"3600"},body:bytes,signal:AbortSignal.timeout(30000)
    });
    if (!r.ok) {const detail=(await r.text()).slice(0,300);throw new Error("Upload "+path+" failed HTTP "+r.status+" "+detail);}
    output.push({path, bytes:bytes.length, url:SUPABASE+"/storage/v1/object/public/"+BUCKET+"/"+path});
    console.log("ASSET_UPLOADED",path,bytes.length);
  }
  async function scaledLogo(width:number) {
    return sharp(logoBytes).resize({width,withoutEnlargement:false,fit:"inside"}).png().toBuffer();
  }

  // Railway's function image has no installed fonts, so draw Open Font License
  // glyphs as SVG vector paths. No font files are embedded in customer outputs.
  const fontResponse = await fetch(
    "https://raw.githubusercontent.com/google/fonts/main/ofl/anton/Anton-Regular.ttf",
    {signal:AbortSignal.timeout(30000)}
  );
  if (!fontResponse.ok) throw new Error("OFL font fetch failed: "+fontResponse.status);
  const fontBinary = await fontResponse.arrayBuffer();
  if(fontBinary.byteLength < 40000) throw new Error("Unexpected OFL font size");
  const font = opentype.parse(fontBinary);
  console.log("VECTOR_FONT_LOADED",font.names?.fullName?.en || "Anton");

  function svg(width:number,height:number,inner:string) {
    return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${inner}</svg>`);
  }
  function textPath(line:string,centerX:number,y:number,targetSize:number,color="#0d3d71",maxWidth=4150,strokeWidth=13) {
    let size = targetSize;
    for (let i=0;i<14 && font.getAdvanceWidth(line,size)>maxWidth;i++) size *= 0.91;
    const width = font.getAdvanceWidth(line,size);
    const path = font.getPath(line,centerX-width/2,y,size,{kerning:true});
    const data = path.toPathData(2);
    if (!data || data.length < 100) throw new Error("Blank lettering paths for "+line);
    return `<path d="${data}" fill="${color}" stroke="#ffffff" stroke-width="${strokeWidth}" stroke-linejoin="round" paint-order="stroke"/>`;
  }
  function linesSvg(lines:string[],startY:number,fontsize:number,fill="#09356c") {
    return lines.map((line,i)=>textPath(line,2250,startY+i*fontsize*1.2,fontsize,fill)).join("");
  }
  const designs: Array<{name:string;lines:string[];font:number}> = [
    {name:"official-logo",lines:[],font:250},
    {name:"proud-of-my-barangay",lines:["PROUD OF MY","BARANGAY"],font:340},
    {name:"bayanihan-in-action",lines:["BAYANIHAN","IN ACTION"],font:340},
    {name:"sidekick-crew",lines:["SIDEKICK","CREW"],font:410},
    {name:"together-we-rise",lines:["TOGETHER","WE RISE"],font:385},
    {name:"neighbors-helping-neighbors",lines:["NEIGHBORS HELPING","NEIGHBORS"],font:275},
    {name:"local-heart-global-spirit",lines:["LOCAL HEART.","GLOBAL SPIRIT."],font:280},
    {name:"kumusta-ask-me",lines:["KUMUSTA?","ASK ME ABOUT","MY BARANGAY"],font:285},
    {name:"community-champions",lines:["COMMUNITY","CHAMPIONS"],font:340},
    {name:"future-sidekick",lines:["FUTURE","SIDEKICK"],font:395},
    {name:"one-community-many-stories",lines:["ONE COMMUNITY.","MANY STORIES."],font:280},
    {name:"good-morning-barangay",lines:["GOOD MORNING,","BARANGAY!"],font:300}
  ];
  const logoForPrint = await scaledLogo(1750);
  const mPrint = await sharp(logoForPrint).metadata();
  const xPrint=Math.round((4500-mPrint.width!)/2), yPrint=1220;
  for (const design of designs) {
    const art=svg(4500,5400,linesSvg(design.lines,design.lines.length>2?2820:2950,design.font));
    const png=await sharp(art).ensureAlpha().composite([{input:logoForPrint,left:xPrint,top:yPrint}]).png({compressionLevel:8}).withMetadata({density:300}).toBuffer();
    await upload("print/v2/"+design.name+"-4500x5400.png",png);
  }
  const kinds = [
    {name:"tshirt",label:"Official Logo Tee",base:"#0e2547",logo:{w:430,x:385,y:500}, shape:`<path d="M350 290 L455 250 L745 250 L850 290 L1060 390 L965 570 L838 520 L838 1000 L362 1000 L362 520 L235 570 L140 390Z" fill="#0e2547" stroke="#477aab" stroke-width="7"/>`},
    {name:"hoodie",label:"Sidekick Hoodie",base:"#0a2b50",logo:{w:395,x:402,y:500}, shape:`<path d="M400 300 Q600 185 800 300 L950 360 L1040 910 L880 950 L830 510 L830 1000 L370 1000 L370 510 L320 950 L160 910 L250 360Z" fill="#0a2b50" stroke="#477aab" stroke-width="7"/><path d="M430 300 Q600 100 770 300 Q680 430 600 435 Q510 430 430 300" fill="#183962" stroke="#5484b9" stroke-width="6"/><path d="M475 775 L725 775 L735 890 L465 890Z" fill="#102840" stroke="#477aab" stroke-width="5"/>`},
    {name:"cap",label:"Sidekick Headwear",base:"#0e2547",logo:{w:345,x:428,y:520},shape:`<path d="M210 620 Q230 375 600 370 Q950 375 990 620 Q750 705 270 650Z" fill="#122e54" stroke="#4a79a2" stroke-width="8"/><path d="M300 650 Q650 590 1080 655 Q995 770 600 752 Q365 735 300 650Z" fill="#0c2443" stroke="#4a79a2" stroke-width="7"/>`},
    {name:"mug",label:"Sidekick Mug",base:"#ffffff",logo:{w:450,x:290,y:525},shape:`<ellipse cx="525" cy="928" rx="320" ry="33" fill="#c9d9ea" opacity=".40"/><path d="M250 350 L840 350 L805 900 Q525 990 280 900Z" fill="#ffffff" stroke="#91abc6" stroke-width="9"/><path d="M833 465 Q1090 420 1060 650 Q1020 785 823 705" fill="none" stroke="#91abc6" stroke-width="60"/>`},
    {name:"tote",label:"Sidekick Tote Bag",base:"#eadbc4",logo:{w:460,x:370,y:560},shape:`<path d="M320 340 L875 340 L1000 1000 L200 1000Z" fill="#e7d9bf" stroke="#ac9978" stroke-width="7"/><path d="M455 355 Q445 125 600 125 Q755 125 745 355" stroke="#ac9978" stroke-width="37" fill="none"/>`},
    {name:"notebook",label:"Sidekick Notebook",base:"#1d5a96",logo:{w:440,x:390,y:560},shape:`<path d="M235 245 H970 V1010 H235Z" fill="#144e88" stroke="#153960" stroke-width="8"/><path d="M275 245 V1010" stroke="#d9e8f3" stroke-width="16"/>`},
    {name:"poster",label:"Sidekick Poster",base:"#fefcf6",logo:{w:565,x:312,y:490},shape:`<rect x="250" y="275" width="700" height="705" rx="5" fill="#faf8f3" stroke="#3f5566" stroke-width="30"/><rect x="293" y="318" width="614" height="620" fill="#e8f6ff"/>`},
    {name:"kids",label:"Little Sidekick Tee",base:"#ffffff",logo:{w:400,x:400,y:550},shape:`<path d="M380 320 L455 300 L740 300 L815 320 L1000 410 L895 570 L820 520 L820 955 L380 955 L380 520 L305 570 L200 410Z" fill="#fdfdfd" stroke="#aebed0" stroke-width="8"/>`}
  ];
  for(const obj of kinds){

    const inner=`<rect width="1200" height="1200" fill="#f4f8fc"/>${textPath("BARANGAY SIDEKICK",600,110,52,"#073564",1080,4)}${textPath(obj.label,600,164,28,"#1a507e",1020,2)}<ellipse cx="600" cy="1020" rx="390" ry="32" fill="#abc1d9" opacity=".30"/>${obj.shape}${textPath("DESIGN CONCEPT - NOT SUPPLIER MOCKUP",600,1100,26,"#34566f",1020,1)}`;
    const layer=await scaledLogo(obj.logo.w);
    const back=await sharp(svg(1200,1200,inner)).png().toBuffer();
    const result=await sharp(back).composite([{input:layer,left:obj.logo.x,top:obj.logo.y}]).png({compressionLevel:8}).toBuffer();
    await upload("mockups/v2/"+obj.name+"-concept.png",result);
  }
  console.log("SIDEKICK_ART_GENERATOR: SUCCESS "+output.length+" public review-only PNG assets");
}
