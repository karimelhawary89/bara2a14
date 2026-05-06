import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import Dashboard from '@/pages/Dashboard';
import Clients from '@/pages/Clients';
import Matters from '@/pages/Matters';
import Tasks from '@/pages/Tasks';
import Hearings from '@/pages/Hearings';
import Documents from '@/pages/Documents';
import MainLayout from '@/layouts/MainLayout';
import { Suspense, lazy } from 'react';

// Lazy load some pages
const LegalLibrary = lazy(() => import('@/pages/LegalLibrary'));
const WhatsAppInbox = lazy(() => import('@/pages/WhatsAppInbox'));
const Inquiries = lazy(() => import('@/pages/Inquiries'));
const Invoices = lazy(() => import('@/pages/Invoices'));
const Reports = lazy(() => import('@/pages/Reports'));
const AIAssistant = lazy(() => import('@/pages/AIAssistant'));
const AILegal = lazy(() => import('@/pages/AILegal'));
const Settings = lazy(() => import('@/pages/Settings'));
const DigitalEgypt = lazy(() => import('@/pages/DigitalEgypt'));
const Consultations = lazy(() => import('@/pages/Consultations'));
const ConflictChecks = lazy(() => import('@/pages/ConflictChecks'));
const TimeEntries = lazy(() => import('@/pages/TimeEntries'));
const SubscriptionBilling = lazy(() => import('@/pages/SubscriptionBilling'));
const DigitalServiceDetail = lazy(() => import('@/pages/DigitalServiceDetail'));

export default function App() {
  return (
    <Router>
      <Toaster position="top-right" richColors />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-cairo">جاري التحميل...</div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/matters" element={<Matters />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/hearings" element={<Hearings />} />
            <Route path="/digital-egypt" element={<DigitalEgypt />} />
            <Route path="/digital-egypt/:id" element={<DigitalServiceDetail />} />
            <Route path="/consultations" element={<Consultations />} />
            <Route path="/conflict-checks" element={<ConflictChecks />} />
            <Route path="/time-tracking" element={<TimeEntries />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/legal-library" element={<LegalLibrary />} />
            <Route path="/whatsapp" element={<WhatsAppInbox />} />
            <Route path="/inquiries" element={<Inquiries />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/billing" element={<SubscriptionBilling />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/ai-legal" element={<AILegal />} />
            <Route path="/assistant" element={<AIAssistant />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
