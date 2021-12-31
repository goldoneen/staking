
import React, { Fragment, useEffect, useState } from 'react'
import { getLP_Token } from '../../api'
import { useRouter } from 'next/router'
import { images } from '../../assets/image'
import ConnectWallet from '../wallet/ConnectWallet'
import styles from "./LandingPage.module.scss"
import Link from 'next/link'
function LandingPage() {
  const [walletPopup, setWalletPopup] = useState(false)
  const [lp_token, setLpToken] = useState(0);
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const connectWallet = async () => {
    if (!window.ethereum) {
      window.open('https://metamask.io')
      return
    }
    setLoading(true)
    let data: any = await getLP_Token()
    console.log("Data:-=-=", data)
    if (data.success) {
      setWallet(data.lp_token)
      router.push({
        pathname: 'StakingPool',
      })
    }
    setLoading(false)
  }

  const setWallet = async (lt: any) => {
    setLpToken(lt)
  }

  useEffect(() => {

    handleScroll()
    connectWallet()
  }, [])

  const handleScroll = () => {
    window.scrollTo(0, 100)
  }

  return (

    <Fragment>
      <section className="At-SectionGap-B35 At-SectionStaking">
        <div className="container At-Container1275">
          <div className="row ">
            <div className="col-12">
              <div className="At-PageTitle">
                <h1 className="At-ColorBlue">GΛMΞRSΞ Staking Pool</h1>
                <h3 className="At-FRegular">
                  Gamerse staking pool for single-sided LFG staking available now!
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="container At-Container1275">
          <div className="row g-4 justify-content-center">
            <div className="col-md-4">
              <div className={styles.AtPoolBox}>
                <figure>
                  <img src={images.pool2.src} alt="" />
                </figure>
                <h2 className="At-ColorBlue">Moon Pool</h2>
                <h3 >90 Days Pool <br /><span className='text-green'>APY</span></h3>
                <div className={styles.AtPoolBoxBottom}>
                  <ul>
                    <li>
                      <h3>

                        Unlock exclusive Gamerse
                      </h3>
                    </li>
                    <li>
                      <h3>

                        NFT avatar after
                      </h3>
                    </li>
                    <li>
                      <h3>
                        staking for full 90 days!
                      </h3>
                    </li>
                  </ul>
                </div>
                <button className="At-Btn At-BtnLightBlue At-Btn200" disabled={lp_token ? true : false} onClick={() => setWalletPopup(true)}>
                  {lp_token ? "Connected" : `Connect Wallet`}
                </button>
                <div className='mt-4'>
                  <Link href='/terms-conditions'>
                    <p className='text-blue cursor-pointer'>Terms &amp; Conditions</p>
                  </Link>
                </div>
              </div>
            </div>
            {/* <div className="col-md-4">
              <div className={styles.AtPoolBox}>
                <figure>
                  <img src={images.pool2.src} alt="" />
                </figure>
                <h2 className="At-ColorBlue">Moon Pool (LFG)</h2>
                <h3 >90 Days Pool <br /><span className='text-green'>APY</span></h3>
                <div className={styles.AtPoolBoxBottom}>
                  <ul>
                    <li>
                      <h3>

                        Unlock exclusive Gamerse
                      </h3>
                    </li>
                    <li>
                      <h3>

                        NFT avatar after
                      </h3>
                    </li>
                    <li>
                      <h3>
                        staking for full 90 days!
                      </h3>
                    </li>
                  </ul>
                </div>
                <button className="At-Btn At-BtnLightBlue At-Btn200" onClick={() => setWalletPopup(true)}>
                  Connect Wallet
                </button>
                <div className='mt-4'>
                  <Link href='/terms-conditions'>
                    <p className='text-blue cursor-pointer'>Terms and Conditions</p>
                  </Link>
                </div>
              </div>
            </div> */}
            {/* col-md-4 ends */}
            {/* <div className="col-md-4">mffdddz
            <div className={styles.AtPoolBox}>
              <figure>
                <img src={images.pool1.src} alt="" />
              </figure>
              <h2 className="At-ColorBlue">Venus Pool</h2>
              <h3>50,000 LFG</h3>
              <div className={styles.AtPoolBoxBottom}>
                <ul>
                  <li>
                    Unlock X avatars
                  </li>
                  <li>
                    Early release drop alerts
                  </li>
                </ul>
              </div>
              <button className="At-Btn At-BtnLightBlue At-Btn200" onClick={() => setWalletPopup(true)}>
                Connect Wallet
              </button>
            </div>
          </div> */}
            {/* col-md-4 ends */}
            {/* <div className="col-md-4">
            <div className={styles.AtPoolBox}>
              <figure>
                <img src={images.pool3.src} alt="" />
              </figure>
              <h2 className="At-ColorBlue">Mars Pool</h2>
              <h3 className={styles.AtSecondHeading}>5,000 LFG</h3>
              <div className={styles.AtPoolBoxBottom}>
                <ul>
                  <li>
                    Unlock X avatars
                  </li>
                  <li>
                    Early release drop alerts
                  </li>
                </ul>
              </div>
              <button className="At-Btn At-BtnLightBlue At-Btn200" onClick={() => setWalletPopup(true)}>
                Connect Wallet
              </button>
            </div>
          </div> */}

            {/* col-md-4 ends */}
          </div>
        </div>
      </section>
      <ConnectWallet setWallet={setWallet} lp_token={lp_token} open={walletPopup} onClose={setWalletPopup} />

    </Fragment>
  )
}

export default LandingPage
