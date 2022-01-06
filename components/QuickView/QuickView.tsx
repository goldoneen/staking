import React from 'react'
import { images } from '../../assets/image'

function QuickView() {
    return (
        <div className='AtQuickViewWrapper'>
            <div className="row">
                <div className="col-4">
                    <div className="AtQuickView">
                        <div>
                            <h1>TVL</h1>
                            <p>5000000 LFG</p>
                        </div>
                        <img src={images.ss3.src} alt="" />
                    </div>
                </div>

                <div className="col-4">
                    <div className="AtQuickView">
                        <div>
                            <h1>Total stakers</h1>
                            <p>23498</p>
                        </div>
                        <img src={images.ss1.src} alt="" />
                    </div>
                </div>

            </div>

        </div>
    )
}

export default QuickView
