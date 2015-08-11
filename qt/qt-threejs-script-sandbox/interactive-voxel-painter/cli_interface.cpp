#include "cli_interface.h"
#include <QTextStream>

#include <unistd.h>

CLI_INTERFACE::CLI_INTERFACE(QObject *parent) :
    QObject(parent),
    notifier(STDIN_FILENO, QSocketNotifier::Read)
{
    connect(&notifier, SIGNAL(activated(int)), this, SLOT(readIn()));
}

void CLI_INTERFACE::readIn(){
    QTextStream qin(stdin);
    cliIn = qin.readLine();
    if (cliIn.startsWith("R")){
        emit readyRead();
    }
    else if (cliIn.startsWith("W")){
        cliIn.remove(0,1);
        emit requestIn(cliIn);
    }
}


