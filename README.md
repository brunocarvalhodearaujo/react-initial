<p align="center">
  <img
    width="100px"
    heigth="100px"
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Silver_medal_icon_%28S_initial%29.svg/2000px-Silver_medal_icon_%28S_initial%29.svg.png"
    alt="react-initial">
</p>
<h1 align="center">React Initial</h1>
<p align="center">Simple react component to make Gmail like text avatars for profile pictures.</p>

[![npm version](https://badge.fury.io/js/react-initial.svg)](http://badge.fury.io/js/react-initial)
[![License](https://img.shields.io/npm/l/react-initial.svg)](https://www.npmjs.com/package/react-initial) 
[![Dependency Status](https://david-dm.org/brunocarvalhodearaujo/react-initial.svg?style=flat-square)](https://david-dm.org/brunocarvalhodearaujo/react-initial)
[![devDependency Status](https://david-dm.org/brunocarvalhodearaujo/react-initial/dev-status.svg?style=flat-square)](https://david-dm.org/brunocarvalhodearaujo/react-initial#info=devDependencies)
[![npm](https://img.shields.io/npm/dt/react-initial.svg)]()

## Usage

```js
import React, { Component } from 'react'
import { Initial } from 'react-initial'

export default class MyComponent extends Component {
  render () {
    return (
      <Initial
        name='Bruno Carvalho de Araujo'
      />
    )
  }
}
```

## Props

The `Initial` component takes a couple of props that you can use to customize its behaviour:

| **Name**     |**Type**| **Description**                                                 |**Default**|
|--------------|--------|-----------------------------------------------------------------|-----------|
| `name`       | string | Name of the user which the profile picture should be generated  | Name      |
| `height`     | number | Height of the picture                                           | 100       |
| `width`      | number | Width of the picture                                            | 100       |
| `charCount`  | number | Number of characherts to be shown in the picture.               | 1         |
| `textColor`  | string | Color of the text                                               | #ffffff   |
| `fontSize`   | number | Font size of the character(s)                                   | 60        |
| `fontWeight` | number | Font weight of the character(s)                                 | 400       |
| `radius`     | number | Rounded corners                                                 | 0         |
| `seed`       | number | Number to randomize the background color                        | 0         |
| `color`      | string | Background color of the profile picture that should be generated| null      |
| `useWords`   | boolean | number of characters while splitting the words over spaces     | null      |

## Compatibility

- Chrome
- Firefox
- Opera 9+
- Safari 3.2+
- iOS Safari 3.2+
- Android Browser 3+

## References to create project

- [initial.js](https://github.com/judesfernando/initial.js)
- [Creating TypeScript typings for existing React components](https://templecoding.com/blog/2016/03/31/creating-typescript-typings-for-existing-react-components/)
