/**
 * Copyright (c) 2026-present, Bruno Carvalho de Araujo.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import { FC, useCallback, useMemo, type CSSProperties } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { unicodeSlice } from './utils'

const colors: string[] = [
  '#1abc9c',
  '#16a085',
  '#f1c40f',
  '#f39c12',
  '#2ecc71',
  '#27ae60',
  '#e67e22',
  '#d35400',
  '#3498db',
  '#2980b9',
  '#e74c3c',
  '#c0392b',
  '#9b59b6',
  '#8e44ad',
  '#bdc3c7',
  '#34495e',
  '#2c3e50',
  '#95a5a6',
  '#7f8c8d',
  '#ec87bf',
  '#d870ad',
  '#f69785',
  '#9ba37e',
  '#b49255',
  '#b49255',
  '#a94136'
]

export type Props = {
  /**
   * @ignore
   */
  className?: string,
  /**
   * @ignore
   */
  style?: CSSProperties,
  /**
   * Name of the user which the profile picture should be generated
   */
  name?: string,
  /**
   * Background color of the profile picture that should be generated
   */
  color?: string,
  /**
   * Number to randomize the background color
   */
  seed?: number,
  /**
   * Number of characherts to be shown in the picture.
   */
  charCount?: number,
  /**
   * Color of the text
   */
  textColor?: string,
  /**
   * Height of the picture
   */
  height?: number,
  /**
   * Width of the picture
   */
  width?: number,
  /**
   * Font size of the character(s)
   */
  fontSize?: number,
  /**
   *  Font weight of the character(s)
   */
  fontWeight?: number,
  /**
   * @ignore
   */
  fontFamily?: string,
  /**
   * Rounded corners
   */
  radius?: number,
  /**
   * Number of characters while splitting the words over spaces
   */
  useWords?: boolean
}

export const Initial: FC<Props> = ({
  name = 'Name',
  color = null,
  seed = 0,
  charCount = 1,
  textColor = '#ffffff',
  height = 100,
  width = 100,
  fontSize = 60,
  fontWeight = 400,
  fontFamily = 'HelveticaNeue-Light, Helvetica Neue Light, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif',
  radius = 0,
  useWords = false,
  ...ownProps
}) => {
  const initial: string = useMemo(() => {
    return unicodeSlice(name || 'Name', 0, charCount || 1, useWords || false).toUpperCase()
  }, [name, charCount, useWords])

  const backgroundColor: string = useMemo(() => {
    if (color !== null) {
      return color
    }

    return colors[Math.floor((initial.charCodeAt(0) + seed) % colors.length)]
  }, [color, initial, seed])

  const InitialSvg = useCallback(() => (
    <svg xmlns='http://www.w3.org/2000/svg' pointerEvents='none' {...{ width, height, style: { width, height, backgroundColor, borderRadius: radius } }}>
      <text
        y='50%'
        x='50%'
        dy='0.35em'
        pointerEvents='auto'
        fill={textColor}
        fontFamily={fontFamily}
        textAnchor='middle'
        style={{ fontSize, fontWeight }}
        children={initial}
      />
    </svg>
  ), [initial, backgroundColor, textColor, fontFamily, fontSize, fontWeight, width, height, radius])

  const svgHtml: string = useMemo(() => {
    return 'data:image/svg+xml;base64,' + btoa(
      unescape(
        encodeURIComponent(
          renderToStaticMarkup(
            <InitialSvg />
          )
        )
      )
    )
  }, [InitialSvg])

  return (
    <img alt='' {...ownProps} src={svgHtml} />
  )

}

export default Initial
