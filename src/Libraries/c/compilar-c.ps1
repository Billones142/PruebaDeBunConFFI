# Compilar para Windows (.dll)
zig cc -shared -o mylib.dll mylib.c

# Compilar para Linux (.so)
zig cc -shared -fPIC -o mylib.so mylib.c

# Compilar para macOS (.dylib)
zig cc -shared -o mylib.dylib mylib.c
