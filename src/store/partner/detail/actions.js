import {
	RESET_TECHNOLOGY_SHOW_DETAIL_FLAG,
	TECHNOLOGY_SHOW_DETAIL,
	TECHNOLOGY_SHOW_DETAIL_FAILED,
	TECHNOLOGY_SHOW_DETAIL_SUCCESSFUL,
} from "./actionTypes";

export const fetchPartnerDetail = (partnerId) => {
	return {
		type: TECHNOLOGY_SHOW_DETAIL,
		payload: { partnerId },
	};
};

export const fetchPartnerDetailSuccess = (partner) => {
	return {
		type: TECHNOLOGY_SHOW_DETAIL_SUCCESSFUL,
		payload: { partner },
	};
};

export const fetchPartnerDetailFail = (error) => {
	return {
		type: TECHNOLOGY_SHOW_DETAIL_FAILED,
		payload: { error },
	};
};

export const resetPartnerShowDetail = () => {
	return {
		type: RESET_TECHNOLOGY_SHOW_DETAIL_FLAG,
	};
};
