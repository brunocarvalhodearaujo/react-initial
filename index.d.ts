/**
 * Copyright 2019-present Bruno Carvalho de Araujo.
 * This source code is licensed under the proprietary license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react'

interface Props {
  className?: string,
  style?: React.CSSProperties,
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

export declare const Initial: React.ComponentType<Props>
export default Initial
