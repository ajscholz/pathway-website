import React from "react"
import { Container, Col, Row, Button } from "reactstrap"
import ReactPlayer from "react-player/lib/players/Vimeo"

const SundayVideo = ({ stream }) => {
  return (
    <div
      className="position-absolute h-100 w-100 d-flex justify-content-center align-items-center"
      style={{
        top: 0,
        left: 0,
        zIndex: 1000,
        background: "rgba(0,0,0,0.6)",
      }}
    >
      <Container>
        <Row>
          <Col
            lg={{ size: 8, offset: 2 }}
            md={{ size: 10, offset: 1 }}
            className="mt-4"
          >
            <h2 className="text-center mt-0">Worship online today</h2>
            <div
              className="mt-5"
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
            <div
              style={{
                display: "flex",
                marginTop: "2rem",
                justifyContent: "center",
              }}
            >
              <Button
                size="lg"
                color="primary"
                href="https://pathwaymarietta.churchcenter.com/people/forms/112445?open-in-church-center-modal=true"
              >
                Connect Card
              </Button>
              <Button
                size="lg"
                color="primary"
                href="https://pathwaymarietta.churchcenter.com/people/forms/112445?open-in-church-center-modal=true"
                style={{ marginLeft: "1.25rem" }}
              >
                Give now
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default SundayVideo
