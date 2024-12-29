import { Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Settings from '@/pages/Settings';
import Users from '@/pages/Users';
import EventDetails from '@/pages/EventDetails';
import CreateEvent from '@/pages/CreateEvent';
import CreateProject from '@/pages/CreateProject';
import EventFeedback from '@/pages/EventFeedback';
import ProtectedRoute from '@/components/ProtectedRoute';

export const AppRoutes = () => {
  console.log('AppRoutes rendering');
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        }
      />
      <Route path="/events/:id" element={<EventDetails />} />
      <Route
        path="/create-event"
        element={
          <ProtectedRoute>
            <CreateEvent />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-project"
        element={
          <ProtectedRoute>
            <CreateProject />
          </ProtectedRoute>
        }
      />
      <Route path="/events/:id/feedback" element={<EventFeedback />} />
    </Routes>
  );
};