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
})