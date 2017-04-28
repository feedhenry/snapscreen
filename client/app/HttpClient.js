// import Config from 'react-native-config';
import Login from 'react-native-login';

//TODO: remove in favour of react-native-config
const Config = { API_URL: 'http://snapscreen-server-snapscreen.74.207.224.48.xip.io' }

export default class HTTPClient {
    constructor() {}

    /**
     * Wraps a Request, runs it, and performs some basical validation on the response.
     * 
     * @returns Promise that resolves to the body of the response.
     */
    static _call(request) {
        return fetch(`${Config.API_URL}/${request.path}`, {
            method: request.method,
            headers: request.headers,
            body: request.body
        }).then(response => {
            if (response.status >= 200 && response.status < 300) {
                return Promise.resolve(response.json());
            } else {
                return Promise.reject(response);
            }
        });
    }

    /**
     * Attaches the default header to a headers parameter.  
     * The headers parameter is not modified.
     * 
     * @param headers : the headers to combine with the default Header.
     * @returns A new object with the full set of headers.
     */
    static async _defaultHeaders(headers = {}) {
        //TODO: add Barer token
        // let newHeaders = Object.assign(headers, {
        //   Authorization: `Bearer ${(await Login.tokens()).access_token}`,
        // });
        // return newHeaders;

        return headers;
    }

    static _buildQuery(params) {
        if (params) {
            return (
                '?' +
                Object.keys(params)
                .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                .join('&')
            );
        } else {
            return '';
        }
    }

    /**
     * Perform a get method and add the appropriate headers.
     * @param path : The path to get.  Required.
     * @param query : the query parameters to append to the URL
     * @param headers : extra headers to be included.  
     * @returns a Promise the resolves the body of the response
     */
    static async get(path, query = {}, headers = {}) {
        let fullHeaders = Object.assign(headers, await this._defaultHeaders());

        let request = {
            method: 'GET',
            path: path + this._buildQuery(query),
            headers: fullHeaders,
        };
        return this._call(request);
    }

    /**
     * Perform a post method with the body and the appropriate headers.
     * @param path : The path to post.  Required.
     * @param body : the body of the request as an object
     * @param headers : extra headers to be included.  
     * @returns a Promise the resolves the body of the response
     */
    static async post(path, body = {}, headers = {}) {
        let fullHeaders = Object.assign(headers, await this._defaultHeaders());
        fullHeaders.Accept = 'application/json';
        fullHeaders['Content-Type'] = 'application/x-www-form-urlencoded';

        let formBody = [];
        for (var property in body) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(body[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        let request = {
            method: 'POST',
            path: path,
            headers: fullHeaders,
            body: formBody
        };
        return this._call(request);
    }

    /**
     * Perform a patch method with the body and the appropriate headers.
     * @param path : The path to get.  Required.
     * @param body : the body of the request as an object
     * @param headers : extra headers to be included.  
     * @returns a Promise the resolves the body of the response
     */
    static async patch(path, id, body = {}, headers = {}) {
        let fullHeaders = Object.assign(headers, await this._defaultHeaders());
        fullHeaders.Accept = 'application/json';
        fullHeaders['Content-Type'] = 'application/x-www-form-urlencoded';

        let formBody = [];
        for (var property in body) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(body[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        let request = {
            method: 'PATCH',
            path: path + '/' + id,
            headers: fullHeaders,
            body: formBody
        };
        return this._call(request);
    }
}
