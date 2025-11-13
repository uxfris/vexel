import Sidebar from "../_components/sidebar/index";
import Navbar from "../_components/navbar";
import { SidebarProvider } from "../_hooks/use-sidebar";

const CatalogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 max-w-[1440px] overflow-auto p-4 pt-6 md:py-16 md:p-12">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default CatalogLayout;
