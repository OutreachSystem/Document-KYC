"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  BriefcaseBusiness,
  ScanText,
  Smartphone,
  Users,
  Building2,
  IdCard,
  FileText,
  Blocks,
  CircleHelp,
  CircleUserRound,
  Settings,
  ChevronLeft,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";

const primaryNav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/idv", label: "IDV", icon: BriefcaseBusiness },
  { href: "/idp", label: "IDP", icon: ScanText },
  { href: "/aml", label: "AML", icon: Smartphone },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/kyb", label: "KYB", icon: Building2 },
  { href: "/kyc", label: "KYC", icon: IdCard },
];

const secondaryNav = [
  { href: "/docs", label: "Docs", icon: FileText },
  { href: "/component", label: "Component", icon: Blocks },
  { href: "/help", label: "Help", icon: CircleHelp },
];

export function Sidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <aside
      className={`sticky top-0 flex h-screen shrink-0 flex-col border-r border-gray-200 bg-white transition-[width] duration-200 ${
        collapsed ? "w-[64px]" : "w-[172px]"
      }`}
    >
      <div className="flex h-16 items-center justify-center px-3">
        <Link href="/dashboard" aria-label="Document KYC home">
          <Logo markOnly={collapsed} className={collapsed ? "" : "text-[15px]"} />
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 pb-4">
        <ul className="space-y-0.5">
          {primaryNav.map(({ href, label, icon: Icon }) => {
            const active = isActive(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  title={collapsed ? label : undefined}
                  className={`relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] transition ${
                    active
                      ? "bg-brand-50 font-semibold text-brand-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  } ${collapsed ? "justify-center" : ""}`}
                >
                  <Icon
                    className={`h-[18px] w-[18px] shrink-0 ${
                      active ? "text-brand-600" : "text-gray-400"
                    }`}
                  />
                  {!collapsed && <span className="truncate">{label}</span>}
                  {active && (
                    <span className="absolute -right-2 top-1/2 h-7 w-[3px] -translate-y-1/2 rounded-full bg-brand-600" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="my-3 border-t border-gray-200" />

        <ul className="space-y-0.5">
          {secondaryNav.map(({ href, label, icon: Icon }) => {
            const active = isActive(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  title={collapsed ? label : undefined}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] transition ${
                    active
                      ? "bg-brand-50 font-semibold text-brand-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  } ${collapsed ? "justify-center" : ""}`}
                >
                  <Icon
                    className={`h-[18px] w-[18px] shrink-0 ${
                      active ? "text-brand-600" : "text-gray-400"
                    }`}
                  />
                  {!collapsed && <span className="truncate">{label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div
        className={`flex items-center border-t border-gray-100 px-3 py-4 ${
          collapsed ? "flex-col gap-4" : "justify-between"
        }`}
      >
        <Link
          href="/profile"
          className="text-gray-500 transition hover:text-brand-600"
          aria-label="Profile"
        >
          <CircleUserRound className="h-[18px] w-[18px]" />
        </Link>
        <Link
          href="/settings"
          className="text-gray-500 transition hover:text-brand-600"
          aria-label="Settings"
        >
          <Settings className="h-[18px] w-[18px]" />
        </Link>
        <button className="text-base leading-none" aria-label="Language">
          🇺🇸
        </button>
        <button
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="text-gray-500 transition hover:text-brand-600"
        >
          <ChevronLeft
            className={`h-[18px] w-[18px] transition-transform ${
              collapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
    </aside>
  );
}
