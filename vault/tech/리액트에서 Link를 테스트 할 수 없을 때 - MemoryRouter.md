# 리액트에서 Link를 테스트 할 수 없을 때 - MemoryRouter

_2022년 4월 1일_

`React Testing Library` 또는 `Storybook` 으로 컴포넌트를 테스트 할 때 `react-router-dom`의 `Link`가 포함 된 컴포넌트에서 에러가 나는 것을 겪게 됩니다.

아래와 같은 테스트 코드가 있다고 가정해봅시다.

```jsx
test('리스트 아이템을 모두 렌더 합니다.', () => {
  render(<Menubar menus={menus} />);
  const listItems = screen.getAllByRole('listitem');
  expect(listItems.length).toEqual(menus.length);
});
```

위 테스트를 실행시키면 우리는 아래와 같은 에러를 만나게 됩니다. 에러 메시지는 친절하게도 `useHref()`는 `<Router>`의 문맥에서 사용할 수 있다고 알려줍니다.

```null
Error: Uncaught [Error: useHref() may be used only in the context of a <Router> component.]
```

예전에는 테스트 상황에서는 `to` 값을 일부러 부여하지 않고, `to` 값이 없을때는 `Link` 가 아닌 `a` 엘리먼트를 렌더하도록 아래와 같이 `LinkTo`라는 컴포넌트를 만들어서 해결했습니다.

```jsx
interface Props {
  to?: string;
}
  
const LinkTo: React.FC<Props> = ({ to, children }) => {
  return (
    to ? (
      <Link to={to}>
        {children}
      </Link>
    ) : (
      <a href="#">{children}</a>
    )
  )
}
```

이렇게 하면, 테스트 코드에는 to에 값을 주지 않으면 문제가 없었는데, 임시방편일 뿐이었고 그다지 우아한 방법은 아니라고 생각합니다.

왜 에러가 등장하게 되는 걸까요? 에러 메시지를 다시 볼까요?

> `useHref()`는 `<Router>`의 문맥에서 사용할 수 있습니다.

우리가 웹을 개발할 때, `Link`를 사용하려면 반드시 `BrowserRouter`로 감싸져 있는 자식 컴포넌트에서만 사용할 수 있습니다. `<Router>`문맥에서 사용하기 위해서 이러한 Wrapper 컴포넌트가 필요한데, 테스트 환경은 브라우저가 아니기 때문에 다른 방법을 사용해야합니다.

## MemoryRouter

> A `<Router>` that keeps the history of your “URL” in memory (does not read or write to the address bar).  
> Useful in tests and non-browser environments like React Native.
> 
> "URL"의 기록을 메모리에 유지하는 `<Router>` (주소 표시줄을 읽거나 쓰지 않음).  
> 테스트 및 React Native와 같은 비 브라우저 환경에서 유용합니다.

우리는 브라우저가 아닌 환경에서 `Link` 가 포함 된 컴포넌트를 테스트 할 때, `MemoryRouter`를 사용할 수 있습니다.

이 글의 맨 위에서 가정했던 테스트 코드를 다시 고쳐봅시다.

```jsx
test('리스트 아이템을 모두 렌더 합니다.', () => {
  render(
    <MemoryRouter>
      <Menubar menus={menus} />
    </MemoryRouter>
  );
  const listItems = screen.getAllByRole('listitem');
  expect(listItems.length).toEqual(menus.length);
});
```

이번엔 어떤 결과를 가져올까요?

```jsx
PASS  src/components/Menubar/Menubar.test.tsx
  ✓ 리스트 아이템을 모두 렌더 합니다. (102 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.629 s, estimated 2 s
Ran all test suites related to changed files.
```

좋네요! 테스트를 잘 통과했습니다.

우리는 이것을 Storybook에도 똑같이 적용할 수 있습니다.

```jsx
const Template: Story = (args) => (
  <MemoryRouter>
    <Menubar {...args} />
  </MemoryRouter>
)
export const Default = Template.bind({});
Default.args = {
  menus
};
```

## 참고자료

-   [https://v5.reactrouter.com/web/api/MemoryRouter](https://v5.reactrouter.com/web/api/MemoryRouter)