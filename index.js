/* @flow */
'use strict'

const loadJsonFile = require('load-json-file')
const writeJsonFile = require('write-json-file')

/* ::
type Updater = (value: any) => any | Promise<any>
*/

module.exports = function updateJsonFile (
  filePath /* : string */,
  updater /* : Updater */,
  options /* : any | void */
) /* : Promise<void> */ {
  return Promise.resolve()
    .then(() => loadJsonFile(filePath))
    .catch((err) => {
      if (options && options.defaultValue) {
        if (typeof options.defaultValue === 'function') {
          return options.defaultValue()
        }
        return options.defaultValue
      }
      throw err
    })
    .then((data) => updater(data))
    .then((data) => writeJsonFile(filePath, data, options))
}
