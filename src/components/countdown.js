import React, { useState, useEffect } from "react"
import { Button } from "reactstrap"
import { graphql, useStaticQuery } from "gatsby"

import "./countdown.css"

const Countdown = () => {
  // const setNextSunday = d => {
  //   d.setDate(d.getDate() + ((5 + 7 - d.getDay()) % 7))
  //   return d
  // }
  // const setNextSundayFromSunday = d => {
  //   const days = 7 - d.getDay() + 5
  //   const nextSunday = new Date(d.setDate(d.getDate() + days))
  //   return nextSunday
  // }

  // const setTime = d => {
  //   d.setHours(10)
  //   d.setMinutes(30)
  //   d.setSeconds(0)
  //   return d
  // }

  // // if it's after Sunday at 11:30a set to next Sunday
  // const findNextSunday = () => {
  //   if (nextStream.getDay() !== 5) {
  //     nextStream = setNextSunday(nextStream)
  //   } else if (nextStream.getHours() === 11 && nextStream.getMinutes() >= 30) {
  //     nextStream = setNextSundayFromSunday(nextStream)
  //   } else if (nextStream.getHours() > 11) {
  //     nextStream = setNextSundayFromSunday(nextStream)
  //   }
  //   // now that the date is right, set the time to 10:30am
  //   nextStream = setTime(nextStream)
  // }

  const data = useStaticQuery(graphql`
    {
      streams: allContentfulStreamingVideo(
        sort: { fields: dateTime, order: ASC }
      ) {
        all: nodes {
          videoId
          dateTime
        }
      }
      message: contentfulMessage {
        fields {
          slug
        }
        series: messageSeries {
          fields {
            slug
          }
        }
      }
    }
  `)

  const now = new Date()
  let streamData = data.streams.all.find(stream => {
    const d = new Date(stream.dateTime)
    return d > now
  })

  let next = new Date(streamData.dateTime).getTime()
  next = new Date(2020, 2, 20, 14).getTime()

  // if (typeof streamData === "undefined") {
  //   findNextSunday()
  // }

  // const next = next2.getTime()

  const [time, setTime] = useState(next - Date.now())

  useEffect(() => {
    setTimeout(() => {
      setTime(next - Date.now())
    }, 1000)
  }, [time])

  // let nextStream = next
  const timeLeft = next - Date.now()

  // initialize state to number of seconds left before next Sunday at 10:30am
  // const [timeLeft, setTimeLeft] = useState(
  //   Math.floor(nextStream.getTime() - Date.now())
  // )

  // useEffect(() => {
  //   if (timeLeft > 0) {
  //     setTimeout(() => {
  //       setTimeLeft(timeLeft - 1000)
  //     }, 1000)
  //   }
  // }, [timeLeft])

  return (
    <>
      {/* <div>
        <h2>{time}</h2>
        {time > 0 && (
          <h2>
            {Math.floor(time / 86400000)
              .toString()
              .padStart(2, "0")}
            <span className="colon" />
            {Math.floor((time / 3600000) % 24)
              .toString()
              .padStart(2, "0")}
            <span className="colon" />
            {Math.floor((time / 60000) % 60)
              .toString()
              .padStart(2, "0")}
            <span className="colon" />
            {Math.floor((time / 1000) % 60)
              .toString()
              .padStart(2, "0")}
          </h2>
        )}
        <h2>{next - Date.now()}</h2>
      </div> */}

      <div className="countdownContainer mt-4 d-flex justify-content-center text-light">
        {timeLeft > 0 ? (
          <div className="countdownGrid">
            <div className="h4 streamingTitle">{`streaming in`}</div>
            <div className="timer days">
              {Math.floor(time / 86400000)
                .toString()
                .padStart(2, "0")}
              <div className="label" aria-label="days">
                dys
              </div>
            </div>
            <span className="timer colon" />
            <div className="timer hours">
              {Math.floor((time / 3600000) % 24)
                .toString()
                .padStart(2, "0")}
              <div className="label" aria-label="hours">
                hrs
              </div>
            </div>
            <span className="timer colon" />
            <div className="timer minutes">
              {Math.floor((time / 60000) % 60)
                .toString()
                .padStart(2, "0")}
              <div className="label" aria-label="minutes">
                mns
              </div>
            </div>
            <span className="timer colon" />
            <div className="timer seconds">
              {Math.floor((time / 1000) % 60)
                .toString()
                .padStart(2, "0")}
              <div className="label" aria-label="seconds">
                scs
              </div>
            </div>
            <div className="lastStreamButton">
              <Button
                color="primary"
                size="lg"
                className="mt-5"
                href={`/messages/series${data.message.series.fields.slug}${data.message.fields.slug}`}
              >
                <i className="nc-icon nc-button-play mr-2" />
                Watch Last Stream
              </Button>
            </div>
          </div>
        ) : (
          <div className="container liveContainer">
            <div className="row">
              <div className="col">
                <div className="timer">We're streaming now</div>
              </div>
            </div>
            <Button
              color="primary"
              size="lg"
              href={`https://www.facebook.com/watch/live/?v=503812663636183`}
              rel="noopener noreferrer"
              target="_blank"
              className="mt-5"
            >
              <i className="nc-icon nc-button-play mr-2" />
              Watch the Livestream
            </Button>
          </div>
        )}
      </div>
      <h1>{streamData.videoId}</h1>
      <h1>{streamData.videoId - 1}</h1>
    </>
  )
}

export default Countdown
