import { REFRESH_CAMPAIGN_LIST_FLAG, RESET_CAMPAIGN_LIST_FLAG, CAMPAIGN_LIST, CAMPAIGN_LIST_FAILED, CAMPAIGN_LIST_SUCCESSFUL } from "./actionTypes";

export const fetchCampaignList = () => {
	return {
		type: CAMPAIGN_LIST,
	};
};

export const fetchCampaignListSuccess = (campaigns) => {
	return {
		type: CAMPAIGN_LIST_SUCCESSFUL,
		payload: { campaigns },
	};
};

export const fetchCampaignListFail = (error) => {
	return {
		type: CAMPAIGN_LIST_FAILED,
		payload: { error },
	};
};

export const resetCampaignList = () => {
	return {
		type: RESET_CAMPAIGN_LIST_FLAG,
	};
};

export const refreshCampaignList = () => {
	return {
		type: REFRESH_CAMPAIGN_LIST_FLAG,
	};
};
