import React from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, ScrollView, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Container from '../components/Container';
import Button from '../components/Button';
import Label from '../components/Label';

function press() {
  // TODO implement
}

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };
  render() {
    return (
      <ScrollView style={styles.scroll}>


        <Container>
          <Button
              label="Forgot Login/Pass"
              styles={{button: styles.alignRight, label: styles.label}}
              // onPress={this.press.bind(this)}
          />
        </Container>

        <Container>
          <Label text="Username or Email" />
          <TextInput
              style={styles.textInput}
          />
        </Container>
        <Container>
            <Label text="Password" />
            <TextInput
                secureTextEntry={true}
                style={styles.textInput}
            />
        </Container>

        <Container>
          <Button
              styles={{button: styles.transparentButton}}
              //onPress={this.press.bind(this)}
          >
              <View style={styles.inline}>
                  <Icon name="google-plus" size={30} color="#db3236" />
                  <Text style={[styles.buttonRedText, styles.buttonBigText]}>  Signin </Text>
                  <Text style={styles.buttonRedText}>with Google</Text>
              </View>
          </Button>
        </Container>

        <View style={styles.footer}>
          <Container>
              <Button
                  label="Sign In"
                  styles={{button: styles.primaryButton, label: styles.buttonWhiteText}}
                  //onPress={this.press.bind(this)}
              />
          </Container>
          <Container>
              <Button
                  label="CANCEL"
                  styles={{label: styles.buttonBlackText}}
                  //onPress={this.press.bind(this)}
              />
          </Container>
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: '#F5FCFF',
    padding: 30,
    flexDirection: 'column'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  label: {
    color: '#0d8898',
    fontSize: 15
  },
  alignRight: {
      alignSelf: 'flex-end'
  },
  textInput: {
    height: 40,
    fontSize: 20,
    //backgroundColor: '#FFF'
  },
  welcome: {
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  transparentButton: {
    marginTop: 20,
    borderColor: '#db3236',
    borderWidth: 2
  },
  buttonRedText: {
      fontSize: 20,
      color: '#db3236'
  },
  buttonBigText: {
      fontSize: 20,
      fontWeight: 'bold'
  },
  inline: {
      flexDirection: 'row'
  },
  buttonWhiteText: {
    fontSize: 15,
    color: '#FFF',
  },
  buttonBlackText: {
      fontSize: 15,
      color: '#595856'
  },
  primaryButton: {
      backgroundColor: '#34A853'
  },
  footer: {
     marginTop: 20
  }
});

AppRegistry.registerComponent('LoginScreen', () => LoginScreen);
