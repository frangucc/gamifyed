/*
 * user.cxx
 *
 *  Created on: Aug 6, 2015
 *      Author: rushi
 */

#include "user.hxx"

namespace std {

User::User(string First, string Last, string Email, unsigned short int Age) {
	first_ = First;
	last_ = Last;
	email_ = Email;
	age_ = Age;

}

User::~User() {
	// TODO Auto-generated destructor stub
}

} /* namespace std */
