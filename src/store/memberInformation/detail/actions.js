import { RESET_MEMBERINFORMATION_SHOW_DETAIL_FLAG, MEMBERINFORMATION_SHOW_DETAIL, MEMBERINFORMATION_SHOW_DETAIL_FAILED, MEMBERINFORMATION_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

export const fetchMemberInformationDetail = (memberInformationId) => {
	return {
		type: MEMBERINFORMATION_SHOW_DETAIL,
		payload: { memberInformationId },
	};
};

export const fetchMemberInformationDetailSuccess = (memberInformation) => {
	return {
		type: MEMBERINFORMATION_SHOW_DETAIL_SUCCESSFUL,
		payload: { memberInformation },
	};
};

export const fetchMemberInformationDetailFail = (error) => {
	return {
		type: MEMBERINFORMATION_SHOW_DETAIL_FAILED,
		payload: { error },
	};
};

export const resetMemberInformationShowDetail = () => {
	return {
		type: RESET_MEMBERINFORMATION_SHOW_DETAIL_FLAG,
	};
};
