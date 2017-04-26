let mockInviteData = [
  {
    title: 'Going in Style',
    synopsis: 'Desperate to pay the bills and come through for their loved ones, three lifelong pals risk it all by embarking on a daring bid to knock off the very bank that absconded with their money.',
    showtime: '2017-04-22T21:40:00.000Z',
    location: {
      name: 'Landmark Kendall Square',
      lat: '42.367819',
      long: '-71.090022',
      address: 'One Kendall Square, 355 Binney St, Cambridge, MA 02139, USA',
    },
    runtime: '96',
    rating: 0.47,
    thumbnail: 'https://image.tmdb.org/t/p/original/cCpgyKtvKf0OkpeXvc7JxuOiRJp.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/uARnuPezr7eZkOsHj2ujFQz6EKE.jpg',
    myStatus: 'accepted',
    organizer: {
      name: 'Peter Darrow',
    },
    notes: "I'm really looking forward to seeing this! Let's grab a bite to eat afterward.",
    invitees: [
      {
        name: 'Summers Pittman',
        status: 'accepted',
      },
      {
        name: 'Emilio Rodriguez',
        status: 'declined',
      },
      {
        name: 'Damien Murphy',
        status: 'unanswered',
      },
    ],
  },
  {
    title: 'Logan',
    synopsis: "In the near future, a weary Logan cares for an ailing Professor X in a hide out on the Mexican border. But Logan's attempts to hide from the world and his legacy are up-ended when a young mutant arrives, being pursued by dark forces.",
    myStatus: 'accepted',
    showtime: '2017-04-23T22:50:00.000Z',
    location: {
      name: 'Regal Cinemas Fenway 13 & RPX',
      lat: '42.344793',
      long: '-71.098176',
      address: '201 Brookline Ave, Boston, MA 02215, USA',
    },
    runtime: '141',
    rating: 0.92,
    thumbnail: 'https://image.tmdb.org/t/p/original/5dn8jT3ii2i5xP1EBah6g9kdUKJ.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/sHMZggbeZc4HwBgeu1BO0ISwet1.jpg',
    organizer: {
      name: 'Summers Pittman',
    },
    notes: "Hey all, feel free to suggest a different time if this doesn't work for you.",
    invitees: [
      {
        name: 'Peter Darrow',
        status: 'accepted',
      },
      {
        name: 'Emilio Rodriguez',
        status: 'declined',
      },
      {
        name: 'Damien Murphy',
        status: 'unanswered',
      },
    ],
  },
  {
    title: 'Beauty and the Beast',
    synopsis: "A live-action adaptation of Disney's version of the classic 'Beauty and the Beast' tale of a cursed prince and a beautiful young woman who helps him break the spell.",
    myStatus: 'declined',
    showtime: '2017-04-26T22:30:00.000Z',
    location: {
      name: 'AMC Loews Boston Common 19',
      lat: '42.353290',
      long: '-71.061698',
      address: '175 Tremont St, Boston, MA 02111, USA',
    },
    runtime: '129',
    rating: 0.71,
    thumbnail: 'https://image.tmdb.org/t/p/original/8LdkswnaKrZbySdxdkoZCB5QDto.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/6aUWe0GSl69wMTSWWexsorMIvwU.jpg',
    organizer: {
      name: 'Peter Darrow',
    },
    notes: "I'm really looking forward to seeing this! Let's grab a bite to eat afterward.",
    invitees: [
      {
        name: 'Summers Pittman',
        status: 'accepted',
      },
      {
        name: 'Emilio Rodriguez',
        status: 'declined',
      },
      {
        name: 'Damien Murphy',
        status: 'unanswered',
      },
    ],
  },
  {
    title: 'The Boss Baby',
    synopsis: "A story about how a new baby's arrival impacts a family, told from the point of view of a delightfully unreliable narrator, a wildly imaginative 7 year old named Tim.",
    myStatus: 'unanswered',
    showtime: '2017-04-29T23:45:00.000Z',
    location: {
      name: 'Landmark Kendall Square',
      lat: '42.367819',
      long: '-71.090022',
      address: 'One Kendall Square, 355 Binney St, Cambridge, MA 02139, USA',
    },
    runtime: '97',
    rating: 0.53,
    thumbnail: 'https://image.tmdb.org/t/p/original/vkvPL8Lef9grxx6tyrojrjaaAw4.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/bTFeSwh07oX99ofpDI4O2WkiFJ.jpg',
    organizer: {
      name: 'Peter Darrow',
    },
    notes: "I'm really looking forward to seeing this! Let's grab a bite to eat afterward.",
    invitees: [
      {
        name: 'Summers Pittman',
        status: 'accepted',
      },
      {
        name: 'Emilio Rodriguez',
        status: 'declined',
      },
      {
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

function getInvites() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(mockInviteData);
      // Simulate data being changed
      mockInviteData = mockInviteData.slice(-2);
    }, 1000);
  });
}

function getTheaters(lat, long) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(mockTheaterData);
    }, 1000);
  });
}

export { getInvites, getTheaters };
