import {
	REFRESH_GALLERY_LIST_FLAG,
	RESET_GALLERY_LIST_FLAG,
	GALLERY_LIST,
	GALLERY_LIST_FAILED,
	GALLERY_LIST_SUCCESSFUL,
} from "./actionTypes";

const initialState = {
	campaignCategories: [],
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const GalleryListReducer = (state = initialState, action) => {
	switch (action.type) {
		case GALLERY_LIST:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case GALLERY_LIST_SUCCESSFUL:
			state = {
				...state,
				campaignCategories: action.payload.campaignCategories,
				message: "Fetch campaignCategory successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case GALLERY_LIST_FAILED:
			state = {
				...state,
				campaignCategories: [],
				message: "Fetch campaignCategory failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_GALLERY_LIST_FLAG:
			state = {
				...state,
				campaignCategories: [],
				message: null,
				isLoading: false,
				success: false,
				error: false,
			};
			break;
		case REFRESH_GALLERY_LIST_FLAG:
			state = {
				...state,
				isLoading: true,
				success: false,
				error: false,
				message: null,
				campaignCategories: [],
			};
			break;
		default:
			state = { ...state };
			break;
	}

	return state;
};

export default GalleryListReducer;
