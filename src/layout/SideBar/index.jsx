import { useContext, useState } from 'react'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { BsFillMenuButtonWideFill } from 'react-icons/bs'
import { FaQuestion, FaRegListAlt, FaUserPlus } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { GoHome } from 'react-icons/go'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { LuCalendarPlus } from 'react-icons/lu'
import { MdDarkMode, MdLibraryMusic, MdLightMode, MdMenuBook } from 'react-icons/md'
import { PiMusicNotesPlusFill } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'

import { ActiveLink } from '../../components'
import { AuthContext, NavigationContext } from '../../contexts'
import { useLocalStorage } from '../../hooks'
import * as S from './styles'

export const SideBar = ({ toggleTheme }) => {
  const { isSideBarOpen, toggleSideBar, setSideBarOpen } = useContext(NavigationContext)
  const { user, logout } = useContext(AuthContext)
  const [checked, setChecked] = useLocalStorage('theme', false)
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleChange = () => {
    setChecked((prev) => !prev)
    toggleTheme()
  }

  // function to return random number

  const handleLogin = () => {
    if (!user) {
      navigate('/login')
    } else {
      navigate('/perfil')
    }
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev)
    if (window.innerWidth < 1024) {
      setSideBarOpen(true)
    }
  }

  const menuTopItem = [
    {
      path: '/',
      name: 'Início',
      icon: <GoHome />,
    },
    {
      path: '/musicas',
      name: 'Músicas',
      icon: <MdLibraryMusic size={20} />,
    },
    {
      path: '/partes-da-missa',
      name: 'Partes da Missa',
      icon: <BsFillMenuButtonWideFill />,
    },
    // {
    //   path: '/repertorios',
    //   name: 'Repertórios',
    //   icon: <MdMenuBook size={20} />,
    // },
  ]

  const menuEndItems = [
    // {
    //   path: '/configuracoes',
    //   name: 'Configurações',
    //   icon: <FiSettings />,
    // },
    {
      path: '/sobre',
      name: 'Sobre',
      icon: <FaQuestion />,
    },
  ]

  const menuModItems = [
    {
      path: '/add-musica',
      name: 'Nova Música',
      icon: <PiMusicNotesPlusFill size={20} />,
    },
    {
      path: '/add-missa',
      name: 'Nova Missa',
      icon: <LuCalendarPlus size={20} />,
    },
  ]

  const menuAdminItems = [
    ...menuModItems,
    { path: '/users', name: 'Usuários', icon: <FaUserPlus size={20} /> },
    { path: '/missas', name: 'Missas', icon: <FaRegListAlt size={20} /> },
  ]

  return (
    <S.Container $isopen={isSideBarOpen.toString()}>
      <S.Content>
        <S.Header>
          <S.MenuButton checked={checked} onClick={() => toggleMobileMenu()}>
            {isMobileMenuOpen ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
          </S.MenuButton>
          <S.MenuProfile onClick={handleLogin}>
            <S.MenuProfile.Title>
              {user ? user.nome.substring(0, 1).toUpperCase() : 'F'}
            </S.MenuProfile.Title>
            {isSideBarOpen && (
              <S.MenuProfile.Name>{user ? user.nome : 'Faça Login'}</S.MenuProfile.Name>
            )}
          </S.MenuProfile>
        </S.Header>

        <S.Collapse>
          <S.CollapseButton onClick={() => toggleSideBar()}>
            {isSideBarOpen ? <IoIosArrowBack /> : <IoIosArrowForward />}
          </S.CollapseButton>
        </S.Collapse>

        <S.MenuOverlay
          $ismobilemenuopen={isMobileMenuOpen.toString()}
          onClick={() => toggleMobileMenu()}
        />

        <S.Nav $ismobilemenuopen={isMobileMenuOpen.toString()} $isopen={isSideBarOpen.toString()}>
          <div>
            {menuTopItem.map((item, index) => (
              <ActiveLink
                isOpen={isSideBarOpen}
                to={item.path}
                key={index}
                onClick={() => toggleMobileMenu()}
                title={item.name}
              >
                <div>{item.icon}</div>
                {isSideBarOpen && <div>{item.name}</div>}
              </ActiveLink>
            ))}

            {user && (
              <ActiveLink
                to="/repertorios"
                isOpen={isSideBarOpen}
                onClick={() => toggleMobileMenu()}
                title="Repertórios"
              >
                <MdMenuBook size={20} />
                {isSideBarOpen && <div>Repertórios</div>}
              </ActiveLink>
            )}

            {user &&
              user.level === 'admin' &&
              menuAdminItems.map((item, index) => (
                <ActiveLink
                  isOpen={isSideBarOpen}
                  to={item.path}
                  key={index}
                  onClick={() => toggleMobileMenu()}
                  title={item.name}
                >
                  <div>{item.icon}</div>
                  {isSideBarOpen && <div>{item.name}</div>}
                </ActiveLink>
              ))}

            {user &&
              user.level === 'moderador' &&
              menuModItems.map((item, index) => (
                <ActiveLink
                  isOpen={isSideBarOpen}
                  to={item.path}
                  key={index}
                  onClick={() => toggleMobileMenu()}
                  title={item.name}
                >
                  <div>{item.icon}</div>
                  {isSideBarOpen && <div>{item.name}</div>}
                </ActiveLink>
              ))}
          </div>

          <div>
            {menuEndItems.map((item, index) => (
              <ActiveLink
                isOpen={isSideBarOpen}
                to={item.path}
                key={index}
                onClick={() => toggleMobileMenu()}
                title={item.name}
              >
                <div>{item.icon}</div>
                {isSideBarOpen && <div>{item.name}</div>}
              </ActiveLink>
            ))}
            {user && (
              <ActiveLink to="/#" isOpen={isSideBarOpen} onClick={() => logout()} title="Sair">
                <FiLogOut size={18} />
                {isSideBarOpen && <div>Sair</div>}
              </ActiveLink>
            )}
            <S.Footer>
              <S.Label onClick={handleChange}>
                {checked ? <MdLightMode size={25} /> : <MdDarkMode size={25} />}
              </S.Label>
            </S.Footer>
          </div>
        </S.Nav>
      </S.Content>
    </S.Container>
  )
}
