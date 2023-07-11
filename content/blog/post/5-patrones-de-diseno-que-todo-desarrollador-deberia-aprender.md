---
title: 5 patrones de diseño que todo desarrollador debería aprender
description: Los mejores patrones de diseño para iniciar
img: 5-patrones-de-diseno-que-todo-desarrollador-deberia-aprender.jpeg
date: 2021-07-12
category: Programación
---
*Esta es una traducción libre de un artículo en inglés escrito por [Samuel Martins](https://samuel-martins.medium.com/), puedes leer el original en [JavaScript in Plain English](https://javascript.plainenglish.io/5-design-patterns-every-developer-should-learn-a02835d15159).*

En tecnología, la mayoría de los desarrolladores tienden a pensar en una progresión profesional en la que se pasa de junior a senior, luego a líder, luego a arquitecto, etc. En cierta medida creo que suele faltar algo en esa progresión, la competencia técnica. Esto puede ser descrito como convertise de un consumidor a un creador. Piense en ello como usar algo como React o Angular en un principio y luego avanzar en esa cadena de competencia tecnológica. Desde estar consumiendo ese Framework hasta terminar creando un framework que es utilizado por otros desarrolladores quienes se convierten en sus consumidores.

Para llegar a ese punto debes desarrollar tu conjunto de habilidades y comenzar con un dominio básico en el lenguaje que elija. A partir de ahí se trabaja en estructuras de datos y algoritmos y, finalmente, en patrones de diseño. Los patrones de diseño son una solución general y reutilizable para un problema que ocurre comúnmente dentro de un contexto dado en el diseño de software. Son reutilizables, extensibles y cumplen con los estándares de la industria. En este artículo voy a analizar cinco patrones de diseño diferentes que creo que todo desarrollador debería aprender.

---

## Patrón Instancia Única (_Singleton_)

Este patrón involucra una sola clase la cual es responsable de la creación de un objeto mientras se asegura de que sea el único creado. Esta clase proporciona una forma de acceder a ella, a la que se puede acceder directamente sin la necesidad de instanciar el objeto de la clase. La razón más común para utilizarlo es controlar el acceso a algún recurso compartido.

Este patrón es uno de los más peor utilizados. Los singleton se utilizan cuando una clase debe tener exactamente una instancia, ni más ni menos. Algunos desarrolladores utilizan con frecuencia Singletons en un intento de reemplazar las variables globales. A efectos prácticos, un Singleton es una variable global, en el sentido de que no elimina la variable global, simplemente la renombra. El uso de un Singleton es innecesario si es más sencillo pasar un recurso de objeto como referencia a los objetos que lo necesitan en lugar de permitir que los objetos accedan a él globalmente. Por lo tanto, debe saber y asegurarse de que lo está utilizando de la manera correcta y en el momento adecuado.


---

## Patrón Fachada (_Facade_)

En pocas palabras, este es un patrón de diseño estructural que proporciona una interfaz simplificada para acceder a una biblioteca, a un marco o cualquier otro conjunto complejo de clases. Una fachada en el mundo real sería la parte frontal de un edificio que esconde toda la mecánica interna del edificio. Estos serían el aislamiento, las habitaciones, la plomería, el cableado, etc. El patrón fachada brinda la posibilidad de poner un bonito revestimiento externo a una aplicación.  Tomemos un compilador como ejemplo, tiene un analizador sintáctico, un analizador léxico, un tokenizador y todo tipo de cosas divertidas que ningún consumidor ve.

La ventaja de usar este patrón es que le brinda al consumidor una buena interfaz. También puede optar por permitir que los consumidores entren en el interior si lo desea. Una de las cosas a tener en cuenta es la posibilidad de una simplificación excesiva, puede terminar simplificando tanto la interfaz de ese compilador que ya no resulta útil o valioso.  Otra cosa es la verticalización excesiva, puede terminar creando una fachada que sea tan específica para un solo caso de uso que ya no sea lo suficientemente generalizada como para ser útil en general.

---

## Patrón Puente (_Bridge_)

Este patrón de diseño te permite dividir una clase grande o un conjunto de clases estrechamente relacionadas en dos jerarquías separadas que se pueden desarrollar independientemente una de la otra. Otra forma de explicar esto es agregando funcionalidad progresivamente mientras se separan las diferencias principales utilizando clases abstractas. Un problema que requiere este patrón ocurre porque a veces los desarrolladores intentan extender subclases en dos dimensiones independientes. Ese es un problema común con la herencia de clases. El patrón Bridge intenta resolver este problema cambiando la Herencia por la composición del objeto.

Este patrón involucra una interfaz que actúa como puente entre las clases de abstracción y las clases de implementación. En un ejemplo de desarrollo, la interfaz del puente sería algo así como una API. Este enfoque simplifica el mantenimiento del código y minimiza el riesgo de romper el código existente.

---

## Patrón Estrategia (_Streategy_)

Este patrón de diseño le permite definir una familia de algoritmos, luego poner cada uno de ellos en una clase separada y hacer que sus objetos sean intercambiables. Considere un escenario en el que tiene un código que va a buscar clientes, los filtra y luego les envia notificaciones por correo electrónico y mensaje de texto. Puede usar el patrón de estrategia para limpiar esto significativamente tomando la mecánica de obtener acceso a los registros de los clientes, enviar los mensajes y correos electrónicos y luego crearlo como una capa de infraestructura. Factoriza el filtrado de esos clientes en una estrategia, que es la estrategia que te ayuda a encontrar los clientes objetivo que deseas. Ten la estrategia de notificación como una estrategia diferente que ayuda a decidir cuándo, dónde y cómo deseas contactar a esos clientes. Luego puedes usar esa biblioteca o ese sistema en una gran cantidad de escenarios diferentes y se vuelve mucho menos estresante.

Una cosa que debe tener en cuenta es asegurarse de tener estrategias predeterminadas decentes. Entonces, en el caso de nuestra refactorización, tomamos la lógica existente en torno al filtrado de clientes y los envíos de notificaciones y los convertimos en estrategias predeterminadas que otros pueden extender más adelante.

---

## Patrón Observador (_Observer_)

Este patrón es el más popular con diferencia porque está en casi todas partes. Permite un acoplamiento flexible entre el editor, que está creando eventos, y el suscriptor o los suscriptores que están escuchando esos eventos, y puedes usarlo en cualquier lugar. La desventaja de este patrón en particular es que puedes exagerar con su utilización. Si todo se comunica por eventos, puedes entrar en bucles de eventos desagradables, lo que dificulta la depuración del código y se vuelve caótico.

Hay un par de soluciones para esto. Uno, no use el mismo bus de mensajes para todo, tenga un propósito específico para cada bus de mensajes. Dos, mantenga estos sistemas localizados. Si estás en el cliente y tienes un botón que admite un evento, entonces adelante, no es necesario que lo utilices para más que eso.

---

Así que nuevamente, como con todo, utilice estos patrones sabiamente, pero úselos porque la mayoría de la gente entiende esos sistemas cuando los ve. Para aquellos que están interesados en aprender patrones de diseño, estos son solo 5 para comenzar y mojarte los pies. Existen más patrones y muchos tutoriales en línea que pueden ayudarte a comprender bien cada uno de ellos.