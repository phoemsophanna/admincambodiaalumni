import {
	SAVE_VIDEO,
	SAVE_VIDEO_FAILED,
	SAVE_VIDEO_SUCCESSFUL,
	DELETE_VIDEO,
	DELETE_VIDEO_FAILED,
	DELETE_VIDEO_SUCCESSFUL,
	RESET_SAVE_VIDEO_FLAG,
} from "./actionTypes";

export const createVideo = (campaignCategory) => {
	return {
		type: SAVE_VIDEO,
		payload: { campaignCategory },
	};
};

export const createVideoSuccessful = (message) => {
	return {
		type: SAVE_VIDEO_SUCCESSFUL,
		payload: { message },
	};
};

export const createVideoFailed = (error) => {
	return {
		type: SAVE_VIDEO_FAILED,
		payload: { error },
	};
};

export const deleteVideo = (campaignCategoryId) => {
	return {
		type: DELETE_VIDEO,
		payload: { campaignCategoryId },
	};
};

export const deleteVideoSuccessful = (message) => {
	return {
		type: DELETE_VIDEO_SUCCESSFUL,
		payload: { message },
	};
};

export const deleteVideoFailed = (error) => {
	return {
		type: DELETE_VIDEO_FAILED,
		payload: { error },
	};
};

export const resetCreateVideoFlag = () => {
	return {
		type: RESET_SAVE_VIDEO_FLAG,
	};
};
