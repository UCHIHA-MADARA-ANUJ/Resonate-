import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LenisProvider } from "@/presentation/layouts/LenisProvider";
import { AppProvider } from "@/presentation/layouts/AppProvider";
import { CustomCursor } from "@/presentation/components/CustomCursor";
import { CustomContextMenu } from "@/presentation/components/ui/ContextMenu";
import { GlobalNav } from "@/presentation/components/navigation/GlobalNav";
import Home from "@/app/page";
import About from "@/app/about/page";
import Archives from "@/app/archives/page";
import Blog from "@/app/blog/page";
import Careers from "@/app/careers/page";
import Crdt from "@/app/crdt/page";
import Engine from "@/app/engine/page";
import Features from "@/app/features/page";
import EchoStudio from "@/app/features/echo-studio/page";
import EmpathyCoach from "@/app/features/empathy-coach/page";
import HeritageEchoes from "@/app/features/heritage-echoes/page";
import MoodGenome from "@/app/features/mood-genome/page";
import Resoquests from "@/app/features/resoquests/page";
import SafeCircles from "@/app/features/safe-circles/page";
import Founders from "@/app/founders/page";
import Impact from "@/app/impact/page";
import Join from "@/app/join/page";
import Manifesto from "@/app/manifesto/page";
import Privacy from "@/app/privacy/page";
import Protocol from "@/app/protocol/page";
import Roadmap from "@/app/roadmap/page";
import Schools from "@/app/schools/page";
import Technology from "@/app/technology/page";
import Telemetry from "@/app/telemetry/page";
import Terminal from "@/app/terminal/page";
import Terms from "@/app/terms/page";
import NotFound from "@/app/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/archives" component={Archives} />
      <Route path="/blog" component={Blog} />
      <Route path="/careers" component={Careers} />
      <Route path="/crdt" component={Crdt} />
      <Route path="/engine" component={Engine} />
      <Route path="/features" component={Features} />
      <Route path="/features/echo-studio" component={EchoStudio} />
      <Route path="/features/empathy-coach" component={EmpathyCoach} />
      <Route path="/features/heritage-echoes" component={HeritageEchoes} />
      <Route path="/features/mood-genome" component={MoodGenome} />
      <Route path="/features/resoquests" component={Resoquests} />
      <Route path="/features/safe-circles" component={SafeCircles} />
      <Route path="/founders" component={Founders} />
      <Route path="/impact" component={Impact} />
      <Route path="/join" component={Join} />
      <Route path="/manifesto" component={Manifesto} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/protocol" component={Protocol} />
      <Route path="/roadmap" component={Roadmap} />
      <Route path="/schools" component={Schools} />
      <Route path="/technology" component={Technology} />
      <Route path="/telemetry" component={Telemetry} />
      <Route path="/terminal" component={Terminal} />
      <Route path="/terms" component={Terms} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <div className="bg-noise" />
        <div className="scanline" />
        <CustomCursor />
        <CustomContextMenu />
        <LenisProvider>
          <AppProvider>
            <GlobalNav />
            <main className="flex-1 flex flex-col relative z-10 pt-20">
              <Router />
            </main>
          </AppProvider>
        </LenisProvider>
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
