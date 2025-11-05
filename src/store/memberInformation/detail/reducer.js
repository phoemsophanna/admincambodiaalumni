import { RESET_MEMBERINFORMATION_SHOW_DETAIL_FLAG, MEMBERINFORMATION_SHOW_DETAIL, MEMBERINFORMATION_SHOW_DETAIL_FAILED, MEMBERINFORMATION_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

const initialState = {
	memberInformation: null,
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const MemberInformationDetailReducer = (state = initialState, action) => {
	switch (action.type) {
		case MEMBERINFORMATION_SHOW_DETAIL:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case MEMBERINFORMATION_SHOW_DETAIL_SUCCESSFUL:
			state = {
				...state,
				memberInformation: action.payload.memberInformation,
				message: "Fetch memberInformation successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case MEMBERINFORMATION_SHOW_DETAIL_FAILED:
			state = {
				...state,
				memberInformation: null,
				message: "Fetch memberInformation failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_MEMBERINFORMATION_SHOW_DETAIL_FLAG:
			state = {
				...state,
				memberInformation: null,
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

export default MemberInformationDetailReducer;
