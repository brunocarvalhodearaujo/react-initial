/**
 * Copyright (c) 2020-present, Bruno Carvalho de Araujo.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import React from 'react'
import renderer from 'react-test-renderer'
import Initial from '../src/Initial'

// https://medium.freecodecamp.org/the-right-way-to-test-react-components-548a4736ab22
test('check rendered component and create snapshot', () => {
  const component = renderer.create(
    <Initial
      name='Varshneya Rao'
      charCount={3}
      width={150}
      useWords
    />
  )

  const tree = component.toJSON()

  expect(tree.type).toEqual('img')
  expect(tree.props.alt).toEqual('')
  expect(tree.props.children).toEqual(undefined)
  expect(typeof tree.props.src).toBe('string')

  expect(tree).toMatchSnapshot()
})
