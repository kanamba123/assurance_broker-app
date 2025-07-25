import React from 'react';
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import AppLayout from "./components/layouts/AppLayout";
import PrivateRoute from "./components/PrivateRoute";
import PageTransition from "./components/PageTransition";

// 📦 Lazy importation des pages
const Home = lazy(() => import("./pages/homes/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const About = lazy(() => import("./pages/About"));
const MentionsLegales = lazy(() => import("./pages/MentionsLegales"));
const Contact = lazy(() => import("./pages/Contact"));
const ClientList = lazy(() => import("./pages/ClientList"));
const ExpertList = lazy(() => import("./pages/ExpertList"));
const Service = lazy(() => import("./pages/Service"));
const ServiceByCategory = lazy(() => import("./pages/ServiceByCategory"));
const ClientListByCategory = lazy(() => import("./pages/ClientListByCategory"));
const Articles = lazy(() => import("./pages/Articles"));
const Publications = lazy(() => import("./pages/Publications"));
const DetailPublications = lazy(() => import("./pages/DetailPublications"));
const Testimony = lazy(() => import("./pages/Testimony"));
const Temoigner = lazy(() => import("./pages/temoignage/Temoigner"));
const ClientCategories = lazy(() => import("./pages/ClientCategories"));
const Unauthorized = lazy(() => import("./components/Unauthorized"));

// 🧩 Dashboards par rôle
const AdminDashboard = lazy(() => import("./pages/admin/DashboardAdmin"));
const DashboardExpert = lazy(() => import("./pages/expert/DashboardExpert"));
const DashboardUser = lazy(() => import("./pages/client/DashboardUser"));
const AdminUsers = lazy(() => import("./pages/admin/UserList"));
const AdminExperts = lazy(() => import("./pages/admin/ExpertList"));
const AdminClients = lazy(() => import("./pages/admin/ClientList"));
const AdminService = lazy(() => import("./pages/admin/ServiceList"));
const AdminCategories = lazy(() => import("./pages/admin/CategoriesList"));
const AdminCategoriesClient = lazy(() => import("./pages/admin/CategoriesClientsList"));
const UserProfile = lazy(() => import("./pages/admin/UserProfile"));
const NotificationsPage = lazy(() => import("./pages/admin/NotificationsPage"));
const MessageContactPage = lazy(() => import("./pages/admin/MessageContactPage"));
const AdminSettings = lazy(() => import("./pages/admin/Settings"));

//request
const CustomerPageRequest = lazy(() => import("./pages/client/Request"));
const ExpertPageRequest = lazy(() => import("./pages/expert/Request"));
const AdminPageRequest = lazy(() => import("./pages/admin/Request"));

//bien
const AdminPageBien = lazy(() => import("./pages/admin/BienList"));

//ClientDetail
const ClientDetailByCategoryAndOthers = lazy(() => import("./pages/ClientDetailByCategoryAndOthers"));

//Publication
const AdminPagePublications = lazy(() => import("./pages/admin/PublicationsList"));


//ComponyProduct
const AdminCamponyProducts = lazy(() => import("./pages/admin/CamponyProducts"));

//Temoignages
const AdminPageTemoignage = lazy(() => import("./pages/admin/TemoignageList"));

//Reseaux sociaux
const AdminPageReseauSociaux = lazy(() => import("./pages/admin/ReseauxSociauxList"));

//Connexion logs
const AdminPageConnexionLogs = lazy(() => import("./pages/admin/AdminPageConnexionLogs"));

const MessageExpert = lazy(() => import("./pages/expert/MessageExpert"));
const MessageAdmin = lazy(() => import("./pages/admin/MessagePage"));

const Loading = () => <div className="flex justify-center items-center bg-gray-950 text-white">Chargement...</div>;

const withPageTransition = (Component) => (
  <Suspense fallback={<Loading />}>
    <PageTransition>
      <Component />
    </PageTransition>
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" replace />,
  },
  {
    path: "/login",
    element: withPageTransition(Login),
  },
  {
    path: "/register",
    element: withPageTransition(Register),
  },
  {
    path: "/unauthorized",
    element: withPageTransition(Unauthorized),
  },
  {
    element: <AppLayout />,
    errorElement: <Navigate to="/" replace />,
    children: [
      {
        path: "/home",
        element: withPageTransition(Home),
      },
      {
        path: "/clientDetailCategorie/:clientName/:clientId",
        element: withPageTransition(ClientDetailByCategoryAndOthers),
      },
      {
        path: "/clientCategorie",
        element: withPageTransition(ClientDetailByCategoryAndOthers),
      },
      {
        path: "/client/:clientName/:clientId",
        element: withPageTransition(ClientListByCategory),
      }
      ,
      {
        path: "/clients",
        element: withPageTransition(ClientList),
      },
      {
        path: "/experts",
        element: withPageTransition(ExpertList),
      },
      {
        path: "/service",
        element: withPageTransition(Service),
      },
      {
        path: "/service/:serviceName/:serviceId",
        element: withPageTransition(ServiceByCategory),
      }
      ,
      {
        path: "/article",
        element: withPageTransition(Articles),
      },
      {
        path: "/publications",
        element: withPageTransition(Publications),
      },
      {
        path: "/publications/detail/:publicationTitre/:publicationId",
        element: withPageTransition(DetailPublications),
      },
      {
        path :"/products/:entrepriseName/",
        element :withPageTransition(lazy(() => import("./pages/NosProduits")))
      },
        {
        path :"/devis/:productName/:id",
        element :withPageTransition(lazy(() => import("./pages/DevisForm")))
      },
      ,
      {
        path: "/testimony",
        element: withPageTransition(Testimony),
      },
       {
        path: "/testimony/add",
        element: withPageTransition(Temoigner),
      },
      {
        path: "/contact",
        element: withPageTransition(Contact),
      },
      {
        path: "/about",
        element: withPageTransition(About),
      },
      {
        path: "/legal-notice",
        element: withPageTransition(MentionsLegales),
      },

    ],
  },
  {
    path: "*",
    element: withPageTransition(lazy(() => import("./pages/NotFoundPage")))

  },

  // 🔒 Routes protégées - Admin
  {
    element: <PrivateRoute allowedRoles={["admin"]} />,
    children: [
      {
        path: "/admin",
        element: <Navigate to="/admin/dashboard" replace />,
      },
      {
        path: "/admin/dashboard",
        element: withPageTransition(AdminDashboard),
        children: [
          {
            index: true,
            element: <Navigate to="overview" replace />,
          },
          {
            path: "overview",
            element: withPageTransition(lazy(() => import("./pages/admin/Overview"))),
          },
          {
            path: "client",
            element: withPageTransition(AdminClients),
          },//Test
          {
            path: "customer",
            element: withPageTransition(lazy(() => import("./pages/admin/ClientList"))),
          },
          {
            path: "experts",
            element: withPageTransition(AdminExperts),
          },
          {
            path: "service",
            element: withPageTransition(AdminService),
          },
          {
            path: "service_category",
            element: withPageTransition(AdminCategories),
          },
          {
            path: "client_category",
            element: withPageTransition(AdminCategoriesClient),
          },
          {
            path: "users",
            element: withPageTransition(AdminUsers),
          },
          {
            path: "profile",
            element: withPageTransition(UserProfile),
          },
          {
            path: "notification",
            element: withPageTransition(NotificationsPage),
          },
          {
            path: "message",
            element: withPageTransition(MessageAdmin),
          },
          {
            path: "settings",
            element: withPageTransition(AdminSettings),
          },
          {
            path: "reports",
            element: withPageTransition(lazy(() => import("./pages/admin/Reports"))),
          },
          {
            path: "requests",
            element: withPageTransition(AdminPageRequest),
          },
          {
            path: "bien",
            element: withPageTransition(AdminPageBien),
          },
          {
            path: "publications",
            element: withPageTransition(AdminPagePublications),
          },
          {
            path: "camponyProducts",
            element: withPageTransition(AdminCamponyProducts),
          },
             {
            path: "messagecontact",
            element: withPageTransition(MessageContactPage),
          },
          {
            path: "temoignage",
            element: withPageTransition(AdminPageTemoignage),
          },
          {
            path: "reseaux",
            element: withPageTransition(AdminPageReseauSociaux),
          },
          {
            path: "analytics",
            element: withPageTransition(lazy(() => import("./pages/admin/DataAnalytics")))
          },
          {
            path: "logsconnexion",
            element: withPageTransition(AdminPageConnexionLogs),
          },
        ],

      },
      {
        path: "*",
        element: withPageTransition(lazy(() => import("./pages/NotFoundPage")))

      },
    ],
  },


  // 🔒 Routes protégées - expert
  {
    element: <PrivateRoute allowedRoles={["expert"]} />,
    children: [
      {
        path: "/expert",
        element: <Navigate to="/expert/dashboard" replace />,
      },
      {
        path: "/expert/dashboard",
        element: withPageTransition(DashboardExpert),
        children: [
          {
            index: true,
            element: <Navigate to="overview" replace />,
          },
          {
            path: "overview",
            element: withPageTransition(lazy(() => import("./pages/admin/Overview"))),
          },

          {
            path: "profile",
            element: withPageTransition(UserProfile),
          },
          {
            path: "message",
            element: withPageTransition(MessageExpert),
          },
          {
            path: "settings",
            element: withPageTransition(AdminSettings),
          },
          {
            path: "reports",
            element: withPageTransition(lazy(() => import("./pages/admin/Reports"))),
          },
          {
            path: "requests",
            element: withPageTransition(ExpertPageRequest),
          },
        ],
      },
    ],
  },

  // 🔒 Routes protégées - client
  {
    element: <PrivateRoute allowedRoles={["client"]} />,
    children: [
      {
        path: "/client",
        element: <Navigate to="/client/dashboard" replace />,
      },
      {
        path: "/client/dashboard",
        element: withPageTransition(DashboardUser),
        children: [
          {
            index: true,
            element: <Navigate to="overview" replace />,
          },
          {
            path: "overview",
            element: withPageTransition(lazy(() => import("./pages/admin/Overview"))),
          },
          {
            path: "profile",
            element: withPageTransition(UserProfile),
          },
          {
            path: "notification",
            element: withPageTransition(NotificationsPage),
          },
          {
            path: "settings",
            element: withPageTransition(AdminSettings),
          },
          {
            path: "requests",
            element: withPageTransition(CustomerPageRequest),
          },
        ],
      },
    ],
  },
  // 🔒 Vous pouvez ajouter d'autres rôles de la même manière
  /*
  {
    element: <PrivateRoute allowedRoles={["client"]} />,
    children: [
      {
        path: "/client/dashboard",
        element: withPageTransition(ClientDashboard),
      },
    ],
  },
  */
]);