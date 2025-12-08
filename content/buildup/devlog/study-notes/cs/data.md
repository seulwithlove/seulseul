---
created: 2025-10-14T16:38
updated: 2025-12-06T11:51
---
#devlog #study  #cs #data

# 데이터 data
- [혼자 공부하는 컴퓨터 구조+운영체제-강민철](https://product.kyobobook.co.kr/detail/S000061584886?gt_network=g&gt_keyword=&gt_target_id=dsa-1974044871038&gt_campaign_id=9979905549&gt_adgroup_id=132556570510)
	- *첨부 이미지 출처 : 책*
- 스터니 내용

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
- 2진수 : 0b
	- 음수 표현방법 - 2의 보수 : 0, 1을 뒤집고 +1
- 16진수: 0x
	- 2진수와 변환이 간편해서 자주 사용 : $2^4=16$
	- HEX code
- 2진수 → 16진수 : 뒤에서 4자리씩 쪼개서 각 값을 16진수로 변환
	- $1011 1101_{(2)}$ → 1011 1101 → $bd$

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
- 2,350개 한글 단어 표현 가능 
	- but, 문자집합에 포함되지 않은 단어 있음
		- e.g. '뷁'

### 유니코드
![[Screenshot 2025-12-06 at 11.47.12.png]]
- 여러 나라 문자를 광범위하게 표현할수 있는 통일된 문자 집합
- 인코딩 방식 : UTF-8, UTF-16, UTF-32
![[Screenshot 2025-11-21 at 15.29.14.png]]

####  [endianness](https://developer.mozilla.org/en-US/docs/Glossary/Endianness
- UTF-16의 문제를 해결하기 위해 등장한 개념
	- 바이트를 2개를 씀
		- 한글/영어 모두 2바이트로 처리
- 어떤 순서대로 읽을것인가?
- Big-endian 
	- **Order**: The most significant byte (the "big end") comes first, followed by bytes of decreasing significance.
	- **Analogy**: This is like how humans typically read and write numbers, from left to right 
	- **Example**: A four-byte number would be stored in memory addresses as `12 34 56 78`.
	- **Use case**: Many network protocols, such as TCP/IP, use big-endian, also known as network byte order. 
- Little-endian
	- **Order**: The least significant byte (the "little end") comes first, followed by bytes of increasing significance.
	- **Analogy**: This is similar to how a postal address is written in some places, where the house number comes before the street and city.
	- **Example**: A four-byte number would be stored in memory addresses as `78 56 34 12`.
	- **Use case**: Most personal computers, like those using Intel x86 architecture, use little-endian.


---
# 의문갖기

- 보안에서의 인코딩 / 디코딩 은 `문자 인코딩/디코딩`과 다름!
	- 보안에서의 개념은 오히려 `암호화 / 복구화`
- 

---

# 참고하기

- UTF-8 한글은 3바이트 but, 이모티콘은 4바이트
	- 만약 DB에서는 충돌!
		- mySQL 4.0이하 버전에서 특히 자주!
			- 바이트 값에 따라 DB를 분리함
- 결합형 이모지 : byte가 결합함!

---

# 찾아보기
{{additional-notes}}

