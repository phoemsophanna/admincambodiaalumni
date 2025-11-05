import {
	SAVE_PROJECT_CATEGORY,
	SAVE_PROJECT_CATEGORY_FAILED,
	SAVE_PROJECT_CATEGORY_SUCCESSFUL,
	DELETE_PROJECT_CATEGORY,
	DELETE_PROJECT_CATEGORY_FAILED,
	DELETE_PROJECT_CATEGORY_SUCCESSFUL,
	RESET_SAVE_PROJECT_CATEGORY_FLAG,
} from "./actionTypes";

export const createCampaignCategory = (campaignCategory) => {
	return {
		type: SAVE_PROJECT_CATEGORY,
		payload: { campaignCategory },
	};
};

export const createCampaignCategorySuccessful = (message) => {
	return {
		type: SAVE_PROJECT_CATEGORY_SUCCESSFUL,
		payload: { message },
	};
};

export const createCampaignCategoryFailed = (error) => {
	return {
		type: SAVE_PROJECT_CATEGORY_FAILED,
		payload: { error },
	};
};

export const deleteCampaignCategory = (campaignCategoryId) => {
	return {
		type: DELETE_PROJECT_CATEGORY,
		payload: { campaignCategoryId },
	};
};

export const deleteCampaignCategorySuccessful = (message) => {
	return {
		type: DELETE_PROJECT_CATEGORY_SUCCESSFUL,
		payload: { message },
	};
};

export const deleteCampaignCategoryFailed = (error) => {
	return {
		type: DELETE_PROJECT_CATEGORY_FAILED,
		payload: { error },
	};
};

export const resetCreateCampaignCategoryFlag = () => {
	return {
		type: RESET_SAVE_PROJECT_CATEGORY_FLAG,
	};
};
