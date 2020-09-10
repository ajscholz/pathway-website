import React from "react"

const EnneagramResults = ({ highIndex }) => {
  return (
    <div className="d-flex align-items-center justify-content-center text-center h-100">
      {highIndex.length > 2 ? (
        <h1>More than 2</h1>
      ) : (
        <div className="d-flex flex-column align-items-center justify-content-center">
          {highIndex.map((index, i) => (
            <React.Fragment key={i}>
              {i === 0 ? (
                <p className="h5 text-muted mb-0">You are most likely an</p>
              ) : (
                <p className="h5 text-muted mb-0 mt-5">or an</p>
              )}
              <p className="h2">{`Enneagram Type ${index + 1}`}</p>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  )
}

export default EnneagramResults
