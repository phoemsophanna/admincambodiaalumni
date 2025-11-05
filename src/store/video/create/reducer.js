import {
	SAVE_VIDEO,
	SAVE_VIDEO_FAILED,
	SAVE_VIDEO_SUCCESSFUL,
	DELETE_VIDEO,
	DELETE_VIDEO_FAILED,
	DELETE_VIDEO_SUCCESSFUL,
	RESET_SAVE_VIDEO_FLAG,
} from "./actionTypes";

const initialState = {
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const CreateVideoReducer = (state = initialState, action) => {
	switch (action.type) {
		case SAVE_VIDEO:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case SAVE_VIDEO_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case SAVE_VIDEO_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case DELETE_VIDEO:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case DELETE_VIDEO_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case DELETE_VIDEO_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_SAVE_VIDEO_FLAG:
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

export default CreateVideoReducer;
