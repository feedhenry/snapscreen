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
    // TODO: Not really sure if doing this in the constructor is best practice?
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
      <ListItem
        onPress={() =>
          this.props.navigation.navigate('InviteDetail', { invite: rowData })}
      >
        <Image source={{ uri: rowData.thumbnail }} style={styles.thumbnail} />
        <Body>
          <Text>{rowData.title}</Text>
          <Text note>{formatShowtime(rowData.showtime)}</Text>
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
        <Container>
          <Content>
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
