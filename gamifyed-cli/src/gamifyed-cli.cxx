//============================================================================
// Name        : Gamifyed-CLI.cxx
// Author      : Rushi Patel
// Version     :
// Copyright   :
// Description :
//============================================================================

#include <stdio.h>
#include <odb/sqlite/database.hxx>
#include <odb/database.hxx>
#include <odb/transaction.hxx>
#include <odb/schema-catalog.hxx>
#include <memory>
#include "user.hxx"
//TODO: #include "user-odb.hxx" -- generate this using odb command


using namespace std;
using namespace odb::core;

typedef odb::query<User> query;
typedef odb::result<User> result;

int main (int argc, char* argv[]){
	return 0;
}

bool init_check_database(){
	unsigned long user_id;
	try{
		auto_ptr<database> db (new odb::sqlite::database ("user.db", SQLITE_OPEN_READWRITE | SQLITE_OPEN_CREATE));
		connection_ptr c (db->connection());

		{
			transaction t (db->begin());
			result* r = new result(db->query<User> (query::id == 1));

			if (r->empty()){
				t.commit();
				printf("Welcome to the Gamifyed CLI!\n\n");
				printf("Since this is your first time entering the game, you will have to provide some information to get set up.\n")
				printf("Please enter your first name: ");
				string user_first;
				scanf("%s", user_first);
				printf("Please enter your last name: ");
				string user_last;
				scanf("%s", user_last);
				printf("Please enter your email address: ");
				string user_email;
				scanf("%s", user_email);
				printf("Please enter your age: ");
				unsigned short user_age;
				scanf("%i", user_age);
				printf("Great! Welcome to Gamifyed, %s! Now we will check for updates.", user_first);
				User* user = new User(user_first, user_last, user_email, user_age);
				transaction t (db->begin());
				user_id = db->persist (user);
				t.commit();
			}
		}

		return true;
	}
	catch (const odb::exception& e){
		return false;
	}
}
