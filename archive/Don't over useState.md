# Don't over useState

_2023년 0월 0일_

#Translates #작성중

https://tkdodo.eu/blog/dont-over-use-state

`useState`는 React에서 제공하는 모든 hook 중 가장 기본적인 것으로 간주됩니다. 또한 `useEffect`와 함께 가장 많이 사용합니다. (ㄹㅇ).

지난 몇달간, 이 훅이 잘못 사용되는 경우를 많이 봤습니다. 대부분 훅 자신과 관련 없는 경우입니다. 하지만 상태관리는 쉽지 않습니다.

이 글은 내가 `useState의 함정` 이라고 이름 지은 글들의 첫번째 파트입니다. 
더 좋고 다르게 useState 훅을 사용하여 해결하는 일반적인 시나리오의 아웃라인


## state 는 무엇인가?

나는 모든 것이 상태가 무엇인지 이해하는 것으로 귀결된다고 생각합니다. 아니면, 좀 더 정확히, state 가 아닌가? 이것을 이해하기 위해서는 리액트 공식 문서를 봐야 합니다.

> 각각의 데이터들에게 3가지 질문을 하라.
> 
> 1. 부모 컴포넌트의 props 로부터 온 데이터인가? 그것은 state 가 아니다.
> 2. 시간이 지나도 변하지 않는가? 그것은 state가 아니다.
> 3. 컴포넌트 내의 다른 state 나 props를 기반으로 계산할 수 있는가? 그것은 state가 아니다.

props를 state로 두는 것(1)은 완전히 다른 문제입니다. 그것은 part2 에서 다루겠습니다.
그리고 setter를 사용하지 않을 것이라면 (2) 그것은 우리가 state를 다루고 있지 않은게 분명한 것임을 바랍니다.

세번째 질문이 남습니다: derived state. state로부터 계산할 수 있는 값이 자신의 state가 아니라는 것이 매우 명백해 보일 수 있습니다. 그러나 최근에 내 클라이언트에 대한 몇 가지 코드 문제를 검토했을 때 이것은 고위 지원자에게서조차 많이 본 패턴입니다.

## 예시

연습은 간단합니다. 어떠한 데이터를 endpoint로부터 가져와서 (카테고리를 포함한 아이템들의 리스트) 카테고리로 필터링 합니다.

state가 관리되는 방법은 대부분의 경우 이와 같았습니다.

```jsx
import { fetchData } from './api'
import { computeCategories } from './utils'

const App = () => {
  const [data, setData] = React.useState(null)
  const [categories, setCategories] = React.useState([])

  React.useEffect(() => {
    async function fetch() {
      const response = await fetchData()
      setData(response.data)
    }

    fetch()
  }, [])

  React.useEffect(() => {
    if (data) {
      setCategories(computeCategories(data))
    }
  }, [data])

  return <>...</>
}
```

언뜻 보기에는 괜찮아 보입니다. 아마도 이런 생각이 들것입니다. data 를 가져오는 effect 가 있고, 카테고리를 데이터와 sync 하는 effect가 있다. 
이것은 정확히 useEffect 훅이 하는 일이다. 뭐가 잘못됐는가?

## 동기화 되지 않음

