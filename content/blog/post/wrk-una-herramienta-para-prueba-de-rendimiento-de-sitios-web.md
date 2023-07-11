---
title: wrk - una herramienta para prueba de rendimiento de sitios web
description: wrk es una moderna herramienta de prueba de rendimiento HTTP (HTTP benchmarking) capaz de generar una carga significativa cuando se ejecuta en una única CPU de varios núcleos
img: wrk-una-herramienta-para-prueba-de-rendimiento-de-sitios-web.jpg
date: 2021-03-22
category: Herramientas
---
_Lee la [noticia original en inglés](https://laravel-news.com/wrk) de [Laravel News](https://laravel-news.com)_

Durante la presentación de [Laravel Octane](https://nelson.otazo.com.py/blog/post/llega-laravel-octane) realizada por Taylor en Laracon Online, utilizó Apache Bench (`ab`) y una herramienta llamada `wrk`.

> wrk es una moderna herramienta de prueba de rendimiento HTTP _(HTTP benchmarking)_ capaz de generar una carga significativa cuando se ejecuta en una única CPU de varios núcleos. Combina un diseño multiproceso con sistemas de notificación de eventos escalables como epoll y kqueue.

Una vez instalado, el uso básico es:

```bach
wrk -t12 -c400 -d30s http://site.test
```

Esto ejecuta una prueba de rendimiento durante 30 segundos (-d30s), utilizando 12 subprocesos (-t12) y manteniendo abiertas 400 (-c400) conexiones HTTP. La salida después de ejecutarlo es algo parecido a esto:

```bach
Running 30s test @ http://site.test
  12 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    19.65ms   35.21ms 399.30ms   84.63%
    Req/Sec     3.35k     1.84k    9.25k    63.16%
  1200921 requests in 30.10s, 396.20MB read
  Socket errors: connect 156, read 242, write 0, timeout 0
  Non-2xx or 3xx responses: 1167232
Requests/sec:  39896.51
Transfer/sec:     13.16MB
```

Si necesitas hacer algunas pruebas de rendimiento, consulta [wrk](https://github.com/wg/wrk) que incluso se puede instalar a través de homebrew.