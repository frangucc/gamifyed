### This is the Gamifyed Developer Motherload
This will get thinned out a lot when we push to production

***
# TO BEGIN


***

##### Start from your node:


CD into [/gamifyed-cli/](/gamifyed-cli/) and run:

`chmod u+x cli-definitions.sh`

then RUN:

`alias gamifyed="/gamifyed/gamifyed-cli/cli-definitions.sh"`

then RUN:

`gamifyed`

##### The app should start! If not, please try again or report an issue. issue@gamifyed.com

***

*Notes:* These first actions will tell your terminal to run the gamifyed C++ main entry program, which will trigger the workflow-router, which triggers a bunch of system checks, updates the users latest state, looks at the connection, populates some variables then runs game, taking you to where you left off. 


