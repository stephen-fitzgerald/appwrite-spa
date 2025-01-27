/**
 * Main application entry point. This code:
 * 
 *  1) links a hash router to hashchange and page load events,
 *  2) links a hamburger icon to show/hide the left navigation pane,
 *  3) adds listeners to highlight the items of the left nav pane, and
 *  4) wires a dummy dialog to the "Login" link in the header.
 * 
 * After that, it's up to the router to call the lifecycle methods 
 * of each view, which are:
 * 
 *  1) buildHTML(request) - load/create the views html,
 *  2) addListeners() - attach any listeners etc,
 *  3) modelToView(t) - update the view for time = t, and
 *  4) destroy() - clean up when the view is being replaced.
 * 
 */

// @ts-check
import { router } from "./js/router.mjs";
import { addListenerToNavItems, toggleNavPane } from "./js/leftNav.mjs";

const app = async () => {

  // Listen on hash change & page load:
  window.addEventListener("hashchange", router);
  window.addEventListener("load", router);

  /* Set up a hamburger button to hide/show the left navigation pane */
  let hamburgerIcon = document.getElementById("hamburger-icon");
  if (hamburgerIcon !== null) {
    hamburgerIcon.addEventListener("click", toggleNavPane);
  }

  /* Left nav is a menu, set class='active' when clicked */
  addListenerToNavItems();

  /* Set up a menu button to login/logout */
  let loginIcon = document.getElementById("login-icon");
  if (loginIcon != undefined) {
    loginIcon.addEventListener("click", (event) => {
      alert("Someday this may be a login or logout dialog.");
      return false;
    });
  }

};

document.addEventListener("DOMContentLoaded", app);