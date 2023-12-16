import { Link } from 'react-router-dom'

import { styled } from 'styled-components'

export const Container = styled(Link)`
  border: 1px solid ${(props) => props.theme.colors.white_200};
  border-radius: 0.375rem;
  /* position: relative; */
  display: flex;
  cursor: pointer;
  align-items: center;
  flex-direction: column;
  max-width: 300px;
  height: 270px;
  max-height: 270px;
  padding: 0px;
  margin-inline: 5px;
  transition: 0.3s ease;
  box-shadow: ${(props) => props.theme.box.shadow};

  &:hover {
    box-shadow: 0 0px 8px rgba(0, 0, 0, 0.8);
    opacity: 0.9;
  }
`
export const CardImg = styled.img`
  border-top-right-radius: calc(0.375rem - 1px);
  border-top-left-radius: calc(0.375rem - 1px);
  width: 100%;
  height: 200px;
  object-fit: cover;
`

export const CardBody = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const CardTitle = styled.h4``

export const CardText = styled.p``
