import React from "react"

const MBTIResults = ({ data }) => {
  console.log(data)
  return (
    <div className="w-100">
      <Range
        left={{ text: "e", value: data.e }}
        right={{ text: "i", value: data.i }}
      />
      <Range
        left={{ text: "s", value: data.s }}
        right={{ text: "n", value: data.n }}
      />
      <Range
        left={{ text: "t", value: data.t }}
        right={{ text: "f", value: data.f }}
      />
      <Range
        left={{ text: "j", value: data.j }}
        right={{ text: "p", value: data.p }}
      />
    </div>
  )
}

export default MBTIResults

const Range = ({ left, right }) => {
  const total = left.value + right.value
  const leftPercent = (left.value / total) * 100
  const rightPercent = (right.value / total) * 100
  const style = leftPercent >= rightPercent ? "left" : "right"

  return (
    <div className="d-flex justify-content-center position-relative mt-3">
      <P data={left} />
      {/* {leftPercent} */}
      <div className="w-100 d-flex" style={{ height: "30px" }}>
        <div
          className={`${
            style === "left" ? "mr-auto" : "ml-auto"
          } bg-primary d-flex align-items-center`}
          style={{ width: `${style === "left" ? leftPercent : rightPercent}%` }}
        >
          <p
            className={`mb-0 mx-2 ${style === "left" ? "ml-auto" : "mr-auto"}`}
          >
            {style === "left" ? leftPercent.toFixed() : rightPercent.toFixed()}%
          </p>
        </div>
      </div>
      {/* {rightPercent} */}
      <P data={right} justify="end" />
    </div>
  )
}

const P = ({ data, justify }) => (
  <div className="w-100 h-100 position-absolute d-flex align-items-center">
    <p
      className={`text-capitalize mb-0 mx-2${
        justify === "end" ? " ml-auto" : ""
      }`}
    >
      {data.text}
    </p>
  </div>
)
