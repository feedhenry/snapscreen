# Snapscreen Server

This is a backend for the Snapscreen App. It includes an API to query for invites and movies. These is the API methods available:

- GET /invites
  - Returns a list of the invites sent from the authenticated host
  - Response: 
    [ { 
      id: string, 
      movie_id: string, 
      host_id: string, 
      status: enum[ accepted | declined | unanswered ], 
      invitees: array[ { id, status } ]
    } ]

- POST /invites
  - Creates a new invite
  - Body (x-www-form-urlencoded):
    { 
      movie_id: string, 
      invitees: array[ { id, status } ]
    }

- GET /invites/<invite_id>/
  - Returns the data for a specific invite
  - Response:
  	{ 
      id: string, 
      movie_id: string, 
      host_id: string, 
      status: enum[ accepted | declined | unanswered ], 
      invitees: array[ { id, status } ]
    }

- PATCH /invites/<invite_id>/
  - Updates the data for a specific invite
  - Body (x-www-form-urlencoded):
  	{ 
      movie_id: string, 
      host_id: string, 
      status: enum[ accepted | declined | unanswered ], 
      invitees: array[ { id, status } ]
    }

- GET /movies?lat=<latitude>&lng=<longitude>
  - Returns the list of movies shown nearby the provided location
  - Response:
    [ {
      id: string,
      title: string,
      showtimes: [ {
        theatreId: string,
        theatreName: string,
        datetime: string,
        releaseDate: string,
        genres: [ string ],
        description: string,
        topCast: [ string ],
        directors: [ string ],
        officialUrl: string,
        preferredImage: {
          width: string,
          height: string,
          uri: string,
          category: string,
          text: string,
          primary: string
        }
    } ]

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