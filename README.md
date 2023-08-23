# SCS's Blog

<div align="center">
<img src="https://user-images.githubusercontent.com/110822847/229564131-388a385d-c880-4ab7-967d-d392a6dec03f.png" width="250">
</div>

## 목차

- [프로젝트 정보](#%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%A0%95%EB%B3%B4)
- [배포 주소](#%EB%B0%B0%ED%8F%AC-%EC%A3%BC%EC%86%8C)
- [개발자 소개](#%EA%B0%9C%EB%B0%9C%EC%9E%90-%EC%86%8C%EA%B0%9C)
- [리팩토링을 진행한 이유](#%EB%A6%AC%ED%8C%A9%ED%86%A0%EB%A7%81%EC%9D%84-%EC%A7%84%ED%96%89%ED%95%9C-%EC%9D%B4%EC%9C%A0)
- [프로젝트 소개](#%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%86%8C%EA%B0%9C)
- [시작 가이드](#%EC%8B%9C%EC%9E%91-%EA%B0%80%EC%9D%B4%EB%93%9C)
- [데모](#%EB%8D%B0%EB%AA%A8)
  - [UI 개선 전](#ui-%EA%B0%9C%EC%84%A0-%EC%A0%84)
  - [UI 개선 후](#ui-%EA%B0%9C%EC%84%A0-%ED%9B%84)
- [Stack🤡](#stack)
- [라이브러리 사용 이유](#%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%EC%82%AC%EC%9A%A9-%EC%9D%B4%EC%9C%A0)
- [고려 사항](#%EA%B3%A0%EB%A0%A4-%EC%82%AC%ED%95%AD)
- [구현 시 어려웠던 점](#%EA%B5%AC%ED%98%84-%EC%8B%9C-%EC%96%B4%EB%A0%A4%EC%9B%A0%EB%8D%98-%EC%A0%90)
- [앞으로 개선할 계획](#%EC%95%9E%EC%9C%BC%EB%A1%9C-%EA%B0%9C%EC%84%A0%ED%95%A0-%EA%B3%84%ED%9A%8D)
- [리팩토링](#%EB%A6%AC%ED%8C%A9%ED%86%A0%EB%A7%81)
  - [리팩토링 기준](#%EB%A6%AC%ED%8C%A9%ED%86%A0%EB%A7%81-%EA%B8%B0%EC%A4%80)
  - [어려웠던 점과 고려 사항](#%EC%96%B4%EB%A0%A4%EC%9B%A0%EB%8D%98-%EC%A0%90%EA%B3%BC-%EA%B3%A0%EB%A0%A4-%EC%82%AC%ED%95%AD)
- [리팩토링을 하면서 배운 점](#%EB%A6%AC%ED%8C%A9%ED%86%A0%EB%A7%81%EC%9D%84-%ED%95%98%EB%A9%B4%EC%84%9C-%EB%B0%B0%EC%9A%B4-%EC%A0%90)
- [주요 기능 📦](#%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-)
- [앞으로 더 해볼 것들](#%EC%95%9E%EC%9C%BC%EB%A1%9C-%EB%8D%94-%ED%95%B4%EB%B3%BC-%EA%B2%83%EB%93%A4)
- [디렉토리 구조](#%EB%94%94%EB%A0%89%ED%84%B0%EB%A6%AC-%EA%B5%AC%EC%A1%B0)
- [❤ git commit message 컨벤션](#%E2%9D%A4-git-commit-message-%EC%BB%A8%EB%B2%A4%EC%85%98)

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
- Tailwind CSS: 빠르고 효율적인 CSS 작성을 도울 수 있는 유틸리티 클래스를 제공하기 위해 사용
- Typescript: 정적 타입 검사를 해 코드의 안정성을 높이기 위해 사용
- Husky: Git hooks를 쉽게 설정하여 코드 품질을 관리하기 위해 사용
- ESLint: 코드 스타일과 구문 오류를 검사하여 일관된 코드베이스를 유지하기 위해 사용
- Prettier: 코드 포맷팅을 자동화하여 일관된 스타일을 유지하기 위해 사용
- Axios: HTTP 요청을 쉽게 처리하기 위해 사용
- React Query: 데이터 패칭, 캐싱, 동기화, 자동 리소스 관리 등의 기능을 제공하여 API 요청 최적화를 위해 사용. 또한 데이터 동기화 및 백그라운드 업데이트를 할 수 있으며, 에러 및 로딩 상태 처리가 용이
- react-hook-form: 비제어 컴포넌트의 장점은 그대로 살리면서 제어 컴포넌트에서만 다룰 수 있는 실시간 유효성 검사, 실시간 동기화 등의 API를 제공함. 또 리렌더링을 최소화시켜 마운팅 속도를 높여줌

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
<summary>SWR => React Query로 변경</summary>
<div markdown="1">      
 
프로젝트에서 기존 SWR로 구현된 부분을 React Query로 전환하였습니다. 변경한 이유는 다음과 같습니다.

- 다양한 HTTP 메서드 지원: SWR은 주로 데이터 패치(GET) 요청을 위한 라이브러리로 설계되었기 때문에, GET 요청에 주로 초점이 맞춰져 있는 반면, React Query는 다양한 HTTP 메서드를 지원하며, POST, PUT, DELETE 등의 요청도 쉽고 간편하게 처리할 수 있습니다.
- 더 강력한 에러 처리: React Query는 에러 처리와 관련된 많은 옵션과 기능들을 제공하며, 고급 상황에서의 에러 처리가 더 쉬워집니다.
- 페이지네이션 및 무한 스크롤 등과 같은 기능을 쉽게 구현할 수 있는 다양한 내장 옵션을 지원합니다.

</div>
</details>

<details>
<summary>로딩 처리를 전역적으로 관리할 수 있는 GlobalLoading 구현</summary>
<div markdown="1">      
 
 ## GlobalLoading을 구현한 이유
 - GlobalLoading을 구현한 이유는 애플리케이션 전체에서 일관된 로딩 처리를 하기 위함입니다. 개별 컴포넌트에서 로딩 상태를 처리하면 코드 중복 및 복잡성이 증가하기 할 수 있고, 사용자 경험이 떨어질 수 있습니다. GlobalLoading을 통해 애플리케이션의 로딩 상태를 중앙에서 관리하고, 일관된 사용자 경험을 제공할 수 있습니다.

다음은 GlobalLoading을 구현함으로써 얻은 이점입니다.

1. React Query의 useIsFetching을 활용한 GlobalLoading 구현

- 각 컴포넌트에서 개별적으로 로딩 상태를 처리하는 대신, useIsFetching을 통해 애플리케이션 전체의 로딩 상태를 일관되게 관리하도록 구현하였습니다. 이로 인해 복잡한 로직 처리를 줄이고 코드량을 감소시켰습니다.

2. 코드량 감소 및 일관된 로딩 상태 처리

- useIsFetching을 사용하여 GlobalLoading을 구현함으로써, 각 컴포넌트에서 개별적으로 작성하던
  ```typescript
  if (isLoading) return <div>Loading...</div>;
  ```
  과 같은 코드를 제거할 수 있었습니다. 이는 전체적인 코드량을 줄이고, 중복 코드의 발생을 최소화하는 데 도움이 되었습니다.

</div>
</details>

<details>
<summary>에러 처리를 전역적으로 관리할 수 있는 ErrorBoundary 구현</summary>
<div markdown="1">      
 
 ## ErrorBoundary 구현한 이유
 - React 애플리케이션에서 간혹 렌더링 또는 라이프사이클 메서드 중에 에러가 발생할 수 있습니다. 이러한 에러를 전역저긍로 처리하고 사용자에게 알 수 있는 UI를 제공하기 위해 ErrorBoundary를 구현했습니다. 이를 통해 애플리케이션 전체의 안정성을 향상시키고 사용자 경험을 개선할 수 있습니다.

### ErrorBoundary 장점

1. 전역적으로 에러 처리

- ErrorBoundary를 사용함으로써 애플리케이션 전체에서 발생하는 에러를 한 곳에서 처리할 수 있습니다. 에러가 발생할 때 사용자에게 적절한 메시지를 표시하고 필요에 따라 에러를 기록하거나 추적 방법을 추가할 수 있습니다.

2. 구조적 청결함 유지

- ErrorBoundary를 사용하며 에러 처리를 애플리케이션의 별도 계층으로 분리할 수 있습니다. 이를 통해 각 컴포넌트의 코드를 더 간결하게 유지하고 관심사의 분리를 달성할 수 있습니다.

### 구현하면서 어려웠던 부분

- ErrorBoundary와 리액트 쿼리의 에러 처리 간의 차이점을 이해하는 것이 어려웠습니다. 이를 통해 기존의 에러 처리와 리액트 쿼리 및 useMutation에서 발생하는 에러의 동작에 대해 학습하였습니다.
- 특정 상황의 에러 메시지를 적절하게 분류하고, 처리하는 방법을 차즌ㄴ 것이 어려웠습니다. 서버에서 전달되는 에러 상태 코드를 기반으로 적절한 사용자 메시지를 결정하는 로직을 개발하였습니다.
- 처음에 useQuery 및 useMutation에 대한 에러 처리에 대한 지식이 부족하여 헷갈렸습니다. 공식 문서 및 학습 자료를 참조하여 적절한 에러 핸들링 방법을 도출하였습니다.

</div>
</details>

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
<details>
<summary>Category 컴포넌트 코드 분리</summary>
<div markdown="1">      
 
- Context API를 사용하여 하위 컴포넌트와의 결합도를 낮췄습니다.
- Context와 커스텀 훅을 사용하여 데이터 관리와 이벤트 처리 로직을 분리, 이로 인해 각 컴포넌트의 역할과 관심사가 명확해졌습니다.
- 각 컴포넌트와 함수들이 분리되어 있어 수정이 필요한 부분을 쉽게 찾고 고칠 수 있어 유지보수가 용이해졌습니다.

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

- Context API를 사용할 때 발생할 수 있는 성능 이슈가 있음, useMemo나 useCallback등 메모이제이션을 사용하여 어느정도 해결을 했습니다. 또한, Context를 작은 단위로 쪼개서 사용하여 해결할 수 있지만, 그러면 상태가 많이 흩어지기 때문에 복잡하다는 단점도 있습니다.

## 리팩토링을 하면서 배운 점

1. 결합도와 응집도의 균형이 중요

- 컴포넌트 간 결합도를 낮춰두면 리팩토링 시 수정이 용이합니다.
- 하지만, 과도한 분리는 관리가 어려워질 수 있습니다.
- 결합도와 응집도 사이의 균형을 잘 유지하는 것이 핵심입니다.

2. 테스트 코드의 중요성

- 리팩토링 과정에서 테스트 코드를 작성하지 않았더니 에러 발생 시 문제 파악이 어려웠습니다.
- 테스트 코드를 작성하면 리팩토링 시 에러 확인과 수정이 쉬워집니다.
- 앞으로의 프로젝트에는 테스트 코드 작성을 포함시켜 더 효율적인 개발을 추구해보고, 지금 프로젝트에서 천천히 테스트 코드를 작성해봐야겠다.

3. API 호출 함수의 중앙화

- API 호출 함수들을 하나의 중앙 위치에서 관리하여 코드 보수가 용이해집니다.
- 중복된 코드를 줄이고, 에러 처리나 확장성을 향상시킬 수 있습니다.
- 프로젝트에서 API 호출 함수를 중앙화하여 효율적이고 깔끔한 코드 구조를 만들 수 있습니다.

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

### ⭐️ 게시글 숨기기

### ⭐️ 로그인/회원가입

## 앞으로 더 해볼 것들

- Context API 대신 zustand나 reocoil 사용해서 더 간편하게 전역적으로 state 관리
- swr대신 react-query 사용해보고 뭐가 더 편하고 유용한지 확인해보기(완)
- react-hook-form 라이브러리를 로그인과 회원가입에 적용(완)

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
