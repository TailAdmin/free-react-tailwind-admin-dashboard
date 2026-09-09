import { useSidebar } from "@/context/SidebarContext";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router";
import {
  AiIcon,
  BoxCubeIcon,
  CalenderIcon,
  CallIcon,
  CartIcon,
  ChatIcon,
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  LayoutIcon,
  ListIcon,
  MailIcon,
  MapIcon,
  PageIcon,
  PieChartIcon,
  PlugInIcon,
  TableIcon,
  TaskIcon,
  UserCircleIcon,
} from "../icons";
import { cn } from "../utils";
import SidebarWidget from "./SidebarWidget";

type NavItem = {
  name: string;
  key?: string;
  icon: React.ReactNode;
  path?: string;
  new?: boolean;
  target?: string;
  subItems?: {
    name: string;
    key?: string;
    path: string;
    pro?: boolean;
    new?: boolean;
    target?: string;
  }[];
};

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    key: "dashboard",
    subItems: [
      { name: "Ecommerce", key: "ecommerceHome", path: "/" },
      { name: "Analytics", key: "analytics", path: "/analytics" },
      { name: "Marketing", key: "marketing", path: "/marketing" },
      { name: "CRM", key: "crm", path: "/crm" },
      { name: "Stocks", key: "stocks", path: "/stocks" },
      { name: "SaaS", key: "saas", path: "/saas" },
      { name: "Logistics", key: "logistics", path: "/logistics" },
      { name: "AI", key: "ai", path: "/ai", new: true },
      { name: "Sales", key: "sales", path: "/sales", new: true },
      { name: "Finance", key: "finance", path: "/finance", new: true },
    ],
  },
  {
    name: "AI Assistant",
    key: "aiAssistant",
    icon: <AiIcon />,
    new: true,
    subItems: [
      { name: "Text Generator", key: "textGenerator", path: "/text-generator" },
      {
        name: "Image Generator",
        key: "imageGenerator",
        path: "/image-generator",
      },
      { name: "Code Generator", key: "codeGenerator", path: "/code-generator" },
      {
        name: "Video Generator",
        key: "videoGenerator",
        path: "/video-generator",
      },
      { name: "AI Settings", key: "aiSettings", path: "/ai-settings" },
    ],
  },
  {
    name: "E-commerce",
    key: "ecommerce",
    icon: <CartIcon />,
    new: false,
    subItems: [
      { name: "Products", key: "products", path: "/products-list" },
      { name: "Add Product", key: "addProduct", path: "/add-product" },
      { name: "Billing", key: "billing", path: "/billing" },
      { name: "Invoices", key: "invoices", path: "/invoices" },
      { name: "Single Invoice", key: "singleInvoice", path: "/single-invoice" },
      { name: "Create Invoice", key: "createInvoice", path: "/create-invoice" },
      { name: "Transactions", key: "transactions", path: "/transactions" },
      {
        name: "Single Transaction",
        key: "singleTransaction",
        path: "/single-transaction",
      },
    ],
  },
  {
    icon: <CalenderIcon />,
    name: "Calendar",
    key: "calendar",
    path: "/calendar",
  },
  {
    icon: <UserCircleIcon />,
    name: "User Profile",
    key: "userProfile",
    path: "/profile",
  },
  {
    name: "Task",
    key: "task",
    icon: <TaskIcon />,
    subItems: [
      { name: "List", key: "taskList", path: "/task-list", pro: true },
      { name: "Kanban", key: "kanban", path: "/task-kanban", pro: true },
    ],
  },
  {
    name: "Forms",
    key: "forms",
    icon: <ListIcon />,
    subItems: [
      {
        name: "Form Elements",
        key: "formElements",
        path: "/form-elements",
        pro: false,
      },
      {
        name: "Form Layout",
        key: "formLayout",
        path: "/form-layout",
        pro: true,
      },
    ],
  },
  {
    name: "Tables",
    key: "tables",
    icon: <TableIcon />,
    subItems: [
      {
        name: "Basic Tables",
        key: "basicTables",
        path: "/basic-tables",
        pro: false,
      },
      {
        name: "Data Tables",
        key: "dataTables",
        path: "/data-tables",
        pro: true,
      },
    ],
  },
  {
    name: "Pages",
    key: "pages",
    icon: <PageIcon />,
    subItems: [
      { name: "File Manager", key: "fileManager", path: "/file-manager" },
      { name: "Pricing Tables", key: "pricingTables", path: "/pricing-tables" },
      { name: "FAQ", key: "faq", path: "/faq" },
      { name: "API Keys", key: "apiKeys", path: "/api-keys", new: true },
      {
        name: "Integrations",
        key: "integrations",
        path: "/integrations",
        new: true,
      },
      { name: "Blank Page", key: "blankPage", path: "/blank" },
      { name: "404 Error", key: "error404", path: "/error-404" },
      { name: "500 Error", key: "error500", path: "/error-500" },
      { name: "503 Error", key: "error503", path: "/error-503" },
      { name: "Coming Soon", key: "comingSoon", path: "/coming-soon" },
      { name: "Maintenance", key: "maintenance", path: "/maintenance" },
      { name: "Success", key: "successPage", path: "/success" },
    ],
  },
  {
    name: "Layouts",
    key: "layouts",
    icon: <LayoutIcon />,
    new: true,
    subItems: [
      {
        name: "Layout One",
        key: "layoutOne",
        path: "/layout-one",
        target: "_blank",
      },
      {
        name: "Layout Two",
        key: "layoutTwo",
        path: "/layout-two",
        target: "_blank",
      },
      {
        name: "Layout Three",
        key: "layoutThree",
        path: "/layout-three",
        target: "_blank",
      },
      {
        name: "Layout Four",
        key: "layoutFour",
        path: "/layout-four",
        target: "_blank",
      },
      {
        name: "Layout Five",
        key: "layoutFive",
        path: "/layout-five",
        target: "_blank",
      },
      {
        name: "Layout Six",
        key: "layoutSix",
        path: "/layout-six",
        target: "_blank",
      },
    ],
  },
];

