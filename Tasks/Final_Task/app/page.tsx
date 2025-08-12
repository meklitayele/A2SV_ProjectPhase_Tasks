// app/page.tsx or app/home/page.tsx
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import Home from "./component/Home";

export default async function HomePage() {
  const session = await getServerSession(options);

  console.log("Session from server:", session?.user?.data?.accessToken);
  if (!session) {
    redirect("/login");
  }

  return <Home />;
}
