---
title: 'Cómo dar formato a tu código usando ESLint en VSCode'
description: 'Al iniciar el proyecto de este blog con NuxtJS seleccioné la opción de utilizar ESLint para el formato del código pero VSCode no funcionaba correctamente.'
img: como-dar-formato-a-tu-codigo-usando-eslint-en-vscode.jpg
date: 2021-07-21
category: Tools
tags: [vscode, eslint, formatear]
---
Al iniciar el proyecto de este blog con NuxtJS seleccioné la opción de utilizar ESLint para el formato del código pero VSCode no funcionaba correctamente. Así que, buscando una solución, me encontré con este [artículo](https://daveceddia.com/vscode-use-eslintrc/) de [Dave Ceddia](https://daveceddia.com/) que me ayudó a solucionar el inconveniente agregando solamente un plugin y 4 líneas en la configuración. Aquí está cómo hacerlo:

## 1. Instala el plugin ESLint para VSCode

En VSCode, abre el explorador de extensiones con el botón de la izquierda. En Mac, el acceso directo por teclado Cmd+Shift+X debería hacer eso mismo.

Busca `eslint`

Instala el primer resultado llamado "ESLint". (Es [este](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) con más de 15 millones de descargas)

## 2. Configura VSCode para utilizar ESLint para formatear

Abre la configuración de VSCode. En Mac puedes hacerlo con el atajo `Cmd+,` o por el menú: Code > Preferencias > Configuración. Se abrirá el editor de configuración amigable pero necesitamos poder editar la configuración directamente como JSON.

Haz click en el pequeño ícono de arriba a la derecha que parece un papel con una pequeña flecha. ![VSCode settings image](/blog/img/como-dar-formato-a-tu-codigo-usando-eslint-en-vscode/vscode-settings.jpg) Agrega estas 4 líneas en el primer nivel de la configuración.

```json
{
    // ...
    "eslint.format.enable": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    }
}
```

```javascript
// ./nuxt.config.ts

import { defineNuxtConfig } from 'nuxt'
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // ...
  content: {
    // https://content.nuxtjs.org/api/configuration
    highlight: {
      theme: {
        // Default theme (same as single string)
        default: 'material-palenight',
        // Theme used if `html.dark`
        dark: 'github-dark',
      }
    }
  },
  // ...
})
```

¡Eso es todo! Guarda el archivo de configuración y ciérralo, hemos terminado.

Intente realizar algunos cambios en un archivo que infrinja alguna regla de ESLint (puedes dejar un punto y coma por ejemplo) y presionando Guardar debería formatearse automáticamente.