# Docker in 30 mins with a Node.JS application #

To start using docker for your application(s), you will need Docker installed on your machine and optionally a Docker Hub account to host your docker image.


## Prerequisites ##

Install docker. A list of the supported platforms and instructions for installing docker on those platforms are located [here](https://docs.docker.com/engine/installation/#supported-platforms).  

Before you continue, ensure you can run the docker hello-world example by running `docker run hello-world` in a terminal. You should see an output like the below:

![hello-world-output](https://s24.postimg.org/vumoh4zw5/Selection_103.png)


## Containerising your app ##

### Dockerfile ###

To containerise your app you will need a Dockerfile for your app. Create a file named 'Dockerfile' in the root of your app directory with the following content:

> FROM node:6.10.2-alpine
> 
> \# Create app directory  
> RUN mkdir -p /usr/src/app  
> WORKDIR /usr/src/app  
> 
> \# Install app dependencies  
> COPY package.json /usr/src/app/  
> RUN npm install  
> 
> \# Bundle app source  
> COPY . /usr/src/app  
> 
> EXPOSE 8000  
> 
> CMD [ "npm", "start" ] # make sure start script in package.json

** the above presumes your app listens on port 8000, and that you have a start script in your package.json:

> "scripts": {  
> &nbsp;&nbsp;&nbsp;&nbsp;"start": "node app.js"  
>  },


## Build your app docker container ##

Run the following from the root of your app directory:

* `docker build -t <your-username>/<your-app-name> .`

If you have any errors regaring the location of your DockerFile, you may need to specify the path to your DockerFile:

* `docker build -t <your-username>/<your-app-name> -f <location-and-path-of-dockerfile> .`

You should see an output like the following:

![build-output](https://s24.postimg.org/eimbvp6et/Selection_104.png)


### Run your container app ###

Once your docker container is built run it with:

* `docker run -p 49160:8000 <your-username>/<your-app-name>`

Sample output should resemble:

![running-your-container](https://s24.postimg.org/z45p1cddh/Selection_105.png)

** the above presumes 8000 is the port number your nodejs app runs on, and that you wish to map it to port 49160 on your local machine.

If you have been successful, you will now be able to access your app through port 49160 - congratulations, you have just built and run your first containerised app!


### Check your containers ###

To return a list of all running docker containers (and retrieve the id of your container):

* `docker ps`

![docker-ps-output](https://s11.postimg.org/ff7rc7w7n/Selection_110.png)

### Checking your container logs ###

To check the logs from your container run: 

* `docker logs -f <container-id>`

![docker-logs-output](https://s24.postimg.org/erjwlmj79/Selection_108.png)


### Getting inside your container ###

To access a bash terminal within the container run:

* `docker exec -it <container id> /bin/bash`


### Stopping your docker container ###

To stop a docker container run:

* `docker stop <container-id>`

To delete a docker container image once stopped run:

* `docker rm <container-id>`


## (Optional) (Docker Hub)[https://hub.docker.com/] ##

To host your container images on Docker Hub, ensure you have a dockerhub account, then:

* `docker login`
* `docker tag <container-id> <dockerhub-username>/<repo-name>`
* `docker push <dockerhub-username>/<repo-name>`

![dockerhub-login](https://s24.postimg.org/ljaboh86t/Selection_109.png)


## Troubleshooting tips ##

If you encounter any errors the docker error messages are generally helpful enough to diagnose and resolve the issue. Some issues that were encountered included:

* the need to pass in an insecure registry flag when running the docker service daemon
* the need to disable SELinux when running the docker service daemon
* the need to change the permissions of the UNIX socket the docker daemon is listening to
