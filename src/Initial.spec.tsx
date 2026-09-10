/**
 * Copyright (c) 2026-present, Bruno Carvalho de Araujo.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import { expect, test, describe } from '@jest/globals'
import renderer from 'react-test-renderer'
import Initial, { type Props } from './Initial'

const decodeSvg = (src: string): string => atob(src.split(',')[1])

const colorOf = (src: string): string => decodeSvg(src).match(/background-color:([^;]*)/)[1]

const render = (props: Partial<Props> = {}) => renderer.create(<Initial {...props} />)

describe('Initial', () => {
  test('renders a single <img> with a data:image/svg+xml base64 src and empty alt', () => {
    const tree = render({ name: 'John Doe' }).toJSON()
    expect(tree.type).toBe('img')
    expect(tree.props.src).toMatch(/^data:image\/svg\+xml;base64,/)
    expect(tree.props.alt).toBe('')
  })

  test('defaults a missing name to "Name"', () => {
    const svg = decodeSvg(render({}).toJSON().props.src)
    expect(svg).toContain('>N<')
    expect(svg).not.toContain('>m<')
  })

  test('falls back to "Name" for an empty name', () => {
    const svg = decodeSvg(render({ name: '' }).toJSON().props.src)
    expect(svg).toContain('>N<')
  })

  test('extracts the first letter and uppercases it', () => {
    const svg = decodeSvg(render({ name: 'Ada Lovelace' }).toJSON().props.src)
    expect(svg).toContain('>A<')
    expect(svg).not.toContain('>a<')
  })

  test('honors charCount to show more characters', () => {
    const svg = decodeSvg(render({ name: 'Ada Lovelace', charCount: 3 }).toJSON().props.src)
    expect(svg).toContain('>ADA<')
    expect(svg).not.toContain('Lovelace')
  })

  test('splits across words when useWords is set', () => {
    const svg = decodeSvg(render({ name: 'John Doe', charCount: 2, useWords: true }).toJSON().props.src)
    expect(svg).toContain('>JD<')
    expect(svg).not.toContain('>oe<')
  })

  test('handles unicode (surrogate pairs) without crashing', () => {
    const tree = render({ name: '😀😀' }).toJSON()
    expect(tree.type).toBe('img')
    expect(decodeSvg(tree.props.src)).toContain('text-anchor="middle"')
  })

  test('uses a custom color when provided', () => {
    const svg = decodeSvg(render({ name: 'John', color: '#010203' }).toJSON().props.src)
    expect(svg).toContain('background-color:#010203')
  })

  test('selects a deterministic background color from the palette by default', () => {
    // 'N' -> charCodeAt('N') = 78, 78 % 26 = 0 -> '#1abc9c'
    expect(colorOf(render({ name: 'N' }).toJSON().props.src)).toBe('#1abc9c')
  })

  test('applies the seed to shift the background color', () => {
    // (78 + 1) % 26 = 1 -> '#16a085'
    expect(colorOf(render({ name: 'N', seed: 1 }).toJSON().props.src)).toBe('#16a085')
  })

  test('respects a custom textColor', () => {
    const svg = decodeSvg(render({ name: 'John', textColor: '#ff0000' }).toJSON().props.src)
    expect(svg).toContain('fill="#ff0000"')
  })

  test('applies width, height, borderRadius and font styling to the svg', () => {
    const svg = decodeSvg(
      render({ name: 'John', width: 150, height: 80, radius: 12, fontSize: 40, fontWeight: 700 }).toJSON().props.src
    )
    expect(svg).toContain('width="150"')
    expect(svg).toContain('height="80"')
    expect(svg).toContain('border-radius:12px')
    expect(svg).toContain('font-size:40px')
    expect(svg).toContain('font-weight:700')
  })

  test('marks the svg non-interactive while keeping the text interactive', () => {
    const svg = decodeSvg(render({ name: 'John' }).toJSON().props.src)
    expect(svg).toContain('pointer-events="none"')
    expect(svg).toContain('pointer-events="auto"')
  })

  test('forwards arbitrary props (id, title) to the <img>', () => {
    const tree = render({ name: 'John', id: 'avatar-1', title: 'Profile' }).toJSON()
    expect(tree.props.id).toBe('avatar-1')
    expect(tree.props.title).toBe('Profile')
  })

  test('matches its snapshot', () => {
    const tree = render({ name: 'Varshneya Rao', charCount: 3, width: 150, useWords: true }).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
