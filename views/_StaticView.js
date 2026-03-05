//@ts-check

import { AbstractView, cleanHTML } from "./_AbstractView.js";

export class StaticView extends AbstractView {
  /**
   * @param {{ title?: string | undefined; html?: string | undefined; path?: string | undefined; } | undefined} args
   */
  constructor(args) {
    super(args);
    this.html = undefined;
    this.path = args ? args.path : undefined;
  }

  /**
  * @async
  * @param {{ resource: string; id: string; verb: string; }} request 
  * @returns {Promise<string | NodeList | undefined>} the html for the view
  */
  async buildHTML(request) {
    console.log(request);
    if (this.html == undefined && this.path) {
      let response = await fetch(this.path);
      let html = await response.text();
      this.html = cleanHTML(html);
    }
    return this.html;
  }
}
