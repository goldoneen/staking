import { message } from "antd";
import { ethers } from "ethers";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLP_Token } from "../../api";
import { GetStatAction } from "../../api/bakcend.api";
import QuickView from "../../components/QuickView/QuickView";
import { statsSelector } from "../../store/selectors";


export default function Stats() {
    const [stats, setStats] = useState([])
    const [count, setCount] = useState([])
    const [lp_token, setLpToken] = useState<any>();
    const [balance, setBalance] = useState<string>("");
    const [totalLFGStaked, setTotalLFGStaked] = useState<any>(undefined);
    const [error, setError] = useState<boolean>(false);

    const fetchStats = async () => {
        let res = await GetStatAction()
        if (res.success) {
            setStats(res.data.stats)
            setCount(res.data.count)
        }
    }
    useEffect(() => {
        fetchStats()
        setWallet();
    }, [])

    const minText = (date: any) => {
        let min = moment().diff(moment(date), 'minutes')
        if (min > 60 && min < 1440) {
            return `${moment().diff(moment(date), 'hours')} hours`
        }

        if (min > 1440) {
            return `${moment().diff(moment(date), 'days')} days`
        }

        return `${min} mins`
    }

    const setWallet = async () => {
        try {
            let data: any = await getLP_Token();
            // console.log("lp token:-=-=-=", data);
            const balance = await data.lp_token.balanceOf(
                process.env.NEXT_PUBLIC_GAMERSE_GAMERSE_POOL_ADDRESS as string
            );
            // const user = await data.lp_token.balanceOf(
            //   process.env.NEXT_PUBLIC_GAMERSE_GAMERSE_POOL_ADDRESS as string
            // );

            setTotalLFGStaked(Number(ethers.utils.formatEther(balance)).toFixed(2));
            // onGetGamerPools();

            setLpToken(data.lp_token);

            // getBalance(data.lp_token);
            setError(false);
        } catch (error) {
            setError(true);
            notify('Please connect to BSC or BSC Testnet');

        }
    };

    const notify = (value: string) => message.error(value, 2);

    return (
        <div className="At-Assetpageholder">
            <QuickView totalLFGStaked={totalLFGStaked} count={count}/>
            <div className='At-Pagetitle'>
                <h2>Gamerse Stats</h2>
            </div>
            <div className="card mb-4 bg-dark" >
                <div className="card-header">
                    <i className="fas fa-table me-1"></i>
                    Recent transactions
                </div>
                <div className="card-body">
                    <table id="datatablesSimple" className="table table-striped table-dark">
                        <thead>
                            <tr>
                                <th>Txn Hash</th>
                                <th>Method</th>
                                <th>Age</th>
                                <th>From</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        {/* <tfoot>
                            <tr>
                                <th>Txn Hash</th>
                                <th>Method</th>
                                <th>Age</th>
                                <th>From</th>
                                <th>Start date</th>
                            </tr>
                        </tfoot> */}
                        <tbody>
                            {stats && stats.length > 0 && [...stats].reverse().map((s: any, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td><a href={`https://testnet.bscscan.com/tx/${s.hash}`} target={'_blank'}>{s.hash}</a></td>
                                        <td>{s.type}</td>
                                        <td>{minText(s.createdAt)} ago</td>
                                        <td>{s.from}</td>
                                        <td>LFG {s.amount}</td>
                                    </tr>
                                )
                            })}

                            {/* <tr>
                                <td>0x5fcb7dc4ca63a1bec38...</td>
                                <td>Swap Exact ETH F...</td>
                                <td>12 mins ago</td>
                                <td>0x03124d9ef107832409...</td>
                                <td>$170,750</td>
                            </tr>
                            <tr>
                                <td>0x5fcb7dc4ca63a1bec38...</td>
                                <td>Swap Exact ETH F...</td>
                                <td>12 mins ago</td>
                                <td>0x03124d9ef107832409...</td>
                                <td>$86,000</td>
                            </tr>
                            <tr>
                                <td>0x5fcb7dc4ca63a1bec38...</td>
                                <td>Transfer</td>
                                <td>12 mins ago</td>
                                <td>0x03124d9ef107832409...</td>
                                <td>$433,060</td>
                            </tr>
                            <tr>
                                <td>0x5fcb7dc4ca63a1bec38...</td>
                                <td>Transfer</td>
                                <td>12 mins ago</td>
                                <td>0x03124d9ef107832409...</td>
                                <td>$162,700</td>
                            </tr>
                            <tr>
                                <td>0x5fcb7dc4ca63a1bec38...</td>
                                <td>Swap Exact ETH F...</td>
                                <td>12 mins ago</td>
                                <td>0x03124d9ef107832409...</td>
                                <td>$372,000</td>
                            </tr>
                            <tr>
                                <td>0x5fcb7dc4ca63a1bec38...</td>
                                <td>Swap Exact Toke...</td>
                                <td>12 mins ago</td>
                                <td>0x03124d9ef107832409...</td>
                                <td>$137,500</td>
                            </tr>
                            <tr>
                                <td>0x5fcb7dc4ca63a1bec38...</td>
                                <td>Swap Exact Toke...</td>
                                <td>12 mins ago</td>
                                <td>0x03124d9ef107832409...</td>
                                <td>$327,900</td>
                            </tr>
                            <tr>
                                <td>0x5fcb7dc4ca63a1bec38...</td>
                                <td>Swap Exact Toke...</td>
                                <td>12 mins ago</td>
                                <td>0x03124d9ef107832409...</td>
                                <td>$205,500</td>
                            </tr>
                            <tr>
                                <td>0x5fcb7dc4ca63a1bec38...</td>
                                <td>Swap Exact ETH F...</td>
                                <td>12 mins ago</td>
                                <td>0x03124d9ef107832409...</td>
                                <td>$103,600</td>
                            </tr>
                            <tr>
                                <td>0x5fcb7dc4ca63a1bec38...</td>
                                <td>Office Manager</td>
                                <td>12 mins ago</td>
                                <td>0x03124d9ef107832409...</td>
                                <td>$90,560</td>
                            </tr>
                            <tr>
                                <td>0x5fcb7dc4ca63a1bec38...</td>
                                <td>Swap Exact ETH F...</td>
                                <td>12 mins ago</td>
                                <td>0x03124d9ef107832409...</td>
                                <td>$320,800</td>
                            </tr>
                            <tr>
                                <td>0x5fcb7dc4ca63a1bec38...</td>
                                <td>Swap Exact ETH F...</td>
                                <td>12 mins ago</td>
                                <td>0x03124d9ef107832409...</td>
                                <td>$170,750</td>
                            </tr>
                            <tr>
                                <td>0x5fcb7dc4ca63a1bec38...</td>
                                <td>Swap Exact ETH F...</td>
                                <td>12 mins ago</td>
                                <td>0x03124d9ef107832409...</td>
                                <td>$86,000</td>
                            </tr>
                            <tr>
                                <td>0x5fcb7dc4ca63a1bec38...</td>
                                <td>Transfer</td>
                                <td>12 mins ago</td>
                                <td>0x03124d9ef107832409...</td>
                                <td>$433,060</td>
                            </tr>
                            <tr>
                                <td>0x5fcb7dc4ca63a1bec38...</td>
                                <td>Transfer</td>
                                <td>12 mins ago</td>
                                <td>0x03124d9ef107832409...</td>
                                <td>$162,700</td>
                            </tr>
                            <tr>
                                <td>0x5fcb7dc4ca63a1bec38...</td>
                                <td>Swap Exact ETH F...</td>
                                <td>12 mins ago</td>
                                <td>0x03124d9ef107832409...</td>
                                <td>$372,000</td>
                            </tr>
                            <tr>
                                <td>0x5fcb7dc4ca63a1bec38...</td>
                                <td>Swap Exact Toke...</td>
                                <td>12 mins ago</td>
                                <td>0x03124d9ef107832409...</td>
                                <td>$137,500</td>
                            </tr>
                            <tr>
                                <td>0x5fcb7dc4ca63a1bec38...</td>
                                <td>Swap Exact Toke...</td>
                                <td>12 mins ago</td>
                                <td>0x03124d9ef107832409...</td>
                                <td>$327,900</td>
                            </tr>
                            <tr>
                                <td>0x5fcb7dc4ca63a1bec38...</td>
                                <td>Swap Exact Toke...</td>
                                <td>12 mins ago</td>
                                <td>0x03124d9ef107832409...</td>
                                <td>$205,500</td>
                            </tr>
                            <tr>
                                <td>0x5fcb7dc4ca63a1bec38...</td>
                                <td>Swap Exact ETH F...</td>
                                <td>12 mins ago</td>
                                <td>0x03124d9ef107832409...</td>
                                <td>$103,600</td>
                            </tr>
                            <tr>
                                <td>0x5fcb7dc4ca63a1bec38...</td>
                                <td>Office Manager</td>
                                <td>12 mins ago</td>
                                <td>0x03124d9ef107832409...</td>
                                <td>$90,560</td>
                            </tr>
                            <tr>
                                <td>0x5fcb7dc4ca63a1bec38...</td>
                                <td>Swap Exact ETH F...</td>
                                <td>12 mins ago</td>
                                <td>0x03124d9ef107832409...</td>
                                <td>$320,800</td>
                            </tr>
                            <tr>
                                <td>0x5fcb7dc4ca63a1bec38...</td>
                                <td>Swap Exact ETH F...</td>
                                <td>12 mins ago</td>
                                <td>0x03124d9ef107832409...</td>
                                <td>$170,750</td>
                            </tr>
                            <tr>
                                <td>0x5fcb7dc4ca63a1bec38...</td>
                                <td>Swap Exact ETH F...</td>
                                <td>12 mins ago</td>
                                <td>0x03124d9ef107832409...</td>
                                <td>$86,000</td>
                            </tr>
                            <tr>
                                <td>0x5fcb7dc4ca63a1bec38...</td>
                                <td>Transfer</td>
                                <td>12 mins ago</td>
                                <td>0x03124d9ef107832409...</td>
                                <td>$433,060</td>
                            </tr>
                            <tr>
                                <td>0x5fcb7dc4ca63a1bec38...</td>
                                <td>Transfer</td>
                                <td>12 mins ago</td>
                                <td>0x03124d9ef107832409...</td>
                                <td>$162,700</td>
                            </tr>
                            <tr>
                                <td>0x5fcb7dc4ca63a1bec38...</td>
                                <td>Swap Exact ETH F...</td>
                                <td>12 mins ago</td>
                                <td>0x03124d9ef107832409...</td>
                                <td>$372,000</td>
                            </tr>
                            <tr>
                                <td>0x5fcb7dc4ca63a1bec38...</td>
                                <td>Swap Exact Toke...</td>
                                <td>12 mins ago</td>
                                <td>0x03124d9ef107832409...</td>
                                <td>$137,500</td>
                            </tr>
                            <tr>
                                <td>0x5fcb7dc4ca63a1bec38...</td>
                                <td>Swap Exact Toke...</td>
                                <td>12 mins ago</td>
                                <td>0x03124d9ef107832409...</td>
                                <td>$327,900</td>
                            </tr>
                            <tr>
                                <td>0x5fcb7dc4ca63a1bec38...</td>
                                <td>Swap Exact Toke...</td>
                                <td>12 mins ago</td>
                                <td>0x03124d9ef107832409...</td>
                                <td>$205,500</td>
                            </tr>
                            <tr>
                                <td>0x5fcb7dc4ca63a1bec38...</td>
                                <td>Swap Exact ETH F...</td>
                                <td>12 mins ago</td>
                                <td>0x03124d9ef107832409...</td>
                                <td>$103,600</td>
                            </tr>
                            <tr>
                                <td>0x5fcb7dc4ca63a1bec38...</td>
                                <td>Office Manager</td>
                                <td>12 mins ago</td>
                                <td>0x03124d9ef107832409...</td>
                                <td>$90,560</td>
                            </tr> */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}