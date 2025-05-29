import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";

// Assume these icons are imported from an icon library
import {
  BoxCubeIcon,
  CalenderIcon,
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  ListIcon,
  PageIcon,
  PieChartIcon,
  PlugInIcon,
  TableIcon,
  UserCircleIcon,
} from "../icons";
import { useSidebar } from "../context/SidebarContext";
import SidebarWidget from "./SidebarWidget";

type NavSubItem = {
  name: string;
  path: string;
  pro?: boolean;
  new?: boolean;
  subItems?: NavSubItem[];
};

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: NavSubItem[];
};

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    subItems: [
      { name: "Overview Ananylitics", path: "/", pro: false },
      { name: "Sales", path: "/", pro: false },
      { name: "Recent Orders", path: "/", pro: false },
      { name: "Low stock alerts", path: "/", pro: false }
    ],
  },

  {
    icon: <ListIcon />,
    name: "Attributes Management",
    subItems: [
      
      {
        name: "Product Categories",
        path: "/attributes/categories",
        subItems: [
          { name: "Category List", path: "/attributes/categories/list", pro: false },
          { name: "Add Category", path: "/attributes/categories/add", pro: false },
          { name: "Add Sub-Category", path: "/attributes/categories/import-export", pro: false },
          { name: "Sub-Category List", path: "/attributes/categories/bulk-upload", pro: false },
        ],
      },
      {
        name: "Size Charts",
        path: "/attributes/size-charts",
        subItems: [
          { name: "Size List", path: "/attributes/size-charts/list", pro: false },
          { name: "Add Size", path: "/attributes/size-charts/add", pro: false },
        ],
      },
      {
        name: "Color Variants",
        path: "/attributes/colors",
        subItems: [
          { name: "Color List", path: "/attributes/colors/list", pro: false },
          { name: "Add Color", path: "/attributes/colors/add", pro: false },
        ],
      },
      {
        name: "Brand Management",
        path: "/attributes/colors",
        subItems: [
          { name: "Brands List", path: "/attributes/colors/list", pro: false },
          { name: "Add Brand", path: "/attributes/colors/add", pro: false },
        ],
      },
      {
        name: "Custom Attributes",
        path: "/attributes/metals",
        subItems: [
          { name: "Custom Attributes List", path: "/attributes/metals/list", pro: false },
          { name: "Add Custom Attributes", path: "/attributes/metals/add", pro: false },
        ],
      },
    ],
  },

  {
    icon: <TableIcon />,
    name: "Inventory Management",
    subItems: [
      {
        name: "Stock Levels",
        path: "/inventory/stock-levels",
        subItems: [
          { name: "View Stock", path: "/inventory/stock-levels/view", pro: false },
          { name: "Update Stock", path: "/inventory/stock-levels/update", pro: false },
        ],
      },
      {
        name: "Low Stock Alerts",
        path: "/inventory/low-stock",
        subItems: [
          { name: "Alert List", path: "/inventory/low-stock/list", pro: false },
          { name: "Configure Alerts", path: "/inventory/low-stock/configure", pro: false },
        ],
      },
      {
        name: "Stock Movements",
        path: "/inventory/movements",
        subItems: [
          { name: "Movement List", path: "/inventory/movements/list", pro: false },
          { name: "Add Movement", path: "/inventory/movements/add", pro: false },
        ],
      },
      {
        name: "Inventory Adjustments",
        path: "/inventory/adjustments",
        subItems: [
          { name: "Adjustment List", path: "/inventory/adjustments/list", pro: false },
          { name: "Add Adjustment", path: "/inventory/adjustments/add", pro: false },
        ],
      },
      {
        name: "Suppliers Management",
        path: "/inventory/suppliers",
        subItems: [
          { name: "Suppliers List", path: "/inventory/suppliers/list", pro: false },
          { name: "Add Supplier", path: "/inventory/suppliers/add", pro: false },
        ],
      },
      {
        name: "Purchase Orders",
        path: "/inventory/purchase-orders",
        subItems: [
          { name: "Orders List", path: "/inventory/purchase-orders/list", pro: false },
          { name: "Create Order", path: "/inventory/purchase-orders/add", pro: false },
        ],
      },
    ],
  },
  {
    icon: <BoxCubeIcon />,
    name: "Product Management",
    subItems: [
      {
        name: "All Products",
        path: "/products/all",
        pro: false,
      },
      {
        name: "Add New Product",
        path: "/products/add",
        pro: false,
      },
      {
        name: "Bulk Product Upload",
        path: "/products/bulk-upload",
        pro: false,
      },
      {
        name: "Product Import/Export",
        path: "/products/import-export",
        pro: false,
      },
    ],
  },

  {
    icon: <PageIcon />,
    name: "Order Management",
    subItems: [
      { name: "All Orders", path: "/orders/all", pro: false },
      { name: "Pending Orders", path: "/orders/pending", pro: false },
      { name: "Processing Orders", path: "/orders/processing", pro: false },
      { name: "Shipped Orders", path: "/orders/shipped", pro: false },
      { name: "Completed Orders", path: "/orders/completed", pro: false },
      { name: "Cancelled/Refunded Orders", path: "/orders/cancelled-refunded", pro: false },
      { name: "Order Tracking", path: "/orders/tracking", pro: false },
    ],
  },

  {
    icon: <PlugInIcon />,
    name: "Customer Management",
    subItems: [
      {
        name: "All Customers",
        path: "/customers/all",
        pro: false,
      },
      {
        name: "Review Management",
        path: "/customers/reviews",
        subItems: [
          { name: "Product Reviews", path: "/customers/reviews/products", pro: false },
          { name: "Customer Feedback", path: "/customers/reviews/feedback", pro: false }
  
        ],
      },
    ],
  },

  {
    icon: <CalenderIcon />,
    name: "Calendar",
    path: "/calendar",
  },
  {
    icon: <UserCircleIcon />,
    name: "User Profile",
    path: "/profile",
  },
  {
    name: "Forms",
    icon: <ListIcon />,
    subItems: [{ name: "Form Elements", path: "/form-elements", pro: false }],
  },
  {
    name: "Tables",
    icon: <TableIcon />,
    subItems: [{ name: "Basic Tables", path: "/basic-tables", pro: false }],
  },
  {
    name: "Pages",
    icon: <PageIcon />,
    subItems: [
      { name: "Blank Page", path: "/blank", pro: false },
      { name: "404 Error", path: "/error-404", pro: false },
    ],
  },
];

