# SCS's Blog

<div align="center">
<img src="https://user-images.githubusercontent.com/110822847/229564131-388a385d-c880-4ab7-967d-d392a6dec03f.png" width="250">
</div>

## 프로젝트 정보

> **1인 개발** <br/> **개발기간: 2023.2.25 ~ 진행 중**

## 배포 주소

> **프론트 서버** : https://web-myblog-p8xrq2mlfsc6kg2.sel3.cloudtype.app/

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

- Context API나 Redux를 도입하여 전역 상태 관리를 통해 컴포넌트 간 상태 전달 및 관리를 보다 효과적으로 할 것입니다.
- API 요청 함수를 별도의 폴더로 분리하여 코드의 가독성과 유지보수성을 높일 것입니다.

이러한 계획을 실현함으로써 코드의 구조가 개선되고 전체 프로젝트의 품질이 향상될 것으로 기대합니다.

## 주요 기능 📦

### ⭐️ 게시글 작성

- 관리자 계정으로 로그인 했을 시에만 가능

### ⭐️ 댓글 작성

- 댓글과, 대댓글을 작성할 수 있다.

### ⭐️ 좋아요 기능

- 게시글에 종아요를 누를 수 있도록 추가했다.

## 디렉터리 구조

```
📦src
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
 ┃ ┃ ┣ 📜CommentEditForm.tsx
 ┃ ┃ ┣ 📜CommentItem.tsx
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂common
 ┃ ┃ ┣ 📜CategoryButton.tsx
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
 ┃ ┣ 📂RepliesButton
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂Reply
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜ReplyEdit.tsx
 ┃ ┃ ┗ 📜ReplyForm.tsx
 ┃ ┣ 📂Search
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┗ 📂Signup
 ┃ ┃ ┗ 📜SignupErr.tsx
 ┣ 📂config
 ┃ ┗ 📜index.ts
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
 ┃ ┣ 📜fetcher.ts
 ┃ ┗ 📜useInput.ts
 ┣ 📜.env
 ┣ 📜index.css
 ┣ 📜index.tsx
 ┣ 📜react-app-env.d.ts
 ┣ 📜setupProxy.js
 ┗ 📜setupTests.ts
```
