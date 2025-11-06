import { cn } from "@/lib/utils/cn";
import Link from "next/link";

const Breadcrumb = ({ category }: { category: string }) => {
  return (
    <div className="text-md font-semibold flex items-center gap-2">
      <Link href="/" className="cursor-pointer">
        Vexel
      </Link>
      →
      <Link
        href="/catalog"
        className={cn(
          "cursor-pointer",
          !category && "cursor-text text-muted-foreground"
        )}
      >
        Plugins
      </Link>{" "}
      {category && "→"}
      <span className="font-medium text-muted-foreground">{category}</span>
    </div>
  );
};

export default Breadcrumb;
