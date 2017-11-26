const TR = require('./index.js').TagReplacer // You can require the NPM module

// You can use the replacers in builtin.js by not passing anything to the constructor
// Or you can pass custom scripted replacers to the constructor to use them
const custom = {
  // Simple replacer without checks
  'join': args => { return args.join(', ') }
  // Custom checks can be added at will here to enforce requirements
  // You can also require NPM modules or your own modules and incorporate them in replacers
}

// Initialize the module
const TagReplacer = new TR(custom)

// Call the replacers
let a = TagReplacer.replace('this tag has {length:arg1;arg2;arg3} arguments') // 3
let b = TagReplacer.replace('and the arguments are {join:arg1;arg2;arg3}') // arg1, arg2, arg3
let c = TagReplacer.replace('strings can be turned into {upper:uppercase} and {upper:LOWERCASE}') // UPPERCASE
let d = TagReplacer.replace('the program wants me to eat a {choose:banana;apple;orange}') // banana, apple or orange

console.log(a)
console.log(b)
console.log(c)
console.log(d)
