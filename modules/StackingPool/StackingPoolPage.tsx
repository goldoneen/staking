import React, { Fragment, useEffect, useState } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { images } from "../../assets/image";
import styles from "./StakingPoolComponent.module.scss";
import StackToken from "../wallet/StackToken";
import ConnectedWalletPopup from "../wallet/ConnectedWalletPopup";
import { getBlockNumber, getGamersePool, getLP_Token } from "../../api";
import { saveDepositAmountAction } from "../../store/actions";
import moment from "moment";
import Countdown from "react-countdown";
import { message } from 'antd';
import WalletConnectProvider from "@walletconnect/web3-provider";
import { providerListner } from "../../api/ethereum";

const initStakingData = [
  {
    id: 1,
    role: "Moon Pool",
    apyDays: 90,
    percentage: "60.00",
    finished: true,
    isDeposit: false,
  },
  // {
  //     id: 2,
  //     role: "Venus Pool",
  //     apyDays: 60,
  //     percentage: "90.00",
  //     finished: false,
  //     isDeposit: false,
  // },
  // {
  //     id: 3,
  //     role: "Mars Pool",
  //     apyDays: 90,
  //     percentage: "120.00",
  //     finished: false,
  //     isDeposit: false,
  // }
];

function StackingPoolPage() {
  // const { Countdown } = Statistic;
  const startDate = React.useRef(Date.now());
  const [openStackPopup, setOpenStackPopup] = useState(false);
  const [claimLoading, setClaimLoading] = useState(false);
  const [showTime, setShowTime] = useState<boolean>(false);
  const [depositedAmount, setDeposit] = useState("");
  const [StakingData, setStakingData] = useState([...initStakingData]);
  const [selectedStakingData, setSelectedStakingData] =
    useState<any>(undefined);
  const [walletType, setWalletType] = useState<number>();
  const [btnstate, setBtnState] = useState<number>();
  const [lp_token, setLpToken] = useState<any>();
  const [balance, setBalance] = useState<string>("");
  const [userAdd, setUserAdd] = useState<string>("");
  const [penaltyFee, setPenaltyFee] = useState<string>("");
  const [programDuration, setProgramDuration] = useState("");
  const [pendingRewards, setPendingRewards] = useState<string>("");
  const [redeemableAmount, setRedeemableAmount] = useState<string>("");
  const [minAmountToStake, setMinAmountToStake] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [hideTimeText, setHideTimeText] = useState<boolean>(false);

  const router = useRouter();

  const dispatch = useDispatch();

  const [gamersePool, setGamersePool] = useState<any>(undefined);
  const [totalLFGStaked, setTotalLFGStaked] = useState<any>(undefined);
  const [adStartBlock, setAdStartBlock] = useState<any>(undefined);
  const [blockNumber, setBlockNumber] = useState<any>(undefined);
  const [showFinishbadge, setShowFinishbadge] = useState(false);
  const [penaltyUntil, setPenaltyUntil] = useState<any>(undefined);

  useEffect(() => {
    setWallet();
  }, [depositedAmount]);

  useEffect(() => {
    if (gamersePool) {
      getUSer();
    }
  }, [gamersePool]);

  useEffect(() => {
    window.addEventListener("load", function () {
      providerListner();
    });
  }, []);

  const notify = (value: string) => message.error(value, 2);

  useEffect(() => {
    if (userAdd && gamersePool) {
      setInterval(() => {
        getPendingRewars(gamersePool);
      }, 10000);
    }
  }, [userAdd, gamersePool]);

  const compareBlockNumber = async () => {
    let endBlockNumber = await gamersePool.bonusEndBlock();
    let endNumber = ethers.utils.commify(endBlockNumber);
    if (endNumber.includes(",")) {
      endNumber = endNumber.replace(/\,/g, "");
    }

    let newBlockNumber: any = await getBlockNumber();
    setBlockNumber(Number(newBlockNumber.providerBlockNum));
    console.log(
      "programDuration:-=-=-=",
      newBlockNumber,
      (Number(endNumber) - Number(newBlockNumber.providerBlockNum)) / 26772
    );
    setProgramDuration(
      `${(
        (Number(endNumber) - Number(newBlockNumber.providerBlockNum)) /
        26772
      ).toFixed(2)}`
    );
  };

  const onClickClaim = async () => {
    console.log("run claim:-=-=-=");
    if (!gamersePool) return;
    setClaimLoading(true);
    const tx = await gamersePool.withdraw(0);
    await tx.wait();
    setClaimLoading(false);
    setPendingRewards("0.0000");
  };

  const getPendingRewars = async (e: any) => {
    if (!e) return;
    try {
      const tx = await e.pendingReward(userAdd);
      setPendingRewards(Number(ethers.utils.formatEther(tx)).toFixed(4));
    } catch (error) {
      console.log("errors:-=-=-=", error);
    }
  };

  const getRedeemableAmount = async () => {
    if (!gamersePool) return;
    const tx = await gamersePool.redeemableAmount(userAdd);
    setRedeemableAmount(Number(ethers.utils.formatEther(tx)).toFixed(4));
  };

  const setWallet = async () => {
    try {
      let data: any = await getLP_Token();
      console.log("lp token:-=-=-=", data);
      const balance = await data.lp_token.balanceOf(
        process.env.NEXT_PUBLIC_GAMERSE_GAMERSE_POOL_ADDRESS as string
      );
      const user = await data.lp_token.balanceOf(
        process.env.NEXT_PUBLIC_GAMERSE_GAMERSE_POOL_ADDRESS as string
      );

      setTotalLFGStaked(Number(ethers.utils.formatEther(balance)).toFixed(2));
      onGetGamerPools();

      setLpToken(data.lp_token);

      getBalance(data.lp_token);
      setError(false);
    } catch (error) {
      setError(true);
      notify('Please connect to BSC or BSC Testnet');

    }
  };

  const getBalance = async (lpToken: any) => {
    const signerAddress = await lpToken.signer.getAddress();
    setUserAdd(signerAddress);
    const signerBalance = Number(
      ethers.utils.formatEther(await lpToken.balanceOf(signerAddress))
    ).toFixed(2);
    setBalance(signerBalance);
    dispatch(saveDepositAmountAction(signerBalance));
  };

  const getUSer = async () => {
    try {
      if (!lp_token) return;
      const userInfo = await gamersePool.userInfo(
        await lp_token.signer.getAddress()
      );
      console.log("user info:--=-=-=-=", userInfo);
      setDeposit(ethers.utils.formatEther(userInfo[0]));

      let bigNum = ethers.utils.commify(userInfo[3]);
      if (bigNum.includes(",")) {
        bigNum = bigNum.replace(/\,/g, "");
      }

      let dd = moment(moment.unix(Number(bigNum)).format("DD MMM YYYY"));
      let staked = dd.diff(moment(moment().format("DD MMM YYYY")), "d");

      compareBlockNumber();
      let newAdStartBlock = ethers.utils.commify(userInfo[5]);
      if (newAdStartBlock.includes(",")) {
        newAdStartBlock = newAdStartBlock.replace(/\,/g, "");
      }
      console.log("newAdStartBlock:-=-=-=", newAdStartBlock);

      setAdStartBlock(Number(newAdStartBlock));
      setShowTime(Number(newAdStartBlock) > 0);

      setPenaltyUntil(staked);
      userInfo.map((hex: any, i: number) => {
        console.log("userInfo", i, ethers.utils.formatEther(hex));
      });
    } catch (error) {
      console.log("get User error:-=-=", error);
    }
  };

  const onGetGamerPools = async () => {
    try {
      const data: any = await getGamersePool();

      let penaltyF = await data.gamersePool.penaltyFee();
      let newPenaltyFee = ethers.utils.commify(penaltyF);
      if (newPenaltyFee.includes(",")) {
        newPenaltyFee = newPenaltyFee.replace(/\,/g, "");
      }
      // let withdraw = await data.gamersePool.withdrawLock()

      let minAmount = await data.gamersePool.adMinStakeAmount();
      minAmount = ethers.utils.formatEther(minAmount);

      setMinAmountToStake(minAmount);
      setPenaltyFee(newPenaltyFee);

      setGamersePool(data.gamersePool);
    } catch (error) {
      console.log("get gamers pool error:-=-=", error);
    }
  };

  const calculateCurrentPenalty = () => {
    if (
      pendingRewards &&
      penaltyFee &&
      balance &&
      Number(balance) > 0 &&
      depositedAmount &&
      Number(depositedAmount) > 0
    ) {
      let pFee = `${(Number(pendingRewards) * Number(penaltyFee)) / 10000}`;
      // console.log("Penalty fee:-=-==", pFee, "pending rewards:-=-=", pendingRewards, "penalty fee:==-=", penaltyFee)
      if (pFee) {
        return `${pFee}`;
      }
      return `0`;
    }

    return `0`;
  };

  const showCurrentPenalty: Function = async () => {
    if (gamersePool) {
      let userInfo = await gamersePool.userInfo(userAdd);
      let penaltyUntil = ethers.utils.formatEther(userInfo[1]);
      let blockTimestamp = new Date().valueOf() / 1000;
      return Number(penaltyUntil) <= blockTimestamp ? true : false;
      return true;
    } else false;
  };

  const [connectedPopup, setConnectedPopup] = useState(false);

  const onOpenStackPopup = async (s: any) => {
    if (balance && Number(balance) > 0) {
      // console.log('signer balance', balance)
      setSelectedStakingData(s);
      setOpenStackPopup(true);
    } else {
      notify('You don\'t have enough balance.');
    }
  };

  const closeStackPopup = () => {
    setOpenStackPopup(false);
    setSelectedStakingData(undefined);
  };

  const openConnectedWallet = (s: any) => {
    setSelectedStakingData(s);
    setConnectedPopup(true);
  };

  const closeConnectedWallet = () => {
    setConnectedPopup(false);
    setSelectedStakingData(undefined);
  };

  const chandlePopup = () => {
    setWalletType(undefined);
    setBtnState(undefined);
    setConnectedPopup(false);
  };

  const handleStackDeposit = () => {
    getUSer();
    getBalance(lp_token);
    setHideTimeText(false)
  };

  const apy: number = (((8000000 / totalLFGStaked) * 100) / 100);
  const max = 88000;
  return (
    <Fragment>
      <section className="At-SectionGap-B35 ">
        <div className="container At-Container">
          <div className="row">
            <div className="col-12">
              <div className="At-PageTitle">
                <h1 className="At-ColorBlue">GΛMΞRSΞ Staking Pool</h1>
                <h2 className="At-FRegular">
                  Choose your pool and get rewarded for staking $LFG
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className={`container At-Container1020 At-ContainerStakPool`}>
          <div className="row g-4 justify-content-center">
            {StakingData.map((stack: any, i: number) => (
              <div className="col-6 col-md-4 col-lg-4" key={i}>
                <div className={styles.AtStakingCard}>
                  <div className={styles.AtCardTop}>
                    <div className="row">
                      <div className="w-100 center-between">
                        <div className="col-9">
                          <h2>{stack.role}</h2>
                        </div>
                        <div className="col-3">
                          <figure className={`${styles.AtFigure}`}>
                            <img
                              src={
                                stack.role == "Moon Pool"
                                  ? images.mars.src
                                  : stack.role == "Venus Pool"
                                    ? images.venus.src
                                    : stack.role == "Mars Pool"
                                      ? images.jupiter.src
                                      : images.mars.src
                              }
                              className="img-fluid"
                              alt=""
                            />
                          </figure>
                        </div>
                      </div>
                      <div className="col-12">
                        <ul className="At-StackPoolStatusUl">
                          <li>
                            <p>
                              <i>%</i>APY:{" "}
                              <span className="text-green ms-1">
                                {" "}
                                {totalLFGStaked
                                  ?
                                  (apy > max ? max : (apy).toFixed(2))
                                  : 0}{" "}
                                %{" "}
                              </span>
                            </p>
                          </li>
                          <li>
                            <p>
                              <i className="icon-deposited"></i>Amount Staked:{" "}
                              {depositedAmount ? depositedAmount : 0} LFG
                            </p>
                          </li>
                          <li>
                            <p>
                              <i className="icon-pending"></i>Current Rewards:{" "}
                              {pendingRewards ? pendingRewards : 0} LFG
                            </p>
                          </li>
                          <li>
                            <p>
                              <i className="icon-redeemable"></i> Current
                              Penalty:{" "}
                              {showCurrentPenalty()
                                ? calculateCurrentPenalty()
                                : 0}{" "}
                              {penaltyUntil &&
                                !isNaN(penaltyUntil) &&
                                penaltyUntil > 0
                                ? `until ${penaltyUntil} day(s)`
                                : ""}
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {showFinishbadge && (
                      <h6 className={styles.AtOrangeLabel}>Finished</h6>
                    )}
                  </div>
                  <div className={styles.AtCardBottom}>
                    <div className="row">
                      {adStartBlock > 0 &&
                        depositedAmount &&
                        Number(depositedAmount) >= 10000 &&
                        blockNumber &&
                        (process.env
                          .NEXT_PUBLIC_GAMERSE_AIR_DROP_TIME as string) && (
                          <div className="col">
                            {!hideTimeText && <p>To unlock Avatar NFT air drop</p>}
                            <button className="At-Btn At-BtnSmall mt-2">
                              <Countdown
                                date={
                                  startDate.current +
                                  (Number(
                                    process.env
                                      .NEXT_PUBLIC_GAMERSE_AIR_DROP_TIME as string
                                  ) *
                                   86400 -
                                    (Number(blockNumber) -
                                      Number(adStartBlock)) *
                                    3) *
                                  1000
                                }

                                renderer={({
                                  days,
                                  hours,
                                  minutes,
                                  seconds,
                                  completed,
                                }) => {
                                  if (completed) {
                                    setHideTimeText(true)
                                  }
                                  return (
                                    completed ? <p>NFT has been sent to your wallet</p> : <span>
                                      {Number(days) > 0 ? `${days}d` : ""}{" "}
                                      {hours}h {minutes}m {seconds}s
                                    </span>
                                  );
                                }}
                              />
                            </button>
                          </div>
                        )}
                      {/* <div className="col-3 text-end">
                                                    {gamersePoolBalance && <h5 className='text-green'>{((10 * (0.17 / 0.17)) * Number(gamersePoolBalance)) / 100}%</h5>}
                                                </div> */}
                    </div>
                  </div>
                  <div className={styles.AtBtnHolder}>
                    <div className="row">
                      <div className={"col-12 px-1"}>
                        <button
                          className="At-Btn At-BtnFull py-3 At-BtnLightBlue"
                          type="button"
                          disabled={error}
                          onClick={(e) => {
                            onOpenStackPopup(stack);
                          }}
                        >
                          {"Stake"}
                        </button>
                      </div>
                      {Number(depositedAmount) > 0 && (
                        <>
                          <div className="col-6 px-1 mt-2">
                            <button
                              className="At-Btn At-BtnFull"
                              type="button"
                              disabled={error}
                              onClick={(e) => {
                                openConnectedWallet(stack);
                              }}
                            >
                              {"Unstake"}
                            </button>
                          </div>
                          <div className="col-6 p-0 mt-2 px-1">
                            <button
                              className="At-Btn At-BtnFull AtBtnPurple"
                              type="button"
                              onClick={() => onClickClaim()}
                              disabled={Number(pendingRewards) == 0 || error}
                            >
                              Claim
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {openStackPopup && selectedStakingData && (
        <StackToken
          open={openStackPopup}
          minAmountToStake={minAmountToStake}
          balance={balance}
          selectedStakingData={selectedStakingData}
          handleStackDeposit={handleStackDeposit}
          gamersePool={gamersePool}
          lp_token={lp_token}
          onClose={closeStackPopup}
        />
      )}

      {selectedStakingData && (
        <ConnectedWalletPopup
          open={connectedPopup}
          gamersePool={gamersePool}
          handleStackDeposit={handleStackDeposit}
          depositAmount={depositedAmount}
          lp_token={lp_token}
          onClose={closeConnectedWallet}
        />
      )}
    </Fragment>
  );
}

export default StackingPoolPage;
