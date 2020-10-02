import React, { useReducer, useRef } from "react"
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap"
import { spiritualGiftsQuestions } from "../../utils/data/assessments"
import CloseButton from "./Buttons/CloseButton"
import RadioButtons from "./Buttons/RadioButtons"
import SpiritualGiftsResults from "./SpiritualGiftsResults"
import SubmitResults from "./SubmitResults"
import { randomizeArray } from "../../utils/functions"

const questions = randomizeArray([...spiritualGiftsQuestions])

// FOR TESTING
// const gifts = [
//   {
//     name: "Administration",
//     score: 4,
//     link:
//       "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-administration",
//   },
//   {
//     name: "Apostleship",
//     score: 3,
//     link:
//       "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-apostleship",
//   },
//   {
//     name: "Craftsmanship",
//     score: 14,
//     link:
//       "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-craftsmanship",
//   },
//   {
//     name: "Discernment",
//     score: 9,
//     link:
//       "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-discerning-spirits",
//   },
//   {
//     name: "Evangelism",
//     score: 5,
//     link:
//       "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-evangelism",
//   },
//   {
//     name: "Exhortation",
//     score: 5,
//     link:
//       "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-exhortation",
//   },
//   {
//     name: "Faith",
//     score: 0,
//     link:
//       "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-faith",
//   },
//   {
//     name: "Giving",
//     score: 3,
//     link:
//       "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-giving",
//   },
//   {
//     name: "Healing",
//     score: 10,
//     link:
//       "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-healing",
//   },
//   {
//     name: "Helps",
//     score: 12,
//     link:
//       "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-helps",
//   },
//   {
//     name: "Hospitality",
//     score: 14,
//     link:
//       "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-hospitality",
//   },
//   {
//     name: "Intercession",
//     score: 5,
//     link:
//       "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-intercession",
//   },
//   {
//     name: "Knowledge",
//     score: 3,
//     link:
//       "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-knowledge",
//   },
//   {
//     name: "Leadership",
//     score: 2,
//     link:
//       "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-leadership",
//   },
//   {
//     name: "Mercy",
//     score: 5,
//     link:
//       "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-mercy",
//   },
//   {
//     name: "Miracles",
//     score: 6,
//     link:
//       "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-miracles",
//   },
//   {
//     name: "Missionary",
//     score: 1,
//     link:
//       "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-missionary",
//   },
//   {
//     name: "Music/Worship",
//     score: 14,
//     link:
//       "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-music",
//   },
//   {
//     name: "Pastor/Shepherd",
//     score: 15,
//     link:
//       "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-pastor-shepherd",
//   },
//   {
//     name: "Prophecy",
//     score: 5,
//     link:
//       "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-prophecy",
//   },
//   {
//     name: "Service",
//     score: 5,
//     link:
//       "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-service",
//   },
//   {
//     name: "Teaching",
//     score: 7,
//     link:
//       "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-teaching",
//   },
//   {
//     name: "Tongues",
//     score: 7,
//     link:
//       "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-tongues-and-its-interpretation",
//   },
//   {
//     name: "Wisdom",
//     score: 5,
//     link:
//       "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-wisdom",
//   },
// ]
// const initialState = {
//   view: "assessing",
//   activeQ: spiritualGiftsQuestions.length,
// }

