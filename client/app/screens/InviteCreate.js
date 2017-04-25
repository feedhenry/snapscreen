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

const styles = {};

export default class InviteCreateScreen extends React.Component {
  static navigationOptions = {
    title: 'Create Invite',
  };
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
        <Content>
          <Text>Create Invite Yo!</Text>
        </Content>
      </Container>
    );
  }
}
