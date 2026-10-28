import AppHeader from "@/components/layout/app-layout/header";
import AppSidebar from "@/components/layout/app-layout/sidebar";
import { ScrollToTop } from "@/components/shared/scroll-to-top";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/utils";
import React from "react";
import { Outlet, useLocation } from "react-router";

export default function AppLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { pathname } = useLocation();

  const isAiRoute =
    pathname.startsWith("/ai-chat") || pathname.startsWith("/ai-settings");

  // Route-specific styles for the main content container
  const getRouteSpecificStyles = () => {
    if (isAiRoute) {
      return "flex-1 min-h-0 flex flex-col";
    }
    return "p-4 mx-auto w-full max-w-(--breakpoint-2xl) md:p-6";
  };

  return (
    <SidebarProvider className={cn(isAiRoute && "h-svh overflow-hidden")}>
      <AppSidebar />

      <SidebarInset className={cn(isAiRoute && "h-svh overflow-hidden")}>
        <AppHeader />

        <div className={getRouteSpecificStyles()}>{children ?? <Outlet />}</div>
      </SidebarInset>
      <ScrollToTop />
    </SidebarProvider>
  );
}
