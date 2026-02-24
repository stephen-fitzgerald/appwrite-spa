// @ts-check
/* jshint esversion: 6 */

import { AbstractView } from "./_AbstractView.js";
import { getLoggedInUser, loginWithEmailAndPassword, logOut } from "../js/appwrite.js";

//const EMAIL = "practicalcomposites@gmail.com";
//const PASSWORD = "hubbards4328~";
const EMAIL = "pcomp@istar.ca";
const PASSWORD = "Hubbards4328~";

export class AppwriteView extends AbstractView {

  constructor(args = {}) {
    super(args);
    this.html = '';
    this.path = "./views/appwriteView.html";
  }

  /**
  * @override
  * @async
  * @param {{ resource: string; id: string; verb: string; }} request 
  * @returns {Promise<string | undefined>} the html for the view
  */
  async buildHTML(request) {
    console.log(request);
    if (this.path) {
      let response = await fetch(this.path);
      let html = await response.text();
      let parser = new DOMParser();
      let doc = parser.parseFromString(html, 'text/html');
      let node = doc.querySelector('main');
      // @ts-ignore
      this.html = node.innerHTML || doc.innerHTML;
    }
    return this.html || '<h1>Error loading html</h1>';
  }

  /**
   * @override
   */
  addListeners() {
    let btnLogin = document.getElementById('btn-login');
    if (btnLogin) btnLogin.onclick = this.login.bind(this);

    let btnLogout = document.getElementById('btn-logout');
    if (btnLogout) btnLogout.onclick = this.logout.bind(this);

    document.title = this.title || "untitled";

    let bodyStyles = window.getComputedStyle(document.body);
    this.strokeColor = bodyStyles.getPropertyValue('--text-clr');

    this.div = document.getElementById('appwrite-div');
  }

  /**
   * @override
   * @param {number} time
   */
  async modelToView(time) {
    let lblStatus = document.getElementById('lbl-status');
    const user = await getLoggedInUser();
    let statusStr = user ? user.name + " is Logged in" : "No one is logged in.";
    if (lblStatus) lblStatus.textContent = statusStr;
  }

  /**
   * Do any cleanup required when this 'page' is replaced by another
   * @override
   */
  destroy() {

  }

  async login() {
    let email = getEmailSafely() || "";
    const pwrd = getPassword() || "";
    // let user = await loginWithEmailAndPassword(EMAIL, PASSWORD);
    let user = await loginWithEmailAndPassword(email, pwrd);
    await this.modelToView(0);
  }

  async logout() {
    await logOut();
    await this.modelToView(0);
  }

} //class

function getPassword(){
  const passwordElement = /** @type {HTMLInputElement | null} */
    (document.getElementById('aw-password'));
  const password = passwordElement?.value;
  return password;
}

function getEmailSafely() {

  const emailInput = /** @type {HTMLInputElement | null} */
    (document.getElementById('aw-email'));

  // Check if element exists
  if (!emailInput) {
    console.error('Email input not found');
    return null;
  }

  // Get and trim the value
  let email = emailInput.value.trim();

  // Basic email validation
  if (!email) {
    alert('Please enter an email address');
    return null;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address');
    return null;
  }

  // Optional: Convert to lowercase for consistency
  email = email.toLowerCase();

  return email;
}

