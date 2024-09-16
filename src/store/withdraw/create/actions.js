import {
	SAVE_WITHDRAW,
	SAVE_WITHDRAW_FAILED,
	SAVE_WITHDRAW_SUCCESSFUL,
	DELETE_WITHDRAW,
	DELETE_WITHDRAW_FAILED,
	DELETE_WITHDRAW_SUCCESSFUL,
	RESET_SAVE_WITHDRAW_FLAG,
} from "./actionTypes";

export const createWithdraw = (withdraw, history) => {
	return {
		type: SAVE_WITHDRAW,
		payload: { withdraw, history },
	};
};

export const createWithdrawSuccessful = (message) => {
	return {
		type: SAVE_WITHDRAW_SUCCESSFUL,
		payload: { message },
	};
};

export const createWithdrawFailed = (error) => {
	return {
		type: SAVE_WITHDRAW_FAILED,
		payload: { error },
	};
};

export const deleteWithdraw = (withdrawId) => {
	return {
		type: DELETE_WITHDRAW,
		payload: { withdrawId },
	};
};

export const deleteWithdrawSuccessful = (message) => {
	return {
		type: DELETE_WITHDRAW_SUCCESSFUL,
		payload: { message },
	};
};

export const deleteWithdrawFailed = (error) => {
	return {
		type: DELETE_WITHDRAW_FAILED,
		payload: { error },
	};
};

export const resetCreateWithdrawFlag = () => {
	return {
		type: RESET_SAVE_WITHDRAW_FLAG,
	};
};
