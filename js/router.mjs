// @ts-check
/*jshint esversion: 6 */

/**
 * Handles routing for the app
 */

import { getRoutes } from './routes.mjs';
import { cleanHTML } from '../views/_AbstractView.mjs';

function parseRequestURL() {
    let url = location.hash.slice(1).toLowerCase() || '/';
    let r = url.split("/");
    let request = {
        resource: r[1],
        id: r[2],
        verb: r[3]
    };
    return request;
};

const config = {
    sanitizeHTML: false,
}

let currentPage;

export async function router() {

    let routes = getRoutes();

    // Get the parsed URl from the addressbar
    let req = parseRequestURL();

    // Parse the URL and if it has an id part, change it with the string ":id"
    let parsedURL = (req.resource ? '/' + req.resource : '/') + (req.id ? '/:id' : '') + (req.verb ? '/' + req.verb : '');

    // Get the page from our hash of supported routes, or the 404 page 
    let page = routes[parsedURL] ? routes[parsedURL] : routes["Error404"];

    // console.log(JSON.stringify(request));

    // render the html for the page
    let html = await page.buildHTML(req);
    if( config.sanitizeHTML ){
        html = cleanHTML(html, false);
    }

    if (currentPage) { currentPage.destroy(); }
    // set the main container elements html
    const content = document.getElementById('main-container');
    if (content != null) { content.innerHTML = html; }
    currentPage = page;

    // TODO wait for document to (re-)load

    // set up any required listeners for the page
    await page.addListeners();

    // update the view
    await page.modelToView();

}


