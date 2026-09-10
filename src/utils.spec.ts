/**
 * Copyright (c) 2026-present, Bruno Carvalho de Araujo.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import { describe, expect, test } from '@jest/globals'
import { unicodeCharAt, unicodeSlice } from './utils'

describe('unicodeCharAt', () => {
  test('returns a single ASCII character', () => {
    expect(unicodeCharAt('abc', 0)).toBe('a')
    expect(unicodeCharAt('hello', 1)).toBe('e')
  })

  test('returns undefined for an out-of-bounds index', () => {
    expect(unicodeCharAt('abc', 10)).toBeUndefined()
  })

  test('returns a high surrogate as-is when it is the last character', () => {
    expect(unicodeCharAt('\uD83D', 0)).toBe('\uD83D')
  })

  test('returns a high surrogate as-is when followed by a non-low surrogate', () => {
    expect(unicodeCharAt('\uD83Dx', 0)).toBe('\uD83D')
  })

  test('returns a low surrogate as-is', () => {
    expect(unicodeCharAt('😀😀', 1)).toBe('\ude00')
  })

  test('returns the full surrogate pair for a supplementary character', () => {
    expect(unicodeCharAt('😀', 0)).toBe('😀')
  })
})

describe('unicodeSlice', () => {
  test('trims leading and trailing spaces before slicing', () => {
    expect(unicodeSlice('  hello  ', 0, 2, false)).toBe('he')
  })

  test('slices characters by index', () => {
    expect(unicodeSlice('hello', 0, 3, false)).toBe('hel')
    expect(unicodeSlice('hello', 0, 0, false)).toBe('')
    expect(unicodeSlice('hello', 10, 20, false)).toBe('')
    expect(unicodeSlice('', 0, 3, false)).toBe('')
  })

  test('splits across words when useWords is set', () => {
    expect(unicodeSlice('John Doe', 0, 2, true)).toBe('JD')
    expect(unicodeSlice('John Doe', 0, 3, true)).toBe('JDo')
  })
})
