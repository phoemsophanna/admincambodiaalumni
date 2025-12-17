import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { REFRESH_DONOR_LIST_FLAG, DONOR_LIST } from "./actionTypes";
import { fetchDonorListFail, fetchDonorListSuccess } from "./actions";
import { getDonorList } from "../../../helpers/fakebackend_helper";

function* fetchDonorListSaga() {
	try {
		const response = yield call(getDonorList);
		if (response) {
			yield put(fetchDonorListSuccess(response.donors,response.total));
		} else {
			yield put(fetchDonorListFail(response));
		}
	} catch (error) {
		yield put(fetchDonorListFail(error));
	}
}

function* refreshDonorListSaga() {
	try {
		const response = yield call(getDonorList);
		if (response) {
			yield put(fetchDonorListSuccess(response.donors,response.total));
		} else {
			yield put(fetchDonorListFail(response));
		}
	} catch (error) {
		yield put(fetchDonorListFail(error));
	}
}

function* DonorListSaga() {
	yield takeEvery(DONOR_LIST, fetchDonorListSaga);
	yield takeEvery(REFRESH_DONOR_LIST_FLAG, refreshDonorListSaga);
}

export default DonorListSaga;
