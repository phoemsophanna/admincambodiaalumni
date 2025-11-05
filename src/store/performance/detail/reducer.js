import {
	RESET_PERFORMANCE_SHOW_DETAIL_FLAG,
	PERFORMANCE_SHOW_DETAIL,
	PERFORMANCE_SHOW_DETAIL_FAILED,
	PERFORMANCE_SHOW_DETAIL_SUCCESSFUL,
} from "./actionTypes";

const initialState = {
	performance: null,
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const PerformanceDetailReducer = (state = initialState, action) => {
	switch (action.type) {
		case PERFORMANCE_SHOW_DETAIL:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case PERFORMANCE_SHOW_DETAIL_SUCCESSFUL:
			state = {
				...state,
				performance: action.payload.performance,
				message: "Fetch performance successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case PERFORMANCE_SHOW_DETAIL_FAILED:
			state = {
				...state,
				performance: null,
				message: "Fetch performance failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_PERFORMANCE_SHOW_DETAIL_FLAG:
			state = {
				...state,
				performance: null,
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

export default PerformanceDetailReducer;
