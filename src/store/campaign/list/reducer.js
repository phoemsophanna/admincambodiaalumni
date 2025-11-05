import { REFRESH_CAMPAIGN_LIST_FLAG, RESET_CAMPAIGN_LIST_FLAG, CAMPAIGN_LIST, CAMPAIGN_LIST_FAILED, CAMPAIGN_LIST_SUCCESSFUL } from "./actionTypes";

const initialState = {
	campaigns: [],
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const CampaignListReducer = (state = initialState, action) => {
	switch (action.type) {
		case CAMPAIGN_LIST:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case CAMPAIGN_LIST_SUCCESSFUL:
			state = {
				...state,
				campaigns: action.payload.campaigns,
				message: "Fetch campaign successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case CAMPAIGN_LIST_FAILED:
			state = {
				...state,
				campaigns: [],
				message: "Fetch campaign failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_CAMPAIGN_LIST_FLAG:
			state = {
				...state,
				campaigns: [],
				message: null,
				isLoading: false,
				success: false,
				error: false,
			};
			break;
		case REFRESH_CAMPAIGN_LIST_FLAG:
			state = {
				...state,
				isLoading: true,
				success: false,
				error: false,
				message: null,
				campaigns: [],
			};
			break;
		default:
			state = { ...state };
			break;
	}

	return state;
};

export default CampaignListReducer;
