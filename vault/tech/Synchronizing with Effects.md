#Translates 

> 번역 진행중인 문서입니다.

어떤 컴포넌트들은 외부 시스템과 동기화가 필요하다. 예를 들어, 리액트 state 를 기반으로 한 논-리액트 컴포넌트를 조작하고 싶을 수 있다, 서버 연결 세팅, 또는 컴포넌트가 스크린에 나타났을 때 통계 로그 전송하기. Effect는 렌더링 이후, 어떤 코드를 실행하게 하여 리액트 밖의 어떤 시스템과 컴포넌트를 동기화 할 수 있게 한다.

>### 이런 것을 배우게 된다.
>
>- Effect 가 무엇인가
>- Effect 가 이벤트와 어떻게 다른가
>- 컴포넌트에서 Effect 를 어떻게 선언하는가
>- 불필요한 Effect 재실행을 어떻게 방지하는가
>- 개발중에 왜 Effect 는 두번 실행되며 어떻게 고치는가

## Effect 가 무엇이며 이벤트와 어떻게 다른가?

Effect 를 사용하기 전에, 리액트 컴포넌트 내부의 두 가지 유형의 로직에 익숙해져야 한다.

-   **Rendering code** (introduced in [Describing the UI](https://beta.reactjs.org/learn/describing-the-ui)) lives at the top level of your component. This is where you take the props and state, transform them, and return the JSX you want to see on the screen. [Rendering code must be pure.](https://beta.reactjs.org/learn/keeping-components-pure) Like a math formula, it should only _calculate_ the result, but not do anything else.

- **이벤트 핸들러**는 단지 계산하는 것이 아닌 무언가를 하는 컴포넌트 내부의 중첩된 함수들이다. 이벤트 핸들러는 입력필드를 업데이트 하거나, 제품을 구입하기 위해 HTTP POST 요청을 제출하거나 또는 사용자를 다른 화면으로 이동시킨다.

-   **Event handlers** (introduced in [Adding Interactivity](https://beta.reactjs.org/learn/adding-interactivity)) are nested functions inside your components that _do_ things rather than just calculate them. An event handler might update an input field, submit an HTTP POST request to buy a product, or navigate the user to another screen. Event handlers contain [“side effects”](https://en.wikipedia.org/wiki/Side_effect_(computer_science)) (they change the program’s state) and are caused by a specific user action (for example, a button click or typing).

Sometimes this isn’t enough. Consider a `ChatRoom` component that must connect to the chat server whenever it’s visible on the screen. Connecting to a server is not a pure calculation (it’s a side effect) so it can’t happen during rendering. However, there is no single particular event like a click that causes `ChatRoom` to be displayed.

**_Effects_ let you specify side effects that are caused by rendering itself, rather than by a particular event.** Sending a message in the chat is an _event_ because it is directly caused by the user clicking a specific button. However, setting up a server connection is an _Effect_ because it needs to happen regardless of which interaction caused the component to appear. Effects run at the end of the [rendering process](https://beta.reactjs.org/learn/render-and-commit) after the screen updates. This is a good time to synchronize the React components with some external system (like network or a third-party library).