import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { REFRESH_WITHDRAW_LIST_FLAG, WITHDRAW_LIST } from "./actionTypes";
import { fetchWithdrawListFail, fetchWithdrawListSuccess } from "./actions";
import { getWithdrawList } from "../../../helpers/fakebackend_helper";

function* fetchWithdrawListSaga() {
	try {
		const response = yield call(getWithdrawList);
		if (response) {
			yield put(fetchWithdrawListSuccess(response.data));
		} else {
			yield put(fetchWithdrawListFail(response));
		}
	} catch (error) {
		yield put(fetchWithdrawListFail(error));
	}
}

function* refreshWithdrawListSaga() {
	try {
		const response = yield call(getWithdrawList);
		if (response) {
			yield put(fetchWithdrawListSuccess(response.data));
		} else {
			yield put(fetchWithdrawListFail(response));
		}
	} catch (error) {
		yield put(fetchWithdrawListFail(error));
	}
}

function* WithdrawListSaga() {
	yield takeEvery(WITHDRAW_LIST, fetchWithdrawListSaga);
	yield takeEvery(REFRESH_WITHDRAW_LIST_FLAG, refreshWithdrawListSaga);
}

export default WithdrawListSaga;
