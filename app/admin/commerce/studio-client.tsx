"use client";

import { useCallback, useEffect, useState } from "react";
import type { CSSProperties } from "react";

type Kind = "dropshipping"|"print_on_demand"|"digital"|"original_creation";
type Status = "idea"|"copy_ready"|"approved"|"syncing"|"shopify_draft"|"needs_check";
type Product = {
  id:string; kind:Kind; title:string; theme:string; supplier:string; note:string;
  price:number; unit_cost:number; shipping_cost:number; ad_allowance:number;
  description:string; social_copy:string; currency:string; status:Status;
  source_verified:boolean; rights_confirmed:boolean; shopify_id:string|null;
};
type Snapshot = {
  ok:boolean; configured:boolean; products:Product[]; shopifyConfigured:boolean;
  aiConfigured:boolean; message?:string;
  orders?:Array<{id:string;total:number;currency:string;financial_status:string;created_at:string}>;
  events?:Array<{id:string;agent:string;action:string;result:string;created_at:string}>;
};
type Idea = { title:string; kind:Kind; theme:string; note:string };
const ideas:Idea[] = [
  {title:"Talk to Me About Deer & Adventures Tee",kind:"print_on_demand",theme:"Conversation Starters",
    note:"Deer illustration; prompts: favourite hiking trail, camping mishaps, hidden waterfalls, dream road trip, weekend adventure. Original art only."},
  {title:"Ask Me About the Stars Tee",kind:"print_on_demand",theme:"Dating & Singles",
    note:"Solar-system artwork with friendly prompts: ideal stargazing place, favourite planet, perfect spontaneous date, travel bucket list."},
  {title:"Secret Encouragement Color-Perception Tee",kind:"print_on_demand",theme:"Hidden Empowerment",
    note:"Experimental color-vision-dependent design. Explore deer, dolphins, trees, house or solar-system imagery. Test with real observers with different color-vision profiles before making claims; no guarantee only color-blind people see it."},
  {title:"The Next Chapter Is Yours Journal",kind:"original_creation",theme:"Motivation",
    note:"Original affirmations, cover design and journaling prompts. Future option for your own printed books."},
  {title:"First-Date Conversation Cards",kind:"digital",theme:"Dating & Singles",
    note:"Downloadable original card set with warm questions, boundaries, first-date activities and icebreakers. Create actual downloadable file and confirm usage rights."},
  {title:"Meet-Cute Conversation Game",kind:"dropshipping",theme:"Conversation Starters",
    note:"Investigate original or authorized card decks with a verified international supplier; record actual landed cost, lead time, customs and product safety."},
  {title:"Movie-Magic Nostalgia Collection (License Required)",kind:"print_on_demand",theme:"Cinema",
    note:"Use original movie-inspired themes only. Do not reproduce famous film quotes, protected characters, film art or studio marks without rights clearance."},
  {title:"Hidden Message Dolphin Tote",kind:"print_on_demand",theme:"Color-Perception Art",
    note:"Sea-themed original artwork designed around differences in color perception; validate multiple vision profiles, lighting and print runs."},
];
const kindLabels:Record<Kind,string>={
  dropshipping:"📦 Dropshipping",print_on_demand:"👕 Print on Demand",
  digital:"💻 Digital",original_creation:"🎨 Original Creations",
};
const themeColors=["#24e5c4","#73baff","#f5c46e","#d5a4ff"];
const section:CSSProperties={
  border:"1px solid #2b425d",borderRadius:18,background:"#102337",padding:22,
  boxShadow:"0 10px 28px #0000001a",
};
const input:CSSProperties={
  width:"100%",boxSizing:"border-box",padding:"11px 13px",background:"#091626",
  border:"1px solid #35526d",borderRadius:9,color:"#f4f8ff",font:"inherit",
};
const btn:CSSProperties={
  border:"1px solid #3b5971",background:"#204160",color:"#f2f8ff",padding:"10px 14px",
  borderRadius:10,cursor:"pointer",fontWeight:700,
};
const actionBtn:CSSProperties={...btn,background:"#30c8a6",borderColor:"#30c8a6",color:"#071b26"};
const label:CSSProperties={display:"block",fontSize:12,fontWeight:700,color:"#bfd4e4",marginBottom:6};
const stack:CSSProperties={display:"grid",gap:16};

