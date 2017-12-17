import React from 'react'
import renderer from 'react-test-renderer'
import Initial from '../src/Initial'

// https://medium.freecodecamp.org/the-right-way-to-test-react-components-548a4736ab22
test('check rendered component and create snapshot', () => {
  const component = renderer.create(
    <Initial name='Bruno Carvalho de Araujo' />
  )

  let tree = component.toJSON()

  expect(tree.type).toEqual('img')
  expect(tree.props.alt).toEqual('')
  expect(tree.props.children).toEqual(undefined)
  expect(typeof tree.props.src).toBe('string')

  expect(tree).toMatchSnapshot()
})
