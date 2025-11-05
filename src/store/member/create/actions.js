import {
	CREATE_MEMBER,
	CREATE_MEMBER_FAILED,
	CREATE_MEMBER_SUCCESSFUL,
	DELETE_MEMBER,
	DELETE_MEMBER_FAILED,
	DELETE_MEMBER_SUCCESSFUL,
	RESET_CREATE_MEMBER_FLAG,
} from "./actionTypes";

export const createMember = (member) => {
	return {
		type: CREATE_MEMBER,
		payload: { member },
	};
};

export const createMemberSuccessful = (message) => {
	return {
		type: CREATE_MEMBER_SUCCESSFUL,
		payload: { message },
	};
};

export const createMemberFailed = (error) => {
	return {
		type: CREATE_MEMBER_FAILED,
		payload: { error },
	};
};

export const deleteMember = (memberId) => {
	return {
		type: DELETE_MEMBER,
		payload: { memberId },
	};
};

export const deleteMemberSuccessful = (message) => {
	return {
		type: DELETE_MEMBER_SUCCESSFUL,
		payload: { message },
	};
};

export const deleteMemberFailed = (error) => {
	return {
		type: DELETE_MEMBER_FAILED,
		payload: { error },
	};
};

export const resetCreateMemberFlag = () => {
	return {
		type: RESET_CREATE_MEMBER_FLAG,
	};
};
