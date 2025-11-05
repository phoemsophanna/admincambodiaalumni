import { REFRESH_MEMBER_LIST_FLAG, RESET_MEMBER_LIST_FLAG, MEMBER_LIST, MEMBER_LIST_FAILED, MEMBER_LIST_SUCCESSFUL } from "./actionTypes";

export const fetchMemberList = () => {
	return {
		type: MEMBER_LIST,
	};
};

export const fetchMemberListSuccess = (members) => {
	return {
		type: MEMBER_LIST_SUCCESSFUL,
		payload: { members },
	};
};

export const fetchMemberListFail = (error) => {
	return {
		type: MEMBER_LIST_FAILED,
		payload: { error },
	};
};

export const resetMemberList = () => {
	return {
		type: RESET_MEMBER_LIST_FLAG,
	};
};

export const refreshMemberList = () => {
	return {
		type: REFRESH_MEMBER_LIST_FLAG,
	};
};
