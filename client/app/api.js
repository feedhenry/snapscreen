import axios from 'axios';
import Config from 'react-native-config';
import Login from 'react-native-login';

var api = axios.create({
  baseURL: Config.API_URL,
});

async function getHeaders() {
  let tokens = await Login.tokens();
  return { Authorization: `Bearer ${tokens.access_token}` };
}

/**
 * Create a new invite and notify invitees.
 *
 * @param {object} invite Invite to be created. Will look like one of the
 * objects defined in `mockInviteData`.
 * @returns {Promise} Does not need to return anything when resolved.
 */
async function createInvite(invite) {
  return api
    .post('/invites', invite, { headers: await getHeaders() })
    .then(response => {
      return response.data;
    });
}

/**
 * Update an invite. Will be called when the current user accepts or declines
 * an invite.
 *
 * @param {object} invite Updated invite. Will look like one of the
 * objects defined in `mockInviteData`.
 * @returns {Promise} Does not need to return anything when resolved.
 */
async function updateInvite(invite) {
  return api
    .patch(`/invites/${invite._id}`, invite, { headers: await getHeaders() })
    .then(response => {
      return response.data;
    });
}

/**
 * Get the list of invites that the current user is organizing or invited to.
 *
 * @returns {Promise} Should return an array that looks like `mockInviteData`
 * when resolved.
 */
async function getInvites() {
  let headers = await getHeaders();
  return api.get('/invites', { headers }).then(response => {
    return response.data;
  });
}

/**
 * Get the theaters nearby a set of coordinates.
 *
 * @param {number} lat Latitude.
 * @param {number} long Longitude.
 * @returns {Promise} Should return an array that looks like `mockTheaterData`
 * when resolved.
 */
async function getTheaters(lat, long) {
  return api
    .get('/cinemas', {
      params: { lat, lng: long },
      headers: await getHeaders(),
    })
    .then(response => {
      var cinemas = response.data;
      cinemas.forEach(function(cinema) {
        cinema.address = cinema.location.address.display_text;
        cinema.lat = cinema.location.lat;
        cinema.long = cinema.location.lon;
      }, this);
      return cinemas;
    });
}

/**
 * Get the movies and showtimes for a given theater on a given day.
 *
 * @param {String} theaterID A unique identifier for a theater.
 * @param {String} date An ISO-8601 formatted date to get showtimes for.
 * @returns {Promise} Should return an array that looks like
 * `mockMovieShowtimeData` when resolved.
 */
async function getMovieShowtimes(theaterID, date) {
  return api
    .get('/movies', {
      params: { cinema_id: theaterID, date: date },
      headers: await getHeaders(),
    })
    .then(response => {
      return response.data;
    });
}

export {
  createInvite,
  updateInvite,
  getInvites,
  getTheaters,
  getMovieShowtimes,
};
