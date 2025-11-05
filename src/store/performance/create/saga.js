import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { SAVE_PERFORMANCE, DELETE_PERFORMANCE } from "./actionTypes";
import { deletePerformance, postCreatePerformance } from "../../../helpers/fakebackend_helper";
import { createPerformanceFailed, createPerformanceSuccessful, deletePerformanceFailed, deletePerformanceSuccessful } from "./actions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function* createPerformanceSaga({ payload: { performance, history } }) {
	try {
		const response = yield call(postCreatePerformance, performance);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(createPerformanceSuccessful(response.message));
			history("/how-it-work");
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(createPerformanceFailed(response.message));
		}
	} catch (error) {
		yield put(createPerformanceFailed(error));
	}
}

function* deletePerformanceSaga({ payload: { performanceId } }) {
	try {
		const response = yield call(deletePerformance, performanceId);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(deletePerformanceSuccessful(response.message));
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(deletePerformanceFailed(response.message));
		}
	} catch (error) {
		yield put(deletePerformanceFailed(error));
	}
}

function* CreatePerformanceMainSaga() {
	yield takeEvery(SAVE_PERFORMANCE, createPerformanceSaga);
	yield takeEvery(DELETE_PERFORMANCE, deletePerformanceSaga);
}

export default CreatePerformanceMainSaga;
