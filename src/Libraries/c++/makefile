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

CC = zig c++

c_filename = mylib.cpp
bin_output_name = mylib

all: windows linux macOs

clean: clean_windows

windows:
	$(CC) -shared -o ".\\$(bin_output_name).dll" "$(c_filename)"

linux:
	$(CC) -shared -fPIC -o "$(bin_output_name).so" "$(c_filename)"

macOs:
	$(CC) -shared -o "$(bin_output_name).dylib" "$(c_filename)"

clean_windows: windows
	$(ifWindows) $(rm_command) ".\\$(bin_output_name).lib"
	$(ifWindows) $(rm_command) ".\\$(bin_output_name).pdb"

delete_bin:
	$(ifWindows) $(rm_command) ".\\$(bin_output_name).dll"
	$(ifWindows) $(rm_command) ".\\$(bin_output_name).so"
	$(ifWindows) $(rm_command) ".\\$(bin_output_name).dylib"