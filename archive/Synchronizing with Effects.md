# Synchronizing with Effects


어떤 컴포넌트들은 외부 시스템과 동기화가 필요하다. 예를 들어, 리액트 state 를 기반으로 한 논-리액트 컴포넌트를 조작하고 싶을 수 있다, 서버 연결 세팅, 또는 컴포넌트가 스크린에 나타났을 때 통계 로그 전송하기. Effect는 렌더링 이후, 어떤 코드를 실행하게 하여 리액트 밖의 어떤 시스템과 컴포넌트를 동기화 할 수 있게 한다.

>### 이런 것을 배우게 된다.
>
>- Effect 가 무엇인가
>- Effect 가 이벤트와 어떻게 다른가
>- 컴포넌트에서 Effect 를 어떻게 선언하는가
>- 불필요한 Effect 재실행을 어떻게 방지하는가
>- 개발중에 왜 Effect 는 두번 실행되며 어떻게 고치는가

## Effect 가 무엇이며 이벤트와 어떻게 다른가?

Before getting to Effects, you need to be familiar with two types of logic inside React components: