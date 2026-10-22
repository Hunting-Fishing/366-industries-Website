"use client";

import {useEffect,useState} from "react";
import type {CSSProperties} from "react";

type Promotion = {
 id:string;title:string;kind:string;channel:string;destination_url:string;
 notes:string;planned_budget_usd:number;status:string;created_at:string;
};
type WorkItem = {
 id:string;title:string;area:string;notes:string;priority:string;status:string;created_at:string;
};
type Snapshot = {
 ok:boolean;configured:boolean;promotions:Promotion[];workItems:WorkItem[];message?:string;
};
const card:CSSProperties={
 background:"#102337",border:"1px solid #2b425d",
 borderRadius:18,padding:22,
};
const field:CSSProperties={
 background:"#081a2b",color:"#f3f8ff",border:"1px solid #3e5970",
 borderRadius:10,font:"inherit",padding:"11px 13px",width:"100%",boxSizing:"border-box",
};
const button:CSSProperties={
 cursor:"pointer",border:"1px solid #54bba6",background:"#2ac4a0",
 color:"#071a23",borderRadius:9,fontWeight:800,padding:"10px 14px",
};
const kinds=[["social","Social media"],["affiliate","Affiliate link"],["sponsorship","Sponsorship"],
 ["paid_ad","Paid advertising"],["product_launch","Product launch"],["other","Other promotion"]] as const;
const areas=[["store_setup","Store setup"],["automation","AI & bots"],["sourcing","Suppliers"],
 ["design","Design & IP"],["marketing","Marketing"],["books","Books"],["integrations","Integrations"],
 ["operations","Operations"]] as const;
const promotionStates=["idea","draft","ready","running","finished"] as const;
const taskStates=["backlog","in_progress","done"] as const;
function human(s:string){return s.replaceAll("_"," ").replace(/\b\w/g,c=>c.toUpperCase());}

