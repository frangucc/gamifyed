#Instructions for setting up cross-compilation of C++ apps (using ODB)
1. Set up PATH environment variable for cross-compiler. The cross-compiler is included in the qt folder of this repository.
  ```shell

  cd /path_to_this_repo/qt/gcc-4.7-linaro-rpi-gnueabihf/
  export PATH=`pwd`/bin:$PATH
  arm-linux-gnueabihf-g++ --version
  ```
  *The output of the last command should be the version of the g++ compiler*
2. Make a directory to build and install headers, libraries, sources, etc.
  ```shell

  mkdir ~/rpi_odb
  cd ~/rpi_odb
  ```
3.  Download the odb-X.Y.Z-x86_64-linux-gnu.tar.gz, libodb-X.Y.Z.tar.gz, libodb-sqlite-X.Y.Z.tar.gz files from [here](http://www.codesynthesis.com/products/odb/download.xhtml) and extract them.
  ```shell

  tar xfz odb-X.Y.Z-x86_64-linux-gnu.tar.gz
  tar xfz libodb-X.Y.Z.tar.gz
  tar xfz libodb-sqlite-X.Y.Z.tar.gz
  ```
4. Download the sqlite-autoconf-XYZ.tar.gz from [here](https://www.sqlite.org/download.html) and extract it.
  ```shell

  tar xfz sqlite-autoconf-XYZ.tar.gz
  ```
5. Enter the SQLite directory and install it.
  ```shell

  cd sqlite-autoconf-XYZ
  ./configure CFLAGS="-Os DSQLITE_ENABLE_UNLOCK_NOTIFY=1" --disable-shared --host=arm-linux-gnueabihf --prefix=`pwd`/../install/
  make
  make install
  ```
6. Enter the libodb directory and install it.
  ```shell

  cd ../libodb-X.Y.Z
  ./configure CXXFLAGS="-Os" --disable-shared --host=arm-linux-gnueabihf --prefix=`pwd`/../install
  make
  make install
  ```
7. Enter the libodb-sqlite directory and install it.
  ```shell

  cd ../libodb-sqlite-X.Y.Z
  ./configure CXXFLAGS="-Os" CPPFLAGS="-I`pwd`/../install/include" LDFLAGS="-L`pwd`/../install/lib" --disable-shared --host=arm-linux-gnueabihf --prefix=`pwd`/../install
  make
  make install
  ```
8. Permanently add the ODB compiler to the PATH environment variable.
  ```shell

  nano ~/.bashrc
  Add to the bottom: export PATH=$PATH:$HOME/rpi_odb/odb-X.Y.Z-x86_64-linux-gnu/bin
  source ./bashrc
  ```
9. At this point, you are ready to cross-compile C++ applications for the Raspberry Pi. To compile the object class header, you must user the ODB compiler as such:
  ```shell

  odb -d sqlite --generate-query --generate-schema CLASS.hxx
  ```
10. Next, build everything with the cross-compiler.
  ```shell

  arm-linux-gnueabihf-g++ -I~/rpi_odb/install/include -Os -c GENERATED-ODB.cxx
  arm-linux-gnueabihf-g++ -I~/rpi_odb/install/include -Os -c -DDATABASE_SQLITE MAIN.cxx
  arm-linux-gnueabihf-g++ -L~/rpi_odb/install/lib -o MAIN MAIN.o GENERATED-ODB.o -lodb-sqlite -lodb
  ./MAIN
  ```
