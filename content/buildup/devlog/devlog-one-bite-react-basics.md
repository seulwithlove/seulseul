#devlog #study #react

# React study notes

- [한 입 크기로 잘라먹는 리액트](https://reactjs.winterlood.com/)
	- 인프런 강의와 책 읽고 정리

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

---
## 의문갖기

- {{question1}}
- {{question2}}

---

## 참고하기

- {{reference1}}
- {{reference2}}

---

## 찾아보기
- 

## 액션아이템

- [ ] TodoList
- [ ] {{action3}}

