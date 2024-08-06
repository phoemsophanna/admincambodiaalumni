import {
	CREATE_TECHNOLOGY,
	CREATE_TECHNOLOGY_FAILED,
	CREATE_TECHNOLOGY_SUCCESSFUL,
	DELETE_TECHNOLOGY,
	DELETE_TECHNOLOGY_FAILED,
	DELETE_TECHNOLOGY_SUCCESSFUL,
	RESET_CREATE_TECHNOLOGY_FLAG,
} from "./actionTypes";

export const createPartner = (partner) => {
	return {
		type: CREATE_TECHNOLOGY,
		payload: { partner },
	};
};

export const createPartnerSuccessful = (message) => {
	return {
		type: CREATE_TECHNOLOGY_SUCCESSFUL,
		payload: { message },
	};
};

export const createPartnerFailed = (error) => {
	return {
		type: CREATE_TECHNOLOGY_FAILED,
		payload: { error },
	};
};

export const deletePartner = (partnerId) => {
	return {
		type: DELETE_TECHNOLOGY,
		payload: { partnerId },
	};
};

export const deletePartnerSuccessful = (message) => {
	return {
		type: DELETE_TECHNOLOGY_SUCCESSFUL,
		payload: { message },
	};
};

export const deletePartnerFailed = (error) => {
	return {
		type: DELETE_TECHNOLOGY_FAILED,
		payload: { error },
	};
};

export const resetCreatePartnerFlag = () => {
	return {
		type: RESET_CREATE_TECHNOLOGY_FLAG,
	};
};
