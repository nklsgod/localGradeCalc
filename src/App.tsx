import { useState, useEffect } from 'react'
import { Module } from './types'
import ModuleForm from './components/ModuleForm'
import ModuleList from './components/ModuleList'
import GradeDisplay from './components/GradeDisplay'
import './App.css'

const STORAGE_KEY = 'university-grade-calculator-modules'

function App() {
  const [modules, setModules] = useState<Module[]>(() => {
    // Initialize state with data from localStorage
    const savedModules = localStorage.getItem(STORAGE_KEY)
    if (savedModules) {
      try {
        return JSON.parse(savedModules) as Module[]
      } catch (error) {
        console.error('Error loading modules from localStorage:', error)
      }
    }
    return []
  })

  // Save modules to localStorage whenever modules change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(modules))
  }, [modules])

  const addModule = (module: Module) => {
    setModules([...modules, module])
  }

  const removeModule = (index: number) => {
    setModules(modules.filter((_, i) => i !== index))
  }

  const calculateWeightedAverage = (): number => {
    if (modules.length === 0) return 0

    let totalWeightedGrade = 0
    let totalECTS = 0

    modules.forEach(module => {
      const weight = module.isFirstOrSecondYear ? 0.5 : 1
      const weightedGrade = module.grade * module.moduleECTS * weight
      totalWeightedGrade += weightedGrade
      totalECTS += module.moduleECTS * weight
    })

    return totalECTS > 0 ? totalWeightedGrade / totalECTS : 0
  }

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>University Grade Calculator</h1>
          <p>Track your modules and calculate your weighted average grade</p>
        </header>

        <div className="main-content">
          <div className="form-section">
            <ModuleForm onAddModule={addModule} />
          </div>

          <div className="results-section">
            <GradeDisplay average={calculateWeightedAverage()} />
            <ModuleList modules={modules} onRemoveModule={removeModule} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App