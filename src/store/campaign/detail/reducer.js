import { RESET_CAMPAIGN_SHOW_DETAIL_FLAG, CAMPAIGN_SHOW_DETAIL, CAMPAIGN_SHOW_DETAIL_FAILED, CAMPAIGN_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

const initialState = {
	campaign: null,
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const CampaignDetailReducer = (state = initialState, action) => {
	switch (action.type) {
		case CAMPAIGN_SHOW_DETAIL:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case CAMPAIGN_SHOW_DETAIL_SUCCESSFUL:
			state = {
				...state,
				campaign: action.payload.campaign,
				message: "Fetch campaign successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case CAMPAIGN_SHOW_DETAIL_FAILED:
			state = {
				...state,
				campaign: null,
				message: "Fetch campaign failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_CAMPAIGN_SHOW_DETAIL_FLAG:
			state = {
				...state,
				campaign: null,
				message: null,
				isLoading: false,
				success: false,
				error: false,
			};
			break;
		default:
			state = { ...state };
			break;
	}

	return state;
};

export default CampaignDetailReducer;