const othersItems: NavItem[] = [
  {
    icon: <PieChartIcon />,
    name: "Charts",
    key: "charts",
    new: true,
    subItems: [
      { name: "Line Chart", key: "lineChart", path: "/line-chart" },
      { name: "Bar Chart", key: "barChart", path: "/bar-chart" },
      { name: "Pie Chart", key: "pieChart", path: "/pie-chart" },
      { name: "Radar Chart", key: "radarChart", path: "/radar-chart" },
      { name: "Radial Chart", key: "radialChart", path: "/radial-chart" },
    ],
  },
  {
    icon: <MapIcon />,
    name: "Maps",
    key: "maps",
    new: true,
    subItems: [
      { name: "Maps", key: "mapsGoogle", path: "/maps" },
      { name: "Vector Map", key: "vectorMap", path: "/vector-map" },
    ],
  },
  {
    icon: <BoxCubeIcon />,
    name: "UI Elements",
    key: "uiElements",
    subItems: [
      { name: "Alerts", key: "alerts", path: "/alerts", pro: false },
      { name: "Avatar", key: "avatar", path: "/avatars", pro: false },
      { name: "Badge", key: "badge", path: "/badge", pro: false },
      {
        name: "Breadcrumb",
        key: "breadcrumb",
        path: "/breadcrumb",
        pro: false,
      },
      { name: "Buttons", key: "buttons", path: "/buttons", pro: false },
      {
        name: "Buttons Group",
        key: "buttonsGroup",
        path: "/buttons-group",
        pro: false,
      },
      { name: "Cards", key: "cards", path: "/cards", pro: false },
      { name: "Carousel", key: "carousel", path: "/carousel", pro: false },
      { name: "Dropdowns", key: "dropdowns", path: "/dropdowns", pro: false },
      { name: "Images", key: "images", path: "/images", pro: false },
      { name: "Links", key: "links", path: "/links", pro: false },
      { name: "List", key: "listView", path: "/list", pro: false },
      { name: "Modals", key: "modals", path: "/modals", pro: false },
      {
        name: "Notification",
        key: "notificationUi",
        path: "/notifications",
        pro: false,
      },
      {
        name: "Pagination",
        key: "pagination",
        path: "/pagination",
        pro: false,
      },
      { name: "Popovers", key: "popovers", path: "/popovers", pro: false },
      {
        name: "Progressbar",
        key: "progressbar",
        path: "/progress-bar",
        pro: false,
      },
      { name: "Ribbons", key: "ribbons", path: "/ribbons", pro: false },
      { name: "Spinners", key: "spinners", path: "/spinners", pro: false },
      { name: "Tabs", key: "tabs", path: "/tabs", pro: false },
      { name: "Tooltips", key: "tooltips", path: "/tooltips", pro: false },
      { name: "Videos", key: "videos", path: "/videos", pro: false },
    ],
  },
  {
    icon: <PlugInIcon />,
    name: "Authentication",
    key: "authentication",
    subItems: [
      { name: "Sign In", key: "signIn", path: "/signin", pro: false },
      { name: "Sign Up", key: "signUp", path: "/signup", pro: false },
      {
        name: "Reset Password",
        key: "resetPassword",
        path: "/reset-password",
        pro: false,
      },
      {
        name: "Two Step Verification",
        key: "twoStepVerification",
        path: "/two-step-verification",
        pro: false,
      },
    ],
  },
];

