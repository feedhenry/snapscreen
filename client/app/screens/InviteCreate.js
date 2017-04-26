import React from 'react';
import { Image } from 'react-native';
import {
  Body,
  Card,
  CardItem,
  Container,
  Content,
  Button,
  Text,
} from 'native-base';

const styles = {
  content: {
    marginVertical: 10,
    marginHorizontal: 8,
  },
};

export default class InviteCreateScreen extends React.Component {
  static navigationOptions = {
    title: 'Create Invite',
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  _theaterSelected(theater) {
    this.setState({ theater });
  }
  render() {
    return (
      <Container>
        <Content style={styles.content}>
          <Card>
            <CardItem>
              <Body>
                <Button
                  onPress={() =>
                    this.props.navigation.navigate('SelectTheater', {
                      onSelect: this._theaterSelected.bind(this),
                    })}
                >
                  <Text>Select movie theater</Text>
                </Button>
                <If condition={this.state.theater}>
                  <Text>Movie Theater: {this.state.theater.name}</Text>
                </If>
                <Button><Text>Select movie & showtime</Text></Button>
                <Text>Movie & Showtime:</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
