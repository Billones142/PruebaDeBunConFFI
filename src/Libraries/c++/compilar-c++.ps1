# Compilar para Windows (.dll)
zig c++ -shared -o mylib.dll mylib.cpp

# Compilar para Linux (.so)
zig c++ -shared -fPIC -o mylib.so mylib.cpp

# Compilar para macOS (.dylib)
zig c++ -shared -o mylib.dylib mylib.cpp
