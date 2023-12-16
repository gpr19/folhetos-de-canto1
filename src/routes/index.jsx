import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { PageContainer } from '../layout'
import {
  About,
  CreateMissa,
  CreateMusic,
  CreateRepertorio,
  Error,
  Home,
  Login,
  Missa,
  Musics,
  PartesDaMissa,
  Repertorios,
  User,
  ShowAllMissas,
  Profile,
} from '../pages'
import { GlobalStyles } from '../themes'
import { PrivateRute } from './PrivateRoute'

export const RootRoute = ({ toggleTheme }) => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <PageContainer toggleTheme={toggleTheme}>
        <ErrorBoundary FallbackComponent={Error}>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/sobre" element={<About />} />

            <Route path="/perfil" element={<Profile />} />

            <Route path="/partes-da-missa" element={<PartesDaMissa />} />

            <Route path="musicas">
              <Route index element={<Musics />} />
              <Route path=":music" element={<Musics />} />
              <Route path=":music/editar" element={<PrivateRute Component={CreateMusic} />} />
            </Route>
            <Route path="/add-musica" element={<PrivateRute Component={CreateMusic} />} />

            {/* <Route path="/missa/*" element={<Missa />} /> */}

            <Route path="missa">
              <Route index element={<Missa />} />
              <Route path=":missa" element={<Missa />} />
              <Route path=":missa/editar" element={<PrivateRute Component={CreateMissa} />} />
            </Route>
            <Route path="/add-missa" element={<PrivateRute Component={CreateMissa} />} />
            <Route path="/Missas" element={<PrivateRute Component={ShowAllMissas} />} />

            <Route path="repertorios">
              <Route index element={<Repertorios />} />
              <Route path=":repertorio" element={<Repertorios />} />
              <Route
                path=":repertorios/editar"
                element={<PrivateRute Component={CreateRepertorio} authorization={false} />}
              />
            </Route>

            <Route
              path="repertorios/adicionar/*"
              element={<PrivateRute Component={CreateRepertorio} authorization={false} />}
            />

            <Route path="users">
              <Route index element={<PrivateRute Component={User.List} />} />
              <Route path="cadastrar" element={<PrivateRute Component={User.Create} />} />
              <Route path=":userName" element={<User.Show />} />
              <Route path=":userName/editar" element={<PrivateRute Component={User.Create} />} />
            </Route>

            <Route path="/login" element={<Login />} />

            <Route path="*" element={<h2>Pagina inexistente</h2>} />
          </Routes>
        </ErrorBoundary>
      </PageContainer>
    </BrowserRouter>
  )
}
