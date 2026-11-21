---
title: 'Presentando Filament Modular Starter'
description: 'Un kit de inicio de Laravel 13 y Filament 5 para aplicaciones que crecen por módulos y atienden a cada tipo de usuario con su propio panel de Filament.'
date: 2026-11-20
category: Laravel
tags: [laravel, filament, starter-kit]
translationKey: filament-modular-starter
---
Acabo de publicar [Filament Modular Starter](https://github.com/norotaro/filament-modular-starter), un kit de inicio de código abierto (MIT) para Laravel 13 y Filament 5. Está pensado para aplicaciones que crecen por módulos y atienden a cada tipo de usuario con su propio panel de Filament.

```bash
laravel new my-app --using=norotaro/filament-modular-starter
```

## El problema que resuelve

Una aplicación con Filament suele empezar con un único panel de administración y un directorio `app/` plano. Eso funciona hasta que pasan dos cosas: aparece un segundo tipo de usuario (clientes, revisores, socios, cada uno con su propia interfaz) y las funcionalidades se acumulan hasta que nadie sabe dónde termina una y empieza la otra.

El kit le da esa estructura a la aplicación desde el primer commit, así que hacerla crecer es cuestión de agregar piezas, no de reorganizar todo.

## Tres capas

```
Panels → Modules → Partners
   ↓        ↓         ↓
 [UI]   [Business]  [External]
        [Logic]     [Services]
```

- **Panels** (`app/Panels`) son la capa de presentación. Cada panel atiende a un solo tipo de usuario.
- **Modules** (`app/Modules`) contienen la lógica de negocio como cortes verticales: un directorio por funcionalidad, con sus modelos, servicios, migraciones, rutas, traducciones y piezas de Filament juntos.
- **Partners** (`app/Partners`) son las integraciones con servicios externos, como las pasarelas de pago, detrás de contratos.

Las flechas indican la dirección esperada: un panel usa módulos, y un módulo llega a un sistema externo solo a través de un contrato de partner.

## Módulos que se activan y desactivan

Cada módulo se registra desde su propio service provider, que el módulo Core descubre automáticamente: no hay una lista de módulos que mantener sincronizada. Un módulo declara cuándo está activo, y se puede activar o desactivar en tiempo de ejecución con `config/modules.php` y el middleware de rutas `module.active`.

La regla por defecto lee un valor de configuración, pero puede ser cualquier cosa. Para activar módulos por cliente u organización, pasa tu propio contexto a `ModuleScope::forContext()` y deja que cada módulo decida a partir de él.

Crear un módulo nuevo es copiar `app/Modules/Example`, un módulo pequeño que sigue todas las convenciones, y renombrarlo.

## Un panel por tipo de usuario

El kit trae dos paneles, Admin y SuperAdmin, sobre una base común que ya incluye inicio de sesión, recuperación de contraseña, verificación de correo, notificaciones y una página de perfil.

Los roles se corresponden uno a uno con los paneles, y cada panel solo deja entrar a su propio rol: el proveedor de usuarios limita cada búsqueda al rol del panel actual, así que una cuenta de administrador no puede iniciar sesión en el panel de otro tipo de usuario.

## Qué más incluye

- **Una capa de pasarelas de pago:** un contrato para proveedores de pago y una pasarela de prueba como implementación de referencia, con una guía paso a paso para agregar una real.
- **Tests de arquitectura** que mantienen las capas separadas a medida que la aplicación crece: modelos solo dentro de los módulos, sin directorios `Repositories/` ni `Traits/`, y providers con el nombre y la ubicación que el descubrimiento espera.
- **Tests que corren en cualquier lado:** Pest sobre SQLite en memoria, así que `composer test` funciona en un clon recién descargado, sin `.env` y sin servidor de base de datos, más una suite de navegador que recorre los paneles en Chromium sin interfaz.
- **Una imagen para producción:** un Dockerfile que ejecuta Laravel Octane sobre FrankenPHP, un worker de colas y el scheduler.
- **Herramientas para agentes de código:** un `AGENTS.md` con las reglas del proyecto, agentes revisores de solo lectura y Laravel Boost.

## Primeros pasos

```bash
laravel new my-app --using=norotaro/filament-modular-starter
cd my-app
php artisan db:seed
npm install && npm run build
composer dev
```

El seeder crea `admin@example.test` para `/admin` y `super-admin@example.test` para `/super-admin`, ambos con la contraseña `password`. Sin el instalador de Laravel, usa `composer create-project norotaro/filament-modular-starter my-app`.

El [README](https://github.com/norotaro/filament-modular-starter#readme) explica el resto, y `app/README.md` dentro del proyecto es la guía completa de la arquitectura. Si lo pruebas, me gustaría saber cómo te va: [los issues están abiertos](https://github.com/norotaro/filament-modular-starter/issues).
