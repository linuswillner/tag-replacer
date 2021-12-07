const Parser = require('expr-eval').Parser
const mathEval = new Parser()

module.exports = {
  math: args => { return mathEval.evaluate(args.join('')) },
  choose: args => { return args[Math.floor(Math.random() * args.length)] },
  range: ([min, max]) => { return Math.floor(Math.random() * parseInt(max) + parseInt(min)) },
  randstr: ([chars, length]) => {
    let str = ''
    for (let i = length; i > 0; i--) {
      str += chars[Math.floor(Math.random() * chars.length)]
    }
    return str
  },
  lower: args => { return args.join(' ').toLowerCase() },
  upper: args => { return args.join(' ').toUpperCase() },
  length: args => { return args.length }
}
