/**
 * Copyright (c) 2026-present, Bruno Carvalho de Araujo.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

export const unicodeCharAt = (string: string, index: number): string => {
  const first = string.charCodeAt(index)
  let second

  if (first >= 0xD800 && first <= 0xDBFF && string.length > index + 1) {
    second = string.charCodeAt(index + 1)

    if (second >= 0xDC00 && second <= 0xDFFF) {
      return string.substring(index, index + 2)
    }
  }

  return string[index]
}

export const unicodeSlice = (string: string, start: number, end: number, words: boolean): string => {
  let accumulator = ''
  let character
  let stringIndex = 0
  let unicodeIndex = 0
  let nextSpace = -1
  const length = string.length

  // Remove any leading/trailing spaces
  string = string.trim()

  while (stringIndex < length) {
    character = unicodeCharAt(string, stringIndex)

    if (unicodeIndex >= start && unicodeIndex < end) {
      accumulator += character
    } else {
      break
    }

    stringIndex += character.length
    unicodeIndex += 1

    // Find the next space offset from the previous finding
    nextSpace = words ? string.indexOf(' ', nextSpace + 1) : -1
    stringIndex = nextSpace > 0 ? nextSpace + 1 : stringIndex
  }

  return accumulator
}
