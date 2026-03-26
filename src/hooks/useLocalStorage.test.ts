import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { useLocalStorage } from './useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    //Limpa localStorage antes de cada teste
    localStorage.clear();
  });

  it('deve inicializar com o valor inicial quando não há dados salvos', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'inicial'))

    expect(result.current[0]).toBe('inicial')
  })

  it('deve salvar e recuperar dados do localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'inicial'))

    act(() => {
      result.current[1]('novo valor')
    })

    expect(result.current[0]).toBe('novo valor')
    expect(localStorage.getItem('test-key')).toBe(JSON.stringify('novo valor'))
  })

  it('deve recuperar dados existentes do localStorage', () => {
    localStorage.setItem('test-key', JSON.stringify('salvo'))

    const { result } = renderHook(() => useLocalStorage('test-key', 'inicial'))

    expect(result.current[0]).toBe('salvo')
  })

  it('deve retornar o valor inicial e logar erro seo localStorage falhar no carregamento', () => {
    //Força o localStorage a lançar erro
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { })

    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Falha simulada')
    })

    const { result } = renderHook(() => useLocalStorage('test-key', 'inicial'))

    expect(result.current[0]).toBe('inicial')

    expect(consoleSpy).toHaveBeenCalled()

    consoleSpy.mockRestore()
    vi.restoreAllMocks()
  })

  it('deve logar erro se falhar ao salvar no localStorage', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { })

    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Falha ao salvar')
    })

    const { result } = renderHook(() => useLocalStorage('test-key', 'inicial'))

    await act(async () => {
      result.current[1]('tentativa de salvar')
    })

    expect(consoleSpy).toHaveBeenCalled()

    consoleSpy.mockRestore()
    vi.restoreAllMocks()
  })
})