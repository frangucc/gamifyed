# This is the game front-end cli - it will ask the user it's very first question, what's your name? From there, it will do everything from register you to take you through chunks of the game.

## When you run the gamifyed command in your linux terminal, a C++ file called main.cbp -> main will then call router.cbp. Router will then decided what shell commands (bash) to run or what other scripts to trigger, in an object oriented way.

## When developers run the command, gamifyed, the router will run through all tests and report back the results.

### TDD must be used EVERY time. Each class has a test. Find a nice CPP test library.

### The following other cbp objects should be created:

* cli-workflow-router.cpp
* config.cpp
* classes.cpp
* connections.cpp
* environment.cpp
* state.cpp
* globals.cpp

* application-qt-gameply.cpp
* application-mobile-gameplay.cpp

*
* test-cli-workflow-router.cpp
* test-congif.cpp
* test-connections.cpp
* test-classes.cpp
* test-environment.cpp
* test-state.cpp

## This CLI will also get it's definitions from github (or try to), everytime it loads the gamifyed command, which loads. Each gamifyed command will represent a C++ file.

