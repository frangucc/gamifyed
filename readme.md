### This is the Gamifyed Developer Motherload
#### This will get thinned out a lot when we push to production

## TO BEGIN

1. cd into gamifyed-cli and run: chmod u+x cli-definitions.sh
2. alias gamifyed="/gamifyed/gamifyed-cli/cli-definitions.sh" - be sure to use your absolute path
3. run: gamifyed

#### These actions will tell your terminal to run the gamifyed C++ main entry program, which will trigger the workflow-router, which triggers a bunch of system checks, updates the users latest state, looks at the connection, populates some variables then runs game, taking you to where you left off. 