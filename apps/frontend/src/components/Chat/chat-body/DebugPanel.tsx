import { useState } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { useChatContext } from "../context/ChatProvider";

export function DebugPanel() {
  const { streamData, isStreaming } = useChatContext();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`border-border bg-background fixed inset-y-0 right-0 z-50 flex flex-col border-l shadow-2xl transition-all duration-300 ease-in-out ${isCollapsed ? "w-12 px-2 py-4" : "w-[500px] p-4"}`}
    >
      <div
        className={`mb-4 flex shrink-0 items-center ${isCollapsed ? "justify-center" : "justify-between"}`}
      >
        {!isCollapsed && (
          <h3 className="text-foreground flex items-center gap-2 text-sm font-semibold">
            Parsed LangGraph State
            {isStreaming && (
              <span className="relative flex h-3 w-3">
                <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
                <span className="bg-primary relative inline-flex h-3 w-3 rounded-full"></span>
              </span>
            )}
          </h3>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hover:bg-muted flex shrink-0 items-center justify-center rounded-md p-1.5 transition-colors"
          title={isCollapsed ? "Expand" : "Collapse"}
        >
          {isCollapsed ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {!isCollapsed && (
        <div className="flex flex-1 flex-col overflow-hidden">
          <pre className="text-muted-foreground wrap-break-words bg-muted/30 flex-1 overflow-y-auto rounded-md p-4 font-mono text-[11px] leading-tight whitespace-pre-wrap">
            {JSON.stringify(streamData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
