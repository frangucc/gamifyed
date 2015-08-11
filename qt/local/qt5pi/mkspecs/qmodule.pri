CONFIG +=  cross_compile compile_examples qpa largefile precompile_header enable_new_dtags pcre
QT_BUILD_PARTS +=  libs tools
QT_NO_DEFINES =  ALSA CUPS EGL_X11 FONTCONFIG GLIB IMAGEFORMAT_JPEG LIBPROXY OPENSSL OPENVG PULSEAUDIO SSL STYLE_GTK TSLIB XRENDER ZLIB
QT_QCONFIG_PATH = 
host_build {
    QT_CPU_FEATURES.x86_64 =  mmx sse sse2
} else {
    QT_CPU_FEATURES.arm = 
}
QT_COORD_TYPE = double
QT_LFLAGS_ODBC   = -lodbc
styles += mac fusion windows
DEFINES += QT_NO_MTDEV
DEFINES += QT_NO_LIBUDEV
DEFINES += QT_NO_TSLIB
DEFINES += QT_NO_LIBINPUT
QMAKE_X11_PREFIX = /usr
sql-drivers = 
sql-plugins =  sqlite
