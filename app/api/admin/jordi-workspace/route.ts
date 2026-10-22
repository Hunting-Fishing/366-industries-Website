import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "../../../admin/auth";
import {
  assertSameOrigin, commerceDatabaseConfigured, commerceRest, isUuid,
  recordCommerceEvent, safeText, safeAmount,
} from "../../../lib/commerce-os";

export const dynamic = "force-dynamic";

type Promotion = {
  id: string; title: string; kind: string; channel: string;
  destination_url: string; notes: string; planned_budget_usd: number;
  status: string; created_at: string; updated_at: string;
};
type WorkItem = {
  id: string; title: string; area: string; notes: string; priority: string;
  status: string; created_at: string; updated_at: string;
};
const promotionKinds = ["social","affiliate","sponsorship","paid_ad","product_launch","other"];
const promotionStatuses = ["idea","draft","ready","running","finished"];
const areas = ["store_setup","automation","sourcing","design","marketing","books","integrations","operations"];
const priorities = ["low","normal","high"];
const taskStatuses = ["backlog","in_progress","done"];

function invalid(message: string,status=400) {
  return NextResponse.json({ok:false,message},{status,headers:{"Cache-Control":"no-store"}});
}
function select(value: unknown,options: string[],label: string) {
  if(typeof value!=="string" || !options.includes(value))throw Error("Invalid " + label + ".");
  return value;
}
function urlValue(value: unknown) {
  const v = safeText(value, 500);
  if (!v) return "";
  const url = new URL(v);
  if(!["https:","http:"].includes(url.protocol) || !url.hostname ||
    url.username || url.password) throw Error("Destination URL must be a public HTTP(S) link.");
  return url.toString().slice(0,500);
}
function error(err: unknown) {
  return invalid(err instanceof Error?err.message:"Workspace operation failed.");
}
export async function GET() {
  if (!(await isAdminAuthenticated())) return invalid("Owner login required.",401);
  if (!commerceDatabaseConfigured())
    return NextResponse.json({ok:true,configured:false,promotions:[],workItems:[],
      message:"Connect the dedicated 366 Industries Supabase project to enable saving.",
    },{headers:{"Cache-Control":"no-store"}});
  try {
    const [promotions,workItems] = await Promise.all([
      commerceRest<Promotion[]>("commerce_promotions","?select=*&order=created_at.desc&limit=150"),
      commerceRest<WorkItem[]>("commerce_work_items","?select=*&order=created_at.desc&limit=150"),
    ]);
    return NextResponse.json({ok:true,configured:true,promotions,workItems},{headers:{"Cache-Control":"no-store"}});
  } catch(err) {return error(err);}
}
export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) return invalid("Owner login required.",401);
  try {
    assertSameOrigin(request);
    const body = await request.json() as Record<string,unknown>;
    const title = safeText(body.title,160);
    if(title.length<3) return invalid("A title of at least 3 characters is required.");
    if(body.recordType==="promotion") {
      const payload = {
        title,kind:select(body.kind,promotionKinds,"promotion type"),
        channel:safeText(body.channel,120),destination_url:urlValue(body.destination_url),
        notes:safeText(body.notes,1200),planned_budget_usd:safeAmount(body.planned_budget_usd ?? 0),
        status:"idea",
      };
      const rows=await commerceRest<Promotion[]>("commerce_promotions","", "POST",payload);
      await recordCommerceEvent("Jordi Workspace","Promotion added",title);
      return NextResponse.json({ok:true,item:rows[0]},{status:201});
    }
    if(body.recordType==="task") {
      const payload={
        title,area:select(body.area,areas,"task area"),
        notes:safeText(body.notes,1200),
        priority:select(body.priority,priorities,"task priority"),
        status:"backlog",
      };
      const rows=await commerceRest<WorkItem[]>("commerce_work_items","", "POST",payload);
      await recordCommerceEvent("Jordi Workspace","Build task added",title);
      return NextResponse.json({ok:true,item:rows[0]},{status:201});
    }
    return invalid("Invalid record type.");
  } catch(err) {return error(err);}
}
export async function PATCH(request: Request) {
  if (!(await isAdminAuthenticated())) return invalid("Owner login required.",401);
  try {
    assertSameOrigin(request);
    const body=await request.json() as Record<string,unknown>;
    if(!isUuid(body.id))return invalid("Invalid item ID.");
    let table: "commerce_promotions"|"commerce_work_items";
    let status: string;
    if(body.recordType==="promotion") {
      table="commerce_promotions";
      status=select(body.status,promotionStatuses,"promotion status");
    } else if(body.recordType==="task") {
      table="commerce_work_items";
      status=select(body.status,taskStatuses,"task status");
    } else return invalid("Invalid record type.");
    const records=await commerceRest<Array<{id:string}>>(table,
      "?id=eq."+encodeURIComponent(body.id),"PATCH",
      {status,updated_at:new Date().toISOString()});
    if(!records.length)return invalid("Item not found.",404);
    await recordCommerceEvent("Jordi Workspace","Tracking status updated",String(body.recordType)+" → "+status);
    return NextResponse.json({ok:true,item:records[0]});
  } catch(err) {return error(err);}
}
