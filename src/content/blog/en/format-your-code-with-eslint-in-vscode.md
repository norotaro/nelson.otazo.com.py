---
title: 'How to format your code with ESLint in VSCode'
description: 'When I started this blog with NuxtJS I chose ESLint to format the code, but VSCode did not apply it correctly.'
img: como-dar-formato-a-tu-codigo-usando-eslint-en-vscode.jpg
date: 2021-07-21
category: Tools
tags: [vscode, eslint, formatting]
translationKey: eslint-vscode
---
When I started this blog with NuxtJS I chose ESLint to format the code, but VSCode did not apply it correctly. Looking for a fix, I found this [article](https://daveceddia.com/vscode-use-eslintrc/) by [Dave Ceddia](https://daveceddia.com/), which solved the problem with just one plugin and 4 lines of configuration. Here is how to do it:

## 1. Install the ESLint plugin for VSCode

In VSCode, open the extensions browser with the button on the left. On a Mac, the keyboard shortcut Cmd+Shift+X does the same.

Search for `eslint`.

Install the first result, called "ESLint". (It's [this one](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), which had more than 15 million downloads at the time.)

## 2. Set VSCode to format with ESLint

Open the VSCode settings. On a Mac you can use the `Cmd+,` shortcut or the menu: Code > Preferences > Settings. That opens the friendly settings editor, but we need to edit the settings directly as JSON.

Click the small icon at the top right that looks like a sheet of paper with a little arrow. ![VSCode settings image](/img/blog/como-dar-formato-a-tu-codigo-usando-eslint-en-vscode/vscode-settings.jpg) Add these 4 lines at the top level of the settings.

```json
// settings.json
{
    // ...
    "eslint.format.enable": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    }
}
```

That's it! Save the settings file and close it, we're done.

Try making a change to a file that breaks an ESLint rule (leave out a semicolon, for example) and press Save: it should be formatted automatically.
