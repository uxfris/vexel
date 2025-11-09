import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import { SidebarProvider } from "../context/sidebar-context";
import { SearchProvider } from "../context/search-context";

const Plugin = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <SearchProvider>
        <Navbar />
        <main className="w-full max-w-[1440px] mx-auto overflow-auto p-4 md:p-12">
          {children}
        </main>
      </SearchProvider>
    </SidebarProvider>
  );
};

export default Plugin;