export function JordiWorkspaceTracker() {
 const [data,setData]=useState<Snapshot|null>(null);
 const [message,setMessage]=useState("");
 const [error,setError]=useState("");
 const [pending,setPending]=useState(false);
 const [promo,setPromo]=useState({
   recordType:"promotion",title:"",kind:"social",channel:"",destination_url:"",
   notes:"",planned_budget_usd:0,
 });
 const [task,setTask]=useState({
   recordType:"task",title:"",area:"store_setup",priority:"normal",notes:"",
 });
 async function refresh() {
   try {
     const res=await fetch("/api/admin/jordi-workspace",{cache:"no-store"});
     const json=await res.json() as Snapshot;
     if (!res.ok||!json.ok)throw Error(json.message||"Unable to retrieve workspace.");
     setData(json);
   } catch(e){setError(e instanceof Error?e.message:"Workspace retrieval failed.");}
 }
 useEffect(()=>{void refresh();},[]);
 async function change(method:"POST"|"PATCH",body:Record<string,unknown>) {
   setPending(true);setError("");setMessage("");
   try {
     const res=await fetch("/api/admin/jordi-workspace",{
       method,headers:{"Content-Type":"application/json"},body:JSON.stringify(body),
     });
     const json=await res.json() as {ok:boolean;message?:string};
     if(!res.ok||!json.ok)throw Error(json.message||"Unable to save.");
     await refresh();
     setMessage(method==="POST"?"Saved to your private 366 Industries workspace.":"Tracking status updated.");
     return true;
   } catch(e) {setError(e instanceof Error?e.message:"Save failed.");return false;}
   finally{setPending(false);}
 }
 return <div style={{display:"grid",gap:16,marginBottom:22}}>
  <section style={{
   ...card,border:"1px solid #4ec4ad",
   background:"linear-gradient(125deg,#114e52,#112840 60%,#142342)",
  }}>
   <div style={{fontSize:12,letterSpacing:2,fontWeight:900,color:"#8dfbe0"}}>366 INDUSTRIES / PRIVATE BUSINESS WORKSPACE</div>
   <h1 style={{fontSize:"clamp(31px,4vw,46px)",letterSpacing:-1,margin:"12px 0 6px"}}>Jordi Shopify &amp; Promotions</h1>
   <p style={{lineHeight:1.7,maxWidth:900,color:"#c5dbe7"}}>
     Your personal planning and operations section within 366 Industries.
     Track your store build, AI agents, artwork, suppliers, affiliate partnerships,
     promotional campaigns, books, and original creations together.
     All workspace actions require your signed owner login.
   </p>
   <div style={{display:"flex",gap:10,flexWrap:"wrap",fontSize:12}}>
     <span style={{border:"1px solid #55bea8",padding:"8px 11px",borderRadius:9}}>
       🔐 Jordi only</span>
     <span style={{border:"1px solid #3c6881",padding:"8px 11px",borderRadius:9}}>
       🗂️ One tracked workspace</span>
     <span style={{border:"1px solid #3c6881",padding:"8px 11px",borderRadius:9}}>
       🛒 Shopify, print, digital, original products</span>
     <span style={{border:"1px solid #3c6881",padding:"8px 11px",borderRadius:9}}>
       {data?.configured?"🟢 366 Supabase configured":"🟠 366 Supabase connection required"}</span>
   </div>
  </section>
  {data&&!data.configured&&<div style={{...card,background:"#35271b",borderColor:"#d6a354"}}>
   <strong>Database connection not yet configured</strong>
   <p style={{fontSize:13,lineHeight:1.7,marginBottom:0,color:"#ffe2af"}}>
     To keep your private work in the correct database, saving remains disabled until the
     <strong> 366 Industries Supabase</strong> project is explicitly linked using its project reference
     and server credentials and migrations 002 and 003 are applied. This dashboard deliberately
     does not use your other Supabase projects.
   </p>
  </div>}
  {error&&<div role="alert" style={{padding:13,borderRadius:10,background:"#5b1c31",color:"#fff"}}>{error}</div>}
  {message&&<div role="status" style={{padding:13,borderRadius:10,background:"#164b3d"}}>{message}</div>}
  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,410px),1fr))",gap:16}}>
   <section style={card}>
    <p style={{letterSpacing:1.4,fontWeight:900,fontSize:12,color:"#92e7d4"}}>01 / PROJECT BUILD TRACKER</p>
    <h2 style={{margin:"8px 0"}}>Your business setup tasks</h2>
    <p style={{fontSize:13,color:"#b9d0e2",lineHeight:1.6}}>
     Keep personal building and setup work in one place. Mark tasks in progress or done.
    </p>
    <form onSubmit={async e=>{
     e.preventDefault();
     if(await change("POST",task))setTask({...task,title:"",notes:""});
    }} style={{display:"grid",gap:10}}>
     <label style={{fontSize:12}}>Task name<input style={{...field,marginTop:5}} value={task.title} maxLength={160}
       required minLength={3} placeholder="e.g. Connect Shopify store" onChange={e=>setTask({...task,title:e.target.value})}/></label>
     <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:10}}>
      <label style={{fontSize:12}}>Area<select style={{...field,marginTop:5}} value={task.area}
       onChange={e=>setTask({...task,area:e.target.value})}>
       {areas.map(([k,v])=><option key={k} value={k}>{v}</option>)}</select></label>
      <label style={{fontSize:12}}>Priority<select style={{...field,marginTop:5}} value={task.priority}
       onChange={e=>setTask({...task,priority:e.target.value})}>
       {["low","normal","high"].map(x=><option key={x} value={x}>{human(x)}</option>)}</select></label>
     </div>
     <label style={{fontSize:12}}>Notes<textarea style={{...field,marginTop:5,minHeight:70}}
       maxLength={1200} value={task.notes} placeholder="Decisions, steps, useful contacts..."
       onChange={e=>setTask({...task,notes:e.target.value})}/></label>
     <button type="submit" disabled={pending||!data?.configured}
       style={{...button,opacity:pending||!data?.configured?0.5:1}}>＋ Save Build Task</button>
    </form>
    <h3 style={{marginTop:23}}>Task board ({data?.workItems?.length||0})</h3>
    {!data?.workItems?.length&&<p style={{color:"#a9c4d9",fontSize:13}}>No saved setup tasks yet.</p>}
    <div style={{display:"grid",gap:9,maxHeight:420,overflowY:"auto"}}>
     {data?.workItems?.map(x=><div key={x.id} style={{padding:12,background:"#081a2b",borderRadius:9,border:"1px solid #2b475f"}}>
      <b>{x.title}</b>
      <div style={{fontSize:12,color:"#9accc5",margin:"5px 0"}}>{human(x.area)} · {human(x.priority)} priority</div>
      {x.notes&&<p style={{fontSize:12,color:"#bccddd"}}>{x.notes}</p>}
      <select aria-label={"Status for "+x.title} style={{...field,fontSize:12,padding:8}} value={x.status}
       disabled={pending} onChange={e=>void change("PATCH",{
         recordType:"task",id:x.id,status:e.target.value,
       })}>
       {taskStates.map(st=><option key={st} value={st}>{human(st)}</option>)}
      </select>
     </div>)}
    </div>
   </section>
   <section style={card}>
    <p style={{letterSpacing:1.4,fontWeight:900,fontSize:12,color:"#92e7d4"}}>02 / PROMOTIONS & AFFILIATES</p>
    <h2 style={{margin:"8px 0"}}>Your campaigns &amp; links</h2>
    <p style={{fontSize:13,color:"#b9d0e2",lineHeight:1.6}}>
     Track sponsored content, affiliate partnerships, launches and advertising ideas.
     Status is for internal tracking only; this section does not publish or spend money.
    </p>
    <form onSubmit={async e=>{
     e.preventDefault();
     if(await change("POST",promo))setPromo({...promo,title:"",channel:"",notes:"",destination_url:"",planned_budget_usd:0});
    }} style={{display:"grid",gap:10}}>
     <label style={{fontSize:12}}>Promotion name<input style={{...field,marginTop:5}} value={promo.title}
       maxLength={160} required minLength={3} placeholder="e.g. Launch deer shirt collection"
       onChange={e=>setPromo({...promo,title:e.target.value})}/></label>
     <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
      <label style={{fontSize:12}}>Type<select style={{...field,marginTop:5}} value={promo.kind}
       onChange={e=>setPromo({...promo,kind:e.target.value})}>
       {kinds.map(([k,v])=><option key={k} value={k}>{v}</option>)}</select></label>
      <label style={{fontSize:12}}>Channel<input style={{...field,marginTop:5}} maxLength={120} value={promo.channel}
       placeholder="Instagram, TikTok, blog..."
       onChange={e=>setPromo({...promo,channel:e.target.value})}/></label>
     </div>
     <label style={{fontSize:12}}>Website / affiliate link (optional)<input style={{...field,marginTop:5}}
       type="url" maxLength={500} value={promo.destination_url} placeholder="https://..."
       onChange={e=>setPromo({...promo,destination_url:e.target.value})}/></label>
     <label style={{fontSize:12}}>Planned budget (USD; no spend authorization)
      <input style={{...field,marginTop:5}} type="number" min="0" max="1000000" step="0.01"
       value={promo.planned_budget_usd} onChange={e=>setPromo({...promo,planned_budget_usd:Number(e.target.value)})}/></label>
     <label style={{fontSize:12}}>Notes<textarea style={{...field,marginTop:5,minHeight:70}}
       maxLength={1200} value={promo.notes} placeholder="Partner requirements, disclosure, ideas..."
       onChange={e=>setPromo({...promo,notes:e.target.value})}/></label>
     <button type="submit" disabled={pending||!data?.configured}
       style={{...button,opacity:pending||!data?.configured?0.5:1}}>＋ Save Promotion</button>
    </form>
    <h3 style={{marginTop:23}}>Campaign tracker ({data?.promotions?.length||0})</h3>
    {!data?.promotions?.length&&<p style={{color:"#a9c4d9",fontSize:13}}>No saved promotions yet.</p>}
    <div style={{display:"grid",gap:9,maxHeight:420,overflowY:"auto"}}>
     {data?.promotions?.map(x=><div key={x.id} style={{padding:12,background:"#081a2b",borderRadius:9,border:"1px solid #2b475f"}}>
      <b>{x.title}</b>
      <div style={{fontSize:12,color:"#9accc5",margin:"5px 0"}}>
       {human(x.kind)} · {x.channel||"Channel not set"} · Planned ${Number(x.planned_budget_usd).toFixed(2)}
      </div>
      {x.destination_url&&<a style={{fontSize:12,color:"#97e7d3"}} href={x.destination_url}
        target="_blank" rel="noopener noreferrer">External campaign link ↗</a>}
      {x.notes&&<p style={{fontSize:12,color:"#bccddd"}}>{x.notes}</p>}
      <select aria-label={"Tracking status for "+x.title} style={{...field,fontSize:12,padding:8}}
       value={x.status} disabled={pending} onChange={e=>void change("PATCH",{
         recordType:"promotion",id:x.id,status:e.target.value,
       })}>
       {promotionStates.map(st=><option key={st} value={st}>{human(st)} (tracking)</option>)}
      </select>
     </div>)}
    </div>
   </section>
  </div>
 </div>;
}
