import React from 'react';
import { Image } from 'react-native';
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

  movieCard: {
    marginTop: 10,
  },
  title: {
    paddingTop: 15,
  },
  backdrop: {
    flex: 1,
    height: 200,
  },
  sectionTitle: {
    fontWeight: 'bold',
  },

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
            <CardItem style={styles.title}>
              <Body>
                <H3>{this.invite.title}</H3>
                <Text>{formatShowtime(this.invite.showtime)}</Text>
              </Body>
            </CardItem>
            <CardItem cardBody>
              <Image
                source={{ uri: this.invite.backdrop }}
                style={styles.backdrop}
              />
            </CardItem>
            <CardItem>
              <Body>
                <Text style={styles.sectionTitle}>Synopsis</Text>
                <Text>{this.invite.synopsis}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  <Text style={styles.sectionTitle}>Runtime: </Text>
                  {this.invite.runtime} min
                </Text>
                <Text>
                  <Text style={styles.sectionTitle}>Rating: </Text>
                  {this.invite.rating * 100}%
                </Text>
              </Body>
            </CardItem>
          </Card>

          <Card>
            <ListItem itemHeader first>
              <Text style={styles.sectionTitle}>INVITED</Text>
            </ListItem>
            <ListItem>
              <Icon name="checkmark-circle" style={styles.accepted} />
              <Text style={styles.invitee}>
                {this.invite.organizer.name} (organizer)
              </Text>
            </ListItem>
            <For each="invitee" of={this.invite.invitees}>
              <ListItem>
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

        </Content>
      </Container>
    );
  }
}
