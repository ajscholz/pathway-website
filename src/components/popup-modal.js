import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
// reactstrap components
import { Modal, ModalFooter } from "reactstrap"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { setLinkType } from "../utils/functions"

const PopupModal = props => {
  const { popups } = useStaticQuery(graphql`
    {
      popups: allContentfulPopupBanner(
        filter: { active: { eq: true } }
        sort: { fields: autoOff, order: DESC }
      ) {
        nodes {
          heading
          callToAction {
            text
            link
          }
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

  // activePopup.callToAction.push({
  //   text: "Test Button",
  //   link: "https://www.google.com",
  // })

  const [modalState, setModalState] = useState(false)

  useEffect(() => {
    // const visited = localStorage["visitedDate"]

    const now = new Date()
    let threeDaysAgo = new Date(now)
    threeDaysAgo.setDate(now.getDate() - 3)

    // if (visited === undefined || new Date(visited) < threeDaysAgo) {
    //   localStorage.visitedDate = new Date()

    if (activePopup !== undefined) {
      setTimeout(() => {
        setModalState(true)
      }, 5000)
      // }, 0)
    }
  }, [activePopup])

  return activePopup === undefined ? null : (
    <>
      <Modal isOpen={modalState} toggle={() => setModalState(false)}>
        <div className="modal-header">
          <h1 className="h3">{activePopup.heading}</h1>
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
        {activePopup.callToAction.length !== 0 && (
          <ModalFooter className="p-3 flex-row-reverse justify-content-start">
            {activePopup.callToAction.map((cta, i) => {
              const props =
                i === 0 ? { color: "primary" } : { className: "text-white" }
              return setLinkType(cta, props)
            })}
          </ModalFooter>
        )}
      </Modal>
    </>
  )
}

export default PopupModal
