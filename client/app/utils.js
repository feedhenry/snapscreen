import Moment from 'moment';

function formatShowtime(showtime) {
  return Moment(showtime).format('dddd, MMMM D @ h:mm a');
}

export { formatShowtime };
