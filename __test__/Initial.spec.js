import React from 'react'
import renderer from 'react-test-renderer'
import Initial from '../src/Initial'

// https://medium.freecodecamp.org/the-right-way-to-test-react-components-548a4736ab22
test('check rendered component and create snapshot', () => {
  const component = renderer.create(
    <Initial name='Varshneya Rao' charCount={3} width={150} useWords={true} />
  )

  let tree = component.toJSON()

  expect(tree.type).toEqual('img')
  expect(tree.props.alt).toEqual('')
  expect(tree.props.children).toEqual(undefined)
  expect(typeof tree.props.src).toBe('string')
  console.log(tree.props.src);

  expect(tree).toMatchSnapshot()
})
