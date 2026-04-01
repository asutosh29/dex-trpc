import { makeAssistantToolUI } from "@assistant-ui/react";

type WeatherArgs = { city?: string };

export const WeatherToolUI = makeAssistantToolUI<WeatherArgs, string>({
  toolName: "weather_tool",
  render: ({ args, result, status }) => {
    if (status.type === "running") {
      return (
        <div className="my-2 p-4 rounded-lg border bg-muted/50 animate-pulse flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
            🌤
          </div>
          <div>
            <p className="text-sm font-medium">Fetching weather...</p>
            <p className="text-xs text-muted-foreground">
              Looking up weather for{" "}
              <span className="font-mono">{args?.city ?? "..."}</span>
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="my-2 p-4 rounded-lg border bg-card">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-xl">
            ☀️
          </div>
          <div>
            <p className="text-sm font-semibold">
              Weather for {args?.city}
            </p>
            <p className="text-sm text-muted-foreground">
              {typeof result === "string" ? result : JSON.stringify(result)}
            </p>
          </div>
        </div>
      </div>
    );
  },
});
