# I2C communication between Raspberry Pi and Arduino
I2C is a serial data communication protocol that is especially useful for communication between the Pi and the Arduino. Both devices have I2C support and only three wires are needed to establish communication. I2C, for typical applications, has one master device, in this case the Pi, that coordinates communication between multiple slave devices, in this case the Arduino. Since the Pi is the master, the voltage level difference between the Pi and the Arduino doesn't matter. Only the master can pull up the data and clock lines and the slave devices can only pull the lines down. Arduino has its own library (Wire) for I2C communication. The Pi uses smbus to communicate on the I2C bus and supports multiple languages, such as Python, C, and C++.

## SMBus protocol (python)
We will use python for basic setup of I2C. Other languages are extremely similar in this regard. SMBus has the following methods:
  ```python

write_quick(addr)  # Quick transaction
read_byte(addr)  # reads one byte from address
write_byte(addr, val)  # writes one byte to address
read_byte_data(addr, cmd)  # reads one byte from address from a designated register
write_byte_data(addr, cmd, val)  # writes one byte to address to a designated register
read_word_data(addr, cmd)  # reads two bytes from address from a designated register
write_word_data(addr, cmd, val)  # writes two bytes to address to a designated register
process_call(addr, cmd, val)  # writes then reads two bytes from a designated register
read_block_data(addr, cmd)  # reads up to 32 bytes from address
write_block_data(addr, cmd, vals) # writes up to 32 bytes to address
block_process_call(addr, cmd, vals)  # writes then reads up to 31 bytes from a designated register
read_i2c_block_data(addr, cmd)  # reads a block of bytes from a device
write_i2c_block_data(addr, cmd, vals)  # writes a block of bytes to device
  ```  

This list is quite extensive, but for communication between the Arduino and the Pi, four of these are the most commonly used:
  ```python

read_byte(addr)  
write_byte(addr, val)
read_block_data(addr, cmd)
write_block_data(addr, cmd, vals)
  ```

#### Code examples
---
**Initializing the SMBus library - IMPORTANT -**  
The smbus library must be imported and the i2c device must be initalized as follows:
  ```python

from smbus import SMBus
bus = SMBus(0)
dev_address = ADDRESS_OF_ARDUINO
  ```

**Reading one byte from Arduino**
  ```python

buffer = bus.read_byte(dev_address)
  ```

**Writing one byte to Arduino**
  ```python

bus.write_byte(dev_address, byte_to_write)
  ```

**Reading a block of bytes (up to 32) from Arduino**
  ```python

buffer = []
buffer = bus.read_block_data(dev_address, 0)
  ```

**Writing a block of bytes (up to 32) from Arduino**
  ```python

bus.write_block_data(dev_address, length_of_data, data_array)
  ```

## Arduino Wire library
Like with the Pi, the Arduino wire library must be initialized. Since Arduino uses C, the initialization is a little bit more extensive.
  ```c

#include <Wire.h> //include wire library

#define i2c_addr ADDRESS //e.g. 0x04 - define slave address of Arduino

void setup(){
  Wire.begin(i2c_addr);  //initialize wire library
  Wire.onRequest(sendData);  //assign sendData function to request command
  Wire.onReceive(receiveData);  //assign receiveData function to receive command
}
  ```

Arduino has two functions for I2C communication. One is for receiving data from the master, and one is for sending data to the master. The Arduino can only send data to the Pi when it requests data (when running a read command on Pi). Whenever the Pi requests data, the sendData function is called. Whenever the Pi sends data, the receiveData function is called. I2C has global interrupts on the Arduino, so any function that is currently running will be stopped until the I2C request is resolved.
#### Code examples
---
**Example sendData function**
  ```c

void sendData(){  //called whenever the Pi requests data
  Wire.write(data);
}
  ```

**Example receiveData function**
  ```c

void receiveData(int e){  //called whenever the Pi sends data - integer e is the number of bytes incoming
  int buffer[32];  //initialize a buffer array to capture incoming bytes
  int counter = 0;  //buffer array position counter to insert data
  while (Wire.available()){ //test if there are still incoming bytes
    int c = Wire.read();  //read one byte from i2c bus
    buffer[counter] = c;  //append that byte to the buffer array
    counter++;  //increment the counter
  }
}
  ```
## Wiring the Pi and the Arduino
The I2C protocol is such a simple protocol and that translates to the wiring as well. All you need to do is wire three pins together and you are good to go. The wiring is as follows:
  - Arduino SDA pin (or A4) to Pi GPIO 02 (pin 3)
  - Arduino SCL pin (or A5) to Pi GPIO 03 (pin 5)
  - Arduino GND to Pi GND (pin 6)

After the wiring is complete, the devices are ready to talk to each other. Since the Pi is the master, you won't need to worry about the voltage level difference between the Pi and the Arduino.