const supportItems: NavItem[] = [
  {
    icon: <ChatIcon />,
    name: "Chat",
    key: "chat",
    path: "/chat",
  },
  {
    icon: <CallIcon />,
    name: "Support Ticket",
    key: "supportMenu",
    new: true,
    subItems: [
      { name: "Ticket List", key: "supportList", path: "/support-tickets" },
      {
        name: "Ticket Reply",
        key: "supportReply",
        path: "/support-ticket-reply",
      },
    ],
  },
  {
    icon: <MailIcon />,
    name: "Email",
    key: "email",
    subItems: [
      { name: "Inbox", key: "inbox", path: "/inbox" },
      { name: "Details", key: "inboxDetails", path: "/inbox-details" },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered, setIsMobileOpen } =
    useSidebar();
  const { t } = useTranslation();
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "support" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {},
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Auto-close sidebar on mobile after route change
  useEffect(() => {
    if (isMobileOpen) {
      setIsMobileOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // const isActive = (path: string) => location.pathname === path;
  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname],
  );

  useEffect(() => {
    let submenuMatched = false;

    ["main", "support", "others"].forEach((menuType) => {
      const items =
        menuType === "main"
          ? navItems
          : menuType === "support"
            ? supportItems
            : othersItems;

      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "support" | "others",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (
    index: number,
    menuType: "main" | "support" | "others",
  ) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (
    items: NavItem[],
    menuType: "main" | "support" | "others",
  ) => (
    <ul className="flex flex-col gap-1">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`group menu-item ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "xl:justify-center"
                  : "xl:justify-start"
              }`}
            >
              <span
                className={`menu-item-icon-size ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>

              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">
                  {nav.key ? t(`sidebar.items.${nav.key}`) : nav.name}
                </span>
              )}
              {nav.new && (isExpanded || isHovered || isMobileOpen) && (
                <span
                  className={`absolute inset-e-10 ms-auto ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "menu-dropdown-badge-active"
                      : "menu-dropdown-badge-inactive"
                  } menu-dropdown-badge`}
                >
                  {t("sidebar.badges.new")}
                </span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ms-auto h-5 w-5 transition-transform duration-200 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                target={nav.target}
                className={`group menu-item ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`menu-item-icon-size ${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">
                    {nav.key ? t(`sidebar.items.${nav.key}`) : nav.name}
                  </span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="ms-9 mt-2 space-y-1">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      target={subItem.target}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.key
                        ? t(`sidebar.items.${subItem.key}`)
                        : subItem.name}
                      <span className="ms-auto flex items-center gap-1">
                        {subItem.new && (
                          <span
                            className={`ms-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            {t("sidebar.badges.new")}
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ms-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-pro-active"
                                : "menu-dropdown-badge-pro-inactive"
                            } menu-dropdown-badge-pro`}
                          >
                            {t("sidebar.badges.pro")}
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={cn(
        "fixed inset-s-0 top-0 z-50 flex h-screen flex-col border-e border-gray-200 bg-white px-5 text-gray-900 transition-all duration-300 ease-in-out xl:translate-x-0 xl:rtl:translate-x-0 dark:border-gray-800 dark:bg-gray-900",
        isExpanded || isMobileOpen ? "w-72.5" : isHovered ? "w-72.5" : "w-22.5",
        isMobileOpen
          ? "translate-x-0"
          : "-translate-x-full rtl:translate-x-full",
      )}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "flex py-8",
          !isExpanded && !isHovered ? "xl:justify-center" : "justify-start",
        )}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <img
                className="dark:hidden"
                src="/images/logo/logo.svg"
                alt="Logo"
                width={150}
                height={40}
              />
              <img
                className="hidden dark:block"
                src="/images/logo/logo-dark.svg"
                alt="Logo"
                width={150}
                height={40}
              />
            </>
          ) : (
            <img
              src="/images/logo/logo-icon.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 flex text-xs leading-5 text-gray-400 uppercase ${
                  !isExpanded && !isHovered
                    ? "xl:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  t("sidebar.groups.menu")
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>

            <div>
              <h2
                className={`mb-4 flex text-xs leading-5 text-gray-400 uppercase ${
                  !isExpanded && !isHovered
                    ? "xl:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  t("sidebar.groups.support")
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(supportItems, "support")}
            </div>

            <div>
              <h2
                className={`mb-4 flex text-xs leading-5 text-gray-400 uppercase ${
                  !isExpanded && !isHovered
                    ? "xl:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  t("sidebar.groups.others")
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(othersItems, "others")}
            </div>
          </div>
        </nav>

        {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null}
      </div>
    </aside>
  );
};

export default AppSidebar;
