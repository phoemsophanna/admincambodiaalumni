import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { REFRESH_TECHNOLOGY_LIST_FLAG, TECHNOLOGY_LIST } from "./actionTypes";
import { fetchPartnerListFail, fetchPartnerListSuccess } from "./actions";
import { getPartnerList } from "../../../helpers/fakebackend_helper";

function* fetchPartnerListSaga() {
	try {
		const response = yield call(getPartnerList);
		if (response) {
			yield put(fetchPartnerListSuccess(response.data));
		} else {
			yield put(fetchPartnerListFail(response));
		}
	} catch (error) {
		yield put(fetchPartnerListFail(error));
	}
}

function* refreshPartnerListSaga() {
	try {
		const response = yield call(getPartnerList);
		if (response) {
			yield put(fetchPartnerListSuccess(response.data));
		} else {
			yield put(fetchPartnerListFail(response));
		}
	} catch (error) {
		yield put(fetchPartnerListFail(error));
	}
}

function* PartnerListSaga() {
	yield takeEvery(TECHNOLOGY_LIST, fetchPartnerListSaga);
	yield takeEvery(REFRESH_TECHNOLOGY_LIST_FLAG, refreshPartnerListSaga);
}

export default PartnerListSaga;