const othersItems: NavItem[] = [
  {
    icon: <PieChartIcon />,
    name: "Charts",
    subItems: [
      { name: "Line Chart", path: "/line-chart", pro: false },
      { name: "Bar Chart", path: "/bar-chart", pro: false },
    ],
  },
  {
    icon: <BoxCubeIcon />,
    name: "UI Elements",
    subItems: [
      { name: "Alerts", path: "/alerts", pro: false },
      { name: "Avatar", path: "/avatars", pro: false },
      { name: "Badge", path: "/badge", pro: false },
      { name: "Buttons", path: "/buttons", pro: false },
      { name: "Images", path: "/images", pro: false },
      { name: "Videos", path: "/videos", pro: false },
    ],
  },
  {
    icon: <PlugInIcon />,
    name: "Authentication",
    subItems: [
      { name: "Sign In", path: "/signin", pro: false },
      { name: "Sign Up", path: "/signup", pro: false },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState<string[]>([]);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  // Function to check if any subitem is active recursively
  const hasActiveSubItem = useCallback((subItems: NavSubItem[]): boolean => {
    return subItems.some(subItem => {
      if (isActive(subItem.path)) return true;
      if (subItem.subItems) return hasActiveSubItem(subItem.subItems);
      return false;
    });
  }, [isActive]);

  // Auto-expand menus based on active route
  useEffect(() => {
    const activeMenus: string[] = [];
    
    const checkMenuItems = (items: NavItem[], prefix: string) => {
      items.forEach((nav, index) => {
        const menuKey = `${prefix}-${index}`;
        if (nav.subItems && hasActiveSubItem(nav.subItems)) {
          activeMenus.push(menuKey);
          
          // Check for nested submenus
          nav.subItems.forEach((subItem, subIndex) => {
            const subMenuKey = `${menuKey}-${subIndex}`;
            if (subItem.subItems && hasActiveSubItem(subItem.subItems)) {
              activeMenus.push(subMenuKey);
            }
          });
        }
      });
    };

    checkMenuItems(navItems, "main");
    checkMenuItems(othersItems, "others");
    
    setOpenSubmenu(activeMenus);
  }, [location, hasActiveSubItem]);

  // Update submenu heights when they open
  useEffect(() => {
    openSubmenu.forEach(key => {
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    });
  }, [openSubmenu]);

  const handleSubmenuToggle = (menuKey: string) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (prevOpenSubmenu.includes(menuKey)) {
        return prevOpenSubmenu.filter(key => key !== menuKey);
      }
      return [...prevOpenSubmenu, menuKey];
    });
  };

  // Recursive function to render subitems
  const renderSubItems = (subItems: NavSubItem[], parentKey: string, level: number = 1) => {
    return subItems.map((subItem, index) => {
      const subMenuKey = `${parentKey}-${index}`;
      const marginLeft = level === 1 ? "ml-9" : `ml-${9 + (level - 1) * 4}`;
      
      return (
        <li key={subItem.name}>
          {subItem.subItems ? (
            <>
              <button
                onClick={() => handleSubmenuToggle(subMenuKey)}
                className={`menu-dropdown-item cursor-pointer w-full text-left ${
                  openSubmenu.includes(subMenuKey) || hasActiveSubItem(subItem.subItems || [])
                    ? "menu-dropdown-item-active"
                    : "menu-dropdown-item-inactive"
                }`}
              >
                <span className="flex items-center justify-between w-full">
                  <span>{subItem.name}</span>
                  <span className="flex items-center gap-1">
                    {subItem.new && (
                      <span className={`menu-dropdown-badge ${
                        openSubmenu.includes(subMenuKey) || hasActiveSubItem(subItem.subItems || [])
                          ? "menu-dropdown-badge-active"
                          : "menu-dropdown-badge-inactive"
                      }`}>
                        new
                      </span>
                    )}
                    {subItem.pro && (
                      <span className={`menu-dropdown-badge ${
                        openSubmenu.includes(subMenuKey) || hasActiveSubItem(subItem.subItems || [])
                          ? "menu-dropdown-badge-active"
                          : "menu-dropdown-badge-inactive"
                      }`}>
                        pro
                      </span>
                    )}
                    <ChevronDownIcon
                      className={`w-4 h-4 transition-transform duration-200 ${
                        openSubmenu.includes(subMenuKey) ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </span>
              </button>
              <div
                ref={(el) => {
                  subMenuRefs.current[subMenuKey] = el;
                }}
                className="overflow-hidden transition-all duration-300"
                style={{
                  height: openSubmenu.includes(subMenuKey)
                    ? `${subMenuHeight[subMenuKey]}px`
                    : "0px",
                }}
              >
                <ul className={`mt-2 space-y-1 ${marginLeft}`}>
                  {renderSubItems(subItem.subItems, subMenuKey, level + 1)}
                </ul>
              </div>
            </>
          ) : (
            <Link
              to={subItem.path}
              className={`menu-dropdown-item ${
                isActive(subItem.path)
                  ? "menu-dropdown-item-active"
                  : "menu-dropdown-item-inactive"
              }`}
            >
              {subItem.name}
              <span className="flex items-center gap-1 ml-auto">
                {subItem.new && (
                  <span className={`menu-dropdown-badge ${
                    isActive(subItem.path)
                      ? "menu-dropdown-badge-active"
                      : "menu-dropdown-badge-inactive"
                  }`}>
                    new
                  </span>
                )}
                {subItem.pro && (
                  <span className={`menu-dropdown-badge ${
                    isActive(subItem.path)
                      ? "menu-dropdown-badge-active"
                      : "menu-dropdown-badge-inactive"
                  }`}>
                    pro
                  </span>
                )}
              </span>
            </Link>
          )}
        </li>
      );
    });
  };

  const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => {
        const menuKey = `${menuType}-${index}`;
        
        return (
          <li key={nav.name}>
            {nav.subItems ? (
              <button
                onClick={() => handleSubmenuToggle(menuKey)}
                className={`menu-item group ${
                  openSubmenu.includes(menuKey) || hasActiveSubItem(nav.subItems)
                    ? "menu-item-active"
                    : "menu-item-inactive"
                } cursor-pointer ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "lg:justify-start"
                }`}
              >
                <span
                  className={`menu-item-icon-size ${
                    openSubmenu.includes(menuKey) || hasActiveSubItem(nav.subItems)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
                {(isExpanded || isHovered || isMobileOpen) && (
                  <ChevronDownIcon
                    className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                      openSubmenu.includes(menuKey)
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
                  className={`menu-item group ${
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
                    <span className="menu-item-text">{nav.name}</span>
                  )}
                </Link>
              )
            )}
            {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
              <div
                ref={(el) => {
                  subMenuRefs.current[menuKey] = el;
                }}
                className="overflow-hidden transition-all duration-300"
                style={{
                  height: openSubmenu.includes(menuKey)
                    ? `${subMenuHeight[menuKey]}px`
                    : "0px",
                }}
              >
                <ul className="mt-2 space-y-1 ml-9">
                  {renderSubItems(nav.subItems, menuKey)}
                </ul>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
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
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>
            <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Others"
                ) : (
                  <HorizontaLDots />
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