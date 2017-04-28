import Config from 'react-native-config';
import Login from 'react-native-login';

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
    let newHeaders = Object.assign(headers, {
      Authorization: `Bearer ${(await Login.tokens()).access_token}`,
    });
    return newHeaders;
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
}
