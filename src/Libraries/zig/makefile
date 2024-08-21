.PHONY: clean all windows linux macOs clean_windows

# Detect OS
ifeq ($(OS),Windows_NT)
    detected_OS := Windows
else
    detected_OS := $(shell uname)
endif

# Set shell and command prefix based on OS
ifeq ($(detected_OS),Windows)
    ifWindows := powershell
    rm_command := Remove-Item
    shell := powershell.exe
else
    ifWindows :=
    rm_command := rm
    shell := /bin/sh
endif

SHELL := $(shell)  # Set the shell to use for executing commands

CC = zig build-lib

c_filename = mylib.zig
bin_output_name = mylib

all: windows linux macOs

clean: clean_windows

windows:
	$(CC) -target x86_64-windows-gnu -dynamic "$(c_filename)" -lc

linux:
	$(CC) -target x86_64-linux-gnu -dynamic "$(c_filename)" -lc

macOs:
	$(CC) -target x86_64-macos-gnu -dynamic "$(c_filename)" -lc

clean_windows: windows
	#$(ifWindows) $(rm_command) ".\\$(bin_output_name).dll.exp"
	#$(ifWindows) $(rm_command) ".\\$(bin_output_name).dll.lib"
	$(ifWindows) $(rm_command) ".\\.o"
	$(ifWindows) $(rm_command) ".\\$(bin_output_name).dll.obj"
	$(ifWindows) $(rm_command) ".\\$(bin_output_name).lib"
	$(ifWindows) $(rm_command) ".\\$(bin_output_name).pdb"

delete_bin:
	$(ifWindows) $(rm_command) ".\\$(bin_output_name).dll"
	$(ifWindows) $(rm_command) ".\\$(bin_output_name).so"
	$(ifWindows) $(rm_command) ".\\$(bin_output_name).dylib"