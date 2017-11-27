/* eslint-disable no-extend-native */
const defaultReplacers = require('./builtin.js')

// Hackery to properly replace all occurrences of something in a string
String.prototype.replaceAll = (string, searchString, replaceString) => {
  return string.split(searchString).join(replaceString)
}

/**
 * Main TagReplacer class.
 * @class
 */
class TagReplacer {
  /**
   * Replacer options.
   * @param {Object} replacers - Object with custom replacers. See https://github.com/LWTechGaming/tree/master/builtin.js for examples.
   */
  constructor (replacers) {
    this.replacers = replacers
  }

  /**
   * Parse a string for tags and replace them.
   * @param {String} string - String to parse tags from.
   * @returns {String} - String where the tags have been replaced with the appropriate values.
   */
  replace (string) {
    let tags = string.match(/{(.*?\S(:|;).*?\S)}/gi)
    let newString = string

    if (!tags) {
      // Return unchanged string
      return string
    } else {
      for (let tag of tags) {
        // Parse function name and args
        let raw = tag.slice(1, -1)
        let input = raw.split(/:|;/gi)
        let name = String(input.splice(0, 1))
        let args = input

        if (!this.replacers && defaultReplacers.hasOwnProperty(name)) {
          let val = defaultReplacers[name](args)
          newString = newString.replaceAll(newString, tag, val)
        } else if (this.replacers) {
          let val
          // If custom replacers contain this one, use that
          if (this.replacers.hasOwnProperty(name)) {
            val = this.replacers[name](args)
            newString = newString.replaceAll(newString, tag, val)
          // If default replacers contain this one, use that
          } else if (defaultReplacers.hasOwnProperty(name)) {
            val = defaultReplacers[name](args)
            newString = newString.replaceAll(newString, tag, val)
          }
        }
      }
      return newString
    }
  }
}

exports.TagReplacer = TagReplacer