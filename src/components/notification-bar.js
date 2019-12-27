import React, { useState, useEffect, useRef } from "react"
import { useStaticQuery, graphql } from "gatsby"

import { Alert, Container } from "reactstrap"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const NotificationBar = () => {
  const { notificationBars } = useStaticQuery(graphql`
    {
      notificationBars: allContentfulNotificationBar(
        filter: { showBar: { eq: true } }
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

  const now = new Date().toISOString()

  const activeBar = notificationBars.all.find(bar => bar.autoOff > now)

  const [showNotificationBar, setShowNotificationBar] = useState(
    activeBar === undefined ? false : true
  )

  // const alertRef = useRef()


  // useEffect(() => {
  //   console.log(alertRef.current.clientHeight)
  // }, [])
 
  // useEffect(() => {
  //   const navbar = document.getElementById("navbar-main")
  //   if (showNotificationBar === true) {
  //     navbar.style.marginTop = `${alertRef.current.clientHeight}px`
  //   } else {
  //     navbar.style.marginTop = "0px"
  //   }
  // }, [showNotificationBar])

  return showNotificationBar === false ? null : (
    // <div  >
      <Alert
        color="info"
        className="mb-0  position-relative"
        fade={false}
        style={{ textAlign: "center" }}
      >
        <Container style={{padding: "0 24px"}}>
          {/* <span style={{ textDecoration: "underline", fontWeight: "bold" }}>
            {activeBar.title}
          </span> */}
          {/* <br /> */}
          <span style={{fontWeight: 400}}>{activeBar.text}</span>

          <button
            className="text-muted p-0 m-0 position-absolute d-flex align-items-center justify-content-center bg-info"
            style={{
              border: "none",
              right: "0px",
              top: "0px",
              height: "100%",
              width: '40px',
            }}
            onClick={() => setShowNotificationBar(false)}
          >
            <FontAwesomeIcon icon={faTimes} color="white" />
          </button>
        </Container>
      </Alert>
    // </div>
  )
}

export default NotificationBar
