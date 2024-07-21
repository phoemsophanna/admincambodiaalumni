import {
	RESET_PERFORMANCE_SHOW_DETAIL_FLAG,
	PERFORMANCE_SHOW_DETAIL,
	PERFORMANCE_SHOW_DETAIL_FAILED,
	PERFORMANCE_SHOW_DETAIL_SUCCESSFUL,
} from "./actionTypes";

export const fetchPerformanceDetail = (performanceId) => {
	return {
		type: PERFORMANCE_SHOW_DETAIL,
		payload: { performanceId },
	};
};

export const fetchPerformanceDetailSuccess = (performance) => {
	return {
		type: PERFORMANCE_SHOW_DETAIL_SUCCESSFUL,
		payload: { performance },
	};
};

export const fetchPerformanceDetailFail = (error) => {
	return {
		type: PERFORMANCE_SHOW_DETAIL_FAILED,
		payload: { error },
	};
};

export const resetPerformanceShowDetail = () => {
	return {
		type: RESET_PERFORMANCE_SHOW_DETAIL_FLAG,
	};
};
