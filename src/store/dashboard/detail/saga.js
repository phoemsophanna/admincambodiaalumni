import { call, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { DASHBOARD_SHOW_DETAIL } from "./actionTypes";
import { fetchDashboardDetailFail, fetchDashboardDetailSuccess } from "./actions";
import { getDashboardShowDetail } from "../../../helpers/fakebackend_helper";

function* fetchDashboardDetailSaga() {
	try {
		const response = yield call(getDashboardShowDetail);
		if (response) {
			yield put(fetchDashboardDetailSuccess(response));
		}
	} catch (error) {
		yield put(fetchDashboardDetailFail(error));
	}
}

function* dashboardDetailSaga() {
	yield takeEvery(DASHBOARD_SHOW_DETAIL, fetchDashboardDetailSaga);
}

export default dashboardDetailSaga;
