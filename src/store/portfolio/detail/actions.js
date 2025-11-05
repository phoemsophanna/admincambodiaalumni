import { RESET_PORTFOLIO_SHOW_DETAIL_FLAG, PORTFOLIO_SHOW_DETAIL, PORTFOLIO_SHOW_DETAIL_FAILED, PORTFOLIO_SHOW_DETAIL_SUCCESSFUL } from "./actionTypes";

export const fetchPortfolioDetail = (portfolioId) => {
	return {
		type: PORTFOLIO_SHOW_DETAIL,
		payload: { portfolioId },
	};
};

export const fetchPortfolioDetailSuccess = (portfolio) => {
	return {
		type: PORTFOLIO_SHOW_DETAIL_SUCCESSFUL,
		payload: { portfolio },
	};
};

export const fetchPortfolioDetailFail = (error) => {
	return {
		type: PORTFOLIO_SHOW_DETAIL_FAILED,
		payload: { error },
	};
};

export const resetPortfolioShowDetail = () => {
	return {
		type: RESET_PORTFOLIO_SHOW_DETAIL_FLAG,
	};
};
