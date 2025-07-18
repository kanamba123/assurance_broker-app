// import { useState } from 'react'
// import { RouterProvider } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { router } from "./routes";
// import './App.css'
// import FramerMotionWebsite from './pages/home/FramerMotionWebsite'
// import ToastNotification from "./components/ui/ToastNotification";
// import { useInactivityTimer } from "./hooks/useInactivityTimer";
// import CompanyProductForm from './pages/insurancetype/CompanyProductForm'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <div className='conteiner'>
//       {/* <FramerMotionWebsite/> */}
//       <CompanyProductForm />
//     </div>
//   )
// }

// export default App

import React from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./routes";
import { AuthProvider, useAuth } from "./contexts/authContext";
import ToastNotification from "./components/ui/ToastNotification";
import { useInactivityTimer } from "./hooks/useInactivityTimer";

const queryClient = new QueryClient();

function AppContent() {
  const { logout } = useAuth();
  useInactivityTimer(logout,1000000,30000);

  return (
    <>
      <RouterProvider router={router} />
      <ToastNotification />
    </>
  );
}

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
