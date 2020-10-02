import React from "react"
import { useSprings, animated, config } from "react-spring"

const MBTIResults = ({ results }) => {
  const dispResult = results
    .map(result => result.win)
    .toString()
    .replace(/,/g, "")

  const delay = i => i * 600 + 200
  const fadeIn = useSprings(
    results.length,
    results.map((result, i) => ({
      from: { opacity: 0 },
      to: { opacity: 1 },
      config: config.molasses,
      delay: delay(i),
    }))
  )

  const bars = useSprings(
    results.length,
    results.map((result, i) => ({
      from: {
        width: "0%",
        right: result.winIndex === 0 ? "unset" : 0,
        opacity: 0,
      },
      to: { width: `${result.scores[result.winIndex]}%`, opacity: 1 },
      config: config.molasses,
      delay: delay(i),
    }))
  )

  return (
    <>
      <p className="h5 text-muted mb-0 font-bold">You are most likely an</p>
      <p className="h2 mt-2 mb-4">{dispResult}</p>
      <div className="w-100">
        {results.map((pair, index) => {
          return (
            <div
              key={pair.type}
              className="position-relative d-flex justify-content-between align-items-center mt-3"
            >
              {pair.types.map((letter, i) => (
                <animated.div
                  key={letter}
                  className={`h5 mb-0 mt-0 ${i === 0 ? "mr-2" : "ml-2"}${
                    pair.winIndex !== i ? " text-very-muted" : ""
                  }`}
                  style={{ zIndex: 50, ...fadeIn[index] }}
                >
                  {letter}
                </animated.div>
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
                  style={bars[index]}
                >
                  <span className="mx-2">
                    {`${pair.scores[pair.winIndex]}%`}
                  </span>
                </animated.div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default MBTIResults
