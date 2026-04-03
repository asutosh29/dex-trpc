import { ArrowUp, Paperclip } from "lucide-react";

import {
  PromptInput,
  PromptInputTextarea,
} from "@repo/ui/components/ai-elements/prompt-input";
import { Button } from "@repo/ui/components/ui/button";

export function ChatInputArea({
  input,
  setInput,
  onSubmit,
}: {
  input: string;
  setInput: (val: string) => void;
  onSubmit: (message: any, event?: React.FormEvent) => void;
}) {
  return (
    <div className="mx-auto w-full max-w-3xl shrink-0 p-4 md:p-6">
      <PromptInput
        className="bg-background border-border focus-within:border-primary relative flex w-full flex-col rounded-3xl border p-2 shadow-sm transition-colors"
        onSubmit={onSubmit}
      >
        <PromptInputTextarea
          className="text-foreground placeholder:text-muted-foreground min-h-[50px] resize-none border-0 bg-transparent p-3 focus-visible:ring-0 sm:text-sm"
          placeholder="Ask anything..."
          value={input}
          onChange={(e: any) => setInput(e.target.value)}
        />

        <div className="mt-2 flex items-center justify-between pt-1">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground hover:bg-accent h-8 w-8 rounded-full"
              type="button"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
          </div>
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim()}
            className="bg-primary text-primary-foreground hover:bg-primary/90 ml-2 h-8 w-8 shrink-0 rounded-full transition-opacity disabled:opacity-50"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
      </PromptInput>
    </div>
  );
}
