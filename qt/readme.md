#Installing and running Qt apps on Raspberry Pi

Qt is a cross-platform application framework that can be used to design sleek UIs for many platforms at once. Using it on the Raspberry Pi allows the creation of UIs that can run minimally to maximize the limited CPU for other applications. These instructions are for cross-compiling Qt on the Raspberry Pi. Instructions were tested on Ubuntu 14.04 but should work on any Debian-based operating system.

###Requirements
1. A Raspberry Pi, preferably the Pi 2
2. At least a 4 Gb SD Card for the Pi (optional with Raspbian installed)
3. A development machine running a Debian-based OS
4. SD Card reader for the dev machine

##Building Qt for the Pi
1. Create a directory named 'opt' in the home folder and copy over the gcc-4.7-linaro-rpi-gnueabihf folder.
  ```shell  
  
  mkdir ~/opt/
  cp -rf /path_to_this_repo/gcc-4.7-linaro-rpi-gnueabihf/ ~/opt/    
  cd ~/opt/    
  ```  
2. If you don't have an existing Raspbian install, skip to step 4. Insert your SD card and find the address of the sd card. (Usually 'sdb')
  ```shell
  
  lsusb 
  ```
3. Make a copy of your SD card. (This step takes a few minutes)
  ```shell
  
  sudo dd bs=4M if=/dev/sd_card_address of=path_to_img_file.img;sync
  ```
4. Mount your raspbian image.
  ```shell
  
  sudo mount -o loop,offset=62914560 path_to_img_file.img /mnt/rasp-pi-rootfs
  ```
5. Clone and init the Qt5 repo.
  ```shell
  
  git clone git://code.qt.io/qt/qt5.git
  cd qt5
  ./init-repository
  ```
6. Enter the qtbase folder and install Qt.
  ```shell
  cd qtbase
  ./configure -opengl es2 -device linux-rasp-pi-g++ -device-option     CROSS_COMPILE=~/opt/gcc-4.7-linaro-rpi-gnueabihf/bin/arm-linux-gnueabihf- -sysroot /mnt/rasp-pi-rootfs -opensource -confirm-license -optimized-qmake -reduce-exports -release -make libs -prefix /usr/local/qt5pi -hostprefix /usr/local/qt5pi
  make -j 4
  sudo make install
  ```
*NOTE: The /mnt/rasp-pi-rootfs/usr/local/ folder can now replace the local/ folder in this repository.*  

7. **OPTIONAL:** In order to compile other modules to expand functionality, you must compile them seperately. The following order is suggested to avoid dependency errors: qtimageformats, qtsvg, qtjsbackend, qtscript, qtxmlpatterns, qtdeclarative, qtsensors, qt3d, qtgraphicaleffects, qtjsondb, qtlocation, qtdocgallery.
  ```shell
  
  cd <qt-module>
  sudo path_to_local_folder/qt5pi/bin/qmake .
  sudo make -j 4
  sudo make install
  ```
8. Write the image back to the SD Card.
 ```shell
 
  cd ~/opt/
  sudo umount /mnt/rasp-pi-rootfs
  sudo dd bs=4M if=path_to_img_file.img of/dev/sd_card_address; sync
  ```




##Qt Cross-Compilation Setup

Follow these steps in order to setup a developmental environment on your local machine for the Raspberry Pi.

1. Install QtCreator.
  ```shell

  sudo apt-get install QtCreator
  ```
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
6. Click on 'Build & Run'.
7. Click on 'Qt Versions'.
  1. Click on 'Add'.
  2. Navigate to /path_to_this_repo/local/qt5pi/bin/.
  3. Select 'qmake'.
8. Click on 'Compilers'.
  1. Click on 'Add' and select 'GCC'.
  2. In the 'Name' field, type in 'ARM GCC'.
  3. Click 'Browse...' and navigate to /path_to_this_repo/gcc-4.7-linaro-rpi-gnueabihf/bin/.
  4. Select 'arm-linux-gnueabihf-g++'.
9. Click on 'Debuggers'.
  1. Click on 'Add'.
  2. In the 'Name' field, type in 'RPi'.
  3. Click 'Browse...' and navigate to /path_to_this_repo/gcc-4.7-linaro-rpi-gnueabihf/bin/.
  4. Select 'arm-linux-gnueabihf-gdb'.
10. Click on 'Kits'.
  1. Click on 'Add'.
  2. In the 'Name' field, type in 'Raspberry Pi'.
  3. In the 'Device type' field, select 'Generic Linux Device'.
  4. In the 'Device' field, select 'Raspberry Pi'.
  5. In the 'Compiler' field, select 'ARM GCC'.
  6. In the 'Debugger' field, select 'RPi'.
  7. In the 'Qt version' field, select 'qt5pi'.
11. Click 'Apply'.
12. At this point, you should be able to select one of the example projects and deploy it to the Raspberry Pi.
13. To run an application, in Qt Creator, click the green Run button. This will build and deploy the application to the Pi. All output from the application will be on the console in Qt Creator.
14. After the compilation process, you can transfer the binary executable over to the Pi manually along with any resources and run directly on the Pi without the development machine.
  ```shell

  cd /folder_where_binary_is
  ./binary_executable
  ```
