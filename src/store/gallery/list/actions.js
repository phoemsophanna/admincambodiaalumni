import {
	REFRESH_GALLERY_LIST_FLAG,
	RESET_GALLERY_LIST_FLAG,
	GALLERY_LIST,
	GALLERY_LIST_FAILED,
	GALLERY_LIST_SUCCESSFUL,
} from "./actionTypes";

export const fetchGalleryList = () => {
	return {
		type: GALLERY_LIST,
	};
};

export const fetchGalleryListSuccess = (campaignCategories) => {
	return {
		type: GALLERY_LIST_SUCCESSFUL,
		payload: { campaignCategories },
	};
};

export const fetchGalleryListFail = (error) => {
	return {
		type: GALLERY_LIST_FAILED,
		payload: { error },
	};
};

export const resetGalleryList = () => {
	return {
		type: RESET_GALLERY_LIST_FLAG,
	};
};

export const refreshGalleryList = () => {
	return {
		type: REFRESH_GALLERY_LIST_FLAG,
	};
};
