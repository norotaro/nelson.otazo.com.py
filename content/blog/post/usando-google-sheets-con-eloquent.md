---
title: Usando Google Sheets con Eloquent
description: Eloquent Sheets es un paquete que permite trabajar con Google Sheets a través de modelos Eloquent
img: usando-google-sheets-con-eloquent.png
date: 2021-03-21
category: Laravel
---
Eloquent Sheets es un [paquete](https://github.com/grosv/eloquent-sheets?ref=laravelnews) de Ed Grosvenor que permite trabajar con Google Sheets a través de modelos Eloquent:

> Este paquete proporciona un modelo Eloquent que funciona sobre una hoja de Google. Para que funcione hay dos requisitos que debe tener su hoja, una fila de encabezado que contenga el nombre de las columnas (por defecto es la fila 1 pero puede ser cualquier fila de la hoja) y una columna de clave primaria. Eloquent asume que su columna de clave principal se llama id. Si no es así debes configurarlo en el modelo como lo haría normalmente.

Pasa por el archivo [Readme](https://github.com/grosv/eloquent-sheets/blob/master/README.md) para configurarlo y, una vez que tenga un modelo generado, se verá como el siguiente ejemplo:

```php [MyModel.php]
use Grosv\EloquentSheets\SheetModel;

class YourGoogleSheetsModel extends SheetModel
{
    // El id de la hoja de cálculo
    protected $spreadsheetId = '1HxNqqLtc614UVLoTLEItfvcdcOm3URBEM2Zkr36Z1rE';
    // El id de la hoja (gid=xxxxx on the URL)
    protected $sheetId = '0';
    // La fila que contiene los nombres de las columnas
    protected $headerRow = '1';
}
```

Con el modelo para Google Sheet puede utilizar funciones básicas de eloquent; sin embargo, el modelo solo puede usar métodos de lectura y lista en este momento. Actualizar e insertar no funcionará pero este paquete facilita una forma de leer los datos de la hoja con Eloquent. Es posible que se agreguen funciones de inserción y actualización en el futuro.

Si desea obtener más información sobre este paquete visita la página en GitHub [grosv/eloquent-sheets](https://github.com/grosv/eloquent-sheets?ref=laravelnews).