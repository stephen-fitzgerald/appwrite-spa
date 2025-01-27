// @ts-check
/* jshint esversion: 6 */

/**
 * Sanitize an HTML string
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {String}          str   The HTML string to sanitize
 * @param  {Boolean}         nodes If true, returns HTML nodes instead of a string
 * @return {String|NodeList}       The sanitized string or nodes
 */
export function cleanHTML(str, nodes) {
	// Convert the string to HTML
	let html = stringToHTML(str);
	removeScripts(html);
	clean(html);
	// Return HTML nodes or string
	// @ts-ignore
	return nodes ? html.childNodes : html.innerHTML;
}

/**
 * Convert a string to an HTML Document
 * @export
 * @param {string} str the html string
 * @returns {HTMLElement} an html Element
 */
function stringToHTML(str) {
	let parser = new DOMParser();
	let doc = parser.parseFromString(str, 'text/html');
	return doc.body || document.createElement('body');
}

/**
 * Remove <script> elements
 * @param {HTMLElement} doc  The HTML document
 * @returns {HTMLElement} 
 */
function removeScripts(doc) {
	let scripts = doc.querySelectorAll('script');
	for (let script of scripts) {
		script.remove();
	}
	return doc;
}

/**
 * Recursively delete dangerous stuff from an HTML document's nodes
 * @param  {Element} doc The HTML document
 */
function clean(doc) {
	let nodes = doc.children;
	for (let node of nodes) {
		removeDangerousAttributes(node);
		clean(node);
	}
}

/**
 * Remove potentially dangerous attributes from an element
 * @param  {Element} elem The element
 */
function removeDangerousAttributes(elem) {
	// Loop through attributes & remove dangerous ones
	let atts = elem.attributes;
	for (let { name, value } of atts) {
		if (!isPossiblyDangerous(name, value)) continue;
		elem.removeAttribute(name);
	}
}

/**
 * Check if the attribute is potentially dangerous
 * @param  {String}  name  The attribute name
 * @param  {String}  value The attribute value
 * @return {Boolean}       If true, the attribute is potentially dangerous
 */
function isPossiblyDangerous(name, value) {
	let val = value.replace(/\s+/g, '').toLowerCase();
	if (['src', 'href', 'xlink:href'].includes(name)) {
		if (val.includes('javascript:') || val.includes('data:')) return true;
	}
	if (name.startsWith('on')) return true;
	return false;
}
