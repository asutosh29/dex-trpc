import { SidebarTrigger } from "@repo/ui/components/ui/sidebar";

export function ChatHeader() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 px-4">
      <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
    </header>
  );
}
