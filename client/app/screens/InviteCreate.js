import React from 'react';
import { Image, Picker } from 'react-native';
import {
  Body,
  Card,
  CardItem,
  Container,
  Content,
  Button,
  Icon,
  Text,
  View,
} from 'native-base';
import { formatShowtime } from '../utils';

const styles = {
  content: {
    marginVertical: 10,
    marginHorizontal: 8,
  },
  buttonContainer: {
    marginTop: 8,
    marginHorizontal: 2,
  },
  h4: {
    fontSize: 18,
    lineHeight: 24,
  },
  small: {
    fontSize: 14,
  },
};

export default class InviteCreateScreen extends React.Component {
  static navigationOptions = {
    title: 'Create Invite',
  };
  constructor(props) {
    super(props);
    // XXX: Just for testing, remove when complete
    this.state = {
      theater: {
        id: 'lks',
        name: 'Landmark Kendall Square',
        lat: '42.367819',
        long: '-71.090022',
        address: 'One Kendall Square, 355 Binney St, Cambridge, MA 02139, USA',
      },
      movieShowtime: {
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
          id: 'fas',
          time: '2017-04-28T22:30:00.000Z',
        },
      },
    };
  }
  _theaterSelected(theater) {
    this.setState({ theater });
  }
  _movieShowtimeSelected(movieShowtime) {
    console.log(movieShowtime);
    this.setState({ movieShowtime });
  }
  render() {
    return (
      <Container>
        <Content style={styles.content}>
          <Card>
            <CardItem header bordered>
              <Icon name="pin" /><Text>THEATRE</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text style={styles.h4}>{this.state.theater.name}</Text>
                <Text style={styles.small}>{this.state.theater.address}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Button
                rounded
                light
                small
                onPress={() =>
                  this.props.navigation.navigate('SelectTheater', {
                    onSelect: this._theaterSelected.bind(this),
                  })}
              >
                <Text>Change</Text>
              </Button>
            </CardItem>
          </Card>

          <Card>
            <CardItem header bordered>
              <Icon name="clock" />
              <Text>MOVIE & SHOWTIME</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text style={styles.h4}>
                  {this.state.movieShowtime.movie.title}
                </Text>
                <Text style={styles.small}>
                  {formatShowtime(this.state.movieShowtime.showtime.time)}
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Button
                rounded
                light
                small
                onPress={() =>
                  this.props.navigation.navigate('SelectMovieShowtime', {
                    theaterID: this.state.theater.id,
                    onSelect: this._movieShowtimeSelected.bind(this),
                  })}
              >
                <Text>Change</Text>
              </Button>
            </CardItem>
          </Card>

          <Card>
            <CardItem header bordered>
              <Icon name="people" />
              <Text>INVITED</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Button rounded light small><Text>Change</Text></Button>
              </Body>
            </CardItem>
          </Card>

          <View style={styles.buttonContainer}>
            <Button block primary><Text>Send Invite</Text></Button>
          </View>
        </Content>
      </Container>
    );
  }
}
