---
title: Migrator es una GUI para administrar migraciones de Laravel
description: Creada con Livewire, permite crear, migrar, eliminar y revertir las migraciones fácilmente.
img: migrator-es-una-gui-para-administrar-migraciones-de-laravel.jpg
date: 2022-01-05
category: Laravel
---
*Esta es una traducción libre de la noticia original de [Laravel News](https://laravel-news.com/migrator-gui-migration-manager-for-laravel/).*

[Migrator](https://github.com/rezaamini-ir/migrator) es una GUI para administrar migraciones de Laravel en el que pueden crear, migrar, eliminar y revertir las migraciones. Proporciona una interfaz simple creada con [Livewire](https://laravel-livewire.com/) que otorga mucha facilidad para ver el estado de cada migración, actualizar las migraciones usando su base de datos configurada y ejecutar migraciones:

![Migrator screenshot](/img/blog/migrator-es-una-gui-para-administrar-migraciones-de-laravel.jpg)

De forma predeterminada, la interfaz gráfica de `/migrator` está bloqueada a través del [middleware de autenticación](https://laravel.com/docs/8.x/authentication#protecting-routes) y puedes configurar tanto la ruta de la interfaz de usuario del migrador como el middleware (o grupo) que se ejecuta para la ruta del migrador.

Puedes obtener más información, instrucciones de instalación completas y ver el [código fuente](https://github.com/rezaamini-ir/migrator) de este paquete en GitHub.