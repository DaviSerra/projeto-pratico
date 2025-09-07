import { createRoot } from "react-dom/client";
import "./index.css";
import { AppRouter } from "./Router";
import ThemeProvider from "./providers/ThemeProvider";
import { Toaster } from "./components/ui/sonner";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <Toaster />
    <AppRouter />
  </ThemeProvider>
);
