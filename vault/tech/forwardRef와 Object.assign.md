# forwardRef와 Object.assign

```jsx
function FooComponent() {
	return <h1>Foo</h1>;
}

function BarComponent() {
	return <h1>Bar</h1>;
}

function Assiged = Object.assign(FooComponent, BarComponent);

export default function App() {
	return (
		<div className="App">
			<Assigned /> // Foo
		</div>
	)
}
```

```jsx
function FooComponent = forwardRef(function FooComponent() {
	return <h1>Foo</h1>;
}));

function BarComponent = forwardRef(function BarComponent() {
	return <h1>Bar</h1>;
});

function Assiged = Object.assign(FooComponent, BarComponent);

export default function App() {
	return (
		<div className="App">
			<Assigned /> // Bar
		</div>
	)
}
```

Object.assign 은 얕은복사를 하므로, 함수 컴포넌트끼리는 열거가능한 키가 없으므로 복사가 안되는데, forwardRef 의 반환값은 object 형태기 때문에 키 복사가 잘 된다?