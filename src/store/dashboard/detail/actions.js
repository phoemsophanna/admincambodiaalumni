import { RESET_DASHBOARD_SHOW_DETAIL_FLAG, DASHBOARD_SHOW_DETAIL, DASHBOARD_SHOW_DETAIL_FAILED, DASHBOARD_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

export const fetchDashboardDetail = () => {
	return {
		type: DASHBOARD_SHOW_DETAIL
	};
};

export const fetchDashboardDetailSuccess = (dashboard) => {
	return {
		type: DASHBOARD_SHOW_DETAIL_SUCCESSFUL,
		payload: { dashboard },
	};
};

export const fetchDashboardDetailFail = (error) => {
	return {
		type: DASHBOARD_SHOW_DETAIL_FAILED,
		payload: { error },
	};
};

export const resetDashboardShowDetail = () => {
	return {
		type: RESET_DASHBOARD_SHOW_DETAIL_FLAG,
	};
};
