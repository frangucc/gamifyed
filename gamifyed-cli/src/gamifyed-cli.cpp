//============================================================================
// Name        : Gamifyed-CLI.cpp
// Author      : Rushi Patel
// Version     :
// Copyright   : Your copyright notice
// Description : Hello World in C++, Ansi-style
//============================================================================

#include <stdio.h>
#include <iostream>
#include <stdlib.h>
#include <string.h>
#include <sqlite3.h>

using namespace std;

int name_in_db = 0;

static int callback(void *NotUsed, int argc, char **argv, char **azColName){
   int i;
   if (argc == 0){
	   name_in_db = 0;
	   return 0;
   }
   for(i=0; i<argc; i++){
      if (argv[i]){
    	  printf("Welcome back, %s!\n", argv[i]);
    	  name_in_db = 1;
      }
   }
   printf("\n");
   return 0;
}

int main(int argc, char* argv[]) {
	sqlite3 *db;
	char *zErrMsg=0;
	int rc;
	char *sql;
	char* name_in;
	char *ErrComp = "no such table: USERS";

	rc=sqlite3_open("test.db", &db);

	sql="SELECT NAME FROM USERS";

	rc = sqlite3_exec(db, sql, callback, 0, &zErrMsg);
	if( rc != SQLITE_OK ){
	if (*zErrMsg == *ErrComp)
			{
				sql="CREATE TABLE USERS("
						"NAME PRIMARY TEXT NOT NULL"
						")";
				rc = sqlite3_exec(db, sql, callback, 0, &zErrMsg);

			}
	}
	if (name_in_db == 0){
		printf("What is your name? ");
		name_in = "Rushi";
		sprintf(sql, "INSERT INTO USERS (NAME)"
				"VALUES (%s)",name_in);
		rc = sqlite3_exec(db, sql, callback, 0, &zErrMsg);
		printf("Welcome, %s!\n", name_in);
	}
	sqlite3_close(db);
	return 0;
}
