import {
	REFRESH_PERFORMANCE_LIST_FLAG,
	RESET_PERFORMANCE_LIST_FLAG,
	PERFORMANCE_LIST,
	PERFORMANCE_LIST_FAILED,
	PERFORMANCE_LIST_SUCCESSFUL,
} from "./actionTypes";

export const fetchPerformanceList = () => {
	return {
		type: PERFORMANCE_LIST,
	};
};

export const fetchPerformanceListSuccess = (performances) => {
	return {
		type: PERFORMANCE_LIST_SUCCESSFUL,
		payload: { performances },
	};
};

export const fetchPerformanceListFail = (error) => {
	return {
		type: PERFORMANCE_LIST_FAILED,
		payload: { error },
	};
};

export const resetPerformanceList = () => {
	return {
		type: RESET_PERFORMANCE_LIST_FLAG,
	};
};

export const refreshPerformanceList = () => {
	return {
		type: REFRESH_PERFORMANCE_LIST_FLAG,
	};
};
