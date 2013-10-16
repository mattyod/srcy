Srcy
========

Check project image paths for files that are referenced but do not exist and
files that exist but are not referenced.

## Installation {#installation}

### At project level

```
npm install srcy
```

### Globally (for command line config generation)

```
npm install -g srcy
```

## Usage {#usage}

Create a srcy.conf.json file at the root level of any project that you wish to
check. See [Configuration](#configuration).

At this point srcy can be run manually from the command line with

```
node npm_modules/srcy/srcy.js
```

To include srcy as part of your test suite it is recommended you add this
reference to your package.json scripts object.

## Configuration {#configuration}
