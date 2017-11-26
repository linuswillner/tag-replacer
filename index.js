/* eslint-disable no-extend-native */
const defaultReplacers = require('./builtin.js')

String.prototype.replaceAll = (string, searchString, replaceString) => {
  return string.split(searchString).join(replaceString)
}

function replaceAllTags (string, matches, replace) {
  for (let match in matches) {
    string = string.replaceAll(string, matches[match], replace)
  }
  return string
}

/**
 * Main TagReplacer class.
 * @class
 */
class TagReplacer {
  /**
   * Replacer options.
   * @param {Array.<name: String, func: Function>} replacers - Array of replacer objects.
   */
  constructor (replacers) {
    this.replacers = replacers
  }

  /**
   * Parse a string for tags and replace them.
   * @param {String} string - String to parse tags from.
   * @returns {Promise} - Promise that resolves with the parsed strings.
   */
  replace (string) {
    let tags = string.match(/{(.*?\S(:|;).*?\S)}/gi)
    let newString = ''

    // Get the tag contents and split them into name and args
    let raw = tags[0].slice(1, -1)
    let input = raw.split(/:|;/gi)
    let name = input.splice(0, 1)
    let args = input

    if (!this.replacers && defaultReplacers.hasOwnProperty(name)) {
      let val = defaultReplacers[name](args)
      newString = replaceAllTags(string, tags, val)
    } else if (this.replacers) {
      let val
      // If custom replacers contain this one, use that
      if (this.replacers.hasOwnProperty(name)) {
        val = this.replacers[name](args)
        newString = replaceAllTags(string, tags, val)
      // If default replacers contain this one, use that
      } else if (defaultReplacers.hasOwnProperty(name)) {
        val = defaultReplacers[name](args)
        newString = replaceAllTags(string, tags, val)
      } else {
        return // Do nothing, replacer not found
      }
    } else {
      return // Do nothing, replacer not found
    }
    return newString
  }
}

exports.TagReplacer = TagReplacer
