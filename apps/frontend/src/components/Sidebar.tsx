import { useNavigate, useParams } from "react-router";
import { trpcClient } from "../lib/trpc";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function Sidebar() {
  const navigate = useNavigate();
  const { threadId } = useParams();
  // TODO: implement facade pattern and abstract away
  const queryClient = useQueryClient();

  const { data: threads, isLoading } = useQuery({
    queryKey: ["agent.thread.list"],
    queryFn: async () => trpcClient.agent.thread.list.query(),
  });

  const createMutation = useMutation({
    mutationFn: () => trpcClient.agent.thread.create.mutate(),
    onSuccess: (data: { id: string }) => {
      queryClient.invalidateQueries({ queryKey: ["agent.thread.list"] });
      navigate(`/chat/${data.id}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => trpcClient.agent.thread.delete.mutate({ id }),
    onSuccess: (_, id: string) => {
      queryClient.invalidateQueries({ queryKey: ["agent.thread.list"] });
      if (threadId === id) navigate("/chat");
    },
  });

  const renameMutation = useMutation({
    mutationFn: ({ id, title }: { id: string; title: string }) =>
      trpcClient.agent.thread.rename.mutate({ id, title }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agent.thread.list"] });
    },
  });

  return (
    <div className="flex flex-col w-64 h-full border-r bg-background/95 p-4">
      <button
        onClick={() => createMutation.mutate()}
        className="w-full mb-4 px-4 py-2 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
      >
        + New Chat
      </button>

      <div className="flex-1 overflow-y-auto space-y-2">
        {isLoading && <p className="text-sm text-muted-foreground">Loading threads...</p>}
        {threads?.map((thread: any) => (
          <div
            key={thread.thread_id}
            className={`p-3 rounded-md cursor-pointer flex justify-between items-center group ${threadId === thread.thread_id ? "bg-accent text-accent-foreground" : "hover:bg-accent/50 text-muted-foreground"
              }`}
            onClick={() => navigate(`/chat/${thread.thread_id}`)}
          >
            <span className="truncate text-sm font-medium">
              {thread.metadata?.title || "New Thread"}
            </span>
            <div className="hidden group-hover:flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const newTitle = prompt("Enter new title:", thread.metadata?.title || "");
                  if (newTitle) renameMutation.mutate({ id: thread.thread_id, title: newTitle });
                }}
                className="text-xs text-blue-500 hover:text-blue-700"
              >
                Rename
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteMutation.mutate(thread.thread_id);
                }}
                className="text-xs text-red-500 hover:text-red-700"
              >
                Del
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
