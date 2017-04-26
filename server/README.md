# Snapscreen Server

This is a backend for the Snapscreen App. It includes an API to query for invites and movies. These is the API methods available:

- GET /invites
  - Returns a list of the invites sent from the authenticated host
  - Response:
  	``` 
    [ { 
      id: string, 
      movie_id: string, 
      host_id: string, 
      status: enum[ accepted | declined | unanswered ], 
      invitees: array[ { id, status } ]
    } ]
    ```

- POST /invites
  - Creates a new invite
  - Body (x-www-form-urlencoded):
    ```
    { 
      movie_id: string, 
      invitees: array[ { id, status } ]
    }
    ```

- GET /invites/<invite_id>/
  - Returns the data for a specific invite
  - Response:
  	```
  	{ 
      id: string, 
      movie_id: string, 
      host_id: string, 
      status: enum[ accepted | declined | unanswered ], 
      invitees: array[ { id, status } ]
    }
    ```

- PATCH /invites/<invite_id>/
  - Updates the data for a specific invite
  - Body (x-www-form-urlencoded):
  	```
  	{ 
      movie_id: string, 
      host_id: string, 
      status: enum[ accepted | declined | unanswered ], 
      invitees: array[ { id, status } ]
    }
    ```

- GET /movies?cinema_id=<cinema_id>
  - Returns the list of movies shown in a cinema
  - Response:
    ```
    [ {
      id: string,
      title: string,
      showtimes: [ {
        id: string,
        start_at: string
        }
    } ]
    ```

- GET /cinemas?lat=<latitude>&lng=<longitude>
  - Returns the list of cinemas shown nearby (within 10km) the provided location
  - Response:
    ```
    [ {
      id: string,
      name: string,
      location: object
    } ]
    ```

## Setup

This server is prepared to be built on top of OpenShift. It is composed by two main components: the node server to accept HTTP calls and a MongoDB server. Both can be deployed to OpenShift running the following commands from the /server folder.

```
oc login <ip:port>
oc new-project snapscreen

oc create -f openshift/mongo-service.yaml
oc create -f openshift/mongo-controller.yaml

oc create -f openshift/server-imagestream.yaml
oc create -f openshift/server-service.yaml
oc create -f openshift/server-build-config.yaml
oc create -f openshift/server-deployment-config.yaml
oc create -f openshift/server-route.yaml
```