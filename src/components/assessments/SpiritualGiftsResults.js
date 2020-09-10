import React from "react"

const SpiritualGiftsResults = ({ display }) => (
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

export default SpiritualGiftsResults
