# Instaclone

Instaclone Backend.

## User

- [x] Create EAccount
- [x] See Profile
- [x] Login
- [x] Edit Profile
- [ ] Follow User
- [ ] UnFollow User
- [ ] Change Avatar

#### FILE UPLOAD

1. graphQL 클라이언트 사용

   - https://chrome.google.com/webstore/detail/altair-graphql-client/flnheeellpciglgpaodhkhmapeljopja/related

2. altair 는 보내기전에, type을 체크해줄 수 있음. playground보다 더 낫다

3. Promise 객체로 반환함. filename과 createReadStream 사용.

```javascript
Promise {
  {
    filename: 'KakaoTalk_20201118_011900654.jpg',
    mimetype: 'image/jpeg',
    encoding: '7bit',
    createReadStream: [Function: createReadStream]
  }
}
```

- node.js 버그 나는경우, node_modules 삭제

Stream 에 PIPE 연결하기. upload 폴더 만들기
file system import,

upload 폴더에 직접 url 로 접근하지 못하는 이유 라우터는 폴더가 존재하는지 모름.
apollo-server 대신에 apllo-server-express 사용.
express 위에 apollo server가 있도록 함.
`npm install apollo-server-express`
graphql url 에만 apollo server 생성.

Express Server를 만들고, Express Server를 Apollo server에 추가

에러
Error: Unknown type "Upload". Did you mean "Float"?
`npm i apollo-server-express@2.19` 설치

`npm install morgan`

playground polling : 주기적으로 request 전송

Uploads 폴더를 브라우저에 올리기

브라우저에서 사진을 못봄 -> 수정해야함.

db에 각자 이름 저장

#### Following and Unfollowing

self-referencing relationship

A.followers[User]
B.following[User]

user A를 user B의 following에다가 추가시키면, user B는 자동적으로 user A 의 followers에 나타나게 될 것임.

B가 A를 팔로워하고 싶을 때
A.followers[B] = 1
B.following[A] = 1
서로를 참조해야함.

self referencing : 같은 이름을 가져야함.
참고 : https://www.prisma.io/docs/concepts/components/prisma-schema/relations/self-relations#many-to-many-self-relations

```graphql
  followers User[]   @relation("FollowRelation")
  following User[]   @relation("FollowRelation")
```

graphQL로 follow/unfollow 진행
