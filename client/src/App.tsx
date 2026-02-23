import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import ScrollToTop from "./components/ScrollToTop";

// Eagerly loaded - landing page for fast initial render
import HomeNew from "./pages/HomeNew";

// Lazy-loaded pages
const NotFound = lazy(() => import("@/pages/NotFound"));
const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Setup2FA = lazy(() => import("./pages/Setup2FA"));
const Verify2FA = lazy(() => import("./pages/Verify2FA"));
const SecurityDashboard = lazy(() => import("./pages/SecurityDashboard"));
const Dashboard = lazy(() => import("./pages/DashboardNew"));
const Gates = lazy(() => import("./pages/Gates"));
const Realms = lazy(() => import("./pages/Realms"));
const System = lazy(() => import("./pages/System"));
const GateDetail = lazy(() => import("./pages/GateDetail"));
const RealmDetail = lazy(() => import("./pages/RealmDetail"));
const Threshold = lazy(() => import("./pages/sacred/Threshold"));
const Lineage = lazy(() => import("./pages/sacred/Lineage"));
const Path = lazy(() => import("./pages/sacred/Path"));
const Portal = lazy(() => import("./pages/sacred/Portal"));
const Keeper = lazy(() => import("./pages/sacred/Keeper"));
const Blog = lazy(() => import("./pages/sacred/Blog"));
const BlogArticle = lazy(() => import("./pages/sacred/BlogArticle"));
const Journal = lazy(() => import("./pages/sacred/Journal"));
const InnerCircle = lazy(() => import("./pages/InnerCircle"));
const Meditations = lazy(() => import("./pages/Meditations"));
const AdminNotifications = lazy(() => import("./pages/AdminNotifications"));
const AdminEmailSequences = lazy(() => import("./pages/AdminEmailSequences"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminOrders = lazy(() => import("./pages/AdminOrders"));
const AdminSeed = lazy(() => import("./pages/AdminSeed"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const UserSettings = lazy(() => import("./pages/UserSettings"));
const Library = lazy(() => import("./pages/Library"));
const BookReader = lazy(() => import("./pages/BookReader"));
const SacredCorpus = lazy(() => import("./pages/SacredCorpus"));
const AIChatbot = lazy(() => import("./components/AIChatbot"));
const BiggerPicture = lazy(() => import("./pages/BiggerPicture"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Chartography = lazy(() => import("./pages/Chartography"));
const RealmExplorer = lazy(() => import("./pages/RealmExplorer"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Orders = lazy(() => import("./pages/Orders"));
const OnboardingWelcome = lazy(() => import("./pages/OnboardingWelcome"));
const OnboardingProfile = lazy(() => import("./pages/OnboardingProfile"));
const OnboardingSubscription = lazy(() => import("./pages/OnboardingSubscription"));
const KnowledgeBase = lazy(() => import("./pages/KnowledgeBase"));

function PageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-muted-foreground text-sm">Loading...</p>
      </div>
    </div>
  );
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageFallback />}>
        <Switch>
          <Route path={"/"} component={HomeNew} />
          <Route path="/bigger-picture" component={BiggerPicture} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/chartography" component={Chartography} />
          <Route path="/shop/:slug" component={ProductDetail} />
          <Route path="/shop" component={Shop} />
          <Route path="/cart" component={Cart} />
          <Route path="/orders" component={Orders} />
          <Route path={"/signup"} component={Signup} />
          <Route path={"/login"} component={Login} />
          <Route path="/verify-email" component={VerifyEmail} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/setup-2fa" component={Setup2FA} />
          <Route path="/verify-2fa" component={Verify2FA} />
          <Route path="/security" component={SecurityDashboard} />
          <Route path="/onboarding/welcome" component={OnboardingWelcome} />
          <Route path="/onboarding/profile" component={OnboardingProfile} />
          <Route path="/onboarding/subscription" component={OnboardingSubscription} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/profile" component={UserProfile} />
          <Route path="/settings" component={UserSettings} />
          <Route path="/library" component={Library} />
          <Route path="/corpus" component={SacredCorpus} />
          <Route path="/library/:id" component={BookReader} />
          <Route path="/inner-circle" component={InnerCircle} />
          <Route path="/meditations" component={Meditations} />
          <Route path="/knowledge" component={KnowledgeBase} />
          <Route path="/admin/seed" component={AdminSeed} />
          <Route path="/admin/orders" component={AdminOrders} />
          <Route path="/admin" component={Admin} />
          <Route path="/admin/notifications" component={AdminNotifications} />
          <Route path="/admin/email-sequences" component={AdminEmailSequences} />
          <Route path={"/system"} component={System} />
          <Route path={"/gates"} component={Gates} />
          <Route path={"/gates/:id"} component={GateDetail} />
          <Route path={"/realms"} component={Realms} />
          <Route path={"/realm-explorer"} component={RealmExplorer} />
          <Route path={"/realms/:id"} component={RealmDetail} />
          <Route path={"/sacred/threshold"} component={Threshold} />
          <Route path={"/sacred/lineage"} component={Lineage} />
          <Route path={"/sacred/path"} component={Path} />
          <Route path={"/sacred/portal"} component={Portal} />
          <Route path={"/sacred/keeper"} component={Keeper} />
          <Route path={"/sacred/blog"} component={Blog} />
          <Route path={"/sacred/blog/:slug"} component={BlogArticle} />
          <Route path={"/sacred/journal"} component={Journal} />
          <Route path={"/404"} component={NotFound} />
          {/* Final fallback route */}
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Suspense fallback={null}>
            <AIChatbot />
          </Suspense>
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
