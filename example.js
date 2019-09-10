const TR = require('./index.js') // You can require the NPM module

// You can use the replacers in builtin.js by not passing anything to the constructor
// Or you can pass custom scripted replacers to the constructor to use them
const custom = {
  // Simple replacer without checks
  join: args => { return args.join(', ') }
  // Custom checks can be added here at will to enforce requirements
  // You can also require NPM modules or your own modules and incorporate them in replacers
}

// Initialize the module
const TagReplacer = new TR(custom) // You can also pass an options object

// Call the replacers
console.log(TagReplacer.replace('this tag has {length:arg1;arg2;arg3} arguments')) // 3
console.log(TagReplacer.replace('and the arguments are {join:arg1;arg2;arg3}')) // arg1, arg2, arg3

console.log(TagReplacer.replace('strings can be turned into {upper:uppercase} and {lower:LOWERCASE}')) // UPPERCASE and lowercase
console.log(TagReplacer.replace('the program wants me to eat a {choose:banana;apple;orange}')) // banana, apple or orange

// An example with the format of https://github.com/devsnek/TagScript
// Will work except when tagscript: false is set in the module options
console.log(TagReplacer.replace('TagScript tags ({length;arg1;arg2;arg3}) can also be parsed with {upper;this}'))
