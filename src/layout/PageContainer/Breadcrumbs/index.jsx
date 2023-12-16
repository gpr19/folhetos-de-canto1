import { Link, useLocation } from 'react-router-dom'

import * as S from './styles'

export const BreadCrumbs = () => {
  const location = useLocation()

  let currentLink = ''

  const crumbs = location.pathname
    .split('/')
    .filter((crumb) => crumb !== '')
    .map((crumb) => {
      currentLink += `/${crumb}`

      return (
        <S.Content key={crumb}>
          <Link to={currentLink}>{crumb}</Link>{' '}
        </S.Content>
      )
    })
  return <S.Container>{crumbs}</S.Container>
}
