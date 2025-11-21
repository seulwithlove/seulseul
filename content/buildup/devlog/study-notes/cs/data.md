---
created: 2025-10-14T16:38
updated: 2025-11-21T15:29
---
#devlog #study  #cs #data

# data

- [혼자 공부하는 컴퓨터 구조+운영체제](https://product.kyobobook.co.kr/detail/S000061584886?gt_network=g&gt_keyword=&gt_target_id=dsa-1974044871038&gt_campaign_id=9979905549&gt_adgroup_id=132556570510) 2장

---

# 내어보기

## 정보단위
- bit : 가장 작은 정보 단위
	- 0, 1
	- n bit : $2^n$가지 정보 표현
- 1 byte  = 8bit
- 1 KB(kilobyte) = 1000 byte
- 1 MB(megabyte) = 1000 KB
- 1 GB(gigabyte) = 1000 MB
- 1 TB(terabyte) = 1000 GB

- word : CPU가 한번에 처리할 수 있는 데이터 크기
- half word / full word / double word

## 진수
- 이진수 : 0b
	- 음수 표현방법 - 2의 보수 : 0, 1을 뒤집고 +1
- 16진수: 0x

## 인코딩 방법 : 컴퓨터가 이해할 수 있는 문자 표현법 
- 문자집합 character set : 컴퓨터가 인식하고 표현할 수 있는 문자 모음
- 문자 인코딩 encoding : 문자집합 문자를 0, 1로 변환하는 과정
- 문자 디코딩 decoding : 0, 1로 이루어진 문자 코드를 사람이 이해하는 문자로 변환하는 과정

### 아스키코드 ASCII(American Standard Code for Information Interchange)
- 아스키문자 = 영어 알파벳 + 아라비아 숫자 + 일부 특수문자
	- 초창기 문자 집합 중 하나
	- 문자는 각 7비트로 표현됨 : $2^7$=128개 문자
- 아스키 코드 : 아스키 문자에 대응된 고유한 수
	- 이 값을 이진법/16진법으로 나타냄
	- "아스키 문자는 아스키 코드로 인코딩 된다!"

### EUC-KR
- 한국 포함 비영어권 국가의 문자집합 인코딩 방식
	- 완성현 인코딩 & 조합형 인코딩
- 조합형 인코딩 : <초성+중성+종성> 2바이트 코드 부여
- 한글 한 글자에 2byte=16bit
- 2,350개 한글 단어 표현 가능 but, 문자집합에 포함되지 않은 단어 있음
### 유니코드
- 여러 나라 문자를 광범위하게 표현할수 있는 통일된 문자 집합
- 인코딩 방식 : UTF-8, UTF-16, UTF-32
![[Screenshot 2025-11-21 at 15.29.14.png]]
---
# 의문갖기

- {{question1}}
- {{question2}}

---

# 참고하기

- {{reference1}}
- {{reference2}}

---

# 찾아보기
{{additional-notes}}

