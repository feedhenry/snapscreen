import React from 'react';
import Login from 'react-native-login';
import {
  ActivityIndicator,
  Button,
  DeviceEventEmitter,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import {
  Body,
  Container,
  Content,
  Icon,
  Fab,
  Left,
  ListItem,
  Right,
  Text,
  Thumbnail,
  variables,
} from 'native-base';
import { getInvites } from '../api';
import { formatShowtime } from '../utils';

const styles = {
  accepted: {
    color: variables.brandSuccess,
  },
  declined: {
    color: variables.brandDanger,
  },
  unanswered: {
    color: 'gray',
  },
  organizer: {
    color: variables.brandInfo,
  },
  thumbnail: {
    width: 60,
    height: 90,
  },
  listArrow: {
    flex: 0.1,
  },
  addButton: {
    backgroundColor: '#037aff',
  },
};

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default class InviteListScreen extends React.Component {
  static navigationOptions = {
    title: 'SnapScreen',
  };

  constructor(props) {
    super(props);
    this.state = { refreshing: false };
    this.currentUserID = this.props.navigation.state.params.currentUserID;
    this._refreshData(true);

    // Handle push notifications
    DeviceEventEmitter.addListener(
      'onDefaultMessage',
      this._refreshData.bind(this)
    );
  }

  _refreshData(initialLoad = false) {
    if (!initialLoad) {
      this.setState({ refreshing: true });
    }
    getInvites()
      .then(invites => {
        this.setState({ invites: invites, refreshing: false });
      })
      .catch(error => {
        alert('Error refreshing invites.' + JSON.stringify(error));
      });
  }

  _getCurrentUserStatus(invitees) {
    let invitation = invitees.find(user => user.id === this.currentUserID);
    return invitation.status;
  }

  _renderItem({ item }) {
    return (
      <ListItem
        onPress={() =>
          this.props.navigation.navigate('InviteDetail', {
            invite: item,
            currentUserID: this.currentUserID,
          })}
      >
        <Image
          source={{ uri: item.movie.thumbnail }}
          style={styles.thumbnail}
        />
        <Body>
          <Text>{item.movie.title}</Text>
          <Text note>{formatShowtime(item.showtime.time)}</Text>

          <Choose>
            <When condition={item.organizer.id === this.currentUserID}>
              <Text note style={styles.organizer}>Organizer</Text>
            </When>
            <Otherwise>
              <Text
                note
                style={styles[this._getCurrentUserStatus(item.invitees)]}
              >
                {capitalize(this._getCurrentUserStatus(item.invitees))}
              </Text>
            </Otherwise>
          </Choose>
        </Body>
        <Right style={styles.listArrow}>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    );
  }

  render() {
    if (this.state.invites) {
      return (
        <Container>
          <Content>
            <FlatList
              data={this.state.invites}
              renderItem={this._renderItem.bind(this)}
              refreshing={this.state.refreshing}
              onRefresh={this._refreshData.bind(this)}
              keyExtractor={item => item._id}
            />
          </Content>
          {/* TODO: This button needs something like TouchableOpacitiy -
              there's no feedback when it's pressed. */}
          <Fab
            style={styles.addButton}
            onPress={() => this.props.navigation.navigate('InviteCreate')}
          >
            <Icon name="add" />
          </Fab>
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
