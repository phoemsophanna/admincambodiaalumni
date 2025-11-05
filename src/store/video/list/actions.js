import {
	REFRESH_VIDEO_LIST_FLAG,
	RESET_VIDEO_LIST_FLAG,
	VIDEO_LIST,
	VIDEO_LIST_FAILED,
	VIDEO_LIST_SUCCESSFUL,
} from "./actionTypes";

export const fetchVideoList = () => {
	return {
		type: VIDEO_LIST,
	};
};

export const fetchVideoListSuccess = (campaignCategories) => {
	return {
		type: VIDEO_LIST_SUCCESSFUL,
		payload: { campaignCategories },
	};
};

export const fetchVideoListFail = (error) => {
	return {
		type: VIDEO_LIST_FAILED,
		payload: { error },
	};
};

export const resetVideoList = () => {
	return {
		type: RESET_VIDEO_LIST_FLAG,
	};
};

export const refreshVideoList = () => {
	return {
		type: REFRESH_VIDEO_LIST_FLAG,
	};
};
