import React, { useState } from 'react'
import { images } from '../assets/image'

function ClaimTokens() {
    const [connectWallet, setConnectWallet] = useState(false)
    return (
        <div className="At-Assetpageholder">
            <section className="At-SectionGap-B35 At-SectionStakin pt-5">
                <div className="container At-Container1275 pt-5">
                    <div className="row mt-5">
                        <div className="col-12 mt-5">
                            <div className="At-PageTitle mt-5">
                                <h1>Claim <span  className="At-ColorBlue">$LFG</span> Tokens</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container w-25'>
                    <div className="At-ConnectWalletPopup">
                        {
                            connectWallet
                                ?
                                <div className="w-100 mt-1">

                                    <button className='At-Btn w-100'>Claim Tokens</button>
                                </div>

                                :
                                <button className="At-Btn AtBlueBorderBtn" onClick={() => setConnectWallet(true)}>
                                    Connect Metamask
                                </button>

                        }
                    </div>

                </div>
            </section>
        </div>
    )
}


export default ClaimTokens
