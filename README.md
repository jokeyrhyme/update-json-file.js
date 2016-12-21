# update-json-file.js [![npm](https://img.shields.io/npm/v/update-json-file.svg?maxAge=2592000)](https://www.npmjs.com/package/update-json-file) [![Travis CI Status](https://travis-ci.org/jokeyrhyme/update-json-file.js.svg?branch=master)](https://travis-ci.org/jokeyrhyme/update-json-file.js)

safely and conveniently edit the contents of a JSON file


## Example

```js
const updateJsonFile = require('update-json-file')

const filePath = '/path/to/file/to/update.json'

updateJsonFile(filePath, (data) => {
  data.abc = 123
  return data
})
```


## API

```
type Updater = (value: any) => any | Promise<any>

updateJsonFile = (
  filePath: string,
  updater: Updater,
  options?: any
) => Promise<void>
```

-   `options` pass through to [write-json-file](https://github.com/sindresorhus/write-json-file#options)


## See Also

-   [load-json-file](https://github.com/sindresorhus/load-json-file)

-   [write-json-file](https://github.com/sindresorhus/write-json-file)
