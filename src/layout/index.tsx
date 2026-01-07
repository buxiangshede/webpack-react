import { Outlet } from "react-router-dom";
import { Header } from "@/components/common/Header";

export const AppLayout = () => (
  <div className="app-shell">
    <Header />
    <main className="content-area">
      <Outlet />
    </main>
  </div>
);

export default AppLayout;
