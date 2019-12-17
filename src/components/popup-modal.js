import React from "react"
// reactstrap components
import { Modal, Button } from "reactstrap"

const PopupModal = props => {
  // const [] = React.useState(false)
  const { modalState, setModalState } = props

  return (
    <>
      {/* <Button color="primary" type="button" onClick={() => setLiveDemo(true)}>
        Launch demo modal
      </Button> */}
      <Modal isOpen={modalState} toggle={() => setModalState(false)}>
        <div className="modal-header">
          <h3>Pardon The Mess</h3>
          <h6>We're Renovating</h6>
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
          <p>
            Over the next few weeks we're completely overhauling
            pathwaymarietta.com. So for now, you'll notice there's not much
            here.
          </p>
          <p>
            While we're getting all settled in check out our{" "}
            <a
              href="https://www.facebook.com/pathwaymarietta/"
              target="blank"
              rel="noopener noreferrer"
            >
              Facebook page
            </a>
            , and be sure to check back soon to see our new site!
          </p>
        </div>
      </Modal>
    </>
  )
}

export default PopupModal
