# SCS's Blog

<div align="center">
<img src="https://user-images.githubusercontent.com/110822847/229564131-388a385d-c880-4ab7-967d-d392a6dec03f.png" width="250">
</div>

## 프로젝트 정보

> **1인 개발** <br/> **개발기간: 2023.2.25 ~ 진행 중**

## 배포 주소

> **배포 서버** : https://web-myblog-p8xrq2mlfsc6kg2.sel3.cloudtype.app/

## 개발자 소개

|                                                              성창수                                                              |
| :------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/110822847/229564340-070947f1-3f34-4cf4-b25f-ffe2d274be50.jpg" width="160px"> |
|                                              [@changsu](https://github.com/scs0209)                                              |
|                                                       순천향대 화학과 졸업                                                       |

## 리팩토링을 진행한 이유

- **UI/UX 개선**: 더 깔끔하고 직관적인 디자인과 사용성이 향상된 컴포넌트를 구현하기 위해
- **props drilling 문제 해결**: Context API나 Redux를 도입하여 전역 상태 관리를 통해 props drilling을 줄이기 위해(진행 전)
- **API 요청 함수의 분리**: 폴더 구조를 개선하여 API 요청과 관련된 함수들을 별도로 관리하기 위해(진행 전)

## 프로젝트 소개

myBlog는 개인 블로그용 웹 사이트입니다. 이 프로젝트는 React, TypeScript, swr을 사용하여 구현되었습니다.

## 시작 가이드

For building and running the application you need:

## Available Scripts

### Requirements

In the project directory, you can run:

- [Node.js 18.12.1](https://nodejs.org/ca/blog/release/v18.12.1/)
- [Npm 8.19.2](https://www.npmjs.com/package/npm/v/8.19.2)

### Installation

```
git clone https://github.com/scs0209/myBlog.git
cd myBlog
```

#### Frontend

```
cd myBlog
npm i
npm run start
```

## 데모

### UI 개선 전

![블로그 옛날](https://github.com/scs0209/myBlog/assets/110822847/0a95bf11-646c-4499-85e3-ed12b65443be)

### UI 개선 후

- 다크 모드 지원
- 반응형 디자인
- 그 외의 전체적인 UI/UX 개선
<div style="display: flex; height: 400px;">
  <img src="https://github.com/scs0209/myBlog/assets/110822847/51cc943b-3980-4eb0-979a-bcd05b90f291" alt="블로그 최신1" style="width: 50%; display:inline-block; margin-right: 15px;">
  
  <img src="https://github.com/scs0209/myBlog/assets/110822847/1c0a3771-67ab-4de9-a9e4-18c7c80fa026" alt="블로그 최신2" style="width: 50%; display:inline-block;">
</div>

## Stack🤡

### Technology Stack

- formatter : <img src="https://img.shields.io/badge/Eslint-blue" style="vertical-align: middle">, <img src="https://img.shields.io/badge/Prettier-pink" style="vertical-align: middle">
- API : <img src="https://img.shields.io/badge/Axios-yellow" style="vertical-align: middle">
- Style : <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=TailwindCSS&logoColor=white" style="vertical-align: middle">
- Data Fetching: <img src="https://img.shields.io/badge/SWR-black?logoColor=white" style="vertical-align: middle">
- Language: <img src="https://img.shields.io/badge/React-61DAFB?logo=React&logoColor=white" style="vertical-align: middle">, <img src="https://img.shields.io/badge/TypeScript-007ACC?logo=TypeScript&logoColor=white" style="vertical-align: middle">
- Database: <img src="https://img.shields.io/badge/MySQL-4479A1?logo=MySQL&logoColor=white" style="vertical-align: middle">
- ORM: <img src="https://img.shields.io/badge/Sequelize-52B0E7?logo=Sequelize&logoColor=white" style="vertical-align: middle">
- Package Manager: <img src="https://img.shields.io/badge/NPM-CB3837?logo=NPM&logoColor=white" style="vertical-align: middle">

### Development Environment

- IDE: <img src="https://img.shields.io/badge/Visual_Studio_Code-007ACC?logo=Visual%20Studio%20Code&logoColor=white" style="vertical-align: middle">
- Repository Hosting: <img src="https://img.shields.io/badge/GitHub-181717?logo=GitHub&logoColor=white" style="vertical-align: middle">
- Version Control: <img src="https://img.shields.io/badge/Git-F05032?logo=Git&logoColor=white" style="vertical-align: middle">

## 라이브러리 사용 이유

- autosize: 텍스트 입력 시 자동으로 textarea 크기를 조절하기 위해 사용
- tailwind: 빠르고 효율적인 CSS 작성을 도울 수 있는 유틸리티 클래스를 제공하기 위해 사용
- typescript: 정적 타입 검사를 해 코드의 안정성을 높이기 위해 사용
- husky: Git hooks를 쉽게 설정하여 코드 품질을 관리하기 위해 사용
- eslint: 코드 스타일과 구문 오류를 검사하여 일관된 코드베이스를 유지하기 위해 사용
- prettier: 코드 포맷팅을 자동화하여 일관된 스타일을 유지하기 위해 사용
- axios: HTTP 요청을 쉽게 처리하기 위해 사용
- swr: 데이터 패칭과 캐싱을 자동화하여 API 요청을 최적화하기 위해 사용

## 고려 사항

- 반응형 웹 디자인을 통해 다양한 화면 크기에 적용될 수 있는 UI/UX 구성.
- 최적화된 로딩 속도와 성능 보장
- 사용자 경험을 향상하는 인터랙션 설계

## 구현 시 어려웠던 점

- 각 컴포넌트 사이의 상태 전달 및 관리
- API 요청 처리 및 에러 대응
- 재사용 가능한 컴포넌트 구성 및 최적화

## 앞으로 개선할 계획

- Context API나 Redux를 도입하여 전역 상태 관리를 통해 컴포넌트 간 상태 전달 및 관리를 보다 효과적으로 할 것입니다. (완)
- API 요청 함수를 별도의 폴더로 분리하여 코드의 가독성과 유지보수성을 높일 것입니다. (완)

이러한 계획을 실현함으로써 코드의 구조가 개선되고 전체 프로젝트의 품질이 향상될 것으로 기대합니다.

## 리팩토링

### 리팩토링 기준

1. 기능별 컴포넌트 분리

- 기능별로 서로 다른 파일로 분리하여 개별 컴포넌트의 관심사와 책임을 명확히 구분합니다.

2. 중복 코드 제거

- 중복되는 코드를 발견하고, 이를 별도의 컴포넌트로 분리하여 코드 중복을 최소화합니다.

3. 코드 간 의존성 관리

- 코드를 분리하면서 서로간의 결합도를 낮게 유지하여 유연한 유지 보수가 가능하도록 설계합니다.

<details>
<summary>API 호출 함수 중앙화</summary>
<div markdown="1">      
 
- API 호출 함수를 중앙화하여 코드 중복을 최소화하고, 유지보수성을 향상시켰습니다.
- 이를 위해, axios 라이브러리를 사용하여 API 호출 함수를 작성하고, 이를 모듈화하여 중앙화하였습니다.

</div>
</details>
<details>
<summary>PostList 페이지 코드 분리</summary>
<div markdown="1">      
 
- PostList 페이지에서 페이지네이션과 검색 로직을 분리하여 검색 코드 구조와 가독성을 개선하였습니다.
- 이를 위해, 페이지네이션과 검색 로직을 각각 커스텀 훅으로 분리하였습니다.

</div>
</details>
<details>
<summary>SignUp 페이지 코드 분리</summary>
<div markdown="1">      
 
- SignUp 페이지에서 회원가입과 관련된 로직을 처리하는 useSignUp 커스텀 훅과 입력 상태를 관리하는 useInput 커스텀 훅을 생성하여 코드 구조와 가독성을 개선하였습니다.
- 이를 통해, 회원가입과 관련된 로직과 입력 상태를 각각 분리하여 코드 중복을 최소화하고, 유지보수성을 향상시켰습니다.

</div>
</details>
<details>
<summary>PostDetail 페이지 코드 분리</summary>
<div markdown="1">      
 
- PostDetail 페이지에서 삭제 로직을 커스텀 훅으로 분리하여 코드 구조와 가독성을 개선하였습니다.
- 이를 통해, 삭제 로직을 간단하게 사용할 수 있게 되었으며, 관심사의 분리 측면에서 코드를 분리하고 유지보수성을 향상시켰습니다.

</div>
</details>
<details>
<summary>LikeSection 컴포넌트 분리</summary>
<div markdown="1">      
 
- PostDetail 페이지에서 좋아요 상태 관리를 담당하는 로직을 useLikes 커스텀 훅으로 분리하여 코드 구조와 가독성을 개선하였습니다. <br>
이를 통해, 좋아요 기능과 관련된 모든 상태와 로직을 추상화하여 가독성과 유지보수성을 높였습니다.
- 또한 종아요 버튼을 누를 때 좋아요 상태를 바로 업데이트하고 서버에 API 호출을 하여 서버 데이터도 동기화하는 방식으로 구현하였습니다. 이를 통해, 좋아요 버튼을 누를 때 더욱 빠르게 상태가 업데이트되며, 사용자 경험을 향상시켰습니다.

</div>
</details>
<details>
<summary>LikeSection 컴포넌트 분리</summary>
<div markdown="1">      
 
- PostDetail 페이지에서 좋아요 상태 관리를 담당하는 로직을 useLikes 커스텀 훅으로 분리하여 코드 구조와 가독성을 개선하였습니다. <br>
이를 통해, 좋아요 기능과 관련된 모든 상태와 로직을 추상화하여 가독성과 유지보수성을 높였습니다.
- 또한 종아요 버튼을 누를 때 좋아요 상태를 바로 업데이트하고 서버에 API 호출을 하여 서버 데이터도 동기화하는 방식으로 구현하였습니다. 이를 통해, 좋아요 버튼을 누를 때 더욱 빠르게 상태가 업데이트되며, 사용자 경험을 향상시켰습니다.

</div>
</details>
<details>
<summary>ReplyComp, CommentItem 컴포넌트 중복제거</summary>
<div markdown="1">      
 
- CommentItem 컴포넌트와 ReplyComp 컴포넌트에서 중복되는 코드를 발견하고, 이를 별도의 컴포넌트인 UserDropDown 컴포넌트로 분리하였습니다.
- 이를 통해 재사용할 수 있는 컴포넌트와 코드 중복을 최소화하여, 유지보수성을 향상시켰습니다.

</div>
</details>

### 어려웠던 점과 고려 사항

1. 적절한 구조로 코드를 분리하는 가이드라인 찾기

- 코드를 직관적이고 재사용 가능한 방식으로 분리하기 위한 기준을 찾는 것이 중요합니다.

2. 각 파일 간의 의존성 관리

- 코드를 분리하면서 서로간의 결합도를 낮게 유지하여 유연한 유지 보수가 가능하도록 설계해야 합니다.

3. 유지 보수 시 장점

- 코드의 재사용성: 함수 및 로직을 분리함으로써 코드의 중복을 최소홯하고, 필요한 부분에서 쉽게 재사용 가능

4. Context API 성능 이슈

- Context API를 사용할 때 발생할 수 있는 성능 이슈가 있음

## 주요 기능 📦

### ⭐️ 게시글 CRUD

- 관리자 계정으로 로그인 했을 시에만 가능

### ⭐️ 댓글 CRUD

- 댓글과, 대댓글을 작성할 수 있다.

### ⭐️ 좋아요 기능

- 게시글에 종아요를 누를 수 있도록 추가했다.

### ⭐️ 게시글 검색 기능

- 게시글을 검색할 수 있는 검색창 구현

### ⭐️ 오늘 방문자 수와 총 방문자 수 카운트

### ⭐️ 소셜 로그인

## 디렉터리 구조

```
📦src
 ┣ 📂apis
 ┃ ┣ 📜auth.ts
 ┃ ┣ 📜comment.ts
 ┃ ┣ 📜index.ts
 ┃ ┣ 📜password.ts
 ┃ ┣ 📜post.ts
 ┃ ┣ 📜postList.ts
 ┃ ┣ 📜reply.ts
 ┃ ┗ 📜write.ts
 ┣ 📂Components
 ┃ ┣ 📂Category
 ┃ ┃ ┣ 📜EditButton.tsx
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜SideBar.tsx
 ┃ ┃ ┗ 📜Visitor.tsx
 ┃ ┣ 📂CategoryNameEdit
 ┃ ┃ ┣ 📜CategoryEditForm.tsx
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂CommentForm
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂CommentList
 ┃ ┃ ┣ 📜CommentContent.tsx
 ┃ ┃ ┣ 📜CommentEditForm.tsx
 ┃ ┃ ┣ 📜CommentItem.tsx
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂common
 ┃ ┃ ┣ 📜CategoryButton.tsx
 ┃ ┃ ┣ 📜DropDown.tsx
 ┃ ┃ ┣ 📜Footer.tsx
 ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┗ 📜HeadInfo.tsx
 ┃ ┣ 📂HomePage
 ┃ ┃ ┣ 📜Carousels.tsx
 ┃ ┃ ┣ 📜News.tsx
 ┃ ┃ ┗ 📜Popular.tsx
 ┃ ┣ 📂LikedButton
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂LogIn
 ┃ ┃ ┗ 📜SocialBtn.tsx
 ┃ ┣ 📂Modal
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂onCreateCategoryModal
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂PostDetail
 ┃ ┃ ┣ 📜CommentSection.tsx
 ┃ ┃ ┣ 📜LikeSection.tsx
 ┃ ┃ ┗ 📜PostInfo.tsx
 ┃ ┣ 📂PostSubmit
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂Profile
 ┃ ┃ ┣ 📜Left.tsx
 ┃ ┃ ┣ 📜Right.tsx
 ┃ ┃ ┗ 📜RightItem.tsx
 ┃ ┣ 📂ProfileModal
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂Reply
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜ReplyEdit.tsx
 ┃ ┃ ┣ 📜ReplyForm.tsx
 ┃ ┃ ┗ 📜ReplySection.tsx
 ┃ ┣ 📂Search
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┗ 📂Signup
 ┃ ┃ ┗ 📜SignupErr.tsx
 ┣ 📂config
 ┃ ┗ 📜index.ts
 ┣ 📂contexts
 ┃ ┣ 📜commentContext.tsx
 ┃ ┗ 📜repliesVisibilityContext.tsx
 ┣ 📂hooks
 ┃ ┣ 📂CategoryList
 ┃ ┃ ┣ 📜useCategoryList.ts
 ┃ ┃ ┗ 📜usePagination.ts
 ┃ ┣ 📂PostDetail
 ┃ ┃ ┣ 📜useDelete.ts
 ┃ ┃ ┣ 📜useEditComment.ts
 ┃ ┃ ┗ 📜useLikes.ts
 ┃ ┣ 📂PostList
 ┃ ┃ ┣ 📜usePagination.ts
 ┃ ┃ ┗ 📜usePost.ts
 ┃ ┣ 📜useLogin.ts
 ┃ ┣ 📜usePassword.ts
 ┃ ┗ 📜useSignUp.ts
 ┣ 📂images
 ┃ ┣ 📜banner.jpg
 ┃ ┣ 📜FilmFinder.PNG
 ┃ ┣ 📜my-blog.png
 ┃ ┣ 📜portfolio-next.PNG
 ┃ ┣ 📜shopfind.png
 ┃ ┣ 📜게시글 페이지.PNG
 ┃ ┣ 📜로그인 페이지.PNG
 ┃ ┣ 📜블로그 메인페이지.PNG
 ┃ ┣ 📜이력서사진.jpg
 ┃ ┣ 📜포트폴리오.PNG
 ┃ ┗ 📜회원가입 페이지.PNG
 ┣ 📂layouts
 ┃ ┣ 📂Main
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┗ 📜App.tsx
 ┣ 📂Pages
 ┃ ┣ 📂CategoryList
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂ChangePassword
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂FindId
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂FindPassword
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂HomePage
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂Login
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂MyPage
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂Post
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂PostDetail
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂PostEdit
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂PostList
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂Profile
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┗ 📂SignUp
 ┃ ┃ ┗ 📜index.tsx
 ┣ 📂styles
 ┃ ┣ 📜CategoryPost.module.css
 ┃ ┣ 📜ChangePassword.module.css
 ┃ ┣ 📜FindId.module.css
 ┃ ┣ 📜FindPassword.module.css
 ┃ ┣ 📜Login.module.css
 ┃ ┣ 📜PostDetail.module.css
 ┃ ┗ 📜SignUp.module.css
 ┣ 📂typings
 ┃ ┗ 📜db.ts
 ┣ 📂utils
 ┃ ┣ 📜dateUtil.ts
 ┃ ┣ 📜fetcher.ts
 ┃ ┗ 📜useInput.ts
 ┣ 📜index.css
 ┣ 📜index.tsx
 ┣ 📜react-app-env.d.ts
 ┣ 📜setupProxy.js
```

## ❤ git commit message 컨벤션

| 커밋 유형 | 의미                       |
| --------- | -------------------------- |
| feat      | 새로운 기능 추가           |
| fix       | 버그, 기능 수정            |
| Docs      | 문서 수정                  |
| style     | 스타일 코드 추가           |
| refactor  | 코드 리팩토링              |
| chore     | 기능과 관련 없는 내용 수정 |

---
