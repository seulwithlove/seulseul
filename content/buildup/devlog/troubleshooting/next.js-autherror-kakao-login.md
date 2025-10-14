---
created: 2025-10-11T17:08
updated: 2025-10-14T17:03
---
#devlog #study  #nextjs #nextauth #trouble-shooting #sns-login #kakao #koe320

# `"error_code": "KOE320"`

```bash
[auth][details]: {
  "error": "invalid_grant",
  "error_description": "authorization code not found for code=FfIFJBf6vWgIBSttoQiAiGtQoP48uxGUpUnCFSH0ZQziEg2pp5NyvgAAAAQKDSBaAAABmVa-BC_MISgqRbFCUQ",
  "error_code": "KOE320",
  "provider": "kakao"
}
[TypeError: Failed to parse URL from http://localhost:3000sign/error?error=Configuration] {
  [cause]: [TypeError: Invalid URL] {
    code: 'ERR_INVALID_URL',
    input: 'http://localhost:3000sign/error?error=Configuration'
  }
}
 GET /api/auth/callback/kakao?code=FfIFJBf6vWgIBSttoQiAiGtQoP48uxGUpUnCFSH0ZQziEg2pp5NyvgAAAAQKDSBaAAABmVa-BC_MISgqRbFCUQ 500 in 201ms


```

---
# 상황
## Kakao developers 문서
- [카카오로그인 - 문제 해결](https://developers.kakao.com/docs/latest/ko/kakaologin/trouble-shooting#token)

| `KOE320`  <br>`invalid_grant` | 동일한 인가 코드를 두 번 이상 사용하거나, 이미 만료된 인가 코드를 사용한 경우, 혹은 인가 코드를 찾을 수 없는 경우  <br>  <br>**에러 메시지**: `authorization code not found for code=${AUTHORIZATION_CODE}` | 액세스 토큰 요청 시, 매번 새로운 인가 코드를 사용해야 합니다. 인가 코드를 다시 발급한 후, 새로 발급받은 인가 코드로 액세스 토큰을 요청합니다. |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
- {{insight2}}
- {{insight3}}
## 카카오 로그인 과정
- [카카오 로그인 REST API](https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#before-you-begin-process)


---
# 해결

- 
- {{question2}}

---

# 참고

- [kakao developers doc](https://developers.kakao.com/docs/latest/ko/kakaologin/trouble-shooting#token)
- {{reference2}}

---

# 찾아보기
{{additional-notes}}

