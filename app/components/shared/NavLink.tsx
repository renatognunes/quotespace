"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={pathname === href ? "active font-semibold" : ""}
    >
      {children}
    </Link>
  );
};
