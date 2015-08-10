//============================================================================
// Name        : Gamifyed-CLI.cxx
// Author      : Rushi Patel
// Version     :
// Copyright   :
// Description :
//============================================================================

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
	std::auto_ptr<database> db (new odb::sqlite::database ("user.db", SQLITE_OPEN_READWRITE | SQLITE_OPEN_CREATE));

	{
	connection_ptr c (db->connection());
	}
	try{



		typedef odb::query<std::User> query;
		typedef odb::result<std::User> result;

		{
			transaction t (db->begin ());
			result* r = new result(db->query<std::User> (query::user.like("U_")));

			if (r->empty()){
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
				User* user = new std::User("U1", user_first, user_last, user_email, user_age);
				transaction t (db->begin());
				user_id = db->persist (user);
				t.commit();
			}
			else{
				result::iterator i (r->begin());
				User* user = new User(i->user(), i->first(), i->last(), i->email(), i->age());
				t.commit();
				cout << "Welcome back, " << user->first() << "!" << endl;
			}
		}

		return true;
	}
	catch (const odb::database_exception& e){
		const char * error1 = "no such table";
		if (strstr (e.what(),error1)){
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
