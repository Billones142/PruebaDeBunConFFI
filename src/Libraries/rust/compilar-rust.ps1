# Build for Windows (.dll)
rustc --crate-type=cdylib mylib.rs -o mylib.dll

# Build for Linux (.so)
rustc --crate-type=cdylib mylib.rs -o mylib.so

# Build for macOS (.dylib)
rustc --crate-type=cdylib mylib.rs -o mylib.dylib