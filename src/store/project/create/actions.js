import {
	SAVE_PROJECT,
	SAVE_PROJECT_FAILED,
	SAVE_PROJECT_SUCCESSFUL,
	DELETE_PROJECT,
	DELETE_PROJECT_FAILED,
	DELETE_PROJECT_SUCCESSFUL,
	RESET_SAVE_PROJECT_FLAG,
} from "./actionTypes";

export const createProject = (project, history) => {
	return {
		type: SAVE_PROJECT,
		payload: { project, history },
	};
};

export const createProjectSuccessful = (message) => {
	return {
		type: SAVE_PROJECT_SUCCESSFUL,
		payload: { message },
	};
};

export const createProjectFailed = (error) => {
	return {
		type: SAVE_PROJECT_FAILED,
		payload: { error },
	};
};

export const deleteProject = (projectId) => {
	return {
		type: DELETE_PROJECT,
		payload: { projectId },
	};
};

export const deleteProjectSuccessful = (message) => {
	return {
		type: DELETE_PROJECT_SUCCESSFUL,
		payload: { message },
	};
};

export const deleteProjectFailed = (error) => {
	return {
		type: DELETE_PROJECT_FAILED,
		payload: { error },
	};
};

export const resetCreateProjectFlag = () => {
	return {
		type: RESET_SAVE_PROJECT_FLAG,
	};
};
