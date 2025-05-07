import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  // sidebar
  layout("./routes/sidebar_pages/SidebarLayout.tsx", [
    index("routes/Index.tsx"),
    route("dashboard", "./routes/sidebar_pages/Dashboard.tsx"),
    route("inventory", "./routes/sidebar_pages/Inventory.tsx"),
    route("tags", "./routes/sidebar_pages/Tags.tsx"),
    route("statistics", "./routes/sidebar_pages/Statistics.tsx"),
    route("settings", "./routes/sidebar_pages/Settings.tsx"),
    route("workbench", "./routes/sidebar_pages/Workbench.tsx"),
    // logic paths
  ]),
  // forms
  route("form/test", "./routes/forms/TestForm.tsx"),
  route("login", "./routes/forms/LoginForm.tsx"),
  route("signup", "./routes/forms/SignupForm.tsx"),
] satisfies RouteConfig;
