

export const saveTokenAction = (payload: any) => (dispatch: any) => {
    console.log("payload:-=-=-=", payload)
    return dispatch({
        type: 'SAVE_TOKEN',
        payload
    })
}

export const saveDepositAmountAction = (payload: any) => (dispatch: any) => {
    console.log("payload:-=-=-=", payload)
    return dispatch({
        type: 'SAVE_DEPOSIT_AMOUNT',
        payload
    })
}


