import { RESET_PORTFOLIO_SHOW_DETAIL_FLAG, PORTFOLIO_SHOW_DETAIL, PORTFOLIO_SHOW_DETAIL_FAILED, PORTFOLIO_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

const initialState = {
	portfolio: null,
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const PortfolioDetailReducer = (state = initialState, action) => {
	switch (action.type) {
		case PORTFOLIO_SHOW_DETAIL:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case PORTFOLIO_SHOW_DETAIL_SUCCESSFUL:
			state = {
				...state,
				portfolio: action.payload.portfolio,
				message: "Fetch portfolio successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case PORTFOLIO_SHOW_DETAIL_FAILED:
			state = {
				...state,
				portfolio: null,
				message: "Fetch portfolio failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_PORTFOLIO_SHOW_DETAIL_FLAG:
			state = {
				...state,
				portfolio: null,
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

export default PortfolioDetailReducer;
