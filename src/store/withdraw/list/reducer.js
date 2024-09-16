import { REFRESH_WITHDRAW_LIST_FLAG, RESET_WITHDRAW_LIST_FLAG, WITHDRAW_LIST, WITHDRAW_LIST_FAILED, WITHDRAW_LIST_SUCCESSFUL } from "./actionTypes";

const initialState = {
	withdraws: [],
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const WithdrawListReducer = (state = initialState, action) => {
	switch (action.type) {
		case WITHDRAW_LIST:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case WITHDRAW_LIST_SUCCESSFUL:
			state = {
				...state,
				withdraws: action.payload.withdraws,
				message: "Fetch withdraw successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case WITHDRAW_LIST_FAILED:
			state = {
				...state,
				withdraws: [],
				message: "Fetch withdraw failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_WITHDRAW_LIST_FLAG:
			state = {
				...state,
				withdraws: [],
				message: null,
				isLoading: false,
				success: false,
				error: false,
			};
			break;
		case REFRESH_WITHDRAW_LIST_FLAG:
			state = {
				...state,
				isLoading: true,
				success: false,
				error: false,
				message: null,
				withdraws: [],
			};
			break;
		default:
			state = { ...state };
			break;
	}

	return state;
};

export default WithdrawListReducer;
