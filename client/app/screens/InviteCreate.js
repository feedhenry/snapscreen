import React from 'react';
import { Image } from 'react-native';
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
    };
  }
  _theaterSelected(theater) {
    this.setState({ theater });
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
                <Button
                  rounded
                  light
                  small
                  onPress={() =>
                    this.props.navigation.navigate('SelectMovieShowtime', {
                      onSelect: this._theaterSelected.bind(this),
                    })}
                >
                  <Text>Change</Text>
                </Button>
              </Body>
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
