const std = @import("std");

export fn add(a: i32, b: i32) i32 {
    return a + b;
}

pub export fn concatStrings(c_str1: [*c]u8, c_str2: [*c]u8) [*c]u8 {
    const allocator = std.heap.c_allocator;

    const result = std.fmt.allocPrint(allocator, "{s}{s}", .{ c_str1, c_str2 }) catch return null;

    return result.ptr;
}

fn c_strlen(s: [*c]u8) usize {
    var len: usize = 0;
    while (s[len] != 0) {
        len += 1;
    }
    return len;
}

pub export fn free_memory(ptr: [*c]u8) void {
    const allocator = std.heap.c_allocator;
    const len = c_strlen(ptr);
    allocator.free(ptr[0..len]);
}
