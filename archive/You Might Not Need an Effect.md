# You Might Not Need an Effect

https://beta.reactjs.org/learn/you-might-not-need-an-effect

Effects는 React 패러다임으로부터의 탈출구이다. 그것들은 너를 리액트와 리액트가 아닌 외부 시스템과 싱크된 컴포넌트나 브라우저 DOM에서 한발짝 뒤로 물러나게 한다. 만약 외부 시스템과 관련이 없다면 (예를 들어 어떠한 props 나 state 가 변했을 때 탐포넌트의 state를 업데이트 하고 싶다면) 당신은 Effect가 필요하지 않다. 필요 없는 Effect를 삭제한다면 코드가 읽기 쉬워지고 실행이 빨라지며 에러가 줄어든다.

> ### 이것을 배우게 됩니다.
> 
> - 왜? 그리고 어떻게 필요 없는 Effect를 제거하는가?
> - Effect 없이 비싼 계산을 어떻게 캐시 하는가?
> - Effect 없이 어떻게 컴포넌트 state를 리셋하거나 조정하는가?
> - 어떻게 이벤트 핸들러간의 로직을 공유하는가?
> - 어떤 로직이 이벤트 핸들러로 옮겨져야 하는가?
> - 상위 컴포넌트에게 변경에 대해 어떻게 알려줄 수 있는가?

## 필요없는 Effects를 어떻게 제거할까?

Effects가 필요 없는 두개의 사례를 보자.

