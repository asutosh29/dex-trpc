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
        className="relative flex w-full flex-col rounded-2xl border border-[#222] bg-[#111] p-2 shadow-sm transition-colors focus-within:border-[#333]"
        onSubmit={onSubmit}
      >
        <PromptInputTextarea
          className="min-h-[50px] resize-none border-0 bg-transparent p-3 text-white placeholder:text-[#555] focus-visible:ring-0 sm:text-sm"
          placeholder="Ask anything..."
          value={input}
          onChange={(e: any) => setInput(e.target.value)}
        />

        <div className="mt-2 flex items-center justify-between pt-1">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-[#aaa] hover:bg-[#222] hover:text-white"
              type="button"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
          </div>
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim()}
            className="h-8 w-8 rounded-full bg-white text-black transition-opacity hover:bg-gray-200 disabled:opacity-50"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
      </PromptInput>
    </div>
  );
}
