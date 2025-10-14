---
created: 2025-10-11T23:14
updated: 2025-10-14T17:03
---
#devlog #study  #react #hooks
# React hooks 📝

- 새싹 풀스택 과정
	- 강의 듣고 정리
	- *LLM 활용 내용 보충*
---


## 성능 최적화 hooks

### `useDefferedValue` ✨
- UI 응답성을 위해 우선순위 낮은 업데이트를 늦춤
	- Que가 빌때까지 바뀌지 X
- `debounce`와는 다름
	- debounce : 시간 기반
	- deferred : React scheduling 기반
- e.g. 검색창 입력시 바로 반응 but 리스트는 천처히 업데이트 하는 패턴
`
### `useOptimistic` ✨
- 서버 응답 기다리기 전에 UI 먼저 갱신(optimistic UI)
	- 서버에 값을 미리 보내기 전에 값을 먼저 보여주는 것
- 실패시 rollback 필요
- e.g. 좋아요
- 👉 Server action + optimistic UI 조합

### `useCallback` / `useMemo`
- React 19는 compiler 자동최적화로 직접 사용X
- but, '참조 동일성 유지'가 필요한 경우엔 알아둬야함



## DOM & Effect 관련 hooks
### `useLayoutEffect`
- DOM이 'commit된 직후' 실행 -> 레이아웃 계산/ 측정할때 사용
- 동기 실행 -> paint되기 전에 실행됨 : 성능영향 O

### `useEffect` 
- Runs after React has rendered the component to the DOM 
	- **after rendering**(paint 이후 실행(비동기))
- state 값 그 자체를 관리하는게 X -> 렌더링에 따른 `side effect`를 처리하는데 사용
	- e.g. data fetch, event listener 등록, DOM 조작
- `[]` deps : dependency array
	- no array: run after every render
- life cycle 관리에 사용
	- 라이프사이클을 이용해 특정 작업을 할수 있음

```tsx
import {useState, useEffect} from 'react';

function TitleUpdater(){
	const [count, setCount] = useState(0);
	
	// whenever state is changed, update browser tab's title(side effect)
	useEffect(()=>{
		document.title = `current count : ${count}`;
	}, [count]);  // only when count is changed
	
	return (
		<div>
			<p>{count}</p>
			<button onClick={() => setCount(count + 1)}>+1</button>
		</div>
	);
}
```

## Ref & Imperative Handle 관련 hooks
### `useRef`
- `ref.current` 사용

### `useImperativeHandle` ✨✨
- 부모가 자식을 control
- 값은 `Ref`에 담아서 보내면 `ref.current` 로 사용
	👉 공부 포인트: 언제 사용하는지 확실히 정리해두기
	- Modal, Input, Scroll


## 상태관리 관련 hooks

### `useState`
- `const [state, setState] = useState(initVal);`
	- useStae returns a list with state, a function to update the state
- React 내부에서 Queue 자료구조로 업데이트
- throttle 되는 사이의 return 값을 미리 저장해둠
	👉 공부 포인트: throttle/debounce 같은 개념과 차이도 알아두기


### `useReducer`
- 중앙 상태 관리
	👉 공부 포인트: Todo App을 **useReducer + Context API**만으로 구현해보기
	- [🔗 project : React Todo App](https://github.com/seulwithlove/react-todo) 


### `useActionState` ✨✨✨
- `useState` + `useTransition`
- `isPending` 필요한 경우
- form제출, 서버 mutation 같은 곳에서 유용
	👉 공부 포인트: 서버 액션(Form) + optimistic UI + `useActionState` 조합
	- form 처리 흐름

### `useFormStatus`
- button이 속해있는 form 상태를 읽음
	- `isPending` 상태를 쉽게 확인 가능
	👉 공부 포인트: 여러 버튼이 있는 Form에서 버튼별 상태 어떻게 다뤄지는지


### `context API` ✨✨✨
- 'props drilling(중첩된 props 전달)' 문제를 해결하기 위해 사용
- component 외부 값에 접근
- 구성 요소
	- `React.createContext(defaultValue)` : Context 객체 생성
	- `Provider` : 값을 공급(설정)하는 컴포넌트
	- `Consumer` (or `useContext`) : 값을 사용하는 컴포넌트 / Hook
		- `useContext(Context객체)`
- 전역으로 공유되는 값이 필요할때 사용
	- theme(light/dark)
	- language(i18n)
	- login data(Auth)
	- global state
```tsx
// context.ts
import {createContext} from "react";

export const ThemeContext = createContext("light");

// --------------------------------------------------

// Child.tsx
import {useContext} from "react";
import {ThemeContext} from "./context";

export default function Child() {
	const theme = useContext(ThemeContext);
	return <div>Current Theme : {theme}</div>;	
}

// --------------------------------------------------

// App.tsx
import {ThemeContext} from "./context";
import Child from "./Child";

export default function App() {
	return (
		<ThemeContext.Provider value="dark">
		 <Child />
		</ThemeContext.Provider>
	);
}
```


#### `useReducer` + `contextAPI` 로 상태관리
- `useReducer`로 logic(상태 전환) 정의 -> Context로 전역 공유
- Redux 대체 - 무거워서 사용X
```tsx
import {createContext, useReducer, useContext, ReactNode} from "react";

// 1. Reducer
type State = {count: number};
type Action = {type: "inc" | "dec"};

function reducer(state: State, action: Action): State {
	switch (action.type) {
		case "inc" : return {count: state.count + 1};
		case "dec" : return {count: state.count - 1};
		default : return state;
	}
}

// 2. Context
const CounterContext = createContext<
	{state: State; dispatch: React.Dispatch<Action>} | undefined
>(undefined);


// 3. Provider
export function CounterProvider({children}:{children:ReactNode}){
	const [state, dispatch] = useReducer(reducer, {count : 0});
	return (
		<CounterContext.Provider value=({state, dispatch})>
			{children}
		</CounterContext.Provider>
	);
}

// 4. use custon Hook
export function useCoutner(){
	const context = useContext(CounterContext);
	if (!context) throw new Error("useCounter should be used INSIDE Provider");
	return context;
}


// ------------------------------
function CounterButton(){
	const {state, dispatch} = useCounter();
	return (
		<div>
			<p>Count : {state.count}</p>
			<button onClick={()=> dispatch({type:"inc"})}>+</button>
			<button onClick={()=> dispatch({type:"desc"})}>-</button>
		</div>
	)
}

```

💡 onclick eventlistener에서 실행할 함수는 화살표함수로 감싸서 전달하기! 
- `onClick={() => onUpdate(todo.id)}`
	- `onClick={onUpdate(todo.id)}`이런식으로 넘기면 X
		- 이건 onClick이 발생하기도 전에 `onUpdate`를 실행시키고 그 결과값을 담아두는 것!
