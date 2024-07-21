import {
	CREATE_TECHNOLOGY,
	CREATE_TECHNOLOGY_FAILED,
	CREATE_TECHNOLOGY_SUCCESSFUL,
	DELETE_TECHNOLOGY,
	DELETE_TECHNOLOGY_FAILED,
	DELETE_TECHNOLOGY_SUCCESSFUL,
	RESET_CREATE_TECHNOLOGY_FLAG,
} from "./actionTypes";

export const createTechnology = (technology) => {
	return {
		type: CREATE_TECHNOLOGY,
		payload: { technology },
	};
};

export const createTechnologySuccessful = (message) => {
	return {
		type: CREATE_TECHNOLOGY_SUCCESSFUL,
		payload: { message },
	};
};

export const createTechnologyFailed = (error) => {
	return {
		type: CREATE_TECHNOLOGY_FAILED,
		payload: { error },
	};
};

export const deleteTechnology = (technologyId) => {
	return {
		type: DELETE_TECHNOLOGY,
		payload: { technologyId },
	};
};

export const deleteTechnologySuccessful = (message) => {
	return {
		type: DELETE_TECHNOLOGY_SUCCESSFUL,
		payload: { message },
	};
};

export const deleteTechnologyFailed = (error) => {
	return {
		type: DELETE_TECHNOLOGY_FAILED,
		payload: { error },
	};
};

export const resetCreateTechnologyFlag = () => {
	return {
		type: RESET_CREATE_TECHNOLOGY_FLAG,
	};
};
