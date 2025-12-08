---
created: 2025-10-14T16:38
updated: 2025-12-06T11:33
---
#devlog #study #cs  #computer-archtecture

# 컴퓨터 구조
- [혼자 공부하는 컴퓨터 구조+운영체제-강민철](https://product.kyobobook.co.kr/detail/S000061584886?gt_network=g&gt_keyword=&gt_target_id=dsa-1974044871038&gt_campaign_id=9979905549&gt_adgroup_id=132556570510)
	- *첨부 이미지 출처 : 책*
---

# 내어보기

- **컴퓨터 구조 지식**은 
	- '미지의 대상' 을 '분석의 대상'으로 만들게 함
- 프로그램을 위한 최적의 컴퓨터 환경을 만들기
- **성능-용량-비용**과 직결!
## 컴퓨터 구조
### 1. 컴퓨터가 이해하는 정보
- 방법 : 0, 1
- 내용 
	- 데이터 data : 명령어를 위해 존재하는 일종의 재료
	- ✨명령어 : 컴퓨터를 실질적으로 작동시키는 더 중요한 정보
- 
### 2. 컴퓨터의 네 가지 핵심 부품

#### 1) 중앙처리장치 CPU ; Central Processing Unit
- ALU ; Arithmetic Logic Unit 산술논리연산장치
	- 계산기
- register 레지스터
	- CPU 내부의 **임시 저장**장치
		- 프로그램 실행에 필요한 값을 임시로 저장
	- 여러 종류가 있음

- CU ; Control Unit 제어장치
	- **제어신호 control signal를 내보내고** 
		- 저장된 데이터(값)를 읽고싶으면 : 메모리 읽기
		- 값을 저장하고 싶으면 : 메모리 쓰기
	- **명령어를 해석**
#### 2) 주기억장치 main memory
- RAM(Random Access Memory) 👈 이걸 "메모리" 라고 부름
	- 프로그램이 실행되려면 반드시 메모리에 저장되어있어야함
	- **현재 실행되는** 프로그램의 명령어와 데이터를 저장
	- 메모리에 저장된 값의 위치는 "주소"로 접근
- ROM(Read Only Memory)
- 약점
	- 가격이 비싸서 용량이 적음
	- 전원이 꺼지면 저장된 내용을 읽음
#### 3) 보조기억장치 secondary storage
- 메모리보다 크기가 크고 전원이 꺼져도 저장된 내용을 잃지 않음
- 보관할 프로그램을 저장
- 하드디스크, SSD, USB, DVD, CD-ROM
#### 4) 입출력장치 Input/Output device
- 컴퓨터 외부 - 내부 사이에서 정보를 교환하는 장치
![[Pasted image 20251117215449.png]]

#### 시스템 버스 system bus
- 컴퓨터 내부의 핵심 부품 4개를 연결하는 통로![[Screenshot 2025-12-06 at 10.58.47.png]]
- 주소버스 address bus
	- 단방향
- 데이터 버스 data bus
	- 양방향 : 읽고 쓰기 가능
- 제어 버스 control bus : 제어장치가 제어신호를 보내는 통로
	- 양방향 : 읽고 쓰기 가능

---
# 의문갖기
- 데이터 주소가 변경되면 데이터 흐름은 어떻게 될까?


---

# 참고하기

- {{reference1}}
- {{reference2}}

---

# 찾아보기
{{additional-notes}}

