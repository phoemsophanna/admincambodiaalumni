import {
	RESET_GALLERY_SHOW_DETAIL_FLAG,
	GALLERY_SHOW_DETAIL,
	GALLERY_SHOW_DETAIL_FAILED,
	GALLERY_SHOW_DETAIL_SUCCESSFUL,
} from "./actionTypes";

const initialState = {
	campaignCategory: null,
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const GalleryDetailReducer = (state = initialState, action) => {
	switch (action.type) {
		case GALLERY_SHOW_DETAIL:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case GALLERY_SHOW_DETAIL_SUCCESSFUL:
			state = {
				...state,
				campaignCategory: action.payload.campaignCategory,
				message: "Fetch campaignCategory successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case GALLERY_SHOW_DETAIL_FAILED:
			state = {
				...state,
				campaignCategory: null,
				message: "Fetch campaignCategory failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_GALLERY_SHOW_DETAIL_FLAG:
			state = {
				...state,
				campaignCategory: null,
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

export default GalleryDetailReducer;
