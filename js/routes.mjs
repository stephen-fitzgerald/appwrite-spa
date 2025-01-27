// @ts-check
/*jshint esversion: 6 */

import { AppwriteView } from "../views/appwrite-view.mjs";
import { Cube3dView } from "../views/cube3d-view.mjs";
import { StaticView } from "./static-view.mjs";

// these routes never get re-initialized
const staticRoutes = {

  "/":                  new StaticView({ title: "SPA", path: "./views/home.html" }),
  "/about":             new StaticView({ title: "SPA: About", path: "./views/about.html", }),
  "/cube":              new Cube3dView({ title: "SPA: 3D Cube" }),
  "/appwrite":          new AppwriteView({ title: "SPA: Appwrite" }),
  Error404:             new StaticView({ title: "SPA: File Not Found", path: "./views/404.html" }),
};

// add any routes that need to be instantiated on a per-call basis.
function buildRoutes(routes = {}) {
  // does nothing yet
  return (routes);
}

/**
 * 
 * @returns {Object} routes - a path & corrisponding AbstractView
 */
export function getRoutes() {
  return (buildRoutes(staticRoutes));
}