import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { REFRESH_MEMBER_LIST_FLAG, MEMBER_LIST } from "./actionTypes";
import { fetchMemberListFail, fetchMemberListSuccess } from "./actions";
import { getMemberList } from "../../../helpers/fakebackend_helper";

function* fetchMemberListSaga() {
	try {
		const response = yield call(getMemberList);
		if (response) {
			yield put(fetchMemberListSuccess(response.data));
		} else {
			yield put(fetchMemberListFail(response));
		}
	} catch (error) {
		yield put(fetchMemberListFail(error));
	}
}

function* refreshMemberListSaga() {
	try {
		const response = yield call(getMemberList);
		if (response) {
			yield put(fetchMemberListSuccess(response.data));
		} else {
			yield put(fetchMemberListFail(response));
		}
	} catch (error) {
		yield put(fetchMemberListFail(error));
	}
}

function* memberListSaga() {
	yield takeEvery(MEMBER_LIST, fetchMemberListSaga);
	yield takeEvery(REFRESH_MEMBER_LIST_FLAG, refreshMemberListSaga);
}

export default memberListSaga;
