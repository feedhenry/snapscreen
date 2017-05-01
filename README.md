# SnapScreen 
SnapScreen is a project which demonstrates how to use Keycloak, AeroGear Unified Push Server, and OpenShift with React Native.  

# Installation

## Installing OpenShift

Before you can run the demo you need to have access to an OpenShift Origin cluster and the oc tool installed.  If you would like instructions to setup OpenShift Origin you may find them on the [Openshift GitHub](https://github.com/openshift/origin/blob/master/docs/cluster_up_down.md).

## Keycloak and UPS

The [Keycloak](./Keycloak/README.md) and [ups](./ups/README.md) READMEs include instructions and templates for deploying the servers to your OpenShift cluster.

## API Server

The [server README](./server/README.md) has the full setup instrucitons.

## Client App

In order to run the Mobile application you need to have npm, yarn, the Android SDK, and react-native-cli installed.  You can find more setup instructions in the [client Readme](./client/README.md).

# Setup

In addition to deploying the services to OpenShift, Keycloak and UPS must also be configured.

## Keycloak

In order to use Keycloak you must have a client and an Identity Provider configured.  To keep our app's configuration separate from other apps' configurations, we will also create a realm for SnapScreen.  Keycloak uses OAuth 2 to communicate with its clients and its identity providers.  If you are unfamiliar with OAuth 2 you may wish to read up on it first.

### Create Realm

To add a realm you will want to select "Add Realm" from the drop down menu when appears when you hover on the current realm's name, and then create a realm named "SnapScreen" on the following form.

### Create client

After you create your realm, you will want to create a client for the mobile app.  Click on the "Clients" item in the left nav, and then select "Create" in the form that loads.  You will want to give your client a reasonable name like "mobile_app".  After you save this form by clicking "Save", you will need to perform some addition configuration.  To the section "Valid Redirect URIs" you should add the field "Keycloak-demo://app".  Save this form and your client is ready.

### Connect GitHub SSO

**Note** You are not required to configure both the Facebook and GitHub providers; however, you must configure one of them for the application to work.

To add GitHub as an Identity Provider you will need to have a GitHub account which you will configure an [OAuth application](https://github.com/settings/developers) that connects to Keycloak. In order to complete this step you will need to have a redirect URI which is provided by the Keycloak admin console. 

From the Keycloak admin console, select "Identity Providers" and then from the "Add provider..." dropdown select "GitHub".  Use the "Redirect URI" on this page to configure your GitHub OAuth application.  Add to the Keycloak form the values of Client ID and Client Secret you receive from GitHub.

### Connect Facebook SSO

**Note** You are not required to configure both the Facebook and GitHub providers; however, you must configure one of them for the application to work.

To add Facebook as an Identity Provider you will need to have a Facebook account which you will configure an Facebook application using [developers.facebook.com](https://developers.facebook.com/) that connects to Keycloak. In order to complete this step you will need to have a redirect URI which is provided by the Keycloak admin console. 

From the Keycloak admin console, select "Identity Providers" and then from the "Add provider..." dropdown select "Facebook".  Use the "Redirect URI" on this page to configure your Facebook OAuth application.  Add to the Keycloak form the values of Client ID and Client Secret you receive from Facebook.

The Keycloak project has [more details](https://github.com/keycloak/keycloak/tree/master/examples/broker/facebook-authentication#make-sure-youve-set-up-a-application-in-facebook) on setting up Facebook.

## AeroGear Unified Push Server



## API Server

## Client App

# Local Development

## API Server