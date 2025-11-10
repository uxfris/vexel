import Navbar from "../components/navbar";
import { SidebarProvider } from "../hooks/useSidebar";
import { SearchProvider } from "../hooks/useSearch";
import SearchPlugin from "../components/searchPlugin";

const Plugin = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <SearchProvider>
        <Navbar />
        <SearchPlugin />
        <main className="w-full max-w-[1440px] relative mx-auto p-4 py-16 md:p-12">
          {children}
        </main>
      </SearchProvider>
    </SidebarProvider>
  );
};

export default Plugin;
