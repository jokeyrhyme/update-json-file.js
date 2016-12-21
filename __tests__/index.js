/* @flow */
'use strict'

const fs = require('fs')
const path = require('path')

const pify = require('pify')
const temp = require('temp').track()
const rimraf = require('rimraf')

const updateJsonFile = require('../index.js')

let tempPath = temp.path('update-json-file-')

beforeAll(() => pify(fs.mkdir)(tempPath))
afterAll(() => pify(rimraf)(tempPath))

test('updateJsonFile', () => {
  expect(typeof updateJsonFile).toBe('function')
})

test('(sync) updater: (x) => x', () => {
  const filePath = path.join(tempPath, 'sync-unchanged.json')
  const data = { hello: 'world!' }
  const expected = data
  const updater = (x) => x
  return Promise.resolve()
    .then(() => pify(fs.writeFile)(filePath, JSON.stringify(data)))
    .then(() => updateJsonFile(filePath, updater))
    .then(() => pify(fs.readFile)(filePath))
    .then((text) => JSON.parse(text))
    .then((result) => {
      expect(result).toEqual(expected)
    })
})

test('(sync) updater: add property', () => {
  const filePath = path.join(tempPath, 'sync-added.json')
  const data = { hello: 'world!' }
  const expected = { hello: 'world!', abc: 123 }
  const updater = (x) => {
    x.abc = 123
    return x
  }
  return Promise.resolve()
    .then(() => pify(fs.writeFile)(filePath, JSON.stringify(data)))
    .then(() => updateJsonFile(filePath, updater))
    .then(() => pify(fs.readFile)(filePath))
    .then((text) => JSON.parse(text))
    .then((result) => {
      expect(result).toEqual(expected)
    })
})

test('(promise) updater: (x) => x', () => {
  const filePath = path.join(tempPath, 'promise-unchanged.json')
  const data = { hello: 'world!' }
  const expected = data
  const updater = (x) => Promise.resolve(x)
  return Promise.resolve()
    .then(() => pify(fs.writeFile)(filePath, JSON.stringify(data)))
    .then(() => updateJsonFile(filePath, updater))
    .then(() => pify(fs.readFile)(filePath))
    .then((text) => JSON.parse(text))
    .then((result) => {
      expect(result).toEqual(expected)
    })
})

test('(promise) updater: add property', () => {
  const filePath = path.join(tempPath, 'promise-added.json')
  const data = { hello: 'world!' }
  const expected = { hello: 'world!', abc: 123 }
  const updater = (x) => {
    x.abc = 123
    return Promise.resolve(x)
  }
  return Promise.resolve()
    .then(() => pify(fs.writeFile)(filePath, JSON.stringify(data)))
    .then(() => updateJsonFile(filePath, updater))
    .then(() => pify(fs.readFile)(filePath))
    .then((text) => JSON.parse(text))
    .then((result) => {
      expect(result).toEqual(expected)
    })
})
