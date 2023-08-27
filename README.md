# SCS's Blog

<div align="center">
<img src="https://user-images.githubusercontent.com/110822847/229564131-388a385d-c880-4ab7-967d-d392a6dec03f.png" width="250">
</div>

## 목차

<!-- TOC -->

- [SCS's Blog](#scss-blog)
  - [목차](#목차)
  - [프로젝트 정보](#프로젝트-정보)
  - [배포 주소](#배포-주소)
  - [개발자 소개](#개발자-소개)
  - [리팩토링을 진행한 이유](#리팩토링을-진행한-이유)
  - [프로젝트 소개](#프로젝트-소개)
  - [시작 가이드](#시작-가이드)
  - [Available Scripts](#available-scripts)
    - [Requirements](#requirements)
    - [Installation](#installation)
      - [Frontend](#frontend)
  - [데모](#데모)
    - [UI 개선 전](#ui-개선-전)
    - [UI 개선 후](#ui-개선-후)
  - [Stack🤡](#stack)
    - [Technology Stack](#technology-stack)
    - [Development Environment](#development-environment)
  - [라이브러리 사용 이유](#라이브러리-사용-이유)
  - [프로젝트 설명](#프로젝트-설명)
    - [API 정리 문서](#api-정리-문서)
  - [디렉토리 구조](#디렉토리-구조)
  - [❤ git commit message 컨벤션](#-git-commit-message-컨벤션)

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
- emotion => Tailwind CSS로 변경
<div style="display: flex; height: 400px;">
  <img src="https://github.com/scs0209/myBlog/assets/110822847/51cc943b-3980-4eb0-979a-bcd05b90f291" alt="블로그 최신1" style="width: 50%; display:inline-block; margin-right: 15px;">
  
  <img src="https://github.com/scs0209/myBlog/assets/110822847/1c0a3771-67ab-4de9-a9e4-18c7c80fa026" alt="블로그 최신2" style="width: 50%; display:inline-block;">
</div>

## Stack🤡

### Technology Stack

- formatter : <img src="https://img.shields.io/badge/Eslint-blue?logo=eslint" style="vertical-align: middle">, <img src="https://img.shields.io/badge/Prettier-21323a?logo=prettier" style="vertical-align: middle">
- Git hooks: <img src="https://img.shields.io/badge/Husky-gray?logo=Husky&logoColor=white" style="vertical-align: middle">
- API : <img src="https://img.shields.io/badge/Axios-yellow?logo=axios" style="vertical-align: middle">
- Style : <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=TailwindCSS&logoColor=white" style="vertical-align: middle">
- State Management: <img src="https://img.shields.io/badge/zustand-black?logo=zustand&logoColor=white" style="vertical-align: middle">
- Data Fetching: <img src="https://img.shields.io/badge/react--query-beige?logo=react-query" style="vertical-align: middle">
- Language: <img src="https://img.shields.io/badge/React-61DAFB?logo=React&logoColor=white" style="vertical-align: middle">, <img src="https://img.shields.io/badge/TypeScript-007ACC?logo=TypeScript&logoColor=white" style="vertical-align: middle">
- Database: <img src="https://img.shields.io/badge/MySQL-4479A1?logo=MySQL&logoColor=white" style="vertical-align: middle">
- ORM: <img src="https://img.shields.io/badge/Sequelize-52B0E7?logo=Sequelize&logoColor=white" style="vertical-align: middle">
- Package Manager: <img src="https://img.shields.io/badge/NPM-CB3837?logo=NPM&logoColor=white" style="vertical-align: middle">

### Development Environment

- IDE: <img src="https://img.shields.io/badge/Visual_Studio_Code-007ACC?logo=Visual%20Studio%20Code&logoColor=white" style="vertical-align: middle">
- Repository Hosting: <img src="https://img.shields.io/badge/GitHub-181717?logo=GitHub&logoColor=white" style="vertical-align: middle">
- Version Control: <img src="https://img.shields.io/badge/Git-F05032?logo=Git&logoColor=white" style="vertical-align: middle">

## 라이브러리 사용 이유

- **autosize**: 텍스트 입력 시 자동으로 textarea 크기를 조절하기 위해 사용
- **Tailwind CSS**: 빠르고 효율적인 CSS 작성을 도울 수 있는 유틸리티 클래스를 제공하기 위해 사용
- **Typescript**: 정적 타입 검사를 해 코드의 안정성을 높이기 위해 사용
- **Husky**: Git hooks를 쉽게 설정하여 코드 품질을 관리하기 위해 사용
- **ESLint**: 코드 스타일과 구문 오류를 검사하여 일관된 코드베이스를 유지하기 위해 사용
- **Prettier**: 코드 포맷팅을 자동화하여 일관된 스타일을 유지하기 위해 사용
- **Axios**: HTTP 요청을 쉽게 처리하기 위해 사용
- **React Query**: 데이터 패칭, 캐싱, 동기화, 자동 리소스 관리 등의 기능을 제공하여 API 요청 최적화를 위해 사용. 또한 데이터 동기화 및 백그라운드 업데이트를 할 수 있으며, 에러 및 로딩 상태 처리가 용이
- **react-hook-form**: 비제어 컴포넌트의 장점은 그대로 살리면서 제어 컴포넌트에서만 다룰 수 있는 실시간 유효성 검사, 실시간 동기화 등의 API를 제공함. 또 리렌더링을 최소화시켜 마운팅 속도를 높여줌
- **Zustand**:
  - 간단하고 가볍게 상태 관리할 수 있도록 하는 작은 상태 관리 라이브러리.
  - Redux Toolkit을 사용한 경험이 있었는데, 이번 프로젝트에서는 Zustand를 사용하여 두 라이브러리의 차이와 각각의 장단점을 비교해보기 위해 선택.
  - Redux와 같은 복잡한 설정 없이도 전역 상태 관리가 가능하며 컴포넌트 간에 상태 공유가 용이.

## 프로젝트 설명

### [API 정리 문서](https://github.com/scs0209/myBlog/blob/master/API.md)

1. 로그인, 회원가입

- `react-hook-form`을 사용하여 유효성 검사 및 불필요한 리렌더링 최소화
- 소셜 로그인 구현
  ![로그인, 회원가입](https://github.com/scs0209/myBlog/assets/110822847/950e6e63-7d88-4a83-9072-9281fc44804f)

2. 게시글 작성

- `react-md-editor`를 사용하여 리액트에 최적화된 마크다운 에디터 사용
- 관리자 계정인 경우에만 사용가능하게 함
- 일반적으로 회원가입하면 무조건 일반 계정

  ![게시글 작성](https://github.com/scs0209/myBlog/assets/110822847/9f48eb69-cfd7-4bf3-99c7-315cc52b6cee)

  일반 계정

    <img src="https://github.com/scs0209/myBlog/assets/110822847/afd0ff8a-4aa9-4a55-b51f-ec7efebd304c" width="200">

  관리자 계정
  </br>
  <img src="https://github.com/scs0209/myBlog/assets/110822847/79703388-e93b-4a5c-a0e4-804d77adf0f4" width="200">

1. 게시글에 좋아요 기능

- 낙관적 업데이트를 통하여 서버 응답을 기다리기 전에 미리 실시간으로 좋아요가 눌러지게 함
- 토글 형식으로 해제도 가능
  ![좋아요](https://github.com/scs0209/myBlog/assets/110822847/d864f0de-35f5-456c-8608-32a34ad25b4a)

4. 계정 탈퇴 기능

- WithDrawl 버튼을 클릭하면 계정 탈퇴
- 계정 탈퇴하면 다시 로그인 불가능
  ![회원탈퇴](https://github.com/scs0209/myBlog/assets/110822847/0a9db620-1953-462d-9099-ff8693c9025a)

5. 댓글 CRUD

- 로그인하지 않으면 댓글 작성 불가, 로그인하라는 경고문이 뜸
- 내가 작성한 댓글만 수정과 삭제 가능
  ![댓글 생성, 수정, 삭제](https://github.com/scs0209/myBlog/assets/110822847/9b2d7f89-2d76-444e-a28b-ebccad478d2b)

6. 답글 CRUD

- 댓글과 모든 기능이 동일
  ![답글 생성, 수정, 삭제](https://github.com/scs0209/myBlog/assets/110822847/048b9311-bd8e-4953-85b6-26528da11601)

7. 오늘 방문자 수 및 총 방문자 수 추가

- 쿠키를 통한 방문자 수 추정
- 방문자 데이터 베이스 모델에서 총 방문자 수 가져와서 총 방문자 수 표시

  <img src="https://github.com/scs0209/myBlog/assets/110822847/904300cb-317a-45f9-94be-ee2ff7d3ecfc" width="200" height="300">

8. 게시글 검색 기능

   - 게시글을 검색하면 해당 게시글을 표시
     ![게시글 검색](https://github.com/scs0209/myBlog/assets/110822847/cc498464-4aa7-48f7-8db7-661b8a10e84c)

9. 임시 비밀번호 발급 기능
   - 비밀번호를 모르는 이메일과 임시 비밀번호를 받을 이메일을 작성하면 임시 비밀번호 발급 가능
10. 비밀번호 변경 기능
    - 임시 비밀번호를 받은 후 로그인 하면 비밀번호 변경 가능
11. react-toastify를 사용하여 성공과 에러 메시지 상단 중앙에 toast로 표시
    - 일관성있는 알림 창 구현

## 디렉토리 구조

```
📦src
 ┣ 📂apis
 ┃ ┣ 📜auth.ts
 ┃ ┣ 📜category.ts
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
 ┃ ┣ 📜categoryContext.tsx
 ┃ ┣ 📜commentContext.tsx
 ┃ ┗ 📜repliesVisibilityContext.tsx
 ┣ 📂hooks
 ┃ ┣ 📂Category
 ┃ ┃ ┗ 📜useCategoryAction.ts
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
 ┗ 📜setupProxy.js
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
