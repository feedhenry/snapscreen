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
    // TODO: This is kind of nasty, look at
    // https://github.com/react-community/react-navigation/issues/935 for
    // workarounds
    this.invite = this.props.navigation.state.params.invite;
  }
  _buildMapURI() {
    let lat = this.invite.theater.lat;
    let long = this.invite.theater.long;
    let name = encodeURIComponent(this.invite.theater.name);
    return Platform.select({
      ios: `http://maps.apple.com/?ll=${lat},${long}&q=${name}`,
      android: `http://maps.google.com/maps?ll=${lat},${long}&q=${name}`,
    });
  }
  _handleLocationClick() {
    let uri = this._buildMapURI();
    console.log(uri);
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
          <View style={styles.buttonContainer}>
            <Grid>
              <Col>
                <Button block success style={styles.acceptButton}>
                  <Text>Accept</Text>
                </Button>
              </Col>
              <Col>
                <Button block danger style={styles.declineButton}>
                  <Text>Decline</Text>
                </Button>
              </Col>
            </Grid>
          </View>

          <Card style={styles.movieCard}>
            <CardItem header>
              <Body>
                <H3 style={styles.movieTitle}>{this.invite.movie.title}</H3>
                <View style={styles.row}>
                  <View style={styles.headerIcon}>
                    <Icon name="calendar" style={styles.showtimeText} />
                  </View>
                  <Text style={styles.showtimeText}>
                    {formatShowtime(this.invite.showtime.time)}
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
                      {this.invite.theater.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              </Body>
            </CardItem>
            <CardItem cardBody>
              <Image
                source={{ uri: this.invite.movie.backdrop }}
                style={styles.backdrop}
              />
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  <Text style={styles.detailLabel}>Synopsis: </Text>
                  {this.invite.movie.synopsis}
                </Text>
                <Text>
                  <Text style={styles.detailLabel}>Runtime: </Text>
                  {this.invite.movie.runtime} min
                </Text>
                <Text>
                  <Text style={styles.detailLabel}>Rating: </Text>
                  {this.invite.movie.rating * 100}%
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
                {this.invite.organizer.name} (organizer)
              </Text>
            </ListItem>
            <For each="invitee" index="idx" of={this.invite.invitees}>
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
                <Text>{this.invite.notes}</Text>
              </Body>
            </CardItem>
          </Card>

        </Content>
      </Container>
    );
  }
}
