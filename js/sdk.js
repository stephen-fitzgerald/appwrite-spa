(function (exports) {
    'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }

    /**
     * Helper class to generate query strings.
     */
    class Query {
        /**
         * Constructor for Query class.
         *
         * @param {string} method
         * @param {AttributesTypes} attribute
         * @param {QueryTypes} values
         */
        constructor(method, attribute, values) {
            this.method = method;
            this.attribute = attribute;
            if (values !== undefined) {
                if (Array.isArray(values)) {
                    this.values = values;
                }
                else {
                    this.values = [values];
                }
            }
        }
        /**
         * Convert the query object to a JSON string.
         *
         * @returns {string}
         */
        toString() {
            return JSON.stringify({
                method: this.method,
                attribute: this.attribute,
                values: this.values,
            });
        }
    }
    /**
     * Filter resources where attribute is equal to value.
     *
     * @param {string} attribute
     * @param {QueryTypes} value
     * @returns {string}
     */
    Query.equal = (attribute, value) => new Query("equal", attribute, value).toString();
    /**
     * Filter resources where attribute is not equal to value.
     *
     * @param {string} attribute
     * @param {QueryTypes} value
     * @returns {string}
     */
    Query.notEqual = (attribute, value) => new Query("notEqual", attribute, value).toString();
    /**
     * Filter resources where attribute is less than value.
     *
     * @param {string} attribute
     * @param {QueryTypes} value
     * @returns {string}
     */
    Query.lessThan = (attribute, value) => new Query("lessThan", attribute, value).toString();
    /**
     * Filter resources where attribute is less than or equal to value.
     *
     * @param {string} attribute
     * @param {QueryTypes} value
     * @returns {string}
     */
    Query.lessThanEqual = (attribute, value) => new Query("lessThanEqual", attribute, value).toString();
    /**
     * Filter resources where attribute is greater than value.
     *
     * @param {string} attribute
     * @param {QueryTypes} value
     * @returns {string}
     */
    Query.greaterThan = (attribute, value) => new Query("greaterThan", attribute, value).toString();
    /**
     * Filter resources where attribute is greater than or equal to value.
     *
     * @param {string} attribute
     * @param {QueryTypes} value
     * @returns {string}
     */
    Query.greaterThanEqual = (attribute, value) => new Query("greaterThanEqual", attribute, value).toString();
    /**
     * Filter resources where attribute is null.
     *
     * @param {string} attribute
     * @returns {string}
     */
    Query.isNull = (attribute) => new Query("isNull", attribute).toString();
    /**
     * Filter resources where attribute is not null.
     *
     * @param {string} attribute
     * @returns {string}
     */
    Query.isNotNull = (attribute) => new Query("isNotNull", attribute).toString();
    /**
     * Filter resources where attribute is between start and end (inclusive).
     *
     * @param {string} attribute
     * @param {string | number} start
     * @param {string | number} end
     * @returns {string}
     */
    Query.between = (attribute, start, end) => new Query("between", attribute, [start, end]).toString();
    /**
     * Filter resources where attribute starts with value.
     *
     * @param {string} attribute
     * @param {string} value
     * @returns {string}
     */
    Query.startsWith = (attribute, value) => new Query("startsWith", attribute, value).toString();
    /**
     * Filter resources where attribute ends with value.
     *
     * @param {string} attribute
     * @param {string} value
     * @returns {string}
     */
    Query.endsWith = (attribute, value) => new Query("endsWith", attribute, value).toString();
    /**
     * Specify which attributes should be returned by the API call.
     *
     * @param {string[]} attributes
     * @returns {string}
     */
    Query.select = (attributes) => new Query("select", undefined, attributes).toString();
    /**
     * Filter resources by searching attribute for value.
     * A fulltext index on attribute is required for this query to work.
     *
     * @param {string} attribute
     * @param {string} value
     * @returns {string}
     */
    Query.search = (attribute, value) => new Query("search", attribute, value).toString();
    /**
     * Sort results by attribute descending.
     *
     * @param {string} attribute
     * @returns {string}
     */
    Query.orderDesc = (attribute) => new Query("orderDesc", attribute).toString();
    /**
     * Sort results by attribute ascending.
     *
     * @param {string} attribute
     * @returns {string}
     */
    Query.orderAsc = (attribute) => new Query("orderAsc", attribute).toString();
    /**
     * Return results after documentId.
     *
     * @param {string} documentId
     * @returns {string}
     */
    Query.cursorAfter = (documentId) => new Query("cursorAfter", undefined, documentId).toString();
    /**
     * Return results before documentId.
     *
     * @param {string} documentId
     * @returns {string}
     */
    Query.cursorBefore = (documentId) => new Query("cursorBefore", undefined, documentId).toString();
    /**
     * Return only limit results.
     *
     * @param {number} limit
     * @returns {string}
     */
    Query.limit = (limit) => new Query("limit", undefined, limit).toString();
    /**
     * Filter resources by skipping the first offset results.
     *
     * @param {number} offset
     * @returns {string}
     */
    Query.offset = (offset) => new Query("offset", undefined, offset).toString();
    /**
     * Filter resources where attribute contains the specified value.
     *
     * @param {string} attribute
     * @param {string | string[]} value
     * @returns {string}
     */
    Query.contains = (attribute, value) => new Query("contains", attribute, value).toString();
    /**
     * Combine multiple queries using logical OR operator.
     *
     * @param {string[]} queries
     * @returns {string}
     */
    Query.or = (queries) => new Query("or", undefined, queries.map((query) => JSON.parse(query))).toString();
    /**
     * Combine multiple queries using logical AND operator.
     *
     * @param {string[]} queries
     * @returns {string}
     */
    Query.and = (queries) => new Query("and", undefined, queries.map((query) => JSON.parse(query))).toString();

    /**
     * Exception thrown by the  package
     */
    class AppwriteException extends Error {
        /**
         * Initializes a Appwrite Exception.
         *
         * @param {string} message - The error message.
         * @param {number} code - The error code. Default is 0.
         * @param {string} type - The error type. Default is an empty string.
         * @param {string} response - The response string. Default is an empty string.
         */
        constructor(message, code = 0, type = '', response = '') {
            super(message);
            this.name = 'AppwriteException';
            this.message = message;
            this.code = code;
            this.type = type;
            this.response = response;
        }
    }
    /**
     * Client that handles requests to Appwrite
     */
    class Client {
        constructor() {
            /**
             * Holds configuration such as project.
             */
            this.config = {
                endpoint: 'https://cloud.appwrite.io/v1',
                endpointRealtime: '',
                project: '',
                jwt: '',
                locale: '',
                session: '',
            };
            /**
             * Custom headers for API requests.
             */
            this.headers = {
                'x-sdk-name': 'Web',
                'x-sdk-platform': 'client',
                'x-sdk-language': 'web',
                'x-sdk-version': '16.0.2',
                'X-Appwrite-Response-Format': '1.6.0',
            };
            this.realtime = {
                socket: undefined,
                timeout: undefined,
                url: '',
                channels: new Set(),
                subscriptions: new Map(),
                subscriptionsCounter: 0,
                reconnect: true,
                reconnectAttempts: 0,
                lastMessage: undefined,
                connect: () => {
                    clearTimeout(this.realtime.timeout);
                    this.realtime.timeout = window === null || window === void 0 ? void 0 : window.setTimeout(() => {
                        this.realtime.createSocket();
                    }, 50);
                },
                getTimeout: () => {
                    switch (true) {
                        case this.realtime.reconnectAttempts < 5:
                            return 1000;
                        case this.realtime.reconnectAttempts < 15:
                            return 5000;
                        case this.realtime.reconnectAttempts < 100:
                            return 10000;
                        default:
                            return 60000;
                    }
                },
                createSocket: () => {
                    var _a, _b, _c;
                    if (this.realtime.channels.size < 1) {
                        this.realtime.reconnect = false;
                        (_a = this.realtime.socket) === null || _a === void 0 ? void 0 : _a.close();
                        return;
                    }
                    const channels = new URLSearchParams();
                    channels.set('project', this.config.project);
                    this.realtime.channels.forEach(channel => {
                        channels.append('channels[]', channel);
                    });
                    const url = this.config.endpointRealtime + '/realtime?' + channels.toString();
                    if (url !== this.realtime.url || // Check if URL is present
                        !this.realtime.socket || // Check if WebSocket has not been created
                        ((_b = this.realtime.socket) === null || _b === void 0 ? void 0 : _b.readyState) > WebSocket.OPEN // Check if WebSocket is CLOSING (3) or CLOSED (4)
                    ) {
                        if (this.realtime.socket &&
                            ((_c = this.realtime.socket) === null || _c === void 0 ? void 0 : _c.readyState) < WebSocket.CLOSING // Close WebSocket if it is CONNECTING (0) or OPEN (1)
                        ) {
                            this.realtime.reconnect = false;
                            this.realtime.socket.close();
                        }
                        this.realtime.url = url;
                        this.realtime.socket = new WebSocket(url);
                        this.realtime.socket.addEventListener('message', this.realtime.onMessage);
                        this.realtime.socket.addEventListener('open', _event => {
                            this.realtime.reconnectAttempts = 0;
                        });
                        this.realtime.socket.addEventListener('close', event => {
                            var _a, _b, _c;
                            if (!this.realtime.reconnect ||
                                (((_b = (_a = this.realtime) === null || _a === void 0 ? void 0 : _a.lastMessage) === null || _b === void 0 ? void 0 : _b.type) === 'error' && // Check if last message was of type error
                                    ((_c = this.realtime) === null || _c === void 0 ? void 0 : _c.lastMessage.data).code === 1008 // Check for policy violation 1008
                                )) {
                                this.realtime.reconnect = true;
                                return;
                            }
                            const timeout = this.realtime.getTimeout();
                            console.error(`Realtime got disconnected. Reconnect will be attempted in ${timeout / 1000} seconds.`, event.reason);
                            setTimeout(() => {
                                this.realtime.reconnectAttempts++;
                                this.realtime.createSocket();
                            }, timeout);
                        });
                    }
                },
                onMessage: (event) => {
                    var _a, _b;
                    try {
                        const message = JSON.parse(event.data);
                        this.realtime.lastMessage = message;
                        switch (message.type) {
                            case 'connected':
                                const cookie = JSON.parse((_a = window.localStorage.getItem('cookieFallback')) !== null && _a !== void 0 ? _a : '{}');
                                const session = cookie === null || cookie === void 0 ? void 0 : cookie[`a_session_${this.config.project}`];
                                const messageData = message.data;
                                if (session && !messageData.user) {
                                    (_b = this.realtime.socket) === null || _b === void 0 ? void 0 : _b.send(JSON.stringify({
                                        type: 'authentication',
                                        data: {
                                            session
                                        }
                                    }));
                                }
                                break;
                            case 'event':
                                let data = message.data;
                                if (data === null || data === void 0 ? void 0 : data.channels) {
                                    const isSubscribed = data.channels.some(channel => this.realtime.channels.has(channel));
                                    if (!isSubscribed)
                                        return;
                                    this.realtime.subscriptions.forEach(subscription => {
                                        if (data.channels.some(channel => subscription.channels.includes(channel))) {
                                            setTimeout(() => subscription.callback(data));
                                        }
                                    });
                                }
                                break;
                            case 'error':
                                throw message.data;
                            default:
                                break;
                        }
                    }
                    catch (e) {
                        console.error(e);
                    }
                },
                cleanUp: channels => {
                    this.realtime.channels.forEach(channel => {
                        if (channels.includes(channel)) {
                            let found = Array.from(this.realtime.subscriptions).some(([_key, subscription]) => {
                                return subscription.channels.includes(channel);
                            });
                            if (!found) {
                                this.realtime.channels.delete(channel);
                            }
                        }
                    });
                }
            };
        }
        /**
         * Set Endpoint
         *
         * Your project endpoint
         *
         * @param {string} endpoint
         *
         * @returns {this}
         */
        setEndpoint(endpoint) {
            this.config.endpoint = endpoint;
            this.config.endpointRealtime = this.config.endpointRealtime || this.config.endpoint.replace('https://', 'wss://').replace('http://', 'ws://');
            return this;
        }
        /**
         * Set Realtime Endpoint
         *
         * @param {string} endpointRealtime
         *
         * @returns {this}
         */
        setEndpointRealtime(endpointRealtime) {
            this.config.endpointRealtime = endpointRealtime;
            return this;
        }
        /**
         * Set Project
         *
         * Your project ID
         *
         * @param value string
         *
         * @return {this}
         */
        setProject(value) {
            this.headers['X-Appwrite-Project'] = value;
            this.config.project = value;
            return this;
        }
        /**
         * Set JWT
         *
         * Your secret JSON Web Token
         *
         * @param value string
         *
         * @return {this}
         */
        setJWT(value) {
            this.headers['X-Appwrite-JWT'] = value;
            this.config.jwt = value;
            return this;
        }
        /**
         * Set Locale
         *
         * @param value string
         *
         * @return {this}
         */
        setLocale(value) {
            this.headers['X-Appwrite-Locale'] = value;
            this.config.locale = value;
            return this;
        }
        /**
         * Set Session
         *
         * The user session to authenticate with
         *
         * @param value string
         *
         * @return {this}
         */
        setSession(value) {
            this.headers['X-Appwrite-Session'] = value;
            this.config.session = value;
            return this;
        }
        /**
         * Subscribes to Appwrite events and passes you the payload in realtime.
         *
         * @param {string|string[]} channels
         * Channel to subscribe - pass a single channel as a string or multiple with an array of strings.
         *
         * Possible channels are:
         * - account
         * - collections
         * - collections.[ID]
         * - collections.[ID].documents
         * - documents
         * - documents.[ID]
         * - files
         * - files.[ID]
         * - executions
         * - executions.[ID]
         * - functions.[ID]
         * - teams
         * - teams.[ID]
         * - memberships
         * - memberships.[ID]
         * @param {(payload: RealtimeMessage) => void} callback Is called on every realtime update.
         * @returns {() => void} Unsubscribes from events.
         */
        subscribe(channels, callback) {
            let channelArray = typeof channels === 'string' ? [channels] : channels;
            channelArray.forEach(channel => this.realtime.channels.add(channel));
            const counter = this.realtime.subscriptionsCounter++;
            this.realtime.subscriptions.set(counter, {
                channels: channelArray,
                callback
            });
            this.realtime.connect();
            return () => {
                this.realtime.subscriptions.delete(counter);
                this.realtime.cleanUp(channelArray);
                this.realtime.connect();
            };
        }
        prepareRequest(method, url, headers = {}, params = {}) {
            method = method.toUpperCase();
            headers = Object.assign({}, this.headers, headers);
            if (typeof window !== 'undefined' && window.localStorage) {
                const cookieFallback = window.localStorage.getItem('cookieFallback');
                if (cookieFallback) {
                    headers['X-Fallback-Cookies'] = cookieFallback;
                }
            }
            let options = {
                method,
                headers,
                credentials: 'include',
            };
            if (method === 'GET') {
                for (const [key, value] of Object.entries(Client.flatten(params))) {
                    url.searchParams.append(key, value);
                }
            }
            else {
                switch (headers['content-type']) {
                    case 'application/json':
                        options.body = JSON.stringify(params);
                        break;
                    case 'multipart/form-data':
                        const formData = new FormData();
                        for (const [key, value] of Object.entries(params)) {
                            if (value instanceof File) {
                                formData.append(key, value, value.name);
                            }
                            else if (Array.isArray(value)) {
                                for (const nestedValue of value) {
                                    formData.append(`${key}[]`, nestedValue);
                                }
                            }
                            else {
                                formData.append(key, value);
                            }
                        }
                        options.body = formData;
                        delete headers['content-type'];
                        break;
                }
            }
            return { uri: url.toString(), options };
        }
        chunkedUpload(method, url, headers = {}, originalPayload = {}, onProgress) {
            return __awaiter(this, void 0, void 0, function* () {
                const file = Object.values(originalPayload).find((value) => value instanceof File);
                if (file.size <= Client.CHUNK_SIZE) {
                    return yield this.call(method, url, headers, originalPayload);
                }
                let start = 0;
                let response = null;
                while (start < file.size) {
                    let end = start + Client.CHUNK_SIZE; // Prepare end for the next chunk
                    if (end >= file.size) {
                        end = file.size; // Adjust for the last chunk to include the last byte
                    }
                    headers['content-range'] = `bytes ${start}-${end - 1}/${file.size}`;
                    const chunk = file.slice(start, end);
                    let payload = Object.assign(Object.assign({}, originalPayload), { file: new File([chunk], file.name) });
                    response = yield this.call(method, url, headers, payload);
                    if (onProgress && typeof onProgress === 'function') {
                        onProgress({
                            $id: response.$id,
                            progress: Math.round((end / file.size) * 100),
                            sizeUploaded: end,
                            chunksTotal: Math.ceil(file.size / Client.CHUNK_SIZE),
                            chunksUploaded: Math.ceil(end / Client.CHUNK_SIZE)
                        });
                    }
                    if (response && response.$id) {
                        headers['x-appwrite-id'] = response.$id;
                    }
                    start = end;
                }
                return response;
            });
        }
        call(method, url, headers = {}, params = {}, responseType = 'json') {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                const { uri, options } = this.prepareRequest(method, url, headers, params);
                let data = null;
                const response = yield fetch(uri, options);
                const warnings = response.headers.get('x-appwrite-warning');
                if (warnings) {
                    warnings.split(';').forEach((warning) => console.warn('Warning: ' + warning));
                }
                if ((_a = response.headers.get('content-type')) === null || _a === void 0 ? void 0 : _a.includes('application/json')) {
                    data = yield response.json();
                }
                else if (responseType === 'arrayBuffer') {
                    data = yield response.arrayBuffer();
                }
                else {
                    data = {
                        message: yield response.text()
                    };
                }
                if (400 <= response.status) {
                    throw new AppwriteException(data === null || data === void 0 ? void 0 : data.message, response.status, data === null || data === void 0 ? void 0 : data.type, data);
                }
                const cookieFallback = response.headers.get('X-Fallback-Cookies');
                if (typeof window !== 'undefined' && window.localStorage && cookieFallback) {
                    window.console.warn('Appwrite is using localStorage for session management. Increase your security by adding a custom domain as your API endpoint.');
                    window.localStorage.setItem('cookieFallback', cookieFallback);
                }
                return data;
            });
        }
        static flatten(data, prefix = '') {
            let output = {};
            for (const [key, value] of Object.entries(data)) {
                let finalKey = prefix ? prefix + '[' + key + ']' : key;
                if (Array.isArray(value)) {
                    output = Object.assign(Object.assign({}, output), Client.flatten(value, finalKey));
                }
                else {
                    output[finalKey] = value;
                }
            }
            return output;
        }
    }
    Client.CHUNK_SIZE = 1024 * 1024 * 5;

    class Service {
        constructor(client) {
            this.client = client;
        }
        static flatten(data, prefix = '') {
            let output = {};
            for (const [key, value] of Object.entries(data)) {
                let finalKey = prefix ? prefix + '[' + key + ']' : key;
                if (Array.isArray(value)) {
                    output = Object.assign(Object.assign({}, output), Service.flatten(value, finalKey));
                }
                else {
                    output[finalKey] = value;
                }
            }
            return output;
        }
    }
    /**
     * The size for chunked uploads in bytes.
     */
    Service.CHUNK_SIZE = 5 * 1024 * 1024; // 5MB

    class Account {
        constructor(client) {
            this.client = client;
        }
        /**
         * Get account
         *
         * Get the currently logged in user.
         *
         * @throws {AppwriteException}
         * @returns {Promise<Models.User<Preferences>>}
         */
        get() {
            return __awaiter(this, void 0, void 0, function* () {
                const apiPath = '/account';
                const payload = {};
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('get', uri, apiHeaders, payload);
            });
        }
        /**
         * Create account
         *
         * Use this endpoint to allow a new user to register a new account in your project. After the user registration completes successfully, you can use the [/account/verfication](https://appwrite.io/docs/references/cloud/client-web/account#createVerification) route to start verifying the user email address. To allow the new user to login to their new account, you need to create a new [account session](https://appwrite.io/docs/references/cloud/client-web/account#createEmailSession).
         *
         * @param {string} userId
         * @param {string} email
         * @param {string} password
         * @param {string} name
         * @throws {AppwriteException}
         * @returns {Promise<Models.User<Preferences>>}
         */
        create(userId, email, password, name) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof userId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "userId"');
                }
                if (typeof email === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "email"');
                }
                if (typeof password === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "password"');
                }
                const apiPath = '/account';
                const payload = {};
                if (typeof userId !== 'undefined') {
                    payload['userId'] = userId;
                }
                if (typeof email !== 'undefined') {
                    payload['email'] = email;
                }
                if (typeof password !== 'undefined') {
                    payload['password'] = password;
                }
                if (typeof name !== 'undefined') {
                    payload['name'] = name;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('post', uri, apiHeaders, payload);
            });
        }
        /**
         * Update email
         *
         * Update currently logged in user account email address. After changing user address, the user confirmation status will get reset. A new confirmation email is not sent automatically however you can use the send confirmation email endpoint again to send the confirmation email. For security measures, user password is required to complete this request.
    This endpoint can also be used to convert an anonymous account to a normal one, by passing an email address and a new password.

         *
         * @param {string} email
         * @param {string} password
         * @throws {AppwriteException}
         * @returns {Promise<Models.User<Preferences>>}
         */
        updateEmail(email, password) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof email === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "email"');
                }
                if (typeof password === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "password"');
                }
                const apiPath = '/account/email';
                const payload = {};
                if (typeof email !== 'undefined') {
                    payload['email'] = email;
                }
                if (typeof password !== 'undefined') {
                    payload['password'] = password;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('patch', uri, apiHeaders, payload);
            });
        }
        /**
         * List Identities
         *
         * Get the list of identities for the currently logged in user.
         *
         * @param {string[]} queries
         * @throws {AppwriteException}
         * @returns {Promise<Models.IdentityList>}
         */
        listIdentities(queries) {
            return __awaiter(this, void 0, void 0, function* () {
                const apiPath = '/account/identities';
                const payload = {};
                if (typeof queries !== 'undefined') {
                    payload['queries'] = queries;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('get', uri, apiHeaders, payload);
            });
        }
        /**
         * Delete identity
         *
         * Delete an identity by its unique ID.
         *
         * @param {string} identityId
         * @throws {AppwriteException}
         * @returns {Promise<{}>}
         */
        deleteIdentity(identityId) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof identityId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "identityId"');
                }
                const apiPath = '/account/identities/{identityId}'.replace('{identityId}', identityId);
                const payload = {};
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('delete', uri, apiHeaders, payload);
            });
        }
        /**
         * Create JWT
         *
         * Use this endpoint to create a JSON Web Token. You can use the resulting JWT to authenticate on behalf of the current user when working with the Appwrite server-side API and SDKs. The JWT secret is valid for 15 minutes from its creation and will be invalid if the user will logout in that time frame.
         *
         * @throws {AppwriteException}
         * @returns {Promise<Models.Jwt>}
         */
        createJWT() {
            return __awaiter(this, void 0, void 0, function* () {
                const apiPath = '/account/jwts';
                const payload = {};
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('post', uri, apiHeaders, payload);
            });
        }
        /**
         * List logs
         *
         * Get the list of latest security activity logs for the currently logged in user. Each log returns user IP address, location and date and time of log.
         *
         * @param {string[]} queries
         * @throws {AppwriteException}
         * @returns {Promise<Models.LogList>}
         */
        listLogs(queries) {
            return __awaiter(this, void 0, void 0, function* () {
                const apiPath = '/account/logs';
                const payload = {};
                if (typeof queries !== 'undefined') {
                    payload['queries'] = queries;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('get', uri, apiHeaders, payload);
            });
        }
        /**
         * Update MFA
         *
         * Enable or disable MFA on an account.
         *
         * @param {boolean} mfa
         * @throws {AppwriteException}
         * @returns {Promise<Models.User<Preferences>>}
         */
        updateMFA(mfa) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof mfa === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "mfa"');
                }
                const apiPath = '/account/mfa';
                const payload = {};
                if (typeof mfa !== 'undefined') {
                    payload['mfa'] = mfa;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('patch', uri, apiHeaders, payload);
            });
        }
        /**
         * Create Authenticator
         *
         * Add an authenticator app to be used as an MFA factor. Verify the authenticator using the [verify authenticator](/docs/references/cloud/client-web/account#updateMfaAuthenticator) method.
         *
         * @param {AuthenticatorType} type
         * @throws {AppwriteException}
         * @returns {Promise<Models.MfaType>}
         */
        createMfaAuthenticator(type) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof type === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "type"');
                }
                const apiPath = '/account/mfa/authenticators/{type}'.replace('{type}', type);
                const payload = {};
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('post', uri, apiHeaders, payload);
            });
        }
        /**
         * Verify Authenticator
         *
         * Verify an authenticator app after adding it using the [add authenticator](/docs/references/cloud/client-web/account#createMfaAuthenticator) method.
         *
         * @param {AuthenticatorType} type
         * @param {string} otp
         * @throws {AppwriteException}
         * @returns {Promise<Models.User<Preferences>>}
         */
        updateMfaAuthenticator(type, otp) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof type === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "type"');
                }
                if (typeof otp === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "otp"');
                }
                const apiPath = '/account/mfa/authenticators/{type}'.replace('{type}', type);
                const payload = {};
                if (typeof otp !== 'undefined') {
                    payload['otp'] = otp;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('put', uri, apiHeaders, payload);
            });
        }
        /**
         * Delete Authenticator
         *
         * Delete an authenticator for a user by ID.
         *
         * @param {AuthenticatorType} type
         * @throws {AppwriteException}
         * @returns {Promise<{}>}
         */
        deleteMfaAuthenticator(type) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof type === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "type"');
                }
                const apiPath = '/account/mfa/authenticators/{type}'.replace('{type}', type);
                const payload = {};
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('delete', uri, apiHeaders, payload);
            });
        }
        /**
         * Create MFA Challenge
         *
         * Begin the process of MFA verification after sign-in. Finish the flow with [updateMfaChallenge](/docs/references/cloud/client-web/account#updateMfaChallenge) method.
         *
         * @param {AuthenticationFactor} factor
         * @throws {AppwriteException}
         * @returns {Promise<Models.MfaChallenge>}
         */
        createMfaChallenge(factor) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof factor === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "factor"');
                }
                const apiPath = '/account/mfa/challenge';
                const payload = {};
                if (typeof factor !== 'undefined') {
                    payload['factor'] = factor;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('post', uri, apiHeaders, payload);
            });
        }
        /**
         * Create MFA Challenge (confirmation)
         *
         * Complete the MFA challenge by providing the one-time password. Finish the process of MFA verification by providing the one-time password. To begin the flow, use [createMfaChallenge](/docs/references/cloud/client-web/account#createMfaChallenge) method.
         *
         * @param {string} challengeId
         * @param {string} otp
         * @throws {AppwriteException}
         * @returns {Promise<{}>}
         */
        updateMfaChallenge(challengeId, otp) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof challengeId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "challengeId"');
                }
                if (typeof otp === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "otp"');
                }
                const apiPath = '/account/mfa/challenge';
                const payload = {};
                if (typeof challengeId !== 'undefined') {
                    payload['challengeId'] = challengeId;
                }
                if (typeof otp !== 'undefined') {
                    payload['otp'] = otp;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('put', uri, apiHeaders, payload);
            });
        }
        /**
         * List Factors
         *
         * List the factors available on the account to be used as a MFA challange.
         *
         * @throws {AppwriteException}
         * @returns {Promise<Models.MfaFactors>}
         */
        listMfaFactors() {
            return __awaiter(this, void 0, void 0, function* () {
                const apiPath = '/account/mfa/factors';
                const payload = {};
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('get', uri, apiHeaders, payload);
            });
        }
        /**
         * Get MFA Recovery Codes
         *
         * Get recovery codes that can be used as backup for MFA flow. Before getting codes, they must be generated using [createMfaRecoveryCodes](/docs/references/cloud/client-web/account#createMfaRecoveryCodes) method. An OTP challenge is required to read recovery codes.
         *
         * @throws {AppwriteException}
         * @returns {Promise<Models.MfaRecoveryCodes>}
         */
        getMfaRecoveryCodes() {
            return __awaiter(this, void 0, void 0, function* () {
                const apiPath = '/account/mfa/recovery-codes';
                const payload = {};
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('get', uri, apiHeaders, payload);
            });
        }
        /**
         * Create MFA Recovery Codes
         *
         * Generate recovery codes as backup for MFA flow. It&#039;s recommended to generate and show then immediately after user successfully adds their authehticator. Recovery codes can be used as a MFA verification type in [createMfaChallenge](/docs/references/cloud/client-web/account#createMfaChallenge) method.
         *
         * @throws {AppwriteException}
         * @returns {Promise<Models.MfaRecoveryCodes>}
         */
        createMfaRecoveryCodes() {
            return __awaiter(this, void 0, void 0, function* () {
                const apiPath = '/account/mfa/recovery-codes';
                const payload = {};
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('post', uri, apiHeaders, payload);
            });
        }
        /**
         * Regenerate MFA Recovery Codes
         *
         * Regenerate recovery codes that can be used as backup for MFA flow. Before regenerating codes, they must be first generated using [createMfaRecoveryCodes](/docs/references/cloud/client-web/account#createMfaRecoveryCodes) method. An OTP challenge is required to regenreate recovery codes.
         *
         * @throws {AppwriteException}
         * @returns {Promise<Models.MfaRecoveryCodes>}
         */
        updateMfaRecoveryCodes() {
            return __awaiter(this, void 0, void 0, function* () {
                const apiPath = '/account/mfa/recovery-codes';
                const payload = {};
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('patch', uri, apiHeaders, payload);
            });
        }
        /**
         * Update name
         *
         * Update currently logged in user account name.
         *
         * @param {string} name
         * @throws {AppwriteException}
         * @returns {Promise<Models.User<Preferences>>}
         */
        updateName(name) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof name === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "name"');
                }
                const apiPath = '/account/name';
                const payload = {};
                if (typeof name !== 'undefined') {
                    payload['name'] = name;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('patch', uri, apiHeaders, payload);
            });
        }
        /**
         * Update password
         *
         * Update currently logged in user password. For validation, user is required to pass in the new password, and the old password. For users created with OAuth, Team Invites and Magic URL, oldPassword is optional.
         *
         * @param {string} password
         * @param {string} oldPassword
         * @throws {AppwriteException}
         * @returns {Promise<Models.User<Preferences>>}
         */
        updatePassword(password, oldPassword) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof password === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "password"');
                }
                const apiPath = '/account/password';
                const payload = {};
                if (typeof password !== 'undefined') {
                    payload['password'] = password;
                }
                if (typeof oldPassword !== 'undefined') {
                    payload['oldPassword'] = oldPassword;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('patch', uri, apiHeaders, payload);
            });
        }
        /**
         * Update phone
         *
         * Update the currently logged in user&#039;s phone number. After updating the phone number, the phone verification status will be reset. A confirmation SMS is not sent automatically, however you can use the [POST /account/verification/phone](https://appwrite.io/docs/references/cloud/client-web/account#createPhoneVerification) endpoint to send a confirmation SMS.
         *
         * @param {string} phone
         * @param {string} password
         * @throws {AppwriteException}
         * @returns {Promise<Models.User<Preferences>>}
         */
        updatePhone(phone, password) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof phone === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "phone"');
                }
                if (typeof password === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "password"');
                }
                const apiPath = '/account/phone';
                const payload = {};
                if (typeof phone !== 'undefined') {
                    payload['phone'] = phone;
                }
                if (typeof password !== 'undefined') {
                    payload['password'] = password;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('patch', uri, apiHeaders, payload);
            });
        }
        /**
         * Get account preferences
         *
         * Get the preferences as a key-value object for the currently logged in user.
         *
         * @throws {AppwriteException}
         * @returns {Promise<Preferences>}
         */
        getPrefs() {
            return __awaiter(this, void 0, void 0, function* () {
                const apiPath = '/account/prefs';
                const payload = {};
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('get', uri, apiHeaders, payload);
            });
        }
        /**
         * Update preferences
         *
         * Update currently logged in user account preferences. The object you pass is stored as is, and replaces any previous value. The maximum allowed prefs size is 64kB and throws error if exceeded.
         *
         * @param {Partial<Preferences>} prefs
         * @throws {AppwriteException}
         * @returns {Promise<Models.User<Preferences>>}
         */
        updatePrefs(prefs) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof prefs === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "prefs"');
                }
                const apiPath = '/account/prefs';
                const payload = {};
                if (typeof prefs !== 'undefined') {
                    payload['prefs'] = prefs;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('patch', uri, apiHeaders, payload);
            });
        }
        /**
         * Create password recovery
         *
         * Sends the user an email with a temporary secret key for password reset. When the user clicks the confirmation link he is redirected back to your app password reset URL with the secret key and email address values attached to the URL query string. Use the query string params to submit a request to the [PUT /account/recovery](https://appwrite.io/docs/references/cloud/client-web/account#updateRecovery) endpoint to complete the process. The verification link sent to the user&#039;s email address is valid for 1 hour.
         *
         * @param {string} email
         * @param {string} url
         * @throws {AppwriteException}
         * @returns {Promise<Models.Token>}
         */
        createRecovery(email, url) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof email === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "email"');
                }
                if (typeof url === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "url"');
                }
                const apiPath = '/account/recovery';
                const payload = {};
                if (typeof email !== 'undefined') {
                    payload['email'] = email;
                }
                if (typeof url !== 'undefined') {
                    payload['url'] = url;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('post', uri, apiHeaders, payload);
            });
        }
        /**
         * Create password recovery (confirmation)
         *
         * Use this endpoint to complete the user account password reset. Both the **userId** and **secret** arguments will be passed as query parameters to the redirect URL you have provided when sending your request to the [POST /account/recovery](https://appwrite.io/docs/references/cloud/client-web/account#createRecovery) endpoint.

    Please note that in order to avoid a [Redirect Attack](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.md) the only valid redirect URLs are the ones from domains you have set when adding your platforms in the console interface.
         *
         * @param {string} userId
         * @param {string} secret
         * @param {string} password
         * @throws {AppwriteException}
         * @returns {Promise<Models.Token>}
         */
        updateRecovery(userId, secret, password) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof userId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "userId"');
                }
                if (typeof secret === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "secret"');
                }
                if (typeof password === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "password"');
                }
                const apiPath = '/account/recovery';
                const payload = {};
                if (typeof userId !== 'undefined') {
                    payload['userId'] = userId;
                }
                if (typeof secret !== 'undefined') {
                    payload['secret'] = secret;
                }
                if (typeof password !== 'undefined') {
                    payload['password'] = password;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('put', uri, apiHeaders, payload);
            });
        }
        /**
         * List sessions
         *
         * Get the list of active sessions across different devices for the currently logged in user.
         *
         * @throws {AppwriteException}
         * @returns {Promise<Models.SessionList>}
         */
        listSessions() {
            return __awaiter(this, void 0, void 0, function* () {
                const apiPath = '/account/sessions';
                const payload = {};
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('get', uri, apiHeaders, payload);
            });
        }
        /**
         * Delete sessions
         *
         * Delete all sessions from the user account and remove any sessions cookies from the end client.
         *
         * @throws {AppwriteException}
         * @returns {Promise<{}>}
         */
        deleteSessions() {
            return __awaiter(this, void 0, void 0, function* () {
                const apiPath = '/account/sessions';
                const payload = {};
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('delete', uri, apiHeaders, payload);
            });
        }
        /**
         * Create anonymous session
         *
         * Use this endpoint to allow a new user to register an anonymous account in your project. This route will also create a new session for the user. To allow the new user to convert an anonymous account to a normal account, you need to update its [email and password](https://appwrite.io/docs/references/cloud/client-web/account#updateEmail) or create an [OAuth2 session](https://appwrite.io/docs/references/cloud/client-web/account#CreateOAuth2Session).
         *
         * @throws {AppwriteException}
         * @returns {Promise<Models.Session>}
         */
        createAnonymousSession() {
            return __awaiter(this, void 0, void 0, function* () {
                const apiPath = '/account/sessions/anonymous';
                const payload = {};
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('post', uri, apiHeaders, payload);
            });
        }
        /**
         * Create email password session
         *
         * Allow the user to login into their account by providing a valid email and password combination. This route will create a new session for the user.

    A user is limited to 10 active sessions at a time by default. [Learn more about session limits](https://appwrite.io/docs/authentication-security#limits).
         *
         * @param {string} email
         * @param {string} password
         * @throws {AppwriteException}
         * @returns {Promise<Models.Session>}
         */
        createEmailPasswordSession(email, password) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof email === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "email"');
                }
                if (typeof password === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "password"');
                }
                const apiPath = '/account/sessions/email';
                const payload = {};
                if (typeof email !== 'undefined') {
                    payload['email'] = email;
                }
                if (typeof password !== 'undefined') {
                    payload['password'] = password;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('post', uri, apiHeaders, payload);
            });
        }
        /**
         * Update magic URL session
         *
         * Use this endpoint to create a session from token. Provide the **userId** and **secret** parameters from the successful response of authentication flows initiated by token creation. For example, magic URL and phone login.
         *
         * @param {string} userId
         * @param {string} secret
         * @throws {AppwriteException}
         * @returns {Promise<Models.Session>}
         */
        updateMagicURLSession(userId, secret) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof userId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "userId"');
                }
                if (typeof secret === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "secret"');
                }
                const apiPath = '/account/sessions/magic-url';
                const payload = {};
                if (typeof userId !== 'undefined') {
                    payload['userId'] = userId;
                }
                if (typeof secret !== 'undefined') {
                    payload['secret'] = secret;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('put', uri, apiHeaders, payload);
            });
        }
        /**
         * Create OAuth2 session
         *
         * Allow the user to login to their account using the OAuth2 provider of their choice. Each OAuth2 provider should be enabled from the Appwrite console first. Use the success and failure arguments to provide a redirect URL&#039;s back to your app when login is completed.

    If there is already an active session, the new session will be attached to the logged-in account. If there are no active sessions, the server will attempt to look for a user with the same email address as the email received from the OAuth2 provider and attach the new session to the existing user. If no matching user is found - the server will create a new user.

    A user is limited to 10 active sessions at a time by default. [Learn more about session limits](https://appwrite.io/docs/authentication-security#limits).

         *
         * @param {OAuthProvider} provider
         * @param {string} success
         * @param {string} failure
         * @param {string[]} scopes
         * @throws {AppwriteException}
         * @returns {Promise<void | string>}
         */
        createOAuth2Session(provider, success, failure, scopes) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof provider === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "provider"');
                }
                const apiPath = '/account/sessions/oauth2/{provider}'.replace('{provider}', provider);
                const payload = {};
                if (typeof success !== 'undefined') {
                    payload['success'] = success;
                }
                if (typeof failure !== 'undefined') {
                    payload['failure'] = failure;
                }
                if (typeof scopes !== 'undefined') {
                    payload['scopes'] = scopes;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                payload['project'] = this.client.config.project;
                for (const [key, value] of Object.entries(Service.flatten(payload))) {
                    uri.searchParams.append(key, value);
                }
                if (typeof window !== 'undefined' && (window === null || window === void 0 ? void 0 : window.location)) {
                    window.location.href = uri.toString();
                    return;
                }
                else {
                    return uri.toString();
                }
            });
        }
        /**
         * Update phone session
         *
         * Use this endpoint to create a session from token. Provide the **userId** and **secret** parameters from the successful response of authentication flows initiated by token creation. For example, magic URL and phone login.
         *
         * @param {string} userId
         * @param {string} secret
         * @throws {AppwriteException}
         * @returns {Promise<Models.Session>}
         */
        updatePhoneSession(userId, secret) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof userId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "userId"');
                }
                if (typeof secret === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "secret"');
                }
                const apiPath = '/account/sessions/phone';
                const payload = {};
                if (typeof userId !== 'undefined') {
                    payload['userId'] = userId;
                }
                if (typeof secret !== 'undefined') {
                    payload['secret'] = secret;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('put', uri, apiHeaders, payload);
            });
        }
        /**
         * Create session
         *
         * Use this endpoint to create a session from token. Provide the **userId** and **secret** parameters from the successful response of authentication flows initiated by token creation. For example, magic URL and phone login.
         *
         * @param {string} userId
         * @param {string} secret
         * @throws {AppwriteException}
         * @returns {Promise<Models.Session>}
         */
        createSession(userId, secret) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof userId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "userId"');
                }
                if (typeof secret === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "secret"');
                }
                const apiPath = '/account/sessions/token';
                const payload = {};
                if (typeof userId !== 'undefined') {
                    payload['userId'] = userId;
                }
                if (typeof secret !== 'undefined') {
                    payload['secret'] = secret;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('post', uri, apiHeaders, payload);
            });
        }
        /**
         * Get session
         *
         * Use this endpoint to get a logged in user&#039;s session using a Session ID. Inputting &#039;current&#039; will return the current session being used.
         *
         * @param {string} sessionId
         * @throws {AppwriteException}
         * @returns {Promise<Models.Session>}
         */
        getSession(sessionId) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof sessionId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "sessionId"');
                }
                const apiPath = '/account/sessions/{sessionId}'.replace('{sessionId}', sessionId);
                const payload = {};
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('get', uri, apiHeaders, payload);
            });
        }
        /**
         * Update session
         *
         * Use this endpoint to extend a session&#039;s length. Extending a session is useful when session expiry is short. If the session was created using an OAuth provider, this endpoint refreshes the access token from the provider.
         *
         * @param {string} sessionId
         * @throws {AppwriteException}
         * @returns {Promise<Models.Session>}
         */
        updateSession(sessionId) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof sessionId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "sessionId"');
                }
                const apiPath = '/account/sessions/{sessionId}'.replace('{sessionId}', sessionId);
                const payload = {};
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('patch', uri, apiHeaders, payload);
            });
        }
        /**
         * Delete session
         *
         * Logout the user. Use &#039;current&#039; as the session ID to logout on this device, use a session ID to logout on another device. If you&#039;re looking to logout the user on all devices, use [Delete Sessions](https://appwrite.io/docs/references/cloud/client-web/account#deleteSessions) instead.
         *
         * @param {string} sessionId
         * @throws {AppwriteException}
         * @returns {Promise<{}>}
         */
        deleteSession(sessionId) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof sessionId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "sessionId"');
                }
                const apiPath = '/account/sessions/{sessionId}'.replace('{sessionId}', sessionId);
                const payload = {};
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('delete', uri, apiHeaders, payload);
            });
        }
        /**
         * Update status
         *
         * Block the currently logged in user account. Behind the scene, the user record is not deleted but permanently blocked from any access. To completely delete a user, use the Users API instead.
         *
         * @throws {AppwriteException}
         * @returns {Promise<Models.User<Preferences>>}
         */
        updateStatus() {
            return __awaiter(this, void 0, void 0, function* () {
                const apiPath = '/account/status';
                const payload = {};
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('patch', uri, apiHeaders, payload);
            });
        }
        /**
         * Create push target
         *
         *
         * @param {string} targetId
         * @param {string} identifier
         * @param {string} providerId
         * @throws {AppwriteException}
         * @returns {Promise<Models.Target>}
         */
        createPushTarget(targetId, identifier, providerId) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof targetId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "targetId"');
                }
                if (typeof identifier === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "identifier"');
                }
                const apiPath = '/account/targets/push';
                const payload = {};
                if (typeof targetId !== 'undefined') {
                    payload['targetId'] = targetId;
                }
                if (typeof identifier !== 'undefined') {
                    payload['identifier'] = identifier;
                }
                if (typeof providerId !== 'undefined') {
                    payload['providerId'] = providerId;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('post', uri, apiHeaders, payload);
            });
        }
        /**
         * Update push target
         *
         *
         * @param {string} targetId
         * @param {string} identifier
         * @throws {AppwriteException}
         * @returns {Promise<Models.Target>}
         */
        updatePushTarget(targetId, identifier) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof targetId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "targetId"');
                }
                if (typeof identifier === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "identifier"');
                }
                const apiPath = '/account/targets/{targetId}/push'.replace('{targetId}', targetId);
                const payload = {};
                if (typeof identifier !== 'undefined') {
                    payload['identifier'] = identifier;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('put', uri, apiHeaders, payload);
            });
        }
        /**
         * Delete push target
         *
         *
         * @param {string} targetId
         * @throws {AppwriteException}
         * @returns {Promise<{}>}
         */
        deletePushTarget(targetId) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof targetId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "targetId"');
                }
                const apiPath = '/account/targets/{targetId}/push'.replace('{targetId}', targetId);
                const payload = {};
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('delete', uri, apiHeaders, payload);
            });
        }
        /**
         * Create email token (OTP)
         *
         * Sends the user an email with a secret key for creating a session. If the provided user ID has not be registered, a new user will be created. Use the returned user ID and secret and submit a request to the [POST /v1/account/sessions/token](https://appwrite.io/docs/references/cloud/client-web/account#createSession) endpoint to complete the login process. The secret sent to the user&#039;s email is valid for 15 minutes.

    A user is limited to 10 active sessions at a time by default. [Learn more about session limits](https://appwrite.io/docs/authentication-security#limits).
         *
         * @param {string} userId
         * @param {string} email
         * @param {boolean} phrase
         * @throws {AppwriteException}
         * @returns {Promise<Models.Token>}
         */
        createEmailToken(userId, email, phrase) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof userId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "userId"');
                }
                if (typeof email === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "email"');
                }
                const apiPath = '/account/tokens/email';
                const payload = {};
                if (typeof userId !== 'undefined') {
                    payload['userId'] = userId;
                }
                if (typeof email !== 'undefined') {
                    payload['email'] = email;
                }
                if (typeof phrase !== 'undefined') {
                    payload['phrase'] = phrase;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('post', uri, apiHeaders, payload);
            });
        }
        /**
         * Create magic URL token
         *
         * Sends the user an email with a secret key for creating a session. If the provided user ID has not been registered, a new user will be created. When the user clicks the link in the email, the user is redirected back to the URL you provided with the secret key and userId values attached to the URL query string. Use the query string parameters to submit a request to the [POST /v1/account/sessions/token](https://appwrite.io/docs/references/cloud/client-web/account#createSession) endpoint to complete the login process. The link sent to the user&#039;s email address is valid for 1 hour. If you are on a mobile device you can leave the URL parameter empty, so that the login completion will be handled by your Appwrite instance by default.

    A user is limited to 10 active sessions at a time by default. [Learn more about session limits](https://appwrite.io/docs/authentication-security#limits).

         *
         * @param {string} userId
         * @param {string} email
         * @param {string} url
         * @param {boolean} phrase
         * @throws {AppwriteException}
         * @returns {Promise<Models.Token>}
         */
        createMagicURLToken(userId, email, url, phrase) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof userId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "userId"');
                }
                if (typeof email === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "email"');
                }
                const apiPath = '/account/tokens/magic-url';
                const payload = {};
                if (typeof userId !== 'undefined') {
                    payload['userId'] = userId;
                }
                if (typeof email !== 'undefined') {
                    payload['email'] = email;
                }
                if (typeof url !== 'undefined') {
                    payload['url'] = url;
                }
                if (typeof phrase !== 'undefined') {
                    payload['phrase'] = phrase;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('post', uri, apiHeaders, payload);
            });
        }
        /**
         * Create OAuth2 token
         *
         * Allow the user to login to their account using the OAuth2 provider of their choice. Each OAuth2 provider should be enabled from the Appwrite console first. Use the success and failure arguments to provide a redirect URL&#039;s back to your app when login is completed.

    If authentication succeeds, `userId` and `secret` of a token will be appended to the success URL as query parameters. These can be used to create a new session using the [Create session](https://appwrite.io/docs/references/cloud/client-web/account#createSession) endpoint.

    A user is limited to 10 active sessions at a time by default. [Learn more about session limits](https://appwrite.io/docs/authentication-security#limits).
         *
         * @param {OAuthProvider} provider
         * @param {string} success
         * @param {string} failure
         * @param {string[]} scopes
         * @throws {AppwriteException}
         * @returns {Promise<void | string>}
         */
        createOAuth2Token(provider, success, failure, scopes) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof provider === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "provider"');
                }
                const apiPath = '/account/tokens/oauth2/{provider}'.replace('{provider}', provider);
                const payload = {};
                if (typeof success !== 'undefined') {
                    payload['success'] = success;
                }
                if (typeof failure !== 'undefined') {
                    payload['failure'] = failure;
                }
                if (typeof scopes !== 'undefined') {
                    payload['scopes'] = scopes;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                payload['project'] = this.client.config.project;
                for (const [key, value] of Object.entries(Service.flatten(payload))) {
                    uri.searchParams.append(key, value);
                }
                if (typeof window !== 'undefined' && (window === null || window === void 0 ? void 0 : window.location)) {
                    window.location.href = uri.toString();
                    return;
                }
                else {
                    return uri.toString();
                }
            });
        }
        /**
         * Create phone token
         *
         * Sends the user an SMS with a secret key for creating a session. If the provided user ID has not be registered, a new user will be created. Use the returned user ID and secret and submit a request to the [POST /v1/account/sessions/token](https://appwrite.io/docs/references/cloud/client-web/account#createSession) endpoint to complete the login process. The secret sent to the user&#039;s phone is valid for 15 minutes.

    A user is limited to 10 active sessions at a time by default. [Learn more about session limits](https://appwrite.io/docs/authentication-security#limits).
         *
         * @param {string} userId
         * @param {string} phone
         * @throws {AppwriteException}
         * @returns {Promise<Models.Token>}
         */
        createPhoneToken(userId, phone) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof userId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "userId"');
                }
                if (typeof phone === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "phone"');
                }
                const apiPath = '/account/tokens/phone';
                const payload = {};
                if (typeof userId !== 'undefined') {
                    payload['userId'] = userId;
                }
                if (typeof phone !== 'undefined') {
                    payload['phone'] = phone;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('post', uri, apiHeaders, payload);
            });
        }
        /**
         * Create email verification
         *
         * Use this endpoint to send a verification message to your user email address to confirm they are the valid owners of that address. Both the **userId** and **secret** arguments will be passed as query parameters to the URL you have provided to be attached to the verification email. The provided URL should redirect the user back to your app and allow you to complete the verification process by verifying both the **userId** and **secret** parameters. Learn more about how to [complete the verification process](https://appwrite.io/docs/references/cloud/client-web/account#updateVerification). The verification link sent to the user&#039;s email address is valid for 7 days.

    Please note that in order to avoid a [Redirect Attack](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.md), the only valid redirect URLs are the ones from domains you have set when adding your platforms in the console interface.

         *
         * @param {string} url
         * @throws {AppwriteException}
         * @returns {Promise<Models.Token>}
         */
        createVerification(url) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof url === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "url"');
                }
                const apiPath = '/account/verification';
                const payload = {};
                if (typeof url !== 'undefined') {
                    payload['url'] = url;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('post', uri, apiHeaders, payload);
            });
        }
        /**
         * Create email verification (confirmation)
         *
         * Use this endpoint to complete the user email verification process. Use both the **userId** and **secret** parameters that were attached to your app URL to verify the user email ownership. If confirmed this route will return a 200 status code.
         *
         * @param {string} userId
         * @param {string} secret
         * @throws {AppwriteException}
         * @returns {Promise<Models.Token>}
         */
        updateVerification(userId, secret) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof userId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "userId"');
                }
                if (typeof secret === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "secret"');
                }
                const apiPath = '/account/verification';
                const payload = {};
                if (typeof userId !== 'undefined') {
                    payload['userId'] = userId;
                }
                if (typeof secret !== 'undefined') {
                    payload['secret'] = secret;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('put', uri, apiHeaders, payload);
            });
        }
        /**
         * Create phone verification
         *
         * Use this endpoint to send a verification SMS to the currently logged in user. This endpoint is meant for use after updating a user&#039;s phone number using the [accountUpdatePhone](https://appwrite.io/docs/references/cloud/client-web/account#updatePhone) endpoint. Learn more about how to [complete the verification process](https://appwrite.io/docs/references/cloud/client-web/account#updatePhoneVerification). The verification code sent to the user&#039;s phone number is valid for 15 minutes.
         *
         * @throws {AppwriteException}
         * @returns {Promise<Models.Token>}
         */
        createPhoneVerification() {
            return __awaiter(this, void 0, void 0, function* () {
                const apiPath = '/account/verification/phone';
                const payload = {};
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('post', uri, apiHeaders, payload);
            });
        }
        /**
         * Update phone verification (confirmation)
         *
         * Use this endpoint to complete the user phone verification process. Use the **userId** and **secret** that were sent to your user&#039;s phone number to verify the user email ownership. If confirmed this route will return a 200 status code.
         *
         * @param {string} userId
         * @param {string} secret
         * @throws {AppwriteException}
         * @returns {Promise<Models.Token>}
         */
        updatePhoneVerification(userId, secret) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof userId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "userId"');
                }
                if (typeof secret === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "secret"');
                }
                const apiPath = '/account/verification/phone';
                const payload = {};
                if (typeof userId !== 'undefined') {
                    payload['userId'] = userId;
                }
                if (typeof secret !== 'undefined') {
                    payload['secret'] = secret;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('put', uri, apiHeaders, payload);
            });
        }
    }

    class Avatars {
        constructor(client) {
            this.client = client;
        }
        /**
         * Get browser icon
         *
         * You can use this endpoint to show different browser icons to your users. The code argument receives the browser code as it appears in your user [GET /account/sessions](https://appwrite.io/docs/references/cloud/client-web/account#getSessions) endpoint. Use width, height and quality arguments to change the output settings.

    When one dimension is specified and the other is 0, the image is scaled with preserved aspect ratio. If both dimensions are 0, the API provides an image at source quality. If dimensions are not specified, the default size of image returned is 100x100px.
         *
         * @param {Browser} code
         * @param {number} width
         * @param {number} height
         * @param {number} quality
         * @throws {AppwriteException}
         * @returns {string}
         */
        getBrowser(code, width, height, quality) {
            if (typeof code === 'undefined') {
                throw new AppwriteException('Missing required parameter: "code"');
            }
            const apiPath = '/avatars/browsers/{code}'.replace('{code}', code);
            const payload = {};
            if (typeof width !== 'undefined') {
                payload['width'] = width;
            }
            if (typeof height !== 'undefined') {
                payload['height'] = height;
            }
            if (typeof quality !== 'undefined') {
                payload['quality'] = quality;
            }
            const uri = new URL(this.client.config.endpoint + apiPath);
            payload['project'] = this.client.config.project;
            for (const [key, value] of Object.entries(Service.flatten(payload))) {
                uri.searchParams.append(key, value);
            }
            payload['project'] = this.client.config.project;
            for (const [key, value] of Object.entries(Client.flatten(payload))) {
                uri.searchParams.append(key, value);
            }
            return uri.toString();
        }
        /**
         * Get credit card icon
         *
         * The credit card endpoint will return you the icon of the credit card provider you need. Use width, height and quality arguments to change the output settings.

    When one dimension is specified and the other is 0, the image is scaled with preserved aspect ratio. If both dimensions are 0, the API provides an image at source quality. If dimensions are not specified, the default size of image returned is 100x100px.

         *
         * @param {CreditCard} code
         * @param {number} width
         * @param {number} height
         * @param {number} quality
         * @throws {AppwriteException}
         * @returns {string}
         */
        getCreditCard(code, width, height, quality) {
            if (typeof code === 'undefined') {
                throw new AppwriteException('Missing required parameter: "code"');
            }
            const apiPath = '/avatars/credit-cards/{code}'.replace('{code}', code);
            const payload = {};
            if (typeof width !== 'undefined') {
                payload['width'] = width;
            }
            if (typeof height !== 'undefined') {
                payload['height'] = height;
            }
            if (typeof quality !== 'undefined') {
                payload['quality'] = quality;
            }
            const uri = new URL(this.client.config.endpoint + apiPath);
            payload['project'] = this.client.config.project;
            for (const [key, value] of Object.entries(Service.flatten(payload))) {
                uri.searchParams.append(key, value);
            }
            payload['project'] = this.client.config.project;
            for (const [key, value] of Object.entries(Client.flatten(payload))) {
                uri.searchParams.append(key, value);
            }
            return uri.toString();
        }
        /**
         * Get favicon
         *
         * Use this endpoint to fetch the favorite icon (AKA favicon) of any remote website URL.

    This endpoint does not follow HTTP redirects.
         *
         * @param {string} url
         * @throws {AppwriteException}
         * @returns {string}
         */
        getFavicon(url) {
            if (typeof url === 'undefined') {
                throw new AppwriteException('Missing required parameter: "url"');
            }
            const apiPath = '/avatars/favicon';
            const payload = {};
            if (typeof url !== 'undefined') {
                payload['url'] = url;
            }
            const uri = new URL(this.client.config.endpoint + apiPath);
            payload['project'] = this.client.config.project;
            for (const [key, value] of Object.entries(Service.flatten(payload))) {
                uri.searchParams.append(key, value);
            }
            payload['project'] = this.client.config.project;
            for (const [key, value] of Object.entries(Client.flatten(payload))) {
                uri.searchParams.append(key, value);
            }
            return uri.toString();
        }
        /**
         * Get country flag
         *
         * You can use this endpoint to show different country flags icons to your users. The code argument receives the 2 letter country code. Use width, height and quality arguments to change the output settings. Country codes follow the [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) standard.

    When one dimension is specified and the other is 0, the image is scaled with preserved aspect ratio. If both dimensions are 0, the API provides an image at source quality. If dimensions are not specified, the default size of image returned is 100x100px.

         *
         * @param {Flag} code
         * @param {number} width
         * @param {number} height
         * @param {number} quality
         * @throws {AppwriteException}
         * @returns {string}
         */
        getFlag(code, width, height, quality) {
            if (typeof code === 'undefined') {
                throw new AppwriteException('Missing required parameter: "code"');
            }
            const apiPath = '/avatars/flags/{code}'.replace('{code}', code);
            const payload = {};
            if (typeof width !== 'undefined') {
                payload['width'] = width;
            }
            if (typeof height !== 'undefined') {
                payload['height'] = height;
            }
            if (typeof quality !== 'undefined') {
                payload['quality'] = quality;
            }
            const uri = new URL(this.client.config.endpoint + apiPath);
            payload['project'] = this.client.config.project;
            for (const [key, value] of Object.entries(Service.flatten(payload))) {
                uri.searchParams.append(key, value);
            }
            payload['project'] = this.client.config.project;
            for (const [key, value] of Object.entries(Client.flatten(payload))) {
                uri.searchParams.append(key, value);
            }
            return uri.toString();
        }
        /**
         * Get image from URL
         *
         * Use this endpoint to fetch a remote image URL and crop it to any image size you want. This endpoint is very useful if you need to crop and display remote images in your app or in case you want to make sure a 3rd party image is properly served using a TLS protocol.

    When one dimension is specified and the other is 0, the image is scaled with preserved aspect ratio. If both dimensions are 0, the API provides an image at source quality. If dimensions are not specified, the default size of image returned is 400x400px.

    This endpoint does not follow HTTP redirects.
         *
         * @param {string} url
         * @param {number} width
         * @param {number} height
         * @throws {AppwriteException}
         * @returns {string}
         */
        getImage(url, width, height) {
            if (typeof url === 'undefined') {
                throw new AppwriteException('Missing required parameter: "url"');
            }
            const apiPath = '/avatars/image';
            const payload = {};
            if (typeof url !== 'undefined') {
                payload['url'] = url;
            }
            if (typeof width !== 'undefined') {
                payload['width'] = width;
            }
            if (typeof height !== 'undefined') {
                payload['height'] = height;
            }
            const uri = new URL(this.client.config.endpoint + apiPath);
            payload['project'] = this.client.config.project;
            for (const [key, value] of Object.entries(Service.flatten(payload))) {
                uri.searchParams.append(key, value);
            }
            payload['project'] = this.client.config.project;
            for (const [key, value] of Object.entries(Client.flatten(payload))) {
                uri.searchParams.append(key, value);
            }
            return uri.toString();
        }
        /**
         * Get user initials
         *
         * Use this endpoint to show your user initials avatar icon on your website or app. By default, this route will try to print your logged-in user name or email initials. You can also overwrite the user name if you pass the &#039;name&#039; parameter. If no name is given and no user is logged, an empty avatar will be returned.

    You can use the color and background params to change the avatar colors. By default, a random theme will be selected. The random theme will persist for the user&#039;s initials when reloading the same theme will always return for the same initials.

    When one dimension is specified and the other is 0, the image is scaled with preserved aspect ratio. If both dimensions are 0, the API provides an image at source quality. If dimensions are not specified, the default size of image returned is 100x100px.

         *
         * @param {string} name
         * @param {number} width
         * @param {number} height
         * @param {string} background
         * @throws {AppwriteException}
         * @returns {string}
         */
        getInitials(name, width, height, background) {
            const apiPath = '/avatars/initials';
            const payload = {};
            if (typeof name !== 'undefined') {
                payload['name'] = name;
            }
            if (typeof width !== 'undefined') {
                payload['width'] = width;
            }
            if (typeof height !== 'undefined') {
                payload['height'] = height;
            }
            if (typeof background !== 'undefined') {
                payload['background'] = background;
            }
            const uri = new URL(this.client.config.endpoint + apiPath);
            payload['project'] = this.client.config.project;
            for (const [key, value] of Object.entries(Service.flatten(payload))) {
                uri.searchParams.append(key, value);
            }
            payload['project'] = this.client.config.project;
            for (const [key, value] of Object.entries(Client.flatten(payload))) {
                uri.searchParams.append(key, value);
            }
            return uri.toString();
        }
        /**
         * Get QR code
         *
         * Converts a given plain text to a QR code image. You can use the query parameters to change the size and style of the resulting image.

         *
         * @param {string} text
         * @param {number} size
         * @param {number} margin
         * @param {boolean} download
         * @throws {AppwriteException}
         * @returns {string}
         */
        getQR(text, size, margin, download) {
            if (typeof text === 'undefined') {
                throw new AppwriteException('Missing required parameter: "text"');
            }
            const apiPath = '/avatars/qr';
            const payload = {};
            if (typeof text !== 'undefined') {
                payload['text'] = text;
            }
            if (typeof size !== 'undefined') {
                payload['size'] = size;
            }
            if (typeof margin !== 'undefined') {
                payload['margin'] = margin;
            }
            if (typeof download !== 'undefined') {
                payload['download'] = download;
            }
            const uri = new URL(this.client.config.endpoint + apiPath);
            payload['project'] = this.client.config.project;
            for (const [key, value] of Object.entries(Service.flatten(payload))) {
                uri.searchParams.append(key, value);
            }
            payload['project'] = this.client.config.project;
            for (const [key, value] of Object.entries(Client.flatten(payload))) {
                uri.searchParams.append(key, value);
            }
            return uri.toString();
        }
    }

    class Databases {
        constructor(client) {
            this.client = client;
        }
        /**
         * List documents
         *
         * Get a list of all the user&#039;s documents in a given collection. You can use the query params to filter your results.
         *
         * @param {string} databaseId
         * @param {string} collectionId
         * @param {string[]} queries
         * @throws {AppwriteException}
         * @returns {Promise<Models.DocumentList<Document>>}
         */
        listDocuments(databaseId, collectionId, queries) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof databaseId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "databaseId"');
                }
                if (typeof collectionId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "collectionId"');
                }
                const apiPath = '/databases/{databaseId}/collections/{collectionId}/documents'.replace('{databaseId}', databaseId).replace('{collectionId}', collectionId);
                const payload = {};
                if (typeof queries !== 'undefined') {
                    payload['queries'] = queries;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('get', uri, apiHeaders, payload);
            });
        }
        /**
         * Create document
         *
         * Create a new Document. Before using this route, you should create a new collection resource using either a [server integration](https://appwrite.io/docs/server/databases#databasesCreateCollection) API or directly from your database console.
         *
         * @param {string} databaseId
         * @param {string} collectionId
         * @param {string} documentId
         * @param {Omit<Document, keyof Models.Document>} data
         * @param {string[]} permissions
         * @throws {AppwriteException}
         * @returns {Promise<Document>}
         */
        createDocument(databaseId, collectionId, documentId, data, permissions) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof databaseId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "databaseId"');
                }
                if (typeof collectionId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "collectionId"');
                }
                if (typeof documentId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "documentId"');
                }
                if (typeof data === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "data"');
                }
                const apiPath = '/databases/{databaseId}/collections/{collectionId}/documents'.replace('{databaseId}', databaseId).replace('{collectionId}', collectionId);
                const payload = {};
                if (typeof documentId !== 'undefined') {
                    payload['documentId'] = documentId;
                }
                if (typeof data !== 'undefined') {
                    payload['data'] = data;
                }
                if (typeof permissions !== 'undefined') {
                    payload['permissions'] = permissions;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('post', uri, apiHeaders, payload);
            });
        }
        /**
         * Get document
         *
         * Get a document by its unique ID. This endpoint response returns a JSON object with the document data.
         *
         * @param {string} databaseId
         * @param {string} collectionId
         * @param {string} documentId
         * @param {string[]} queries
         * @throws {AppwriteException}
         * @returns {Promise<Document>}
         */
        getDocument(databaseId, collectionId, documentId, queries) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof databaseId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "databaseId"');
                }
                if (typeof collectionId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "collectionId"');
                }
                if (typeof documentId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "documentId"');
                }
                const apiPath = '/databases/{databaseId}/collections/{collectionId}/documents/{documentId}'.replace('{databaseId}', databaseId).replace('{collectionId}', collectionId).replace('{documentId}', documentId);
                const payload = {};
                if (typeof queries !== 'undefined') {
                    payload['queries'] = queries;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('get', uri, apiHeaders, payload);
            });
        }
        /**
         * Update document
         *
         * Update a document by its unique ID. Using the patch method you can pass only specific fields that will get updated.
         *
         * @param {string} databaseId
         * @param {string} collectionId
         * @param {string} documentId
         * @param {Partial<Omit<Document, keyof Models.Document>>} data
         * @param {string[]} permissions
         * @throws {AppwriteException}
         * @returns {Promise<Document>}
         */
        updateDocument(databaseId, collectionId, documentId, data, permissions) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof databaseId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "databaseId"');
                }
                if (typeof collectionId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "collectionId"');
                }
                if (typeof documentId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "documentId"');
                }
                const apiPath = '/databases/{databaseId}/collections/{collectionId}/documents/{documentId}'.replace('{databaseId}', databaseId).replace('{collectionId}', collectionId).replace('{documentId}', documentId);
                const payload = {};
                if (typeof data !== 'undefined') {
                    payload['data'] = data;
                }
                if (typeof permissions !== 'undefined') {
                    payload['permissions'] = permissions;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('patch', uri, apiHeaders, payload);
            });
        }
        /**
         * Delete document
         *
         * Delete a document by its unique ID.
         *
         * @param {string} databaseId
         * @param {string} collectionId
         * @param {string} documentId
         * @throws {AppwriteException}
         * @returns {Promise<{}>}
         */
        deleteDocument(databaseId, collectionId, documentId) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof databaseId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "databaseId"');
                }
                if (typeof collectionId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "collectionId"');
                }
                if (typeof documentId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "documentId"');
                }
                const apiPath = '/databases/{databaseId}/collections/{collectionId}/documents/{documentId}'.replace('{databaseId}', databaseId).replace('{collectionId}', collectionId).replace('{documentId}', documentId);
                const payload = {};
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('delete', uri, apiHeaders, payload);
            });
        }
    }

    class Functions {
        constructor(client) {
            this.client = client;
        }
        /**
         * List executions
         *
         * Get a list of all the current user function execution logs. You can use the query params to filter your results.
         *
         * @param {string} functionId
         * @param {string[]} queries
         * @param {string} search
         * @throws {AppwriteException}
         * @returns {Promise<Models.ExecutionList>}
         */
        listExecutions(functionId, queries, search) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof functionId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "functionId"');
                }
                const apiPath = '/functions/{functionId}/executions'.replace('{functionId}', functionId);
                const payload = {};
                if (typeof queries !== 'undefined') {
                    payload['queries'] = queries;
                }
                if (typeof search !== 'undefined') {
                    payload['search'] = search;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('get', uri, apiHeaders, payload);
            });
        }
        /**
         * Create execution
         *
         * Trigger a function execution. The returned object will return you the current execution status. You can ping the `Get Execution` endpoint to get updates on the current execution status. Once this endpoint is called, your function execution process will start asynchronously.
         *
         * @param {string} functionId
         * @param {string} body
         * @param {boolean} async
         * @param {string} xpath
         * @param {ExecutionMethod} method
         * @param {object} headers
         * @param {string} scheduledAt
         * @throws {AppwriteException}
         * @returns {Promise<Models.Execution>}
         */
        createExecution(functionId, body, async, xpath, method, headers, scheduledAt) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof functionId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "functionId"');
                }
                const apiPath = '/functions/{functionId}/executions'.replace('{functionId}', functionId);
                const payload = {};
                if (typeof body !== 'undefined') {
                    payload['body'] = body;
                }
                if (typeof async !== 'undefined') {
                    payload['async'] = async;
                }
                if (typeof xpath !== 'undefined') {
                    payload['path'] = xpath;
                }
                if (typeof method !== 'undefined') {
                    payload['method'] = method;
                }
                if (typeof headers !== 'undefined') {
                    payload['headers'] = headers;
                }
                if (typeof scheduledAt !== 'undefined') {
                    payload['scheduledAt'] = scheduledAt;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('post', uri, apiHeaders, payload);
            });
        }
        /**
         * Get execution
         *
         * Get a function execution log by its unique ID.
         *
         * @param {string} functionId
         * @param {string} executionId
         * @throws {AppwriteException}
         * @returns {Promise<Models.Execution>}
         */
        getExecution(functionId, executionId) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof functionId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "functionId"');
                }
                if (typeof executionId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "executionId"');
                }
                const apiPath = '/functions/{functionId}/executions/{executionId}'.replace('{functionId}', functionId).replace('{executionId}', executionId);
                const payload = {};
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('get', uri, apiHeaders, payload);
            });
        }
    }

    class Graphql {
        constructor(client) {
            this.client = client;
        }
        /**
         * GraphQL endpoint
         *
         * Execute a GraphQL mutation.
         *
         * @param {object} query
         * @throws {AppwriteException}
         * @returns {Promise<{}>}
         */
        query(query) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof query === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "query"');
                }
                const apiPath = '/graphql';
                const payload = {};
                if (typeof query !== 'undefined') {
                    payload['query'] = query;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'x-sdk-graphql': 'true',
                    'content-type': 'application/json',
                };
                return yield this.client.call('post', uri, apiHeaders, payload);
            });
        }
        /**
         * GraphQL endpoint
         *
         * Execute a GraphQL mutation.
         *
         * @param {object} query
         * @throws {AppwriteException}
         * @returns {Promise<{}>}
         */
        mutation(query) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof query === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "query"');
                }
                const apiPath = '/graphql/mutation';
                const payload = {};
                if (typeof query !== 'undefined') {
                    payload['query'] = query;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'x-sdk-graphql': 'true',
                    'content-type': 'application/json',
                };
                return yield this.client.call('post', uri, apiHeaders, payload);
            });
        }
    }

    class Locale {
        constructor(client) {
            this.client = client;
        }
        /**
         * Get user locale
         *
         * Get the current user location based on IP. Returns an object with user country code, country name, continent name, continent code, ip address and suggested currency. You can use the locale header to get the data in a supported language.

    ([IP Geolocation by DB-IP](https://db-ip.com))
         *
         * @throws {AppwriteException}
         * @returns {Promise<Models.Locale>}
         */
        get() {
            return __awaiter(this, void 0, void 0, function* () {
                const apiPath = '/locale';
                const payload = {};
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('get', uri, apiHeaders, payload);
            });
        }
        /**
         * List Locale Codes
         *
         * List of all locale codes in [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes).
         *
         * @throws {AppwriteException}
         * @returns {Promise<Models.LocaleCodeList>}
         */
        listCodes() {
            return __awaiter(this, void 0, void 0, function* () {
                const apiPath = '/locale/codes';
                const payload = {};
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('get', uri, apiHeaders, payload);
            });
        }
        /**
         * List continents
         *
         * List of all continents. You can use the locale header to get the data in a supported language.
         *
         * @throws {AppwriteException}
         * @returns {Promise<Models.ContinentList>}
         */
        listContinents() {
            return __awaiter(this, void 0, void 0, function* () {
                const apiPath = '/locale/continents';
                const payload = {};
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('get', uri, apiHeaders, payload);
            });
        }
        /**
         * List countries
         *
         * List of all countries. You can use the locale header to get the data in a supported language.
         *
         * @throws {AppwriteException}
         * @returns {Promise<Models.CountryList>}
         */
        listCountries() {
            return __awaiter(this, void 0, void 0, function* () {
                const apiPath = '/locale/countries';
                const payload = {};
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('get', uri, apiHeaders, payload);
            });
        }
        /**
         * List EU countries
         *
         * List of all countries that are currently members of the EU. You can use the locale header to get the data in a supported language.
         *
         * @throws {AppwriteException}
         * @returns {Promise<Models.CountryList>}
         */
        listCountriesEU() {
            return __awaiter(this, void 0, void 0, function* () {
                const apiPath = '/locale/countries/eu';
                const payload = {};
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('get', uri, apiHeaders, payload);
            });
        }
        /**
         * List countries phone codes
         *
         * List of all countries phone codes. You can use the locale header to get the data in a supported language.
         *
         * @throws {AppwriteException}
         * @returns {Promise<Models.PhoneList>}
         */
        listCountriesPhones() {
            return __awaiter(this, void 0, void 0, function* () {
                const apiPath = '/locale/countries/phones';
                const payload = {};
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('get', uri, apiHeaders, payload);
            });
        }
        /**
         * List currencies
         *
         * List of all currencies, including currency symbol, name, plural, and decimal digits for all major and minor currencies. You can use the locale header to get the data in a supported language.
         *
         * @throws {AppwriteException}
         * @returns {Promise<Models.CurrencyList>}
         */
        listCurrencies() {
            return __awaiter(this, void 0, void 0, function* () {
                const apiPath = '/locale/currencies';
                const payload = {};
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('get', uri, apiHeaders, payload);
            });
        }
        /**
         * List languages
         *
         * List of all languages classified by ISO 639-1 including 2-letter code, name in English, and name in the respective language.
         *
         * @throws {AppwriteException}
         * @returns {Promise<Models.LanguageList>}
         */
        listLanguages() {
            return __awaiter(this, void 0, void 0, function* () {
                const apiPath = '/locale/languages';
                const payload = {};
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('get', uri, apiHeaders, payload);
            });
        }
    }

    class Messaging {
        constructor(client) {
            this.client = client;
        }
        /**
         * Create subscriber
         *
         * Create a new subscriber.
         *
         * @param {string} topicId
         * @param {string} subscriberId
         * @param {string} targetId
         * @throws {AppwriteException}
         * @returns {Promise<Models.Subscriber>}
         */
        createSubscriber(topicId, subscriberId, targetId) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof topicId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "topicId"');
                }
                if (typeof subscriberId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "subscriberId"');
                }
                if (typeof targetId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "targetId"');
                }
                const apiPath = '/messaging/topics/{topicId}/subscribers'.replace('{topicId}', topicId);
                const payload = {};
                if (typeof subscriberId !== 'undefined') {
                    payload['subscriberId'] = subscriberId;
                }
                if (typeof targetId !== 'undefined') {
                    payload['targetId'] = targetId;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('post', uri, apiHeaders, payload);
            });
        }
        /**
         * Delete subscriber
         *
         * Delete a subscriber by its unique ID.
         *
         * @param {string} topicId
         * @param {string} subscriberId
         * @throws {AppwriteException}
         * @returns {Promise<{}>}
         */
        deleteSubscriber(topicId, subscriberId) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof topicId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "topicId"');
                }
                if (typeof subscriberId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "subscriberId"');
                }
                const apiPath = '/messaging/topics/{topicId}/subscribers/{subscriberId}'.replace('{topicId}', topicId).replace('{subscriberId}', subscriberId);
                const payload = {};
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('delete', uri, apiHeaders, payload);
            });
        }
    }

    class Storage {
        constructor(client) {
            this.client = client;
        }
        /**
         * List files
         *
         * Get a list of all the user files. You can use the query params to filter your results.
         *
         * @param {string} bucketId
         * @param {string[]} queries
         * @param {string} search
         * @throws {AppwriteException}
         * @returns {Promise<Models.FileList>}
         */
        listFiles(bucketId, queries, search) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof bucketId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "bucketId"');
                }
                const apiPath = '/storage/buckets/{bucketId}/files'.replace('{bucketId}', bucketId);
                const payload = {};
                if (typeof queries !== 'undefined') {
                    payload['queries'] = queries;
                }
                if (typeof search !== 'undefined') {
                    payload['search'] = search;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('get', uri, apiHeaders, payload);
            });
        }
        /**
         * Create file
         *
         * Create a new file. Before using this route, you should create a new bucket resource using either a [server integration](https://appwrite.io/docs/server/storage#storageCreateBucket) API or directly from your Appwrite console.

    Larger files should be uploaded using multiple requests with the [content-range](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Range) header to send a partial request with a maximum supported chunk of `5MB`. The `content-range` header values should always be in bytes.

    When the first request is sent, the server will return the **File** object, and the subsequent part request must include the file&#039;s **id** in `x-appwrite-id` header to allow the server to know that the partial upload is for the existing file and not for a new one.

    If you&#039;re creating a new file using one of the Appwrite SDKs, all the chunking logic will be managed by the SDK internally.

         *
         * @param {string} bucketId
         * @param {string} fileId
         * @param {File} file
         * @param {string[]} permissions
         * @throws {AppwriteException}
         * @returns {Promise<Models.File>}
         */
        createFile(bucketId, fileId, file, permissions, onProgress = (progress) => { }) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof bucketId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "bucketId"');
                }
                if (typeof fileId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "fileId"');
                }
                if (typeof file === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "file"');
                }
                const apiPath = '/storage/buckets/{bucketId}/files'.replace('{bucketId}', bucketId);
                const payload = {};
                if (typeof fileId !== 'undefined') {
                    payload['fileId'] = fileId;
                }
                if (typeof file !== 'undefined') {
                    payload['file'] = file;
                }
                if (typeof permissions !== 'undefined') {
                    payload['permissions'] = permissions;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'multipart/form-data',
                };
                return yield this.client.chunkedUpload('post', uri, apiHeaders, payload, onProgress);
            });
        }
        /**
         * Get file
         *
         * Get a file by its unique ID. This endpoint response returns a JSON object with the file metadata.
         *
         * @param {string} bucketId
         * @param {string} fileId
         * @throws {AppwriteException}
         * @returns {Promise<Models.File>}
         */
        getFile(bucketId, fileId) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof bucketId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "bucketId"');
                }
                if (typeof fileId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "fileId"');
                }
                const apiPath = '/storage/buckets/{bucketId}/files/{fileId}'.replace('{bucketId}', bucketId).replace('{fileId}', fileId);
                const payload = {};
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('get', uri, apiHeaders, payload);
            });
        }
        /**
         * Update file
         *
         * Update a file by its unique ID. Only users with write permissions have access to update this resource.
         *
         * @param {string} bucketId
         * @param {string} fileId
         * @param {string} name
         * @param {string[]} permissions
         * @throws {AppwriteException}
         * @returns {Promise<Models.File>}
         */
        updateFile(bucketId, fileId, name, permissions) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof bucketId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "bucketId"');
                }
                if (typeof fileId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "fileId"');
                }
                const apiPath = '/storage/buckets/{bucketId}/files/{fileId}'.replace('{bucketId}', bucketId).replace('{fileId}', fileId);
                const payload = {};
                if (typeof name !== 'undefined') {
                    payload['name'] = name;
                }
                if (typeof permissions !== 'undefined') {
                    payload['permissions'] = permissions;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('put', uri, apiHeaders, payload);
            });
        }
        /**
         * Delete File
         *
         * Delete a file by its unique ID. Only users with write permissions have access to delete this resource.
         *
         * @param {string} bucketId
         * @param {string} fileId
         * @throws {AppwriteException}
         * @returns {Promise<{}>}
         */
        deleteFile(bucketId, fileId) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof bucketId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "bucketId"');
                }
                if (typeof fileId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "fileId"');
                }
                const apiPath = '/storage/buckets/{bucketId}/files/{fileId}'.replace('{bucketId}', bucketId).replace('{fileId}', fileId);
                const payload = {};
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('delete', uri, apiHeaders, payload);
            });
        }
        /**
         * Get file for download
         *
         * Get a file content by its unique ID. The endpoint response return with a &#039;Content-Disposition: attachment&#039; header that tells the browser to start downloading the file to user downloads directory.
         *
         * @param {string} bucketId
         * @param {string} fileId
         * @throws {AppwriteException}
         * @returns {string}
         */
        getFileDownload(bucketId, fileId) {
            if (typeof bucketId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "bucketId"');
            }
            if (typeof fileId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "fileId"');
            }
            const apiPath = '/storage/buckets/{bucketId}/files/{fileId}/download'.replace('{bucketId}', bucketId).replace('{fileId}', fileId);
            const payload = {};
            const uri = new URL(this.client.config.endpoint + apiPath);
            payload['project'] = this.client.config.project;
            for (const [key, value] of Object.entries(Service.flatten(payload))) {
                uri.searchParams.append(key, value);
            }
            payload['project'] = this.client.config.project;
            for (const [key, value] of Object.entries(Client.flatten(payload))) {
                uri.searchParams.append(key, value);
            }
            return uri.toString();
        }
        /**
         * Get file preview
         *
         * Get a file preview image. Currently, this method supports preview for image files (jpg, png, and gif), other supported formats, like pdf, docs, slides, and spreadsheets, will return the file icon image. You can also pass query string arguments for cutting and resizing your preview image. Preview is supported only for image files smaller than 10MB.
         *
         * @param {string} bucketId
         * @param {string} fileId
         * @param {number} width
         * @param {number} height
         * @param {ImageGravity} gravity
         * @param {number} quality
         * @param {number} borderWidth
         * @param {string} borderColor
         * @param {number} borderRadius
         * @param {number} opacity
         * @param {number} rotation
         * @param {string} background
         * @param {ImageFormat} output
         * @throws {AppwriteException}
         * @returns {string}
         */
        getFilePreview(bucketId, fileId, width, height, gravity, quality, borderWidth, borderColor, borderRadius, opacity, rotation, background, output) {
            if (typeof bucketId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "bucketId"');
            }
            if (typeof fileId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "fileId"');
            }
            const apiPath = '/storage/buckets/{bucketId}/files/{fileId}/preview'.replace('{bucketId}', bucketId).replace('{fileId}', fileId);
            const payload = {};
            if (typeof width !== 'undefined') {
                payload['width'] = width;
            }
            if (typeof height !== 'undefined') {
                payload['height'] = height;
            }
            if (typeof gravity !== 'undefined') {
                payload['gravity'] = gravity;
            }
            if (typeof quality !== 'undefined') {
                payload['quality'] = quality;
            }
            if (typeof borderWidth !== 'undefined') {
                payload['borderWidth'] = borderWidth;
            }
            if (typeof borderColor !== 'undefined') {
                payload['borderColor'] = borderColor;
            }
            if (typeof borderRadius !== 'undefined') {
                payload['borderRadius'] = borderRadius;
            }
            if (typeof opacity !== 'undefined') {
                payload['opacity'] = opacity;
            }
            if (typeof rotation !== 'undefined') {
                payload['rotation'] = rotation;
            }
            if (typeof background !== 'undefined') {
                payload['background'] = background;
            }
            if (typeof output !== 'undefined') {
                payload['output'] = output;
            }
            const uri = new URL(this.client.config.endpoint + apiPath);
            payload['project'] = this.client.config.project;
            for (const [key, value] of Object.entries(Service.flatten(payload))) {
                uri.searchParams.append(key, value);
            }
            payload['project'] = this.client.config.project;
            for (const [key, value] of Object.entries(Client.flatten(payload))) {
                uri.searchParams.append(key, value);
            }
            return uri.toString();
        }
        /**
         * Get file for view
         *
         * Get a file content by its unique ID. This endpoint is similar to the download method but returns with no  &#039;Content-Disposition: attachment&#039; header.
         *
         * @param {string} bucketId
         * @param {string} fileId
         * @throws {AppwriteException}
         * @returns {string}
         */
        getFileView(bucketId, fileId) {
            if (typeof bucketId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "bucketId"');
            }
            if (typeof fileId === 'undefined') {
                throw new AppwriteException('Missing required parameter: "fileId"');
            }
            const apiPath = '/storage/buckets/{bucketId}/files/{fileId}/view'.replace('{bucketId}', bucketId).replace('{fileId}', fileId);
            const payload = {};
            const uri = new URL(this.client.config.endpoint + apiPath);
            payload['project'] = this.client.config.project;
            for (const [key, value] of Object.entries(Service.flatten(payload))) {
                uri.searchParams.append(key, value);
            }
            payload['project'] = this.client.config.project;
            for (const [key, value] of Object.entries(Client.flatten(payload))) {
                uri.searchParams.append(key, value);
            }
            return uri.toString();
        }
    }

    class Teams {
        constructor(client) {
            this.client = client;
        }
        /**
         * List teams
         *
         * Get a list of all the teams in which the current user is a member. You can use the parameters to filter your results.
         *
         * @param {string[]} queries
         * @param {string} search
         * @throws {AppwriteException}
         * @returns {Promise<Models.TeamList<Preferences>>}
         */
        list(queries, search) {
            return __awaiter(this, void 0, void 0, function* () {
                const apiPath = '/teams';
                const payload = {};
                if (typeof queries !== 'undefined') {
                    payload['queries'] = queries;
                }
                if (typeof search !== 'undefined') {
                    payload['search'] = search;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('get', uri, apiHeaders, payload);
            });
        }
        /**
         * Create team
         *
         * Create a new team. The user who creates the team will automatically be assigned as the owner of the team. Only the users with the owner role can invite new members, add new owners and delete or update the team.
         *
         * @param {string} teamId
         * @param {string} name
         * @param {string[]} roles
         * @throws {AppwriteException}
         * @returns {Promise<Models.Team<Preferences>>}
         */
        create(teamId, name, roles) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof teamId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "teamId"');
                }
                if (typeof name === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "name"');
                }
                const apiPath = '/teams';
                const payload = {};
                if (typeof teamId !== 'undefined') {
                    payload['teamId'] = teamId;
                }
                if (typeof name !== 'undefined') {
                    payload['name'] = name;
                }
                if (typeof roles !== 'undefined') {
                    payload['roles'] = roles;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('post', uri, apiHeaders, payload);
            });
        }
        /**
         * Get team
         *
         * Get a team by its ID. All team members have read access for this resource.
         *
         * @param {string} teamId
         * @throws {AppwriteException}
         * @returns {Promise<Models.Team<Preferences>>}
         */
        get(teamId) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof teamId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "teamId"');
                }
                const apiPath = '/teams/{teamId}'.replace('{teamId}', teamId);
                const payload = {};
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('get', uri, apiHeaders, payload);
            });
        }
        /**
         * Update name
         *
         * Update the team&#039;s name by its unique ID.
         *
         * @param {string} teamId
         * @param {string} name
         * @throws {AppwriteException}
         * @returns {Promise<Models.Team<Preferences>>}
         */
        updateName(teamId, name) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof teamId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "teamId"');
                }
                if (typeof name === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "name"');
                }
                const apiPath = '/teams/{teamId}'.replace('{teamId}', teamId);
                const payload = {};
                if (typeof name !== 'undefined') {
                    payload['name'] = name;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('put', uri, apiHeaders, payload);
            });
        }
        /**
         * Delete team
         *
         * Delete a team using its ID. Only team members with the owner role can delete the team.
         *
         * @param {string} teamId
         * @throws {AppwriteException}
         * @returns {Promise<{}>}
         */
        delete(teamId) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof teamId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "teamId"');
                }
                const apiPath = '/teams/{teamId}'.replace('{teamId}', teamId);
                const payload = {};
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('delete', uri, apiHeaders, payload);
            });
        }
        /**
         * List team memberships
         *
         * Use this endpoint to list a team&#039;s members using the team&#039;s ID. All team members have read access to this endpoint.
         *
         * @param {string} teamId
         * @param {string[]} queries
         * @param {string} search
         * @throws {AppwriteException}
         * @returns {Promise<Models.MembershipList>}
         */
        listMemberships(teamId, queries, search) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof teamId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "teamId"');
                }
                const apiPath = '/teams/{teamId}/memberships'.replace('{teamId}', teamId);
                const payload = {};
                if (typeof queries !== 'undefined') {
                    payload['queries'] = queries;
                }
                if (typeof search !== 'undefined') {
                    payload['search'] = search;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('get', uri, apiHeaders, payload);
            });
        }
        /**
         * Create team membership
         *
         * Invite a new member to join your team. Provide an ID for existing users, or invite unregistered users using an email or phone number. If initiated from a Client SDK, Appwrite will send an email or sms with a link to join the team to the invited user, and an account will be created for them if one doesn&#039;t exist. If initiated from a Server SDK, the new member will be added automatically to the team.

    You only need to provide one of a user ID, email, or phone number. Appwrite will prioritize accepting the user ID &gt; email &gt; phone number if you provide more than one of these parameters.

    Use the `url` parameter to redirect the user from the invitation email to your app. After the user is redirected, use the [Update Team Membership Status](https://appwrite.io/docs/references/cloud/client-web/teams#updateMembershipStatus) endpoint to allow the user to accept the invitation to the team.

    Please note that to avoid a [Redirect Attack](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.md) Appwrite will accept the only redirect URLs under the domains you have added as a platform on the Appwrite Console.

         *
         * @param {string} teamId
         * @param {string[]} roles
         * @param {string} email
         * @param {string} userId
         * @param {string} phone
         * @param {string} url
         * @param {string} name
         * @throws {AppwriteException}
         * @returns {Promise<Models.Membership>}
         */
        createMembership(teamId, roles, email, userId, phone, url, name) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof teamId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "teamId"');
                }
                if (typeof roles === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "roles"');
                }
                const apiPath = '/teams/{teamId}/memberships'.replace('{teamId}', teamId);
                const payload = {};
                if (typeof email !== 'undefined') {
                    payload['email'] = email;
                }
                if (typeof userId !== 'undefined') {
                    payload['userId'] = userId;
                }
                if (typeof phone !== 'undefined') {
                    payload['phone'] = phone;
                }
                if (typeof roles !== 'undefined') {
                    payload['roles'] = roles;
                }
                if (typeof url !== 'undefined') {
                    payload['url'] = url;
                }
                if (typeof name !== 'undefined') {
                    payload['name'] = name;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('post', uri, apiHeaders, payload);
            });
        }
        /**
         * Get team membership
         *
         * Get a team member by the membership unique id. All team members have read access for this resource.
         *
         * @param {string} teamId
         * @param {string} membershipId
         * @throws {AppwriteException}
         * @returns {Promise<Models.Membership>}
         */
        getMembership(teamId, membershipId) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof teamId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "teamId"');
                }
                if (typeof membershipId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "membershipId"');
                }
                const apiPath = '/teams/{teamId}/memberships/{membershipId}'.replace('{teamId}', teamId).replace('{membershipId}', membershipId);
                const payload = {};
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('get', uri, apiHeaders, payload);
            });
        }
        /**
         * Update membership
         *
         * Modify the roles of a team member. Only team members with the owner role have access to this endpoint. Learn more about [roles and permissions](https://appwrite.io/docs/permissions).

         *
         * @param {string} teamId
         * @param {string} membershipId
         * @param {string[]} roles
         * @throws {AppwriteException}
         * @returns {Promise<Models.Membership>}
         */
        updateMembership(teamId, membershipId, roles) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof teamId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "teamId"');
                }
                if (typeof membershipId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "membershipId"');
                }
                if (typeof roles === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "roles"');
                }
                const apiPath = '/teams/{teamId}/memberships/{membershipId}'.replace('{teamId}', teamId).replace('{membershipId}', membershipId);
                const payload = {};
                if (typeof roles !== 'undefined') {
                    payload['roles'] = roles;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('patch', uri, apiHeaders, payload);
            });
        }
        /**
         * Delete team membership
         *
         * This endpoint allows a user to leave a team or for a team owner to delete the membership of any other team member. You can also use this endpoint to delete a user membership even if it is not accepted.
         *
         * @param {string} teamId
         * @param {string} membershipId
         * @throws {AppwriteException}
         * @returns {Promise<{}>}
         */
        deleteMembership(teamId, membershipId) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof teamId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "teamId"');
                }
                if (typeof membershipId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "membershipId"');
                }
                const apiPath = '/teams/{teamId}/memberships/{membershipId}'.replace('{teamId}', teamId).replace('{membershipId}', membershipId);
                const payload = {};
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('delete', uri, apiHeaders, payload);
            });
        }
        /**
         * Update team membership status
         *
         * Use this endpoint to allow a user to accept an invitation to join a team after being redirected back to your app from the invitation email received by the user.

    If the request is successful, a session for the user is automatically created.

         *
         * @param {string} teamId
         * @param {string} membershipId
         * @param {string} userId
         * @param {string} secret
         * @throws {AppwriteException}
         * @returns {Promise<Models.Membership>}
         */
        updateMembershipStatus(teamId, membershipId, userId, secret) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof teamId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "teamId"');
                }
                if (typeof membershipId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "membershipId"');
                }
                if (typeof userId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "userId"');
                }
                if (typeof secret === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "secret"');
                }
                const apiPath = '/teams/{teamId}/memberships/{membershipId}/status'.replace('{teamId}', teamId).replace('{membershipId}', membershipId);
                const payload = {};
                if (typeof userId !== 'undefined') {
                    payload['userId'] = userId;
                }
                if (typeof secret !== 'undefined') {
                    payload['secret'] = secret;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('patch', uri, apiHeaders, payload);
            });
        }
        /**
         * Get team preferences
         *
         * Get the team&#039;s shared preferences by its unique ID. If a preference doesn&#039;t need to be shared by all team members, prefer storing them in [user preferences](https://appwrite.io/docs/references/cloud/client-web/account#getPrefs).
         *
         * @param {string} teamId
         * @throws {AppwriteException}
         * @returns {Promise<Preferences>}
         */
        getPrefs(teamId) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof teamId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "teamId"');
                }
                const apiPath = '/teams/{teamId}/prefs'.replace('{teamId}', teamId);
                const payload = {};
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('get', uri, apiHeaders, payload);
            });
        }
        /**
         * Update preferences
         *
         * Update the team&#039;s preferences by its unique ID. The object you pass is stored as is and replaces any previous value. The maximum allowed prefs size is 64kB and throws an error if exceeded.
         *
         * @param {string} teamId
         * @param {object} prefs
         * @throws {AppwriteException}
         * @returns {Promise<Preferences>}
         */
        updatePrefs(teamId, prefs) {
            return __awaiter(this, void 0, void 0, function* () {
                if (typeof teamId === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "teamId"');
                }
                if (typeof prefs === 'undefined') {
                    throw new AppwriteException('Missing required parameter: "prefs"');
                }
                const apiPath = '/teams/{teamId}/prefs'.replace('{teamId}', teamId);
                const payload = {};
                if (typeof prefs !== 'undefined') {
                    payload['prefs'] = prefs;
                }
                const uri = new URL(this.client.config.endpoint + apiPath);
                const apiHeaders = {
                    'content-type': 'application/json',
                };
                return yield this.client.call('put', uri, apiHeaders, payload);
            });
        }
    }

    /**
     * Helper class to generate permission strings for resources.
     */
    class Permission {
    }
    /**
     * Generate read permission string for the provided role.
     *
     * @param {string} role
     * @returns {string}
     */
    Permission.read = (role) => {
        return `read("${role}")`;
    };
    /**
     * Generate write permission string for the provided role.
     *
     * This is an alias of update, delete, and possibly create.
     * Don't use write in combination with update, delete, or create.
     *
     * @param {string} role
     * @returns {string}
     */
    Permission.write = (role) => {
        return `write("${role}")`;
    };
    /**
     * Generate create permission string for the provided role.
     *
     * @param {string} role
     * @returns {string}
     */
    Permission.create = (role) => {
        return `create("${role}")`;
    };
    /**
     * Generate update permission string for the provided role.
     *
     * @param {string} role
     * @returns {string}
     */
    Permission.update = (role) => {
        return `update("${role}")`;
    };
    /**
     * Generate delete permission string for the provided role.
     *
     * @param {string} role
     * @returns {string}
     */
    Permission.delete = (role) => {
        return `delete("${role}")`;
    };

    /**
     * Helper class to generate role strings for `Permission`.
     */
    class Role {
        /**
         * Grants access to anyone.
         *
         * This includes authenticated and unauthenticated users.
         *
         * @returns {string}
         */
        static any() {
            return 'any';
        }
        /**
         * Grants access to a specific user by user ID.
         *
         * You can optionally pass verified or unverified for
         * `status` to target specific types of users.
         *
         * @param {string} id
         * @param {string} status
         * @returns {string}
         */
        static user(id, status = '') {
            if (status === '') {
                return `user:${id}`;
            }
            return `user:${id}/${status}`;
        }
        /**
         * Grants access to any authenticated or anonymous user.
         *
         * You can optionally pass verified or unverified for
         * `status` to target specific types of users.
         *
         * @param {string} status
         * @returns {string}
         */
        static users(status = '') {
            if (status === '') {
                return 'users';
            }
            return `users/${status}`;
        }
        /**
         * Grants access to any guest user without a session.
         *
         * Authenticated users don't have access to this role.
         *
         * @returns {string}
         */
        static guests() {
            return 'guests';
        }
        /**
         * Grants access to a team by team ID.
         *
         * You can optionally pass a role for `role` to target
         * team members with the specified role.
         *
         * @param {string} id
         * @param {string} role
         * @returns {string}
         */
        static team(id, role = '') {
            if (role === '') {
                return `team:${id}`;
            }
            return `team:${id}/${role}`;
        }
        /**
         * Grants access to a specific member of a team.
         *
         * When the member is removed from the team, they will
         * no longer have access.
         *
         * @param {string} id
         * @returns {string}
         */
        static member(id) {
            return `member:${id}`;
        }
        /**
         * Grants access to a user with the specified label.
         *
         * @param {string} name
         * @returns  {string}
         */
        static label(name) {
            return `label:${name}`;
        }
    }

    var _a, _ID_hexTimestamp;
    /**
     * Helper class to generate ID strings for resources.
     */
    class ID {
        /**
         * Uses the provided ID as the ID for the resource.
         *
         * @param {string} id
         * @returns {string}
         */
        static custom(id) {
            return id;
        }
        /**
         * Have Appwrite generate a unique ID for you.
         *
         * @param {number} padding. Default is 7.
         * @returns {string}
         */
        static unique(padding = 7) {
            // Generate a unique ID with padding to have a longer ID
            const baseId = __classPrivateFieldGet(ID, _a, "m", _ID_hexTimestamp).call(ID);
            let randomPadding = '';
            for (let i = 0; i < padding; i++) {
                const randomHexDigit = Math.floor(Math.random() * 16).toString(16);
                randomPadding += randomHexDigit;
            }
            return baseId + randomPadding;
        }
    }
    _a = ID, _ID_hexTimestamp = function _ID_hexTimestamp() {
        const now = new Date();
        const sec = Math.floor(now.getTime() / 1000);
        const msec = now.getMilliseconds();
        // Convert to hexadecimal
        const hexTimestamp = sec.toString(16) + msec.toString(16).padStart(5, '0');
        return hexTimestamp;
    };

    exports.AuthenticatorType = void 0;
    (function (AuthenticatorType) {
        AuthenticatorType["Totp"] = "totp";
    })(exports.AuthenticatorType || (exports.AuthenticatorType = {}));

    exports.AuthenticationFactor = void 0;
    (function (AuthenticationFactor) {
        AuthenticationFactor["Email"] = "email";
        AuthenticationFactor["Phone"] = "phone";
        AuthenticationFactor["Totp"] = "totp";
        AuthenticationFactor["Recoverycode"] = "recoverycode";
    })(exports.AuthenticationFactor || (exports.AuthenticationFactor = {}));

    exports.OAuthProvider = void 0;
    (function (OAuthProvider) {
        OAuthProvider["Amazon"] = "amazon";
        OAuthProvider["Apple"] = "apple";
        OAuthProvider["Auth0"] = "auth0";
        OAuthProvider["Authentik"] = "authentik";
        OAuthProvider["Autodesk"] = "autodesk";
        OAuthProvider["Bitbucket"] = "bitbucket";
        OAuthProvider["Bitly"] = "bitly";
        OAuthProvider["Box"] = "box";
        OAuthProvider["Dailymotion"] = "dailymotion";
        OAuthProvider["Discord"] = "discord";
        OAuthProvider["Disqus"] = "disqus";
        OAuthProvider["Dropbox"] = "dropbox";
        OAuthProvider["Etsy"] = "etsy";
        OAuthProvider["Facebook"] = "facebook";
        OAuthProvider["Github"] = "github";
        OAuthProvider["Gitlab"] = "gitlab";
        OAuthProvider["Google"] = "google";
        OAuthProvider["Linkedin"] = "linkedin";
        OAuthProvider["Microsoft"] = "microsoft";
        OAuthProvider["Notion"] = "notion";
        OAuthProvider["Oidc"] = "oidc";
        OAuthProvider["Okta"] = "okta";
        OAuthProvider["Paypal"] = "paypal";
        OAuthProvider["PaypalSandbox"] = "paypalSandbox";
        OAuthProvider["Podio"] = "podio";
        OAuthProvider["Salesforce"] = "salesforce";
        OAuthProvider["Slack"] = "slack";
        OAuthProvider["Spotify"] = "spotify";
        OAuthProvider["Stripe"] = "stripe";
        OAuthProvider["Tradeshift"] = "tradeshift";
        OAuthProvider["TradeshiftBox"] = "tradeshiftBox";
        OAuthProvider["Twitch"] = "twitch";
        OAuthProvider["Wordpress"] = "wordpress";
        OAuthProvider["Yahoo"] = "yahoo";
        OAuthProvider["Yammer"] = "yammer";
        OAuthProvider["Yandex"] = "yandex";
        OAuthProvider["Zoho"] = "zoho";
        OAuthProvider["Zoom"] = "zoom";
        OAuthProvider["Mock"] = "mock";
    })(exports.OAuthProvider || (exports.OAuthProvider = {}));

    exports.Browser = void 0;
    (function (Browser) {
        Browser["AvantBrowser"] = "aa";
        Browser["AndroidWebViewBeta"] = "an";
        Browser["GoogleChrome"] = "ch";
        Browser["GoogleChromeIOS"] = "ci";
        Browser["GoogleChromeMobile"] = "cm";
        Browser["Chromium"] = "cr";
        Browser["MozillaFirefox"] = "ff";
        Browser["Safari"] = "sf";
        Browser["MobileSafari"] = "mf";
        Browser["MicrosoftEdge"] = "ps";
        Browser["MicrosoftEdgeIOS"] = "oi";
        Browser["OperaMini"] = "om";
        Browser["Opera"] = "op";
        Browser["OperaNext"] = "on";
    })(exports.Browser || (exports.Browser = {}));

    exports.CreditCard = void 0;
    (function (CreditCard) {
        CreditCard["AmericanExpress"] = "amex";
        CreditCard["Argencard"] = "argencard";
        CreditCard["Cabal"] = "cabal";
        CreditCard["Cencosud"] = "cencosud";
        CreditCard["DinersClub"] = "diners";
        CreditCard["Discover"] = "discover";
        CreditCard["Elo"] = "elo";
        CreditCard["Hipercard"] = "hipercard";
        CreditCard["JCB"] = "jcb";
        CreditCard["Mastercard"] = "mastercard";
        CreditCard["Naranja"] = "naranja";
        CreditCard["TarjetaShopping"] = "targeta-shopping";
        CreditCard["UnionChinaPay"] = "union-china-pay";
        CreditCard["Visa"] = "visa";
        CreditCard["MIR"] = "mir";
        CreditCard["Maestro"] = "maestro";
    })(exports.CreditCard || (exports.CreditCard = {}));

    exports.Flag = void 0;
    (function (Flag) {
        Flag["Afghanistan"] = "af";
        Flag["Angola"] = "ao";
        Flag["Albania"] = "al";
        Flag["Andorra"] = "ad";
        Flag["UnitedArabEmirates"] = "ae";
        Flag["Argentina"] = "ar";
        Flag["Armenia"] = "am";
        Flag["AntiguaAndBarbuda"] = "ag";
        Flag["Australia"] = "au";
        Flag["Austria"] = "at";
        Flag["Azerbaijan"] = "az";
        Flag["Burundi"] = "bi";
        Flag["Belgium"] = "be";
        Flag["Benin"] = "bj";
        Flag["BurkinaFaso"] = "bf";
        Flag["Bangladesh"] = "bd";
        Flag["Bulgaria"] = "bg";
        Flag["Bahrain"] = "bh";
        Flag["Bahamas"] = "bs";
        Flag["BosniaAndHerzegovina"] = "ba";
        Flag["Belarus"] = "by";
        Flag["Belize"] = "bz";
        Flag["Bolivia"] = "bo";
        Flag["Brazil"] = "br";
        Flag["Barbados"] = "bb";
        Flag["BruneiDarussalam"] = "bn";
        Flag["Bhutan"] = "bt";
        Flag["Botswana"] = "bw";
        Flag["CentralAfricanRepublic"] = "cf";
        Flag["Canada"] = "ca";
        Flag["Switzerland"] = "ch";
        Flag["Chile"] = "cl";
        Flag["China"] = "cn";
        Flag["CoteDIvoire"] = "ci";
        Flag["Cameroon"] = "cm";
        Flag["DemocraticRepublicOfTheCongo"] = "cd";
        Flag["RepublicOfTheCongo"] = "cg";
        Flag["Colombia"] = "co";
        Flag["Comoros"] = "km";
        Flag["CapeVerde"] = "cv";
        Flag["CostaRica"] = "cr";
        Flag["Cuba"] = "cu";
        Flag["Cyprus"] = "cy";
        Flag["CzechRepublic"] = "cz";
        Flag["Germany"] = "de";
        Flag["Djibouti"] = "dj";
        Flag["Dominica"] = "dm";
        Flag["Denmark"] = "dk";
        Flag["DominicanRepublic"] = "do";
        Flag["Algeria"] = "dz";
        Flag["Ecuador"] = "ec";
        Flag["Egypt"] = "eg";
        Flag["Eritrea"] = "er";
        Flag["Spain"] = "es";
        Flag["Estonia"] = "ee";
        Flag["Ethiopia"] = "et";
        Flag["Finland"] = "fi";
        Flag["Fiji"] = "fj";
        Flag["France"] = "fr";
        Flag["MicronesiaFederatedStatesOf"] = "fm";
        Flag["Gabon"] = "ga";
        Flag["UnitedKingdom"] = "gb";
        Flag["Georgia"] = "ge";
        Flag["Ghana"] = "gh";
        Flag["Guinea"] = "gn";
        Flag["Gambia"] = "gm";
        Flag["GuineaBissau"] = "gw";
        Flag["EquatorialGuinea"] = "gq";
        Flag["Greece"] = "gr";
        Flag["Grenada"] = "gd";
        Flag["Guatemala"] = "gt";
        Flag["Guyana"] = "gy";
        Flag["Honduras"] = "hn";
        Flag["Croatia"] = "hr";
        Flag["Haiti"] = "ht";
        Flag["Hungary"] = "hu";
        Flag["Indonesia"] = "id";
        Flag["India"] = "in";
        Flag["Ireland"] = "ie";
        Flag["IranIslamicRepublicOf"] = "ir";
        Flag["Iraq"] = "iq";
        Flag["Iceland"] = "is";
        Flag["Israel"] = "il";
        Flag["Italy"] = "it";
        Flag["Jamaica"] = "jm";
        Flag["Jordan"] = "jo";
        Flag["Japan"] = "jp";
        Flag["Kazakhstan"] = "kz";
        Flag["Kenya"] = "ke";
        Flag["Kyrgyzstan"] = "kg";
        Flag["Cambodia"] = "kh";
        Flag["Kiribati"] = "ki";
        Flag["SaintKittsAndNevis"] = "kn";
        Flag["SouthKorea"] = "kr";
        Flag["Kuwait"] = "kw";
        Flag["LaoPeopleSDemocraticRepublic"] = "la";
        Flag["Lebanon"] = "lb";
        Flag["Liberia"] = "lr";
        Flag["Libya"] = "ly";
        Flag["SaintLucia"] = "lc";
        Flag["Liechtenstein"] = "li";
        Flag["SriLanka"] = "lk";
        Flag["Lesotho"] = "ls";
        Flag["Lithuania"] = "lt";
        Flag["Luxembourg"] = "lu";
        Flag["Latvia"] = "lv";
        Flag["Morocco"] = "ma";
        Flag["Monaco"] = "mc";
        Flag["Moldova"] = "md";
        Flag["Madagascar"] = "mg";
        Flag["Maldives"] = "mv";
        Flag["Mexico"] = "mx";
        Flag["MarshallIslands"] = "mh";
        Flag["NorthMacedonia"] = "mk";
        Flag["Mali"] = "ml";
        Flag["Malta"] = "mt";
        Flag["Myanmar"] = "mm";
        Flag["Montenegro"] = "me";
        Flag["Mongolia"] = "mn";
        Flag["Mozambique"] = "mz";
        Flag["Mauritania"] = "mr";
        Flag["Mauritius"] = "mu";
        Flag["Malawi"] = "mw";
        Flag["Malaysia"] = "my";
        Flag["Namibia"] = "na";
        Flag["Niger"] = "ne";
        Flag["Nigeria"] = "ng";
        Flag["Nicaragua"] = "ni";
        Flag["Netherlands"] = "nl";
        Flag["Norway"] = "no";
        Flag["Nepal"] = "np";
        Flag["Nauru"] = "nr";
        Flag["NewZealand"] = "nz";
        Flag["Oman"] = "om";
        Flag["Pakistan"] = "pk";
        Flag["Panama"] = "pa";
        Flag["Peru"] = "pe";
        Flag["Philippines"] = "ph";
        Flag["Palau"] = "pw";
        Flag["PapuaNewGuinea"] = "pg";
        Flag["Poland"] = "pl";
        Flag["FrenchPolynesia"] = "pf";
        Flag["NorthKorea"] = "kp";
        Flag["Portugal"] = "pt";
        Flag["Paraguay"] = "py";
        Flag["Qatar"] = "qa";
        Flag["Romania"] = "ro";
        Flag["Russia"] = "ru";
        Flag["Rwanda"] = "rw";
        Flag["SaudiArabia"] = "sa";
        Flag["Sudan"] = "sd";
        Flag["Senegal"] = "sn";
        Flag["Singapore"] = "sg";
        Flag["SolomonIslands"] = "sb";
        Flag["SierraLeone"] = "sl";
        Flag["ElSalvador"] = "sv";
        Flag["SanMarino"] = "sm";
        Flag["Somalia"] = "so";
        Flag["Serbia"] = "rs";
        Flag["SouthSudan"] = "ss";
        Flag["SaoTomeAndPrincipe"] = "st";
        Flag["Suriname"] = "sr";
        Flag["Slovakia"] = "sk";
        Flag["Slovenia"] = "si";
        Flag["Sweden"] = "se";
        Flag["Eswatini"] = "sz";
        Flag["Seychelles"] = "sc";
        Flag["Syria"] = "sy";
        Flag["Chad"] = "td";
        Flag["Togo"] = "tg";
        Flag["Thailand"] = "th";
        Flag["Tajikistan"] = "tj";
        Flag["Turkmenistan"] = "tm";
        Flag["TimorLeste"] = "tl";
        Flag["Tonga"] = "to";
        Flag["TrinidadAndTobago"] = "tt";
        Flag["Tunisia"] = "tn";
        Flag["Turkey"] = "tr";
        Flag["Tuvalu"] = "tv";
        Flag["Tanzania"] = "tz";
        Flag["Uganda"] = "ug";
        Flag["Ukraine"] = "ua";
        Flag["Uruguay"] = "uy";
        Flag["UnitedStates"] = "us";
        Flag["Uzbekistan"] = "uz";
        Flag["VaticanCity"] = "va";
        Flag["SaintVincentAndTheGrenadines"] = "vc";
        Flag["Venezuela"] = "ve";
        Flag["Vietnam"] = "vn";
        Flag["Vanuatu"] = "vu";
        Flag["Samoa"] = "ws";
        Flag["Yemen"] = "ye";
        Flag["SouthAfrica"] = "za";
        Flag["Zambia"] = "zm";
        Flag["Zimbabwe"] = "zw";
    })(exports.Flag || (exports.Flag = {}));

    exports.ExecutionMethod = void 0;
    (function (ExecutionMethod) {
        ExecutionMethod["GET"] = "GET";
        ExecutionMethod["POST"] = "POST";
        ExecutionMethod["PUT"] = "PUT";
        ExecutionMethod["PATCH"] = "PATCH";
        ExecutionMethod["DELETE"] = "DELETE";
        ExecutionMethod["OPTIONS"] = "OPTIONS";
    })(exports.ExecutionMethod || (exports.ExecutionMethod = {}));

    exports.ImageGravity = void 0;
    (function (ImageGravity) {
        ImageGravity["Center"] = "center";
        ImageGravity["Topleft"] = "top-left";
        ImageGravity["Top"] = "top";
        ImageGravity["Topright"] = "top-right";
        ImageGravity["Left"] = "left";
        ImageGravity["Right"] = "right";
        ImageGravity["Bottomleft"] = "bottom-left";
        ImageGravity["Bottom"] = "bottom";
        ImageGravity["Bottomright"] = "bottom-right";
    })(exports.ImageGravity || (exports.ImageGravity = {}));

    exports.ImageFormat = void 0;
    (function (ImageFormat) {
        ImageFormat["Jpg"] = "jpg";
        ImageFormat["Jpeg"] = "jpeg";
        ImageFormat["Gif"] = "gif";
        ImageFormat["Png"] = "png";
        ImageFormat["Webp"] = "webp";
    })(exports.ImageFormat || (exports.ImageFormat = {}));

    exports.Account = Account;
    exports.AppwriteException = AppwriteException;
    exports.Avatars = Avatars;
    exports.Client = Client;
    exports.Databases = Databases;
    exports.Functions = Functions;
    exports.Graphql = Graphql;
    exports.ID = ID;
    exports.Locale = Locale;
    exports.Messaging = Messaging;
    exports.Permission = Permission;
    exports.Query = Query;
    exports.Role = Role;
    exports.Storage = Storage;
    exports.Teams = Teams;

    Object.defineProperty(exports, '__esModule', { value: true });

})(this.Appwrite = this.Appwrite || {});
