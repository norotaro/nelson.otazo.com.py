---
title: PHP Enums, qué son?
description: En este artículo veremos en profundidad qué son los Enums en PHP, qué tipos existen y todas las opciones que dispone.
img: php-enums-que-son.png
date: 2023-07-12
category: Programación
tags: ['php', 'enums', 'programación']
---
*Este artículo está basado en un post de [stitcher.io](https://stitcher.io/blog/php-enums) y contiene varias partes traducidas del artículo original.*

## Descripción

[PHP 8.1](https://www.php.net/releases/8.1/en.php#enumerations) trajo consigo el soporte nativo para `enums` (enumeraciones) que la [documentación oficial](https://www.php.net/manual/es/language.enumerations.overview.php) lo describe de la siquiente manera:

> Las enumeraciones o 'Enums' permiten al desarrollador definir un tipo personalizado que se limita a un número discreto de valores posibles. Eso puede ser especialmente útil a la hora de definir un modelo de dominio, ya que permite 'hacer irrepresentables los estados no válidos.'

Ahora veamos cómo se ve un `enum` genérico:

```php
enum Status
{
    case PENDING   = 'pending';
    case ACTIVE    = 'active';
    case SUSPENDED = 'suspended';
    case CANCELED  = 'canceled';
}
```

La ventaja de los enums es que representan una colección de valores constantes, pero lo más importante es que esos valores se pueden tipar, de esta forma:

```php
class User
{
    public function __construct(
        public Status $status,
    ){}
}
```

Con este ejemplo, crear un `enum` y pasarlo a un `User` se vería de la siguiente manera:

```php
$post = new User(Status::PENDING);
```

Eso es lo básico. Como puedes ver, no hay nada complejo en ellos, sin embargo, hay un montón de aspectos a tener en cuenta, ¡vamos a ver los `enums` en profundidad!

## Métodos en Enums
Al igual que las clases, los `enums` también pueden definir métodos. Se trata de una característica muy potente, especialmente en combinación con el operador `match`:

```php
enum Status
{
    case PENDING   = 'pending';
    case ACTIVE    = 'active';
    case SUSPENDED = 'suspended';
    case CANCELED  = 'canceled';

    public function label(): string
    {
        return match($this) {
            static::PENDING   => 'Pending',
            static::ACTIVE    => 'Active',
            static::SUSPENDED => 'Suspended',
            static::CANCELED  => 'Canceled by user',
        };
    }
}
```

Los métodos pueden utilizarse así:

```php
$status = Status::CANCELED;
$status->label() // 'Canceled by user'
```

Los métodos estáticos también están permitidos:

```php
enum Status
{
    // …
    
    public static function make(): Status
    {
        // …
    }
}
```

## Interfaces en Enums

Los Enums pueden implementar interfaces, igual que las clases normales:

```php
interface HasLabel
{
    public function label(): string;
}
```

```php
enum Status implements HasLabel
{
    case PENDING   = 'pending';
    case ACTIVE    = 'active';
    case SUSPENDED = 'suspended';
    case CANCELED  = 'canceled';

    public function label(): string
    {
        // ...
    }
}
```

## Enums respaldados

Los valores de `enums` están representados internamente por objetos, pero también permite asignarles un valor; esto es útil para, por ejemplo, serializarlos en una base de datos.

```php
enum Status: string
{
    case PENDING   = 'pending';
    case ACTIVE    = 'active';
    case SUSPENDED = 'suspended';
    case CANCELED  = 'canceled';
}
```

La declaración de tipo en la definición de enum indica que todos los valores enum son de un tipo determinado. También podría ser un `int`. Hay que tener en cuenta que sólo se permiten `int` y `string` como valores enum.

```php
enum Status: int
{
    case PENDING   = 1;
    case ACTIVE    = 2;
    case SUSPENDED = 3;
    case CANCELED  = 4;
}
```

El término técnico para los enums tipados se denomina "backed enums" ("enums respaldados" en español), ya que están "respaldados" por un valor más simple. Los enums que no están "respaldados" se llaman "enums puros".

### Interfaces y Enums respaldados

Si combina `enums` respaldados e interfaces, el tipo de `enum` debe ir directamente después del nombre del `enum` y antes de la palabra clave `implements`.

```php
enum Status: string implements HasLabel
{
    case PENDING   = 'pending';
    case ACTIVE    = 'active';
    case SUSPENDED = 'suspended';
    case CANCELED  = 'canceled';

    // ...
}
```

### Serialización de enums respaldados

Si estás asignando valores a `enums` probablemente quieras una forma de serializarlos y deserializarlos. Serializarlos significa que necesitas una forma de acceder al valor del `enum`. Eso se hace con una propiedad pública de solo lectura:

```php
$value = Status::PENDING->value; // 'pending'
```
Restaurar un enum a partir de un valor puede hacerse utilizando `Enum::from()`:

```php
$status = Status::from('pending'); // Status::PENDING
```

También hay un `tryFrom()` que devuelve `null` si se pasa un valor desconocido, en cambio `from()` lanza una excepción.

```php
$status = Status::from('unknown'); // ValueError
$status = Status::tryFrom('unknown'); // null
```

Tenga en cuenta que también se pueden utilizar las funciones nativas `serialize()` y `unserialize()` en los enums. Además, se puede utilizar `json_encode()` en combinación con enums respaldados, su resultado será el valor del enum. Este comportamiento puede modificarse implementando `JsonSerializable`.

## Listado de valores de Enums

Se puede utilizar el método estático `Enum::cases()` para obtener una lista de todos los casos disponibles dentro de un `enum`:

```php
Status::cases();

/* [
    Status::PENDING, 
    Status::ACTIVE, 
    Status::SUSPENDED,
    Status::CANCELED,
] */
```

Hay que tener en cuenta que esta matriz contiene los objetos enum reales:

```php
array_map(
    fn(Status $status) => $status->color(), 
    Status::cases()
);
```

## Los Enums son objetos

Ya hemso mencionado previamente que los valores de los `enums` se representan como objetos, de hecho son objetos _singleton_. Eso significa que puedes hacer comparaciones con ellos de esta forma:

```php
$statusA = Status::PENDING;
$statusB = Status::PENDING;
$statusC = Status::SUSPENDED;

$statusA === $statusB; // true
$statusA === $statusC; // false
$statusC instanceof Status; // true
```

## Enums como claves de array

Dado que los valores de los enums son en realidad objetos, actualmente no es posible utilizarlos como claves de arrays. Lo siguiente producirá un error:

```php
$list = [
    Status::ACTIVE => 'active',
    // …
];
```
Esto significa que sólo puedes usar enums como claves en `SplObjectStorage` y `WeakMaps`.

## Traits
Los enums pueden utilizar traits igual que las clases pero con algunas restricciones. No se permite anular los métodos incorporados en los enums y no pueden contener propiedades de clase. De hecho las propiedades están prohibidas en los enums.

## Reflexión y atributos
Como era de esperar, se han añadido algunas clases de reflexión para tratar con enums: `ReflectionEnum`, `ReflectionEnumUnitCase` y `ReflectionEnumBackedCase`. También hay una nueva función `enum_exists()` que hace lo que su nombre sugiere.

Al igual que las clases y propiedades normales, las enumeraciones y sus casos pueden anotarse utilizando atributos. Ten en cuenta que el filtro `TARGET_CLASS` también incluirá los enums.

<div class="bg-yellow-100 mb-6 p-4 rounded-lg">
    ¿Has detectado un error? Puedes <a href="https://github.com/norotaro/nelson.otazo.com.py">enviar un PR</a> para solucionarlo.
</div>
