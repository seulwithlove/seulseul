#devlog #study #react #hooks 

# React study notes

- [한 입 크기로 잘라먹는 리액트](https://reactjs.winterlood.com/)
- 새싹 풀스택 과정
	- 강의 듣고 정리
	- *LLM 활용 내용 보충*

*...업데이트중...*

---
## 내어보기

### JSX
- 자바스크립트와 HTML 태그를 섞어 사용하는 문법
	- 리액트 컴포넌트는 자바스크립트 함수로 생성
		- 이 함수는 HTML 값을 리턴
### `props`
- from parent to child
- object
- can send using spread syntax
	- `<Body {...bodyProps} />`
- usually used by destructuring parameters
	- `function Body({name, location}){}`
- can set `defaultProps` 
	- out of the component
	- `Body.defaultProps = {}`
- children 으로 받음
 
###  `useState`
- `const [state, setState] = useState(initVal);`
	- useStae returns a list with state, a function to update the state

###  `useEffect`
- Runs after React has rendered the component to the DOM 
	- **after rendering**
- can handle side effects depend on state or props changes
- `[]` deps : dependency array
	- no array: run after every render
	 
###  Life Cycle
- mount : when the component is first  created and rendered into the DOM
	- component appears on the screen
- update : when the component re-renders due to state/props changes
	- re-renders with new data
- unmount : when the component is removed from the DOM(cleanup)
	- component disappears

**![](https://lh7-rt.googleusercontent.com/slidesz/AGV_vUcKerHxoow3z7xryVN4aFXnU2JbW_juoQxaa4vYcPH4R0_qbDO728LMcJo194fw3FLt2JhOzWg6pyTMf2vwoOTIyEJtPszZNBBletvvoyQpdUzP-KCWojhLMmsWDwnkw4etEWOiOg=s2048?key=7Xs-N51EdyKqd7Xdi_6I0p9S)![](https://lh7-rt.googleusercontent.com/slidesz/AGV_vUcNxStgtJcIWnoSiEwsrXPozzkXMn50vVrOZOYRu_8TyfwjqhBVZZqtxUeLVpgeikBVvk_LUOxlL0LyBfAZ1YPn7JGLhR2MvWIKb9KlkH2O8G_zqABjnSoq1USx1tdie3AUtpSv=s2048?key=7Xs-N51EdyKqd7Xdi_6I0p9S)




### React Fiber
> JS의 single thread 단점을 보완하는 프레임워크 (렌더링 최적화)
> - 요소마다 우선순위가 있어서 요청에 따라 작업을 유연하게 처리
> 	- 화면이 부드럽게 보여지도록 함

- [reference](https://medium.com/stayfolio-tech/react%EA%B0%80-0-016%EC%B4%88%EB%A7%88%EB%8B%A4-%ED%95%98%EB%8A%94-%EC%9D%BC-feat-fiber-1b9c3839675a)


---
## 강의노트

- Next : Full stack 가능
- Bun
	- 프레임워크는 빠른데 build도 빨라야 의미있음
	- bun: apple / pnpm & npm : google
	- startup 에서는 bun 많이 씀
		- 실리콘 밸리에서 많이 사용
- pnpm : monorepo에 최적화

### React19
- 함수형
- Virtual DOM : Fiber가 눈에 그리는 것
	- Actual DOM과 diff를 가져서 그림
- 바뀌지 않는 함수/값 을 `useCallback`에 올림
- `useMemo` : 미리 계산해 두는 값
	- react19 compiler가 다 알아서함
- Render단계 : Virtual DOM(Fiber tree)생성 + diff계산(동기) 
	- `useLayoutEffect` : 레이아웃 위치 잡기 (동기)
- Commit 단게 : Update Actual DOM 
- Paint : 브라우저가 화면에 픽셀을 그리는 단계(비동기)
	- `useEffect` : 비동기


## 성능 최적화 Hooks
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



## DOM & Effect 관련 Hooks
### `useLayoutEffect`
- DOM이 'commit된 직후' 실행 -> 레이아웃 계산/ 측정할때 사용
- 동기 실행 -> paint되기 전에 실행됨 : 성능영향 O

### `useEffect` 
- rendering -> mount 이후에 실행
	- paint 이후 실행(비동기)
- state 값 그 자체를 관리하는게 X -> 렌더링에 따른 `side effect`를 처리하는데 사용
	- e.g. data fetch, event listener 등록, DOM 조작
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

## Ref & Imperative Handle
### `useRef`
- `ref.current` 사용

### `useImperativeHandle` ✨✨
- 부모가 자식을 control
- 값은 `Ref`에 담아서 보내면 `ref.current` 로 사용
	👉 공부 포인트: 언제 사용하는지 확실히 정리해두기
	- Modal, Input, Scroll


## 상태관리

### `useState`
- React 내부에서 Queue 자료구조로 업데이트
- throttle 되는 사이의 return 값을 미리 저장해둠
	👉 공부 포인트: throttle/debounce 같은 개념과 차이도 알아두기


### `useReducer`
- 중앙 상태 관리
	👉 공부 포인트: Todo App을 **useReducer + Context API**만으로 구현해보기


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


### `contextAPI` ✨✨✨
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


---

## 의문갖기

### useState와 useRef는 어떻게 다르게 동작하지?
|구분|`useState`|`useRef`|
|---|---|---|
|값 저장 위치|React가 관리하는 "state 영역"|React 컴포넌트 안의 "ref 객체" (`.current`)|
|값 변경 시|컴포넌트를 **리렌더링**|리렌더링 안 함|
|초기화 시점|컴포넌트가 **다시 마운트될 때** 초기화|컴포넌트가 **언마운트되기 전까지 유지**|
|주 용도|UI에 반영되어야 하는 값 (화면에 보여야 하는 값)|DOM 접근, 리렌더링 없이 보존해야 하는 값 (타이머 ID, 이전 값 저장 등)|

### useRef - contextAPI 모두 렌더링에 영향을 받지 않는 값을 보관하는게 아닌가?
> 값을 보관하는 작업을 하지만, 렌더링 관계는 완전히 반대
- useRef : 렌더링에 무관한 값을 보관
- Context API : 렌더링에 직접 영향을 주는 전역 상태 관리 도구

| 구분     | **useRef**                     | **Context API**                                       |
| ------ | ------------------------------ | ----------------------------------------------------- |
| 주 역할   | **리렌더링 없이 값 보존**               | **컴포넌트 트리 전역에 값 전달 (props drilling 방지)**              |
| 값 변경 시 | UI 리렌더링 ❌ (그냥 값 저장만)           | Provider의 value가 바뀌면 해당 Context를 구독하는 Consumer들이 리렌더링 |
| 범위     | 해당 컴포넌트 내부 전용 (지역 변수처럼 동작)     | 컴포넌트 트리 전역에 공유 (전역 props)                             |
| 주 사용처  | DOM 접근, 타이머 ID, 이전 값 저장        | 다크모드 설정, 로그인 정보, 언어 설정 등 전역 상태                        |
| 동작 방식  | 단순히 `.current`라는 객체 프로퍼티에 값 유지 | `Provider → Consumer` 패턴으로 트리를 따라 값 주입                |

### useState면 상태값을 다루는데 충분할 것 같은데, useEffect는 어떤 경우에 사용하지?
1. State / Effect 차이
	- `useState` : UI에 반영할 데이터를 React 안에 보관
	- `useEffect` : React가 관리하는 데이터(state, props)가 변했을때, 외부에서 작업을 해야하는 경우 (side effect 관리)


---

## 찾아보기
- 

## 액션아이템

- [ ] TodoList
- [ ] {{action3}}

