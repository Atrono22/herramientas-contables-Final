"use client"

import { useState } from 'react'
import { Calculator, ArrowRight } from 'lucide-react'

export default function Home() {
  const [numbers, setNumbers] = useState("")
  const [target, setTarget] = useState("")
  const [results, setResults] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const numberList = numbers
      .split(/[\n,\s]+/)
      .map(n => parseFloat(n.replace(/,/g, '')))
      .filter(n => !isNaN(n))
    
    const targetNum = parseFloat(target)
    
    if (isNaN(targetNum)) {
      setResults(["Por favor ingresa un número válido como objetivo"])
      return
    }

    findCombinations(numberList, targetNum)
  }

  const findCombinations = (numbers: number[], target: number) => {
    const combinations: number[][] = []
    
    const find = (index: number, current: number[], sum: number) => {
      if (sum === target) {
        combinations.push([...current])
        return
      }
      
      if (index >= numbers.length || sum > target) return
      
      current.push(numbers[index])
      find(index + 1, current, sum + numbers[index])
      current.pop()
      find(index + 1, current, sum)
    }
    
    find(0, [], 0)
    
    if (combinations.length === 0) {
      setResults(["No se encontraron combinaciones que sumen el objetivo"])
    } else {
      setResults(
        combinations.map(combo => 
          `${combo.join(' + ')} = ${target}`
        )
      )
    }
  }

  return (
    <div className="app-container">
      <h1 className="title">
        Buscador de Sumas
      </h1>
      <p className="subtitle">
        Encuentra todas las combinaciones de números que sumen el valor objetivo.
      </p>

      <div className="glass-card">
        <form onSubmit={handleSubmit} className="form-container">
          <div className="input-group">
            <label className="input-label">
              Lista de números
            </label>
            <textarea
              value={numbers}
              onChange={(e) => setNumbers(e.target.value)}
              className="input-field min-h-[120px]"
              placeholder="Ingresa los números separados por comas, espacios o saltos de línea"
            />
          </div>

          <div className="input-group">
            <label className="input-label">
              Suma objetivo
            </label>
            <input
              type="text"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="input-field"
              placeholder="Ingresa la suma objetivo"
            />
          </div>

          <button 
            type="submit"
            className="button w-full flex items-center justify-center gap-2"
          >
            <Calculator className="w-5 h-5" />
            Buscar combinaciones
          </button>

          {results.length > 0 && (
            <div className="mt-6 space-y-2">
              <h3 className="text-lg font-medium text-gray-200 mb-3">
                Resultados encontrados:
              </h3>
              {results.map((result, index) => (
                <div 
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-center"
                >
                  <ArrowRight className="w-5 h-5 text-blue-400 mr-2 flex-shrink-0" />
                  <span>{result}</span>
                </div>
              ))}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}