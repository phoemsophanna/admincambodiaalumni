import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { PORTFOLIO_SHOW_DETAIL } from "./actionTypes";
import { fetchPortfolioDetailFail, fetchPortfolioDetailSuccess } from "./actions";
import { getPortfolioShowDetail } from "../../../helpers/fakebackend_helper";

function* fetchPortfolioDetailSaga({ payload: { portfolioId } }) {
	try {
		const response = yield call(getPortfolioShowDetail, { id: portfolioId });
		if (response.status === "success") {
			yield put(fetchPortfolioDetailSuccess(response.model));
		} else {
			yield put(fetchPortfolioDetailFail(response));
		}
	} catch (error) {
		yield put(fetchPortfolioDetailFail(error));
	}
}

function* PortfolioDetailSaga() {
	yield takeEvery(PORTFOLIO_SHOW_DETAIL, fetchPortfolioDetailSaga);
}

export default PortfolioDetailSaga;
