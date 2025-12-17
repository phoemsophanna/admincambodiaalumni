import {
	REFRESH_DONOR_LIST_FLAG,
	RESET_DONOR_LIST_FLAG,
	DONOR_LIST,
	DONOR_LIST_FAILED,
	DONOR_LIST_SUCCESSFUL,
} from "./actionTypes";

export const fetchDonorList = () => {
	return {
		type: DONOR_LIST,
	};
};

export const fetchDonorListSuccess = (donors, total) => {
	return {
		type: DONOR_LIST_SUCCESSFUL,
		payload: { donors, total },
	};
};

export const fetchDonorListFail = (error) => {
	return {
		type: DONOR_LIST_FAILED,
		payload: { error },
	};
};

export const resetDonorList = () => {
	return {
		type: RESET_DONOR_LIST_FLAG,
	};
};

export const refreshDonorList = () => {
	return {
		type: REFRESH_DONOR_LIST_FLAG,
	};
};
