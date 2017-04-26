import React from 'react';
import {Button, Image, Linking } from 'react-native';
import Login from 'react-native-login';

import {
  Body,
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


const config = {
  url: 'https://chat.sagaoftherealms.net/auth',
  realm: 'demo',
  client_id: 'Android',
  redirect_uri: 'keycloak-demo://app'
};


export default class LoadingScreen extends React.Component {
  static navigationOptions = {
    title: 'Loading',
  };
  constructor(props) {
    super(props);
    this.state = {
        isLoading : true,
        hasInitialUrl : null,
        hasToken : null,
        token: ''
    };  
  }
  
  checkTokens() {
    return Login.tokens().then((tokens)=>
    {
        if(tokens) {
          this.setState({hasToken:true, token: tokens['access_token']});
        } else {
          this.setState({hasToken:false});//Set if there is a token
        }
        if (this.state.hasInitialUrl != null) {    //check if the initialUrl has been checked
          this.setState({isLoading:false}); // if so, ready to work!
          if (!tokens && !this.state.hasInitialUrl) {
            console.log("no token, no url");
            this.props.navigation.navigate('Login', {config: config})
          } else {
            this.props.navigation.navigate('InvitesList', {token: this.state.token, config: config})
          }
        }
    }).catch(err =>{console.log(err)});

  }

  componentWillMount() {
    this.checkTokens();
    Linking.getInitialURL().then(url =>
    {
      if (url) {
            this.setState({hasInitialUrl:true});
            var code = this.getParameterByName("code", url);
            if (code) {
              Login.retrieveTokens(code).then((resp) =>
              {
                console.log(resp);
                this.checkTokens();
              });
            } else {
              this.setState({hasToken:false, isLoading:false});
                this.props.navigation.navigate('Login', {config: config})
            }

          } else {
            this.setState({hasInitialUrl:false});
            if (this.state.hasToken != null) {    //check if the token has been checked
              this.setState({isLoading:false}); // if so, ready to work!
              if (this.state.hasToken) {
                this.props.navigation.navigate('InvitesList', {token: this.state.token, config: config})
              } else {
                this.props.navigation.navigate('Login', {config: config})
              }
            }
            
          }
    }).catch(err =>{console.log(err)});

  }

  getParameterByName(name, url) {  
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
  } 

  render() {
    if (this.state.isLoading) {
      return (
           <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            
                        }}>
          <Text>Loading...</Text>
          </View>
     
      );
    } else {
      return (
           <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            
                        }}>
          <Text>Make me go somewhere.  I'm logged in.</Text>
          <Text>Token:{this.state.token.substr(0,32)}...</Text>
          </View>
     
        );
    }
    
  }
}
