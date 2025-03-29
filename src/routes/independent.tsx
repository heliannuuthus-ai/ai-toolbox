import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Conversation = lazy(() => import("@/components/Conversation"));

export const independentRoutes: RouteObject[] = [
  {
    path: "/_conversation",
    element: <Conversation />,
  },
];
