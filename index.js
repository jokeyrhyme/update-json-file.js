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
  options /* : any */
) /* : Promise<void> */ {
  return Promise.resolve()
    .then(() => loadJsonFile(filePath))
    .then((data) => updater(data))
    .then((data) => writeJsonFile(filePath, data, options))
}
