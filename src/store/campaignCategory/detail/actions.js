import {
	RESET_PROJECT_CATEGORY_SHOW_DETAIL_FLAG,
	PROJECT_CATEGORY_SHOW_DETAIL,
	PROJECT_CATEGORY_SHOW_DETAIL_FAILED,
	PROJECT_CATEGORY_SHOW_DETAIL_SUCCESSFUL,
} from "./actionTypes";

export const fetchCampaignCategoryDetail = (campaignCategoryId) => {
	return {
		type: PROJECT_CATEGORY_SHOW_DETAIL,
		payload: { campaignCategoryId },
	};
};

export const fetchCampaignCategoryDetailSuccess = (campaignCategory) => {
	return {
		type: PROJECT_CATEGORY_SHOW_DETAIL_SUCCESSFUL,
		payload: { campaignCategory },
	};
};

export const fetchCampaignCategoryDetailFail = (error) => {
	return {
		type: PROJECT_CATEGORY_SHOW_DETAIL_FAILED,
		payload: { error },
	};
};

export const resetCampaignCategoryShowDetail = () => {
	return {
		type: RESET_PROJECT_CATEGORY_SHOW_DETAIL_FLAG,
	};
};
