import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { REFRESH_PROJECT_LIST_FLAG, PROJECT_LIST } from "./actionTypes";
import { fetchProjectListFail, fetchProjectListSuccess } from "./actions";
import { getProjectList } from "../../../helpers/fakebackend_helper";

function* fetchProjectListSaga() {
	try {
		const response = yield call(getProjectList);
		if (response) {
			yield put(fetchProjectListSuccess(response.data));
		} else {
			yield put(fetchProjectListFail(response));
		}
	} catch (error) {
		yield put(fetchProjectListFail(error));
	}
}

function* refreshProjectListSaga() {
	try {
		const response = yield call(getProjectList);
		if (response) {
			yield put(fetchProjectListSuccess(response.data));
		} else {
			yield put(fetchProjectListFail(response));
		}
	} catch (error) {
		yield put(fetchProjectListFail(error));
	}
}

function* ProjectListSaga() {
	yield takeEvery(PROJECT_LIST, fetchProjectListSaga);
	yield takeEvery(REFRESH_PROJECT_LIST_FLAG, refreshProjectListSaga);
}

export default ProjectListSaga;
