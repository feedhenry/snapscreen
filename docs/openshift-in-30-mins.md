# Openshift in 30 mins with a Node.JS application #

These steps presume you already have Docker installed. If you don't, look at this quickstart docker guide, or install Docker from [here](insert-link). Before you proceed any further confirm you can run docker process commands by trying `docker ps`


## Installing Openshift ##

### Installing the oc cli tool ###

Download the Linux [oc binary](https://github.com/openshift/origin/releases) and place it in your path.


## Bring your cluster up ##

Bring up your cluster for the first time by running:

* `oc cluster up --public-hostname=127.0.0.1 --host-data-dir=$HOME/os/data-dir --host-config-dir=$HOME/os/config-dir`

If successful you should see output like the following:

![terminal-output](https://s11.postimg.org/pzt4nepw3/oc-cluster-up.png)

To bring up your cluster subsequently pass in the `--use-existing-config` flag to your `oc cluster up` command:

* `oc cluster up --public-hostname=127.0.0.1 --host-data-dir=$HOME/os/data-dir --host-config-dir=$HOME/os/config-dir --use-existing-config`


### Troubleshooting ###

If you encounter any errors the error messages are generally helpful enough to diagnose and resolve the issue. Some issues that were encountered included:

* the docker service daemon/ service was not running or needed to be restarted


### OpenShift console ###

Once you have successfully brought your cluster up you should be able to access the OpenShift console through the url specified at the end of your `oc cluster up` log. 

![openshift-console](https://s11.postimg.org/4fxzt7uz7/openshift-opening-screen.png)  

![openshift-console](https://s11.postimg.org/txgectcpf/openshift-dashboard.png)


## Deploy your app to OpenShift ##

Deploy your app by executing:

* `oc new-app <dockerhub-username>/<dockerhub-image-name>`

In the OpenShift console you should see your app spinning up in its pod. 

To access your app, you will need to create an external-facing route to it. Do this through the cli with:

* `oc expose service/<name> --hostname=<www.example.com>`

You can also set up a route through the openshift console:

![openshift-console](https://s11.postimg.org/9fvg160lv/select-routes.png)  

![openshift-console](https://s11.postimg.org/kzvofgk9f/create-route.png)  

Congratulations! You have now deployed your app on OpenShift and should be able to access your deployed app through the route you specified.


## Bringing down your cluster ##

To bring down your cluster `oc cluster down` will take down your cluster.


## Summary & further reading ##

Through the above steps you should have:

* Installed OpenShift locally
* Installed the OC CLI to interact with your OpenShift cluster
* Brought up your local cluster and deployed a Node.JS app
* Created a route/ url to access your app

For further reading, check out:

* [A summary of the oc cluster up options](https://www.mankier.com/1/oc-cluster-up)
* [A summary/ set of man pages for the various oc client command options](https://www.mankier.com/package/origin-clients)
* [Documentation for OpenShift cluster management](https://github.com/openshift/origin/blob/master/docs/cluster_up_down.md)
* [The OpenShift Developer guide](https://docs.openshift.com/enterprise/3.1/dev_guide/index.html)

