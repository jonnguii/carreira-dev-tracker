import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import DashboardV2 from "./pages/DashboardV2";
import StudyTracker from "./pages/StudyTracker";
import PomodoroPage from "./pages/PomodoroPage";
import TrilhaSpring from "./pages/TrilhaSpring";
import TrilhaReact from "./pages/TrilhaReact";
import TrilhaJasper from "./pages/TrilhaJasper";
import TrilhaJSF from "./pages/TrilhaJSF";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/dashboard"} component={DashboardV2} />
      <Route path={"/study-tracker"} component={StudyTracker} />
      <Route path={"/pomodoro"} component={PomodoroPage} />
      <Route path={"/spring-java"} component={TrilhaSpring} />
      <Route path={"/javascript-react"} component={TrilhaReact} />
      <Route path={"/jasper-sql"} component={TrilhaJasper} />
      <Route path={"/jsf-jsp"} component={TrilhaJSF} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
