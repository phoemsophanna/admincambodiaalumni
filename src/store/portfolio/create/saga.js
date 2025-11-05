import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { SAVE_PORTFOLIO, DELETE_PORTFOLIO } from "./actionTypes";
import { deletePortfolio, postCreatePortfolio } from "../../../helpers/fakebackend_helper";
import { createPortfolioFailed, createPortfolioSuccessful, deletePortfolioFailed, deletePortfolioSuccessful } from "./actions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function* createPortfolioSaga({ payload: { portfolio, history } }) {
	try {
		const response = yield call(postCreatePortfolio, portfolio);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(createPortfolioSuccessful(response.message));
			history("/portfolios-menu");
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(createPortfolioFailed(response.message));
		}
	} catch (error) {
		yield put(createPortfolioFailed(error));
	}
}

function* deletePortfolioSaga({ payload: { portfolioId } }) {
	try {
		const response = yield call(deletePortfolio, portfolioId);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(deletePortfolioSuccessful(response.message));
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(deletePortfolioFailed(response.message));
		}
	} catch (error) {
		yield put(deletePortfolioFailed(error));
	}
}

function* CreatePortfolioMainSaga() {
	yield takeEvery(SAVE_PORTFOLIO, createPortfolioSaga);
	yield takeEvery(DELETE_PORTFOLIO, deletePortfolioSaga);
}

export default CreatePortfolioMainSaga;
