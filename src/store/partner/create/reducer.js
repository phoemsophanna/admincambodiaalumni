import {
	CREATE_TECHNOLOGY,
	CREATE_TECHNOLOGY_FAILED,
	CREATE_TECHNOLOGY_SUCCESSFUL,
	DELETE_TECHNOLOGY,
	DELETE_TECHNOLOGY_FAILED,
	DELETE_TECHNOLOGY_SUCCESSFUL,
	RESET_CREATE_TECHNOLOGY_FLAG,
} from "./actionTypes";

const initialState = {
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const CreatePartnerReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_TECHNOLOGY:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case CREATE_TECHNOLOGY_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case CREATE_TECHNOLOGY_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case DELETE_TECHNOLOGY:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case DELETE_TECHNOLOGY_SUCCESSFUL:
			state = {
				...state,
				message: action.payload.message,
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case DELETE_TECHNOLOGY_FAILED:
			state = {
				...state,
				message: action.payload.error,
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_CREATE_TECHNOLOGY_FLAG:
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

export default CreatePartnerReducer;
