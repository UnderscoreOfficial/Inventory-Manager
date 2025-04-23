import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./routes/layout.tsx", [
    index("routes/index.tsx"),
    route("workbench", "./routes/workbench.tsx"),
    route("form", "./routes/form.tsx"),
  ]),
] satisfies RouteConfig;
