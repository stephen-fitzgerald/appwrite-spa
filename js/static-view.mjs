//@ts-check

import { AbstractView } from "./abstract-view.mjs";
import { cleanHTML } from "./clean-html.mjs";

export class StaticView extends AbstractView {
  constructor(args) {
    super(args);
    this.html = undefined;
    this.path = args ? args.path : undefined;
  }

  /**
  * @async
  * @param {{ resource: string; id: string; verb: string; }} request 
  * @returns {Promise<string | undefined>} the html for the view
  */
  async buildHTML(request) {
    console.log(request);
    if (this.html == undefined && this.path) {
      let response = await fetch(this.path);
      let html = await response.text();
      // @ts-ignore
      this.html = cleanHTML(html);
    }
    return this.html;
  }
}