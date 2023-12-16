import { Container } from 'react-bootstrap'
import Pagination from 'react-bootstrap/Pagination'

const MAX_ITENS = 19
const MAX_LEFT = (MAX_ITENS - 1) / 2

export function Paginator({ limit, total, offset, setOffset }) {
  const current = offset ? offset / limit + 1 : 1
  const pages = Math.ceil(total / limit)
  const first = Math.max(current - MAX_LEFT, 1)

  function onPageChange(page) {
    setOffset((page - 1) * limit)
  }

  return (
    <Container>
      <Pagination size="lg">
        <Pagination.First onClick={() => onPageChange(first)} />
        <Pagination.Prev onClick={() => onPageChange(current - 1)} disabled={current === 1} />

        {Array.from({ length: Math.min(MAX_ITENS, pages) })
          .map((_, index) => index + first)
          .map((page) => {
            return (
              <Pagination.Item
                key={page}
                active={page === current ? true : false}
                onClick={() => onPageChange(page)}
              >
                {page}
              </Pagination.Item>
            )
          })}

        <Pagination.Next onClick={() => onPageChange(current + 1)} disabled={current === pages} />
        <Pagination.Last onClick={() => onPageChange(pages)} />
      </Pagination>
    </Container>
  )
}
