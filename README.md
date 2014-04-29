# Srcy [![Build Status](https://secure.travis-ci.org/mattyod/srcy.png?branch=master)](http://travis-ci.org/mattyod/srcy) [![Dependencies](https://david-dm.org/mattyod/srcy.png)](https://david-dm.org/mattyod/srcy)

[![NPM](https://nodei.co/npm/srcy.png?downloads=true&stars=true)](https://nodei.co/npm/srcy.png?downloads=true&stars=true)

Check project paths for files that are referenced but do not exist and
files that exist but are not referenced.

## Installation

### At project level

```
npm install srcy
```

### Globally (as an optional extra)

```
npm install -g srcy
```

## Usage

Create a srcy.conf.json file at the root level of any project that you wish to
check. See [Configuration](#configuration).

At this point srcy can be run manually from the command line with:

```
node npm_modules/srcy/srcy.js
```

Or if installed both locally and globally you can use:

```
srcy
```

To include Srcy as part of your test suite it is recommended you add this
reference to your package.json scripts object.

```
"scripts": {
    "srcy": "node node_modules/srcy/srcy.js"
}
```

Or if you have Srcy installed globally on your test environment you can use:

```
"scripts": {
    "srcy": "srcy"
}
```

## Configuration

### Create a config file

To run Srcy your project will need a **srcy.conf.json** file at the
project root. You can generate an (almost) empty config file if you have
installed Srcy globally by running:

```
srcy init
```

If a config already exists you can over-write it with the default one using:

```
srcy init -f
```

The generated file should look like this:

```
{
    "refs": {
        "whitelist": false,
        "blacklist": [],
        "notTypes": [],
        "replace": {},
        "ignore": [],
        "wildcards": []
    },
    "resources": {
        "root": "",
        "folders": [],
        "types": ["gif", "png", "jpg", "svg"],
        "ignore": []
    }
}
```

### Editing the config file

Srcy will catch many issues for you like this but it's highly unlikely that
you will have a robust check in place without further configuration.

Rather than aiming to code a solution to every possible variation within a
project set up, Srcy is designed to be highly configurable allowing you to tune
it to the specifics of your project.

#### refs

This section is for configuring how Srcy searches your project code base for
references to files.

##### refs.whitelist

*default value*: false

*type when populated*: array

If you wish to specify folders or files that Srcy should check and *only*
check then add them to whitelist attribute as an array such as:

```
"whitelist": ["web", "css", "js"]
```

If no whitelist is specified Srcy will just start at the project root and check
all files and folders that aren't [blacklisted](#refsblacklist).

##### refs.blacklist

*default value*: []

In most cases you won't want to check every file in your project and doing so
will effect the performance of Srcy. Add any files or folders that you do not
wish checked to this array, such as:

```
"blacklist": ["node_modules", "test", "README.md", "package.json", "web/images"]
```

##### refs.notTypes

*default value*: []

In addition to blacklisting specific files or folders you can use the notTypes
attribute to ensure Srcy does not check files of a certain type. You may
generate .css files from some other type of file and thus wish to ignore all css
files:

```
notTypes: ["css"]
```

##### refs.replace

*default value*: {}

In some cases you may wish to replace a file reference with one or many
others. **N.B** replace takes precedence over [wildcards](#refswildcards).

You may have JavaScript files that reference resources dynamically such as this:

```
"img/buttons/" + onOffState + ".gif"
```

You may wish to specify that this reference should refer to two separate
resource files:

* "img/buttons/on.gif"
* "img/buttons/off.gif"

In order to achieve this you would set the replace attribute to be:

```
"replace": {
    "img/buttons/' + onOffState + '.gif": [
        'img/buttons/on.gif',
        'img/buttons/off.gif'
    ]
}
```

Both files will now be matched against your project set up.

##### refs.ignore

*default value*: []

You may wish to ignore certain resource references within your code base,
perhaps they refer to external resources with similar matching patterns or are
described as plain text and not actually part of your project. Any references
you wish to exclude from Srcy's checks should be listed as such:

```
"ignore": ["img/example.gif", "img/someOtherSitesLogo.gif"]
```

##### refs.wildcards

More powerful than replace, wildcards allows you to match and replace file
references based on a regular expression. You can create your own matchers but
some popular examples are included in the [wildcards section](#wildcards).

If for example you are using [Jade](http://jade-lang.com/) templates you may
wish to specify a Jade variable as a wildcard such as:

```
"wildcards": ["#{.*?}"]
```

So that a reference such as:

```
"img/weather/#{weather}.png"
```

Would be replaced with a reference to every image inside the weather folder
that could possibly be a match for that. If you had the following folder
structure:

```
img -
    | - weather
        | - sunny.png
        | - cloudy.png
        | - sunny.gif
        | - cloudy.gif
```

the files:

* "img/weather/sunny.png"
* "img/weather/cloudy.png"

would be added as references.

#### resources

This section is for configuring the way in which Srcy matches static files in
your project.

##### resources.root

*default value*: ""

To assist Srcy in finding all your static files a root folder needs to be
specified. Something such as:

```
"./public"
```

##### resources.folders

*default value*: []

Here you list all the folders within your root folder that you expect Srcy to
look for files that you wish to be checked. Such as:

```
"folders": ["img", "pdfs"]
```

##### resources.types

*default value*: ["gif", "png", "jpg", "svg"]

Srcy will only check for files with the suffixes within this array, add any
additional file types that you want to check.

##### resources.ignore

*default value*: []

If you wish to exclude any files from the resource search you can specify them
here.

```
"ignore": ["img/archive/old-logo.gif", "img/archive/christmas-logo.gif"]
```

## Wildcards

As common or popular wildcards come to light they will be added here. Please
feel free to submit ones that you have used (and ideally tested in production)
here to build up a useful reference for others.

### Jade wildcards

####To replace Jade variable references such as:

```
"img/weather/#{weather}.gif"
```

#### use:

```
"#{.*?}"
```

#### matches:

* "img/weather/sunny.gif"
* "img/weather/cloudy.gif"

## License

[MIT](https://raw.github.com/mattyod/srcy/master/LICENSE)
