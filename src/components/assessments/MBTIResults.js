import React from "react"
import { useSprings, animated, config } from "react-spring"

const MBTIResults = ({ results }) => {
  console.log(results)

  const dispResult = results
    .map(result => result.win)
    .toString()
    .replace(/,/g, "")

  const reveal = useSprings(
    results.length,
    results.map(result => ({
      from: { width: "0%", right: result.winIndex === 0 ? "unset" : 0 },
      to: { width: `${result.scores[result.winIndex]}%` },
      config: config.molasses,
    }))
  )

  const bars = reveal.map(props => <animated.div style={props}></animated.div>)

  console.log(bars)

  // const pairs = [
  //   ["E", "I"],
  //   ["S", "N"],
  //   ["T", "F"],
  //   ["J", "P"],
  // ]

  // const values = [
  //   [data.e, data.i],
  //   [data.s, data.n],
  //   [data.t, data.f],
  //   [data.j, data.p],
  // ]

  // // helper function to calculate the percentages from the raw data
  // const calcPerc = ([left, right]) => {
  //   const total = left + right
  //   const leftPercent = Math.round((left / total) * 100)
  //   const rightPercent = Math.round((right / total) * 100)
  //   return [leftPercent, rightPercent]
  // }

  // get an array of percentages from the data
  // const percentages = values.map(value => calcPerc(value))
  // get an array of which side "won"
  // const sides = percentages.map(perc => (perc[0] >= perc[1] ? 0 : 1))
  // get a string of the personality type
  // const result = sides
  //   .map((side, i) => pairs[i][side])
  //   .toString()
  //   .replace(/,/g, "")

  const Bar = ({ children, winIndex, perc }) => (
    <div
      className={`h-100 bg-primary d-flex ${
        winIndex === 0 ? `justify-content-end` : `justify-content-start`
      } align-items-center rounded`}
      style={{ width: `${perc}%` }}
    >
      <span className="mx-2">{children}</span>
    </div>
  )

  // const LeftBar = ({ children, perc }) => (
  //   <div className={`${barStyles}`} style={{ width: `${perc}%` }}>
  //     <span className="mx-2 ml-auto">{children}</span>
  //   </div>
  // )

  // const RightBar = ({ children, perc }) => (
  //   <div className={`${barStyles}`} style={{ width: `${perc}%` }}>
  //     <span className="mx-2 mr-auto">{children}</span>
  //   </div>
  // )

  return (
    <>
      <p className="h5 text-muted mb-0 font-bold">You are most likely an</p>
      <p className="h2 mt-2 mb-4">{dispResult}</p>
      {reveal.map(props => (
        <animated.div style={props}></animated.div>
      ))}
      <div className="w-100">
        {reveal.map((props, index) => {
          const pair = results[index]

          return (
            <div
              key={pair.type}
              className="position-relative d-flex justify-content-between align-items-center mt-3"
            >
              {pair.types.map((letter, i) => (
                <div
                  className={`h5 mb-0 mt-0 ${i === 0 ? "mr-2" : "ml-2"}${
                    pair.winIndex !== i ? " text-very-muted" : ""
                  }`}
                  style={{ zIndex: 50 }}
                >
                  {letter}
                </div>
              ))}
              <div
                className="position-absolute h-100"
                style={{
                  width: "calc(100% - 40px)",
                  left: "20px",
                }}
              >
                <animated.div
                  className={`position-absolute h-100 bg-primary d-flex ${
                    pair.winIndex === 0
                      ? `justify-content-end`
                      : `justify-content-start`
                  } align-items-center rounded`}
                  style={props}
                >
                  <span className="mx-2">
                    {`${pair.scores[pair.winIndex]}%`}
                  </span>
                </animated.div>
                {/* <Bar winIndex={pair.winIndex} perc={pair.scores[pair.winIndex]}>
                  {`${pair.scores[pair.winIndex]}%`}
                </Bar> */}
              </div>
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
