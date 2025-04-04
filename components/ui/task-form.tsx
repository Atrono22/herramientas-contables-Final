"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function TaskForm() {
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="numbers">Lista de números</Label>
        <textarea
          id="numbers"
          value={numbers}
          onChange={(e) => setNumbers(e.target.value)}
          className="w-full min-h-[120px] p-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          placeholder="Ingresa los números separados por comas, espacios o saltos de línea"
        />
      </div>
      
      <div>
        <Label htmlFor="target">Suma objetivo</Label>
        <input
          id="target"
          type="text"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="w-full p-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          placeholder="Ingresa la suma objetivo"
        />
      </div>

      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
        Buscar combinaciones
      </Button>

      {results.length > 0 && (
        <div className="mt-6 space-y-2">
          <h3 className="text-lg font-medium text-white mb-3">
            Resultados encontrados:
          </h3>
          {results.map((result, index) => (
            <div 
              key={index} 
              className="p-4 rounded-lg bg-white/5 border border-white/10"
            >
              {result}
            </div>
          ))}
        </div>
      )}
    </form>
  )
}