export type ErpAppId = "issues";

export type ErpAppPath = "/home";

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
];

export const getActiveApp = (pathname: string): ErpApp | undefined =>
  ERP_APPS.find((app) => app.isActive(pathname));

export const appShowsSidebar = (app: ErpApp | undefined): boolean => app?.id === "issues";
