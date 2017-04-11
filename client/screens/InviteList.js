import React from 'react';
import { Button, Image, ListView, StyleSheet, View } from 'react-native';
import {
  Body,
  Container,
  Content,
  Icon,
  Left,
  Right,
  Text,
  Thumbnail,
  ListItem
} from 'native-base';
import Moment from 'moment';

const inviteData = [
  {
    title: 'Going in Style',
    status: 'accepted',
    showtime: '2017-04-22T21:40:00.000Z',
    thumbnail: 'https://image.tmdb.org/t/p/original/cCpgyKtvKf0OkpeXvc7JxuOiRJp.jpg',
  }, {
    title: 'Logan',
    status: 'accepted',
    showtime: '2017-04-23T22:50:00.000Z',
    thumbnail: 'https://image.tmdb.org/t/p/original/5dn8jT3ii2i5xP1EBah6g9kdUKJ.jpg',
  }, {
    title: 'Beauty and the Beast',
    status: 'declined',
    showtime: '2017-04-26T22:30:00.000Z',
    thumbnail: 'https://image.tmdb.org/t/p/original/8LdkswnaKrZbySdxdkoZCB5QDto.jpg',
  }, {
    title: 'The Boss Baby',
    status: 'unanswered',
    showtime: '2017-04-29T23:45:00.000Z',
    thumbnail: 'https://image.tmdb.org/t/p/original/vkvPL8Lef9grxx6tyrojrjaaAw4.jpg',
  }
];

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
  }
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
    this._renderRow = this._renderRow.bind(this);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      dataSource: ds.cloneWithRows(inviteData),
    };
  }
  _renderRow(rowData) {
    return (
      <ListItem onPress={() => this.props.navigation.navigate('InviteDetail')}>
        <Image source={{uri: rowData.thumbnail}} style={styles.thumbnail} />
        <Body>
          <Text>{rowData.title}</Text>
          <Text note>{Moment(rowData.showtime).format('dddd, MMMM D @ h:mm a')}</Text>
          <Text note style={styles[rowData.status]}>{capitalize(rowData.status)}</Text>
        </Body>
        <Right style={styles.listArrow}>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    )
  }
  render() {
    return (
      // TODO: Replace with FlatList when we upgrade to react-native >= 0.43
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow.bind(this)}
      />
    );
  }
}