// FOR PRODUCTION
const gifts = [
  {
    name: "Administration",
    score: 0,
    link:
      "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-administration",
  },
  {
    name: "Apostleship",
    score: 0,
    link:
      "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-apostleship",
  },
  {
    name: "Craftsmanship",
    score: 0,
    link:
      "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-craftsmanship",
  },
  {
    name: "Discernment",
    score: 0,
    link:
      "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-discerning-spirits",
  },
  {
    name: "Evangelism",
    score: 0,
    link:
      "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-evangelism",
  },
  {
    name: "Exhortation",
    score: 0,
    link:
      "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-exhortation",
  },
  {
    name: "Faith",
    score: 0,
    link:
      "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-faith",
  },
  {
    name: "Giving",
    score: 0,
    link:
      "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-giving",
  },
  {
    name: "Healing",
    score: 10,
    link:
      "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-healing",
  },
  {
    name: "Helps",
    score: 10,
    link:
      "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-helps",
  },
  {
    name: "Hospitality",
    score: 10,
    link:
      "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-hospitality",
  },
  {
    name: "Intercession",
    score: 0,
    link:
      "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-intercession",
  },
  {
    name: "Knowledge",
    score: 0,
    link:
      "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-knowledge",
  },
  {
    name: "Leadership",
    score: 0,
    link:
      "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-leadership",
  },
  {
    name: "Mercy",
    score: 0,
    link:
      "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-mercy",
  },
  {
    name: "Miracles",
    score: 0,
    link:
      "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-miracles",
  },
  {
    name: "Missionary",
    score: 0,
    link:
      "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-missionary",
  },
  {
    name: "Music/Worship",
    score: 10,
    link:
      "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-music",
  },
  {
    name: "Pastor/Shepherd",
    score: 10,
    link:
      "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-pastor-shepherd",
  },
  {
    name: "Prophecy",
    score: 0,
    link:
      "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-prophecy",
  },
  {
    name: "Service",
    score: 0,
    link:
      "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-service",
  },
  {
    name: "Teaching",
    score: 0,
    link:
      "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-teaching",
  },
  {
    name: "Tongues",
    score: 0,
    link:
      "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-tongues-and-its-interpretation",
  },
  {
    name: "Wisdom",
    score: 0,
    link:
      "https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-wisdom",
  },
]
const initialState = {
  view: "assessing",
  activeQ: 1,
}

const initialize = () => {
  return gifts.map(gift => ({ ...gift, score: 0 }))
}

const reducer = (state, action) => {
  const { activeQ } = state
  const { type, payload } = action

  switch (type) {
    case "confirm reset":
      return { ...state, view: "resetting" }
    case "cancel":
      return { ...state, view: "assessing" }
    case "reset":
      return initialState
    case "present":
      return { ...state, view: "presenting" }
    case "submit":
      return {
        ...state,
        view: "submitting",
      }
    case "next":
      return {
        view:
          activeQ === spiritualGiftsQuestions.length
            ? "submitting"
            : "assessing",
        activeQ:
          activeQ === spiritualGiftsQuestions.length ? activeQ : activeQ + 1,
      }
    default:
      return state
  }
}

