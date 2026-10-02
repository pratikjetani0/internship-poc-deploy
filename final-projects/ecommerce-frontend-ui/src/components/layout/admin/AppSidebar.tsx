import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { adminNavigation } from "@/config/admin-navigation";
import { AppLogo } from "@/components/layout/shared";

import { NavLink } from "react-router-dom";

export default function AppSidebar() {
  const { state } = useSidebar();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <AppLogo collapsed={state === "collapsed"} />
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {adminNavigation.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild>
                <NavLink to={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>{/* User Menu later */}</SidebarFooter>
    </Sidebar>
  );
}
