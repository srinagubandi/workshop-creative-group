/**
 * App.tsx — Workshop Creative Group
 *
 * All routes are registered here. The site uses a light theme with
 * the elegant WSCG brand palette defined in index.css.
 *
 * Routes:
 *  /                     → Home
 *  /about                → About
 *  /large-format-printing → Large Format Printing
 *  /graphic-design       → Graphic Design
 *  /print-procurement    → Print Procurement
 *  /blog                 → Brent's Blog
 *  /blog/:slug           → Individual blog post (future)
 *  /request-quote        → Request a Quote (invoice upload)
 *  /contact              → Contact
 */

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Page imports
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import GraphicDesign from "./pages/GraphicDesign";
import Home from "./pages/Home";
import LargeFormat from "./pages/LargeFormat";
import PrintProcurement from "./pages/PrintProcurement";
import BlogPost from "./pages/BlogPost";
import RequestQuote from "./pages/RequestQuote";

function Router() {
  return (
    <Switch>
      {/* Main pages */}
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/large-format-printing" component={LargeFormat} />
      <Route path="/graphic-design" component={GraphicDesign} />
      <Route path="/print-procurement" component={PrintProcurement} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/request-quote" component={RequestQuote} />
      <Route path="/contact" component={Contact} />

      {/* 404 */}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      {/* Light theme — matches the premium white/navy WSCG brand */}
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
