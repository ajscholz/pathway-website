import React, { useState, useRef } from "react"
import { useStaticQuery, graphql } from "gatsby"

import { Alert, Container } from "reactstrap"

const NotificationBar = () => {
  const { notificationBars } = useStaticQuery(graphql`
    {
      notificationBars: allContentfulNotificationBar(
        filter: { showBar: { eq: true }, autoOff: {} }
        sort: { fields: updatedAt, order: DESC }
      ) {
        all: nodes {
          title
          text
          autoOff
        }
      }
    }
  `)

  const now = new Date()

  const barToShow = notificationBars.all.filter(bar => bar.autoOff < now)

  console.log(notificationBars.all)
  console.log(now)

  const [showNotificationBar, setShowNotificationBar] = useState(
    notificationBars.all.length !== 0
  )
  const alertRef = useRef()
  // useEffect(() => {
  //   const navbar = document.getElementById("navbar-main")
  //   if (showNotificationBar === true) {
  //     navbar.style.marginTop = `${alertRef.current.clientHeight}px`
  //   } else {
  //     navbar.style.marginTop = "0px"
  //   }
  // }, [showNotificationBar])

  return showNotificationBar === false ? null : (
    <div ref={alertRef}>
      <Alert
        color="danger"
        className="mb-0  position-relative"
        fade={false}
        style={{ textAlign: "center" }}
      >
        <Container>
          <span style={{ textDecoration: "underline", fontWeight: "bold" }}>
            {notificationBars.all[0].title}
          </span>
          <br />
          {notificationBars.all[0].text}

          <button
            color="black"
            className="text-muted p-0 m-0 position-absolute"
            style={{
              border: "none",
              background: "transparent",
              right: "10px",
              top: "10px",
            }}
            onClick={() => setShowNotificationBar(false)}
          >
            <span aria-hidden="true">
              <i className="fa fa-times" aria-label="close menu" />
            </span>
          </button>
        </Container>
      </Alert>
    </div>
  )
}

export default NotificationBar
