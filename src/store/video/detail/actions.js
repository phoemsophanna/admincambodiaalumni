import {
	RESET_VIDEO_SHOW_DETAIL_FLAG,
	VIDEO_SHOW_DETAIL,
	VIDEO_SHOW_DETAIL_FAILED,
	VIDEO_SHOW_DETAIL_SUCCESSFUL,
} from "./actionTypes";

export const fetchVideoDetail = (campaignCategoryId) => {
	return {
		type: VIDEO_SHOW_DETAIL,
		payload: { campaignCategoryId },
	};
};

export const fetchVideoDetailSuccess = (campaignCategory) => {
	return {
		type: VIDEO_SHOW_DETAIL_SUCCESSFUL,
		payload: { campaignCategory },
	};
};

export const fetchVideoDetailFail = (error) => {
	return {
		type: VIDEO_SHOW_DETAIL_FAILED,
		payload: { error },
	};
};

export const resetVideoShowDetail = () => {
	return {
		type: RESET_VIDEO_SHOW_DETAIL_FLAG,
	};
};
