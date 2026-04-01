const SUGGESTIONS = [
  "What are the advantages of using Next.js?",
  "Write code to demonstrate Dijkstra's algorithm",
  "Help me write an essay about Silicon Valley",
  "What is the weather in San Francisco?",
];

export function ChatEmptyState({
  onSuggestionClick,
}: {
  onSuggestionClick: (suggestion: string) => void;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-4">
      <h1 className="mb-2 text-3xl font-semibold tracking-tight md:text-4xl">
        What can I help with?
      </h1>
      <p className="text-muted-foreground mb-12">
        Ask a question, write code, or explore ideas.
      </p>

      <div className="grid w-full max-w-3xl grid-cols-1 gap-3 md:grid-cols-2">
        {SUGGESTIONS.map((suggestion, idx) => (
          <button
            key={idx}
            className="border-border bg-card/50 hover:bg-accent/50 text-card-foreground flex items-center rounded-xl border p-4 text-left text-sm shadow-sm transition-colors"
            onClick={() => onSuggestionClick(suggestion)}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
