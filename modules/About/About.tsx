import React, { Fragment } from "react";
import Link from "next/link";
import { images } from "../../assets/image";
import Card from "../../components/Card/Card";

export default function About() {
    return (
        <Fragment>
            <div className="At-Assetpageholder">
                <div className="At-PageTitle ">
                    <h1 className="At-ColorBlue">Claim Gamerse NFT Avatar</h1>
                </div>
                <div className="At-Aboutusholder">
                    <div className="At-Aboutcardarea">
                        <Card
                            id={'#12345'}
                            button={'Genesis'}
                            image={images.card.src}
                            title={'Gamerse Avatar nft'}
                            price={'Price'}
                            lfg={'500'}
                            blur
                        />
                    </div>
                    <div className="At-Aboutcontent ms-3">
                        <h3>About</h3>
                        <div className="At-Aboutrangebarareahlder">
                            <div className="At-Aboutrangebararea">
                                <span>Drop by 04:20:01:54</span>
                                <div className="At-rangleslide">
                                    <div className="At-rangetop">
                                        <span>5.50%</span>
                                    </div>
                                </div>
                                <ul>
                                    <li>
                                        <span>Avatar</span>
                                    </li>
                                    <li>
                                        <span>DROP</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="At-ownerinfo">
                            <h4>Pending Owner</h4>
                            <div className="At-ownerdetail">
                                <h5>0xE1...3780</h5>
                                <span>(0xE1529D49C62AD0db2E77fd91C9E345e1b9653780)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}