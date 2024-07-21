import {
	REFRESH_PERFORMANCE_LIST_FLAG,
	RESET_PERFORMANCE_LIST_FLAG,
	PERFORMANCE_LIST,
	PERFORMANCE_LIST_FAILED,
	PERFORMANCE_LIST_SUCCESSFUL,
} from "./actionTypes";

const initialState = {
	performances: [],
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const PerformanceListReducer = (state = initialState, action) => {
	switch (action.type) {
		case PERFORMANCE_LIST:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case PERFORMANCE_LIST_SUCCESSFUL:
			state = {
				...state,
				performances: action.payload.performances,
				message: "Fetch performance successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case PERFORMANCE_LIST_FAILED:
			state = {
				...state,
				performances: [],
				message: "Fetch performance failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_PERFORMANCE_LIST_FLAG:
			state = {
				...state,
				performances: [],
				message: null,
				isLoading: false,
				success: false,
				error: false,
			};
			break;
		case REFRESH_PERFORMANCE_LIST_FLAG:
			state = {
				...state,
				isLoading: true,
				success: false,
				error: false,
				message: null,
				performances: [],
			};
			break;
		default:
			state = { ...state };
			break;
	}

	return state;
};

export default PerformanceListReducer;