function money(v:number) { return "$"+(Number(v)||0).toFixed(2); }
function contribution(p:Product) {
  return p.price-p.unit_cost-p.shipping_cost-p.ad_allowance-p.price*0.03-0.30;
}
const emptyForm={
  kind:"print_on_demand" as Kind,title:"",theme:"",supplier:"",note:"",
  price:"29.00",unit_cost:"12.00",shipping_cost:"5.00",ad_allowance:"3.00",
};

export function CommerceStudio() {
  const [snapshot,setSnapshot]=useState<Snapshot|null>(null);
  const [pending,setPending]=useState("");
  const [message,setMessage]=useState("");
  const [error,setError]=useState("");
  const [form,setForm]=useState(emptyForm);
  const [filter,setFilter]=useState<Kind|"all">("all");
  const [selected,setSelected]=useState<string|null>(null);

  const refresh=useCallback(async()=>{
    try {
      const response=await fetch("/api/admin/commerce",{cache:"no-store"});
      const result=await response.json() as Snapshot;
      if(!response.ok||!result.ok) throw new Error(result.message||"Unable to access Commerce OS.");
      setSnapshot(result);
      setError("");
    } catch(err) {setError(err instanceof Error?err.message:"Unable to load products.");}
  },[]);
  useEffect(()=>{void refresh();},[refresh]);

  async function send(method:"POST"|"PATCH",payload:Record<string,unknown>,busy:string) {
    setPending(busy);setMessage("");setError("");
    try {
      const response=await fetch("/api/admin/commerce",{
        method,headers:{"Content-Type":"application/json"},body:JSON.stringify(payload),
      });
      const result=await response.json() as {ok:boolean;message?:string;generator?:string};
      if (!response.ok||!result.ok)throw new Error(result.message||"Action failed.");
      setMessage(result.message||("Saved. "+(result.generator||"")));
      await refresh();
      return true;
    } catch(err) {
      setError(err instanceof Error?err.message:"Action failed.");
      return false;
    } finally {setPending("");}
  }

  const products=(snapshot?.products||[]).filter(p=>filter==="all"||p.kind===filter);
  const total=snapshot?.products.length||0;
  const verified=snapshot?.products.filter(p=>p.status==="approved"||p.status==="shopify_draft").length||0;
  return <div style={stack}>
    <section style={{...section,background:"linear-gradient(125deg,#153a4c,#17253e)"}}>
      <div style={{fontSize:12,fontWeight:800,letterSpacing:2,color:"#7eebd7"}}>366 COMMERCE OS / OWNER CONTROL</div>
      <h1 style={{fontSize:"clamp(28px,4.3vw,46px)",letterSpacing:-1,margin:"12px 0"}}>Your AI-Powered Commerce Studio</h1>
      <p style={{color:"#c2d7e8",lineHeight:1.65,maxWidth:930,marginBottom:20}}>
        One future Shopify store • Worldwide distribution • Dropshipping, print-on-demand, digital goods,
        personal creations and later books. Catalog research, copy and Shopify drafts are approval-first.
        Customer support, supplier purchasing, paid ads and automatic posting are not enabled in this release.
      </p>
      <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
        <span style={{...btn,background:"#0f2a33"}}>🔐 Owner access only</span>
        <span style={{...btn,background:"#0f2a33"}}>🌍 Global planning</span>
        <span style={{...btn,background:"#0f2a33"}}>💵 USD estimate • no FX conversion</span>
      </div>
    </section>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",gap:12}}>
      {[
        ["PRODUCT IDEAS",String(total)],
        ["REVIEWED / DRAFT",String(verified)],
        ["ORDER SUMMARIES",String(snapshot?.orders?.length||0)],
        ["DATABASE",snapshot?.configured?"Connected":"Needs setup"],
        ["SHOPIFY",snapshot?.shopifyConfigured?"Credentials ready":"Not connected"],
      ].map(([name,value],i)=><section key={name} style={{...section,padding:17,borderTop:"3px solid "+themeColors[i]}}>
        <div style={{fontSize:11,color:"#8bb0ca",fontWeight:800}}>{name}</div>
        <strong style={{fontSize:24,display:"block",marginTop:10}}>{value}</strong>
      </section>)}
    </div>
    {snapshot&&!snapshot.configured&&<section style={{...section,borderColor:"#f7b955",background:"#372b19"}}>
      <strong>⚠ Database setup required</strong>
      <p style={{marginBottom:0,color:"#e8d6ba"}}>
        {snapshot.message} The concept board below still works, but saving catalog items requires
        Supabase server-side credentials and the repository migration. No browser-side API keys are required.
      </p>
    </section>}
    {error&&<div role="alert" style={{padding:15,border:"1px solid #ff9a9a",borderRadius:10,background:"#481c25",color:"#fff"}}>{error}</div>}
    {message&&<div role="status" style={{padding:15,border:"1px solid #67f5c1",borderRadius:10,background:"#123c36"}}>{message}</div>}
    <section style={section}>
      <div style={{fontSize:12,letterSpacing:1.4,color:"#83e0cd",fontWeight:800}}>01 / CREATIVE PRODUCT PIPELINE</div>
      <h2 style={{margin:"12px 0"}}>Starter collections for your brand</h2>
      <p style={{color:"#bad0e0"}}>Click a concept to put it into the editable product form. These are unvalidated concepts, not listed items or researched suppliers.</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",gap:12}}>
        {ideas.map((idea)=><button key={idea.title} type="button" onClick={()=>{
          setForm({...emptyForm,...idea});
          setSelected(idea.title);
        }} style={{
          textAlign:"left",padding:16,background:selected===idea.title?"#264e58":"#0b1d30",
          color:"#f5f9ff",border:selected===idea.title?"1px solid #30c8a6":"1px solid #2b4b66",
          borderRadius:12,cursor:"pointer",
        }}>
          <small style={{display:"block",color:"#8fd8ca",marginBottom:8}}>{kindLabels[idea.kind]} • {idea.theme}</small>
          <strong style={{fontSize:15}}>{idea.title}</strong>
          <p style={{fontSize:12,lineHeight:1.55,color:"#b5cee0",marginBottom:0}}>{idea.note}</p>
        </button>)}
      </div>
    </section>
    <section style={section}>
      <div style={{fontSize:12,letterSpacing:1.4,color:"#83e0cd",fontWeight:800}}>02 / CATALOG AGENT</div>
      <h2 style={{margin:"12px 0"}}>Create a product idea</h2>
      <form onSubmit={async e=>{
        e.preventDefault();
        const ok=await send("POST",{action:"create",...form},"create");
        if(ok)setForm(emptyForm);
      }} style={{...stack,gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",alignItems:"end"}}>
        <div><label style={label}>Revenue stream</label>
          <select style={input} value={form.kind} onChange={e=>setForm({...form,kind:e.target.value as Kind})}>
            {Object.entries(kindLabels).map(([value,name])=><option key={value} value={value}>{name}</option>)}
          </select>
        </div>
        <div><label style={label}>Product name</label><input style={input} required minLength={3} maxLength={160} value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/></div>
        <div><label style={label}>Collection / theme</label><input style={input} maxLength={120} value={form.theme} onChange={e=>setForm({...form,theme:e.target.value})}/></div>
        <div><label style={label}>Supplier / fulfillment source</label><input style={input} maxLength={250} value={form.supplier} onChange={e=>setForm({...form,supplier:e.target.value})}/></div>
        {([
          ["price","Selling price (USD)"],["unit_cost","Unit cost (USD)"],
          ["shipping_cost","Shipping cost (USD)"],["ad_allowance","Ad allowance / order"],
        ] as const).map(([key,name])=><div key={key}><label style={label}>{name}</label>
          <input style={input} type="number" step="0.01" min="0" value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})}/></div>)}
        <div style={{gridColumn:"1 / -1"}}><label style={label}>Verified facts, idea notes, compliance concerns</label>
          <textarea style={{...input,minHeight:78}} maxLength={1000} value={form.note}
            onChange={e=>setForm({...form,note:e.target.value})}/>
        </div>
        <button type="submit" disabled={Boolean(pending)||!snapshot?.configured}
          style={{...actionBtn,opacity:pending||!snapshot?.configured?0.5:1}}>
          {pending==="create"?"Saving…":"＋ Save Product Idea"}</button>
      </form>
    </section>
    <section style={section}>
      <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:12,alignItems:"center"}}>
        <div><div style={{fontSize:12,color:"#83e0cd",fontWeight:800}}>03 / APPROVAL QUEUE</div>
          <h2 style={{margin:"10px 0"}}>Private product catalog</h2></div>
        <select aria-label="Filter product kind" style={{...input,width:"auto"}} value={filter}
          onChange={e=>setFilter(e.target.value as Kind|"all")}>
          <option value="all">All streams</option>
          {Object.entries(kindLabels).map(([value,name])=><option key={value} value={value}>{name}</option>)}
        </select>
      </div>
      {products.length===0&&<p style={{color:"#bed0e0"}}>No saved products in this view. Add the first product above after connecting storage.</p>}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,350px),1fr))",gap:14}}>
        {products.map(p=><article key={p.id} style={{
          background:"#0b1d30",border:"1px solid #2c4b64",borderRadius:12,padding:18,
          display:"flex",flexDirection:"column",gap:9,
        }}>
          <small style={{color:"#83e0cd"}}>{kindLabels[p.kind]} • {p.theme}</small>
          <h3 style={{fontSize:19,margin:0}}>{p.title}</h3>
          <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
            <span style={{fontSize:12,background:"#284056",padding:"5px 10px",borderRadius:7}}>
              {p.status.replace(/_/g," ").toUpperCase()}</span>
            <strong style={{color:contribution(p)>0?"#89e8bd":"#ffbd97"}}>
              {money(contribution(p))} estimated contribution
            </strong>
          </div>
          <small style={{color:"#afc7d9"}}>Price {money(p.price)} · Unit {money(p.unit_cost)} · Ship {money(p.shipping_cost)} · Ads {money(p.ad_allowance)}</small>
          {p.description&&<p style={{fontSize:13,lineHeight:1.55,color:"#d8e7ef",margin:"5px 0"}}>{p.description}</p>}
          {p.social_copy&&<details style={{fontSize:13,color:"#adcede"}}><summary>Marketing draft</summary><p>{p.social_copy}</p></details>}
          {p.shopify_id&&<small style={{color:"#a2dfd3"}}>Shopify ID: {p.shopify_id}</small>}
          {p.status!=="shopify_draft"&&p.status!=="needs_check"&&p.status!=="syncing"&&<div style={{display:"grid",gap:9,marginTop:"auto"}}>
            <button style={btn} disabled={Boolean(pending)} onClick={()=>void send("POST",{action:"generate",id:p.id},"generate"+p.id)}>
              ✍ Generate product + social copy
            </button>
            <label style={{display:"flex",gap:8,alignItems:"center",fontSize:12,cursor:"pointer"}}>
              <input type="checkbox" checked={p.source_verified} disabled={Boolean(pending)}
                onChange={e=>void send("PATCH",{id:p.id,source_verified:e.target.checked},"verify"+p.id)}/>
              Supplier, costs &amp; fulfillment verified
            </label>
            <label style={{display:"flex",gap:8,alignItems:"center",fontSize:12,cursor:"pointer"}}>
              <input type="checkbox" checked={p.rights_confirmed} disabled={Boolean(pending)}
                onChange={e=>void send("PATCH",{id:p.id,rights_confirmed:e.target.checked},"rights"+p.id)}/>
              I reviewed and cleared design, quote &amp; licensing rights
            </label>
            {p.status!=="approved"&&<button style={btn} disabled={Boolean(pending)||!p.source_verified||!p.rights_confirmed||!p.description||contribution(p)<=0}
              onClick={()=>void send("PATCH",{id:p.id,status:"approved"},"approve"+p.id)}>✓ Approve for Shopify DRAFT</button>}
            {p.status==="approved"&&<button style={actionBtn} disabled={Boolean(pending)||!snapshot?.shopifyConfigured}
              onClick={()=>void send("POST",{action:"shopify-draft",id:p.id},"shopify"+p.id)}>↗ Create unpublished Shopify draft</button>}
          </div>}
          {p.status==="needs_check"&&<p style={{color:"#f4bf81",fontSize:13}}>Shopify sync requires manual reconciliation. Do not retry automatically.</p>}
          {p.status==="shopify_draft"&&<p style={{color:"#81e0b8",fontSize:13}}>Unpublished Shopify draft created. Review product details in Shopify before publishing.</p>}
        </article>)}
      </div>
      <p style={{fontSize:12,color:"#8fabbe",marginBottom:0}}>
        Margin is illustrative: price − unit cost − shipping − ad allowance − 3% payment fee − $0.30.
        Excludes taxes, duty, returns, exchange rates, overhead, transaction-plan differences and additional fees.
      </p>
    </section>
    <section style={section}>
      <div style={{fontSize:12,letterSpacing:1.4,color:"#83e0cd",fontWeight:800}}>04 / ORDERS & AGENT ACTIVITY</div>
      <h2 style={{margin:"12px 0"}}>Recent integration events</h2>
      <p style={{fontSize:13,color:"#b4cbdc"}}>
        Orders appear after Shopify signs and delivers configured order webhooks. No customer names, email addresses or shipping details are stored.
      </p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(285px,1fr))",gap:16}}>
        <div>
          <h3>Orders</h3>
          {(!snapshot?.orders?.length)&&<p style={{color:"#adc3d6"}}>No verified Shopify orders received yet.</p>}
          {(snapshot?.orders||[]).map(order=><p key={order.id} style={{padding:11,background:"#0a1a2a",borderRadius:9,fontSize:13}}>
            #{order.id} · {order.currency} {Number(order.total).toFixed(2)} · {order.financial_status}
          </p>)}
        </div>
        <div>
          <h3>Agent audit trail</h3>
          {(!snapshot?.events?.length)&&<p style={{color:"#adc3d6"}}>No saved agent activity yet.</p>}
          {(snapshot?.events||[]).map(event=><p key={event.id} style={{padding:11,background:"#0a1a2a",borderRadius:9,fontSize:13,lineHeight:1.55}}>
            <strong>{event.agent}</strong> · {event.action}<br/>
            <span style={{color:"#a6bdcd"}}>{event.result}</span>
          </p>)}
        </div>
      </div>
    </section>
    <section style={section}>
      <div style={{fontSize:12,color:"#83e0cd",fontWeight:800}}>05 / BUSINESS AUTONOMY ROADMAP</div>
      <h2 style={{margin:"10px 0"}}>Agent network &amp; revenue expansion</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:12}}>
        {[
          ["🔍 Research Agent","Concept library live; trend evidence & competitor research require source integrations."],
          ["👕 Design + Catalog Agent","Product idea records and original safe-copy drafting; print files and proofing next."],
          ["📦 Fulfillment Agent","Shopify DRAFT creation supported after credentials; supplier and POD order routing not yet live."],
          ["📢 Marketing Agent","Generates editable social copy; scheduling and paid campaigns still require channel authorization."],
          ["💬 Service Agent","Customer response automations planned after checkout and consent policies."],
          ["📈 Manager Agent","Per-unit contribution previews live; orders, ad spend and reconciliation follow after connections."],
          ["🔗 Affiliates & Sponsors","Add disclosed affiliate links, brand partnerships and sponsorship placements later."],
          ["📚 Books & Original IP","Reserve collections for original books, workbooks, guided journals and merchandise."],
        ].map(([title,desc])=><div key={title} style={{padding:15,background:"#0b1d30",border:"1px solid #2a485f",borderRadius:10}}>
          <strong>{title}</strong><p style={{fontSize:13,color:"#b6ccdc",lineHeight:1.6,marginBottom:0}}>{desc}</p>
        </div>)}
      </div>
      <p style={{fontSize:12,color:"#a8c1d3",lineHeight:1.6,marginTop:22}}>
        ⚠ Color-perception merchandise requires testing with people who have different types of color-vision deficiency.
        Movie lines, titles, characters and recognisable designs may require copyright/trademark permissions.
        Worldwide shipping, privacy, affiliate disclosures and ad compliance must be configured per market.
      </p>
    </section>
  </div>;
}
