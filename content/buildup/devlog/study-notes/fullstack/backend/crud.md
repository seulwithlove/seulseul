---
created: 2025-12-02T09:36
updated: 2025-12-02T10:29
---
#dev #study #backend #crud
# CRUD 에서 중요한 포인트는 뭘까?
- 백엔드 관련 직무 면접에서는 CRUD를 할줄 아느냐는 질문이 기본이라고 한다.
- 처음에는 단순히 Create/Read/Update/Delete 작업을 말하는 거라고 생각했지만
	- 데이터베이스를 관리하는 작업에서 위 4가지 작업만으로 충분할지, 왜 중요한 포인트로 짚는지 궁금해졌다.

# CRUD에서 진짜 중요한 것들
## 1. 데이터 무결성 (Integrity)
- 데이터가 엉키지 않고 의도한 대로 유지되는 상태
- 잘못된 데이터가 들어가지 않는 것
- 🔑 중요 개념 : 타입, 제약 조건, FK
	- UPDATE/DELETE 할 때 어떤 조건(where)이 가장 중요할까?

> [!example] 예시 1. 데이터 수정 쿼리문에서:
> WHERE 조건 없이 `UPDATE users set name = 'A'` 하면:
> 	전체 유저가 'A'가 될수 있음
> - ORM 사용시 `eq`,`and`,`or` 조합을 잘못 쓰면 자주 발생함
>
>→ UPDATE/DELETE는 실행 전 결과를 SELECT로 검증!
>→ DB 차원에서 `id`는 UNIQUE로 설정
>→ 관리자 기능에서도 '진짜 삭제하시겠습니까?' 같은 확인 과정 추가


> [!example] 예시 2. INSERT 상황에서:
> ❌ NOT NULL 컬럼을 빠뜨리고 insert해서 500 에러<br>
> ❌ timestamp 컬럼에 string 넣어서 에러
>- 백엔드와 스키마가 불일치 하는 경우 발생
>
>→ Zod로 입력 검증!
>```ts
>const schema = z.object({
>	title: z.string().min(1),
>	userId: z.number()	
>});
>```


> [!example] 예시 3. DELETE 후에:
> 1. 유저를 삭제했더니 유저가 작성한 글(post)이 고아 데이터가 됨
> 2. 특정 테이블은 삭제가 막혀서 에러 발생
> - 외래키(FK) 제약 조건을 안 걸었거나
> - CASCADE / RESTRICT 옵션을 제대로 이해 못했기 때문
>   
>  → FK는 기본적으로 설정
>    - on delete cascade
>    - on delete restrict
>    - on delete set null
>
 > → 데이터 설계 단계에서 어떤 전략인지 명확히 결정
 > → 실무에서는 일반적으로: 
 > - 유저 탈퇴 시 posts는 soft-delete 처리
 > - 완전 삭제보다는 보관(archiving)



## 2. 트랜잭션 (Transaction)
- 여러 CRUD작업이 한 덩어리로 동작함 => '한 번에 성공 or 한 번에 실패'
	- e.g. 잔고이동 -> A에서 빠지고, B에 추가 : 둘 중 하나만 성공하면 안됨!
	
> [!example] 예시 4. 유저 가입시:
> 1. `users` table에 정보 저장
> 2. `welcome_log` table에 로그 저장
> 
> 둘 중 하나가 실패하면:
> 	→ 트랜잭션으로 묶어서 둘 다 성공하거나 둘 다 실패하도록 설정

## 3. 동시성 (Concurrency)
- 여러 사용자가 동시에 CRUD를 실행할수 있음 -> 충돌
	- e.g. 같은 게시글에 두 명이 동시에 '좋아요'를 누름 -> count가 꼬이지 않고 반영되어야함
	- 이 경우 누구의 변경이 살아있어야할까?
- 🔑 중요 개념 : Locking, transaction isolation
	- optimistic lock / pessimistic lock

> [!example] 예시 5. A, B가 동시에 같은 글을 편집:
> A가 먼저 저장: 성공<br>
> B가 뒤늦게 저장 : A의 변경 내용이 사라짐
> - 기본 CRUD는 '마지막에 저장한 사람 승리' 방식이라 충돌을 막지 못함
> 
> → 낙관적 lock(Optimistic Lock) 도입
> - updatedAt / version 컬럼 활용
> - 요청할 때 '내가 마지막으로 본 updatedAt'을 함께 보냄
> 	- `UPDATE ... WHERE id = ? AND updated_at = ?`
> - 불일치하면 충돌로 처리
> 	- '이미 다른 사용자가 수정했습니다. 내용을 다시 확인해주세요' 같은 UX 제공

## 4. 성능 (Performance)
- CRUD가 많아질수록 성능 문제 발생함
- 🔑  중요개념 : index 전략

> [!example] 예시 6. 성능 관련:
> ❌ 특정 페이지가 갑자기 느려짐<br>
> ❌ LIMIT 10인데도 로딩이 오래 걸림<br>
> ❌ N+1 문제로 쿼리가 100번 이상 날아감
> - WHERE, JOIN에 쓰는 컬럼에 인덱스가 없기 때문
> - ORM에서 relation을 잘못 써서 쿼리가 여러번 실행됨
> 
> → 자주 검색하거나 join하는 컬럼에 인덱스 추가
> ```sql
> CREATE INDEX idx_posts_user_id ON posts(user_id);
> ```
> → relation 대신 필요한 데이터만 select
> → React Query 에서 불필요한 refetch 방지


## 5. 보안 (Security)
- CRUD는 항상 **데이터 접근 권한**과 직결
- 아무나 DELETE를 못 하도록 해야함
	- e.g. login API 에서 `WHERE email = '${input}'` 쿼리를 쓴다면 큰일!
- 🔑  중요 개념 : SQL Injection, 권한 관리