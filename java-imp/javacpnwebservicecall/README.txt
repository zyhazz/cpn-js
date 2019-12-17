To start the Java server, cd to dist dorectory and  invoke the .jar file:

java - jar JavCPNWebServiceExample.jar

Start CPN model and fire the transitions. The from and to are picked randomly. Also
one request is processed before the next one is sent. If multiple requests are allowed
to be submitted, then some mechanism to relate the received result to the pending requests 
is needed. A request ID can be generated and transmitted to the Java server for managing this.