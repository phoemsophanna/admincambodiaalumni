import { REFRESH_WITHDRAW_LIST_FLAG, RESET_WITHDRAW_LIST_FLAG, WITHDRAW_LIST, WITHDRAW_LIST_FAILED, WITHDRAW_LIST_SUCCESSFUL } from "./actionTypes";

export const fetchWithdrawList = () => {
	return {
		type: WITHDRAW_LIST,
	};
};

export const fetchWithdrawListSuccess = (withdraws) => {
	return {
		type: WITHDRAW_LIST_SUCCESSFUL,
		payload: { withdraws },
	};
};

export const fetchWithdrawListFail = (error) => {
	return {
		type: WITHDRAW_LIST_FAILED,
		payload: { error },
	};
};

export const resetWithdrawList = () => {
	return {
		type: RESET_WITHDRAW_LIST_FLAG,
	};
};

export const refreshWithdrawList = () => {
	return {
		type: REFRESH_WITHDRAW_LIST_FLAG,
	};
};
