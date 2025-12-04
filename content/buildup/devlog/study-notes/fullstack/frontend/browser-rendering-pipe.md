---
created: 2025-11-27T16:36
updated: 2025-12-04T15:54
---
# 브라우저 렌더링 파이프
> 브라우저가 웹 페이지를 화면에 표시하기 위해 거치는 과정
> - `HTML 다운로드 → 파싱 → 렌더 트리 구축 → 레이아웃 → 페인트 → 합성 → 화면 표시`
- Render tree는 DOM+CSSOM 결합
## 1. HTML 파싱 & DOM 트리 생성
- 브라우저가 HTML 바이트를 받아서 문자로 변환, 토큰화 -> 노드로 만들어서 DOM (Document Object Model)트리를 구축
```html
<html>
  <body>
    <div class="container">
      <p>Hello World</p>
    </div>
  </body>
</html>
```
- 이 코드가 트리 구조로 변환됨 : `html → body → div → p` 
- 👉 HTML파싱중 `<script>`태그를 만나면 파싱은 중단됨(Blocking Rendering) - JavaScript가 실행될때까지
	- `defer` `async`를 사용하는 이유
		- `<script src="main.js" defer></script>`
		- `<script src="main.js" async></script>`
			- **defer**: Loads the script in parallel and executes it after HTML parsing.
			- **async**: Loads and executes the script as soon as it’s downloaded.

## 2. CSS 파싱 & CSSOM 트리 생성
```css
.container { width: 100%; } p { color: blue; font-size: 16px; }
```
👉 CSS 파싱도 렌더링 차단 : 스타일 없이 화면 보여주면 깜빡임(FOUC)이 발생하기때문

## 3. JavaScript 실행 : V8 엔진 역할
- 이 시점에서 자바스크립트 엔진이 작동
```markdown
JS 코드 입력
  ↓ 파서(Parser) 
추상 구문 트리(AST)
  ↓ 인터프리터(Ignition) 
바이트코드 생성 & 실행
  ↓ 프로파일러 감시 
자주 실행되는 코드(Hot Code) 발견
  ↓ 최적화 컴파일러(TurboFan) 
최적화된 기계어 생성
  ↓ 
빠른 실행
```

## 4. Render Tree 구축
DOM + CSSOM 결합해서 실제로 화면에 표시할 요소만 포함된 렌더 트리를 만듬
- `display: none` 제외 - DOM에는 있지만 렌더트리에는 없음
- `visibility: hidden` 포함 - 공간은 차지하기때문에
- 각 노드에 계산된 스타일 정보가 포함됨

## 5. 레이아웃 Layout / Reflow
렌더 트리의 각 노드가 화면 어디에, 어떤 크기로 배치될지 계산
- 뷰포트 viewport 기준으로 정확한 위치, 크기를 픽셀 단위로 계산
- 비용이 큼
	- DOM을 조작하면 레이아웃이 다시 계산됨(reflow)
	- `offsetWidth` / `clientHieht` 속성을 읽으면 강제 동기 레이아웃 발생
```javascript
// 나쁜 예: 레이아웃 thrashing
for (let i = 0; i < 100; i++) {
  element.style.width = element.offsetWidth + 10 + 'px'; // 읽기-쓰기 반복
}

// 좋은 예: 한 번만 읽기
const width = element.offsetWidth;
for (let i = 0; i < 100; i++) {
  element.style.width = width + 10 * i + 'px';
}
```

## 6. 페인트 Paint
레이아웃 단계에서 계산된 정보를 바탕으로 실제 픽셀을 그림
- 텍스트, 생상, 이미지, 그림자, 테두리 등을 비트맵으로 변환
- 여러 레이어로 나뉘어 처리될 수 있음
- `z-index`,`transform`, `opacity` 등의 속성은 새로운 레이어 생성
	- 레이어가 너무 많으면 메모리 사용량이 증가함 : 주의!

## 7. 합성 Composite
여러 레이어를 순서대로 합쳐서 최종 화면 그림
- GPU 활용해서 처리 - 매우 빠름
- 성능 최적화 핵심 : `transform`, `opacity` 속성은 합성단계에서만 처리됨 => 에니메이션에 최적
```css
/* 느림: 레이아웃 → 페인트 → 합성 */
.box { left: 100px; }

/* 빠름: 합성만 */
.box { transform: translateX(100px); }
```

---
## 성능 최적화 방법
- CSS를 `<head>`에 배치 : 빠른 CSSOM 구축 
- JavaScript를 `<body>` 끝에 배치 / `defer` 사용
- 레이아웃 변경 최소화- 읽기/쓰기 분리 
- 합성 속성 활용 - `transform`, `opacity` 애니메이션 
- 리소스 압축 - minify, gzip 
- 코드 스플리팅 - 필요한 것만 로드

---
*참고자료: 
- [mdn-How browsers work](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work)
- LLM