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

export default class LoginScreen extends React.Component {
  /*async componentDidMount() {
    await Font.loadAsync({
      'Roboto_medium': require('../assets/fonts/Roboto_medium.ttf'),
    });
    this.setState({ fontLoaded: true });
  }*/
  static navigationOptions = {
    title: 'Login',
  };
  render() {
    return (
      <Container style={{padding: 30}}>
        
        <Content>
          
          <Grid style={{marginTop: '5%'}}>
            <Col></Col>
            <Col>
              <Button outline small transparent>
                <Text small>Forgot Password</Text>
              </Button>
            </Col>
          </Grid>
          
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
                    <Text style={[styles.buttonBigText]}>  Login </Text>
                  </View>
                </Button>
              </Col>
            </Grid>

          </Form>
          
          <Button full transparent>
            <View style={styles.inline}>
              <Icon name="google-plus-square" size={40} color="#db3236" />
              <Text style={[styles.buttonRedText, styles.buttonBigText]}>  Signin with Google</Text>
            </View>
          </Button>
         
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

AppRegistry.registerComponent('LoginScreen', () => LoginScreen);
