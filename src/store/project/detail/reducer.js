import { RESET_PROJECT_SHOW_DETAIL_FLAG, PROJECT_SHOW_DETAIL, PROJECT_SHOW_DETAIL_FAILED, PROJECT_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

const initialState = {
	project: null,
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const ProjectDetailReducer = (state = initialState, action) => {
	switch (action.type) {
		case PROJECT_SHOW_DETAIL:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case PROJECT_SHOW_DETAIL_SUCCESSFUL:
			state = {
				...state,
				project: action.payload.project,
				message: "Fetch project successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case PROJECT_SHOW_DETAIL_FAILED:
			state = {
				...state,
				project: null,
				message: "Fetch project failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_PROJECT_SHOW_DETAIL_FLAG:
			state = {
				...state,
				project: null,
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

export default ProjectDetailReducer;
