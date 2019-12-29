import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
// reactstrap components
import { Modal } from "reactstrap"
import { MDXRenderer } from "gatsby-plugin-mdx"

const PopupModal = props => {
  const { popups } = useStaticQuery(graphql`
    {
      popups: allContentfulPopupBanner(
        filter: { active: { eq: true } }
        sort: { fields: autoOff, order: DESC }
      ) {
        nodes {
          heading
          bodyText {
            childMdx {
              body
            }
          }
          autoOff
        }
      }
    }
  `)

  const now = new Date().toISOString()

  const activePopup = popups.nodes.find(popup => popup.autoOff > now)

  const [modalState, setModalState] = useState(false)

  useEffect(() => {
    const visited = localStorage["visitedDate"]

    const now = new Date()
    let threeDaysAgo = new Date(now)
    threeDaysAgo.setDate(now.getDate() - 3)

    // if (visited === undefined || new Date(visited) < threeDaysAgo) {
    //   localStorage.visitedDate = new Date()

    if (activePopup !== undefined) {
      setTimeout(() => {
        setModalState(true)
      }, 5000)
      // }
    }
  }, [activePopup])

  return activePopup === undefined ? null : (
    <>
      {/* <Button color="primary" type="button" onClick={() => setLiveDemo(true)}>
        Launch demo modal
      </Button> */}
      <Modal isOpen={modalState} toggle={() => setModalState(false)}>
        <div className="modal-header">
          <h3>{activePopup.heading}</h3>
          {activePopup.subHeading && <h6>We're Renovating</h6>}
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => setModalState(false)}
            style={{
              position: "absolute",
              top: "11px",
              right: "20px",
            }}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <MDXRenderer>{activePopup.bodyText.childMdx.body}</MDXRenderer>
        </div>
      </Modal>
    </>
  )
}

export default PopupModal
