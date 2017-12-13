import * as React from 'react'

interface Props {
  name?: string,
  color?: string,
  seed?: number,
  charCount?: number,
  textColor?: string,
  height?: number,
  width?: number,
  fontSize?: number,
  fontWeight?: number,
  fontFamily?: string,
  radius?: number
}

export declare class Initial extends React.Component<Props> {}
