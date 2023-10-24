#Snippet

```jsx
const useEventCallback = function (fn) {
    var ref = useRef(fn);
    useLayoutEffect(function () {
        ref.current = fn;
    });
    return useMemo(function () { return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var current = ref.current;
        return current.apply(void 0, args);
    }; }, []);
};
```