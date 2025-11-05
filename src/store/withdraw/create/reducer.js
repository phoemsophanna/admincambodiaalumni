import {
	SAVE_WITHDRAW,
	SAVE_WITHDRAW_FAILED,
	SAVE_WITHDRAW_SUCCESSFUL,
	DELETE_WITHDRAW,
	DELETE_WITHDRAW_FAILED,
	DELETE_WITHDRAW_SUCCESSFUL,
	RESET_SAVE_WITHDRAW_FLAG,
} from "./actionTypes";

const initialState = {
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const CreateWithdrawReducer = (state = initialState, action) => {
	switch (action.type) {
		case SAVE_WITHDRAW:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case SAVE_WITHDRAW_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case SAVE_WITHDRAW_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case DELETE_WITHDRAW:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case DELETE_WITHDRAW_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case DELETE_WITHDRAW_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_SAVE_WITHDRAW_FLAG:
			state = {
				...state,
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

export default CreateWithdrawReducer;
