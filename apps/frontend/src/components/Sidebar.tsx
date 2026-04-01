import { ThreadList } from "@repo/ui/components/assistant-ui/thread-list";

export function Sidebar() {
  return (
    <div className="flex flex-col w-64 h-full border-r bg-background/95 p-4 overflow-y-auto">
      <ThreadList />
    </div>
  );
}
