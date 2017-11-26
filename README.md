# tag-replacer

A Node.js module for replacing template tags in strings. It allows you to set placeholders in strings that can be filled in later.

## How it works

The module scans for **{tags}** in the strings it's provided with. The required format is **{cmd:arg1}**. You can add as many semicolon-separated (**arg1;arg2;arg3**) arguments as you need.

You can use the [built-in replacers](builtin.js) or program your own and pass them to the constructor. See [example.js](example.js) and the API reference below for more information.

## API

### TagReplacer(replacers)

Main TagReplacer class. `replacers` is an object containing your custom replacers.

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
  'trim': args => { return args[0].trim() } // Perform the method on element 0, or write custom checks
}
```

### TagReplacer.replace(string)

Replacer method. Scans `string` for any tags with the valid format and replaces them, if a replacer exists for them.

## Checks and errors

Sometimes, users aren't exactly co-operative. In fact, they rarely are. As such, you may need to employ some form of input validation for more complicated replacers, and if necessary, figure out what to do about it.

Since the replacers are normal JavaScript functions, custom replacers can execute any JavaScript code. You can use this to your advantage, for example like this:
```js
const replacers = {
  'lower': (args, data) => {
    if (args.length > 1) { // Simple if statement
      data.maxArgs = 1 // Set error data parameter
      return utils.constructError(data, 'toomany') // Construct error and return it
    } else return args[0].toLowerCase()
  },
}
```
