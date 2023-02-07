# Referencing Values with Refs

컴포넌트가 어떤 정보를 "기억"하고 싶지만 [새로운 렌더링을 발생](https://beta.reactjs.org/learn/render-and-commit)시키게 하고싶지 않을 때 ref 를 사용할 수 있다.

### 이런 것들을 배우게 된다

- 컴포넌트에 ref를 어떻게 추가하는지
- ref의 값을 어떻게 업데이트 하는지
- ref가 state와 어떻게 다른지
- ref를 어떻게 안정하게 쓰는지

### 컴포넌트에 ref 추가하기

리액트로부터 `useRef` 훅을 가져오면서 ref를 컴포넌트에 추가할 수 있다.

```js
import { useRef } from 'react';
```

컴포넌트 내에서, `useRef` 훅을 호출하는 유일한 인수로 참조하고자 하는 초기값을 전달한다. 예를들어, 이것은 값 `0`에 대한 참조이다:

```js
const ref = useRef(0);
```

`useRef`는 이와 같은 객체를 리턴한다:

```js
{ 
  current: 0 // The value you passed to useRef
}
```

`ref.current` 프로퍼티를 통해 ref 의 current 값에 액세스 할 수 있다. 이 값은 의도적으로 변경할 수 있다, 읽고 쓰기가 가능하다는 것을 의미한다. 리액트가 추적하지 않는 컴포넌트의 비밀 주머니와 같다. (이것이 리액트의 단방향 데이터 흐름으로부터의 탈출구로 만드는 것이다. 자세한 내용은 아래를 보자!)

여기 매 클릭마다 `ref.current` 를 증가시키는 버튼이 있다.

```js
import { useRef } from 'react';

export default function Counter() {
  let ref = useRef(0);

  function handleClick() {
    ref.current = ref.current + 1;
    alert('You clicked ' + ref.current + ' times!');
  }

  return (
    <button onClick={handleClick}>
      Click me!
    </button>
  );
}
```

ref 점수는 숫자이지만  [state](https://beta.reactjs.org/learn/state-a-components-memory) 처럼, 문자열, 객체, 아니면 함수라 하더라도 어떤 타입이라도 가능하다. state와는 다르게, ref는 읽고 쓰기가 가능한 `current` 속성이 있는 일반 자바스크립트 객체이다.

컴포넌트는 매 증가마다 리렌더 하지 않는다. state 처럼, refs 는 리렌더 사이에 리액트에 의해 유지된다. 하지만 state를 설정하면 리렌더가 되지만 ref를 변경하는 것은 그렇지 않다.

## 예제: 스톱워치 만들기

하나의 컴포넌트에서 refs 와 state를 합칠 수 있다. 예를 들어, 유저가 버튼을 통해 시작하거나 멈출 수 있는 스톱워치를 만들어보자. 사용자가 시작을 누르고 얼마나 시간이 지났는지 표시하기 위해, 시작 버튼을 누른 시간과 현재 시간을 추적해야 한다. **이 정보는 렌더링 중 사용된다. 그래서 state 에 유지한다:**

```js
const [startTime, setStartTime] = useState(null);
const [now, setNow] = useState(null);
```

사용자가 시작을 누르면, 매 10ms마다 업데이트 하기 위해 [`setInterval`](https://developer.mozilla.org/docs/Web/API/setInterval) 를 사용할 것이다.

```js
import { useState } from 'react';

export default function Stopwatch() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);

  function handleStart() {
    // Start counting.
    setStartTime(Date.now());
    setNow(Date.now());

    setInterval(() => {
      // Update the current time every 10ms.
      setNow(Date.now());
    }, 10);
  }

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  return (
    <>
      <h1>Time passed: {secondsPassed.toFixed(3)}</h1>
      <button onClick={handleStart}>
        Start
      </button>
    </>
  );
}
```

"정지" 버튼이 누르면, `now` state 변수를 업데이트하는 것을 멈추게 하도록 존재하는 인터벌을 취소 해야 한다. [`clearInterval`](https://developer.mozilla.org/en-US/docs/Web/API/clearInterval) 로 이걸 수행할 수 있지만 유저가 시작 버튼을 눌렀을 때, `setInterval` 호출에 의해 이전에 반환 된 interval ID를 제공해야 한다. 어딘가에 interval ID 를 보관해야 한다. **interval ID 는 렌더링 중 사용되지 않으므로 ref에 저장할 수 있다.**

```js
import { useState, useRef } from 'react';

export default function Stopwatch() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const intervalRef = useRef(null);

  function handleStart() {
    setStartTime(Date.now());
    setNow(Date.now());

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }

  function handleStop() {
    clearInterval(intervalRef.current);
  }

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  return (
    <>
      <h1>Time passed: {secondsPassed.toFixed(3)}</h1>
      <button onClick={handleStart}>
        Start
      </button>
      <button onClick={handleStop}>
        Stop
      </button>
    </>
  );
}
```

정보의 조각이 렌더링 중 사용 됐을 때, state를 유지하라. 정보의 조각이 오직 이벤트 핸들러와 리렌더가 필요하지 않는 경우, ref를 사용하는 것은 더 효율적일 수 있다.

## refs 와 state의 다른 점들

아마도 state 보다 refs 가 덜 엄격하다고 생각 할 지 모른다. 예를 들어 항상 state setting 함수를 사용하는 대신 그것들을 변경할 수 있다. 그러나 대부분의 경우 state 를 사용하고 싶을 것이다. Refs 는 자주 필요하지 않은 "탈출구" 이다. state 와 refs 를 비교하는 방법은 다음과 같다:

| refs | state |
|---|---|
| `useRef(initialValue)` 는 `{ current: initialValue }` 를 반환한다. | `useState(initialValue)` 는 현재 state 변수의 값과 setter 함수를 반환한다. ( `[value, setValue]`) |
| 변경 됐을 때 리렌더 되지 않는다. | 변경 됐을 때 리렌더를 트리거 한다. |
| "변화 가능" - 렌더링 과정 밖에서 `current`의 값을 수정할 수 있다. | "불변성" — 리렌더를 하려고 state 변수를 수정하기 위해 반드시 setting 함수를 사용해야 한다. |
| 렌더링 중 `currnet` 값을 읽거나 수정하면 안된다. | 언제든 state 값을 읽을 수 있지만 각 렌더는 변경되지 않은 state의 각 [스냅샷](https://beta.reactjs.org/learn/state-as-a-snapshot) 을 가진다. | 

여기 state 로 구현 된 카운터 버튼이 있다:

```js
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      You clicked {count} times
    </button>
  );
}
```

`count` 값이 표시 됐기 때문에, state 값을 사용하는 것이 말이 된다. 카운터 값이 `setCount()` 로 설정 될 때, 리액트는 컴포넌트를 리렌더 하고 새로운 카운트를 반영하기 위해 화면을 업데이트 한다.

ref 로 이것을 구현하려 한다면, 리액트는 리렌더 하지 않을것이다. 그래서 카운트가 바뀌는 것을 볼 수 없다. 이 버튼을 클릭하는 것이 어떻게 그의 text를 **업데이트 하지 않는지** 보자:

```js
import { useRef } from 'react';

export default function Counter() {
  let countRef = useRef(0);

  function handleClick() {
    // This doesn't re-render the component!
    countRef.current = countRef.current + 1;
  }

  return (
    <button onClick={handleClick}>
      You clicked {countRef.current} times
    </button>
  );
}
```

렌더 중 `ref.current` 를 읽는 것이 신뢰할 수 없는 코드로 이어지는 이유이다. 이게 필요하다면, 대신 state 를 사용하라.

---

#### DEEPDIVE: How does useRef work inside?

Although both `useState` and `useRef` are provided by React, in principle `useRef` could be implemented _on top of_ `useState`. You can imagine that inside of React, `useRef` is implemented like this:

```js
// Inside of React
function useRef(initialValue) {
  const [ref, unused] = useState({ current: initialValue });
  return ref;
}
```

During the first render, `useRef` returns `{ current: initialValue }`. This object is stored by React, so during the next render the same object will be returned. Note how the state setter is unused in this example. It is unnecessary because `useRef` always needs to return the same object!

React provides a built-in version of `useRef` because it is common enough in practice. But you can think of it as a regular state variable without a setter. If you’re familiar with object-oriented programming, refs might remind you of instance fields—but instead of `this.something` you write `somethingRef.current`.

---

## When to use refs [](https://beta.reactjs.org/learn/referencing-values-with-refs#when-to-use-refs "Link for When to use refs")

Typically, you will use a ref when your component needs to “step outside” React and communicate with external APIs—often a browser API that won’t impact the appearance of the component. Here are a few of these rare situations:

-   Storing [timeout IDs](https://developer.mozilla.org/docs/Web/API/setTimeout)
-   Storing and manipulating [DOM elements](https://developer.mozilla.org/docs/Web/API/Element), which we cover on [the next page](https://beta.reactjs.org/learn/manipulating-the-dom-with-refs)
-   Storing other objects that aren’t necessary to calculate the JSX.

If your component needs to store some value, but it doesn’t impact the rendering logic, choose refs.

## Best practices for refs [](https://beta.reactjs.org/learn/referencing-values-with-refs#best-practices-for-refs "Link for Best practices for refs")

Following these principles will make your components more predictable:

-   **Treat refs as an escape hatch.** Refs are useful when you work with external systems or browser APIs. If much of your application logic and data flow relies on refs, you might want to rethink your approach.
-   **Don’t read or write `ref.current` during rendering.** If some information is needed during rendering, use [state](https://beta.reactjs.org/learn/state-a-components-memory) instead. Since React doesn’t know when `ref.current` changes, even reading it while rendering makes your component’s behavior difficult to predict. (The only exception to this is code like `if (!ref.current) ref.current = new Thing()` which only sets the ref once during the first render.)

Limitations of React state don’t apply to refs. For example, state acts like a [snapshot for every render](https://beta.reactjs.org/learn/state-as-a-snapshot) and [doesn’t update synchronously.](https://beta.reactjs.org/learn/queueing-a-series-of-state-updates) But when you mutate the current value of a ref, it changes immediately:

```js
ref.current = 5;
console.log(ref.current); // 5
```

This is because **the ref itself is a regular JavaScript object,** and so it behaves like one.

You also don’t need to worry about [avoiding mutation](https://beta.reactjs.org/learn/updating-objects-in-state) when you work with a ref. As long as the object you’re mutating isn’t used for rendering, React doesn’t care what you do with the ref or its contents.

## Refs and the DOM [](https://beta.reactjs.org/learn/referencing-values-with-refs#refs-and-the-dom "Link for Refs and the DOM")

You can point a ref to any value. However, the most common use case for a ref is to access a DOM element. For example, this is handy if you want to focus an input programmatically. When you pass a ref to a `ref` attribute in JSX, like `<div ref={myRef}>`, React will put the corresponding DOM element into `myRef.current`. You can read more about this in [Manipulating the DOM with Refs.](https://beta.reactjs.org/learn/manipulating-the-dom-with-refs)

## Recap[](https://beta.reactjs.org/learn/referencing-values-with-refs#recap "Link for Recap")

-   Refs are an escape hatch to hold onto values that aren’t used for rendering. You won’t need them often.
-   A ref is a plain JavaScript object with a single property called `current`, which you can read or set.
-   You can ask React to give you a ref by calling the `useRef` Hook.
-   Like state, refs let you retain information between re-renders of a component.
-   Unlike state, setting the ref’s `current` value does not trigger a re-render.
-   Don’t read or write `ref.current` during rendering. This makes your component hard to predict.