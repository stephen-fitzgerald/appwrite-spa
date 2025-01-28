// @ts-check
/* jshint esversion: 6 */

import { AbstractView } from "./_AbstractView.mjs";
import * as Appwrite from "../js/appwrite.mjs";

const EMAIL = "practicalcomposites@gmail.com";
const PASSWORD = "hubbards4328~";

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
    const user = await Appwrite.getLoggedInUser();
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
    let user = await Appwrite.loginWithEmailAndPassword(EMAIL, PASSWORD);
    await this.modelToView(0);
  }

  async logout() {
    let targetObj = {color: "blue"};

    this.proxyObject = new Proxy(targetObj, {
      get: function (object, name) {
        if (name == '__proxy__') {
          return true;
        }
        return object[name];
      },
      // @ts-ignore
      set: function (object, name, value) {
        var old = object[name];
        object[name] = value;
      }
    });
    await Appwrite.logOut();
    await this.modelToView(0);
  }

} //class


