import HttpClient from './HttpClient';

let mockInviteData = [
  {
    theater: {
      id: 'lks',
      name: 'Landmark Kendall Square',
      lat: '42.367819',
      long: '-71.090022',
      address: 'One Kendall Square, 355 Binney St, Cambridge, MA 02139, USA',
    },
    movie: {
      id: 'gis',
      title: 'Going in Style',
      synopsis: 'Desperate to pay the bills and come through for their loved ones, three lifelong pals risk it all by embarking on a daring bid to knock off the very bank that absconded with their money.',
      runtime: '96',
      rating: 0.47,
      thumbnail: 'https://image.tmdb.org/t/p/original/cCpgyKtvKf0OkpeXvc7JxuOiRJp.jpg',
      backdrop: 'https://image.tmdb.org/t/p/original/uARnuPezr7eZkOsHj2ujFQz6EKE.jpg',
    },
    showtime: {
      id: 'asg',
      time: '2017-04-22T21:40:00.000Z',
    },
    organizer: {
      id: 'pdarrow@example.com',
      name: 'Peter Darrow',
    },
    notes: "I'm really looking forward to seeing this! Let's grab a bite to eat afterward.",
    invitees: [
      {
        id: 'spittman@example.com',
        name: 'Summers Pittman',
        status: 'accepted',
      },
      {
        id: 'erodriguez@example.com',
        name: 'Emilio Rodriguez',
        status: 'declined',
      },
      {
        id: 'dmurphy@example.com',
        name: 'Damien Murphy',
        status: 'unanswered',
      },
    ],
  },
  {
    theater: {
      id: 'rcf',
      name: 'Regal Cinemas Fenway 13 & RPX',
      lat: '42.344793',
      long: '-71.098176',
      address: '201 Brookline Ave, Boston, MA 02215, USA',
    },
    movie: {
      id: 'lgn',
      title: 'Logan',
      synopsis: "In the near future, a weary Logan cares for an ailing Professor X in a hide out on the Mexican border. But Logan's attempts to hide from the world and his legacy are up-ended when a young mutant arrives, being pursued by dark forces.",
      runtime: '141',
      rating: 0.92,
      thumbnail: 'https://image.tmdb.org/t/p/original/5dn8jT3ii2i5xP1EBah6g9kdUKJ.jpg',
      backdrop: 'https://image.tmdb.org/t/p/original/sHMZggbeZc4HwBgeu1BO0ISwet1.jpg',
    },
    showtime: {
      id: 'hka',
      time: '2017-04-23T22:50:00.000Z',
    },
    organizer: {
      id: 'spittman@example.com',
      name: 'Summers Pittman',
    },
    notes: "Hey all, feel free to suggest a different time if this doesn't work for you.",
    invitees: [
      {
        id: 'pdarrow@example.com',
        name: 'Peter Darrow',
        status: 'accepted',
      },
      {
        id: 'erodriguez@example.com',
        name: 'Emilio Rodriguez',
        status: 'declined',
      },
      {
        id: 'dmurphy@example.com',
        name: 'Damien Murphy',
        status: 'unanswered',
      },
    ],
  },
  {
    movie: {
      id: 'batb',
      title: 'Beauty and the Beast',
      synopsis: "A live-action adaptation of Disney's version of the classic 'Beauty and the Beast' tale of a cursed prince and a beautiful young woman who helps him break the spell.",
      runtime: '129',
      rating: 0.71,
      thumbnail: 'https://image.tmdb.org/t/p/original/8LdkswnaKrZbySdxdkoZCB5QDto.jpg',
      backdrop: 'https://image.tmdb.org/t/p/original/6aUWe0GSl69wMTSWWexsorMIvwU.jpg',
    },
    theater: {
      id: 'albc',
      name: 'AMC Loews Boston Common 19',
      lat: '42.353290',
      long: '-71.061698',
      address: '175 Tremont St, Boston, MA 02111, USA',
    },
    showtime: {
      id: 'hja',
      time: '2017-04-26T22:30:00.000Z',
    },
    organizer: {
      id: 'pdarrow@example.com',
      name: 'Peter Darrow',
    },
    notes: "I'm really looking forward to seeing this! Let's grab a bite to eat afterward.",
    invitees: [
      {
        id: 'spittman@example.com',
        name: 'Summers Pittman',
        status: 'accepted',
      },
      {
        id: 'erodriguez@example.com',
        name: 'Emilio Rodriguez',
        status: 'declined',
      },
      {
        id: 'damienm@example.com',
        name: 'Damien Murphy',
        status: 'unanswered',
      },
    ],
  },
  {
    movie: {
      id: 'tbb',
      title: 'The Boss Baby',
      synopsis: "A story about how a new baby's arrival impacts a family, told from the point of view of a delightfully unreliable narrator, a wildly imaginative 7 year old named Tim.",
      runtime: '97',
      rating: 0.53,
      thumbnail: 'https://image.tmdb.org/t/p/original/vkvPL8Lef9grxx6tyrojrjaaAw4.jpg',
      backdrop: 'https://image.tmdb.org/t/p/original/bTFeSwh07oX99ofpDI4O2WkiFJ.jpg',
    },
    theater: {
      id: 'lks',
      name: 'Landmark Kendall Square',
      lat: '42.367819',
      long: '-71.090022',
      address: 'One Kendall Square, 355 Binney St, Cambridge, MA 02139, USA',
    },
    showtime: {
      id: 'dja',
      time: '2017-04-29T23:45:00.000Z',
    },
    organizer: {
      id: 'spittman@example.com',
      name: 'Summers Pittman',
    },
    notes: "I'm really looking forward to seeing this! Let's grab a bite to eat afterward.",
    invitees: [
      {
        id: 'pdarrow@example.com',
        name: 'Peter Darrow',
        status: 'declined',
      },
      {
        id: 'erodriguez@example.com',
        name: 'Emilio Rodriguez',
        status: 'declined',
      },
      {
        id: 'dmurphy@example.com',
        name: 'Damien Murphy',
        status: 'unanswered',
      },
    ],
  },
];

