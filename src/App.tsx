import { Routes, Route, Navigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import { Suspense, lazy } from 'react';

// Layout
import Layout from './components/Layout';
import DashboardLayout from './components/DashboardLayout';
import CustomerLayout from './components/CustomerLayout';
import AdminLayout from './components/AdminLayout';

// Public pages
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import CustomerLogin from './pages/CustomerLogin';
import CustomerRegister from './pages/CustomerRegister';
const Home = lazy(() => import('./pages/Home'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Services = lazy(() => import('./pages/Services'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const SamplesPage = lazy(() => import('./pages/SamplesPage'));
const HowItWorksPage = lazy(() => import('./pages/HowItWorksPage'));
const IndustriesPage = lazy(() => import('./pages/IndustriesPage'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const FaqPage = lazy(() => import('./pages/FaqPage'));
const SitemapPage = lazy(() => import('./pages/SitemapPage'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const RefundPolicy = lazy(() => import('./pages/RefundPolicy'));

// Dashboard pages
const DashboardHome = lazy(() => import('./pages/dashboard/DashboardHome'));
const CardList = lazy(() => import('./pages/dashboard/CardList'));
const CardDetail = lazy(() => import('./pages/dashboard/CardDetail'));
const CardEdit = lazy(() => import('./pages/dashboard/CardEdit'));
const CardBuilder = lazy(() => import('./pages/dashboard/CardBuilder'));
const Support = lazy(() => import('./pages/dashboard/Support'));
const SettingsPage = lazy(() => import('./pages/dashboard/Settings'));
const AdminPage = lazy(() => import('./pages/dashboard/Admin'));

// Customer dashboard pages
const CustomerDashboard = lazy(() => import('./pages/customer/Dashboard'));
const CustomerMyCards = lazy(() => import('./pages/customer/MyCards'));
const CustomerCreateCard = lazy(() => import('./pages/customer/CreateCard'));
const CustomerCardDetail = lazy(() => import('./pages/customer/CardDetail'));
const CustomerCardEdit = lazy(() => import('./pages/customer/CardEdit'));
const CustomerProfile = lazy(() => import('./pages/customer/Profile'));
const CustomerOrders = lazy(() => import('./pages/customer/Orders'));
const CustomerSupport = lazy(() => import('./pages/customer/Support'));

// Admin pages
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminCustomers = lazy(() => import('./pages/admin/Customers'));
const AdminPdfCards = lazy(() => import('./pages/admin/PdfCards'));
const AdminTemplates = lazy(() => import('./pages/admin/Templates'));
const AdminPackages = lazy(() => import('./pages/admin/Packages'));
const AdminOrders = lazy(() => import('./pages/admin/Orders'));
const AdminPayments = lazy(() => import('./pages/admin/Payments'));

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-[#888]">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function CustomerProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("customer_token");
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function PublicPage({ children }: { children: React.ReactNode }) {
  return <Layout>{children}</Layout>;
}

const pageWrap = (Component: React.ComponentType) => (
  <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-[#888]">Loading...</div>}>
    <Component />
  </Suspense>
);

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicPage>{pageWrap(Home)}</PublicPage>} />
      <Route path="/about-us" element={<PublicPage>{pageWrap(AboutUs)}</PublicPage>} />
      <Route path="/pdf-digital-business-card" element={<PublicPage>{pageWrap(Services)}</PublicPage>} />
      <Route path="/pricing" element={<PublicPage>{pageWrap(PricingPage)}</PublicPage>} />
      <Route path="/pdf-card-samples" element={<PublicPage>{pageWrap(SamplesPage)}</PublicPage>} />
      <Route path="/how-it-works" element={<PublicPage>{pageWrap(HowItWorksPage)}</PublicPage>} />
      <Route path="/industries" element={<PublicPage>{pageWrap(IndustriesPage)}</PublicPage>} />
      <Route path="/contact-us" element={<PublicPage>{pageWrap(ContactUs)}</PublicPage>} />
      <Route path="/blog" element={<PublicPage>{pageWrap(BlogPage)}</PublicPage>} />
      <Route path="/blog/:slug" element={<PublicPage>{pageWrap(BlogPost)}</PublicPage>} />
      <Route path="/faq" element={<PublicPage>{pageWrap(FaqPage)}</PublicPage>} />
      <Route path="/sitemap" element={<PublicPage>{pageWrap(SitemapPage)}</PublicPage>} />
      <Route path="/privacy-policy" element={<PublicPage>{pageWrap(PrivacyPolicy)}</PublicPage>} />
      <Route path="/terms" element={<PublicPage>{pageWrap(TermsPage)}</PublicPage>} />
      <Route path="/refund-policy" element={<PublicPage>{pageWrap(RefundPolicy)}</PublicPage>} />

      {/* Customer Auth Routes */}
      <Route path="/login" element={<CustomerLogin />} />
      <Route path="/register" element={<CustomerRegister />} />
      <Route path="/admin/login" element={<Login />} />

      {/* Old Dashboard Routes (OAuth) */}
      <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout>{pageWrap(DashboardHome)}</DashboardLayout></ProtectedRoute>} />
      <Route path="/dashboard/cards" element={<ProtectedRoute><DashboardLayout>{pageWrap(CardList)}</DashboardLayout></ProtectedRoute>} />
      <Route path="/dashboard/cards/:id" element={<ProtectedRoute><DashboardLayout>{pageWrap(CardDetail)}</DashboardLayout></ProtectedRoute>} />
      <Route path="/dashboard/cards/:id/edit" element={<ProtectedRoute><DashboardLayout>{pageWrap(CardEdit)}</DashboardLayout></ProtectedRoute>} />
      <Route path="/dashboard/builder" element={<ProtectedRoute><DashboardLayout>{pageWrap(CardBuilder)}</DashboardLayout></ProtectedRoute>} />
      <Route path="/dashboard/support" element={<ProtectedRoute><DashboardLayout>{pageWrap(Support)}</DashboardLayout></ProtectedRoute>} />
      <Route path="/dashboard/settings" element={<ProtectedRoute><DashboardLayout>{pageWrap(SettingsPage)}</DashboardLayout></ProtectedRoute>} />
      <Route path="/dashboard/admin" element={<ProtectedRoute><DashboardLayout>{pageWrap(AdminPage)}</DashboardLayout></ProtectedRoute>} />

      {/* Customer Dashboard Routes */}
      <Route path="/customer/dashboard" element={<CustomerProtectedRoute><CustomerLayout>{pageWrap(CustomerDashboard)}</CustomerLayout></CustomerProtectedRoute>} />
      <Route path="/customer/my-cards" element={<CustomerProtectedRoute><CustomerLayout>{pageWrap(CustomerMyCards)}</CustomerLayout></CustomerProtectedRoute>} />
      <Route path="/customer/my-cards/:id" element={<CustomerProtectedRoute><CustomerLayout>{pageWrap(CustomerCardDetail)}</CustomerLayout></CustomerProtectedRoute>} />
      <Route path="/customer/my-cards/:id/edit" element={<CustomerProtectedRoute><CustomerLayout>{pageWrap(CustomerCardEdit)}</CustomerLayout></CustomerProtectedRoute>} />
      <Route path="/customer/create-card" element={<CustomerProtectedRoute><CustomerLayout>{pageWrap(CustomerCreateCard)}</CustomerLayout></CustomerProtectedRoute>} />
      <Route path="/customer/profile" element={<CustomerProtectedRoute><CustomerLayout>{pageWrap(CustomerProfile)}</CustomerLayout></CustomerProtectedRoute>} />
      <Route path="/customer/orders" element={<CustomerProtectedRoute><CustomerLayout>{pageWrap(CustomerOrders)}</CustomerLayout></CustomerProtectedRoute>} />
      <Route path="/customer/support" element={<CustomerProtectedRoute><CustomerLayout>{pageWrap(CustomerSupport)}</CustomerLayout></CustomerProtectedRoute>} />

      {/* Admin Panel Routes */}
      <Route path="/admin/dashboard" element={<AdminLayout>{pageWrap(AdminDashboard)}</AdminLayout>} />
      <Route path="/admin/customers" element={<AdminLayout>{pageWrap(AdminCustomers)}</AdminLayout>} />
      <Route path="/admin/pdf-cards" element={<AdminLayout>{pageWrap(AdminPdfCards)}</AdminLayout>} />
      <Route path="/admin/templates" element={<AdminLayout>{pageWrap(AdminTemplates)}</AdminLayout>} />
      <Route path="/admin/packages" element={<AdminLayout>{pageWrap(AdminPackages)}</AdminLayout>} />
      <Route path="/admin/orders" element={<AdminLayout>{pageWrap(AdminOrders)}</AdminLayout>} />
      <Route path="/admin/payments" element={<AdminLayout>{pageWrap(AdminPayments)}</AdminLayout>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
