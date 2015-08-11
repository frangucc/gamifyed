#ifndef CLI_INTERFACE_H
#define CLI_INTERFACE_H

#include <QObject>
#include <QSocketNotifier>

class CLI_INTERFACE : public QObject
{
    Q_OBJECT
public:
    explicit CLI_INTERFACE(QObject *parent = 0);

signals:
    void readyRead();
    void requestIn(QString req);
    void readyWrite();
    void cliOutChanged(QString);

public slots:
    void readIn();

private:
    QString cliIn;
    QString cliOut;
    QSocketNotifier notifier;

};

#endif // CLI_INTERFACE_H
