import React from 'react';
import { ActivityIndicator, Image, FlatList } from 'react-native';
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
    this.state = {};
    this.theaterID = this.props.navigation.state.params.theaterID;
    this.onSelect = this.props.navigation.state.params.onSelect;

    // Initialize list with movies showing today
    getMovieShowtimes(this.theaterID, Moment().utc().format())
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
    if (this.state.movieShowtimes) {
      return (
        <Container>
          <Content style={styles.content}>
            <FlatList
              data={this.state.movieShowtimes}
              renderItem={this._renderRow.bind(this)}
            />
          </Content>
        </Container>
      );
    } else {
      return (
        <Container>
          <Content>
            <ActivityIndicator
              animating={this.state.animating}
              style={[styles.centering, { height: 80 }]}
              size="large"
            />
          </Content>
        </Container>
      );
    }
  }
}
