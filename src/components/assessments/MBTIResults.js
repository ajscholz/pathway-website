import React from "react"

const MBTIResults = ({ data }) => {
  const pairs = [
    ["E", "I"],
    ["S", "N"],
    ["T", "F"],
    ["J", "P"],
  ]

  const values = [
    [data.e, data.i],
    [data.s, data.n],
    [data.t, data.f],
    [data.j, data.p],
  ]

  // helper function to calculate the percentages from the raw data
  const calcPerc = ([left, right]) => {
    const total = left + right
    const leftPercent = Math.round((left / total) * 100)
    const rightPercent = Math.round((right / total) * 100)
    return [leftPercent, rightPercent]
  }

  // get an array of percentages from the data
  const percentages = values.map(value => calcPerc(value))
  // get an array of which side "won"
  const sides = percentages.map(perc => (perc[0] >= perc[1] ? 0 : 1))
  // get a string of the personality type
  const result = sides
    .map((side, i) => pairs[i][side])
    .toString()
    .replace(/,/g, "")

  return (
    <>
      <p className="h5 text-muted mb-0 font-bold">You are most likely an</p>
      <p className="h2 mt-2 mb-4">{result}</p>
      <div className="w-100">
        {pairs.map((pair, index) => {
          return (
            <div
              key={pair.toString()}
              className="position-relative d-flex justify-content-between align-items-center mt-3"
            >
              {pair.map((letter, i) => (
                <div
                  className={`h5 mb-0 mt-0 ${i === 0 ? "mr-2" : "ml-2"}${
                    sides[index] !== i ? " text-very-muted" : ""
                  }`}
                  style={{ zIndex: 50 }}
                >
                  {letter}
                </div>
              ))}
              <div
                className="position-absolute h-100"
                style={{
                  width: "calc(100% - 30px)",
                  left: "15px",
                }}
              >
                {sides[index] === 0 ? (
                  <LeftBar perc={percentages[index][sides[index]]}>
                    {`${percentages[index][sides[index]]}%`}
                  </LeftBar>
                ) : (
                  <RightBar perc={percentages[index][sides[index]]}>
                    {`${percentages[index][sides[index]]}%`}
                  </RightBar>
                )}
              </div>
              {/* <div className="position-absolute w-100 h-100 bg-primary rounded"></div> */}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default MBTIResults

// const Range = ({ letters }) => {
//   return (

//     // <div className="d-flex justify-content-center position-relative mt-3">
//     //   <P data={left} />
//     //   {/* {leftPercent} */}
//     //   <div className="w-100 d-flex" style={{ height: "30px" }}>
//     //     <div
//     //       className={`${
//     //         style === "left" ? "mr-auto" : "ml-auto"
//     //       } `}
//     //       style={{ width: `${style === "left" ? leftPercent : rightPercent}%` }}
//     //     >
//     //       <p
//     //         className={`mb-0 mx-2 ${style === "left" ? "ml-auto" : "mr-auto"}`}
//     //       >
//     //         {style === "left" ? leftPercent.toFixed() : rightPercent.toFixed()}%
//     //       </p>
//     //     </div>
//     //   </div>
//     //   {/* {rightPercent} */}
//     //   <P data={right} justify="end" />
//     // </div>
//   )
// }

const barStyles = "h-100 bg-primary d-flex align-items-center rounded"

const LeftBar = ({ children, perc }) => (
  <div className={`${barStyles}`} style={{ width: `${perc}%` }}>
    <span className="mx-2 ml-auto">{children}</span>
  </div>
)

const RightBar = ({ children, perc }) => (
  <div className={`${barStyles}`} style={{ width: `${perc}%` }}>
    <span className="mx-2 mr-auto">{children}</span>
  </div>
)
