import React from "react"

const EnneagramResults = ({ highIndex }) => {
  return (
    <div className="d-flex align-items-center justify-content-center text-center h-100">
      {highIndex.length > 2 ? (
        <div>
          <p className="h3 ">Your scores show three or more primary types</p>
          <hr className="w-50 mx-auto my-4" />
          <p className="text-muted">
            Please take the assessment again, trying to be a bit more selective
            with the way you answer each question.
          </p>
        </div>
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
