import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView
} from 'react-native';
import {
  Container,
  Content,
  Button,
  Label,
  Grid,
  Col,
  Form,
  Item,
  Input
} from 'native-base';
import { Font } from 'expo';

import Icon from 'react-native-vector-icons/FontAwesome';

function press() {
  // TODO implement
}

export default class SignupScreen extends React.Component {
  /*async componentDidMount() {
    await Font.loadAsync({
      'Roboto_medium': require('../assets/fonts/Roboto_medium.ttf'),
    });
    this.setState({ fontLoaded: true });
  }*/
  static navigationOptions = {
    title: 'Signup',
  };
  render() {
    return (
      <Container style={{padding: 30}}>
        
        <Content>
          
          <Form>
            <Item style={{marginBottom: '5%', marginTop: '10%'}}>
              <Input placeholder="Username" />
            </Item>
            
            <Item last style={{marginBottom: '10%'}}>
              <Input placeholder="Password" />
            </Item>
            
            <Grid style={{marginBottom: '10%'}}>
              <Col>
                <Button full transparent>
                  <View style={styles.inline}>
                    <Icon name="close" size={30} />
                    <Text style={[styles.buttonBigText]}>  Cancel </Text>
                  </View>
                </Button>
              </Col>
              <Col>
                <Button full transparent>
                  <View style={styles.inline}>
                    <Icon name="sign-in" size={30} />
                    <Text style={[styles.buttonBigText]}>  Register </Text>
                  </View>
                </Button>
              </Col>
            </Grid>
          
          </Form>
                  
        </Content>
      
      </Container>
    
    );
  }
}

const styles = StyleSheet.create({
  buttonBigText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  buttonRedText: {
    color: '#db3236'
  },
  inline: {
    flexDirection: 'row'
  },
});

AppRegistry.registerComponent('SignupScreen', () => SignupScreen);
