# SCS's Blog

<div align="center">
<img src="https://user-images.githubusercontent.com/110822847/229564131-388a385d-c880-4ab7-967d-d392a6dec03f.png" width="329">
</div>

## 프로젝트 정보

> **1인 개발** <br/> **개발기간: 2023.2.25 ~ 2023.4.3**

## 배포 주소

> **프론트 서버** : https://web-myblog-p8xrq2mlfsc6kg2.sel3.cloudtype.app/ <br> > **백엔드 서버** : https://port-0-server-p8xrq2mlfsc6kg2.sel3.cloudtype.app/<br>

## 개발자 소개

|                                                              성창수                                                              |
| :------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/110822847/229564340-070947f1-3f34-4cf4-b25f-ffe2d274be50.jpg" width="160px"> |
|                                              [@changsu](https://github.com/scs0209)                                              |
|                                                       순천향대 화학과 졸업                                                       |

## 프로젝트 소개

제가 배웠던 기술들을 적용하고자 하는 프로젝트를 찾다가 가장 적합하게 할 수 있는 프로젝트라고 생각해서 만들었고, 주로 제가 하면서 배운 내용들을 작성하여 저와 비슷한 프로젝트를 하는 사람들에게 어려움을 조금이라도 해결할 수 있게 하고자 만들었습니다.

## 시작 가이드

For building and running the application you need:

## Available Scripts

### Requirements

In the project directory, you can run:

- [Node.js 18.12.1](https://nodejs.org/ca/blog/release/v18.12.1/)
- [Npm 8.19.2](https://www.npmjs.com/package/npm/v/8.19.2)

### Installation

```bash
$ git clone https://github.com/scs0209/myBlog.git
$ cd myBlog
```

#### Backend

```
$ cd server
$ npm i
$ npm run dev
```

#### Frontend

```
$ cd myBlog
$ npm i
$ npm run start
```

---

## Stack🤡

### Environment

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)

### Config

![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

### Database

![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white)

### Development

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Styled Components](https://img.shields.io/badge/-Styled%20Components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/-Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

---

## 화면 구성 📺

|                                                           메인 페이지                                                            |                                                          로그인 페이지                                                          |
| :------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------: |
| <img width="329" src= "https://user-images.githubusercontent.com/110822847/229567497-b5607bb5-5d3c-44e3-b32e-0b3edbf83564.PNG"/> | <img width="329" src="https://user-images.githubusercontent.com/110822847/229567670-2b7d644f-4e1e-4b93-a168-89c2d32f0b68.PNG"/> |
|                                                         회원가입 페이지                                                          |                                                          게시글 페이지                                                          |
| <img width="329" src="https://user-images.githubusercontent.com/110822847/229567915-4c21d3a9-9d57-4eb5-b919-d52842b4f9f9.PNG"/>  | <img width="329" src="https://user-images.githubusercontent.com/110822847/229568037-a07a998c-1d5a-43c2-b9a5-8caae388cb27.PNG"/> |

---

## 주요 기능 📦

### ⭐️ 게시글 작성

- 관리자 계정으로 로그인 했을 시에만 가능

### ⭐️ 댓글 작성

- 댓글과, 대댓글을 작성할 수 있다.

### ⭐️ 좋아요 기능

- 게시글에 종아요를 누를 수 있도록 추가했다.

---

## 아키텍쳐

### 디렉터리 구조

```bash
my-blog/
├── server/       Node.js 서버 파일
├── config/       서버, 데이터베이스 관련 정보 폴더
│   └── config.js
├── models/       db 모델 관련 정보 폴덜
├── passport/     passposrt 라이브러리 폴더
│   └── index.js
│   └── local.js
├── routes/
│   ├── api.js
│   └── middlewares.js
└── server.js
├── client/        # React, 타입스크립트 프론트엔드 파일
│   ├── public/
│   ├── src/
│       ├── components/
│       ├── images/
│       ├── layouts/
│       ├── Pages/
│       ├── typings/
│       ├── utils/
│     └── index.tsx
│   ├── package.json
│   └── ...
```
