//============================================================================
// Name        : Gamifyed-CLI.cxx
// Author      : Rushi Patel
// Version     :
// Copyright   :
// Description : Initializes a database name "user.db" if one doesn't exist. Checks if user data exists.
//							 If yes, the program welcomes back the user and creates a user object.
//							 If no, the program will ask the user for information and create a user object and persist that to the database.
//============================================================================

//User class includes: first name, last name, email address, and age. First argument in object declaration must be "U1" for query purposes.
//To add more members to class, modify class and constructor files and recompile using odb and g++ compiler.

#include <stdio.h>
#include <string.h>
#include <iostream>
#include <odb/sqlite/database.hxx>
#include <odb/database.hxx>
#include <odb/transaction.hxx>
#include <odb/schema-catalog.hxx>
#include <memory>
#include "user.hxx"
#include "user-odb.hxx"


using namespace std;
using namespace odb::core;


bool init_check_database(){
	unsigned long user_id;
	std::auto_ptr<database> db (new odb::sqlite::database ("user.db", SQLITE_OPEN_READWRITE | SQLITE_OPEN_CREATE));	//creates or opens database

	{
	connection_ptr c (db->connection());
	}
	try{



		typedef odb::query<std::User> query;
		typedef odb::result<std::User> result;

		{
			transaction t (db->begin ());
			result* r = new result(db->query<std::User> (query::user.like("U_")));	//query for user data with id U_ e.g. U1

			if (r->empty()){	//check if user data in database
				t.commit();
				cout << "Welcome to the Gamifyed CLI!" << endl << endl;
				cout << "Since this is your first time entering the game, you will have to provide some information to get set up." << endl;
				cout << endl << "Please enter your first name: ";
				string user_first;
				cin >> user_first;
				cout <<"Please enter your last name: ";
				string user_last;
				cin >> user_last;
				cout << "Please enter your email address: ";
				string user_email;
				cin >> user_email;
				cout <<"Please enter your age: ";
				unsigned short user_age;
				cin >> user_age;
				cout << endl << "Great! Welcome to Gamifyed, " << user_first << "! Now we will check for updates." << endl;
				User* user = new std::User("U1", user_first, user_last, user_email, user_age);	//create user object for use in program
				transaction t (db->begin());
				user_id = db->persist (user);	 //commits user object to database, database will sync immediately so no data is lost if system crashes
				t.commit();
			}
			else{
				result::iterator i (r->begin());
				User* user = new User(i->user(), i->first(), i->last(), i->email(), i->age());	//create user object from existing data
				t.commit();
				cout << endl << "Welcome back, " << user->first() << "! Now we will check for updates." << endl << endl;
			}
		}

		return true;
	}
	catch (const odb::database_exception& e){
		const char * error1 = "no such table";
		if (strstr (e.what(),error1)){	//if schema doesn't exist, create schema
			transaction t (db->begin());
			schema_catalog::create_schema (*db);
			t.commit();
			if (init_check_database()){
				return true;
			}
		}
		return false;
	}
}

int main (int argc, char* argv[]){
	init_check_database();
	return 0;
}
