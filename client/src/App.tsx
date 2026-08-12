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
import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { PUBLIC_PAGE_IMPORTERS } from "./lib/renderingPerformance";

const About = lazy(PUBLIC_PAGE_IMPORTERS.about);
const Blog = lazy(PUBLIC_PAGE_IMPORTERS.blog);
const Contact = lazy(PUBLIC_PAGE_IMPORTERS.contact);
const GraphicDesign = lazy(PUBLIC_PAGE_IMPORTERS.graphicDesign);
const Home = lazy(PUBLIC_PAGE_IMPORTERS.home);
const LargeFormat = lazy(PUBLIC_PAGE_IMPORTERS.largeFormat);
const PrintProcurement = lazy(PUBLIC_PAGE_IMPORTERS.printProcurement);
const BlogPost = lazy(PUBLIC_PAGE_IMPORTERS.blogPost);
const Gallery = lazy(PUBLIC_PAGE_IMPORTERS.gallery);
const Admin = lazy(PUBLIC_PAGE_IMPORTERS.admin);
const RequestQuote = lazy(PUBLIC_PAGE_IMPORTERS.requestQuote);

function Router() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" aria-busy="true" />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/large-format-printing" component={LargeFormat} />
        <Route path="/graphic-design" component={GraphicDesign} />
        <Route path="/print-procurement" component={PrintProcurement} />
        <Route path="/blog" component={Blog} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/admin" component={Admin} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/request-quote" component={RequestQuote} />
        <Route path="/contact" component={Contact} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
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
