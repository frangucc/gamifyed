/*
 * main.cxx
 *
 *  Created on: Aug 13, 2015
 *      Author: rushi
 */

#include <iostream>
#include <unistd.h>
#include <odb/sqlite/database.hxx>
#include <odb/database.hxx>
#include <odb/transaction.hxx>
#include <odb/schema-catalog.hxx>

#include "database.hxx"
#include "database-odb.hxx"
#include <wiringPi.h>
#include <wiringPiI2C.h>

using namespace std;
using namespace odb::core;

typedef unsigned char uchar;

void output_persist_currency(float curr){
	unsigned long id;
	std::auto_ptr<database> db (new odb::sqlite::database ("user.db", SQLITE_OPEN_READWRITE | SQLITE_OPEN_CREATE));	//creates or opens database

	{
	connection_ptr c (db->connection());
	}
	try{
		typedef odb::query<Database> query;
		typedef odb::result<Database> result;

		{
			transaction t (db->begin());
			result* r = new result(db->query<Database> (query::user.like("U_")));

			if (r->empty()){
				t.commit();
				cout << "You had no currency. You just earned " << curr << "dollars!" << endl;
				Database* currency = new Database("U1", curr);
				transaction t (db->begin());
				id = db->persist (currency);
				t.commit();
				delete currency;
			}
			else{
				result::iterator i (r->begin());
				float old_curr;
				old_curr = i->currency();
				t.commit();
				float new_curr = old_curr + curr;
				Database* currency = new Database("U1", new_curr);
				cout << "You had " << old_curr << "dollars. You just earned " << curr << "dollars!" << endl;
				cout << "Now you have " << new_curr << "dollars!" << endl;
				transaction t (db->begin());
				id = db->persist(currency);
				t.commit();
				delete currency;
			}
		}
	}
	catch (const odb::database_exception& e){
			const char * error1 = "no such table";
			if (strstr (e.what(),error1)){	//if schema doesn't exist, create schema
				transaction t (db->begin());
				schema_catalog::create_schema (*db);
				t.commit();
				output_persist_currency(curr);
				return;
			}
			return;
		}
}

float bytesToFloat(uchar b0, uchar b1, uchar b2, uchar b3)
{
    uchar byte_array[] = { b3, b2, b1, b0 };
    float result;
    std::copy(reinterpret_cast<const char*>(&byte_array[0]),
              reinterpret_cast<const char*>(&byte_array[4]),
              reinterpret_cast<char*>(&result));
    return result;
}

unsigned long retrieve_currency(int ard){
	uchar curr_1, curr_2, curr_3, curr_4;
	curr_1 = wiringPiI2CRead(ard);
	curr_2 = wiringPiI2CRead(ard);
	curr_3 = wiringPiI2CRead(ard);
	curr_4 = wiringPiI2CRead(ard);
	float curr = bytesToFloat(curr_1, curr_2, curr_3, curr_4);
	output_persist_currency(curr);
}

int main(int argc, char* argv[]){
	int ard;
	if (wiringPiSetup() == -1){
		cout << "Error setting up wiringPi." << endl;
	}
	if ((ard = wiringPiI2CSetup(0x04)) == -1){
		cout << "Error initializing I2C." << endl;
	}
	while (true){
		retrieve_currency(ard);
		usleep(10000000);
	}
}
