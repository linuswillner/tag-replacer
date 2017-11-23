/**
 * Main TagReplacer class.
 * @class
 */
class TagReplacer {
  /**
   * Replacer options.
   * @param {Array.<name: String, func: Function>} replacers - Array of replacer objects.
   * @param {Object} options - Object containing the options to pass to the replacer.
   */
  constructor (replacers, options) {
    this.replacers = replacers
    this.options = options
  }

  /**
   * Parse a string for tags and replace them.
   * @param {Array.<String>} strings - Strings to parse tags from.
   * @returns {Promise} - Promise that resolves with the parsed strings.
   */
  parse (strings) {
    return new Promise(resolve => {
      strings.forEach((string) => {
        let matches = string.match(/{(.*?)}/gi)
        matches.forEach((tag) => {
          let input = tag.slice(1, -1)
          let name = input.split(':', 2)[0]
          let args = input.split(':', 2)[1].split(';')

          if (this._mapReplacers('names').some(r => r.includes(name))) {
            
          }
        })
      })
    })
  }

  _mapReplacers (val) {
    if (val === 'names') return this.replacers.map((r) => { return r.name })
    if (val === 'funcs') return this.replacers.map((r) => { return r.func })
    else return undefined
  }
}

module.exports = TagReplacer
