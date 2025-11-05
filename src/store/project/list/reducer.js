import { REFRESH_PROJECT_LIST_FLAG, RESET_PROJECT_LIST_FLAG, PROJECT_LIST, PROJECT_LIST_FAILED, PROJECT_LIST_SUCCESSFUL } from "./actionTypes";

const initialState = {
	projects: [],
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const ProjectListReducer = (state = initialState, action) => {
	switch (action.type) {
		case PROJECT_LIST:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case PROJECT_LIST_SUCCESSFUL:
			state = {
				...state,
				projects: action.payload.projects,
				message: "Fetch project successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			break;
		case PROJECT_LIST_FAILED:
			state = {
				...state,
				projects: [],
				message: "Fetch project failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_PROJECT_LIST_FLAG:
			state = {
				...state,
				projects: [],
				message: null,
				isLoading: false,
				success: false,
				error: false,
			};
			break;
		case REFRESH_PROJECT_LIST_FLAG:
			state = {
				...state,
				isLoading: true,
				success: false,
				error: false,
				message: null,
				projects: [],
			};
			break;
		default:
			state = { ...state };
			break;
	}

	return state;
};

export default ProjectListReducer;
