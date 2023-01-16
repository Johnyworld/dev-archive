
useEffect를 사용할 때 첫 번째 렌더링에서는 실행이 되지 않고, 두 번째 렌더링부터 실행되게 하고 싶은 경우 아래 훅을 사용할 수 있습니다.

```js
const useIsMounted = () => {
  const isMountedRef = useRef(false);
  useEffect(() => {
    isMountedRef.current = true;
  }, []);
  return isMountedRef.current;
};
```

`useIsMounted` 훅을 사용하는 곳에서는 아래와 같이 사용합니다.

```js
const isMounted = useIsMounted();

useEffect(() => {
  if (!isMounted) return;

  // do something

}, [isMounted]);
```

### 출처

[https://stackoverflow.com/questions/53179075/with-useeffect-how-can-i-skip-applying-an-effect-upon-the-initial-render](https://stackoverflow.com/questions/53179075/with-useeffect-how-can-i-skip-applying-an-effect-upon-the-initial-render)