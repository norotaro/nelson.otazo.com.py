---
title: Texto enriquecido para Laravel
description: Integra el editor Trix en Laravel para almacenar, crear y actualizar texto enriquecido en tus modelos.
img: texto-enriquecido-para-laravel.png
date: 2021-09-17
category: Laravel
---
*Ver la [noticia original](https://laravel-news.com/laravel-octane) en inglés de [Laravel News](https://laravel-news.com/)*

[Rich Text Laravel](https://github.com/tonysm/rich-text-laravel) integra el editor Trix con Laravel y está inspirado en la gema Action Text de Rails.

Este paquete proporciona todo lo necesario para almacenar, crear y actualizar texto enriquecido en modelos asociados utilizando el [editor Trix](https://trix-editor.org/):

- Diseño de esquema de base de datos para facilitar la asociación de texto enriquecido con modelos
- Manejar archivos adjuntos y cargas de imágenes
- Soporte para [content attachments](https://github.com/basecamp/trix#inserting-a-content-attachment) de Trix.
- Recuperación de objetos de contenido, como archivos adjuntos, enlaces, etc.
- Representación de texto sin formato

Este paquete es flexible, ya que puede usarlo de la forma recomendada o un formato más ligero que le permite almacenar texto enriquecido en cualquier modelo:

1. Utilice la estructura de base de datos proporcionada en el paquete, donde todo el contenido enriquecido se almacena fuera del modelo con contenido enriquecido asociado.
2. Utilice el *trait* `AsRichTextContent` del paquete para *castear* un campo de contenido enriquecido en cualquier modelo.

A continuación se muestra un ejemplo con el punto #1 anterior, que es un modelo `Post` que tiene dos campos de texto enriquecidos:

```php{9-11}[Post.php]
use Tonysm\RichTextLaravel\Models\Traits\HasRichText;
 
class Post extends Model
{
    use HasRichText;
 
    protected $guarded = [];
 
    protected $richTextFields = [
        'body',
        'notes',
    ];
}
```

El paquete también se encarga de las consultas con los datos de texto enriquecido:

```php
// Carga todos los campos de texto enriquecido (1 consulta para cada campo, ya que cada uno tiene su relación)
Post::withRichText()->get();
 
// Carga solo un campo específico:
Post::withRichText('body')->get();
 
// Carga algunos campos específicos (pero no todos):
Post::withRichText(['body', 'notes'])->get();
```

El archivo [readme](https://github.com/tonysm/rich-text-laravel/blob/main/README.md) del paquete tiene muchos ejemplos e instrucciones sobre cómo empezar. Puedes obtener más información sobre este paquete, obtener instrucciones de instalación completas y ver el [código fuente](https://github.com/tonysm/rich-text-laravel) en GitHub.