//============================================================================
// Name        : Gamifyed-CLI.cpp
// Author      : Rushi Patel
// Version     :
// Copyright   : Your copyright notice
// Description : Hello World in C++, Ansi-style
//============================================================================

#include <stdio.h>
#include <algorithm>
#include <sqlite3.h>
#include <unistd.h>

using namespace std;

int name_in_db = 0;

static int callback_check_name(void *NotUsed, int argc, char **argv, char **Col){
   int i;
   for(i=0; i<argc; i++){
      if (argv[i]){
    	  printf("Welcome back, %s!\n", argv[i]);
    	  name_in_db = 1;
      }
   }
   printf("\n");
   return 0;
}

void clear_array(char array[]){
	char *begin = array;
	char *end = begin + sizeof(array);
	std::fill(begin, end, 0);
	return;
}


int main(int argc, char* argv[]) {
	pid_t pid;
	sqlite3 *db;
	char *zErrMsg=0;
	int rc;
	char user_in[16];
	char user_name[16];
	char buffer[256];
	const char *sql_get_col = "SELECT %s FROM %s";	//sprintf(buf, sql_get_col, col, table)
	const char *sql_insert_value="INSERT INTO %s(%s) VALUES('%s');"; //sprintf(buf, sql_insert_value, table, col, value)
	//const char *sql_drop_table;

	rc = sqlite3_open("test.db", &db);

	sprintf(buffer, sql_get_col, "NAME", "USERS");
	rc = sqlite3_exec(db, buffer, callback_check_name, 0, &zErrMsg);
	clear_array(buffer);
	if (name_in_db == 0){
		printf("What is your name? ");
		scanf("%s",user_in);
		char user_name[16] = {*user_in};
		clear_array(user_in);
		sprintf(buffer, sql_insert_value, "USERS", "NAME", user_name);
		rc = sqlite3_exec(db, buffer, 0, 0, 0);
		clear_array(buffer);
		printf("Welcome to Gamifyed, %s!\n", user_name);
	}
	sqlite3_close(db);
	pid = fork();
	if (pid == 0){
		system("./interactive-voxel-painter");
	}
	else if (pid > 0){
		printf("What would you like to do next? ");
		scanf("%s", user_in);
		printf("Goodbye, %s!", user_name);
	}
	return 0;
}



