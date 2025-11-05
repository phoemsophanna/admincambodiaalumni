import {
	REFRESH_TECHNOLOGY_LIST_FLAG,
	RESET_TECHNOLOGY_LIST_FLAG,
	TECHNOLOGY_LIST,
	TECHNOLOGY_LIST_FAILED,
	TECHNOLOGY_LIST_SUCCESSFUL,
} from "./actionTypes";

const initialState = {
	partners: [],
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const PartnerListReducer = (state = initialState, action) => {
	switch (action.type) {
		case TECHNOLOGY_LIST:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case TECHNOLOGY_LIST_SUCCESSFUL:
			state = {
				...state,
				partners: action.payload.partners,
				message: "Fetch partner successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case TECHNOLOGY_LIST_FAILED:
			state = {
				...state,
				partners: [],
				message: "Fetch partner failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_TECHNOLOGY_LIST_FLAG:
			state = {
				...state,
				partners: [],
				message: null,
				isLoading: false,
				success: false,
				error: false,
			};
			break;
		case REFRESH_TECHNOLOGY_LIST_FLAG:
			state = {
				...state,
				isLoading: true,
				success: false,
				error: false,
				message: null,
				partners: [],
			};
			break;
		default:
			state = { ...state };
			break;
	}

	return state;
};

export default PartnerListReducer;
