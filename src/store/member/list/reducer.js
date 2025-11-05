import { REFRESH_MEMBER_LIST_FLAG, RESET_MEMBER_LIST_FLAG, MEMBER_LIST, MEMBER_LIST_FAILED, MEMBER_LIST_SUCCESSFUL } from "./actionTypes";

const initialState = {
	members: [],
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const memberListReducer = (state = initialState, action) => {
	switch (action.type) {
		case MEMBER_LIST:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case MEMBER_LIST_SUCCESSFUL:
			state = {
				...state,
				members: action.payload.members,
				message: "Fetch member successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case MEMBER_LIST_FAILED:
			state = {
				...state,
				members: [],
				message: "Fetch member failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_MEMBER_LIST_FLAG:
			state = {
				...state,
				members: [],
				message: null,
				isLoading: false,
				success: false,
				error: false,
			};
			break;
		case REFRESH_MEMBER_LIST_FLAG:
			state = {
				...state,
				isLoading: true,
				success: false,
				error: false,
				message: null,
				members: [],
			};
			break;
		default:
			state = { ...state };
			break;
	}

	return state;
};

export default memberListReducer;
