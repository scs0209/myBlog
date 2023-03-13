import styled from "@emotion/styled";

export const PaginationContainer = styled.div`
  display: flex;
  position: relative;
  right: 20px;
  justify-content: center;
  margin-top: 2rem;

  ul {
    list-style: none;
    display: flex;

    li {
      margin: 0 0.5rem;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        transform: scale(1.1);
      }

      &.active {
        font-weight: bold;
      }

      &.disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }

      &.break {
        cursor: default;
      }

      &.prev,
      &.next {
        display: flex;
        align-items: center;
        padding: 0.5rem;
        border-radius: 0.5rem;

        span {
          margin: 0 0.5rem;
        }
      }

      &.prev {
        background-color: #f1f1f1;
      }

      &.next {
        background-color: #f1f1f1;
      }
    }
  }
`;
