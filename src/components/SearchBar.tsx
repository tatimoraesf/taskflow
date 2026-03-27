import { Search } from 'lucide-react';
import './SearchBar.css'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="search-container">
      <div className="search-icon">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        className="search-input"
        placeholder="Buscar tarefas..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default SearchBar

