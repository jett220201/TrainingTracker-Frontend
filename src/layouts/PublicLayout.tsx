import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="flex flex-col w-screen h-screen overflow-x-auto">
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}