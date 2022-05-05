#include <SPI.h>
#include <ArduinoJson.hpp>
#include <ArduinoJson.h>

void SerializeObject(float temp[])
{
    String json;
    StaticJsonDocument<300> doc;
    doc["sensor1"] = temp[0];
    doc["sensor2"] = temp[1];
    doc["sensor3"] = temp[2];
    doc["sensor4"] = temp[3];
    serializeJson(doc, json);
    Serial.println(json);
}

//MEDIDOR DE TEMPERARTURA.

#include "max6675.h"  //INCLUDE THE LIBRARY

int refresh = 500;  // tiempo que esta el LED en alto y bajo
unsigned long tiempoAnterior = 0;  //guarda tiempo de referencia para comparar

//Se definen los pines a usar para conectar los modulos MAX6675
int thermoDO = 9;
int thermoCS1 = 8;
int thermoCS2 = 7;
int thermoCS3 = 6;
int thermoCS4 = 5;
int thermoCLK = 13;

// Sensibilidad del sensor en V/A
float SENSIBILITY = 0.185;   // Modelo 5A
float current;
float currentRMS;
float power;
int SAMPLESNUMBER = 100;
 

MAX6675 thermocouple1(thermoCLK, thermoCS1, thermoDO);
MAX6675 thermocouple2(thermoCLK, thermoCS2, thermoDO);  
MAX6675 thermocouple3(thermoCLK, thermoCS3, thermoDO);
MAX6675 thermocouple4(thermoCLK, thermoCS4, thermoDO);

float t[] = {0,0,0,0};

float getCorriente(int samplesNumber)
{
   float voltage;
   float corrienteSum = 0;
   for (int i = 0; i < samplesNumber; i++)
   {
      voltage = analogRead(A0) * 5.0 / 1023.0;
      corrienteSum += (voltage - 2.5) / SENSIBILITY;
   }
   return(corrienteSum / samplesNumber);
}


void setup() {
  Serial.begin(9600); //activa comunicacion serial.
}


void loop() {   
   if(millis()-tiempoAnterior>=refresh){  //si ha transcurrido el periodo programado 
      
      //TEMPERATURA
      t[0] = thermocouple4.readCelsius();
      t[1] = thermocouple3.readCelsius();
      t[2] = thermocouple1.readCelsius();
      t[3] = thermocouple2.readCelsius();

      SerializeObject(t);
     //Leer y Escribir temperatura en grados Celsius.
//     for(int i = 0;i<4;i++){
//       if(t[i] > 1500)
//          t[i] = 0;
//        Serial.print(t[i]);
//        Serial.print(" ");
//     }
//      Serial.println("");
 /*   //CORRIENTE
      current = getCorriente(SAMPLESNUMBER);
      currentRMS = 0.707 * current;
      power = 230.0 * currentRMS;
  
     if (current < 0)
      current = 0;
     if (power < 0)
      power = 0; 
     Serial.print(current);
     Serial.print(" ");
     
     //Serial.println(power);
     Serial.println(current);*/
     tiempoAnterior=millis();  //guarda el tiempo actual como referencia
    }
}
