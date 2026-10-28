import { useTranslations } from "@/i18n";
import { cn } from "@/utils";
import { Link } from "react-router";
import type { SubItem } from "./types";

interface SidebarSubmenuItemProps {
  subItem: SubItem;
  isActive: boolean;
}

export default function SidebarSubmenuItem({
  subItem,
  isActive,
}: SidebarSubmenuItemProps) {
  const t = useTranslations("sidebar");

  return (
    <li>
      <Link
        to={subItem.path}
        target={subItem.target}
        className={cn(
          "group menu-dropdown-item",
          isActive
            ? "menu-dropdown-item-active"
            : "menu-dropdown-item-inactive",
        )}
      >
        {t(`items.${subItem.key}`)}
        <span className="ms-auto flex items-center gap-1">
          {subItem.new && (
            <span
              className={cn(
                "ms-auto menu-dropdown-badge",
                isActive
                  ? "menu-dropdown-badge-active"
                  : "menu-dropdown-badge-inactive",
              )}
            >
              {t("badges.new")}
            </span>
          )}
          {subItem.pro && (
            <span
              className={cn(
                "ms-auto menu-dropdown-badge-pro",
                isActive
                  ? "menu-dropdown-badge-pro-active"
                  : "menu-dropdown-badge-pro-inactive",
              )}
            >
              {t("badges.pro")}
            </span>
          )}
        </span>
      </Link>
    </li>
  );
}
