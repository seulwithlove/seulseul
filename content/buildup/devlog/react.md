#devlog #study #react #hooks 

# React 📝

- [한 입 크기로 잘라먹는 리액트](https://reactjs.winterlood.com/)
- 새싹 풀스택 과정
	- 강의 듣고 정리
	- *LLM 활용 내용 보충*

*...업데이트중...*

---

# 의문갖기

## useState와 useRef는 어떻게 다르게 동작하지?
|구분|`useState`|`useRef`|
|---|---|---|
|값 저장 위치|React가 관리하는 "state 영역"|React 컴포넌트 안의 "ref 객체" (`.current`)|
|값 변경 시|컴포넌트를 **리렌더링**|리렌더링 안 함|
|초기화 시점|컴포넌트가 **다시 마운트될 때** 초기화|컴포넌트가 **언마운트되기 전까지 유지**|
|주 용도|UI에 반영되어야 하는 값 (화면에 보여야 하는 값)|DOM 접근, 리렌더링 없이 보존해야 하는 값 (타이머 ID, 이전 값 저장 등)|

## useRef - contextAPI 모두 렌더링에 영향을 받지 않는 값을 보관하는게 아닌가?
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

## useState면 상태값을 다루는데 충분할 것 같은데, useEffect는 어떤 경우에 사용하지?
1. State / Effect 차이
	- `useState` : UI에 반영할 데이터를 React 안에 보관
	- `useEffect` : React가 관리하는 데이터(state, props)가 변했을때, 외부에서 작업을 해야하는 경우 (side effect 관리)



---
# 내어보기

## JSX
- 자바스크립트와 HTML 태그를 섞어 사용하는 문법
	- 리액트 컴포넌트는 자바스크립트 함수로 생성
		- 이 함수는 HTML 값을 리턴
## `props`
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
 
## [[react-hooks|Hooks]]
- react의 상태 / life cycle을 관리하는 함수

## [[react-lifecycle|Life Cycle]]

## React Fiber
> JS의 single thread 단점을 보완하는 프레임워크 (렌더링 최적화)
> - 요소마다 우선순위가 있어서 요청에 따라 작업을 유연하게 처리
> 	- 화면이 부드럽게 보여지도록 함
- [📑 ref-blog : React가 0.016초마다 하는 일 (Feat. Fiber)](https://medium.com/stayfolio-tech/react%EA%B0%80-0-016%EC%B4%88%EB%A7%88%EB%8B%A4-%ED%95%98%EB%8A%94-%EC%9D%BC-feat-fiber-1b9c3839675a)

## Link vs Button 차이
- `Link` → href (e.g. `/api/auth/signout`) 주소로 **GET 요청**을 보내는 방식 
	- 브라우저가 직접 이동
- `Button` + NextAuth의 `signOut()` → JS 함수 호출을 통해 **API 요청 → 후처리**를 할 수 있음
	- 예: 로그아웃 후 리다이렉트, 알림 띄우기 등





