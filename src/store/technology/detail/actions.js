import {
	RESET_TECHNOLOGY_SHOW_DETAIL_FLAG,
	TECHNOLOGY_SHOW_DETAIL,
	TECHNOLOGY_SHOW_DETAIL_FAILED,
	TECHNOLOGY_SHOW_DETAIL_SUCCESSFUL,
} from "./actionTypes";

export const fetchTechnologyDetail = (technologyId) => {
	return {
		type: TECHNOLOGY_SHOW_DETAIL,
		payload: { technologyId },
	};
};

export const fetchTechnologyDetailSuccess = (technology) => {
	return {
		type: TECHNOLOGY_SHOW_DETAIL_SUCCESSFUL,
		payload: { technology },
	};
};

export const fetchTechnologyDetailFail = (error) => {
	return {
		type: TECHNOLOGY_SHOW_DETAIL_FAILED,
		payload: { error },
	};
};

export const resetTechnologyShowDetail = () => {
	return {
		type: RESET_TECHNOLOGY_SHOW_DETAIL_FLAG,
	};
};
