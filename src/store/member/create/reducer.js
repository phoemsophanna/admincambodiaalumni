import {
	CREATE_MEMBER,
	CREATE_MEMBER_FAILED,
	CREATE_MEMBER_SUCCESSFUL,
	DELETE_MEMBER,
	DELETE_MEMBER_FAILED,
	DELETE_MEMBER_SUCCESSFUL,
	RESET_CREATE_MEMBER_FLAG,
} from "./actionTypes";

const initialState = {
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const CreateMemberReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_MEMBER:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case CREATE_MEMBER_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case CREATE_MEMBER_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case DELETE_MEMBER:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case DELETE_MEMBER_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case DELETE_MEMBER_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_CREATE_MEMBER_FLAG:
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

export default CreateMemberReducer;
