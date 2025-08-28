import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";
import Sidebar from "../components/Public/Sidebar";

export default function PrivateLayout() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-row min-w-screen min-h-screen overflow-x-auto">
      <Sidebar />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}