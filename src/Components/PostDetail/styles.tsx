import styled from "@emotion/styled";

export const PostContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 16px;
`;

export const PostHeader = styled.div`
  margin-bottom: 2rem;
`;

export const PostTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const PostDate = styled.div`
  font-size: 0.75rem;
  color: #999;
  margin-bottom: 1rem;
`;

export const PostContent = styled.div`
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
`;

export const PostActions = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const LikeSpan = styled.span`
  font-size: 0.8rem;
  color: gray;
`;

export const PostAction = styled.button`
  background-color: #fff;
  border: none;
  font-size: 0.4rem;
  cursor: pointer;
  margin-right: 0.2rem;
`;

export const PostDeleteButton = styled(PostAction)`
  color: #f00;
`;

export const PostEditButton = styled(PostAction)`
  color: #00f;
`;


