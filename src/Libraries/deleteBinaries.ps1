# Ruta del directorio donde quieres buscar
$directoryPath = $PSScriptRoot

# Extensiones de archivo que quieres eliminar
$fileExtensions = @("*.dll", "*.so", "*.dylib")

foreach ($extension in $fileExtensions) {
    # Buscar todos los archivos con la extensión actual
    $files = Get-ChildItem -Path $directoryPath -Recurse -Filter $extension

    # Recorrer cada archivo y eliminarlo
    foreach ($file in $files) {
        try {
            Remove-Item -Path $file.FullName -Force
        } catch {
            Write-Host "Failed to delete: $($file.FullName) - $_"
        }
    }
}
