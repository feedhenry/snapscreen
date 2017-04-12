let mockInviteData = [
  {
    title: 'Going in Style',
    status: 'accepted',
    showtime: '2017-04-22T21:40:00.000Z',
    thumbnail: 'https://image.tmdb.org/t/p/original/cCpgyKtvKf0OkpeXvc7JxuOiRJp.jpg',
  }, {
    title: 'Logan',
    status: 'accepted',
    showtime: '2017-04-23T22:50:00.000Z',
    thumbnail: 'https://image.tmdb.org/t/p/original/5dn8jT3ii2i5xP1EBah6g9kdUKJ.jpg',
  }, {
    title: 'Beauty and the Beast',
    status: 'declined',
    showtime: '2017-04-26T22:30:00.000Z',
    thumbnail: 'https://image.tmdb.org/t/p/original/8LdkswnaKrZbySdxdkoZCB5QDto.jpg',
  }, {
    title: 'The Boss Baby',
    status: 'unanswered',
    showtime: '2017-04-29T23:45:00.000Z',
    thumbnail: 'https://image.tmdb.org/t/p/original/vkvPL8Lef9grxx6tyrojrjaaAw4.jpg',
  }
];

function getInvites() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(mockInviteData);
      // Simulate data being changed
      mockInviteData = mockInviteData.slice(-2)
    }, 1000)
  })
}

export { getInvites };