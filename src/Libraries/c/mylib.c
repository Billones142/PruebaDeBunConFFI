#include <stdio.h>
#include <stdlib.h>
#include <string.h>

__declspec(dllexport) char *concatStrings(const char *str1, const char *str2)
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
}

__declspec(dllexport) void free_memory(char *ptr)
{
    free(ptr);
}

__declspec(dllexport) int add(int a, int b)
{
    return (a + b);
}