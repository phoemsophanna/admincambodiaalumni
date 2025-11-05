import { RESET_PROJECT_SHOW_DETAIL_FLAG, PROJECT_SHOW_DETAIL, PROJECT_SHOW_DETAIL_FAILED, PROJECT_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

export const fetchProjectDetail = (projectId) => {
	return {
		type: PROJECT_SHOW_DETAIL,
		payload: { projectId },
	};
};

export const fetchProjectDetailSuccess = (project) => {
	return {
		type: PROJECT_SHOW_DETAIL_SUCCESSFUL,
		payload: { project },
	};
};

export const fetchProjectDetailFail = (error) => {
	return {
		type: PROJECT_SHOW_DETAIL_FAILED,
		payload: { error },
	};
};

export const resetProjectShowDetail = () => {
	return {
		type: RESET_PROJECT_SHOW_DETAIL_FLAG,
	};
};
