import { Modal } from 'antd'
import React from 'react'

function AlertPopup({show,closePopup}:any) {
    return (
        <Modal
      title={<h4>Alert</h4>}
      centered
      visible={show}
      className="At-PlaceBidPopupMain"
      closable={true}
      closeIcon={<i className='icon-close' style={{
          color:"white"
      }}></i>}
      footer={null}
      onCancel={() => closePopup(false)}
      width={450}
    >
      <div className="At-PlaceBidPopup center">
        <h3>
        You are not eligble for this page
        </h3>
      </div>
    </Modal>
    )
}

export default AlertPopup
