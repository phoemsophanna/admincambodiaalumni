import {
	SAVE_PROJECT,
	SAVE_PROJECT_FAILED,
	SAVE_PROJECT_SUCCESSFUL,
	DELETE_PROJECT,
	DELETE_PROJECT_FAILED,
	DELETE_PROJECT_SUCCESSFUL,
	RESET_SAVE_PROJECT_FLAG,
} from "./actionTypes";

const initialState = {
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const CreateProjectReducer = (state = initialState, action) => {
	switch (action.type) {
		case SAVE_PROJECT:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case SAVE_PROJECT_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case SAVE_PROJECT_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case DELETE_PROJECT:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case DELETE_PROJECT_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case DELETE_PROJECT_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_SAVE_PROJECT_FLAG:
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

export default CreateProjectReducer;
