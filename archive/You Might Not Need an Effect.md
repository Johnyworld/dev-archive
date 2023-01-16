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
> - 부모 컴포넌트에게 변경에 대해 어떻게 알려줄 수 있는가?

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

이것은 효율적이지 않다. 왜냐하면 `ProfilePage` 와 그 자식들은 첫 렌더시 낡은 값으로 렌더 되고, 한번 더 렌더 된다. 또한 이것은 `ProfilePage` 내에 일부 state를 가진 모든 컴포넌트에서 이 작업을 수행해야 하기 때문에 복잡하다. 예를들어 댓글 UI가 중첩 되었다면 중첩 된 `comment` state 도 초기화 하고 싶을 것이다.

대신에, 명백한 키를 제공하여 유저 프로필이 개념적으로 서로 다른 프로필임을 리액트에게 알려줄 수 있다. 컴포넌트를 두개로 분리하고 부모 컴포넌트가 자식 컴포넌트에게 `key` 속성을 전달한다.

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

일반적으로 리액트는 같은 컴포넌트가 같은 위치에서 렌더되면 state를 보존한다. **`userId` 를 `Profile` 컴포넌트의 `key`로 전달하는 것은, userId가 다른 두개의 Profile 컴포넌트에게 어떠한 state도 공유해서는 안되는 두개의 다른 구성요소로 취급하도록 리액트에게 요청하는 것이다.** 키가 변경되면 리액트는 DOM을 새로 생성하고 `Profile` 컴포넌트의 state와 그 자식 컴포넌트들 재설정한다. 결과적으로, 프로필 페이지간의 이동시 `comment` 필드는 자동적으로 초기화 될 것이다.

이 예시에서는, 외부의 `ProfilePage` 컴포넌트만 내보내고 프로젝트의 다른 파일에 보여진다. `ProfilePage`를 렌더링하는 컴포넌트들은 key를 전달할 필요가 없다: 그것들은 일반적인 prop으로 `userId`를 전달한다. `ProfilePage`가 내부 `Profile` 컴포넌트의 키로 이것을 전달한다는 사실은 구현 세부사항이다.

### prop이 변경 될 때 일부 state를 조정

때때로 당신은 prop리 변경될 때 state의 일부를 재설정하거나 조정하고 싶을 수 있다. 하지만 전부는 아니다.

이 `List` 컴포넌트는 `items`의 리스트를 prop 으로 받고, 선택 된 아이템을 `selection` state 값 내에 포함한다. 당신은 `items` prop 으로 다른 배열을 받을 때, `selection` 을 `null` 로 초기화 하고자 한다.

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