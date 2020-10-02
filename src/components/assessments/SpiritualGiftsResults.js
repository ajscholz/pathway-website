import React from "react"

const SpiritualGiftsResults = ({ display }) => (
  <div className="d-flex flex-column align-items-center justify-content-center text-center h-100">
    <div className="d-flex flex-column align-items-center justify-content-center">
      {display.length > 5 ? (
        <>
          <p className="h3 mb-3">Your scores show five or more primary gifts</p>
          <p className="text-muted mb-3">
            We recommend retaking the assessment at a later time to narrow your
            results.
          </p>
        </>
      ) : (
        <p className="h2 mb-4">Your top gifts:</p>
      )}
      {display.map((gift, i) =>
        i < 5 ? (
          <p key={gift.gift} className="h5">
            <a href={`${gift.link}`} target="_blank" rel="noopener noreferrer">
              {gift.gift}
            </a>
            : {gift.perc}
          </p>
        ) : null
      )}
    </div>
  </div>
)

export default SpiritualGiftsResults
