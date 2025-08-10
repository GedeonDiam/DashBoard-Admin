import { FaBell, FaSearch, FaUserCircle, FaSun, FaMoon } from "react-icons/fa";

const Topbar = () => {
  return (
    <div className="flex items-center justify-between px-6 py-3 bg-[#1f242e] border-b border-[#1f242e] shadow-sm">
      <div className="text-xl font-bold text-[#F9FAFB]">Zaanndou Admin</div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher..."
            className="px-4 py-2 rounded-full bg-[#1E293B] text-sm text-white placeholder-[#888] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
          />
        </div>

        <div className="flex items-center gap-3 text-[#A0A0A0]">
          <FaBell className="hover:text-[#3B82F6] cursor-pointer" />
          <FaUserCircle className="text-[#3B82F6] text-2xl" />
        </div>
      </div>
    </div>
  );
};


export default Topbar;
