import { SideBar } from '../SideBar'
// import { BreadCrumbs } from './Breadcrumbs'
import * as S from './styles'

export const PageContainer = ({ children, toggleTheme }) => {
  return (
    <S.Container>
      <SideBar toggleTheme={toggleTheme} />
      <S.Main>
        <S.MainContent>
          {/* <BreadCrumbs /> */}
          {children}
        </S.MainContent>
      </S.Main>
    </S.Container>
  )
}
