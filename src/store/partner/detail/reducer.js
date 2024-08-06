import {
	RESET_TECHNOLOGY_SHOW_DETAIL_FLAG,
	TECHNOLOGY_SHOW_DETAIL,
	TECHNOLOGY_SHOW_DETAIL_FAILED,
	TECHNOLOGY_SHOW_DETAIL_SUCCESSFUL,
} from "./actionTypes";

const initialState = {
	partner: null,
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const PartnerDetailReducer = (state = initialState, action) => {
	switch (action.type) {
		case TECHNOLOGY_SHOW_DETAIL:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case TECHNOLOGY_SHOW_DETAIL_SUCCESSFUL:
			state = {
				...state,
				partner: action.payload.partner,
				message: "Fetch partner successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case TECHNOLOGY_SHOW_DETAIL_FAILED:
			state = {
				...state,
				partner: null,
				message: "Fetch partner failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_TECHNOLOGY_SHOW_DETAIL_FLAG:
			state = {
				...state,
				partner: null,
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

export default PartnerDetailReducer;
