import React from "react"
import { Container, Col, Row, Button } from "reactstrap"
import ReactPlayer from "react-player/lib/players/Vimeo"

const SundayVideo = ({ stream }) => {
  return (
    <div
      className="position-absolute h-100 w-100 d-flex justify-content-center align-items-center flex-wrap"
      style={{
        top: 0,
        left: 0,
        zIndex: 1000,
        background: "rgba(0,0,0,0.6)",
        paddingTop: "98.72px",
      }}
    >
      {/* <div style={{ height: "131.22px", width: "100%" }} /> */}
      <Container>
        <Row>
          <Col
            lg={{ size: 8, offset: 2 }}
            md={{ size: 10, offset: 1 }}
            // className="mt-5"
          >
            <h2 className="text-center mt-n2 mt-sm-0">Worship online today</h2>
            <div
              className="mt-4 mt-sm-5"
              style={{
                position: "relative",
                paddingTop: "56.25%",
                width: "100%",
              }}
            >
              <ReactPlayer
                url={stream.videoUrl}
                style={{
                  position: "absolute",
                  // border: "6px solid rgba(256,256,256,.5",
                  top: 0,
                  left: 0,
                }}
                width="100%"
                height="100%"
                controls={true}
                // light={true}
              />
            </div>
            <div className="container">
              <div className="row mx-5 mx-sm-auto">
                <Button
                  // size="lg"
                  className="col-sm mx-2 mt-3"
                  color="primary"
                  href="https://pathwaymarietta.churchcenter.com/giving?open-in-church-center-modal=true"
                >
                  Give now
                </Button>
                <Button
                  outline
                  className="col-sm mx-2 mt-3"
                  // size="lg"
                  color="primary"
                  href="https://pathwaymarietta.churchcenter.com/people/forms/125762?open-in-church-center-modal=true"
                >
                  Connect Card
                </Button>
                <Button
                  outline
                  className="col-sm mx-2 mt-3"
                  // size="lg"
                  color="primary"
                  href="https://pathwaymarietta.churchcenter.com/people/forms/122952?open-in-church-center-modal=true"
                >
                  Check In
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default SundayVideo
