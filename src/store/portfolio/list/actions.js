import { REFRESH_PORTFOLIO_LIST_FLAG, RESET_PORTFOLIO_LIST_FLAG, PORTFOLIO_LIST, PORTFOLIO_LIST_FAILED, PORTFOLIO_LIST_SUCCESSFUL } from "./actionTypes";

export const fetchPortfolioList = () => {
	return {
		type: PORTFOLIO_LIST,
	};
};

export const fetchPortfolioListSuccess = (portfolios) => {
	return {
		type: PORTFOLIO_LIST_SUCCESSFUL,
		payload: { portfolios },
	};
};

export const fetchPortfolioListFail = (error) => {
	return {
		type: PORTFOLIO_LIST_FAILED,
		payload: { error },
	};
};

export const resetPortfolioList = () => {
	return {
		type: RESET_PORTFOLIO_LIST_FLAG,
	};
};

export const refreshPortfolioList = () => {
	return {
		type: REFRESH_PORTFOLIO_LIST_FLAG,
	};
};
