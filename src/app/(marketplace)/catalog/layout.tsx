import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import { SidebarProvider } from "./context/sidebar-context";
import { SearchProvider } from "./context/search-context";

const CatalogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <SearchProvider>
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="md:w-3/4 w-full p-4 md:p-12">{children}</main>
        </div>
      </SearchProvider>
    </SidebarProvider>
  );
};

export default CatalogLayout;
