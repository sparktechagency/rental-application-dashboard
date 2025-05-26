import { Outlet } from "react-router-dom";
import Sidebar from "../component/Main/Sidebar/Sidebar";
import Header from "../component/Main/Header/Header";
import { useState } from "react";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="w-full h-full flex ">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      {/* Main Content */}
      <section
        className={`w-full h-screen transition-all ${
          isSidebarOpen ? "ml-[300px]" : "ml-[80px]"
        }`}
      >
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <section className="mt-24 w-full h-full px-5 py-5 bg-[#F5F5F5] overflow-auto">
          <Outlet />
        </section>
      </section>
    </div>
  );
};

export default MainLayout;
