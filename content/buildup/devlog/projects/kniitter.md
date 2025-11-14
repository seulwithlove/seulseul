---
created: 2025-10-14T16:08
updated: 2025-11-14T16:49
---
#devlog #project  #nextjs  #react-native #application 

# kniitter
> Next.js(App Router) + React Native 기반 **풀스택 프로젝트**
- 청년취업사관학교 SeSAC 프로젝트
	- 2025. 10. 12 ~ 11. 13 (1차)
	- 수업내용 기반 바이브코딩(Cursor)

## 뜨개 도안 리더 어플리케이션
- 서술형 뜨개 도안을 작업하기 편리한 형식으로 변환하는 도안 리더기

[🔗 github repository ](https://github.com/seulwithlove/kniitter)
### 문제점
- 기존 대바늘 뜨개 도안은 서술형 설명이 나열되어 있음
- 뜨개인 친화적이지 않아 코수를 헷갈리기 쉽고, 도안을 읽는게 어려움
- 예) 
	- 사이즈 표기 : `S (M) L (XL) `
	- 사이즈별 코수 구분 : `10 (15) 20 (25)` 

### 개선점
- 서술형 내용을 작업 내용을 구분하기 쉽도록 `체크박스 + 작업내용` 형식으로 변환
- 사용자가 사이즈를 선택하면 해당 사이즈에 해당하는 코수만 도안에 표기

## 앱 플로우
[![](https://mermaid.ink/img/pako:eNp1lMuO2jAUhl_F8qKaSiki4ZKQxUgjaKVRi1QVsRmxsZxDsHBs13Y6zCDevccxTCMoWSS2z-f_3OwcKdcV0JI6-N2C4rAQrLas2SiCD-NeW7J2YAlz3TeuG2a94MIw5cmTMcH4XQnvkcPpLfOT2bNGHN0SK3TEagjID82ZvCxEMr6D_y-Pj-ihJE-cg3OEXbzhIpoCUZLVTr-S1kjNKuK4BVD3VNYRMiyErshWSOjLxWBREFTVM8blnv3rwVssFfFw8ORTyMtdo527X-BbdOPEOxApnL8NfSGckewtIg4kcC-0IuvnexmsOibyDzCoBwlZfu7rdtQ3IUNvPvLEpnY7ln3yXHHUZH96zu8HyVvndYM6HxXsRym1NmTRWqHqeDhwEC3XOcx3wPfEeTD_7P8LiZ855uEajDpM8lailRira4vn4xqL8a9NFaD1M3m4gAnKWrEHv7O6rXfnCmLb79V9rhsjAVVetd3fOYI8MqGBSnuxFZyFCU1obUVFS29bSGgDtmFhSo9BZ0P9DhrY0BKHFUNxulEn3IPX5EXr5rKti_MyabuMzleXllsmXUAwfrBz3SpPy3wy7TRoeaQHWo5mgzTN8nE-GhbjYphmCX2jZTodpKNskubDySwdp8X4lND3zulwUBTTLMvyfJZPhkU2ThMKlcD-LOP_o_uNnP4CFZJheQ?type=png)](https://mermaid.live/edit#pako:eNp1lMuO2jAUhl_F8qKaSiki4ZKQxUgjaKVRi1QVsRmxsZxDsHBs13Y6zCDevccxTCMoWSS2z-f_3OwcKdcV0JI6-N2C4rAQrLas2SiCD-NeW7J2YAlz3TeuG2a94MIw5cmTMcH4XQnvkcPpLfOT2bNGHN0SK3TEagjID82ZvCxEMr6D_y-Pj-ihJE-cg3OEXbzhIpoCUZLVTr-S1kjNKuK4BVD3VNYRMiyErshWSOjLxWBREFTVM8blnv3rwVssFfFw8ORTyMtdo527X-BbdOPEOxApnL8NfSGckewtIg4kcC-0IuvnexmsOibyDzCoBwlZfu7rdtQ3IUNvPvLEpnY7ln3yXHHUZH96zu8HyVvndYM6HxXsRym1NmTRWqHqeDhwEC3XOcx3wPfEeTD_7P8LiZ855uEajDpM8lailRira4vn4xqL8a9NFaD1M3m4gAnKWrEHv7O6rXfnCmLb79V9rhsjAVVetd3fOYI8MqGBSnuxFZyFCU1obUVFS29bSGgDtmFhSo9BZ0P9DhrY0BKHFUNxulEn3IPX5EXr5rKti_MyabuMzleXllsmXUAwfrBz3SpPy3wy7TRoeaQHWo5mgzTN8nE-GhbjYphmCX2jZTodpKNskubDySwdp8X4lND3zulwUBTTLMvyfJZPhkU2ThMKlcD-LOP_o_uNnP4CFZJheQ)


---
## Troubleshooting
- [[Text parsing]]

---
## 회고
> 프로젝트 1차 완료를 마치고...

### 프로젝트 발표회 피드백
-  AI agent 사용할땐 input, output, fallback 로직까지 고려하고 프롬프트를 작성하면 좋은 결과를 얻을수 있음
- DRM **Digital Rights Management** : 드래그, 스크랩,캡처 방지

### KPT 🟢🔸🔷
#### Keep 🟢
- 기간내에 구현해야할 기능을 정리하고 차례대로 구현함
-  서버/클라이언트 컴포넌트를 분리해서 최대한 페이지 전체의 Client Side Rendering을 방지하려고 고민해봄

### Problem 🔸
- 개발계획을 너무 여유있게 잡고 늦게 시작
- 마감일이 다가오니 공부한 내용을 바탕으로 직접 코드를 짜기보다 바이브코딩으로 기능을 빨리 구현하고 디버깅하는 데에 집중하게 됨
- 작은 기능 하나에 매몰되어 전체 우선순위를 잊고 작업함 

### Try 🔷
- AI코드 결과물 작동여부만 확인하는게 아니라 로직을 이해하고 사용하기
- HTTP 통신상에서 전송되는 데이터를 보호하는 방법을 고민하고 적용