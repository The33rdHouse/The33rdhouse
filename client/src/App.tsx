import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import ScrollToTop from "./components/ScrollToTop";
import HomeNew from "./pages/HomeNew";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Setup2FA from "./pages/Setup2FA";
import Verify2FA from "./pages/Verify2FA";
import SecurityDashboard from "./pages/SecurityDashboard";
import Dashboard from "./pages/DashboardNew";
import Gates from "./pages/Gates";
import Realms from "./pages/Realms";
import System from "./pages/System";
import GateDetail from "./pages/GateDetail";
import RealmDetail from "./pages/RealmDetail";
import Threshold from "./pages/sacred/Threshold";
import Lineage from "./pages/sacred/Lineage";
import Path from "./pages/sacred/Path";
import Portal from "./pages/sacred/Portal";
import Keeper from "./pages/sacred/Keeper";
import Blog from "./pages/sacred/Blog";
import BlogArticle from "./pages/sacred/BlogArticle";
import Journal from "./pages/sacred/Journal";
import InnerCircle from "./pages/InnerCircle";
import Meditations from "./pages/Meditations";
import AdminNotifications from "./pages/AdminNotifications";
import AdminEmailSequences from "./pages/AdminEmailSequences";
import Admin from "./pages/Admin";
import AdminOrders from "./pages/AdminOrders";
import AdminSeed from "./pages/AdminSeed";
import UserProfile from "./pages/UserProfile";
import UserSettings from "./pages/UserSettings";
import Library from "./pages/Library";
import BookReader from "./pages/BookReader";
import SacredCorpus from "./pages/SacredCorpus";

import AIChatbot from "./components/AIChatbot";
import BiggerPicture from "./pages/BiggerPicture";
import Pricing from "./pages/Pricing";
import Chartography from "./pages/Chartography";
import RealmExplorer from "./pages/RealmExplorer";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import Orders from "./pages/Orders";
import OnboardingWelcome from "./pages/OnboardingWelcome";
import OnboardingProfile from "./pages/OnboardingProfile";
import OnboardingSubscription from "./pages/OnboardingSubscription";

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Threshold} />
        <Route path="/home" component={HomeNew} />
        <Route path="/lineage" component={Lineage} />
        <Route path="/path" component={Path} />
        <Route path="/portal" component={Portal} />
        <Route path="/keeper" component={Keeper} />
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
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <AIChatbot />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
