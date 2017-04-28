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
    this.state = {};
  }
  _theaterSelected(theater) {
    this.setState({
      theater,
      movieShowtime: null
    });
  }
  _movieShowtimeSelected(movieShowtime) {
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
            <If condition={this.state.theater}>
              <CardItem>
                <Body>
                  <Text style={styles.h4}>{this.state.theater.name}</Text>
                  <Text style={styles.small}>{this.state.theater.address}</Text>
                </Body>
              </CardItem>
            </If>
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
                <Text>Select a theater</Text>
              </Button>
            </CardItem>
          </Card>

          <Card>
            <CardItem header bordered>
              <Icon name="clock" />
              <Text>MOVIE & SHOWTIME</Text>
            </CardItem>
            <If condition={this.state.movieShowtime}>
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
            </If>
            <CardItem>
              <Button
                rounded
                light
                small
                disabled={!this.state.theater}
                onPress={() =>
                  this.props.navigation.navigate('SelectMovieShowtime', {
                    theaterID: this.state.theater.id,
                    onSelect: this._movieShowtimeSelected.bind(this),
                  })}
              >
                <Text>Select a movie & showtime</Text>
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
