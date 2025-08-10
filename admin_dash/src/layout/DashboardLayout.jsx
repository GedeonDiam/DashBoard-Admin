import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar/Topbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#141821] text-[#F9FAFB] font-inter">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6 bg-[#141821] ">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
