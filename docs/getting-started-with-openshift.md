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

### Glossary of docker terminology ###

<todo - add later>

* docker container:
* docker image:
* docker host system: 
*

### DockerFile ###

Once choose the app you wish to containerise, you will then need to create a docker configuration file in the root of your app folder. This configuration file is the only file you will need to containerise your app. Simple instructions on how to create this file for a Node.js application are outlined [here](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/).

#### DockerFile pro-tips ####

* Create a non-root user so you are not using root within your container to execute everything. An example of what to add to your DockerFile to do this: 
`RUN groupadd -r jboss -g 1000 && useradd -u 1000 -r -g jboss -m -d /opt/jboss -s /sbin/nologin -c "JBoss user" jboss && chmod 755 /opt/jboss # creates a userid '1000'`

* If composing your DockerFile manually, like we are, it is worth noting that each command line in yoru DockerFile is considered a layer. The more layers, the longer the time which will be taken to build your container, thus it makes sense to keep the number of layers down by combining multiple terminal commands in each DockerFile docker commands with the `&&` command to string shell commands together. <todo-insert-example>

* If you have multiple docker containers that are used together (like an app split among several component containers), it may make sense to have a have a build script file, that executes a `docker build` for each container you wish to build and the DockerFile you wish to build from. In these build script files, if a container is dependent on another container, it may make sense to have a 'wait' script in that build script, so if the other container is not up and running yet your script will wait until it is.  

* If you want to add files to your docker container, you can use COPY or ADD. ADD will allow you to specify a URL so the files you are adding to your docker container do not necessarily have to be on your local system but can be from a web resource

