import {
	SAVE_PORTFOLIO,
	SAVE_PORTFOLIO_FAILED,
	SAVE_PORTFOLIO_SUCCESSFUL,
	DELETE_PORTFOLIO,
	DELETE_PORTFOLIO_FAILED,
	DELETE_PORTFOLIO_SUCCESSFUL,
	RESET_SAVE_PORTFOLIO_FLAG,
} from "./actionTypes";

export const createPortfolio = (portfolio, history) => {
	return {
		type: SAVE_PORTFOLIO,
		payload: { portfolio, history },
	};
};

export const createPortfolioSuccessful = (message) => {
	return {
		type: SAVE_PORTFOLIO_SUCCESSFUL,
		payload: { message },
	};
};

export const createPortfolioFailed = (error) => {
	return {
		type: SAVE_PORTFOLIO_FAILED,
		payload: { error },
	};
};

export const deletePortfolio = (portfolioId) => {
	return {
		type: DELETE_PORTFOLIO,
		payload: { portfolioId },
	};
};

export const deletePortfolioSuccessful = (message) => {
	return {
		type: DELETE_PORTFOLIO_SUCCESSFUL,
		payload: { message },
	};
};

export const deletePortfolioFailed = (error) => {
	return {
		type: DELETE_PORTFOLIO_FAILED,
		payload: { error },
	};
};

export const resetCreatePortfolioFlag = () => {
	return {
		type: RESET_SAVE_PORTFOLIO_FLAG,
	};
};
