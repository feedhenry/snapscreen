import React from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  ListView,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import {
  Body,
  Container,
  Content,
  Icon,
  Left,
  Right,
  Text,
  Thumbnail,
  ListItem,
} from 'native-base';
import Moment from 'moment';
import { getInvites } from '../api';

const styles = {
  accepted: {
    color: 'green',
  },
  declined: {
    color: 'red',
  },
  unanswered: {
    color: 'gray',
  },
  thumbnail: {
    width: 60,
    height: 90,
  },
  listArrow: {
    flex: 0.1,
  },
};

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default class InviteListScreen extends React.Component {
  static navigationOptions = {
    title: 'Invites',
  };
  constructor() {
    super();
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = { refreshing: false };

    // Initial load of invites
    getInvites()
      .then(invites => {
        this.setState({ dataSource: ds.cloneWithRows(invites) });
      })
      .catch(error => {
        console.log('Error loading invites.');
      });
  }
  _renderRow(rowData) {
    return (
      <ListItem onPress={() => this.props.navigation.navigate('InviteDetail')}>
        <Image source={{ uri: rowData.thumbnail }} style={styles.thumbnail} />
        <Body>
          <Text>{rowData.title}</Text>
          <Text note>
            {Moment(rowData.showtime).format('dddd, MMMM D @ h:mm a')}
          </Text>
          <Text note style={styles[rowData.myStatus]}>
            {capitalize(rowData.myStatus)}
          </Text>
        </Body>
        <Right style={styles.listArrow}>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    );
  }
  _refreshData() {
    this.setState({ refreshing: true });
    getInvites()
      .then(invites => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(invites),
          refreshing: false,
        });
      })
      .catch(error => {
        console.log('Error refreshing invites.');
      });
  }
  render() {
    if (this.state.dataSource) {
      // TODO: Replace with FlatList when we upgrade to react-native >= 0.43
      return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._refreshData.bind(this)}
            />
          }
        />
      );
    } else {
      return (
        <ActivityIndicator
          animating={this.state.animating}
          style={[styles.centering, { height: 80 }]}
          size="large"
        />
      );
    }
  }
}
