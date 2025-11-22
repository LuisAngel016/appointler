import { lazy } from "react";
import { createHashRouter, Navigate } from "react-router";

import { HomePage } from "@/home/presentation/pages/home/HomePage";
import { HomeLayout } from "@/home/presentation/layouts/HomeLayout";

import { LoginPage } from "@/auth/presentation/pages/login/LoginPage";
import { RegisterPage } from "@/auth/presentation/pages/register/RegisterPage";

import { DashboardPage } from "@/dashboard";
import { AppointmentsPage } from "@/appointments";
import { ClientsPage } from "@/clients";
import { AdminRoute, NotAuthenticatedRoute, UserRoute } from '../shared/components/routes/ProtectedRoutes';
import { ServicesPage } from "@/services/presentation";
import { SchedulesPage } from "@/schedules/presentation";
import { BusinessPage } from "@/business/presentation";
import { ProfilePage } from "@/users/presentation/pages/UserPage";
import { NotificationsPage } from "@/notifications/presentation/pages/NotificationsPage";

const AuthLayout = lazy(() => import("@/auth/presentation/layouts/AuthLayout"));
const AdminLayout = lazy(() => import("@/shared/layouts/AdminLayout"));

const AboutPage = lazy(() => import("@/home/presentation/pages/about/AboutPage"));
const BlogPage = lazy(() => import("@/home/presentation/pages/blog/BlogPage"));
const ContactPage = lazy(() => import("@/home/presentation/pages/contact/ContactPage"));
const PrivacyPage = lazy(() => import("@/home/presentation/pages/privacy/PrivacyPage"));
const TermsPage = lazy(() => import("@/home/presentation/pages/terms/TermsPage"));


export const appRouter = createHashRouter([
    // export const appRouter = createBrowserRouter([
    // Main routes
    {
        path: "/",
        element: <HomeLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "about",
                element: <AboutPage />
            },
            {
                path: "blog",
                element: <BlogPage />
            },
            {
                path: "contact",
                element: <ContactPage />
            },
            {
                path: "privacy",
                element: <PrivacyPage />
            },
            {
                path: "terms",
                element: <TermsPage />
            },
        ]
    },
    // Auth routes
    {
        path: "/auth",
        element: <NotAuthenticatedRoute>
            <AuthLayout />
        </NotAuthenticatedRoute>,
        children: [
            {
                index: true,
                element: <Navigate to="/auth/login" />
            },
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "register",
                element: <RegisterPage />
            }
        ]
    },
    // Admin routes
    {
        path: "/admin",
        element: <AdminRoute>
            <AdminLayout />
        </AdminRoute>,
        children: [
            {
                index: true,
                element: <DashboardPage />
            },
            {
                path: "profile",
                element: <ProfilePage />
            },
            {
                path: "appointments",
                element: <AppointmentsPage />
            },
            {
                path: "clients",
                element: <ClientsPage />
            },
            {
                path: "notifications",
                element: <Navigate to="/admin/notifications/all" />
            },
            {
                path: "notifications/:filter",
                element: <NotificationsPage />
            },
            {
                path: "settings/business",
                element: <BusinessPage />
            },
            {
                path: "settings/services",
                element: <ServicesPage />
            },
            {
                path: "settings/schedules",
                element: <SchedulesPage />
            }
        ]
    },
    // User routes
    {
        path: "/user",
        element: <UserRoute>
            <AdminLayout />
        </UserRoute>,
        children: [
            {
                index: true,
                element: <Navigate to="/user/appointments" />
            },
            {
                path: "appointments",
                element: <AppointmentsPage />
            },
            {
                path: "notifications",
                element: <Navigate to="/user/notifications/all" />
            },
            {
                path: "notifications/:filter",
                element: <NotificationsPage />
            },
            {
                path: "profile",
                element: <ProfilePage />
            }
        ]
    }
])
