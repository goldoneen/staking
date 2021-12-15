import detectEthereumProvider from '@metamask/detect-provider';
import { ethers, Contract } from 'ethers';
import LP_Token from './LP_Token.json';
import GamersePool from './GamersPool.json'
import LFG_Token from './LFG_Token.json'
var provider: any
var signer: any
export const getLP_Token = () =>
    new Promise(async (resolve, reject) => {
        provider = await detectEthereumProvider();
        // console.log("Provider",provider)
        if (provider) {
            await provider.request({ method: 'eth_requestAccounts' });
            const networkId = await provider.request({ method: 'net_version' })
            console.log("networkId", networkId)

            provider = new ethers.providers.Web3Provider(provider);
            // console.log("Provider2",provider)

            signer = provider.getSigner();


            const lp_token = new Contract(
                process.env.NEXT_PUBLIC_GAMERSE_LP_TOKKEN_ADDRESS as string,
                LP_Token.abi,
                signer
            );
            resolve({ success: true, lp_token, message: 'connected' });
            return;
        }
        reject({ success: false, message: 'Install Metamask' });
    });

export const getGamersePool = () =>
    new Promise(async (resolve, reject) => {

        if (provider) {

            const gamersePool = new Contract(
                process.env.NEXT_PUBLIC_GAMERSE_GAMERSE_POOL_ADDRESS as string,
                GamersePool.abi,
                signer
            );
            resolve({ gamersePool });
            return;
        }
        reject('Install Metamask');
    });



export const getLFG_Token = () =>
    new Promise(async (resolve, reject) => {

        if (provider) {

            const lfg_token = new Contract(
                process.env.NEXT_PUBLIC_GAMERSE_LFG_TOKKEN_ADDRESS as string,
                LFG_Token.abi,
                signer
            );
            resolve({ lfg_token });
            return;
        }
        reject('Install Metamask');
    });

export const getBlockNumber = () => {
    return new Promise(async (resolve, reject) => {
        if (provider) {
            const providerBlockNum = await provider.getBlockNumber()

            // console.log("proviceBlockNum:-=-=", providerBlockNum)
            resolve({ providerBlockNum })
            return
        }
        reject('Install Metamask');
    })
}

