---
title: 'Introducing Filament Modular Starter'
description: 'A Laravel 13 and Filament 5 starter kit for apps that grow as modules and serve each audience through its own Filament panel.'
date: 2026-11-20
category: Laravel
tags: [laravel, filament, starter-kit]
translationKey: filament-modular-starter
---
I just released [Filament Modular Starter](https://github.com/norotaro/filament-modular-starter), an open-source (MIT) starter kit for Laravel 13 and Filament 5. It's for applications that grow as modules and serve each audience through its own Filament panel.

```bash
laravel new my-app --using=norotaro/filament-modular-starter
```

## The problem it solves

A Filament app usually starts with one admin panel and a flat `app/` directory. That works until two things happen: a second audience shows up (customers, reviewers, partners, each needing its own interface), and features pile up until nobody can tell where one ends and the next begins.

The starter gives the app that structure from the first commit, so growing it is a matter of adding pieces, not reorganizing everything.

## Three layers

```
Panels → Modules → Partners
   ↓        ↓         ↓
 [UI]   [Business]  [External]
        [Logic]     [Services]
```

- **Panels** (`app/Panels`) are the presentation layer. Each panel serves exactly one audience.
- **Modules** (`app/Modules`) hold the business logic as vertical slices: one directory per capability, with its models, services, migrations, routes, translations and Filament pieces together.
- **Partners** (`app/Partners`) are the outbound integrations, such as payment gateways, behind contracts.

The arrows are the intended direction: a panel uses modules, and a module reaches an external system only through a partner contract.

## Modules you can turn on and off

Each module registers itself from its own service provider, which the Core module discovers automatically: there is no list of modules to keep in sync. A module declares when it is active, and it can be switched on or off at runtime through `config/modules.php` and the `module.active` route middleware.

The default rule reads a config flag, but it can be anything. To enable modules per tenant or organization, pass your own context to `ModuleScope::forContext()` and let each module decide from it.

Starting a new module means copying `app/Modules/Example`, a small module that follows every convention, and renaming it.

## One panel per audience

The starter ships with two panels, Admin and SuperAdmin, on a shared base that already has login, password reset, email verification, notifications and a profile page.

Roles map one-to-one to panels, and each panel signs in only its own role: the user provider limits every lookup to the current panel's role, so an admin account can't sign in to another audience's panel.

## What else is in the box

- **A payment gateway layer:** a contract for payment partners and a dummy gateway as the reference implementation, with a step-by-step guide for adding a real one.
- **Architecture tests** that keep the layers apart as the app grows: models only inside modules, no `Repositories/` or `Traits/` directories, providers named and placed so discovery finds them.
- **Tests that run anywhere:** Pest on in-memory SQLite, so `composer test` works on a fresh clone with no `.env` and no database server, plus a browser suite that drives the panels in headless Chromium.
- **A production image:** a Dockerfile that runs Laravel Octane on FrankenPHP, a queue worker and the scheduler.
- **Tooling for coding agents:** an `AGENTS.md` with the project's rules, read-only reviewer agents, and Laravel Boost.

## Quick start

```bash
laravel new my-app --using=norotaro/filament-modular-starter
cd my-app
php artisan db:seed
npm install && npm run build
composer dev
```

The seeder creates `admin@example.test` for `/admin` and `super-admin@example.test` for `/super-admin`, both with the password `password`. Without the Laravel installer, use `composer create-project norotaro/filament-modular-starter my-app`.

The [README](https://github.com/norotaro/filament-modular-starter#readme) covers the rest, and `app/README.md` in the project is the full architecture guide. If you try it, I'd like to hear how it goes: [issues are open](https://github.com/norotaro/filament-modular-starter/issues).
