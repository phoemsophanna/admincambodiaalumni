import {
	SAVE_PORTFOLIO,
	SAVE_PORTFOLIO_FAILED,
	SAVE_PORTFOLIO_SUCCESSFUL,
	DELETE_PORTFOLIO,
	DELETE_PORTFOLIO_FAILED,
	DELETE_PORTFOLIO_SUCCESSFUL,
	RESET_SAVE_PORTFOLIO_FLAG,
} from "./actionTypes";

const initialState = {
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const CreatePortfolioReducer = (state = initialState, action) => {
	switch (action.type) {
		case SAVE_PORTFOLIO:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case SAVE_PORTFOLIO_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case SAVE_PORTFOLIO_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case DELETE_PORTFOLIO:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case DELETE_PORTFOLIO_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case DELETE_PORTFOLIO_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_SAVE_PORTFOLIO_FLAG:
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

export default CreatePortfolioReducer;
