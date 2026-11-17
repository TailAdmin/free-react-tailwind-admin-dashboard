import { SidebarHeader } from "@/components/ui/sidebar";
import { cn } from "@/utils";
import { Link } from "react-router";

interface AppSidebarHeaderProps {
  showContent: boolean;
}

export default function AppSidebarHeader({
  showContent,
}: AppSidebarHeaderProps) {
  return (
    <SidebarHeader className="px-5 pt-5 pb-8">
      <Link
        to="/"
        className={cn(
          "flex items-center",
          !showContent ? "justify-center" : "justify-start",
        )}
      >
        {showContent ? (
          <>
            <img
              className="h-10 w-37.5 dark:hidden"
              src="/images/logo/logo.svg"
              alt="Logo"
            />
            <img
              className="hidden h-10 w-37.5 dark:block"
              src="/images/logo/logo-dark.svg"
              alt="Logo"
            />
          </>
        ) : (
          <img src="/images/logo/logo-icon.svg" alt="Logo" className="size-8" />
        )}
      </Link>
    </SidebarHeader>
  );
}
