import {
	SAVE_CAMPAIGN,
	SAVE_CAMPAIGN_FAILED,
	SAVE_CAMPAIGN_SUCCESSFUL,
	DELETE_CAMPAIGN,
	DELETE_CAMPAIGN_FAILED,
	DELETE_CAMPAIGN_SUCCESSFUL,
	RESET_SAVE_CAMPAIGN_FLAG,
} from "./actionTypes";

export const createCampaign = (campaign, history) => {
	return {
		type: SAVE_CAMPAIGN,
		payload: { campaign, history },
	};
};

export const createCampaignSuccessful = (message) => {
	return {
		type: SAVE_CAMPAIGN_SUCCESSFUL,
		payload: { message },
	};
};

export const createCampaignFailed = (error) => {
	return {
		type: SAVE_CAMPAIGN_FAILED,
		payload: { error },
	};
};

export const deleteCampaign = (campaignId) => {
	return {
		type: DELETE_CAMPAIGN,
		payload: { campaignId },
	};
};

export const deleteCampaignSuccessful = (message) => {
	return {
		type: DELETE_CAMPAIGN_SUCCESSFUL,
		payload: { message },
	};
};

export const deleteCampaignFailed = (error) => {
	return {
		type: DELETE_CAMPAIGN_FAILED,
		payload: { error },
	};
};

export const resetCreateCampaignFlag = () => {
	return {
		type: RESET_SAVE_CAMPAIGN_FLAG,
	};
};
