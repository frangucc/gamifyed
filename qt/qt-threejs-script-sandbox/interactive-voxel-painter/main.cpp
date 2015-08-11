#include <QApplication>
#include <QQmlContext>
#include <QQmlApplicationEngine>
#include "cli_interface.h"

int main(int argc, char *argv[])
{
    QApplication app(argc, argv);

    CLI_INTERFACE cli;


    QQmlApplicationEngine engine;
    engine.rootContext()->setContextProperty("cli", &cli);
    engine.load(QUrl(QStringLiteral("qrc:/interactive-voxel-painter.qml")));

    return app.exec();
}
