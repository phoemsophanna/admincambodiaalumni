import {
	REFRESH_DONOR_LIST_FLAG,
	RESET_DONOR_LIST_FLAG,
	DONOR_LIST,
	DONOR_LIST_FAILED,
	DONOR_LIST_SUCCESSFUL,
} from "./actionTypes";

const initialState = {
	donors: [],
	total: 0,
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const DonorListReducer = (state = initialState, action) => {
	switch (action.type) {
		case DONOR_LIST:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case DONOR_LIST_SUCCESSFUL:
			state = {
				...state,
				donors: action.payload.donors,
				total: action.payload.total,
				message: "Fetch campaignCategory successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case DONOR_LIST_FAILED:
			state = {
				...state,
				donors: [],
				total: 0,
				message: "Fetch campaignCategory failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_DONOR_LIST_FLAG:
			state = {
				...state,
				donors: [],
				total: 0,
				message: null,
				isLoading: false,
				success: false,
				error: false,
			};
			break;
		case REFRESH_DONOR_LIST_FLAG:
			state = {
				...state,
				isLoading: true,
				success: false,
				error: false,
				message: null,
				donors: [],
				total: 0,
			};
			break;
		default:
			state = { ...state };
			break;
	}

	return state;
};

export default DonorListReducer;
