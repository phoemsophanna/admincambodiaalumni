import {
	SAVE_CAMPAIGN,
	SAVE_CAMPAIGN_FAILED,
	SAVE_CAMPAIGN_SUCCESSFUL,
	DELETE_CAMPAIGN,
	DELETE_CAMPAIGN_FAILED,
	DELETE_CAMPAIGN_SUCCESSFUL,
	RESET_SAVE_CAMPAIGN_FLAG,
} from "./actionTypes";

const initialState = {
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const CreateCampaignReducer = (state = initialState, action) => {
	switch (action.type) {
		case SAVE_CAMPAIGN:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case SAVE_CAMPAIGN_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case SAVE_CAMPAIGN_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case DELETE_CAMPAIGN:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case DELETE_CAMPAIGN_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case DELETE_CAMPAIGN_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_SAVE_CAMPAIGN_FLAG:
			state = {
				...state,
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

export default CreateCampaignReducer;