const SpiritualGifts = ({ open, setOpen, className }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // destructure state to make it easier to access
  const { view, activeQ } = state

  // this is used to tally the question results & to minimize re-renders by not holding values in state
  const tally = useRef([...gifts])
  const currentSelection = useRef()

  // set current selection on each render (as opposed to the first only in the useRef hook)
  currentSelection.current = 2

  // if we render and we're on the first question reset the tally counter
  if (activeQ === 1) {
    tally.current = initialize()
  }

  // get current question for easy access
  const question = questions[activeQ - 1]

  const tallyQuestion = () => {
    const giftIndex = gifts.findIndex(gift => gift.name === question.type)
    const score = tally.current[giftIndex].score
    tally.current[giftIndex].score = score + currentSelection.current
  }

  const getResults = () => {
    const giftScores = [...tally.current]

    // create a new array that is the length of the possible scores (15 in this case).
    // this array will be filled with an array holding each question that scored that number.
    // I can then sort these, which is just better UX, but it will also allow me to more easily get the display results.
    let scoreArray = new Array(16).fill([])

    // iterate through the gifts and push the gifts into the array based on its score
    giftScores.forEach(gift => {
      scoreArray[gift.score] = scoreArray[gift.score].concat([gift])
    })

    // sort each score group by name, simply for UX
    scoreArray.forEach(score =>
      score.sort((a, b) => {
        if (a.name > b.name) return 1
        if (a.name < b.name) return -1
      })
    )

    // reverse the array so the highest scores are first
    scoreArray = scoreArray.reverse()

    // set some variables to be use by the do...while loop
    let finalScoreArray = []
    let loopIndex = 0
    let haveGifts = false

    // loop gets the "correct" number of gifts by adding items to the finalScoreArray until it has 3-5
    do {
      // add the current set of scores to the array
      finalScoreArray = finalScoreArray.concat([...scoreArray[loopIndex]])

      // get the length of the array now
      const len = finalScoreArray.length

      // check how many "top scores" there are
      if (len < 3) {
        // if not enough increment and run again
        loopIndex++
      } else if (len > 5) {
        // if too many
        haveGifts = true
      } else {
        // in the sweet spot between 3 and 5
        const nextLen = scoreArray[loopIndex + 1].length
        // find out if I get one more grouping that will be too many
        if (len + nextLen > 5) {
          // if it will be too many we'll jump out
          haveGifts = true
        } else {
          // if I can add and stay between 3 and 5 increment and run the loop again
          loopIndex++
        }
      }
    } while (haveGifts === false)

    tally.current = finalScoreArray.map(item => ({
      gift: item.name,
      perc: `${Math.ceil((item.score / 15) * 100)}%`,
      link: item.link,
    }))
  }

  // helper function to handle next vs submit logic
  const handleNext = () => {
    tallyQuestion()
    if (activeQ === questions.length) {
      getResults()
      dispatch({
        type: "submit",
        payload: tally.current,
      })
    } else dispatch({ type: "next" })
  }

  const ModalContent = () => {
    switch (view) {
      case "resetting":
        return (
          <>
            <ModalBody className="assessment px-5 mx-3 mt-0">
              <h1 className="my-auto h3 text-center">
                Are you sure you want to reset the assessment?
              </h1>
            </ModalBody>
            <ModalFooter className="p-4 d-flex justify-content-end">
              <Button
                color="danger"
                type="button"
                className="text-white"
                onClick={() => dispatch({ type: "reset" })}
              >
                Reset
              </Button>
              <Button
                type="button"
                className="text-white"
                onClick={() => dispatch({ type: "cancel" })}
              >
                Cancel
              </Button>
            </ModalFooter>
          </>
        )
      case "submitting":
        return (
          <SubmitResults
            dispatch={dispatch}
            type="Spiritual Gifts"
            results={tally.current}
          />
        )
      case "presenting":
        return (
          <>
            <ModalBody className="assessment my-auto">
              <SpiritualGiftsResults display={tally.current} />
              <p className="text-muted mb-2 font-italic">
                ** Click any of the gifts to view resources **
              </p>
            </ModalBody>
            <ModalFooter className="p-4 d-flex justify-content-end">
              <Button
                type="button"
                className="text-white"
                // color="primary"
                onClick={() => {
                  setOpen(false)
                  setTimeout(() => {
                    dispatch({ type: "reset" })
                  }, 500)
                }}
              >
                Exit
              </Button>
            </ModalFooter>
          </>
        )
      case "assessing":
      default:
        return (
          <>
            <ModalBody className="assessment flex-grow-1 pb-4 pt-5 mt-0 pb-md-5">
              <p className="h3 mt-5 text-center" style={{ height: "120px" }}>
                {question.question}
              </p>
              <RadioButtons currentSelection={currentSelection} />
            </ModalBody>
            <ModalFooter className="p-4 d-flex justify-content-between">
              <p className="mr-auto ml-3">
                {activeQ} of {questions.length}
              </p>
              <Button
                color="danger"
                type="button"
                className="w-auto text-white"
                onClick={() => dispatch({ type: "confirm reset" })}
                disabled={activeQ === 1}
              >
                Reset
              </Button>
              <Button
                color="primary"
                className="text-white"
                type="button"
                onClick={() => handleNext()}
              >
                {activeQ === questions.length ? "Submit" : "Next"}
              </Button>
            </ModalFooter>
          </>
        )
    }
  }

  return (
    <Modal
      isOpen={open}
      toggle={() => setOpen(false)}
      contentClassName=""
      className={className}
    >
      <CloseButton setOpen={setOpen} />
      <ModalContent />
    </Modal>
  )
}

export default SpiritualGifts
