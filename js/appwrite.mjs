// @ts-check
/* jshint esversion: 6 */


const APPWRITE_PROJECT_ID = "6442cef9badf08d71295";
const APPWRITE_API_ENDPOINT = "https://cloud.appwrite.io/v1";

let _Appwrite = undefined;
let _client = undefined;
let _account = undefined;

export async function getAppwrite() {
    if (_Appwrite == undefined) {
        // Support access via `import` 
        const script = await fetch('./js/sdk.js');
        const scriptText = await script.text();
        _Appwrite = Function(`${scriptText}; return Appwrite;`)();
        // Support Appwrite access via global object 
        Object.defineProperty(window, 'Appwrite', { value: _Appwrite });
        console.log(_Appwrite);
    }
    return _Appwrite;
}

export async function getClient() {
    if (_client == undefined) {
        // only one instance of Client should be created per app
        const Appwrite = await getAppwrite();
        _client = new Appwrite.Client();
        _client
            .setEndpoint(APPWRITE_API_ENDPOINT)
            .setProject(APPWRITE_PROJECT_ID);
        console.log(_client);
    }
    return _client;
}

export async function getAccount() {
    if (_account == undefined) {
        _Appwrite = await getAppwrite();
        _client = await getClient();
        _account = new _Appwrite.Account(_client);
        console.log(_account);
    }
    return _account;
}

/**
 * Log in with email and password, if required.
 * @export
 * @async
 * @param {string} email 
 * @param {string} pwd 
 * @returns {Promise<any>} User - the currently logged in user.
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
        //await account.get();
        account = await getAccount();
        let dummy = await account.deleteSession('current');
        ret = true;
    } catch (err) {
        // No user session found.
        console.error("Delete current session threw an error.");
    }
    return ret;
}

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