'use client';

import { Home, Boxes, Users, Activity, User } from "lucide-react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";

const items = [
  { icon: Home, title: 'Home', url: '/dashboard' },
  { icon: Boxes, title: 'Parts', url: '/dashboard/parts' },
  { icon: Activity, title: 'Activities', url: '/dashboard/activities' },
  { icon: Users, title: 'Users', url: '/dashboard/users' },
];

export function AppSidebar() {
  return (
    <Sidebar
      className="fixed left-0 h-screen bg-white border-r shadow-sm"
      collapsible="icon"
    >
      <SidebarContent className="flex-1 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="group flex items-center px-4 py-2 mx-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 text-gray-700 hover:text-gray-900"
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      <span className="ml-3 text-sm font-medium">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* <div className="border-t p-4">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
            <User className="w-4 h-4 text-gray-700" />
          </div>
          <div className="ml-3 flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              John Doe
            </p>
            <p className="text-xs text-gray-500 truncate">
              johndoe@example.com
            </p>
          </div>
        </div>
      </div> */}
      <SidebarFooter>
        <NavUser user={
           { name: 'John Doe',
            email: 'johndoe@example.com',
            picture: '/avatar.jpg',}
        } 
    />
      </SidebarFooter>
      <SidebarRail/>
    </Sidebar>
  );
}
