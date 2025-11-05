import {
	SAVE_GALLERY,
	SAVE_GALLERY_FAILED,
	SAVE_GALLERY_SUCCESSFUL,
	DELETE_GALLERY,
	DELETE_GALLERY_FAILED,
	DELETE_GALLERY_SUCCESSFUL,
	RESET_SAVE_GALLERY_FLAG,
} from "./actionTypes";

const initialState = {
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const CreateGalleryReducer = (state = initialState, action) => {
	switch (action.type) {
		case SAVE_GALLERY:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case SAVE_GALLERY_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case SAVE_GALLERY_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case DELETE_GALLERY:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case DELETE_GALLERY_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case DELETE_GALLERY_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_SAVE_GALLERY_FLAG:
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

export default CreateGalleryReducer;
