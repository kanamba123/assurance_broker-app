import { lazy } from "react";
import withPageTransition from "../components/PageTransition"; 

export const LazyPage = (path) => {
  const Page = lazy(() => import(path));
  return withPageTransition(Page);
};
