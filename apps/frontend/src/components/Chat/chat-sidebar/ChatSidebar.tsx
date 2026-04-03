import {
  MessageSquare,
  Plus,
  Settings,
  Trash2,
  UserCircle,
} from "lucide-react";

import { Button } from "@repo/ui/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/ui/components/ui/sidebar";

const MOCK_HISTORY = [
  { id: "1", title: "React Composition Patterns", date: "Today" },
  { id: "2", title: "Next.js App Router Guide", date: "Yesterday" },
  { id: "3", title: "Fixing Shadcn UI Styling", date: "Previous 7 Days" },
  { id: "4", title: "Dijkstra's Algorithm Python", date: "Previous 7 Days" },
];

export function ChatSidebar() {
  return (
    <Sidebar className="border-r border-[#222]">
      {/* Top Actions */}
      <SidebarHeader className="mt-2 p-4">
        <Button
          variant="outline"
          className="flex justify-start gap-2 border-[#333] bg-transparent text-gray-200 hover:bg-[#1A1A1A]"
        >
          <Plus className="h-4 w-4" />
          <span className="text-sm font-medium">New Chat</span>
        </Button>
      </SidebarHeader>

      {/* Chat History List */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="tracking-wider text-gray-500">
            HISTORY
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MOCK_HISTORY.map((chat) => (
                <SidebarMenuItem key={chat.id}>
                  <SidebarMenuButton className="text-gray-300 hover:bg-[#1A1A1A] hover:text-white">
                    <MessageSquare className="h-4 w-4 text-gray-500" />
                    <span>{chat.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Bottom Profile Stub */}
      <SidebarFooter className="border-t border-[#222] p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-gray-400 hover:bg-[#1A1A1A] hover:text-red-400">
              <Trash2 className="h-4 w-4" />
              <span>Clear all chats</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="mt-2 flex w-full items-center justify-between rounded-xl border border-[#222] bg-[#111] p-2 text-white">
            <div className="ml-2 flex items-center gap-3 overflow-hidden">
              <UserCircle className="h-8 w-8 shrink-0 text-gray-400" />
              <div className="flex flex-col truncate">
                <span className="truncate text-sm font-medium">Guest User</span>
                <span className="truncate text-xs text-gray-500">
                  Free Plan
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-400 hover:bg-[#222] hover:text-white"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
