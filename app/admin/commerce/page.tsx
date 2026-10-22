import Link from "next/link";
import { redirect } from "next/navigation";
import { getAuthenticatedAdminEmail } from "../auth";
import { CommerceStudio } from "./studio-client";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Commerce OS | Private 366 Industries Control Room",
  robots: { index: false, follow: false, nocache: true },
};

export default async function CommercePage() {
  const email = await getAuthenticatedAdminEmail();
  if (email !== "jordilwbailey@gmail.com") redirect("/admin");
  return (
    <main style={{minHeight:"100vh",background:"#091422",color:"#f4f8ff"}}>
      <div style={{maxWidth:1380,margin:"0 auto",padding:"24px clamp(16px,4vw,54px) 80px"}}>
        <header style={{display:"flex",justifyContent:"space-between",gap:16,alignItems:"center",flexWrap:"wrap",marginBottom:30}}>
          <Link href="/admin" style={{color:"#d7e9ff",textDecoration:"none",fontWeight:800,fontSize:18}}>← 366 INDUSTRIES / ADMIN</Link>
          <span style={{fontSize:12,color:"#a3bdd3",border:"1px solid #274461",borderRadius:30,padding:"8px 15px"}}>🔐 PRIVATE • Owner: {email}</span>
        </header>
        <CommerceStudio />
      </div>
    </main>
  );
}
