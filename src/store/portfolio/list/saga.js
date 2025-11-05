import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { REFRESH_PORTFOLIO_LIST_FLAG, PORTFOLIO_LIST } from "./actionTypes";
import { fetchPortfolioListFail, fetchPortfolioListSuccess } from "./actions";
import { getPortfolioList } from "../../../helpers/fakebackend_helper";

function* fetchPortfolioListSaga() {
	try {
		const response = yield call(getPortfolioList);
		if (response) {
			yield put(fetchPortfolioListSuccess(response.data));
		} else {
			yield put(fetchPortfolioListFail(response));
		}
	} catch (error) {
		yield put(fetchPortfolioListFail(error));
	}
}

function* refreshPortfolioListSaga() {
	try {
		const response = yield call(getPortfolioList);
		if (response) {
			yield put(fetchPortfolioListSuccess(response.data));
		} else {
			yield put(fetchPortfolioListFail(response));
		}
	} catch (error) {
		yield put(fetchPortfolioListFail(error));
	}
}

function* PortfolioListSaga() {
	yield takeEvery(PORTFOLIO_LIST, fetchPortfolioListSaga);
	yield takeEvery(REFRESH_PORTFOLIO_LIST_FLAG, refreshPortfolioListSaga);
}

export default PortfolioListSaga;
