import React from "react";

export interface MenuListProps {
  children: React.ReactNode;
}

export default function MenuList({ children }: MenuListProps) {
  return <div>{children}</div>;
}
