import {
	REFRESH_TECHNOLOGY_LIST_FLAG,
	RESET_TECHNOLOGY_LIST_FLAG,
	TECHNOLOGY_LIST,
	TECHNOLOGY_LIST_FAILED,
	TECHNOLOGY_LIST_SUCCESSFUL,
} from "./actionTypes";

export const fetchTechnologyList = () => {
	return {
		type: TECHNOLOGY_LIST,
	};
};

export const fetchTechnologyListSuccess = (technologies) => {
	return {
		type: TECHNOLOGY_LIST_SUCCESSFUL,
		payload: { technologies },
	};
};

export const fetchTechnologyListFail = (error) => {
	return {
		type: TECHNOLOGY_LIST_FAILED,
		payload: { error },
	};
};

export const resetTechnologyList = () => {
	return {
		type: RESET_TECHNOLOGY_LIST_FLAG,
	};
};

export const refreshTechnologyList = () => {
	return {
		type: REFRESH_TECHNOLOGY_LIST_FLAG,
	};
};
