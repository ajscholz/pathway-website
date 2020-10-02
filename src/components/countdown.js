import React, { useState, useEffect, useRef } from "react"
import { Button, Col, Row } from "reactstrap"
import { graphql, useStaticQuery } from "gatsby"

import "./countdown.css"
import ReactPlayer from "react-player"

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
  // const data = useStaticQuery(graphql`
  //   {
  //     streams: allContentfulStreamingVideo(
  //       sort: { fields: dateTime, order: ASC }
  //     ) {
  //       all: nodes {
  //         videoUrl
  //         dateTime
  //         length
  //       }
  //     }
  //     message: contentfulMessage {
  //       fields {
  //         slug
  //       }
  //       series: messageSeries {
  //         fields {
  //           slug
  //         }
  //       }
  //     }
  //   }
  // `)

  // console.log(data)

  // data mirroring what I get from contentful for testing
  const data = {
    streams: {
      all: [
        // {
        //   videoUrl:
        //     "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fpathwaymarietta%2Fvideos%2F503812663636183%2F&width=auto",
        //   dateTime: "2020-03-21T11:30",
        //   length: 70,
        // },
        // {
        //   videoUrl:
        //     "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fpathwaymarietta%2Fvideos%2F961060500963238%2F&width=auto",
        //   dateTime: "2020-03-23T10:30",
        //   length: 60,
        // },
        // {
        //   videoUrl:
        //     "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fpathwaymarietta%2Fvideos%2F961060500963238%2F&width=auto",
        //   dateTime: "2020-03-24T10:30",
        //   length: 60,
        // },
        // {
        //   videoUrl:
        //     "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fpathwaymarietta%2Fvideos%2F961060500963238%2F&width=auto",
        //   dateTime: "2020-04-11T10:30",
        //   length: 60,
        // },
      ],
    },
    message: {
      fields: {
        slug: "/the-Lord-is-near",
      },
      series: {
        fields: {
          slug: "/anxious-for-nothing",
        },
      },
    },
  }

  const vidRef = useRef()
  const nextStreamDate = useRef(new Date())
  const endOfStream = useRef(new Date())
  const streamDataIndex = useRef()

  const [state, setState] = useState({
    first: true,
    over: false,
    time: null,
    length: undefined,
    next: undefined,
    streaming: false,
    shouldUpdate: true,
  })

  // set the date of the next stream to a ref

  //
  const setNextStream = streams => {
    let browserDate =
      typeof window !== "undefined" &&
      new Date(window.sessionStorage.nextSunday)

    // increment weeks until the current stream's end time is BEFORE the browser date -- without this if someone logs on at 10:25 and a stream starts at 10:30 the browser would initialize next stream to 10:30 that same day, which means the next stream date would not be correct
    while (endOfStream.current > browserDate) {
      browserDate = new Date(browserDate.setDate(browserDate.getDate() + 7))
    }

    // same as above but for contentful data -- if I just grabbed the "next" item in the array there could be a duplicate or something. This loop grabs the next item in the array that starts AFTER the current stream ends.
    let i = 0
    while (
      i < streams.length &&
      endOfStream.current > new Date(streams[i].dateTime)
    ) {
      i++
    }

    // this sets "nextItem"
    const nextItem = i === streams.length ? undefined : streams[i]

    // if there is a next item in the streams array, compare its date with the browser date for next sunday and use the closest one
    if (nextItem !== undefined) {
      const nextItemDate = new Date(nextItem.dateTime)
      nextStreamDate.current =
        browserDate < nextItemDate ? browserDate : nextItemDate
    } else {
      // if there is NOT a next item in the streams array, grab the next Sunday date
      nextStreamDate.current = browserDate
    }

    // set to next sunday, unless there's an array item set before that

    // const nextWeekDate = d.getDate() + 7
    // nextWeek = new Date(nextWeek.setDate(nextWeekDate))
    // console.log(nextWeek)
    // nextWeek.setDate()
  }

  useEffect(() => {
    if (state.first) {
      const { all } = data.streams
      let length = 1
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
        streamDataIndex.current = index
        length = all[index].length
        next = new Date(all[index].dateTime)
        streaming = next < Date.now() && next < end ? true : false
        vidRef.current = all[index].videoUrl
      }

      // set the end of the next stream -- this is used to determine when the next stream after next is
      endOfStream.current = new Date(next.getTime() + length * 60000)
      setNextStream(all.slice(index + 1))

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
    <div
      className="content-center h-100 d-flex flex-column justify-content-center"
      style={{ backgroundColor: state.streaming && "rgba(0,0,0,.6)" }}
    >
      <div className="countdownContainer mt-4 d-flex justify-content-center text-light">
        {!state.streaming ? (
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
                <div className="timer">
                  {vidRef.current === undefined
                    ? `Please wait...`
                    : `Watch now`}
                </div>
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
                  }}
                >
                  {vidRef.current === undefined ? (
                    <div className="d-flex align-items-center">
                      <p className="text-center">
                        Sorry, we're having trouble with our livestream today.
                        Please try again.
                      </p>
                    </div>
                  ) : (
                    <iframe
                      title="facebook-iframe"
                      src={vidRef.current}
                      style={{
                        border: "none",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                      }}
                      scrolling="no"
                      allowFullScreen={true}
                    />
                  )}
                </div>
              </Col>
            </Row>
          </div>
        )}
      </div>
      <ReactPlayer
        src={"https://www.facebook.com/pathwaymarietta/videos/961060500963238/"}
      />
    </div>
  )
}

export default Countdown
