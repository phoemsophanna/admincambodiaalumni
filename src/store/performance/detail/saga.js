import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { PERFORMANCE_SHOW_DETAIL } from "./actionTypes";
import { fetchPerformanceDetailFail, fetchPerformanceDetailSuccess } from "./actions";
import { getPerformanceShowDetail } from "../../../helpers/fakebackend_helper";

function* fetchPerformanceDetailSaga({ payload: { performanceId } }) {
	try {
		const response = yield call(getPerformanceShowDetail, { id: performanceId });
		if (response.status === "success") {
			yield put(fetchPerformanceDetailSuccess(response.model));
		} else {
			yield put(fetchPerformanceDetailFail(response));
		}
	} catch (error) {
		yield put(fetchPerformanceDetailFail(error));
	}
}

function* PerformanceDetailSaga() {
	yield takeEvery(PERFORMANCE_SHOW_DETAIL, fetchPerformanceDetailSaga);
}

export default PerformanceDetailSaga;
