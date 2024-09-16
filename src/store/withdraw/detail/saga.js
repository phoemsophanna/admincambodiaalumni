import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { WITHDRAW_SHOW_DETAIL } from "./actionTypes";
import { fetchWithdrawDetailFail, fetchWithdrawDetailSuccess } from "./actions";
import { getWithdrawShowDetail } from "../../../helpers/fakebackend_helper";

function* fetchWithdrawDetailSaga({ payload: { withdrawId } }) {
	try {
		const response = yield call(getWithdrawShowDetail, { id: withdrawId });
		if (response.status === "success") {
			yield put(fetchWithdrawDetailSuccess(response.model));
		} else {
			yield put(fetchWithdrawDetailFail(response));
		}
	} catch (error) {
		yield put(fetchWithdrawDetailFail(error));
	}
}

function* WithdrawDetailSaga() {
	yield takeEvery(WITHDRAW_SHOW_DETAIL, fetchWithdrawDetailSaga);
}

export default WithdrawDetailSaga;
