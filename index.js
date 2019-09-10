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
   * @param {Object} replacers - Object with custom replacers.
   * @param {Object} options - Object with options.
   * @see https://github.com/linuswillner/tag-replacer/tree/master/builtin.js for information about custom replacers.
   * @see https://github.com/linuswillner/tag-replacer#readme for information about options.
   */
  constructor (replacers, options) {
    this.replacers = replacers
    this.options = options
  }

  /**
   * Parse a string for tags and replace them.
   * @param {String} string - String to parse tags from.
   * @returns {String} - String where the tags have been replaced with the appropriate values.
   */
  replace (string) {
    if (!string) return undefined // No string, return undefined
    else {
      let re
      if (this.options && this.options.tagscript === false) re = /{(.*?\S(:).*?\S)}/gi
      else re = /{(.*?\S(:|;).*?\S)}/gi

      const tags = string.match(re)
      let newString = string

      if (!tags) return string // No matches, return unchanged
      else {
        for (const tag of tags) {
        // Parse function name and args
          const raw = tag.slice(1, -1)
          const input = this.options && this.options.tagscript === false ? raw.split(/:/gi) : raw.split(/:|;/gi)
          const name = String(input.splice(0, 1))
          const args = input

          if (!this.replacers && defaultReplacers[name]) {
            const val = defaultReplacers[name](args)
            newString = newString.replaceAll(newString, tag, val)
          } else if (this.replacers) {
            let val
            // Prioritise custom replacers over default
            if (this.replacers[name]) {
              val = this.replacers[name](args)
              newString = newString.replaceAll(newString, tag, val)
              // Fallback to defaults if custom replacers didn't contain it
            } else if (defaultReplacers[name]) {
              val = defaultReplacers[name](args)
              newString = newString.replaceAll(newString, tag, val)
            } else {
              return string // Nothing passed
            }
          } else {
            return string // Nothing passed
          }
        }
        return newString
      }
    }
  }
}

module.exports = TagReplacer
