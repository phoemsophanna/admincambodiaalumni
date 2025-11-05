import {
	REFRESH_PROJECT_CATEGORY_LIST_FLAG,
	RESET_PROJECT_CATEGORY_LIST_FLAG,
	PROJECT_CATEGORY_LIST,
	PROJECT_CATEGORY_LIST_FAILED,
	PROJECT_CATEGORY_LIST_SUCCESSFUL,
} from "./actionTypes";

const initialState = {
	campaignCategories: [],
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const CampaignCategoryListReducer = (state = initialState, action) => {
	switch (action.type) {
		case PROJECT_CATEGORY_LIST:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case PROJECT_CATEGORY_LIST_SUCCESSFUL:
			state = {
				...state,
				campaignCategories: action.payload.campaignCategories,
				message: "Fetch campaignCategory successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case PROJECT_CATEGORY_LIST_FAILED:
			state = {
				...state,
				campaignCategories: [],
				message: "Fetch campaignCategory failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_PROJECT_CATEGORY_LIST_FLAG:
			state = {
				...state,
				campaignCategories: [],
				message: null,
				isLoading: false,
				success: false,
				error: false,
			};
			break;
		case REFRESH_PROJECT_CATEGORY_LIST_FLAG:
			state = {
				...state,
				isLoading: true,
				success: false,
				error: false,
				message: null,
				campaignCategories: [],
			};
			break;
		default:
			state = { ...state };
			break;
	}

	return state;
};

export default CampaignCategoryListReducer;
