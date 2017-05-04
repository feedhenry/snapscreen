import HttpClient from './HttpClient';


/**
 * Create a new invite and notify invitees.
 *
 * @param {object} invite Invite to be created. Will look like one of the
 * objects defined in `mockInviteData`.
 * @returns {Promise} Does not need to return anything when resolved.
 */
async function createInvite(invite) {
  return HttpClient.post('invites', invite)
    .then(invite => {
      return invite;
    })
    .catch(error => {
      console.log(error);
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
  return HttpClient.patch('invites', invite._id, invite)
    .then(invite => {
      return invite;
    })
    .catch(error => {
      console.log(error);
    });
}

/**
 * Get the list of invites that the current user is organizing or invited to.
 *
 * @returns {Promise} Should return an array that looks like `mockInviteData`
 * when resolved.
 */
async function getInvites() {
  return HttpClient.get('invites')
    .then(invites => {
      return invites;
    })
    .catch(error => {
      console.log(error);
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
  return HttpClient.get('cinemas', { lat, lng: long })
    .then(cinemas => {
      cinemas.forEach(function(cinema) {
        cinema.address = cinema.location.address.display_text;
        cinema.lat = cinema.location.lat;
        cinema.long = cinema.location.lon;
      }, this);
      return cinemas;
    })
    .catch(error => {
      console.log(error);
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
  return HttpClient.get('movies', {
    cinema_id: theaterID,
    date: date,
  })
    .then(movies => {
      return movies;
    })
    .catch(error => {
      console.log(error);
    });
}

export {
  createInvite,
  updateInvite,
  getInvites,
  getTheaters,
  getMovieShowtimes,
};
