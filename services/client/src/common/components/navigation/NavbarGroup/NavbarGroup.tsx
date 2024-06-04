import React from "react";

interface NavbarGroup {
  children: React.ReactNode;
}

export default function NavbarGroup({ children }: NavbarGroup) {
  return <>{children}</>;
}
