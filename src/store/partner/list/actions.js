import {
	REFRESH_TECHNOLOGY_LIST_FLAG,
	RESET_TECHNOLOGY_LIST_FLAG,
	TECHNOLOGY_LIST,
	TECHNOLOGY_LIST_FAILED,
	TECHNOLOGY_LIST_SUCCESSFUL,
} from "./actionTypes";

export const fetchPartnerList = () => {
	return {
		type: TECHNOLOGY_LIST,
	};
};

export const fetchPartnerListSuccess = (partners) => {
	return {
		type: TECHNOLOGY_LIST_SUCCESSFUL,
		payload: { partners },
	};
};

export const fetchPartnerListFail = (error) => {
	return {
		type: TECHNOLOGY_LIST_FAILED,
		payload: { error },
	};
};

export const resetPartnerList = () => {
	return {
		type: RESET_TECHNOLOGY_LIST_FLAG,
	};
};

export const refreshPartnerList = () => {
	return {
		type: REFRESH_TECHNOLOGY_LIST_FLAG,
	};
};
