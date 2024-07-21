import {
	SAVE_PERFORMANCE,
	SAVE_PERFORMANCE_FAILED,
	SAVE_PERFORMANCE_SUCCESSFUL,
	DELETE_PERFORMANCE,
	DELETE_PERFORMANCE_FAILED,
	DELETE_PERFORMANCE_SUCCESSFUL,
	RESET_SAVE_PERFORMANCE_FLAG,
} from "./actionTypes";

export const createPerformance = (performance, history) => {
	return {
		type: SAVE_PERFORMANCE,
		payload: { performance, history },
	};
};

export const createPerformanceSuccessful = (message) => {
	return {
		type: SAVE_PERFORMANCE_SUCCESSFUL,
		payload: { message },
	};
};

export const createPerformanceFailed = (error) => {
	return {
		type: SAVE_PERFORMANCE_FAILED,
		payload: { error },
	};
};

export const deletePerformance = (performanceId) => {
	return {
		type: DELETE_PERFORMANCE,
		payload: { performanceId },
	};
};

export const deletePerformanceSuccessful = (message) => {
	return {
		type: DELETE_PERFORMANCE_SUCCESSFUL,
		payload: { message },
	};
};

export const deletePerformanceFailed = (error) => {
	return {
		type: DELETE_PERFORMANCE_FAILED,
		payload: { error },
	};
};

export const resetCreatePerformanceFlag = () => {
	return {
		type: RESET_SAVE_PERFORMANCE_FLAG,
	};
};
