#include <Wire.h>

#define SLAVE_ADDRESS 0x04

int led_pin = 3;
int led_feedback = A0;
int led_state = LOW;
float currency = 0;
int counter = 0;
byte curr_1, curr_2, curr_3, curr_4;

void setup(){
  Wire.begin(SLAVE_ADDRESS);
  Wire.onRequest(sendData);
  Wire.onReceive(receiveData);
  pinMode(led_pin, OUTPUT);
  pinMode(led_feedback, INPUT);
}

void loop(){
  digitalWrite(led_pin, !led_state);
  if (led_feedback > 200){
    currency += 0.10;
  }
}

void sendData(){
  union {
    float dec;
    byte bytes[4];
  } curr;
  curr.dec = currency;
  switch(counter){
    case 0:
      Wire.write(curr.bytes[0]);
      counter++;
      break;
    case 1:
      Wire.write(curr.bytes[1]);
      counter++;
      break;
    case 2:
      Wire.write(curr.bytes[2]);
      counter++;
      break;
    case 3:
      Wire.write(curr.bytes[3]);
      counter = 0;
      break;
  }
}

void receiveData(int e){
  return;
}
  
