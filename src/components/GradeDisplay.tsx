interface GradeDisplayProps {
  average: number
}

const GradeDisplay = ({ average }: GradeDisplayProps) => {
  const getGradeColor = (grade: number): string => {
    if (grade === 0) return '#666'
    if (grade <= 2) return '#4caf50'
    if (grade <= 3) return '#8bc34a' 
    if (grade <= 4) return '#ff9800'
    if (grade <= 5) return '#f44336'
    return '#9c27b0'
  }

  const getGradeText = (grade: number): string => {
    if (grade === 0) return 'No grades yet'
    if (grade <= 2) return 'Excellent'
    if (grade <= 3) return 'Good'
    if (grade <= 4) return 'Satisfactory'
    if (grade <= 5) return 'Poor'
    return 'Fail'
  }

  return (
    <div className="grade-display">
      <h2>Current Average</h2>
      <div className="average-container">
        <div 
          className="average-circle"
          style={{ borderColor: getGradeColor(average) }}
        >
          <span className="average-number" style={{ color: getGradeColor(average) }}>
            {average > 0 ? average.toFixed(2) : '0.00'}
          </span>
        </div>
        <div className="grade-info">
          <p className="grade-description">{getGradeText(average)}</p>
          <p className="grade-note">
            {average > 0 && (
              <>Weighted by ECTS credits {average !== 0 && '& year level'}</>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

export default GradeDisplay