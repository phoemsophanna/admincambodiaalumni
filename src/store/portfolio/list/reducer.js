import { REFRESH_PORTFOLIO_LIST_FLAG, RESET_PORTFOLIO_LIST_FLAG, PORTFOLIO_LIST, PORTFOLIO_LIST_FAILED, PORTFOLIO_LIST_SUCCESSFUL } from "./actionTypes";

const initialState = {
	portfolios: [],
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const PortfolioListReducer = (state = initialState, action) => {
	switch (action.type) {
		case PORTFOLIO_LIST:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case PORTFOLIO_LIST_SUCCESSFUL:
			state = {
				...state,
				portfolios: action.payload.portfolios,
				message: "Fetch project successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case PORTFOLIO_LIST_FAILED:
			state = {
				...state,
				portfolios: [],
				message: "Fetch project failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_PORTFOLIO_LIST_FLAG:
			state = {
				...state,
				portfolios: [],
				message: null,
				isLoading: false,
				success: false,
				error: false,
			};
			break;
		case REFRESH_PORTFOLIO_LIST_FLAG:
			state = {
				...state,
				isLoading: true,
				success: false,
				error: false,
				message: null,
				portfolios: [],
			};
			break;
		default:
			state = { ...state };
			break;
	}

	return state;
};

export default PortfolioListReducer;
