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
  Item,
  Input,
  Text,
  Toast,
  View,
} from 'native-base';
import { createInvite } from '../api';
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
    this.state = {
      invitees: [
        {
          id: '',
        },
      ],
    };
  }

  _theaterSelected(theater) {
    this.setState({
      theater,
      movieShowtime: null,
    });
  }

  _movieShowtimeSelected(movieShowtime) {
    this.setState({ movieShowtime });
  }

  _handleInviteeChange(index, input) {
    // Update list of invitees when text inputs are changed
    let invitees = this.state.invitees.slice();
    invitees[index] = { id: input };
    this.setState({ invitees });
  }

  _handleInviteeSubmit(index, event) {
    // Ensure there's always an empty invitee input
    let invitees = this.state.invitees.slice();
    if (invitees[invitees.length - 1].id !== '') {
      invitees.push({ id: '' });
      this.setState({ invitees });
    }
  }

  _handleSendInvite() {
    // Strip off the empty invitee if there is one
    let invitees = this.state.invitees.slice();
    if (invitees[invitees.length - 1].id === '') {
      invitees.pop();
    }

    // Prepare payload
    let payload = {
      theater: this.state.theater,
      movie: this.state.movieShowtime.movie,
      showtime: this.state.movieShowtime.showtime,
      invitees: invitees,
    };

    // Send it!
    createInvite(payload)
      .then(() => {
        Toast.show({
          text: 'Invite sent!',
          position: 'bottom',
          buttonText: 'Okay',
        });
        this.props.navigation.goBack();
      })
      .catch(error => {
        alert('Error sending invite: ' + JSON.stringify(error));
      });
  }

  _canSendInvite() {
    return (
      this.state.theater &&
      this.state.movieShowtime &&
      this.state.invitees[0].id
    );
  }

  render() {
    return (
      <Container>
        <Content style={styles.content}>
          <Card>
            <CardItem header bordered>
              <Icon name="pin" /><Text>THEATER</Text>
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
                <For each="invitee" index="idx" of={this.state.invitees}>
                  <Item underline key={idx}>
                    <Input
                      placeholder="Enter an email address"
                      onChangeText={this._handleInviteeChange.bind(this, idx)}
                      onSubmitEditing={this._handleInviteeSubmit.bind(
                        this,
                        idx
                      )}
                    />
                  </Item>
                </For>
              </Body>
            </CardItem>
          </Card>

          <View style={styles.buttonContainer}>
            <Button
              block
              primary
              disabled={!this._canSendInvite()}
              onPress={this._handleSendInvite.bind(this)}
            >
              <Text>Send Invite</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}
