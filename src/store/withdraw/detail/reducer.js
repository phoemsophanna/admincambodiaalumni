import { RESET_WITHDRAW_SHOW_DETAIL_FLAG, WITHDRAW_SHOW_DETAIL, WITHDRAW_SHOW_DETAIL_FAILED, WITHDRAW_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

const initialState = {
	withdraw: null,
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const WithdrawDetailReducer = (state = initialState, action) => {
	switch (action.type) {
		case WITHDRAW_SHOW_DETAIL:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case WITHDRAW_SHOW_DETAIL_SUCCESSFUL:
			state = {
				...state,
				withdraw: action.payload.withdraw,
				message: "Fetch withdraw successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case WITHDRAW_SHOW_DETAIL_FAILED:
			state = {
				...state,
				withdraw: null,
				message: "Fetch withdraw failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_WITHDRAW_SHOW_DETAIL_FLAG:
			state = {
				...state,
				withdraw: null,
				message: null,
				isLoading: false,
				success: false,
				error: false,
			};
			break;
		default:
			state = { ...state };
			break;
	}

	return state;
};

export default WithdrawDetailReducer;
