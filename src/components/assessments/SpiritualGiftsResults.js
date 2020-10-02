import React from "react"

const SpiritualGiftsResults = ({ display }) => (
  <div className="d-flex flex-column align-items-center justify-content-center text-center h-100">
    {display.length > 5 ? (
      <>
        <p className="h2 mb-4">Your scores show five or more primary gifts</p>
        <hr className="w-50 mx-auto my-4" />
        <p className="text-muted">
          Please take the assessment again, trying to be a bit more selective
          with the way you answer each question.
        </p>
      </>
    ) : (
      <div className="d-flex flex-column align-items-center justify-content-center">
        <p className="h2 mb-4">Your top gifts:</p>
        {display.map(gift => (
          <p key={gift.gift} className="h5">
            <a href={`${gift.link}`} target="_blank" rel="noopener noreferrer">
              {gift.gift}
            </a>
            : {gift.perc}
          </p>
        ))}
      </div>
    )}
  </div>
)

export default SpiritualGiftsResults
