import Navbar from "../_components/navbar";
import { SidebarProvider } from "../_hooks/use-sidebar";

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
