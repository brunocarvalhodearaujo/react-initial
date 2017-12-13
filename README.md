**React Initial**
=============

Simple react component to make Gmail like text avatars for profile pictures.

### Browser compatibility
  - Chrome
  - Firefox
  - Opera 9+
  - Safari 3.2+
  - iOS Safari 3.2+
  - Android Browser 3+

### Usage

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { Initial } from 'react-initial'

const App = () => (
  <Initial name='Bruno Carvalho de Araujo' />
)

ReactDOM.render(<App />, document.getElementById('root'))
```

### Props
The `Initial` component takes a couple of props that you can use to customize its behaviour:

| Prop       | type   | Description                                                    | Default  |
|------------|--------|----------------------------------------------------------------|----------|
| name       | string | Name of the user which the profile picture should be generated | Name     |
| height     | number | Height of the picture                                          | 100      |
| width      | number | Width of the picture                                           | 100      |
| charCount  | number | Number of characherts to be shown in the picture.              | 1        |
| textColor  | string | Color of the text                                              | #ffffff  |
| fontSize   | number | Font size of the character(s)                                  | 60       |
| fontWeight | number | Font weight of the character(s)                                | 400      |
| radius     | number | Rounded corners                                                | 0        |
| seed       | number | Number to randomize the background color                       | 0        |
| color      | string | Background color of the profile picture that should be generated| null    |


### References to create project
  - [initial.js](https://github.com/judesfernando/initial.js)
  - [Creating TypeScript typings for existing React components](https://templecoding.com/blog/2016/03/31/creating-typescript-typings-for-existing-react-components/)
