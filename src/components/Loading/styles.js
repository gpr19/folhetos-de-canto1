import { lighten } from 'polished'
import { css, keyframes, styled } from 'styled-components'

export const Container = styled.div`
  ${(spacings) => css`
    width: 100%;
    display: flex;
    /* flex-direction: column; */
    flex-wrap: wrap;
    justify-content: center;
    gap: ${(props) => props.$spacings}px;
  `}
`

const animation = keyframes`
    from {
        background-position: 0% 0%;
    }
    to{
        background-position: 135% 0%;
    }
`

export const Content = styled.div`
  ${({ height, width }) => css`
    width: ${width};
    height: ${height}px;

    opacity: 0.6;

    border-radius: 8px;

    cursor: progress;

    background: linear-gradient(-90deg, #91aab4 0%, ${lighten(0.2, '#91aab4')} 50%, #91aab4 100%);

    background-size: 400% 400%;
  `}

  animation: ${animation} 1.2s ease-in-out infinite;
`
