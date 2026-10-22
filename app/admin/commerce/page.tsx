import { redirect } from "next/navigation";
import { getAuthenticatedAdminEmail } from "../auth";

export const dynamic="force-dynamic";
export const metadata={
  title:"Jordi Shopify & Promotions | Private 366 Industries",
  robots:{index:false,follow:false,nocache:true},
};
/** Retain the old bookmark while protecting the redirect with the owner session. */
export default async function CommercePage() {
  if ((await getAuthenticatedAdminEmail())!=="jordilwbailey@gmail.com") redirect("/admin");
  redirect("/admin/jordi-shopify-promotions");
}
