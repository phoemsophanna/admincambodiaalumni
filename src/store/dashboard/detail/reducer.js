import { RESET_DASHBOARD_SHOW_DETAIL_FLAG, DASHBOARD_SHOW_DETAIL, DASHBOARD_SHOW_DETAIL_FAILED, DASHBOARD_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

const initialState = {
	dashboard: [],
	message: null,
	isLoading: false,
	success: false,
	error: false,
};

const dashboardDetailReducer = (state = initialState, action) => {
	
	switch (action.type) {
		case DASHBOARD_SHOW_DETAIL:
			state = {
				...state,
				isLoading: true,
			};
			break;
		case DASHBOARD_SHOW_DETAIL_SUCCESSFUL:
			state = {
				...state,
				dashboard: action.payload.dashboard,
				message: "Fetch dashboard successfully.",
				isLoading: false,
				success: true,
				error: false,
			};
			console.log(state);
			
			break;
		case DASHBOARD_SHOW_DETAIL_FAILED:
			state = {
				...state,
				dashboard: [],
				message: "Fetch dashboard failed",
				isLoading: false,
				success: false,
				error: true,
			};
			break;
		case RESET_DASHBOARD_SHOW_DETAIL_FLAG:
			state = {
				...state,
				dashboard: [],
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

export default dashboardDetailReducer;
