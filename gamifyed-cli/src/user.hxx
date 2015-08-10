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

#pragma db object
class User {
public:
	User (  string user,
			string first,
			string last,
			string email,
			unsigned short age);
	virtual ~User();

	string user() const{
		return user_;
	}

	string first() const{
		return first_;
	}

	string last() const{
		return last_;
	}

	string email() const{
		return email_;
	}

	unsigned short age() const{
		return age_;
	}

private:
	User () {}

	friend class odb::access;

	#pragma db id auto
	unsigned long id_;
	string user_;
	string first_;
	string last_;
	string email_;
	unsigned short age_;
};

} /* namespace std */

#endif /* USER_HXX_ */
