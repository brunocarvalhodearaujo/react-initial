// @flow
import React, {
  Component,
  type CSSProperties
} from 'react'
import PropTypes from 'prop-types'
import { renderToStaticMarkup } from 'react-dom/server'

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

type Props = {
  className?: string,
  style?: CSSProperties,
  name?: string,
  color?: ?string,
  seed?: number,
  charCount?: number,
  textColor?: string,
  height?: number,
  width?: number,
  fontSize?: number,
  fontWeight?: number,
  fontFamily?: string,
  radius?: number,
  useWords?: boolean
}

export default class Initial extends Component<Props> {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    name: PropTypes.string,
    color: PropTypes.string,
    seed: PropTypes.number,
    charCount: PropTypes.number,
    textColor: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    fontSize: PropTypes.number,
    fontWeight: PropTypes.number,
    fontFamily: PropTypes.string,
    radius: PropTypes.number
  }

  static defaultProps = {
    name: 'Name',
    color: null,
    seed: 0,
    charCount: 1,
    textColor: '#ffffff',
    height: 100,
    width: 100,
    fontSize: 60,
    fontWeight: 400,
    fontFamily: 'HelveticaNeue-Light, Helvetica Neue Light, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif',
    radius: 0
  }

  unicodeCharAt (string: string, index: number): string {
    const first = string.charCodeAt(index)
    let second

    if (first >= 0xD800 && first <= 0xDBFF && string.length > index + 1) {
      second = string.charCodeAt(index + 1)

      if (second >= 0xDC00 && second <= 0xDFFF) {
        return string.substring(index, index + 2)
      }
    }

    return string[ index ]
  }

  unicodeSlice (string: string, start: number, end: number, words: boolean): string {
    let accumulator = ''
    let character
    let stringIndex = 0
    let unicodeIndex = 0
    let nextSpace = -1
    let length = string.length

    while (stringIndex < length) {
      // Find the next space offset from the previous finding
      nextSpace = words ? string.indexOf(' ', nextSpace) : -1
      character = this.unicodeCharAt(string, nextSpace >= 0 ? nextSpace + 1 : stringIndex)

      if (unicodeIndex >= start && unicodeIndex < end) {
        accumulator += character
      }

      stringIndex += character.length
      unicodeIndex += 1
    }

    return accumulator
  }

  render () {
    const { width, height, textColor, fontFamily, fontSize, fontWeight, radius: borderRadius, ...ownProps } = this.props
    const initial = this.unicodeSlice(this.props.name || 'Name', 0, this.props.charCount || 1, this.props.useWords || false).toUpperCase()
    const backgroundColor = this.props.color !== null
      ? this.props.color
      : colors[ Math.floor((initial.charCodeAt(0) + this.props.seed) % colors.length) ]

    const InitialSvg = () => (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        pointerEvents='none'
        {...{
          width,
          height,
          style: {
            width,
            height,
            backgroundColor,
            borderRadius
          }
        }}>
        <text
          y='50%'
          x='50%'
          dy='0.35em'
          pointerEvents='auto'
          fill={textColor}
          fontFamily={fontFamily}
          textAnchor='middle'
          style={{ fontSize, fontWeight }}
          children={initial} />
      </svg>
    )

    const svgHtml: string = 'data:image/svg+xml;base64,' + btoa(
      unescape(
        encodeURIComponent(
          renderToStaticMarkup(
            <InitialSvg />
          )
        )
      )
    )

    return (
      <img
        {...ownProps}
        src={svgHtml}
        alt=''
      />
    )
  }
}
