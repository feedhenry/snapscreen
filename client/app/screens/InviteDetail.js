import React from 'react';
import { Image, Linking, Platform, TouchableOpacity } from 'react-native';
import {
  Body,
  Button,
  Card,
  CardItem,
  Col,
  Container,
  Content,
  Grid,
  H3,
  Icon,
  ListItem,
  Row,
  Text,
  variables,
  View,
} from 'native-base';
import { updateInvite } from '../api';
import { formatShowtime } from '../utils';

const styles = {
  // General
  content: {
    marginVertical: 10,
    marginHorizontal: 8,
  },
  buttonContainer: {
    marginHorizontal: 2,
  },
  acceptButton: {
    marginRight: 5,
  },
  declineButton: {
    marginLeft: 5,
  },
  h4: {
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center'
  },

  // Movie card
  movieCard: {
    marginTop: 10,
  },
  movieTitle: {
    lineHeight: 26,
  },
  row: {
    flexDirection: 'row',
  },
  headerIcon: {
    width: 14,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  showtimeText: {
    fontSize: 16,
  },
  theaterLink: {
    fontSize: 16,
    fontWeight: 'bold',
    color: variables.brandInfo,
  },
  backdrop: {
    flex: 1,
    height: 180,
  },
  detailLabel: {
    fontWeight: 'bold',
  },

  // Invited card
  accepted: {
    color: variables.brandSuccess,
  },
  declined: {
    color: variables.brandDanger,
  },
  unanswered: {
    color: 'gray',
  },
  invitee: {
    paddingLeft: 10,
  },
};

export default class InviteDetailScreen extends React.Component {
  static navigationOptions = {
    title: 'Invite Detail',
  };

  constructor(props) {
    super(props);
    this.state = {
      // TODO: This is kind of nasty, look at
      // https://github.com/react-community/react-navigation/issues/935 for
      // workarounds
      invite: this.props.navigation.state.params.invite,
      currentUserID: this.props.navigation.state.params.currentUserID,
    };
  }

  _currentUserStatus() {
    return this.state.invite.invitees.find(
      user => user.id === this.state.currentUserID
    ).status;
  }

  _handleStatusClick(status) {
    let index = this.state.invite.invitees.findIndex(
      user => user.id === this.state.currentUserID
    );
    // TODO: Find a better way to update state without having to deep clone
    // https://facebook.github.io/react/docs/update.html maybe!
    var newState = JSON.parse(JSON.stringify(this.state));
    newState.invite.invitees[index].status = status;

    updateInvite(newState.invite)
      .then(() => this.setState(newState))
      .catch(error => {
        alert('Error updating invite: ' + JSON.stringify(error));
      });
  }

  _buildMapURI() {
    let lat = this.state.invite.theater.lat;
    let long = this.state.invite.theater.long;
    let name = encodeURIComponent(this.state.invite.theater.name);
    return Platform.select({
      ios: `http://maps.apple.com/?ll=${lat},${long}&q=${name}`,
      android: `http://maps.google.com/maps?ll=${lat},${long}&q=${name}`,
    });
  }

  _handleLocationClick() {
    let uri = this._buildMapURI();
    Linking.canOpenURL(uri).then(supported => {
      if (supported) {
        Linking.openURL(uri);
      } else {
        console.log('Unable to open map with URI:' + uri);
      }
    });
  }

  render() {
    return (
      <Container>
        <Content style={styles.content}>
          <If
            condition={
              this.state.invite.organizer.id !== this.state.currentUserID
            }
          >
            <Choose>
              <When condition={this._currentUserStatus() === 'unanswered'}>
                <View style={styles.buttonContainer}>
                  <Grid>
                    <Col>
                      <Button
                        block
                        success
                        style={styles.acceptButton}
                        onPress={this._handleStatusClick.bind(this, 'accepted')}
                      >
                        <Text>Accept</Text>
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        block
                        danger
                        style={styles.declineButton}
                        onPress={this._handleStatusClick.bind(this, 'declined')}
                      >
                        <Text>Decline</Text>
                      </Button>
                    </Col>
                  </Grid>
                </View>
              </When>
              <Otherwise>
                <Text style={{ ...styles.h4 }}>
                  You {this._currentUserStatus()} this invite.
                </Text>
              </Otherwise>
            </Choose>
          </If>

          <Card style={styles.movieCard}>
            <CardItem header>
              <Body>
                <H3 style={styles.movieTitle}>
                  {this.state.invite.movie.title}
                </H3>
                <View style={styles.row}>
                  <View style={styles.headerIcon}>
                    <Icon name="calendar" style={styles.showtimeText} />
                  </View>
                  <Text style={styles.showtimeText}>
                    {formatShowtime(this.state.invite.showtime.time)}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={this._handleLocationClick.bind(this)}
                >
                  <View style={styles.row}>
                    <View style={styles.headerIcon}>
                      <Icon name="pin" style={styles.theaterLink} active />
                    </View>
                    <Text style={styles.theaterLink}>
                      {this.state.invite.theater.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              </Body>
            </CardItem>
            <CardItem cardBody>
              <Image
                source={{ uri: this.state.invite.movie.backdrop }}
                style={styles.backdrop}
              />
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  <Text style={styles.detailLabel}>Synopsis: </Text>
                  {this.state.invite.movie.synopsis}
                </Text>
                <Text>
                  <Text style={styles.detailLabel}>Runtime: </Text>
                  {this.state.invite.movie.runtime} min
                </Text>
                <Text>
                  <Text style={styles.detailLabel}>Rating: </Text>
                  {this.state.invite.movie.rating * 100}%
                </Text>
              </Body>
            </CardItem>
          </Card>

          <Card>
            <CardItem header bordered>
              <Text>INVITED</Text>
            </CardItem>
            <ListItem>
              <Icon name="checkmark-circle" style={styles.accepted} />
              <Text style={styles.invitee}>
                {this.state.invite.organizer.name} (organizer)
              </Text>
            </ListItem>
            <For each="invitee" index="idx" of={this.state.invite.invitees}>
              <ListItem key={idx}>
                <Choose>
                  <When condition={invitee.status == 'accepted'}>
                    <Icon name="checkmark-circle" style={styles.accepted} />
                  </When>
                  <When condition={invitee.status == 'declined'}>
                    <Icon name="close-circle" style={styles.declined} />
                  </When>
                  <Otherwise>
                    <Icon name="help-circle" />
                  </Otherwise>
                </Choose>
                <Text style={styles.invitee}>{invitee.name}</Text>
              </ListItem>
            </For>
          </Card>

          <Card>
            <CardItem header bordered>
              <Text>NOTES</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>{this.state.invite.notes}</Text>
              </Body>
            </CardItem>
          </Card>

        </Content>
      </Container>
    );
  }
}
