import React from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
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
} from 'native-base';
import haversine from 'haversine';
import { getTheaters } from '../api';

const styles = {
  content: {
    marginVertical: 10,
    marginHorizontal: 8,
  },
};

export default class SelectTheaterScreen extends React.Component {
  static navigationOptions = {
    title: 'Select nearby movie theater',
  };
  constructor(props) {
    super(props);
    this.state = {};
    this.onSelect = this.props.navigation.state.params.onSelect;

    // Get current location & nearby theaters
    // TODO: Not really sure if doing this in the constructor is best practice?
    navigator.geolocation.getCurrentPosition(
      position => {
        this.currentPosition = position.coords;
        getTheaters(position.coords.longitude, position.coords.latitude)
          .then(theaters => {
            this.setState({ theaters });
          })
          .catch(error => {
            alert('Error loading theaters: ' + JSON.stringify(error));
          });
      },
      error => {
        alert('Error getting location: ' + JSON.stringify(error));
      }
    );
  }
  _handleTheaterClick(theater) {
    this.onSelect(theater);
    this.props.navigation.goBack();
  }
  _renderRow({ item }) {
    var theaterDistance = haversine(
      this.currentPosition,
      { latitude: item.lat, longitude: item.long },
      { unit: 'mile' }
    ).toFixed(2);
    return (
      <ListItem onPress={this._handleTheaterClick.bind(this, item)}>
        <Body>
          <Text>{item.name}</Text>
          <Text note>{item.address}</Text>
        </Body>
        <Right>
          <Text>{theaterDistance} mi</Text>
        </Right>
      </ListItem>
    );
  }
  render() {
    if (this.state.theaters) {
      return (
        <Container>
          <Content style={styles.content}>
            <FlatList
              data={this.state.theaters}
              renderItem={this._renderRow.bind(this)}
              keyExtractor={item => item.id}
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
