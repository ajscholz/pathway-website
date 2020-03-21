import React, { useState, useEffect, useRef } from "react"
import { Button, Col, Row } from "reactstrap"
import { graphql, useStaticQuery } from "gatsby"

import "./countdown.css"

const initialize = () => {
  return {
    first: true,
    over: false,
    time: null,
    length: undefined,
    next: undefined,
    streaming: false,
    shouldUpdate: true,
  }
}

const Countdown = () => {
  const data = useStaticQuery(graphql`
    {
      streams: allContentfulStreamingVideo(
        sort: { fields: dateTime, order: ASC }
      ) {
        all: nodes {
          videoUrl
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

  const vidRef = useRef()

  const [state, setState] = useState({
    first: true,
    over: false,
    time: null,
    length: undefined,
    next: undefined,
    streaming: false,
    shouldUpdate: true,
  })

  useEffect(() => {
    if (state.first) {
      const { all } = data.streams
      let length = 0
      let streaming = false
      let end
      let next = new Date(
        typeof window !== "undefined" && window.sessionStorage.nextSunday
      )
      const index = data.streams.all.findIndex(stream => {
        let dateTime = new Date(stream.dateTime)
        end = dateTime.getTime() + stream.length * 60000
        end = new Date(end)
        return end > Date.now()
      })

      if (index !== -1) {
        length = all[index].length
        next = new Date(all[index].dateTime)
        streaming = next < Date.now() && next < end ? true : false
        vidRef.current = all[index].videoUrl
      }
      // if (next  Date.now()) {
      //   next.setDate(next.getDate() + 7)
      //   next = new Date(next)
      // }

      setState({
        ...state,
        time: next - Date.now(),
        next: next,
        length: length * 60000,
        first: false,
        streaming: streaming,
      })
    } else if (state.shouldUpdate) {
      setTimeout(() => {
        const newTime = state.next - Date.now()
        setState({
          ...state,
          time: newTime,
          streaming: newTime > 0 || state.over === true ? false : true,
          over: newTime < -state.length ? true : false,
          shouldUpdate: state.over ? false : true,
        })
      }, 995)
    }

    return () => ({ ...state, shouldUpdate: false })
  }, [data.streams, state])

  useEffect(() => {
    if (state.over) {
      setState(initialize())
    }
  }, [state.shouldUpdate, state.over])
  return state.time === null ? null : (
    <>
      <div
        className="content-center h-100 d-flex flex-column justify-content-center"
        style={{ backgroundColor: state.streaming && "rgba(0,0,0,.6)" }}
      >
        <div className="countdownContainer mt-4 d-flex justify-content-center text-light">
          {!state.streaming || vidRef.current === undefined ? (
            <div className="countdownGrid">
              <div className="h4 streamingTitle">{`streaming in`}</div>
              <div className="timer days">
                {Math.floor(state.time / 86400000)
                  .toString()
                  .padStart(2, "0")}
                <div className="label" aria-label="days">
                  dys
                </div>
              </div>
              <span className="timer colon" />
              <div className="timer hours">
                {Math.floor((state.time / 3600000) % 24)
                  .toString()
                  .padStart(2, "0")}
                <div className="label" aria-label="hours">
                  hrs
                </div>
              </div>
              <span className="timer colon" />
              <div className="timer minutes">
                {Math.floor((state.time / 60000) % 60)
                  .toString()
                  .padStart(2, "0")}
                <div className="label" aria-label="minutes">
                  mns
                </div>
              </div>
              <span className="timer colon" />
              <div className="timer seconds">
                {Math.floor((state.time / 1000) % 60)
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
                      title="facebook-iframe"
                      src={vidRef.current}
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