let mockTheaterData = [
  {
    id: 'lks',
    name: 'Landmark Kendall Square',
    lat: '42.367819',
    long: '-71.090022',
    address: 'One Kendall Square, 355 Binney St, Cambridge, MA 02139, USA',
  },
  {
    id: 'rcf',
    name: 'Regal Cinemas Fenway 13 & RPX',
    lat: '42.344793',
    long: '-71.098176',
    address: '201 Brookline Ave, Boston, MA 02215, USA',
  },
  {
    id: 'albc',
    name: 'AMC Loews Boston Common 19',
    lat: '42.353290',
    long: '-71.061698',
    address: '175 Tremont St, Boston, MA 02111, USA',
  },
];

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
    .catch(err => {
      console.log(err);
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
  return HttpClient.patch('invites', invite.id, invite)
    .then(invite => {
      return invite;
    })
    .catch(err => {
      console.log(err);
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
    .catch(err => {
      console.log(err);
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
async function getTheaters(lat, lng) {
  return HttpClient.get('cinemas', { lat, lng })
    .then(cinemas => {
      cinemas.forEach(function(cinema) {
        cinema.address = cinema.location.address.display_text;
        cinema.lat = cinema.location.lat;
        cinema.long = cinema.location.lon;
      }, this);
      return cinemas;
    })
    .catch(err => {
      console.log(err);
    });
}

/**
 * Get the movies and showtimes for a given theatre on a given day.
 *
 * @param {String} theaterID A unique idenitifer for a theater.
 * @param {String} date An ISO-8601 formatted date to get showtimes for.
 * @returns {Promise} Should return an array that looks like
 * `mockMovieShowtimeData` when resolved.
 */
//TODO: handle dates
async function getMovieShowtimes(theaterId, date) {
  if (!theaterId) return;

  return HttpClient.get('movies', { cinema_id: theaterId })
    .then(movies => {
      return movies;
    })
    .catch(err => {
      console.log(err);
    });
}

export {
  createInvite,
  updateInvite,
  getInvites,
  getTheaters,
  getMovieShowtimes,
};
