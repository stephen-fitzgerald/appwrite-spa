// @ts-check
/* jshint esversion: 6 */

/** @typedef {{
    $id: string,
    $createdAt: string,
    $updatedAt: string,
    name: string,
    password: string,
    hash: string,
    hashOptions: object,
    registration: string,
    status: boolean,
    labels: [],
    passwordUpdate: string,
    email: string,
    phone: string,
    emailVerification: boolean,
    phoneVerification: boolean,
    mfa: boolean,
    prefs: object,
    targets: [],
    accessedAt: string
}} User */

import {
    Account, AppwriteException, AuthenticationFactor, AuthenticatorType, Avatars, Browser,
    Client, CreditCard, Databases, ExecutionMethod, Flag, Functions, Graphql,
    ID, ImageFormat, ImageGravity, Locale, Messaging, OAuthProvider,
    Permission, Query, Role, Storage, Teams
} from '../lib/appwrite.16.1.0-sdk.mjs';

const APPWRITE_PROJECT_ID = "6442cef9badf08d71295";
const APPWRITE_API_ENDPOINT = "https://cloud.appwrite.io/v1";

// cache these for future use
let _client;
let _account;

export async function getClient() {
    if (_client == undefined) {
        // only one instance of Client should be created per app
        _client = new Client();
        _client
            .setEndpoint(APPWRITE_API_ENDPOINT)
            .setProject(APPWRITE_PROJECT_ID);
        // console.log(_client);
    }
    return _client;
}

export async function getAccount() {
    if (_account == undefined) {
        _client = await getClient();
        _account = new Account(_client);
        // console.log(_account);
    }
    return _account;
}

/**
 * Log in with email and password, if not already logged in.
 * @export
 * @async
 * @param {string} email 
 * @param {string} pwd 
 * @returns {Promise<User>} User - the currently logged in user.
 */
export async function loginWithEmailAndPassword(email, pwd) {
    let user;
    let session;
    let noExistingSession = true;
    const account = await getAccount();
    try {
        user = await account.get();
        noExistingSession = false;
    } catch (err) {
        // No user session found, continue.
    }

    if (noExistingSession) {
        try {
            session = await account.createEmailPasswordSession(email, pwd);
            user = await account.get();
        } catch (err) {
            // Failed to create session
            console.error(err);
            throw new Error;
        }
    }
    return user;
}

export async function logOut() {
    let ret = false;
    let account;
    try {
        account = await getAccount();
        let dummy = await account.deleteSession('current');
        ret = true;
    } catch (err) {
        // No user session found.
        console.error("Delete current session threw an error.");
    }
    return ret;
}


/**
 * Description placeholder
 *
 * @export
 * @async
 * @returns {Promise<User>} User 
 */
export async function getLoggedInUser() {
    const account = await getAccount();
    let user;
    try {
        user = await account.get();
    } catch (err) {
        // No user session found.
        // console.info("Get logged in user threw an error.");
    }
    return user;
}