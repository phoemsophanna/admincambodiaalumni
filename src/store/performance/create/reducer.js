import {
	SAVE_PERFORMANCE,
	SAVE_PERFORMANCE_FAILED,
	SAVE_PERFORMANCE_SUCCESSFUL,
	DELETE_PERFORMANCE,
	DELETE_PERFORMANCE_FAILED,
	DELETE_PERFORMANCE_SUCCESSFUL,
	RESET_SAVE_PERFORMANCE_FLAG,
} from "./actionTypes";

const initialState = {
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const CreatePerformanceReducer = (state = initialState, action) => {
	switch (action.type) {
		case SAVE_PERFORMANCE:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case SAVE_PERFORMANCE_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case SAVE_PERFORMANCE_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case DELETE_PERFORMANCE:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case DELETE_PERFORMANCE_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case DELETE_PERFORMANCE_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_SAVE_PERFORMANCE_FLAG:
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

export default CreatePerformanceReducer;
