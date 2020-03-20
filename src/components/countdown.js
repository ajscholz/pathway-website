import React, { useState, useEffect } from "react"
import { Button, Col, Row } from "reactstrap"
import { graphql, useStaticQuery } from "gatsby"

import "./countdown.css"

const Countdown = () => {
  const data = useStaticQuery(graphql`
    {
      streams: allContentfulStreamingVideo(
        sort: { fields: dateTime, order: ASC }
      ) {
        all: nodes {
          videoId
          dateTime
          length
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
  const [over, setOver] = useState(false)
  const now = new Date()

  const streamData = data.streams.all.find(stream => {
    const d = new Date(stream.dateTime)
    return d > now
  })

  let nextSunday = new Date(
    typeof streamData !== "undefined"
      ? streamData.dateTime
      : typeof window !== "undefined" && window.sessionStorage.nextSunday
  )

  // const length =
  //   typeof streamData === "undefined" ? 0 : streamData.length * 60000

  if (over) {
    const nextDate = nextSunday.getDate() + 7
    nextSunday = new Date(nextSunday.setDate(nextDate))
  }

  let next = nextSunday.getTime()

  const [time, setTime] = useState(next - Date.now())

  useEffect(() => {
    let shouldUpdate = true
    if (shouldUpdate) {
      setTimeout(() => {
        setTime(next - Date.now())
      }, 1000)
    }
    return () => (shouldUpdate = false)
  }, [time, next])

  // useEffect(() => {
  //   if (over === false && time < -length) {
  //     setOver(true)
  //   }
  // })

  return (
    <>
      <div
        className="content-center h-100 d-flex flex-column justify-content-center"
        style={{ backgroundColor: time <= 0 && "rgba(0,0,0,.6)" }}
      >
        <div className="countdownContainer mt-4 d-flex justify-content-center text-light">
          {time > 0 || over ? (
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
                  <div className="timer">Watch Now</div>
                </div>
              </div>
              <Row>
                <Col lg={{ size: 8, offset: 2 }} md={{ size: 10, offset: 1 }}>
                  <div
                    className="mt-5"
                    style={{
                      position: "relative",
                      paddingTop: "56.25%",
                      width: "100%",
                      // maxWidth: "640px",
                    }}
                  >
                    <iframe
                      id="fbook-live"
                      src={`https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fpathwaymarietta%2Fvideos%2F${
                        streamData === undefined ? 1 : streamData.videoId
                      }%2F&width=auto`}
                      // width="640"
                      // height="360"
                      style={{
                        border: "none",
                        // overflow: "hidsen",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                      }}
                      scrolling="no"
                      // frameborder="0"
                      // allowTransparency="true"
                      allowFullScreen={true}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Countdown
