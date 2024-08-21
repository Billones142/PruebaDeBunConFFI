const std = @import("std");

fn c_strlen(s: [*c]u8) usize {
    var len: usize = 0;
    while (s[len] != 0) {
        len += 1;
    }
    return len;
}

fn memcpy(dest: []u8, src: []const u8) void {
    for (src) |byte, i| {
        dest[i] = byte;
    }
}

pub export fn concatStrings(c_str1: [*c]u8, c_str2: [*c]u8) [*c]u8 {
    const len1 = c_strlen(c_str1);
    const len2 = c_strlen(c_str2);
    const result_len = len1 + len2 + 1;

    const allocator = std.heap.c_allocator;
    var result = allocator.alloc(u8, result_len) catch return null;

    // Copiar la primera cadena
    memcpy(result[0..len1], c_str1[0..len1]);

    // Copiar la segunda cadena
    memcpy(result[len1..len1+len2], c_str2[0..len2]);

    result[result_len - 1] = 0; // Termina la cadena con null
    return result;
}

pub export fn free_memory(ptr: [*c]u8) void {
    const allocator = std.heap.c_allocator;
    allocator.free(ptr);
}
