import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ThemeProvider } from "@repo/ui/components/theme-provider";
import { SidebarProvider } from "@repo/ui/components/ui/sidebar";
import "@repo/ui/index.css";

import { trpcClient } from "./lib/trpc.ts";
import Chat from "./pages/Chat/Chat.tsx";
import Home from "./pages/Home/Home.tsx";
import { TRPCProvider } from "./utils/trpc.ts";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <SidebarProvider className="bg-background text-foreground h-screen overflow-hidden antialiased">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/chat" element={<Chat />}>
                  <Route path=":threadId" element={<Chat />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </SidebarProvider>
        </ThemeProvider>
      </TRPCProvider>
    </QueryClientProvider>
  </StrictMode>
);
