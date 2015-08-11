#Qt Cross-Compilation Setup

Follow these steps in order to setup a developmental environment on your local machine for the Raspberry Pi.

1. Install QtCreator (*apt-get install qtcreator*).
2. Open QtCreator as superuser.
3. In the top menu, click on 'Tools'.
4. Click on 'Options'.
5. Click on 'Devices'.
  1. Click on 'Add'.
  2. Select 'Generic Linux Device' and click 'Start Wizard'.
  3. In the name field, type in 'Raspberry Pi'.
  4. In the host name/ip address field, type in the ip address of the Pi.
  5. In the user name field, type in the user name for the Pi (default is pi).
  6. Select 'Password' for the authentication type.
  7. In the password field, type in the password for the Pi (default is raspberry).
  8. Click 'Next'.
  9. Click 'Finish'.
5. Click on 'Build & Run'.
6. Click on 'Qt Versions'.
  1. Click on 'Add'.
  2. Navigate to /path_to_this_repo/local/qt5pi/bin/.
  3. Select 'qmake'.
7. Click on 'Compilers'.
  1. Click on 'Add' and select 'GCC'.
  2. In the 'Name' field, type in 'ARM GCC'.
  3. Click 'Browse...' and navigate to /path_to_this_repo/gcc-4.7-linaro-rpi-gnueabihf/bin/.
  4. Select 'arm-linux-gnueabihf-g++'.
8. Click on 'Debuggers'.
  1. Click on 'Add'.
  2. In the 'Name' field, type in 'RPi'.
  3. Click 'Browse...' and navigate to /path_to_this_repo/gcc-4.7-linaro-rpi-gnueabihf/bin/.
  4. Select 'arm-linux-gnueabihf-gdb'.
9. Click on 'Kits'.
  1. Click on 'Add'.
  2. In the 'Name' field, type in 'Raspberry Pi'.
  3. In the 'Device type' field, select 'Generic Linux Device'.
  4. In the 'Device' field, select 'Raspberry Pi'.
  5. In the 'Compiler' field, select 'ARM GCC'.
  6. In the 'Debugger' field, select 'RPi'.
  7. In the 'Qt version' field, select 'qt5pi'.
10. Click 'Apply'.
11. At this point, you should be able to select one of the example projects and deploy it to the Raspberry Pi.
