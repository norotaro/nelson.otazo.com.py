---
title: Llega Laravel Octane
description: Llega Octane, un paquete para ejecutar Laravel con alto rendimiento utilizando entornos como Swoole y RoadRunner
img: llega-laravel-octane.jpg
date: 2021-03-18
category: Noticias
---
*Ver [noticia original](https://laravel-news.com/laravel-octane) en inglés de [Laravel News](https://laravel-news.com)*

Taylor Otwell (creador de Laravel) les dio a los asistentes a Laracon Online 2021 un primer vistazo de Laravel Octane, un paquete para ejecutar Laravel con alto rendimiento utilizando entornos como Swoole y RoadRunner.

Octane entregó alrededor de 6000+ solicitudes por segundo en algunos ejemplos de "hola mundo" con una carga de ~50 solicitudes simultáneas utilizando cuatro subprocesos simultáneos durante la demostración.

A continuación, se muestra un ejemplo del comando utilizado durante la demostración para medir el rendimiento:

```bash
wrk -t4 -c50 http://localhost:8000/hello-world
```

## ¿Como funciona?

El punto de entrada de Octane es un comando de [Artisan](https://laravel-news.com/tag/artisan) (`octane:start`) que ejecutará Swoole o RoadRunner. Se puede especificar qué tecnología usar y cuántos subprocesos ejecutar en función de la CPU del entorno:

```bash
artisan octane:start --workers=8 --server=roadrunner
```
Swoole y RoadRunner utilizan corrutinas que permiten que PHP se ejecute de manera más eficiente mediante la bifurcación de varios procesos de trabajo en función de los números de núcleo de la CPU. El uso de Swoole/RoadRunner permite una mejor eficiencia en el inicio de la aplicación, junto con [PHP OPcache](https://www.php.net/manual/en/book.opcache.php) para minimizar la sobrecarga almacenando *byte code* en memoria compartida.

Los procesos de PHP permanecen activos entre solicitudes (puede alternarlos después de "x" solicitudes mediante una bandera de *artisan*) y están listos para recibir nuevas solicitudes. La eliminación del tiempo de inicio del *framework* tiene un impacto significativo en el rendimiento de las aplicaciones con grandes cargas de trabajo HTTP.

## ¿Qué es lo siguiente?

Según lo mencionado por Taylor se espera el lanzamiento de Octane pronto (posiblemente en semanas). Mientras tanto puedes aprovechar y familiarizarte con [Roadrunner](https://roadrunner.dev/docs/intro-about) y [Swoole PHP](https://www.swoole.co.uk/how-it-works).