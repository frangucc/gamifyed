/*
 * database.cxx
 *
 *  Created on: Aug 13, 2015
 *      Author: rushi
 */

#include "database.hxx"
using namespace std;

Database::Database(string User, unsigned long Currency) {
	user_ = User;
	currency_ = Currency;

}

Database::~Database() {
	// TODO Auto-generated destructor stub
}

