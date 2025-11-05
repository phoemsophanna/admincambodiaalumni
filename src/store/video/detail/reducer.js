import {
	RESET_VIDEO_SHOW_DETAIL_FLAG,
	VIDEO_SHOW_DETAIL,
	VIDEO_SHOW_DETAIL_FAILED,
	VIDEO_SHOW_DETAIL_SUCCESSFUL,
} from "./actionTypes";

const initialState = {
	campaignCategory: null,
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const VideoDetailReducer = (state = initialState, action) => {
	switch (action.type) {
		case VIDEO_SHOW_DETAIL:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case VIDEO_SHOW_DETAIL_SUCCESSFUL:
			state = {
				...state,
				campaignCategory: action.payload.campaignCategory,
				message: "Fetch campaignCategory successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case VIDEO_SHOW_DETAIL_FAILED:
			state = {
				...state,
				campaignCategory: null,
				message: "Fetch campaignCategory failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_VIDEO_SHOW_DETAIL_FLAG:
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

export default VideoDetailReducer;
