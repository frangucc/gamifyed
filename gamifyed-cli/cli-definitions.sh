#!/bin/bash
#####################################################
# Author: Rushi Patel
# Date: 2015/07/22
#####################################################


#get path to update so when we run gamifyed command this script fires up - everytime we run gamifyed, it should do a git-hub and firebase sync.

#sync up with github to see if anything has changed from the root of this folder. Developers updates will take longer during active development. Do an add, a push and a pull. If github updates fail or timeout, catch the response and continue along.

#after a successful sync to github, make the call to firebase via CURL and update the latest member and level data. The level data response will dictate where in the basefile to resume. The bash file should act as a classifier from that perspective. This is where the bash script can even delegate to a lover level program possibly by passing in a header we create from firebase, whereby we open the C or Python program using the "state header parameter"

#curl 'https://gamifyed-cli.firebaseio.com/01.json'

#this is where we may need a local storage to persist the latest header file. 

#restart the terminal in the correct directory and fire up the bash script every time. Use crash first methodology when making this all. Until Git hub and the latest definitions are up to date, restart the gamifyed app - also, some sort of internet detection or ping, network status would be good during this phase. Perhapse a response from a What's my speed type of API. Start labelling commands using (#internet-status) etc. 


if [[ "$OSTYPE" == "linux-gnu" ]]; then
    ./gamifyed-cli-linux-pc
elif [[ "$OSTYPE" == "darwin"* ]]; then
    ./gamifyed-cli-mac
elif [[ "$OSTYPE" == "linux-gnueabihf" ]]; then
    ./gamifyed-cli-rpi




#after updating the CLI Definitions from Github

# here we ask for users name
