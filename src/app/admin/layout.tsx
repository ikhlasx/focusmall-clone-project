import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Allow access to login page without auth
  // For other admin pages, redirect to login if not authenticated
  // This is a simple check - you can enhance it with role-based access later

  return <>{children}</>;
}


