import Link from "antd/lib/typography/Link";
import React, { useEffect } from "react";
import { images } from "../../assets/image";
import { tokenSelector } from "../../store/selectors";
import { useSelector } from "react-redux";
import { detectProvider } from "../../api";

function Header() {
  let depositAmount = useSelector(tokenSelector).depositAmount;

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
    <div className="At-Header">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container At-Container">
          <figure className="navbar-brand At-Logo">
            <Link href="/">
              <img
                src={images.logoMain.src}
                className="img-fluid w-50"
                alt="logo"
              />
            </Link>
          </figure>
          <button className="At-Btn px-5">
            Total Balance
            <br />${depositAmount ? depositAmount : "0.00"}
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Header;
