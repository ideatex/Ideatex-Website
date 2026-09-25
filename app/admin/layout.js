import "./admin.css";
import { getSession } from "@/lib/auth";
import AdminClientShell from "@/components/Admin/AdminClientShell";

export const metadata = {
  title: "Ideate X — Content Management System",
  description: "Admin panel and content management engine for Ideate X",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({ children }) {
  const user = await getSession();

  return (
    <div className="admin-body">
      <AdminClientShell user={user}>
        {children}
      </AdminClientShell>
    </div>
  );
}
