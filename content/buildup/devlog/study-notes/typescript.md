---
created: 2025-10-17T21:40
updated: 2025-10-18T13:53
---
#devlog #study  #typescript #{{category}}

# TypeScript 📝

- [{{source}}](https://claude.ai/chat/%7B%7Blink%7D%7D)
- 새싹 풀스택 과정
	- 강의 듣고 정리
	- *LLM 활용 내용 보충*

---

# 내어보기

## [Zod](https://zod.dev/)
- TypeScript-first schema validation

### `z.treeifyError()`
- ZodError는 배열 형태를 띰
	- 이를 객체 타입 에러로 변환하는 method
```ts

z.string("Not a string!").parse(12);
// =>
❌ throws ZodError {
   issues: [
     {
       expected: 'string',
       code: 'invalid_type',
       path: [],
       message: 'Not a string!'   <-- 👀 custom error message
     }
   ]
 }

const tree = z.treeifyError(result.error);
// =>
{
  errors: [ 'Unrecognized key: "extraKey"' ],
  properties: {
    username: { errors: [ 'Invalid input: expected string, received number' ] },
    favoriteNumbers: {
      errors: [],
      items: [
        undefined,
        {
          errors: [ 'Invalid input: expected number, received string' ]
        }
      ]
    }
  }
}
```

### ZodSafeParseResult
- ZodSafeParseResult in Zod (v4) is a type used with the safeParse and safeParseAsync methods. It represents the result of parsing data with a schema, capturing either the parsed data (on <font color="#ffc000">success</font>) or <font color="#ffc000">error </font>details (on failure).
![[Screenshot 2025-10-17 at 22.00.30.png]]
- success / error 구조
	- error: unknown 타입![[Screenshot 2025-10-17 at 22.01.40.png]]

### 💡 typecheck 힌트용 코드
```ts
export const validateAsync = async <T extends z.ZodObject>(
  zobj: T,
  obj: FormData | Record<string, FormDataEntryValue | string | unknown>,
): Promise<[ValidError] | [undefined, z.core.output<T>]> => {
  try {
    // ...
  } catch (e) {
    // ...
  }
};
```
#### `FormDataEntryValue | string | unknown` 의미
> *"이 자리에 어떤 형태의 데이터가 올수 있는지"* 에 대한 힌트를 남기는 장치
- `FormDataEntryValue` : 브라우저 `FormData` 객체가 반환하는 실제 값의 타입(`string | File`)
- `string` : server side에서 일반 문자열 형태로 받을수도 있음
- `unknown` : 아직 명확히 정해지지 않은 타입
	- 외부에서 어떤 값이 들어올수도 있다는 가능성을 열어둠
이렇게 여러 타입을 작성해두면, <br>
*"이 값은 최소한 `FormDataEntryValue`, `string`, 혹은 그 밖의 어떤 값(unknown)일수 있다"* 는 의도를 명시하게 됨

- `unknown`하나만 남겨둔다면,
	- *"이 자리에 어떤 데이터가 올수 있는지"*에 대한 구체적인 힌트가 완전히 사라짐
	- `청소년 | 청년 | 사람` 이라고 적는 것과 마찬가지이지만, 코드 해석시 더 많은 정보를 제공할수 있음
---
# 의문갖기



---

# 찾아보기
- [ ] 