# Form 컴포넌트 제출값을 테스트 하는 방법

_2022년 4월 1일_

아래 코드는 `email`과 `password` 값을 유저로부터 입력 받아, **부모 컴포넌트의 submit 함수로 값을 전달**하는 컴포넌트입니다.

흔히 말하는 `presentational 컴포넌트`에 해당합니다. 따라서 이 컴포넌트는 **비즈니스 로직이나 기능을 모릅니다.** API 요청은 `email`과 `password` 값을 받은 부모 컴포넌트에서 처리합니다.

유저 입력에 따른 UI 로직만 존재할 수 있습니다.

코드를 볼까요?  
*_유효성 체크는 코드상 제외하였습니다._

```jsx
export interface Props {
  onSubmit: (email: string, password: string) => void;
}

const LoginForm: React.FC<Props> = ({ onSubmit }) => {
  const [values, setValues] = useState<{ [x: string]: string }>({ email: '', password: '' });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    setValues({ ...values, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    onSubmit(values.email, values.password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email
        <input name='email' type='email' value={values.email} onChange={handleChange} />
      </label>
      <label>
        Password
        <input name='password' type='password' value={values.password} onChange={handleChange} />
      </label>
      <button type='submit'>
        Submit
      </button>
    </form>
  );
};
```

onChange나 onSubmit 이벤트가 실행하는지 여부는 컴포넌트 내에서 `fireEvent`와 `mock` 함수를 통해 테스트 할 수 있습니다.

그렇다면, **`name`과 `password` 값이 제대로 부모 컴포넌트로 전달 되는지**는 어떻게 테스트 할 수 있을까요? 부모컴포넌트에서 테스트해야할까요?

꽤 단순한 방법으로 `presentational 컴포넌트`에서도 테스트할 수 있습니다.  
코드를 볼까요?

```jsx
test('제출 이벤트로 값이 제대로 전달 되는지 테스트합니다.', () => {
  
  // 테스트를 위한 임의의 값을 저장할 객체를 정의합니다.
  let values: { [x: string]: string } = {};
  
  // handleSubmit 함수를 jest.fn() 이 아닌 일반 함수로 작성해줍니다.
  const handleSubmit = (email: string, password: string) => {
    values.email = email;
    values.password = password;
  };
  
  // 렌더링 하고 각 input, button 요소들을 선택합니다.
  render(<LoginForm onSubmit={handleSubmit} />);
  const emailInputEl = screen.getByLabelText('Email');
  const passwordInputEl = screen.getByLabelText('Password');
  const buttonEl = screen.getByText('Submit');
  
  // Input 요소들의 onChange 이벤트를 작동합니다.
  fireEvent.change(emailInputEl, { target: { value: 'johny@example.com' } });
  fireEvent.change(passwordInputEl, { target: { value: '12345' } });
  
  // Submit 을 담당하는 버튼을 클릭해줍니다.
  fireEvent.click(buttonEl);
  
  expect(values.email).toEqual('johny@example.com');
  expect(values.password).toEqual('12345');
});
```

1.  테스트를 위한 임의의 객체인 `let values`의 값을 변경하는 `handleSubmit` 함수를 props로 전달합니다.
2.  `onSubmit` 이벤트가 실행되면 `fireEvent.change` 에서 입력된 값을 자식인 `<LoginForm />` 컴포넌트로부터 전달 받아서, 임의의 객체 `values`의 값을 변경해줍니다.
3.  임의의 객체 `values`에 값이 잘 저장 됐는지 expect().toEqual() 메서드로 검사합니다.

위와 같은 방법으로 `presentational 컴포넌트`에서 부모로 값을 전달하는 이벤트를 테스트 할 수 있습니다.