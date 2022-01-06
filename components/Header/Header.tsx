import Link from "antd/lib/typography/Link";
import React, { useEffect } from "react";
import { images } from "../../assets/image";
import { tokenSelector } from "../../store/selectors";
import Dropdown from 'react-bootstrap/Dropdown';
import { useSelector } from "react-redux";
import { detectProvider } from "../../api";
import { useRouter } from 'next/router';

function Header() {
  let depositAmount = useSelector(tokenSelector).depositAmount;

  const router = useRouter()

  const checkProviderConnected = async () => {
    if (depositAmount) {
      try {
        let data: any = await detectProvider();
        if (!data) {
          window.location.reload();
        }
      } catch (error) {
        console.log(`error`, error);
      }
    }
  };

  checkProviderConnected();

  return (
    <header className="At-Header">
      <strong className="At-Logo">
        <Link href="/">
          <img
            src={images.logoMain.src}
            className="img-fluid"
            alt="logo"
          />
        </Link>
      </strong>
      <div className="At-AddNavigation">
        <nav>
          <button className="At-TotalLtf">Total Burn:  50000 LFG</button>
          {(router.pathname !== "/terms-conditions") && <button className=" At-TotalLtf">
             Balance: &nbsp; {depositAmount ? depositAmount : "0.00"} LFG
          </button>}
          {/* <button className="At-btnconnectmetamask">
            <figure>
              <img src={images.metamaskconnect.src} alt="metamask image" />
            </figure>
              <span>Connect Metamask</span>
          </button> */}
          <div className="At-Profiledropdown">
            <Dropdown>
              <Dropdown.Toggle variant="" id="dropdown-basic">
                <figure className='At-UserImage'>
                  <img src={images.userimage.src} alt="user image" />
                </figure>
                <span>My Account</span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Stats</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Avatar Assets</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Claim tokens</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
