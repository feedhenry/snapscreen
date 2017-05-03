# Getting started with OpenShift (w/ Fedora 25) #

## Intro ## 

This will be a doc outlining one developers experience with the use of containerisation for your apps, and deployment to a containerised cluster environment. The following doc will cover getting started with docker, so as to lay the foundations of understanding and workign with OpenShift. Kubernetes as the underlying technology of OpenShift will be mentioned quite a lot also. 

## Background ##

This doc will be written from the perspective of an application developer seeking to integrate Docker, Kubernetes and OpenShift into their development workflow. Deploying a node.js app written in express.js will be the main testcase used throughout, although examples of other containerised apps will figure as examples too.

## Knowledge pre-requisites ##

There are no hard pre-requisite knowledge requirements to follow this doc, but you should probably have some form of application you intend to containerise and deploy, so you have a practical way of working through the content. Other than that, a general overview/ sense of software deployment is handy, but not required, and picked up quickly. Tutorial links and background reading links will be provided along the way, to be dipped into as needed.

 ## Errors/ amendments/ additions ##

Its unavoidabel that errors/ typos creep into such a good, as well as the such a guide always being in flux and capable of improvement. As such, you are invited to generate PRs against this doc as you feel necessary, and and suggestions/ improvements/ corrections shall be taken on board.

## Format of this guide ##

This guide will begin by looking at Docker, before moving onto Kubernetes and subsequently onto OpenShift. 

## Installation requirements ##

You will need installed versions of:
 * Docker
 * Openshift

### Installing Docker on Fedora ###

<todo - add later>

### Installing OpenShift on Fedora ###

<todo - add later>

## Docker ## 

### DockerFile ###

Once choose the app you wish to containerise, you will then need to create a docker configuration file in the root of your app folder. This configuration file is the only file you will need to containerise your app. Simple instructions on how to create this file for a Node.js application are outlined [here](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/).

### Building your docker image ###

Once you have a DockerFile for your app, you now need to build your docker image. Do this by:
* Navigate to the root of your app folder with your DockerFile
* Run the command `docker build -t <your-username>/<your-app-name> .` This builds your image using the configuration specified in your DockerFile. `-t <your-username>/<your-app-name>` specifies a tag for your docker image using the convention of `<username>/<app-name>`, and an example might be `damienomurchu/data-miner`
* The above command assumes the folder your are running the command from contains a DockerFile, which the `docker build` commands will use to build your docker image. If you wish to build your image from a DockerFile located somewhere other than the folder you run the command from, add the `-f <location-and-path-of-dockerfile>` to the build command, ie `docker build -t <your-username>/<your-app-name> -f <location-and-path-of-dockerfile> .`

### Running your docker image ###

Once your docker image is built, you can then run it with docker run:
* `docker run -p 49160:8000 <your-username>/<your-app-name>`

The `-p` flag above maps the port between your container and your host system, ie the above command maps port 8000 on your docker container to port 49160 on your host machine running docker. So if you had a Node.js app in your container set to listen on port 8000 when it was run, by mapping the port to 49160 in the previous command, you would now be able to access it on port 49160.

Additionally, to run your docker image in the background as a service/ daemon, simply run the previous command with `-d --name <image-name>`, thus `docker run -d --name <image-name> -p 49160:8000 <your-username>/<your-app-name>`

### Checking your docker images ###

You can check the status of docker images quite easily with the `docker ps` command. When run without any arguments `docker ps` will return a list of all running docker containers. To see all docker containers, running or stopped, simply use `docker ps -a`.

### Checking your container logs ###

To check the logs from your container, you can do so with the command `docker logs <container-id>` or with the `-f` flag: `docker logs -f <container-id>`

### Getting inside your container ###

To access a shell terminal within the container, you can do so with the command `docker exec -it <container id> /bin/bash`, with the `-it` flag denoting an interactive terminal, and `/bin/bash` signifying the shell to be used. 

### Stopping your docker container ###

To stop a docker container from running, use the command `docker stop <container-id>`. Note that this just stops the docker container running, it does not delete the docker container. If you wish to remove the docker container completely use `docker rm <container-id>` to remove the image. 

`docker stop` gracefully stops the docker container, but if this does not work, you can stop the container more forcefully with `docker kill <container-id>`

### Managing your docker images ###

Docker images are the components from which your docker container will be created (the DockerFile specifies how it will be constructed; the docker image the what it will be constructed from). A docker image will typically be either the base OS component from which your container will be built with, or a saved image with applications/ software built on top of the base OS component (ie a final app, for example). 

Docker provides a number of ways in which to manage your docker image files, and include the following commands:

The typical workflow with docker will be to search/ choose which docker images you wish to use. These images are hosted on DockerHub and docker allows you to search for images, and either pull/ download those images to your local machine or specify those images in DockerFile's to be used to construct containers. Docker images on your local machine can then be searched for via the docker CLI. Useful commands include:

* `docker search <name> # searches docker registry for docker image`
* `docker search <search-string> | grep <grep-string> # narrows down search`
* `docker pull <image name> # pulls image from docker registry and downloads it`
* `docker images # shows all local docker images`
* `docker images | grep <grep-string> # narrows down list with grep`
* `docker images -a # show all images on this machine`
* `docker rmi <image-name> # remove specified image from this machine`

In order to push your own images to the docker registry, you should tag then, and then push them. You can also run an image directly from the registry:

* `docker tag <image> username/repository:tag # Tag <image> for upload to registry`
* `docker push username/repository:tag # Upload tagged image to registry`
* `docker run username/repository:tag # Run image from a registry`

