import { RESET_WITHDRAW_SHOW_DETAIL_FLAG, WITHDRAW_SHOW_DETAIL, WITHDRAW_SHOW_DETAIL_FAILED, WITHDRAW_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

export const fetchWithdrawDetail = (withdrawId) => {
	return {
		type: WITHDRAW_SHOW_DETAIL,
		payload: { withdrawId },
	};
};

export const fetchWithdrawDetailSuccess = (withdraw) => {
	return {
		type: WITHDRAW_SHOW_DETAIL_SUCCESSFUL,
		payload: { withdraw },
	};
};

export const fetchWithdrawDetailFail = (error) => {
	return {
		type: WITHDRAW_SHOW_DETAIL_FAILED,
		payload: { error },
	};
};

export const resetWithdrawShowDetail = () => {
	return {
		type: RESET_WITHDRAW_SHOW_DETAIL_FLAG,
	};
};
