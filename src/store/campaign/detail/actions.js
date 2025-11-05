import { RESET_CAMPAIGN_SHOW_DETAIL_FLAG, CAMPAIGN_SHOW_DETAIL, CAMPAIGN_SHOW_DETAIL_FAILED, CAMPAIGN_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

export const fetchCampaignDetail = (campaignId) => {
	return {
		type: CAMPAIGN_SHOW_DETAIL,
		payload: { campaignId },
	};
};

export const fetchCampaignDetailSuccess = (campaign) => {
	return {
		type: CAMPAIGN_SHOW_DETAIL_SUCCESSFUL,
		payload: { campaign },
	};
};

export const fetchCampaignDetailFail = (error) => {
	return {
		type: CAMPAIGN_SHOW_DETAIL_FAILED,
		payload: { error },
	};
};

export const resetCampaignShowDetail = () => {
	return {
		type: RESET_CAMPAIGN_SHOW_DETAIL_FLAG,
	};
};
