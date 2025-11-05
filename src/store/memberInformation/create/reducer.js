import {
	CREATE_MEMBERINFORMATION,
	CREATE_MEMBERINFORMATION_FAILED,
	CREATE_MEMBERINFORMATION_SUCCESSFUL,
	DELETE_MEMBERINFORMATION,
	DELETE_MEMBERINFORMATION_FAILED,
	DELETE_MEMBERINFORMATION_SUCCESSFUL,
	RESET_CREATE_MEMBERINFORMATION_FLAG,
} from "./actionTypes";

const initialState = {
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const CreateMemberInformationReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_MEMBERINFORMATION:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case CREATE_MEMBERINFORMATION_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case CREATE_MEMBERINFORMATION_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case DELETE_MEMBERINFORMATION:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case DELETE_MEMBERINFORMATION_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case DELETE_MEMBERINFORMATION_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_CREATE_MEMBERINFORMATION_FLAG:
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

export default CreateMemberInformationReducer;
