import Sidebar from "./components/Sidebar";
import Header from "./components/header";
import { SidebarProvider } from "./context/SidebarContext";

const CatalogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="md:w-3/4 w-full p-4 md:p-12">{children}</main>
      </div>
    </SidebarProvider>
  );
};

export default CatalogLayout;
