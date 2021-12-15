

const initialState: any = {
  lp_token: null,
  depositAmount: ''
};

export const tokenReducer = (state = initialState, action: any): any => {
  switch (action.type) {
    case 'SAVE_TOKEN':

      return { ...state, lp_token: action.payload };
    case 'SAVE_DEPOSIT_AMOUNT':

      return { ...state, depositAmount: action.payload };
    default:
      return state;
  }
};
