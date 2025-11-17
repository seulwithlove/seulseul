---
created: 2025-10-14T16:38
updated: 2025-11-17T12:42
---
#devlog #study #trouble-shooting #pdf #text-parse #nextjs 

# PDF Text parsing

> 진행중...
## 문제상황
- \<kniitter> 프로젝트에 필요한 pdf 도안 텍스트 파싱 과정에서 파싱된 텍스트가 순서대로(pdf상에서 위→아래 방향) 추출되지 않음

- 도안 원본(저작권 관련으로 일부 가림)![[linendale_topdown_net_knitwear3.jpg]]

- 파싱된 텍스트 ![[Screenshot 2025-11-09 at 17.56.23.png]]

---

- 사용한 라이브러리 : [pdf-parser](https://www.npmjs.com/package/pdf-parse), [pdf2json](https://www.npmjs.com/package/pdf2json)
	- 두 라이브러리의 추출 결과는 모두 동일함
		- *왜 뒤죽박죽되는거니...? 그것도 둘이 똑같이...?*

---

## 시도 1 - use python 
- [PyPDF2](https://pypdf2.readthedocs.io/en/3.x/) library
=> 동일한 결과

### 발견
- header, footer 없이 텍스트로만 구성된 'petitknit', 'caidree' 도안은 순서대로 추출됨
	- 바늘이야기' 도안은 header, footer, 이미지, 도표를 포함
👉 아마도 pdf 자체에서 텍스트 파싱을 방지하기 위한 처리가 되어있는게 아닐까 의심됨!

- 최대한 AI 사용 없이 텍스트 추출을 하려고 했기 때문에 '바늘이야기' 도안은 추후 OCR이나 LLM을 활용해 작업을 시도하고 영문 도안을 먼저 작업하기로 결정

## 시도 2 - 정규식 활용 영문 도안 텍스트 파싱 템플릿 제작
- 영문 도안은 패턴이 비슷함
- 

---

# 참고
- [PyPDF2 docs](https://pypdf2.readthedocs.io/en/3.x/user/extract-text.html)
- [blog](https://cyan91.tistory.com/entry/%ED%8C%8C%EC%9D%B4%EC%8D%AC%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-PDF-%ED%85%8D%EC%8A%A4%ED%8A%B8-%EC%B6%94%EC%B6%9C-PyPDF2-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%ED%99%9C%EC%9A%A9-%EA%B0%80%EC%9D%B4%EB%93%9C)

