import {
	RESET_GALLERY_SHOW_DETAIL_FLAG,
	GALLERY_SHOW_DETAIL,
	GALLERY_SHOW_DETAIL_FAILED,
	GALLERY_SHOW_DETAIL_SUCCESSFUL,
} from "./actionTypes";

export const fetchGalleryDetail = (campaignCategoryId) => {
	return {
		type: GALLERY_SHOW_DETAIL,
		payload: { campaignCategoryId },
	};
};

export const fetchGalleryDetailSuccess = (campaignCategory) => {
	return {
		type: GALLERY_SHOW_DETAIL_SUCCESSFUL,
		payload: { campaignCategory },
	};
};

export const fetchGalleryDetailFail = (error) => {
	return {
		type: GALLERY_SHOW_DETAIL_FAILED,
		payload: { error },
	};
};

export const resetGalleryShowDetail = () => {
	return {
		type: RESET_GALLERY_SHOW_DETAIL_FLAG,
	};
};
