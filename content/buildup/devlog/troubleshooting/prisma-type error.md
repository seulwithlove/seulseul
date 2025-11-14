---
created: 2025-10-14T16:38
updated: 2025-11-14T16:52
---
#devlog #study #trouble-shooting  #prisma #orm #database #type-inference

# Type error : `delete` vs `deleteMany`
### Problem
![[Screenshot 2025-10-28 at 18.39.17.png]]
![[Screenshot 2025-10-28 at 18.39.28.png]]
- `delete`를 사용해야하는데 타입에러를 없애기 위해서는 `deleteMany`를 사용해야함
### Situation
![[Screenshot 2025-10-28 at 18.39.50.png]]

### Solution
> `mark_member` 라는 새로 생기는 unique 변수를 사용!
![[Screenshot 2025-10-28 at 18.44.38.png]]
- ORM에서는 자동으로 이 변수가 생김

