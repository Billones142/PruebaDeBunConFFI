#[no_mangle]
pub extern "C" fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[no_mangle]
pub extern "C" fn concatStrings(c_str1: *const u8, c_str2: *const u8) -> *mut u8 {
    unsafe {
        // Convert the C-style strings (null-terminated) to Rust strings
        let str1 = std::ffi::CStr::from_ptr(c_str1 as *const i8)
            .to_str()
            .unwrap();
        let str2 = std::ffi::CStr::from_ptr(c_str2 as *const i8)
            .to_str()
            .unwrap();

        // Concatenate the strings
        let result = format!("{}{}", str1, str2);

        // Convert the result to a C-style string
        let c_str_result = std::ffi::CString::new(result).unwrap();

        // Allocate memory and return the pointer to the concatenated string
        c_str_result.into_raw() as *mut u8
    }
}

// This function should be used to free the memory allocated by concat_strings
#[no_mangle]
pub extern "C" fn free_memory(s: *mut u8) {
    if s.is_null() {
        return;
    }
    unsafe {
        // Convert back to a CString and explicitly drop it to free the memory
        let _ = std::ffi::CString::from_raw(s as *mut i8);
        // The CString will be dropped here, freeing the memory
    }
}