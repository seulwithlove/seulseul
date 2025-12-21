---
created: 2025-12-11T13:53
updated: 2025-12-19T15:11
---
#study #devlog #cs #cpu 

# CPU 작동원리
- [혼자 공부하는 컴퓨터 구조+운영체제-강민철](https://product.kyobobook.co.kr/detail/S000061584886?gt_network=g&gt_keyword=&gt_target_id=dsa-1974044871038&gt_campaign_id=9979905549&gt_adgroup_id=132556570510)
	- *첨부 이미지 출처 : 책*
---
# 내어보기
## CPU 구성요소
- ALU
- 제어장치
- 레지스터

## 레지스터
- **프로그램 카운터 PC: Program Counter**
	- 메모리에서 가져올 **명령어 주소**
	- 명령어 포인터
- **명령어 레지스터 IR: Instruction Register**
	- 해석할 명령어, **메모리에서 읽은 명령어를 저장**하는 레지스터
- **메모리 주소 레지스터 MAR: Memory Address Register**
	- 메모리 주소를 저장하는 레지스터
		- CPU가 읽으려고하는 주소값을 주소버스로 보낼때 이 레지스터를 거침
- **메모리 버퍼 레지스터 MBR: Memory Buffer Register**
	- 메모리와 주고받을 값(데이터, 명령어) 저장하는 레지스터