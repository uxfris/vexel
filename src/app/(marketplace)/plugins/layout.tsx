import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import { SidebarProvider } from "../context/sidebar-context";
import { SearchProvider } from "../context/search-context";

const Plugin = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <SearchProvider>
        <Navbar />
        <main className="max-w-[1440px] overflow-auto p-4 md:p-12">
          {children}
        </main>
      </SearchProvider>
    </SidebarProvider>
  );
};

export default Plugin;
