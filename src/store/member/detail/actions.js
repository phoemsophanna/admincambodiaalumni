import { RESET_MEMBER_SHOW_DETAIL_FLAG, MEMBER_SHOW_DETAIL, MEMBER_SHOW_DETAIL_FAILED, MEMBER_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

export const fetchMemberDetail = (memberId) => {
	return {
		type: MEMBER_SHOW_DETAIL,
		payload: { memberId },
	};
};

export const fetchMemberDetailSuccess = (member) => {
	return {
		type: MEMBER_SHOW_DETAIL_SUCCESSFUL,
		payload: { member },
	};
};

export const fetchMemberDetailFail = (error) => {
	return {
		type: MEMBER_SHOW_DETAIL_FAILED,
		payload: { error },
	};
};

export const resetMemberShowDetail = () => {
	return {
		type: RESET_MEMBER_SHOW_DETAIL_FLAG,
	};
};
