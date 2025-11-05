import { RESET_MEMBER_SHOW_DETAIL_FLAG, MEMBER_SHOW_DETAIL, MEMBER_SHOW_DETAIL_FAILED, MEMBER_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

const initialState = {
	member: null,
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const memberDetailReducer = (state = initialState, action) => {
	switch (action.type) {
		case MEMBER_SHOW_DETAIL:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case MEMBER_SHOW_DETAIL_SUCCESSFUL:
			state = {
				...state,
				member: action.payload.member,
				message: "Fetch member successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case MEMBER_SHOW_DETAIL_FAILED:
			state = {
				...state,
				member: null,
				message: "Fetch member failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_MEMBER_SHOW_DETAIL_FLAG:
			state = {
				...state,
				member: null,
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

export default memberDetailReducer;
