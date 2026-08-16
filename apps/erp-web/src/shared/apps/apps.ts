export type ErpAppId = "issues" | "inventory" | "catalog";

export type ErpAppPath = "/home" | "/inventory" | "/catalog";

export type ErpApp = {
  id: ErpAppId;
  label: string;
  to: ErpAppPath;
  isActive: (pathname: string) => boolean;
};

export const ERP_APPS: readonly ErpApp[] = [
  {
    id: "issues",
    label: "Issue Tracker",
    to: "/home",
    isActive: (pathname) =>
      pathname === "/home" || pathname.startsWith("/i/") || pathname.startsWith("/v/"),
  },
  {
    id: "inventory",
    label: "Inventory",
    to: "/inventory",
    isActive: (pathname) => pathname === "/inventory" || pathname.startsWith("/inventory/"),
  },
  {
    id: "catalog",
    label: "Catalog",
    to: "/catalog",
    isActive: (pathname) => pathname === "/catalog" || pathname.startsWith("/catalog/"),
  },
];

export const getActiveApp = (pathname: string): ErpApp | undefined =>
  ERP_APPS.find((app) => app.isActive(pathname));

export const appShowsSidebar = (app: ErpApp | undefined): boolean => app?.id === "issues";
