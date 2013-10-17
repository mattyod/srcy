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

```
"scripts": {
    srcy": "node node_modules/srcy/srcy.js"
}
```

## Configuration {#configuration}

### Create a config file {#createConfig}

In order to run Srcy your project will need a **srcy.conf.json** file at the
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
        "replace": {},
        "ignore": [],
        "wildcards": []
    },
    "images": {
        "root": "",
        "folders": [],
        "types": ["gif", "png", "jpg", "svg"],
        "ignore": []
    }
}
```

### Editing the config file {#editConfig}

Srcy will catch many issues for you out of the box like this but it's highly
unlikely that some exceptions unusual syntax examples won't cause unexpected
results so Srcy is designed to be highly configurable to allow you to tune it to
the specifics of your project.

#### refs {#configRefs}

This section is for configuring how Srcy searches your project code base for
references to images.

##### refs.whitelist {#configRefsWhitelist}

default value: false
type when populated: array

If you wish to specify very folders or files that Srcy should check and only
check then add the them to an array such as:

```
"whitelist": ["web", "css", "js"]
```

If no whitelist is specified Srcy will just start at the project root and check
all files and folders that aren't [blacklisted](#configRefsBlacklist).

##### refs.blacklist {#configRefsBlacklist}

default value: []

In most cases you won't want to check every file in your project and doing so
may effect the performance of Srcy. Add any files or folders that you do not
wish checked to this array, such as:

```
"blacklist": ["node_modules", "test", "README.md", "package.json", "web/images"]
```

##### refs.replace {#configRefsReplace}

default value: {}

In some cases you may wish to replace an image reference with one or many
others. **N.B** replace takes presedence over [wildcards](#configRefsWildcards).

Say you have a reference such as:

```
"img/buttons/" + onOffState + ".gif"
```

inside one of your JavaScript files. You may wish to specify that this reference
should actually refer to the two seperate image files "img/buttons/on.gif" and
"img/buttons/off.gif".

In order to acheive this you would set the replace attribute to be:

```
"replace": {
    "img/buttons/' + onOffState + '.gif": [
        'img/buttons/on.gif',
        'img/buttons/off.gif'
    ]
}
```

Both files will now be matched against your project set up.

##### refs.ignore {#configRefsIgnore}

default value: []

You may wish to ignore certain image references within your code base, perhaps
they refer to external resources with similar matching patterns or are
described as plain test and not actually part of your project. Any references
you wish to exclude from Srcy's checks should be listed as such:

```
"ignore": ["img/example.gif", "img/someOtherSitesLogo.gif"]
```

##### refs.wildcards {#configRefsWildcards}

More powerful than replace, wildcards allows you to match and replace file
references based on a regular expression. You can create your own matchers but
some popular examples ar included in the [wildcards section](#wildcards).

If for example you are using [Jade](http://jade-lang.com/) templates you may
wish to specify a jade variable as a wildcard such as:

```
"wildcards": ["#{.*?}"]
```

This would mean that if a reference such as:

```
"img/weather/#{weather}.png"
```

It would be replaced with a reference to every image inside the weather folder
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

the files "img/weather/sunny.png" & "img/weather/cloudy.png" would be added as
references.

#### images {#configImages}

This section is for configuring the way in which Srcy matches images in your
project.

##### images.root {#configImagesRoot}

default.value: ""

To assist Srcy in finding all your images a root folder needs to be specified.
Something such as:

```
"./public"
```

##### images.folders {#configImagesFolders}

default.value: []

Here you list all the folders within your 'root' folder that you expect Srcy to
look for images or other assets that you wish to be checked. Such as:

```
"folders": ["img", "pdfs"]
```

Srcy will scan through each of these folders looking for assets.

##### images.types {#configImagesTypes}

default value: ["gif", "png", "jpg", "svg"]

This means that Srcy will only check for files with the suffixes .gif, .png,
.jpg and .svg, if you wish to check for other file types simply add them to the
array.

##### images.ignore {#configImagesIgnore}

default.value: []

If for any reason you wish to exclude any files from the 'image' search you can
specify them here and they will simply be ignored by Srcy.

```
"ignore": ["img/archive/old-logo.gif", "img/archive/christmas-logo.gif"]
```

## Wildcards {#wildcards}

As common or popular wildcards come to light they will be added here. Please
feel free to submit ones that you have used and ideally tested in production
here to build up a useful reference for othere.

### Jade wildcards {#wildcardsJade}

To replace Jade variable references such as:

```
"img/weather/#{weather}.gif"
```

use:

```
"#{.*?}"
```

## License

[MIT](https://raw.github.com/mattyod/srcy/master/LICENSE)
