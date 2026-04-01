import { useThreadRuntime, useThread } from "@assistant-ui/react";

export function WelcomeScreen() {
  const threadRuntime = useThreadRuntime();
  // TODO:
  //   (alias) useThreadRuntime(options?: {
  //     optional?: false | undefined;
  // } | undefined): ThreadRuntime (+1 overload)
  // import useThreadRuntime
  // @deprecated
  // Use useAui() with aui.thread() instead. See migration guide: https://assistant-ui.com/docs/migrations/v0-12
  const isEmpty = useThread(state => state.messages.length === 0);
  // TODO:
  //   (alias) useThread<boolean>(selector: (state: ThreadState) => boolean): boolean (+8 overloads)
  // import useThread
  // @deprecated
  // Use useAuiState((s) => s.thread) instead. See migration guide: https://assistant-ui.com/docs/migrations/v0-12
  if (!isEmpty) return null;

  const suggestions = [
    "What's the weather like in New York?",
    "Show me how to use the demo tool",
    "Tell me a joke about programming",
    "Summarize the recent news",
  ];

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center h-full max-h-[80vh]">
      <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 text-2xl font-bold animate-pulse">
        AI
      </div>
      <h2 className="text-3xl font-semibold mb-2">Welcome ✨</h2>
      <p className="text-muted-foreground max-w-lg mb-8 text-lg">
        I am a LangGraph-powered AI assistant. Ask me anything, or try triggering my tools with specific keywords!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
        {suggestions.map((prompt, i) => (
          <button
            key={i}
            onClick={() => threadRuntime.append(prompt)}
            className="p-4 rounded-xl border bg-card hover:bg-accent hover:border-accent text-left transition-all hover:scale-[1.02]"
          >
            <p className="text-sm font-medium">{prompt}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
