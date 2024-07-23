# Build for Windows (.dll)
zig build-lib -target x86_64-windows-gnu -dynamic mylib.zig

# Build for Linux (.so)
zig build-lib -target x86_64-linux-gnu -dynamic mylib.zig

# Build for macOS (.dylib)
zig build-lib -target x86_64-macos-gnu -dynamic mylib.zig
