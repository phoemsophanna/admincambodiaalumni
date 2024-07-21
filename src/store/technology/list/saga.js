import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { REFRESH_TECHNOLOGY_LIST_FLAG, TECHNOLOGY_LIST } from "./actionTypes";
import { fetchTechnologyListFail, fetchTechnologyListSuccess } from "./actions";
import { getTechnologyList } from "../../../helpers/fakebackend_helper";

function* fetchTechnologyListSaga() {
	try {
		const response = yield call(getTechnologyList);
		if (response) {
			yield put(fetchTechnologyListSuccess(response.data));
		} else {
			yield put(fetchTechnologyListFail(response));
		}
	} catch (error) {
		yield put(fetchTechnologyListFail(error));
	}
}

function* refreshTechnologyListSaga() {
	try {
		const response = yield call(getTechnologyList);
		if (response) {
			yield put(fetchTechnologyListSuccess(response.data));
		} else {
			yield put(fetchTechnologyListFail(response));
		}
	} catch (error) {
		yield put(fetchTechnologyListFail(error));
	}
}

function* TechnologyListSaga() {
	yield takeEvery(TECHNOLOGY_LIST, fetchTechnologyListSaga);
	yield takeEvery(REFRESH_TECHNOLOGY_LIST_FLAG, refreshTechnologyListSaga);
}

export default TechnologyListSaga;
