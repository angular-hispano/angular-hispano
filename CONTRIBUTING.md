# Contribuyendo

## Prerrequisitos

1. Instala un gestor de versiones de NodeJS
    - macOS/Linux: usar [nvm](https://github.com/nvm-sh/nvm#installation-and-update)
    - Windows: usar [nvm-windows](https://github.com/coreybutler/nvm-windows#installation--upgrades)
1. Instala NodeJS LTS
    - `nvm install 12`
1. Instala [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
1. Configurar GitHub 2FA (sin SMS)

## Aprender git

Te recomendamos que te tomes un tiempo para sentirte cómodo con git antes de contribuir.
Esto te ahorrará mucha frustración. "Learn Git Branching" es un gran recurso para esto.
Puedes empezar en [castellano](https://learngitbranching.js.org/?locale=es_AR) o
en [inglés](https://learngitbranching.js.org/?locale=en_US).

## Configurando Git
Es necesario configurar git correctamente para contribuir.

Por favor siga estas guías:

1. [SSH](https://help.github.com/en/articles/connecting-to-github-with-ssh)
1. [Nombre](https://help.github.com/en/articles/setting-your-username-in-git)
1. [Email](https://help.github.com/en/articles/setting-your-commit-email-address-in-git)
1. [GPG](https://help.github.com/en/articles/about-commit-signature-verification)

### Plugins

#### WebStorm

Pronto...

#### VSCode

Por favor mira [.vscode/README.md](.vscode/README.md) para instrucciones.

### Guía de Commits

Tenemos reglas muy precisas sobre cómo se pueden formatear nuestros mensajes de confirmación de git.
Esto lleva a **más mensajes legibles** que son fáciles de seguir al mirar a través del
**historial del proyecto**.

#### <a name="commit-message-format"></a> Commit Message Format
Cada mensaje de confirmación consta de un **encabezado**, un **cuerpo** y un **pie**.
El encabezado tiene un especial formato que incluye un **tipo**, un **alcance** y un **tema**:

```html
<tipo>(<alcance>): <tema>
<linea en blanco>
<cuerpo>
<linea en blanco>
<pie>
```

> ¡Cualquier línea del mensaje de confirmación no puede tener más de 100 caracteres!<br/>
  Esto permite que el mensaje sea más fácil de leer en GitHub así como en varias herramientas de Git.

##### Tipo
Debe ser uno de los siguientes:

* **build**: Cambios en el proceso de compilación o dependencias utilizadas para la compilación
* **chore**: Cambios a los herramientas de projecto como scripts, configuración de CI, etc.
* **docs**: La documentación solo cambia
* **feat**: Una nueva característica
* **fix**: Una corrección de errores
* **perf**: Un cambio de código que mejora el rendimiento
* **refactor**: Un cambio de código que no corrige un error ni agrega una característica
* **style**: Cambios que no afectan el significado del código (espacios en blanco, formato, puntos y
  comas que faltan, etc.)
* **test**: Añadiendo pruebas faltantes

##### Alcance
El alcance podría ser cualquier cosa que ayude a especificar el alcance (o característica) que está
cambiando.

Ejemplos:
- `feat(conferences): `
- `fix(landing): `

##### Tema
El tema contiene una breve descripción del cambio:

* usar el imperativo, tiempo presente: "cambio" no "cambiado" ni "cambios"
* no escribir en mayúscula la primera letra
* sin punto (.) al final

##### Body
Al igual que en el **tema**, usas el imperativo, tiempo presente: "cambio" no "cambiado" ni "cambios"
El cuerpo debe incluir la motivación para el cambio y contrastarlo con el comportamiento anterior.

##### Pie
El pie está el lugar para referencia los problemas de GitHub que esta confirmación **Closes**,
**Fixes** o **Relates to**.

##### Sample Commit messages:
```text
feat(conferences): añadir ng-honduras

Hace poco anunciaron sus fechas de conferencia

Fixes #34
```
```text
fix(conferences): no ordenado correctamente

* ordenar conferencias por fecha
* la próxima conferencia tiene que estar primera

Fixes #78
```

### Guía de PRs

Por favor asegurate que tú `pull request` cumpla los siguientes lineamientos:

- Crea un `pull request` individual por cada aporte.
- Sigue las indicaciones dadas en la plantilla de `pulls requests`.
- Presta mucha atención a tu ortografía.
- Nuevos aportes o mejoras a lo que ya existe, siempre es bienvenido.

#### Revisiones

Pronto...
