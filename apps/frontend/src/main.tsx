import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import { ThemeProvider } from "@repo/ui/components/theme-provider";
import { SidebarProvider } from "@repo/ui/components/ui/sidebar";
import "@repo/ui/index.css";

import Chat from "./pages/Chat/Chat.tsx";
import Home from "./pages/Home/Home.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider className="bg-background text-foreground h-screen overflow-hidden antialiased">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </ThemeProvider>
  </StrictMode>
);
