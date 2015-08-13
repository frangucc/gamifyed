/* Servo Rotation (I2C controlled)
 
 Author: Rushi Patel (Gamifyed)
 
 This program waits for input from I2C bus (Raspberry Pi). When input is received in the correct format ([servo or actuator, top servo angle or actuator direction, top servo direction,
 bottom servo angle, bottom servo direction]), the microcontroller will interpret the input and either ease the servos to position or raise/lower the actuator. 
 
 Actuator pins: 
 PWM- = 5
 PWM+ = 6
 
 Servo Pins:
 Top PWM = 10
 Bottom PWM = 9
 
 Actuator uses H-bridge for direction control.
 
 Version 2: Improved documentation
 Protocol definition
 */


//Import the Arduino libraries used: Wire(I2C) and Servo
#include <Wire.h>
#include <Servo.h>

#define I2C_SLAVE_ADDRESS 0x04 //I2C bus address for the Arduino (Sync with RPi)
#define SERIAL_BAUDRATE 9600 //Baudrate for serial communication
#define BOTTOMSERVO_UP 1330

//actuator definitions (don't need to be variables)
#define ACTUATOR_UP 5
#define ACTUATOR_DOWN 6

//Servo variable definition
Servo topServo;
Servo bottomServo;

int receivedI2C[16];
byte sentI2C[2];
byte NULL_ARRAY[2] = {
  0x00,0x00};
byte signX;
byte signY;
int topServo_diff;
int bottomServo_diff;
int maxDiff;
int topServo_current = 0;
int bottomServo_current = BOTTOMSERVO_UP;

void setup(){
  Serial.begin(SERIAL_BAUDRATE);
  Wire.begin(I2C_SLAVE_ADDRESS);
  Wire.onReceive(receiveI2C);
  Wire.onRequest(sendI2C);
  topServo.attach(10);
  bottomServo.attach(9);

  //initial position of servos
  topServo.writeMicroseconds(0);
  bottomServo.writeMicroseconds(BOTTOMSERVO_UP);
}

void loop(){
  delay(100);
}

void receiveI2C(int bytes_incoming){
  sentI2C[0] = 0x04;
  sentI2C[1] = 0xF0;
  int countUp = 0;
  while (Wire.available()){
    receivedI2C[countUp] = Wire.read();
    Serial.println(receivedI2C[countUp]);
    countUp++;
  }
  if (receivedI2C[0] != 0x04){
    Serial.println("Error code 0: Incoming daa is invalid");
    sentI2C[0] = 0x04;
    sentI2C[1] = 0x00;
    return;
  }
  switch (receivedI2C[2]){
  case 0x01:
    maxDiff = 0;
    servoMoveTo(receivedI2C[3], receivedI2C[4], receivedI2C[5]);
    sentI2C[0] = 0x04;
    sentI2C[1] = 0xFF;
    break;
  case 0x02:
    maxDiff = 0;
    sleepMode(receivedI2C[3]);
    sentI2C[0] = 0x04;
    sentI2C[1] = 0xFF;
    break;
  default:
    Serial.println("Error code 1: Invalid command. Please check documentation");
    sentI2C[0] = 0x04;
    sentI2C[1] = 0x01;
  }
  memset(receivedI2C, 0, sizeof(receivedI2C));
}

void sendI2C(){
  if (sentI2C[0] != 0x04){
    Wire.write(NULL_ARRAY, 2);
    return;
  }
  Wire.write(sentI2C, 2);
}

void servoMoveTo(int angleX, int angleY, int dir){
  switch (dir){
  case 0:
    signX = 1;
    signY = 1;
    break;
  case 1:
    signX = -1;
    signY = 1;
    break;
  case 2:
    signX = 1;
    signY = -1;
    break;
  case 3:
    signX = -1;
    signY = -1;
    break;
  default:
    signX = 0;
    signY = 0;
  }
  bottomServo_diff = ((angleX * 5.55) * signX);
  topServo_diff = ((angleY * 5.55) * signY);
  bottomServo_current += bottomServo_diff;
  topServo_current += topServo_diff;
  Serial.println(bottomServo_current);
  Serial.println(topServo_current);
  bottomServo.writeMicroseconds(bottomServo_current);
  topServo.writeMicroseconds(topServo_current);
  delay(10);
}

void sleepMode(int mode){
  switch (mode){
    case 0:
      maxDiff = topServo_current;
      signY = -1;
      if (bottomServo_current > BOTTOMSERVO_UP){
        signX = -1;
      }
      else if (bottomServo_current < BOTTOMSERVO_UP){
        signX = 1;
      }
      for (maxDiff; maxDiff > 0; maxDiff--){
        if (topServo_current != 0){
          topServo_current += signY;
          topServo.writeMicroseconds(topServo_current);
        }
        if (bottomServo_current != BOTTOMSERVO_UP){
          bottomServo_current += signX;
          bottomServo.writeMicroseconds(bottomServo_current);
        }
        delay(1);
      }
      break;
    case 1:
      for (int i = 0; i < 1500; i += 10){
        topServo.writeMicroseconds(i);
        delay(25);
      }
      topServo_current = 1500;
      break;
  }
}
