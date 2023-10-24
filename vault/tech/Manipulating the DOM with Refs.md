#Tech #Translates

Refs로 DOM 조작하기

리액트는 렌더 결과를 보여주기 위해 자동으로 [DOM](https://developer.mozilla.org/docs/Web/API/Document_Object_Model/Introduction)을 업데이트 한다, 그래서 컴포넌트는 돔을 자주 조작할 필요가 없다. 하지만, 종종 리액트에서 DOM 에 접근해야 할 수 있다. 예를 들어 노드를 포커스하기, 노드로 스크롤하기, 아니면 노드의 사이즈나 위치를 재는 것. 리액트에는 이것들을 하기 위해 제공되는 방법이 없다. 그래서 DOM 노드 에 대한 `ref` 가 필요하다.

>### 이것을 배우게 된다.
>
>- 리액트의 `ref` 속성에 의해 관리되는 DOM노드에 접근하기
>- `ref` JSX 속성과 `useRef` 훅의 관계
>- 다른 컴포넌트의 DOM 노드에 어떻게 접근하는지
>- 리액트로 관리되는 DOM을 수정하는 것이 안전한 경우

## 노드에 대한 ref 가져오기

리액트가 관리하는 DOM 노드에 접근하려면, 먼저 `useRef` 훅을 가져온다:

```js
import { useRef } from 'react';
```

다음, 컴포넌트 내에 ref를 선언하기 위해 사용한다.

```js
const myRef = useRef(null);
```

마지막으로, DOM 노드로 ref 속성을 전달한다.

```js
<div ref={myRef}>
```

`useRef` 훅은 current 프로퍼티 하나를 가진 객체를 리턴한다. `myRef.current` 의 초기값은 `null` 이다. 리액트가 div DOM 노드를 생성할 때, 이 노드에 대한 참조를 `myRef.current` 에 담는다. 그 때 이 DOM 노드에 이벤트 핸들러로부터 접근할 수 있고 기본 제공되는 정의 된 browser APIs 를 사용한다.

```js
// You can use any browser APIs, for example:
myRef.current.scrollIntoView();
```

### 예제: 텍스트 입력필드에 포커스

예제에서 버튼을 클릭하면 입력필드에 포커스 된다:

```js
import { useRef } from 'react';

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  );
}
```

이것을 구현하려면:

1. useRef 훅으로 inputRef 를 선언한다.
2. `<input ref={inputRef}>` 로 전달한다. 이것은 리액트에게 `<input>` 의 DOM 노드를 `inputRef.current ` 안에 넣도록 지시한다.
3. `handleClick` 함수 내, `inputRef.current.focus()` input DOM 노드를 읽고 `inputRef.current.focus()`를 사용하여 [`focus()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus) 를 호출한다.
4. `handleClick` 이벤트핸들러를 `onClick` 을 사용하여 `<button>` 에 전달한다.

DOM 조작이 ref의 일반적인 사용례인 반면, useRef 훅은 타이머 아이디 같은 리액트 외부의 다른 것을 저장하는데 사용할 수 있다. state 처럼, 참조는 렌더링간에 유지된다. Ref는 업데이트 돼도 다시 렌더되지 않는 state 변수와 같다. ref를 소개하기 위해 [Ref로 값 참조](https://beta.reactjs.org/learn/referencing-values-with-refs) 를 보자.

### 예제: 엘리먼트로 스크롤하기

컴포넌트에 한개 이상의 ref 를 가질 수 있다. 이 예제에서, 세개의 이미지를 가진 캐로셀이 있다. 각 버튼은 브라우저 [`scrollIntoView()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) 메서드를 해당 DOM 노드로 호출하여 이미지를 가운데로 배치한다. 

```js
import { useRef } from 'react';

export default function CatFriends() {
  const firstCatRef = useRef(null);
  const secondCatRef = useRef(null);
  const thirdCatRef = useRef(null);

  function handleScrollToFirstCat() {
    firstCatRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }

  function handleScrollToSecondCat() {
    secondCatRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }

  function handleScrollToThirdCat() {
    thirdCatRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }

  return (
    <>
      <nav>
        <button onClick={handleScrollToFirstCat}>
          Tom
        </button>
        <button onClick={handleScrollToSecondCat}>
          Maru
        </button>
        <button onClick={handleScrollToThirdCat}>
          Jellylorum
        </button>
      </nav>
      <div>
        <ul>
          <li>
            <img
              src="https://placekitten.com/g/200/200"
              alt="Tom"
              ref={firstCatRef}
            />
          </li>
          <li>
            <img
              src="https://placekitten.com/g/300/200"
              alt="Maru"
              ref={secondCatRef}
            />
          </li>
          <li>
            <img
              src="https://placekitten.com/g/250/200"
              alt="Jellylorum"
              ref={thirdCatRef}
            />
          </li>
        </ul>
      </div>
    </>
  );
}
```

#### DEEPDIVE: ref 콜백을 사용하여 ref 의 리스트를 어떻게 관리하는가

## 다른 컴포넌트의 DOM 노드에 접근하기

`<input />` 같은 브라우저 엘리먼트로 출력 되는 기본 제공되는 컴포넌트에 ref 를 놓을 때, 리액트는 호출된 DOM 노드에 대해 ref 의 `current` 속성을 설정한다. (브라우저의 실제 `<input />` 같은).

하지만, `<MyInput />` 같은 일반 컴포넌트에 `ref` 를 놓으면, 기본적으로 `null` 을 갖게 된다. 이것을 시연한 예제가 있다. 버틀을 클릭해도 입력필드에 포커스 되지 않는 방법을 주의하라.

이 이슈를 아는 것을 돕기 위해 리액트는 콘솔에 에러를 출력한다:

```
Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
```

이것은 기본적으로 리액트는 컴포넌트가 다른 컴포넌트의 DOM 노드에 접근하도록 허용하지 않기 때문에 발생한다. 하위 컴포넌트도 물론! 이것은 의도적이다. Refs 는 아껴서 사용해야 하는 탈출구이다.

대신, 그들의 DOM 노드들을 노출하기를 원하는 컴포넌트는 해당 동작을 opt in 해야 한다. 컴포넌트는 그것이 그들의 자식들 중 하나에게 포워드 되도록 지정할 수 있다. 이것이 `MyInput`이 `forwardRef` API 를 어떻게 사용하는지 이다:

```js
const MyInput = forwardRef((props, ref) => {
  return <input {...props} ref={ref} />;
});
```

이것은 어떻게 동작하는가:

1. `<MyInput ref={inputRef} />` 은 리액트에게 해당 DOM 노드를 `inputRef.current` 에 넣도록 지시한다. 하지만, 이를 선택 하는 것은 `MyInput` 컴포넌트에게 달렸다. - 기본적으로, 선택하지 않는다.
2. `MyInput` 컴포넌트는 `forwardRef`를 사용하여 선언되었다. 
3.  The `MyInput` component is declared using `forwardRef`. **This opts it into receiving the `inputRef` from above as the second `ref` argument** which is declared after `props`.
4.  `MyInput` itself passes the `ref` it received to the `<input>` inside of it.

이제 입력필드를 포커스하기 위해 버튼을 클릭하는 것이 작동한다:

```js
import { forwardRef, useRef } from 'react';

const MyInput = forwardRef((props, ref) => {
  return <input {...props} ref={ref} />;
});

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  );
}
```

디자인 시스템에서, 버튼, 입력필드 등과 같은 하위 수준의 컴포넌트가 해당 ref 를 DOM 노드로 전달 하는 것은 일반적인 패턴이다. 반면에 폼, 리스트나 페이지 섹션과 같은 상위 컴포넌트는 일반적으로 DOM 구조에 대한 우발적인 종속성을 피하기 위해 DOM 노드를 노출하지 않는다.

#### DEEPDIVE: Exposing a subset of the API with an imperative handle

## React 가 refs 를 붙일 때

리액트에서 모든 업데이트는 [두 단계](https://beta.reactjs.org/learn/render-and-commit#step-3-react-commits-changes-to-the-dom)로 나뉜다.

- **렌더** 중, 리액트는 무엇이 스크린에 보여져야 할지 알아내가 위해 컴포넌트를 호출한다.
- **커밋** 중, 리액트는 변경사항을 DOM에 적용한다.

일반적으로, 렌더링중 refs 에 접근하는 것을 [원하지 않는다](https://beta.reactjs.org/learn/referencing-values-with-refs#best-practices-for-refs). 이것은 DOM노드를 보유하고 있는 refs 에도 적용된다. 첫 렌더중에, DOM 노드는 아직 생성되지 않았으므로 `ref.current` 는 `null` 이 된다. 그리고 업데이트를 렌더링 하는 중, DOM 노드는 아직 업데이트 되지 않았다. 그래서 그것을 읽기엔 너무 이르다.

커밋 중에 리액트는 `ref.current`를 설정 한다. DOM을 업데이트 하기 전에, 리액트는 영향을 받는 `ref.current` 값을 `null`로 설정한다. DOM 업데이트 후 리액트는 즉시 해당 DOM 노드로 설정한다.

대체로, 이벤트 핸들러로 refs 에 접근할 것이다. ref로 무언가를 하고 싶지만 그것을 하는 특정 이벤트가 없다면 Effect가 필요할 수 있다. 다음 페이지에서 Effects 에 대해서 논의 할 것이다.

#### DEEPDIVE: Flushing state updates synchronously with flushSync

## Best practices for DOM manipulation with refs

## ref를 사용한 DOM 조작의 모범 사례

refs는 탈출구이다. 그것은 리액트에서 한발짝 물러나야 할 때 사용해야 한다. 이것의 기본 예제들은 포커스, 스크롤 포지션, 리액트가 노출하지 않는 브라우저 API들의 호출을 관리하는 것을 포함한다.

포커싱과 스크롤과 같은 비 파괴적인 작업을 고수하면 문제가 발생하지 않는다. 수동으로 DOM 을 **조정**하려고 시도한다면, 리액트가 만들고 있는 변경 사항들과 충돌 할 위험이 있다. 

이 문제를 설명 하기 위해, 이 예제는 환영 메시지와 두개의 버튼을 포함한다. 첫번째 버튼은 일반적으로 리액트에서 하듯이 조건부 렌더링과 state 를 사용하여 그의 존재 여부를 토글한다. 두번째 버튼은 [`remove()` DOM API](https://developer.mozilla.org/en-US/docs/Web/API/Element/remove) 을 사용하여 리액트의 제어 밖에 있는 DOM에서 강제로 제거한다.

"Toggle with setState" 를 몇 번 눌러보자. 메시지가 보여졌다 안보여졌다 해야한다. 그 다음 "Remove from the DOM" 을 눌러보자. 이것은 강제로 메시지를 삭제한다. 마지막으로 "Toggle with setState" 를 눌러보자.

```js
import {useState, useRef} from 'react';

export default function Counter() {
  const [show, setShow] = useState(true);
  const ref = useRef(null);

  return (
    <div>
      <button
        onClick={() => {
          setShow(!show);
        }}>
        Toggle with setState
      </button>
      <button
        onClick={() => {
          ref.current.remove();
        }}>
        Remove from the DOM
      </button>
      {show && <p ref={ref}>Hello world</p>}
    </div>
  );
}
```

수동으로 DOM 엘리먼트를 제거 한 뒤, 그것을 다시 보여주기 위해 `setState` 를 사용하면 충돌이 발생할 것이다. DOM 을 변경했기 때문이고 리액트는 어떻게 DOM 엘리먼트를 정확히 계속 관리해야 할지 알지 못한다.

**리액트로 관리되는 DOM 노드를 변경하는 것을 피하라.**  리액트가 관리하는 엘리먼트에서 자식을 수정, 추가, 삭제하면 위와 같이 일관되지 않은 시각적 결과 또는 충돌이 발생할 수 있다.

하지만, 이것을 전혀 할 수 없다는 것을 의미하진 않는다. 주의가 필요할 뿐. **리액트가 업데이트 할 이유가 없는 DOM의 일부를 안전하게 수정할 수 있다.**  예를 들어, `<div>` 가 JSX에서 항상 비어있는 경우, 리액트는 그의 하위 리스트를 건드릴 이유가 없을 것이다. 그러므로 그곳의 엘리먼트를 수동으로 추가하거나 삭제하는 것은 안전하다.

## Recap

- Refs 는 일반적인 개념이지만, 대부분 DOM 엘리먼트를 유지하는 데 사용한다.
- `<div ref={myRef}>` 를 전달하여 DOM 노드를 `myRef.current` 에 넣도록 리액트에게 지시한다.
- 대체로 포커스, 스크롤, DOM 엘리먼트 계산과 같은 비파괴적인 액션들을 위해 사용한다.
- 기본적으로 컴포넌트는 DOM 노드를 노출하지 않는다. `forwardRef` 를 사용하고 특정 노드에 두번째 `ref` 인수를 전달함으로 DOM 노드를 노출하는 것을 선택 할 수 있다.
- 리액트로 관리되는 DOM 노드를 변경하지 마라.
- 리액트로 관리되는 DOM 노드를 수정할 경우 React가 업데이트 할 이유가 없는 부분을 수정하라.