import Link from 'antd/lib/typography/Link';
import React from 'react'
import { images } from '../../assets/image';
import { tokenSelector } from '../../store/selectors'
import { useSelector } from 'react-redux'

function Header() {

  let depositAmount = useSelector(tokenSelector).depositAmount
  return (
    <div className="At-Header">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container At-Container">
          <figure className="navbar-brand At-Logo">
            <Link href="/">
              <img src={images.logoMain.src} className="img-fluid w-50" alt="logo" />
            </Link>
          </figure>
          <button className="At-Btn px-5">
            Total Balance
            <br />
            ${depositAmount ? depositAmount : '0.00'}
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Header