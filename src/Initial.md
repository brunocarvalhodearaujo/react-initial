Simple react component to make Gmail like text avatars for profile pictures.

```js
<Initial
  radius={300}
  name='Bruno Carvalho de Araujo'
/>
```

```jsx noeditor
const [isRounded, setIsRounded] = React.useState(false)

;<div>
  <button onClick={() => setIsRounded(!isRounded)}>rounded</button>
  <div>
    <Initial radius={isRounded ? 300 : 0} />
  </div>
</div>
```

### Compatibility

- Chrome
- Firefox
- Opera 9+
- Safari 3.2+
- iOS Safari 3.2+
- Android Browser 3+
