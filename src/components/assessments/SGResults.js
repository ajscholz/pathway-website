import React from "react"

const SGResults = ({ data }) => {
  const [tally, gifts] = data
  const results = gifts
    .map((gift, index) => [tally[index], gift])
    .sort()
    .reverse()
  const top = results.slice(0, 5)

  return (
    <div className="w-100 d-flex flex-column align-items-center">
      {top.map((gift, index) => (
        <p className="lead" key={gift[1]}>
          <span className="mr-2">{`${index + 1}. ${gift[1]}`}</span>
        </p>
      ))}
    </div>
  )
}

export default SGResults
