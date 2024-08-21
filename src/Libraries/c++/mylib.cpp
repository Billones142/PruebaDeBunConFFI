// mylib.cpp
//#include <iostream>
#include <string>

extern "C"
{
    __declspec(dllexport) int add(int a, int b)
    {
        return a + b;
    }

    /*__declspec(dllexport) char *concatStrings(const char *str1, const char *str2)
    {
        size_t lenStr1 = strlen(str1);
        size_t lenStr2 = strlen(str2);
        char *result = (char *)malloc(lenStr1 + lenStr2 + 1); // +1 para el terminador nulo
        if (result == NULL)
        {
            return NULL; // Fallo en la asignación de memoria
        }
        snprintf(result, (lenStr1 + lenStr2 + 1), "%s%s", str1, str2);
        return result;
    }*/

    __declspec(dllexport) char *concatStrings(const char *cStr1, const char *cStr2) // version de c++ del manejo de strings de c
    {
        // Concatenate the strings using std::string
        std::string result = std::string(cStr1) + std::string(cStr2);

        // Dynamically allocate memory for the concatenated result
        char *cStr_result = (char *)malloc(result.length() + 1);

        // Copy the result into the dynamically allocated memory
        std::strcpy(cStr_result, result.c_str());

        // Return the pointer to the concatenated string
        return cStr_result;
    }

    __declspec(dllexport) void free_memory(char *ptr)
    {
        free(ptr);
    }
}
