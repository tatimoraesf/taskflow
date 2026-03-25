import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ProgressBar from './ProgressBar'

describe('ProgressBar', () => {
  it('não deve renderizar quando total é 0', () => {

    const { container } = render(<ProgressBar total={0} done={0} />)

    expect(container.firstChild).toBeNull()
  })

  it('deve mostrar progresso correto com 5 a 10 tarefas', () => {
    render(<ProgressBar total={10} done={5} />)

    expect(screen.getByText('5 a 10 tarefas concluídas')).toBeInTheDocument()
    expect(screen.getByText('50%')).toBeInTheDocument()
  })
})