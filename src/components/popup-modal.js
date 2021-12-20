import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
// reactstrap components
import { Modal, ModalFooter } from "reactstrap"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { setLinkType } from "../utils/functions"

const PopupModal = props => {
  const { popups } = useStaticQuery(graphql`
    {
      popups: allContentfulPopup(limit: 1) {
        all: nodes {
          heading
          text {
            childMdx {
              body
            }
          }
        }
      }
    }
  `)

  const [modalState, setModalState] = useState(false)
  const popup = popups.all[0]

  useEffect(() => {
    // const visited = localStorage["visitedDate"]

    // const now = new Date()
    // let threeDaysAgo = new Date(now)
    // threeDaysAgo.setDate(now.getDate() - 3)

    // if (visited === undefined || new Date(visited) < threeDaysAgo) {
    //   localStorage.visitedDate = new Date()

    if (popup) {
      setTimeout(() => {
        setModalState(true)
      }, 5000)
      // }, 0)
    }
  }, [])

  return popup ? (
    <>
      <Modal isOpen={modalState} toggle={() => setModalState(false)}>
        <div className="modal-header">
          <h1 className="h3">{popup.heading}</h1>
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
          <MDXRenderer>{popup.text.childMdx.body}</MDXRenderer>
        </div>
        {popup.callToAction && (
          <ModalFooter className="p-3 flex-row-reverse justify-content-start">
            {popup.callToAction.map((cta, i) => {
              const props =
                i === 0 ? { color: "primary" } : { className: "text-white" }
              return setLinkType(cta, props)
            })}
          </ModalFooter>
        )}
      </Modal>
    </>
  ) : null
}

export default PopupModal
