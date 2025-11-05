import { REFRESH_PROJECT_LIST_FLAG, RESET_PROJECT_LIST_FLAG, PROJECT_LIST, PROJECT_LIST_FAILED, PROJECT_LIST_SUCCESSFUL } from "./actionTypes";

export const fetchProjectList = () => {
	return {
		type: PROJECT_LIST,
	};
};

export const fetchProjectListSuccess = (projects) => {
	return {
		type: PROJECT_LIST_SUCCESSFUL,
		payload: { projects },
	};
};

export const fetchProjectListFail = (error) => {
	return {
		type: PROJECT_LIST_FAILED,
		payload: { error },
	};
};

export const resetProjectList = () => {
	return {
		type: RESET_PROJECT_LIST_FLAG,
	};
};

export const refreshProjectList = () => {
	return {
		type: REFRESH_PROJECT_LIST_FLAG,
	};
};
