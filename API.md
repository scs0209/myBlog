# REST API

---

HTTP 요청 리스트

### 현재 유저 정보 불러오기 API

- URL: GET /api/users
- 내 로그인 정보를 가져옴, 로그인되어 있지 않으면 false
- return: req.user || false

### 회원가입 API

- URL: POST /api/users
- body: { email, name, password }
- response: { id, name, email, role }

### 로그인 API

- URL: POST /api/users/login
- body: { email, password }
- response: { token }

### 로그아웃 API

- URL: POST /api/users/logout
- return: ‘ok’

### 게시글 목록 조회 API

- URL: GET /api/main/posts
- response: { posts, count }
- posts는 page 및 search 매개 변수에 따라 해당 페이지에 표시되는 게시글 목록
- count는 검색 결과 총 게시글 수

### 게시글 상세 조회 API

- URL: GET /api/mainposts/:postId
- response: { id, title, conetnt, UserId, createAt, updatedAt}

### 게시글 작성 API

- URL: POST /api/main/posts
- Request Body: { title, content, UserId, categoryId }
- response: { id, title, content, UserId, categoryId, createdAt, updatedAt }

### 게시글 수정 API

- URL: PUT /api/main/posts/:postId
- :postId를 통해서 해당 게시글을 수정할 수 있다.
- Request Body: { title, content }
- response: { id, title, content, createdAt, updatedAt }

### 게시글 삭제 API

- URL: DELETE /api/main/posts/:postID
- :postId를 통해 해당 게시글을 삭제
- Request Body: { message }

### 댓글 조회 API

- URL: GET /api/posts/:postId/comments
- :postId를 사용하여 게시물에 연결된 댓글들을 찾아서, 해당 댓글들 및 대댓글들을 반환한다.
- response: 각 댓글과 대댓글의 id, content, createdAt, updatedAt의 정보를 JSON형태로 반환

### 댓글 작성 API

- URL: POST /api/posts/:postId/comments
- body: { content, postId }
- response: { id, content, UserId, PostId, updatedAt, createdAt, User{ id, name }}

### 댓글 수정 API

- URL: PATCH /api/posts/comments/:commentId
- :commentId를 통해 해당 댓글에 대한 내용을 수정.
- body: content
- response: { id, content, updatedAt }

### 댓글 삭제 API

- URL: DELETE /api/posts/comments/:commentId
- :commentId를 통해 해당 댓글에 대한 내용을 삭제.
- response: { message }

### 대댓글 조회 API

- URL: GET /api/posts/:postId/replies
- response: { replies: [{ id, content, CommentId, UserId, createAt, updatedAt, User: {id, name}}] }

### 대댓글 작성 API

- URL: POST /api/posts/comments/:commentId/replies
- body: { content }
- response: { replise: [{ id, content, CommentId, UserId, createdAt, updatedAt, User: { id, name }}] }

### 대댓글 수정 API

- URL: PUT /api/posts/comments/:commentId/replies/:replyId
- :replyid로 대댓글의 id가 replyId와 일치하는 대댓글을 찾은 후 맞으면 수정이 가능하게 해줌
- body: { content }
- response: { id, content, CommentId, UserId, createdAt, updatedAt }

### 대댓글 삭제 API

- URL: DELETE /api/posts/comments/:commentId/replies/:replyId
- :commentId의 댓글에 해당하는 :replyId의 대댓글을 삭제
- response: ‘삭제 되었습니다’

### 카테고리 조회 API

- URL: GET /api/categories
- response: { id, name, createdAt, updatedAt }

### 카테고리 상세정보 조회 API

- URL: GET /api/categories/:categoryId
- :categoryId에 해당하는 카테고리 정보를 조회하여 반환한다.
- response; { id, name, createdAt, updatedAt }

### 카테고리 생성 API

- URL: POST /api/categories
- body: { name }
- response: { id, name, createdAt }

### 카테고리 수정 API

- URL: PUT /api/categories/:id
- :id는 수정할 카테고리의 id를 나타낸다.
- body: { name }
- response: { id, name, createdAt, updatedAt }

### 특정 카테고리에 해당하는 게시글 목록을 가져오는 API

- URL: GET /api/categories/:categoryId/posts
- :categoryId는 카테고리 ID를 나타낸다.
- response: [{ id, title, content, categoryId, category: { id, name, createdAt, updatedAt }, createdAt, updatedAt, {….} }]

### 게시글 조회수 증가 API

- URL: POST /api/main/posts/:id/views
- :id는 조회수를 증가시킬 게시글의 id를 나타낸다.
- Request Headers: 쿠키: viewedPosts
- response: { message: “조회수 증가 성공”, post: { views: post.views }}

### 좋아요 갯수 조회 API

- URL: GET /api/posts/:postId/like-info
- :postId는 조회하고자 하는 게시물의 ID
- response: { likeCount, liked }

### 좋아요 생성 및 삭제 API

- URL: POST /api/posts/:postId/like
- :postId 매개변수로 좋아요를 누를 게시물을 지정
- response: { count, liked}

### 이메일 찾기 API

- URL: POST /api/users/findId
- body: { name }
- response: { email }

### 비밀번호 찾기 API

- URL: POST /api/users/findPassword
- body: { email, receiveEmail }
- response: 새로운 임시 비밀번호를 생성하여 receiveEmail에 비밀번호를 전송함

### 비밀번호 변경 API

- URL: PUT /api/users/password
- body: { currentPassword, newPassword }
- response: { message }
- currentPassword: 사용자가 현재 사용 중인 비밀번호
- newPassword: 사용자가 변경할 새로운 비밀번호
