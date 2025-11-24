// StyledComponents.jsx
import styled from "styled-components";

export const BotonCompra = styled.button`
  background-color: #ff73a1;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 auto;
  &:hover {
    background-color: #c70073;
  }
`;
