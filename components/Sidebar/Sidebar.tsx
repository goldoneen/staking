import React from 'react';
import Link from 'next/link';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useRouter } from 'next/router';
import { images } from "../../assets/image";
import { useSelector } from 'react-redux';
import { tokenSelector } from '../../store/selectors';

export default function Sidebar() {
    const router = useRouter()

    const token = useSelector(tokenSelector)
    return (
        <aside className='At-sidebarwrapper'>
            <div className='At-sidebar'>
                <div className='At-copyurlarea'>
                    <div className='At-Url'>
                        <span onClick={() => router.push('/StakingPool')}>{token.userAddress ? token.userAddress.slice(0, 11) : `0x9abd872a9`}...</span>

                        <CopyToClipboard text={token.userAddress}
                            onCopy={() => { console.log("copy") }}>
                            <span className='At-btncopyurl'>
                                {/* <button className='At-btncopyurl'> */}
                                <img src={images.copy.src} alt="" />
                                {/* </button> */}
                            </span>
                        </CopyToClipboard>
                    </div>
                    <div className='At-sidebarltf'>
                        <figure>
                            <img src={images.logocopy.src} alt="logo" />
                        </figure>
                        <span>{token.stakedAmount ? token.stakedAmount : 20} LFG</span>
                    </div>
                </div>
               
                <div className='At-navigation'>
                    <nav className='At-Nav'>
                        <ul>
                        <li className={router.pathname === "/StakingPool" ? 'At-Active' : ''}>
                                <Link href="/StakingPool">
                                    <a>Staking</a>
                                </Link>
                            </li>
                            <li className={router.pathname === "/Assets" ? 'At-Active' : ''}>
                                <Link href="/Assets">
                                    <a>Avatar Assets</a>
                                </Link>
                            </li>
                          
                            <li className={router.pathname === "/stats" ? 'At-Active' : ''}>
                                <Link href="/stats">
                                    <a>Stats</a>
                                </Link>
                            </li>
                            <li className={router.pathname === "/claim-tokens" ? 'At-Active' : ''}>
                                <Link href="/claim-tokens">
                                    <a>Claim Tokens</a>
                                </Link>
                            </li>
                            <li>
                                    <a href="https://docsend.com/view/kidq2cwt8uqpe3se" target="_blank"  rel="noreferrer"> LFG tokenomics</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </aside>
    );
}