**렌더링을 위해 데이터를 변경하는 것에는 Effects가 필요하지 않다.** 예를들어 리스트를 그려주기 전에 필터링하고 싶다고 가정하자. 리스트가 변경될 때 state 를 업데이트 하는 Effect를 사용하고 싶어질지 모른다. 
하지만 이것은 효율적이지 못하다. 컴포넌트가 업데이트 될 때, 리액트는 먼저 무엇이 화면에 보여져야 할 지 계산하기 위해 컴포넌트 함수들을 부른다. 그리고 리액트는 스크린을 업데이트하며 변경사항들을 DOM에 [commit](https://beta.reactjs.org/learn/render-and-commit) 할 것이다. 만약 Effects가 state를 바로 업데이트 한다면 모든 과정이 scratch로부터 다시 시작된다! 불필요한 렌더를 피하기 위해, 컴포넌트의 상위레벨에 있는 모든 데이터를 변경하라. 코드는 props나 state가 변경될 때 자동으로 다시 시작(re-run)될 것이다.

**이벤트핸들링을 위해 Effects가 필요하지 않다.** 예를들어 api/buy POST 요청을 보내고 유저가 상품을 구매할 때 알림을 보여주고 싶다고 가정하자. 구매 버튼 이벤트 핸들러 안에, 어떤 일이 벌어질지 정확히 알 것이다. 하지만 Effects가 실행될 때 유저가 무엇을 했는지 알지 못한다. (예를 들어 어떤 버튼이 클릭됐는지) 이것이 당신이 일반적으로 이벤트 핸들러와 상응하는 유저 이벤트들을 핸들하는 이유이다.

외부 시스템과 [싱크](https://beta.reactjs.org/learn/synchronizing-with-effects#what-are-effects-and-how-are-they-different-from-events)하기 위해서는 Effects가 필요하다. 예를들어 jQuery 위젯과 리액트 state 의 동기화를 유지하기 위해서 Effects를 작성할 수 있다. 그리고 데이터를 가져올 때도 Effects로 작성할 수 있다. 예를 들어 현재 검색어 쿼리로 검색 결과와 동기화 할 수 있다. [프레임워크](https://beta.reactjs.org/learn/start-a-new-react-project#building-with-a-full-featured-framework) 자체에서, Effects를 직접 사용하는 것 보다 더 효율적인 데이터 페칭 메카니즘을 제공하고 있다는 것을 기억하라.

올바른 직관을 얻는데에 도움이 되기 위해, 몇개의 일반적이고 구체적인 예시를 보자!

### props나 state 기반의 state 업데이트

두개의 state 값이 있다고 가정하자: `firstName` 과 `lastName`. 두 변수를 합쳐서 `fullName`을 계산하고자 한다. 게다가 `firstName` 이나 `lastName` 이 변경 될 때 `fullName`이 업데이트가 될 것이다. 첫째로 당신은 `fullName` state 값을 추가하여 Effects 내에서 업데이트 하고 싶을 수 있다.

```js
function Form() {
  const [firstName, setFirstName] = useState('Taylor');
  const [lastName, setLastName] = useState('Swift');

  // 🔴 Avoid: 불필요한 state와 필요 없는 Effect를 피하라.
  const [fullName, setFullName] = useState('');
  useEffect(() => {
    setFullName(firstName + ' ' + lastName);
  }, [firstName, lastName]);
  // ...
}
```

이것은 필요 이상으로 복잡하다. 효율적이지도 않다: 이것은 `fullName`에 대한 이전 값으로 전체 렌더링 패스를 실행한 다음, 업데이트 된 값으로 즉시 리렌더 된다. state 값과 Effect를 삭제하자.

```js
function Form() {
  const [firstName, setFirstName] = useState('Taylor');
  const [lastName, setLastName] = useState('Swift');
  // ✅ Good: 렌더링 중에 계산 됨
  const fullName = firstName + ' ' + lastName;
  // ...
}
```

**뭔가가 존재하는 props 나 state로부터 계산 될 수 있다면, [state에 넣지 마라](https://beta.reactjs.org/learn/choosing-the-state-structure#avoid-redundant-state). 대신 렌더링 중에 계산하라.** 이것은 코드를 빠르게(추가적인 계단식 업데이트를 피한다), 심플하게(필요 없는 코드를 지운다), 그리고 에러 발생을 줄여준다(서로 동기화 되지 않는 state들 간에 발생하는 버그를 피한다). 이러한 접근이 새롭게 느껴진다면, [Thinking in React](https://beta.reactjs.org/learn/thinking-in-react#step-3-find-the-minimal-but-complete-representation-of-ui-state) 가 state에 무엇이 들어가야 할지 아는데에 도움이 될 것이다.

### 비싼 계산의 캐싱

이 컴포넌트는 props를 통해 받고 `filter` prop에 따라 필터링 된 `todos`를 가져와서 `visibleTodos` 를 계산한다. 어쩌면 state 값에 결과를 저장하고 Effect로 업데이트 하고 싶을지도 모른다:

```js
function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');

  // 🔴 Avoid: redundant state and unnecessary Effect
  const [visibleTodos, setVisibleTodos] = useState([]);
  useEffect(() => {
    setVisibleTodos(getFilteredTodos(todos, filter));
  }, [todos, filter]);

  // ...
}
```

이전 예제처럼 이것은 필요없고 비효율적이다. 첫째, state 와 Effect 를 제거하자.

```js
function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');
  // ✅ This is fine if getFilteredTodos() is not slow.
  const visibleTodos = getFilteredTodos(todos, filter);
  // ...
}
```

대부분의 경우, 이러한 코드는 좋다. 하지만 `getFilteredTodos()` 함수가 느리거나 `todos` 데이터가 너무 클지도 모른다. `newTodos`와 같이 상관 없는 state 값이 변경 된 경우  `getFilteredTodos()` 함수를 다시 계산하고 싶지 않다. 

`useMemo` 훅으로 감싸서 비싼 계산을 캐시(또는 [메모이즈](https://en.wikipedia.org/wiki/Memoization))할 수 있다:

```js
import { useMemo, useState } from 'react';

function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');
  const visibleTodos = useMemo(() => {
    // ✅ Does not re-run unless todos or filter change
    return getFilteredTodos(todos, filter);
  }, [todos, filter]);
  // ...
}
```

또는, 한줄로 쓸 수 있다:

```js
import { useMemo, useState } from 'react';

function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');
  // ✅ Does not re-run getFilteredTodos() unless todos or filter change
  const visibleTodos = useMemo(() => getFilteredTodos(todos, filter), [todos, filter]);
  // ...
}
```

`todos`나 `filter`가 변한게 아니라면 내부 함수가 다시 실행되는 것을 원하지 않는다. 리액트는 초기 렌더시`getFilteredTodos()` 함수가 리턴하는 값을 기억할 것이다. 다음 번 렌더시, `todos`나 `filter`가 다른지 체크할 것이다. 만약 값이 바뀌지 않았다면, `useMemo`는 저장 된 마지막 값을 리턴한다. 하지만 값이 바뀌었다면, 리액트는 감싸져 있는 함수를 다시 호출할 것이다. (그리고 그 결과를 대신 저장한다).

`useMemo` 로 감싸진 함수는 렌더링 중에 실행되므로 [순수한 계산](https://beta.reactjs.org/learn/keeping-components-pure)을 위해서만 작동한다.

> DEEP DIVE
> 
> ### 계산이 비싼지 어떻게 말할 수 있는가?
> 
> 일반적으로, 수천개의 객체를 만들거나 순환하지 않는 이상, 그것은 아마도 비싼 계산이 아닐 것이다. 좀 더 자신감을 가지고 싶다면, 코드에 시간이 얼마나 지났는지를 측정하는 `console.log` 를 추가할 수 있다.
> 
> ```js
> console.time('filter array');
> const visibleTodos = getFilteredTodos(todos, filter);
> console.timeEnd('filter array');
> ```
> 
> 당신이 측정하고 있는 인터렉션을 실행하라(예를 들어, input에 타이핑 하는 것). 그러면 `filter array: 0.15ms` 같은 로그가 콘솔에 표시된다. 전체 기록된 시간이 엄청난 양으로 합산되면(아마 `1ms` 이상), 그 계산은 메모이즈 하는게 좋다. 실험삼아, 총 기록 시간이 감소되는지 검증하기 위해 계산을 useMemo로 감싸 볼 수 있다.
> 
> ```js
> console.time('filter array');
> const visibleTodos = useMemo(() => {
> 	// Skipped if todos and filter haven't changed
> 	return getFilteredTodos(todos, filter);
> }, [todos, filter]);
> console.timeEnd('filter array');
> ```
> 
> `useMemo` 는 첫 렌더링을 빠르게 하지 않는다. 오직 필요없는 업데이트를 넘길 수 있게 도와준다.
> 
> 당신의 장비가 당신의 유저의 장비보다 빠를 것이라는 것을 기억하라. 따라서 인위적인 속도 저하로 성능을 테스트 하는 것이 좋다. 예를 들어 크롬은 [CPU 쓰로틀링](https://developer.chrome.com/blog/new-in-devtools-61/#throttling) 옵션을 제공한다.
> 
> 또한 개발 성능을 측정하는 노트는 정확한 결과를 주지 않는다. (예를 들어, [Strict Mode](https://beta.reactjs.org/reference/react/StrictMode)가 켜져있으면 각각의 컴포넌트가 한번이 아닌 두번 렌더링 된다.) 더 정확한 시간을 얻기 위해서, 프로덕션으로 빌드하고 유저들과 같은 디바이스로 테스트하라.

### props 변경시 모든 state 재설정

이 `ProfilePage` 컴포넌트는 `userId`를 prop으로 받는다. 페이지에는 댓글 입력필드가 있고 그 값을 유지하기 위해 `comment` state 값을 사용한다. 하루는 문제를 발견한다: 한 프로필에서 다른 프로필로 이동할 때 `comment` state 가 재설정 되지 않는다. 결과적으로, 우연히 잘못 된 유저의 프로필에 댓글을 게시하게 되기 쉽다. 이것을 고치기 위해, 당신은 `userId`  가 변경될 때 마다 `comment` state 값을 초기화 하고 싶다:

```js
export default function ProfilePage({ userId }) {
  const [comment, setComment] = useState('');

  // 🔴 Avoid: Resetting state on prop change in an Effect
  useEffect(() => {
    setComment('');
  }, [userId]);
  // ...
}
```

이것은 효율적이지 않다. 왜냐하면 `ProfilePage` 와 그 하위 컴포넌트들은 첫 렌더시 낡은 값으로 렌더 되고, 한번 더 렌더 된다. 또한 이것은 `ProfilePage` 내에 일부 state를 가진 모든 컴포넌트에서 이 작업을 수행해야 하기 때문에 복잡하다. 예를들어 댓글 UI가 중첩 되었다면 중첩 된 `comment` state 도 초기화 하고 싶을 것이다.

대신에, 명백한 키를 제공하여 유저 프로필이 개념적으로 서로 다른 프로필임을 리액트에게 알려줄 수 있다. 컴포넌트를 두개로 분리하고 상위 컴포넌트가 하위 컴포넌트에게 `key` 속성을 전달한다.

```js
export default function ProfilePage({ userId }) {
  return (
    <Profile
      userId={userId}
      key={userId}
    />
  );
}

function Profile({ userId }) {
  // ✅ This and any other state below will reset on key change automatically
  const [comment, setComment] = useState('');
  // ...
}
```

일반적으로 리액트는 같은 컴포넌트가 같은 위치에서 렌더되면 state를 보존한다. **`userId` 를 `Profile` 컴포넌트의 `key`로 전달하는 것은, userId가 다른 두개의 Profile 컴포넌트에게 어떠한 state도 공유해서는 안되는 두개의 다른 구성요소로 취급하도록 리액트에게 요청하는 것이다.** 키가 변경되면 리액트는 DOM을 새로 생성하고 `Profile` 컴포넌트의 state와 그 하위 컴포넌트들 재설정한다. 결과적으로, 프로필 페이지간의 이동시 `comment` 필드는 자동적으로 초기화 될 것이다.

이 예시에서는, 외부의 `ProfilePage` 컴포넌트만 내보내고 프로젝트의 다른 파일에 보여진다. `ProfilePage`를 렌더링하는 컴포넌트들은 key를 전달할 필요가 없다: 그것들은 일반적인 prop으로 `userId`를 전달한다. `ProfilePage`가 내부 `Profile` 컴포넌트의 키로 이것을 전달한다는 사실은 구현 세부사항이다.

### prop이 변경 될 때 일부 state를 조정

때때로 당신은 prop이 변경될 때, 모든 state가 아닌 일부 state를 재설정하거나 조정하고 싶을 수 있다.

이 `List` 컴포넌트는 `items`의 리스트를 prop 으로 받고, 선택 된 아이템을 `selection` state 값 내에 포함한다. 당신은 `items` prop 으로 변경 된 배열을 받았을 때, `selection` 을 `null` 로 초기화 하고자 한다.

```js
function List({ items }) {
  const [isReverse, setIsReverse] = useState(false);
  const [selection, setSelection] = useState(null);

  // 🔴 Avoid: Adjusting state on prop change in an Effect
  useEffect(() => {
    setSelection(null);
  }, [items]);
  // …
}
```

이것 또한 이상적이지는 않다. `items` 가 변경 될 때 마다, `List` 컴포넌트와 그 하위 컴포넌트들은 처음에 지난 selection 값으로 렌더 될 것이다. 그리고 리액트는 DOM을 업데이트 하고 Effect 들을 실행할 것이다. 최종적으로, `setSelection(null)` 호출은 `List`컴포넌트와 그 하위 컴포넌트들에 대해 또 다른 리렌더를 발생시킬 것이다. 모든 과정이 또 진행된다.

Effect를 삭제하는 것으로 시작해보자. 대신, 렌더링 중 상태를 조정하라.

```js
function List({ items }) {
  const [isReverse, setIsReverse] = useState(false);
  const [selection, setSelection] = useState(null);

  // Better: Adjust the state while rendering
  const [prevItems, setPrevItems] = useState(items);
  if (items !== prevItems) {
    setPrevItems(items);
    setSelection(null);
  }
  // ...
}
```

[이전 렌더링 정보 저장](https://beta.reactjs.org/reference/react/useState#storing-information-from-previous-renders)과 같은 것은 이해하기 어려울 수 있지만, Effect 내에서 같은 state를 업데이트 하는 것 보다는 낫다. 위 예제에서, `setSelection`은 렌더 중 직접 호출된다. 리액트는 `return` 문으로 종료 된 후 즉시  `List`를 다시 렌더 한다. 요점은, 리액트는 아직 `List` 하위 컴포넌트들을 렌더지 않았거나 DOM을 업데이트 하지 않았으므로  `List` 하위 컴포넌트들은 오래된 `selection` 값으로 렌더링 되는 것을 건너뛸 수 있게 한다.

렌더링 중 컴포넌트를 업데이트 하면, 리액트는 리턴 된 JSX를 버리고 즉시 렌더링을 다시 시도 한다. 매우 느린 계단식 재시도를 피하기 위해 리액트는 렌더링 중 오직 같은 컴포넌트의 state만을 업데이트 하게 한다. 만약 렌더링 중 다른 컴포넌트의 state를 업데이트 한다면, 에러를 맞이하게 될 것이다. `items !== prevItems`와 같은 조건은 무한 루프를 피하는 데에 중요하다. 

이같이 state를 조정할 수 있지만, 다른 사이드 이펙트(DOM을 변경하거나 타임아웃 설정과 같은)는 [컴포넌트를 예측 가능하게 유지](https://beta.reactjs.org/learn/keeping-components-pure)하기 위해 이벤트 핸들러 또는 Effects에 남아있어야 한다.

**이 패턴은 Effect보다 효율적이지만, 대부분의 컴포넌트에 필요하지 않다.** 어떻게 사용하는지와 관계 없이, props나 다른 state를 기반으로 state를 조정하면 데이터 흐름을 더 이해하고 디버그하기 어려워진다. [모든 state를 key로 재설정](https://beta.reactjs.org/learn/you-might-not-need-an-effect#resetting-all-state-when-a-prop-changes) 할 수 있는지 또는 [렌더링 중 모든것을 계산](https://beta.reactjs.org/learn/you-might-not-need-an-effect#updating-state-based-on-props-or-state)할 수 있는지 항상 확인하자. 예를 들어 선택 된 항목을 저장하거나 재설정 하는 대신, 선택 된 항목의 ID를 저장할 수 있다:

```js
function List({ items }) {
  const [isReverse, setIsReverse] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  // ✅ Best: Calculate everything during rendering
  const selection = items.find(item => item.id === selectedId) ?? null;
  // ...
}
```

이제 state를 "조정"할 필요가 전혀 없다. 만약 `selectedId` 를 가진 아이템이 리스트 내에 있다면 선택 된 상태로 유지된다. `selectedId` 를 가진 아이템이 리스트 내에 있지 않다면 렌더링 중 계산된 `selection` 은 일치하는 아이템이 없기 때문에 `null`이 될 것이다. 이 동작은 조금 다르지만 `items` 에 대한 대부분의 변경은 이제 `selection`을 보존하기 때문에 틀림없이 더 나은 방법이다. 하지만 `selectedId`를 가진 아이템이 존재하지 않을 수도 있으므로 아래 모든 로직에서 `selection` 을 사용해야 한다.

### 이벤트 핸들러간의 로직 공유

제품을 구매할 수 있는 두개의 버튼이 있는 제품 페이지가 있다고 가정해보자. 사용자가 제품을 장바구니에 담았을 때 알림을 보여주려고 한다. `showNotification()` 호출을 두개의 버튼의 이벤트핸들러에 추가하는 것은 반복적으로 느껴진다. 그래서 이 로직을 Effect에 넣고 싶을 지 모른다.

```js
function ProductPage({ product, addToCart }) {
  // 🔴 Avoid: Event-specific logic inside an Effect
  useEffect(() => {
    if (product.isInCart) {
      showNotification(`Added ${product.name} to the shopping cart!`);
    }
  }, [product]);

  function handleBuyClick() {
    addToCart(product);
  }

  function handleCheckoutClick() {
    addToCart(product);
    navigateTo('/checkout');
  }
  // ...
}
```

이 Effect는 쓸모 없다. 이것은 아마도 버그를 야기 할 것 같다. 예를들어 당신의 앱이 각 페이지를 다시 불러올 때 장바구니를 기억한다고 해보자. 제품을 장바구니에 한번 추가하고 새로고침 하면, 알람이 다시 보여질 것이다. 제품 페이지를 새로고침 할 때마다 보여질 것이다. `product.isInCart`는 페이지가 로드 될 때 언제나 true 일 것이다, 그래서 Effect는 항상 `showNotification()`을 호출할 것이다.

**어떠한 코드가 Effect나 이벤트 핸들러에 놓는게 확신되지 않는다면, 왜 이 코드가 실행돼야 하는지 스스로 물어보라. 사용자가 컴포넌트를 보고 있을것이기 때문에 꼭 실행되어야 하는 코드에만 Effect를 사용하라.** 이 예제에서는, 유저가 버튼을 눌렀을 때 알람이 떠야 한다. 페이지가 보여져서가 아니라! Effect를 지우고 공통 함수를 이벤트 핸들러에서 호출하는 함수에 넣어라:

```js
function ProductPage({ product, addToCart }) {
  // ✅ Good: Event-specific logic is called from event handlers
  function buyProduct() {
    addToCart(product);
    showNotification(`Added ${product.name} to the shopping cart!`);
  }

  function handleBuyClick() {
    buyProduct();
  }

  function handleCheckoutClick() {
    buyProduct();
    navigateTo('/checkout');
  }
  // ...
}
```

This both removes the unnecessary Effect and fixes the bug.

### POST 요청 보내기

이 Form 컴포넌트는 두개의 POST요청을 보낸다. 컴포넌트가 마운트 될 때 통계를 전송한다. 양식을 입력하고 제출 버튼을 눌렀을 때 `/api/register` 엔드포인트로 POST 요청을 보낼 것이다.

```js
function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // ✅ Good: This logic should run because the component was displayed
  useEffect(() => {
    post('/analytics/event', { eventName: 'visit_form' });
  }, []);

  // 🔴 Avoid: Event-specific logic inside an Effect
  const [jsonToSubmit, setJsonToSubmit] = useState(null);
  useEffect(() => {
    if (jsonToSubmit !== null) {
      post('/api/register', jsonToSubmit);
    }
  }, [jsonToSubmit]);

  function handleSubmit(e) {
    e.preventDefault();
    setJsonToSubmit({ firstName, lastName });
  }
  // ...
}
```

이전 예제와 같은 기준을 적용해보자. 통계 POST요청이 Effect에 남아 있어야 한다. 이것이 통계 이벤트를 보내야 할 이유가 양식이 보여졌기 때문인게 이유이다. 이것은 개발중에 두번 실행 되지만 이것을 어떻게 처리하는지 [여기](https://beta.reactjs.org/learn/synchronizing-with-effects#sending-analytics)를 참조하라.

하지만, `/api/register` POST 요청은 표시되는 양식에 의해 발생되지 않는다. 당신은 특정 시점에만 요청을 보내려고 한다: 유저가 버튼을 눌렀을 때. 그것은 오직 특정한 상호작용에만 발생해야 한다. 두번때 Effect를 제거하고 POST 요청을 이벤트 핸들러로 넣자.

```js
function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // ✅ Good: This logic runs because the component was displayed
  useEffect(() => {
    post('/analytics/event', { eventName: 'visit_form' });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    // ✅ Good: Event-specific logic is in the event handler
    post('/api/register', { firstName, lastName });
  }
  // ...
}
```

어떤 로직을 이벤트 핸들러 안에 놓든 Effect안에 놓든 당신이 대답해야 할 가장 중요한 질문은 사용자의 관점에서 어떤 로직인지이다. 만약 이 로직이 특정한 상호 작용에 의해 발생한다면, 이벤트 핸들러 안에 두어라. 만약 사용자가 스크린을 통해 컴포넌트를 보는 것에 의해 발생한다면 Effect 안에 두어라.

### 계산 체인

때로는 다른 상태를 기반으로 상태를 조정하는 Effect 들을 연결 하고 싶을 수 있다:

```js
function Game() {
  const [card, setCard] = useState(null);
  const [goldCardCount, setGoldCardCount] = useState(0);
  const [round, setRound] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);

  // 🔴 Avoid: Chains of Effects that adjust the state solely to trigger each other
  useEffect(() => {
    if (card !== null && card.gold) {
      setGoldCardCount(c => c + 1);
    }
  }, [card]);

  useEffect(() => {
    if (goldCardCount > 3) {
      setRound(r => r + 1)
      setGoldCardCount(0);
    }
  }, [goldCardCount]);

  useEffect(() => {
    if (round > 5) {
      setIsGameOver(true);
    }
  }, [round]);

  useEffect(() => {
    alert('Good game!');
  }, [isGameOver]);

  function handlePlaceCard(nextCard) {
    if (isGameOver) {
      throw Error('Game already ended.');
    } else {
      setCard(nextCard);
    }
  }

  // ...
```

이 코드에는 두가지 문제가 있다.

첫째, 매우 비효율적이다: 컴포넌트(그리고 그 하위들) 체인의 각각의 `set` 호출마다 다시 렌더 된다. 위 예제에서, 최악의 케이스에는 (`setCard` → 렌더 → `setGoldCardCount` → 렌더 → `setRound` → 렌더 → `setIsGameOver` → 렌더) 3개의 불필요한 트리의 리렌더가 있다.

느리지 않더라도, 코드가 발전함에 따라, 당신이 작성한 "체인"이 새로운 요구사항에 맞지 않는 경우에 부딫히게 된다. 게임 동작의 기록을 단계별로 살펴보는 방법을 추가한다고 상상해 보라. 각각의 state 값을 과거의 값으로 업데이트 하면 된다. 하지만 `card` state를 과거의 값으로 설정하는 것은 Effect 체인을 다시 한번 실행하고 표시중인 데이터를 변경시킨다. 이와 같은 코드는 종종 굳어버리고 깨지기 쉽다.

이 사례에서, 렌더링 중 계산하고 이벤트 핸들러에서 state를 조정하는 것이 낫다.

In this case, it’s better to calculate what you can during rendering, and adjust the state in the event handler:

```js
function Game() {
  const [card, setCard] = useState(null);
  const [goldCardCount, setGoldCardCount] = useState(0);
  const [round, setRound] = useState(1);

  // ✅ Calculate what you can during rendering
  const isGameOver = round > 5;

  function handlePlaceCard(nextCard) {
    if (isGameOver) {
      throw Error('Game already ended.');
    }

    // ✅ Calculate all the next state in the event handler
    setCard(nextCard);
    if (nextCard.gold) {
      if (goldCardCount <= 3) {
        setGoldCardCount(goldCardCount + 1);
      } else {
        setGoldCardCount(0);
        setRound(round + 1);
        if (round === 5) {
          alert('Good game!');
        }
      }
    }
  }

  // ...
```

이것은 훨씬 더 효율적이다. 또한, 만약 게임 기록을 보는 방법을 구현한다면, 이제 모든 다른 값을 조정하는 Effect 체인의 실행 없이 각 state 값을 과거로부터 이동하도록 설정 할 수 있을 것이다. 여러개의 이벤트 핸들러간의 로직 재활용이 필요하다면 [함수를 추출](https://beta.reactjs.org/learn/you-might-not-need-an-effect#sharing-logic-between-event-handlers)하여 각 핸들러에서 호출할 수 있다.

이벤트 핸들러 내에서 [state는 스냅샷처럼 동작](https://beta.reactjs.org/learn/state-as-a-snapshot)하는 것을 기억하라. 예를 들어, `setRound(round + 1)`를 호출 한 이후에도, `round` 변수는 사용자가 버튼을 클릭 한 시점의 값을 반영한다. 계산을 위해 다음 값을 사용해야 한다면, `const nextRound = round + 1` 와 같이 수동으로 정의해라.

경우에 따라, 이벤트 핸들러 내에서 다음 state를 직접 계산할 수 없다. 예를 들어, 다음 드롭다운의 옵션들이 이전 드롭다운에서 선택 된 값에 의존하는 여러 드롭다운이 있는 양식을 상상해보라. 네트워크와 동기화 돼 있어서 데이터를 가져오는 Effect들의 체인이 적합하다.

### 앱 초기화

어떤 로직은 앱이 로드되고 한번만 실행된다. 그것을 최상위 레벨 컴포넌트의 Effect 안에 위치 시킬 수 있다:

```js
function App() {
  // 🔴 Avoid: Effects with logic that should only ever run once
  useEffect(() => {
    loadDataFromLocalStorage();
    checkAuthToken();
  }, []);
  // ...
}
```

하지만 그것이 개발에서 두번 실행되는 것을 빠르게 발견할 수 있다. 이것은 이슈를 야기한다. 예를 들어, 함수가 두 번 호출되도록 설계 돼 있지 않아서 인증 토큰을 무효화 할 수 있다. 일반적으로, 컴포넌트는 다시 마운트 될 때 탄력적이어야 한다. 이것은 최상위 레벨 `App` 컴포넌트로 포함한다. 프로덕션에서 다시 마운드 되지 않을 수 있지만, 모든 컴포넌트 내의 같은 제약을 따르는 것은 코드를 이동하고 재사용하기 쉬워진다. 만약 어떤 로직이 컴포넌트 마운트시 한번이 아니라 앱 로드시에 한번만 실행 돼야 한다면, 이미 실행됐는지 추적하기 위해 최상위 레벨 변수를 추가하고 항상 다시 실행되는 것을 방지할 수 있다:

```js
let didInit = false;

function App() {
  useEffect(() => {
    if (!didInit) {
      didInit = true;
      // ✅ Only runs once per app load
      loadDataFromLocalStorage();
      checkAuthToken();
    }
  }, []);
  // ...
}
```

모듈 초기화와 앱 렌더 전에도 실행할 수 있다.

```js
if (typeof window !== 'undefined') { // Check if we're running in the browser.
   // ✅ Only runs once per app load
  checkAuthToken();
  loadDataFromLocalStorage();
}

function App() {
  // ...
}
```

최상위에 있는 코드는 컴포넌트가 불러온 뒤 한번만 실행된다. - 렌더링이 되지 않더라도 - 임의의 컴포넌트를 불러올 때 속도저하나 예기치 않은 동작을 피하기 위해서는, 이 패턴을 남용하지 마라. 앱 전체 초기화 로직은 `app.js` 같은 루트 컴포넌트 모듈이나 앱의 진입점 모듈에 두라.

### 상태 변경에 대한 상위 컴포넌트 알림

`isOn` 이라는 내부 `boolean` state를 가진 `Toggle` 컴포넌트를 작성하고 있다고 하자. 이것을 토글하는 몇가지 다른 방법이 있다(클릭이나 드래그). `Toggle` 내부 state가 변경 되면 상위 컴포넌트에게 알려주고 싶다, 그래서 `onChange` 이벤트를 노출하고 Effect 에서 호출한다.

```js
function Toggle({ onChange }) {
  const [isOn, setIsOn] = useState(false);

  // 🔴 Avoid: The onChange handler runs too late
  useEffect(() => {
    onChange(isOn);
  }, [isOn, onChange])

  function handleClick() {
    setIsOn(!isOn);
  }

  function handleDragEnd(e) {
    if (isCloserToRightEdge(e)) {
      setIsOn(true);
    } else {
      setIsOn(false);
    }
  }

  // ...
```

마찬가지, 이것은 이상적이지 않다. `Toggle` 은 state를 먼저 업데이트 하고, 리액트가 화면을 업데이트하고 나서 상위 컴포넌트로부터 전달 된 `onChange` 함수를 호출하는 Effect를 실행한다. 이제 상위 컴포넌트는 자체 state를 업데이트 하여 또 다른 렌더 패스를 시작한다. 모든 작업은 단일 패스에서 실행하는 것이 좋다.

Effect를 삭제하고 대신 같은 이벤트 핸들러 내에 있는 두 컴포넌트의 상태를 업데이트한다.

```js
function Toggle({ onChange }) {
  const [isOn, setIsOn] = useState(false);

  function updateToggle(nextIsOn) {
    // ✅ Good: Perform all updates during the event that caused them
    setIsOn(nextIsOn);
    onChange(nextIsOn);
  }

  function handleClick() {
    updateToggle(!isOn);
  }

  function handleDragEnd(e) {
    if (isCloserToRightEdge(e)) {
      updateToggle(true);
    } else {
      updateToggle(false);
    }
  }

  // ...
}
```

이러한 접근은, `Toggle` 컴포넌트와 그 상위 컴포넌트가 이벤트 중 각자의 state를 업데이트 한다. 리액트는 다른 컴포넌트를 함께 [일괄 업데이트](https://beta.reactjs.org/learn/queueing-a-series-of-state-updates) 한다. 그래서 결과적으로 오직 한번의 렌더 패스만 있을 것이다.

state를 완전히 삭제할 수도 있다. 그 대신 상위 컴포넌트로부터 `isOn`을 받는다:

```js
// ✅ Also good: the component is fully controlled by its parent
function Toggle({ isOn, onChange }) {
  function handleClick() {
    onChange(!isOn);
  }

  function handleDragEnd(e) {
    if (isCloserToRightEdge(e)) {
      onChange(true);
    } else {
      onChange(false);
    }
  }

  // ...
}
```

["state 끌어올리기"](https://beta.reactjs.org/learn/sharing-state-between-components) 는 상위 컴포넌트에서 상위 컴포넌트의 값을 토글하는 `Toggle`을 완전히 컨트롤 하게 한다. 이것은 상위 컴포넌트가 더 많은 로직을 포함하게 될 것을 의미 하지만, 전반적으로 걱정 되는 state가 줄게 될 것이다. 서로 다른 두개의 state 값의 동기화를 유지하려고 한다면, 이것은 state를 끌어올리라는 신호이다.

### 상위로 데이터 전달

이 `Child` 컴포넌트는 어떠한 데이터를 가져와서 Effect 내에서 상위 컴포넌트로 전달한다.

```js
function Parent() {
  const [data, setData] = useState(null);
  // ...
  return <Child onFetched={setData} />;
}

function Child({ onFetched }) {
  const data = useSomeAPI();
  // 🔴 Avoid: Passing data to the parent in an Effect
  useEffect(() => {
    if (data) {
      onFetched(data);
    }
  }, [onFetched, data]);
  // ...
}
```

리액트에서는 데이터가 상위에서 하위로 흐른다. 뭔가 잘못 된 것을 화면에서 보면, 컴포넌트 체인을 통해 어느 컴포넌트가 잘못 된 prop을 전달 했거나 잘못 된 state를 가지고 있는지 찾을 때 까지  그 정보가 어디서 왔는지 추적할 수 있다. 하위 컴포넌트가 Effect 내에서 상위 컴포넌트의 state 를 업데이트 할 때, 데이터 흐름을 찾기 어려워진다. 하위 컴포넌트와 상위 컴포넌트 모두 동일한 데이터가 필요하기 때문에, 상위 컴포넌트가 데이터를 가져오게 하고 하위 컴포넌트로 전달하라:

```js
function Parent() {
  const data = useSomeAPI();
  // ...
  // ✅ Good: Passing data down to the child
  return <Child data={data} />;
}

function Child({ data }) {
  // ...
}
```

이것은 간결하고 데이터 흐름을 예측 가능하게 한다: 데이터는 상위에서 하위로 흐른다.

### 외부 스토어를 구독하는 것

때로 컴포넌트는 리액트 state 외부의 데이터를 구독해야 할 수 있다. 이 데이터는 써드파티 라이브러리나 브라우저 내장 API일 것이다. 이 데이터는 리액트가 모르게 변경될 수 있으므로 컴포넌트가 그것을 수동으로 구독해야 한다. 이것은 종종 Effect 로 실행된다. 예를 들어:

```js
function useOnlineStatus() {
  // Not ideal: Manual store subscription in an Effect
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    function updateState() {
      setIsOnline(navigator.onLine);
    }

    updateState();

    window.addEventListener('online', updateState);
    window.addEventListener('offline', updateState);
    return () => {
      window.removeEventListener('online', updateState);
      window.removeEventListener('offline', updateState);
    };
  }, []);
  return isOnline;
}

function ChatIndicator() {
  const isOnline = useOnlineStatus();
  // ...
}
```

여기, 컴포넌트가 외부 데이터 스토어를 구독하고 있다(`navigator.onLine` 브라우저 API).

이 API가 서버에 존재하지 않기 때문에 (따라서 초기 HTML을 생성하는 데 사용할 수 없다) 최초 state는 `true`로 설정된다. 해당 데이터 저장소의 값이 브라우저에서 변경될 때마다 컴포넌트는 state를 업데이트 한다.

이것을 위해 Effect 를 사용하는게 일반적이지만, 리액트는 외부 저장소를 구독하는 대신 사용하도록 특별히 제작 된 선호된 훅을 내장하고 있다. Effect를 삭제하고 [`useSyncExternalStore`](https://beta.reactjs.org/reference/react/useSyncExternalStore)를 호출하는 것으로 대체하자.


```js
function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

function useOnlineStatus() {
  // ✅ Good: Subscribing to an external store with a built-in Hook
  return useSyncExternalStore(
    subscribe, // React won't resubscribe for as long as you pass the same function
    () => navigator.onLine, // How to get the value on the client
    () => true // How to get the value on the server
  );
}

function ChatIndicator() {
  const isOnline = useOnlineStatus();
  // ...
}
```

This approach is less error-prone than manually syncing mutable data to React state with an Effect. Typically, you’ll write a custom Hook like `useOnlineStatus()` above so that you don’t need to repeat this code in the individual components. [Read more about subscribing to external stores from React components.](https://beta.reactjs.org/reference/react/useSyncExternalStore)

### Fetching data [](https://beta.reactjs.org/learn/you-might-not-need-an-effect#fetching-data "Link for Fetching data")

Many apps use Effects to kick off data fetching. It is quite common to write a data fetching Effect like this:

```js
function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // 🔴 Avoid: Fetching without cleanup logic
    fetchResults(query, page).then(json => {
      setResults(json);
    });
  }, [query, page]);

  function handleNextPageClick() {
    setPage(page + 1);
  }
  // ...
}
```

You _don’t_ need to move this fetch to an event handler.

This might seem like a contradiction with the earlier examples where you needed to put the logic into the event handlers! However, consider that it’s not _the typing event_ that’s the main reason to fetch. Search inputs are often prepopulated from the URL, and the user might navigate Back and Forward without touching the input. It doesn’t matter where `page` and `query` come from. While this component is visible, you want to keep `results` [synchronized](https://beta.reactjs.org/learn/synchronizing-with-effects) with data from the network according to the current `page` and `query`. This is why it’s an Effect.

However, the code above has a bug. Imagine you type `"hello"` fast. Then the `query` will change from `"h"`, to `"he"`, `"hel"`, `"hell"`, and `"hello"`. This will kick off separate fetches, but there is no guarantee about which order the responses will arrive in. For example, the `"hell"` response may arrive _after_ the `"hello"` response. Since it will call `setResults()` last, you will be displaying the wrong search results. This is called a [“race condition”](https://en.wikipedia.org/wiki/Race_condition): two different requests “raced” against each other and came in a different order than you expected.

**To fix the race condition, you need to [add a cleanup function](https://beta.reactjs.org/learn/synchronizing-with-effects#fetching-data) to ignore stale responses:**

```js
function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    let ignore = false;
    fetchResults(query, page).then(json => {
      if (!ignore) {
        setResults(json);
      }
    });
    return () => {
      ignore = true;
    };
  }, [query, page]);

  function handleNextPageClick() {
    setPage(page + 1);
  }
  // ...
}
```

This ensures that when your Effect fetches data, all responses except the last requested one will be ignored.

Handling race conditions is not the only difficulty with implementing data fetching. You might also want to think about how to cache the responses (so that the user can click Back and see the previous screen instantly instead of a spinner), how to fetch them on the server (so that the initial server-rendered HTML contains the fetched content instead of a spinner), and how to avoid network waterfalls (so that a child component that needs to fetch data doesn’t have to wait for every parent above it to finish fetching their data before it can start). **These issues apply to any UI library, not just React. Solving them is not trivial, which is why modern [frameworks](https://beta.reactjs.org/learn/start-a-new-react-project#building-with-a-full-featured-framework) provide more efficient built-in data fetching mechanisms than writing Effects directly in your components.**

If you don’t use a framework (and don’t want to build your own) but would like to make data fetching from Effects more ergonomic, consider extracting your fetching logic into a custom Hook like in this example:

```js
function SearchResults({ query }) {
  const [page, setPage] = useState(1);
  const params = new URLSearchParams({ query, page });
  const results = useData(`/api/search?${params}`);

  function handleNextPageClick() {
    setPage(page + 1);
  }
  // ...
}

function useData(url) {
  const [data, setData] = useState(null);
  useEffect(() => {
    let ignore = false;
    fetch(url)
      .then(response => response.json())
      .then(json => {
        if (!ignore) {
          setData(json);
        }
      });
    return () => {
      ignore = true;
    };
  }, [url]);
  return data;
}
```

You’ll likely also want to add some logic for error handling and to track whether the content is loading. You can build a Hook like this yourself or use one of the many solutions already available in the React ecosystem. **Although this alone won’t be as efficient as using a framework’s built-in data fetching mechanism, moving the data fetching logic into a custom Hook will make it easier to adopt an efficient data fetching strategy later.**

In general, whenever you have to resort to writing Effects, keep an eye out for when you can extract a piece of functionality into a custom Hook with a more declarative and purpose-built API like `useData` above. The fewer raw `useEffect` calls you have in your components, the easier you will find to maintain your application.

## Recap

-   If you can calculate something during render, you don’t need an Effect.
-   To cache expensive calculations, add `useMemo` instead of `useEffect`.
-   To reset the state of an entire component tree, pass a different `key` to it.
-   To reset a particular bit of state in response to a prop change, set it during rendering.
-   Code that needs to run because a component was _displayed_ should be in Effects, the rest should be in events.
-   If you need to update the state of several components, it’s better to do it during a single event.
-   Whenever you try to synchronize state variables in different components, consider lifting state up.
-   You can fetch data with Effects, but you need to implement cleanup to avoid race conditions.