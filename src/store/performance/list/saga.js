import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { REFRESH_PERFORMANCE_LIST_FLAG, PERFORMANCE_LIST } from "./actionTypes";
import { fetchPerformanceListFail, fetchPerformanceListSuccess } from "./actions";
import { getPerformanceList } from "../../../helpers/fakebackend_helper";

function* fetchPerformanceListSaga() {
	try {
		const response = yield call(getPerformanceList);
		if (response) {
			yield put(fetchPerformanceListSuccess(response.data));
		} else {
			yield put(fetchPerformanceListFail(response));
		}
	} catch (error) {
		yield put(fetchPerformanceListFail(error));
	}
}

function* refreshPerformanceListSaga() {
	try {
		const response = yield call(getPerformanceList);
		if (response) {
			yield put(fetchPerformanceListSuccess(response.data));
		} else {
			yield put(fetchPerformanceListFail(response));
		}
	} catch (error) {
		yield put(fetchPerformanceListFail(error));
	}
}

function* PerformanceListSaga() {
	yield takeEvery(PERFORMANCE_LIST, fetchPerformanceListSaga);
	yield takeEvery(REFRESH_PERFORMANCE_LIST_FLAG, refreshPerformanceListSaga);
}

export default PerformanceListSaga;
