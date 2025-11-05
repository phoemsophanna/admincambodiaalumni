import {
	SAVE_GALLERY,
	SAVE_GALLERY_FAILED,
	SAVE_GALLERY_SUCCESSFUL,
	DELETE_GALLERY,
	DELETE_GALLERY_FAILED,
	DELETE_GALLERY_SUCCESSFUL,
	RESET_SAVE_GALLERY_FLAG,
} from "./actionTypes";

export const createGallery = (campaignCategory) => {
	return {
		type: SAVE_GALLERY,
		payload: { campaignCategory },
	};
};

export const createGallerySuccessful = (message) => {
	return {
		type: SAVE_GALLERY_SUCCESSFUL,
		payload: { message },
	};
};

export const createGalleryFailed = (error) => {
	return {
		type: SAVE_GALLERY_FAILED,
		payload: { error },
	};
};

export const deleteGallery = (campaignCategoryId) => {
	return {
		type: DELETE_GALLERY,
		payload: { campaignCategoryId },
	};
};

export const deleteGallerySuccessful = (message) => {
	return {
		type: DELETE_GALLERY_SUCCESSFUL,
		payload: { message },
	};
};

export const deleteGalleryFailed = (error) => {
	return {
		type: DELETE_GALLERY_FAILED,
		payload: { error },
	};
};

export const resetCreateGalleryFlag = () => {
	return {
		type: RESET_SAVE_GALLERY_FLAG,
	};
};
