import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SidebarMenuItem as UiSidebarMenuItem } from "@/components/ui/sidebar";
import { useTranslations } from "@/i18n";
import { ChevronDownIcon } from "@/icons";
import { cn } from "@/utils";
import { Link } from "react-router";
import SidebarSubmenuItem from "./sidebar-submenu-item";
import type { NavItem } from "./types";

interface SidebarMenuItemProps {
  nav: NavItem;
  isOpen: boolean;
  showContent: boolean;
  pathname: string;
  onToggle: () => void;
}

export default function SidebarMenuItem({
  nav,
  isOpen,
  showContent,
  pathname,
  onToggle,
}: SidebarMenuItemProps) {
  const t = useTranslations("sidebar");

  const hasSubItems = Boolean(nav.subItems?.length);
  const hasActiveChild = Boolean(
    nav.subItems?.some(
      (subItem) =>
        subItem.path === pathname ||
        (subItem.path === "/ai-settings" &&
          pathname.startsWith("/ai-settings")),
    ),
  );
  const isDirectActive = Boolean(nav.path && nav.path === pathname);
  const isItemActive = hasSubItems ? isOpen || hasActiveChild : isDirectActive;
  const isPanelOpen = showContent && isOpen;

  return (
    <UiSidebarMenuItem>
      {hasSubItems ? (
        <Collapsible open={isPanelOpen} onOpenChange={onToggle}>
          <CollapsibleTrigger
            className={cn(
              "group menu-item cursor-pointer",
              isItemActive ? "menu-item-active" : "menu-item-inactive",
              !showContent ? "lg:justify-center" : "lg:justify-start",
            )}
          >
            <span
              className={cn(
                isItemActive
                  ? "menu-item-icon-active"
                  : "menu-item-icon-inactive",
              )}
            >
              {nav.icon}
            </span>
            {showContent && (
              <span className="menu-item-text">{t(`items.${nav.key}`)}</span>
            )}
            {nav.new && showContent && (
              <span
                className={cn(
                  "absolute inset-e-10 ms-auto menu-dropdown-badge",
                  isItemActive
                    ? "menu-dropdown-badge-active"
                    : "menu-dropdown-badge-inactive",
                )}
              >
                {t("badges.new")}
              </span>
            )}
            {showContent && (
              <ChevronDownIcon
                className={cn(
                  "ms-auto h-5 w-5 transition-transform duration-200",
                  isOpen ? "rotate-180 text-brand-500" : "",
                )}
              />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <ul className="ms-9 mt-2 space-y-1">
              {nav.subItems?.map((subItem) => (
                <SidebarSubmenuItem
                  key={subItem.key}
                  subItem={subItem}
                  isActive={
                    subItem.path === pathname ||
                    (subItem.path === "/ai-settings" &&
                      pathname.startsWith("/ai-settings"))
                  }
                />
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      ) : (
        nav.path && (
          <Link
            to={nav.path}
            target={nav.target}
            className={cn(
              "group menu-item",
              isItemActive ? "menu-item-active" : "menu-item-inactive",
            )}
          >
            <span
              className={cn(
                isItemActive
                  ? "menu-item-icon-active"
                  : "menu-item-icon-inactive",
              )}
            >
              {nav.icon}
            </span>
            {showContent && (
              <span className="menu-item-text">{t(`items.${nav.key}`)}</span>
            )}
          </Link>
        )
      )}
    </UiSidebarMenuItem>
  );
}
