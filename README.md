# tag-replacer

<p>
  <img src="https://badges.greenkeeper.io/LWTechGaming/tag-replacer.svg">
  <img src="https://img.shields.io/circleci/project/github/LWTechGaming/tag-replacer.svg">
  <img src="https://img.shields.io/github/tag/LWTechGaming/tag-replacer.svg">
  <img src="https://img.shields.io/npm/l/tag-replacer.svg">
<p>

A Node.js module for replacing template tags in strings. It allows you to set placeholders in strings that can be filled in later.

This module was extensively inspired by, and also supports the syntax of, [devsnek/TagScript](https://github.com/devsnek/TagScript). All built-in replacers are intended to be compatible with TagScript tags, some were not ported over to this module.

You may ask yourself, why should I use this over TagScript? The answer is that TagScript is a very complicated module, one which could be classified as an interpreter. It features a compiler, lexer and IDE highlighter. It also requires you to install Python 2.7 and so forth due to the dependencies it has. As such, it can be frightening to newcomers and a little too complicated for common use cases.

The idea of this module is to provide a lightweight and simple alternative to TagScript, retaining the common syntax and compatibility, while providing a good way to deal with customizeable user input and output.

## Installation & usage

If you wish to receive updates more scarcely in an LTS-esque way, just install the module from NPM via `npm install --save tag-replacer`.

If you want newer features immediately, make the module get the code from the `dev` branch via `npm install --save github:lwtechgaming/tag-replacer#dev`.

The module scans for **{tags}** in the strings it's provided with. The required format is **{cmd:arg}**. You can add as many semicolon-separated (**arg1;arg2;arg3**) arguments as you need. You can also use the TagScript syntax (**{cmd;arg}**) if `tagscript` is not set to `false` in the [options](#configuration).

You can use the [built-in replacers](builtin.js) or program your own and pass them to the constructor. Details on how to do this can be found in [example.js](example.js) and the API reference below.

Example:
```js
const TR = require('tag-replacer').TagReplacer
const TagReplacer = new TR() // No custom replacers

// TagReplacer-style tag
TagReplacer.replace('this tag has {length:arg1;arg2;arg3} arguments') // 3
// TagScript-style tag
TagReplacer.replace('this tag has {length;arg1;arg2;arg3} arguments') // 3
```

## API

### TagReplacer(replacers, options)

Main TagReplacer class. `replacers` is an object containing your custom replacers. `options` is an object with option definitions, see [Configuration](#configuration).

The `replacers` object contains object properties that are [functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) which return a [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String).

Example:
```js
const replacers = {
  // Arrow function shorthand; allows for very short definitions
  'length': args => { return args.length },
  // Longer and traditional function method
  'trim': function (args) {
    return args[0].trim()
  }
}
```

**Note:** `args` is always an [array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) regardless of item amount. As such, you must ensure that you don't attempt to execute functions on the entire array.

Example:
```js
const replacers = {
  'length': args => { return args.length }, // Array-compatible method
  'trim': args => { return args[0].trim() } // Perform the method on element 0, or iterate over the array
}
```

### TagReplacer.replace(string)

Replacer method. Scans `string` for any tags with the valid format and replaces them, if a replacer exists for them. If no replacer exists or the format is invalid, the string will be returned in unchanged form. If no string is passed, the function will return `undefined`.

## Configuration

Currently, the module supports the following options:

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| tagscript | Whether to parse TagScript-formatted tags or not. | Boolean | true |

## Custom checks

Sometimes, users aren't exactly co-operative. In fact, they rarely are. As such, you may need to employ some form of input validation for more complicated replacers, and if necessary, figure out what to do about it.

Since the replacers are normal JavaScript functions, custom replacers can execute any JavaScript code. You can use this to your advantage, for example like this:
```js
const replacers = {
  'lower': (args, data) => {
    if (args.length > 1) { // Simple if statement
      return undefined // Return undefined, or something else
    } else return args[0].toLowerCase()
  },
}
```
