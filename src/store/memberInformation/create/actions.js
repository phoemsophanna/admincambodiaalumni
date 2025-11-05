import {
	CREATE_MEMBERINFORMATION,
	CREATE_MEMBERINFORMATION_FAILED,
	CREATE_MEMBERINFORMATION_SUCCESSFUL,
	DELETE_MEMBERINFORMATION,
	DELETE_MEMBERINFORMATION_FAILED,
	DELETE_MEMBERINFORMATION_SUCCESSFUL,
	RESET_CREATE_MEMBERINFORMATION_FLAG,
} from "./actionTypes";

export const createMemberInformation = (member, history) => {
	return {
		type: CREATE_MEMBERINFORMATION,
		payload: { member, history },
	};
};

export const createMemberInformationSuccessful = (message) => {
	return {
		type: CREATE_MEMBERINFORMATION_SUCCESSFUL,
		payload: { message },
	};
};

export const createMemberInformationFailed = (error) => {
	return {
		type: CREATE_MEMBERINFORMATION_FAILED,
		payload: { error },
	};
};

export const deleteMemberInformation = (memberId) => {
	return {
		type: DELETE_MEMBERINFORMATION,
		payload: { memberId },
	};
};

export const deleteMemberInformationSuccessful = (message) => {
	return {
		type: DELETE_MEMBERINFORMATION_SUCCESSFUL,
		payload: { message },
	};
};

export const deleteMemberInformationFailed = (error) => {
	return {
		type: DELETE_MEMBERINFORMATION_FAILED,
		payload: { error },
	};
};

export const resetCreateMemberInformationFlag = () => {
	return {
		type: RESET_CREATE_MEMBERINFORMATION_FLAG,
	};
};
