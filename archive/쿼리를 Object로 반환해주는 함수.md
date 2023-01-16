# 쿼리를 Object로 반환해주는 함수

```jsx
const getQueryObj = <T extends {}> (search: string): T => {
  const arr = window.location.search.substr(1).split('&');
  return arr.reduce((prev, curr) => {
    const split = curr.split('=');
    return { ...prev, [split[0]]: split[1] }
  }, {} as T);
}
```

`http://example.com/user?email=hello@world.com&name=helloworld`

```js
const queryObj = getQueryObj<{ email: string, name: string }>(window.location.search);
// { email: 'hello@world.com', name: 'helloworld' }
```
