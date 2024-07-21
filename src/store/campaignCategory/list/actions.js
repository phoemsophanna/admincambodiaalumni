import {
	REFRESH_PROJECT_CATEGORY_LIST_FLAG,
	RESET_PROJECT_CATEGORY_LIST_FLAG,
	PROJECT_CATEGORY_LIST,
	PROJECT_CATEGORY_LIST_FAILED,
	PROJECT_CATEGORY_LIST_SUCCESSFUL,
} from "./actionTypes";

export const fetchCampaignCategoryList = () => {
	return {
		type: PROJECT_CATEGORY_LIST,
	};
};

export const fetchCampaignCategoryListSuccess = (campaignCategories) => {
	return {
		type: PROJECT_CATEGORY_LIST_SUCCESSFUL,
		payload: { campaignCategories },
	};
};

export const fetchCampaignCategoryListFail = (error) => {
	return {
		type: PROJECT_CATEGORY_LIST_FAILED,
		payload: { error },
	};
};

export const resetCampaignCategoryList = () => {
	return {
		type: RESET_PROJECT_CATEGORY_LIST_FLAG,
	};
};

export const refreshCampaignCategoryList = () => {
	return {
		type: REFRESH_PROJECT_CATEGORY_LIST_FLAG,
	};
};
