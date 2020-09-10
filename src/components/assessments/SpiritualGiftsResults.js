import React from "react"

const SpiritualGiftsResults = ({ tally }) => {
  // const testTally = tally
  //   .map(item => ({
  //     ...item,
  //     score: Math.floor(Math.random() * 15 + 1),
  //   }))
  //   .sort((a, b) => a.score - b.score)
  //   .reverse()
  // const scores = [...testTally]

  const scores = [...tally]
  let display = []

  for (let x = 0; x < 3; x++) {
    display.push(scores.shift())
  }

  const four = [scores.shift()]
  const five = [scores.shift()]
  const six = [scores.shift()]

  if (display[2].score === six[0].score) {
    display = display.concat(four, five, six)
  } else if (four[0].score === six[0].score) {
  } else if (five[0].score === six[0].score) {
    display = display.concat(four)
  } else {
    display = display.concat(four, five)
  }

  display = [...display].map(item => item.name).sort()

  // console.log(display)

  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center h-100">
      {display.length > 5 ? (
        <>
          <p className="h2 mb-4">You had more than five top gifts</p>
          <p className="text-muted">Please take the assessment again</p>
        </>
      ) : (
        <div className="d-flex flex-column align-items-center justify-content-center">
          <p className="h2 mb-4">Your top gifts:</p>
          {display.map(gift => (
            <p key={gift} className="h5">
              {gift}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

export default SpiritualGiftsResults
