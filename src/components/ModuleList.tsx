import { Module } from '../types'

interface ModuleListProps {
  modules: Module[]
  onRemoveModule: (index: number) => void
}

const ModuleList = ({ modules, onRemoveModule }: ModuleListProps) => {
  if (modules.length === 0) {
    return (
      <div className="module-list">
        <h3>Your Modules</h3>
        <p className="empty-state">No modules added yet. Add your first module above!</p>
      </div>
    )
  }

  return (
    <div className="module-list">
      <h3>Your Modules ({modules.length})</h3>
      <div className="modules-grid">
        {modules.map((module, index) => (
          <div key={index} className="module-card">
            <div className="module-header">
              <h4>{module.moduleNumber}</h4>
              <button 
                className="remove-btn"
                onClick={() => onRemoveModule(index)}
                aria-label="Remove module"
              >
                ×
              </button>
            </div>
            <p className="module-name">{module.moduleName}</p>
            <div className="module-details">
              <span className="ects">{module.moduleECTS} ECTS</span>
              <span className="grade">Grade: {module.grade}</span>
              <span className="pool">{module.modulePool}</span>
              {module.isFirstOrSecondYear && (
                <span className="weight-indicator">50% weight</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ModuleList