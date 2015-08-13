/*
 * database.hxx
 *
 *  Created on: Aug 13, 2015
 *      Author: rushi
 */

#ifndef DATABASE_HXX_
#define DATABASE_HXX_

#include <string>
#include <odb/core.hxx>
#include <odb/nullable.hxx>

namespace std{

#pragma db object
class Database {
public:
	Database(string user, float currency);

	string user() const{
		return user_;
	}

	float currency() const{
		return currency_;
	}
	virtual ~Database();
private:
	Database() {}
	friend class odb::access;

	#pragma db id auto
	unsigned long id_;
	string user_;
	float currency_;
};
}

#endif /* DATABASE_HXX_ */
