import React from 'react';
import { ActivityIndicator, Image, FlatList, Picker } from 'react-native';
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Icon,
  ListItem,
  Right,
  Text,
  View,
} from 'native-base';
import Moment from 'moment';
import { getMovieShowtimes } from '../api';

const styles = {
  content: {
    marginVertical: 10,
    marginHorizontal: 8,
  },
  thumbnail: {
    width: 60,
    height: 90,
  },
  showtimeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  showtimeButton: {
    marginTop: 6,
    marginLeft: 12,
    paddingLeft: 10,
    paddingRight: 10,
  },
};

export default class SelectMovieShowtimeScreen extends React.Component {
  static navigationOptions = {
    title: 'Select a showtime',
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedDate: Moment().utc().startOf('day').format(),
    };
    this.theaterID = this.props.navigation.state.params.theaterID;
    this.onSelect = this.props.navigation.state.params.onSelect;

    // Initialize list with movies showing today
    getMovieShowtimes(this.theaterID, this.state.selectedDate)
      .then(movieShowtimes => {
        this.setState({ movieShowtimes });
      })
      .catch(error => {
        alert('Error getting movie showtimes: ' + JSON.stringify(error));
      });
  }

  _handleDateChange(date) {
    this.setState({
      selectedDate: date,
      movieShowtimes: null,
    });
    getMovieShowtimes(this.theaterID, this.state.selectedDate)
      .then(movieShowtimes => {
        this.setState({ movieShowtimes });
      })
      .catch(error => {
        alert('Error getting movie showtimes: ' + JSON.stringify(error));
      });
  }

  _handleShowtimeClick(movie, showtime) {
    this.onSelect({ movie, showtime });
    this.props.navigation.goBack();
  }

  _getDatesList() {
    // Get an array of the next 7 days, suitable for displaying in a picker
    let dates = [];
    let day = Moment();
    for (let i = 0; i < 7; i++) {
      dates.push({
        label: day.format('dddd, MMMM D'),
        value: day.utc().startOf('day').format(),
      });
      day.add(1, 'days');
    }
    return dates;
  }

  _renderRow({ item }) {
    return (
      <ListItem>
        <Image
          source={{ uri: item.movie.thumbnail }}
          style={styles.thumbnail}
        />
        <Body>
          <Text>{item.movie.title}</Text>
          <Text note>Runtime: {item.movie.runtime} min</Text>
          <Text note>Rating: {item.movie.rating * 100}%</Text>
          <View style={styles.showtimeRow}>
            <For each="showtime" index="idx" of={item.showtimes}>
              <Button
                rounded
                small
                light
                key={idx}
                style={styles.showtimeButton}
                onPress={this._handleShowtimeClick.bind(
                  this,
                  item.movie,
                  showtime
                )}
              >
                <Text>{Moment(showtime.time).format('h:mm a')}</Text>
              </Button>
            </For>
          </View>
        </Body>
      </ListItem>
    );
  }

  render() {
    return (
      <Container>
        <Content style={styles.content}>
          <Picker
            selectedValue={this.state.selectedDate}
            onValueChange={this._handleDateChange.bind(this)}
          >
            <For each="date" index="idx" of={this._getDatesList()}>
              <Picker.Item
                label={date.label}
                value={date.value}
                key={date.value}
              />
            </For>
          </Picker>

          <Choose>
            <When condition={this.state.movieShowtimes}>
              <FlatList
                data={this.state.movieShowtimes}
                renderItem={this._renderRow.bind(this)}
              />
            </When>
            <Otherwise>
              <ActivityIndicator
                animating={this.state.animating}
                style={[styles.centering, { height: 80 }]}
                size="large"
              />
            </Otherwise>
          </Choose>
        </Content>
      </Container>
    );
  }
}
