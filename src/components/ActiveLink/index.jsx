import { useLocation } from 'react-router-dom'

import * as S from './styles'

export const ActiveLink = ({ to = '', isOpen, children, onClick = () => {}, ...rest }) => {
  const pathname = useLocation().pathname

  const isCurrentPath =
    pathname === to || pathname === rest.as || pathname?.slice(1, 7) === to.slice(1, 7)

  //   console.log(pathname?.slice(1, 7))
  return (
    <S.Container $iscurrent={isCurrentPath.toString()}>
      <S.Link
        {...rest}
        isopen={isOpen.toString()}
        $iscurrent={isCurrentPath.toString()}
        to={to}
        onClick={onClick}
      >
        {children}
      </S.Link>
    </S.Container>
  )
}
