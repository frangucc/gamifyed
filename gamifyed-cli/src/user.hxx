/*
 * user.hxx
 *
 *  Created on: Aug 6, 2015
 *      Author: rushi
 */

#ifndef USER_HXX_
#define USER_HXX_

#include <string>
#include <odb/core.hxx>
#include <odb/nullable.hxx>

namespace std {

class User {
public:
	User (  string first,
			string last,
			string email,
			unsigned short age);
	virtual ~User();

	string first() const;

	string last() const;

	string email() const;

	unsigned short age() const;

private:
	User () {}

	friend class odb::access;

	unsigned long id_;
	string first_;
	string last_;
	string email_;
	unsigned short age_;
};

} /* namespace std */

#endif /* USER_HXX_ */