* Examples of other good practice when writing your DockerFile and the reasons for it: [8 ProTips to start killing it when dockerizing node js](https://nodesource.com/blog/8-protips-to-start-killing-it-when-dockerizing-node-js/)

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

* As a sanity check to check that your app is accessible from the port you specified, a simple curl is useful, ie `curl http://localhost:49160`in the above example

* As your use of containerisation increases, you may find it useful to house the `docker run` settings and commands within a dedicated shell script for running that container

### Checking your docker images ###

You can check the status of docker images quite easily with the `docker ps` command. When run without any arguments `docker ps` will return a list of all running docker containers. To see all docker containers, running or stopped, simply use `docker ps -a`.

* Tip: the name of the container returned by `docker ps` is a hash, and subsequent docker commands that accept that hash, a shortened version of that hash can be used. For example, '449c92c9683c' can simply be referred to as '449' 

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

### Persistence of container data ###

Docker containers are designed to be spun up and torn down quickly. When a container is torn down all data in that container goes with it. To persist data from your docker container, involves creating a folder on the docker host system and mounting that folder within the docker container, a little like a network drive. This host folder may be mounted within several containers, with all containers reading/ writing to the same data source. 

First set up a volume on your docker host system:
* `mkdir /var/dbfiles # make host folder`
* `chmod o+rwx /var/dbfiles # open up permissions for folder`**
* `chcon -t svirt_sandbox_file_t /var/dbfiles # change SELinux security context of the new /var/dbfiles directory`

Once the volume has been set up on your host system, it can be mapped to the container by adding `-v <host-system-volume>:<folder-on-container>` when you run your container with `docker run`. An example of this with a mysql container might be something like: 
* `docker run -d --name mysql -e MYSQL_DATBASE=items -e MYSQL_USER=user1 -p 30306:3306 -v /var/local/mysql:var/lib/mysql mysql`

* To automate things even further, the container folder to which you bind to might be a folder that is watched by the container and trigger some further setup actions within the container 

## Coordinating multi-container applications ##

### Benefits of multi-container applications ###

Splitting the components of an application among several containers can make sense. In doing so, applications can be scaled in a more fine-grained and efficient manner, where only the necessary components are scaled as opposed to the entire application. 

This can lend itself to a micro-services approach, especially where application components can be split logically and easily, ie deploying a server and the db it uses in seperate containers for example. 

### Obstacles with multi-container environments ### 

Coordinating a multi-container environment is not without its obstacles. The issue of containers being able to communicate with each other is critical, and also the order in which containers are deployed is important when containers have dependencies on other containers.

As containers receive new IP addresses each time they are run, a key issue tends to be synchronising IP addresses between containers. Docker handles this issue through the use of environmental variables, and the use of the `docker link` command which handles the syncing of environmental variables between containers. `docker link` defines env variables providing the IP address and TCP port of other containers and by linking containers you enable containers to access each others enviromental variables.

* Tip: Use of a wait script inside containers that have dependencies on other containers, so they wait until their dependent containers have started up before they try access them via environmental variables. 

### How to link containers ###

`docker link` command used. Linking causes Docker to create several additional environment variables in the target container. 

`docker run --link <container-name>:alias [other options] <image-name>`

For example, we might link a wildfly container to a mysql container through the following:
* Run a container called 'mysql': `docker run -d --name mysql -e MYSQL_DATBASE=items -e MYSQL_USER=user1 -p 30306:3306 -v /var/local/mysql:var/lib/mysql mysql` 
* Run a container called 'wildfly' and link it to the container named 'mysql': `docker run --link mysql:db -d -e MYSQL_DB_NAME=items --name wildfly -p 30080:8080 do080/todoapp`
* In the above example a container called 'wildfly' is then linked to the 'mysql' container and an alias of 'db' set for this 'mysql' container within 'wildfly'. The 'mysql' container can then subsequently referred to as 'db' within 'wildfly'

#### Checking the env variables created by link ####

As mentioned, linking creates environmental variables in the linking container for the linked container. To check these env variables that have been created, you can do so by:

* Open a terminal in the linking container: `docker exec -it <name-of-linking-container> bash`
* grep for created env variables: `env | grep <alias-for-linked-container>`

For the previous example with wildfly and mysql, this would be done by:
* `docker exec -it wildfly bash`
* `env | grep DB`

To summarise, with linking, the environmental variables of the child container (the one being linked to) are injected into the parent container (the one doing the linking) so the containers can find and communicate with each other.

## Orchestrating containers with Kubernetes ##

Docker offers the ability to coordinate multiple container applications through `docker link` and Kubernetes offers a powerful orchestration layer on top of docker, particularly its ability to offer orchestration and management of multiple docker hosts.

### Overview/ architecture of Kubernetes ###

<todo-insert-architecture-diagram>

The above diagram outlines the elements of a Kubernetes cluster. A cluster is composed of at least one master, and one or more nodes. Each node in turn contains one or more pods, with each pod in turn containing one or more containers. On a very high level, the master controls the nodes, and it is the nodes that do the work. 

#### Master ####

A Kubernetes master acts as the controller in a cluster, and manages the workload and communication of the cluster. It provides a REST API and manipulates the cluster objects. The master will also house replication controllers, which control that the proper number of pods are running. The scheduler will also run in master, and serves to ensure that pods are evenly spread across the nodes. 

#### Nodes ####

A node is a server that does the work in a cluster. A node will typically house one or more pods, and services to access those pods. 

#### Pods ####

A pod is a tightly couple collection of containers & other resources that are grouped together, and also the smallest unit of work that can be scheduled on a cluster. Pods specify an image name of a container (and it is this container image the pod will be built from). Pods are generally exposed through a service, which provides a single ip-address:port group pair to access the group of pods associated with that service. Each pod will have its own private IP address, but pods will only be accessed through services. Also pods come and go over time, thus the private IP they are assigned will change. 

<need-code-here-to-illustrate>

#### Services ####

A service is the interface which calls pod(s), which it generally picks in a round-robin fashion, and acts like a load-balancer to balance traffic between the pods. Services access pods through the labels that have been assigned to pods; these labels ensure consistent communication from services to pods, and services connect to any pods that have the labels specified for the service. 

Services will have their own IP address, through which they are accessed and send requests onto any pods that match the label it specifies. Labels are effectively how services keep track of pods they can route traffic onto, and provide a consistent way for services to communicate with pods given the IP address of a pod cannot be relied upon (containers and pods receive new IP addresses each time they are run). Through labels, Kubernetes will inject the runtime information for the ip & port, just like docker did.

For example, if we have a service that routes traffic onto instances of our application server (called 'myApp'), we would specify that 'myApp' label in our service, so all traffic would be redirected onto resources that match that label. 

<need-code-here-to-illustrate>

#### Persistence ####

The docker solution of mounting a host folder inside the container works for a single host scenario but not for kubernetes, where a container inside a pod could run in many different hosts or nodes.

Kubernetes addresses the issue of persistence with persistent volumes (PVs) and persistent volumes claims. A PV is effectively a chunk of storage space you set aside for all your projects, and when pods and pod components require storage they request so through a PV claim. If the PV claim can be satisfied by the PV reources available, the claim is satisfied. After the pod/ resource no longer requires that storage (the container is taken down/ goes down), that storage from the PV claim is released back to the PV resource pool. 

<need-code-here-to-illustrate>

***Persistent volumes (PVs)*** :
* Kubernetes persistent volumes provision persistent network storage to pods that have been provisioned by the administrator 

***Persistent volume claims (PV Claims)*** :
* a persistent volume claim is a request for storage by a user
* a claim can be satisfied by any persistent volume matching the size and concurrency specified
* not created in the project that owns the application, but instead available to all applications running on the server
* persistent volume claims get matched against persistent volumes (if the PV has enough to satisfy the claim)

The benefits of the having a persistent volume claim at a project and not a pod scope allows the same persistent volume to be shared among many different pods and containers (but not at the same time). 

In summary:
* A PersistentVolume (PV) is a piece of networked storage in the cluster that has been provisioned by an administrator. It is a resource in the cluster just like a node is a cluster resource. 
* A PersistentVolumeClaim (PVC) is a request for storage by a user. It is similar to a pod. Pods consume node resources and PVCs consume PV resources. Pods can request specific levels of resources (CPU and Memory). Claims can request specific size and access modes (e.g., can be mounted once read/write or many times read-only).

#### Kubectl ####

Kubectl is the cli for Kubernetes. Many of the kubectl commands map to their docker ones so you will be familiar with some of them already. Examples of some kubectl commands include:

* `kubectl logs -f wildfly`
* `kubectl exec -t wildfly bash`


#### Nuances/ quirks of Kubernetes ####

Containers remain even after pods deleted, thus the logs of these containers are still intact and can be accessed. These containers that have been left behind will need to be deleted manually however.

## Enterprise featues of OpenShift ##



## OSE Web Console ##



## Source-to-Image ##



## OpenShift CLI client ##



## Scaling an application ##


# Random miscellany #


`kubectl create -f </path/to/json-or-yaml-file # resource files for pods/ services`

- necessary in order to run commands in order of dependencies>
