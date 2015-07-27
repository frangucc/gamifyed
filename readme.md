# Welcome!

This is the Gamifyed Developer Motherload. This directory will get thinned out a lot when we push to production.

### START HERE

***

##### Open your terminal on the node and type:

As Dev RUN:

`cd /home/gamifyed/gamifyed-cli/`

As Dev then RUN:

`chmod u+x cli-definitions.sh`

As then RUN:

`alias gamifyed="/gamifyed/gamifyed-cli/cli-definitions.sh"`

As User RUN:

`gamifyed`

*End Users* should only have to run one simple command the minute their node turns on and this will start the hacking tour. 

##### The app should start - you will know. If not, please try again or report an issue. issue@gamifyed.com

*If it worked,* from now on, just run gamifyed anywhere on your node and the app will fire up!

***

*Notes:* These first actions will tell your terminal to run the gamifyed C++ main entry program, which will trigger the workflow-router, which triggers a bunch of system checks, updates the users latest state, looks at the connection, populates some variables then runs game, taking you to where you left off. 

*Developers:*

We are compiling 4 versions. Ubuntu, Mac, Raspberian and Windows. To cross compile do something like (hence the 4 folders on the root of gamifyed-cli):

`g++ src/Gamifyed-CLI.cpp -o gamifyed-cli-mac`

