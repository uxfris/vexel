import Navbar from "../components/navbar";
import { SidebarProvider } from "../hooks/useSidebar";

const Plugin = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <Navbar />
      <main className="w-full max-w-[1440px] relative mx-auto p-4 py-16 md:p-12">
        {children}
      </main>
    </SidebarProvider>
  );
};

export default Plugin;
