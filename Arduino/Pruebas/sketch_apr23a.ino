#include <ArduinoJson.hpp>
#include <ArduinoJson.h>

void SerializeObject(int i)
{
    String json;
    StaticJsonDocument<300> doc;
    doc["sensor1"] = random(20, 23);
    doc["sensor2"] = random(23, 25);
    doc["sensor3"] = random(24, 28);
    doc["sensor4"] = random(31, 33);
    serializeJson(doc, json);
    Serial.println(json);
}

int i = 0;



void setup() {
  Serial.begin(9600); //activa comunicacion serial.
}


void loop() {
  delay(1000);
  SerializeObject(i);
  i++;
  if (i > 50){
    i= 0;
  }

}
