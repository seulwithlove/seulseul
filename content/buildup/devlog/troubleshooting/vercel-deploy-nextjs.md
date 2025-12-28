---
created: 2025-12-28T22:16
updated: 2025-12-28T22:51
---
#dev #study #trouble-shooting #nextjs #vercel #postgresql

# Vercel로 프로젝트 배포 중 생긴 에러상황들

## 배경
- Next.js Kniitter 프로젝트를 Vercel에 배포하려다가 여러 문제에 부딪힘
	- 패키지 호환성
	- develop 브랜치 기반
	- Prisma + MySQL 구조

---

## 문제 1: Canvas 패키지 빌드 실패

### 에러
```
gyp ERR! configure error
canvas install: Failed to execute node-gyp
```

### 원인
- canvas 패키지는 네이티브 의존성(Cairo, Pango)이 필요함
- but Vercel의 서버리스 환경에는 이런 라이브러리가 없음

### 해결
1. canvas를 사용하는지 확인
  ```
   pnpm why canvas
  ```

2. 완전히 제거
  ```
   pnpm remove canvas
   rm -rf node_modules pnpm-lock.yaml
   pnpm install
  ```
 
3. 커밋 & 푸시

---

## 문제 2: 이전 커밋으로 배포됨

### 원인
Vercel의 Production Branch가 main으로 설정되어 있는데, 실제로는 develop 브랜치를 메인으로 사용 중임

### 해결
- Vercel 대시보드 → Settings → Git → Production Branch를 `main`에서 `develop`으로 변경

---

## 문제 3: 로컬 DB 사용 불가

### 원인
`mysql://127.0.0.1:3312\` 같은 로컬 주소는 Vercel 서버에서 접근 불가능

### 해결
- 클라우드 DB로 전환
	- Vercel의 Prisma Postgres 무료버전 사용
- Vercel 에서 자동 생성된 환경 변수 사용

---

## 참고 링크
- [Vercel 공식 문서](https://vercel.com/docs/deployments/troubleshoot-a-build)
- [Prisma 마이그레이션 가이드](https://vercel.com/docs/postgres)