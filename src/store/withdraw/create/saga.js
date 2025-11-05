import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { SAVE_WITHDRAW, DELETE_WITHDRAW } from "./actionTypes";
import { deleteWithdraw, postCreateWithdraw } from "../../../helpers/fakebackend_helper";
import { createWithdrawFailed, createWithdrawSuccessful, deleteWithdrawFailed, deleteWithdrawSuccessful } from "./actions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function* createWithdrawSaga({ payload: { withdraw, history } }) {
	try {
		const response = yield call(postCreateWithdraw, withdraw);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(createWithdrawSuccessful(response.message));
			history("/withdraw-menu");
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(createWithdrawFailed(response.message));
		}
	} catch (error) {
		yield put(createWithdrawFailed(error));
	}
}

function* deleteWithdrawSaga({ payload: { withdrawId } }) {
	try {
		const response = yield call(deleteWithdraw, withdrawId);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(deleteWithdrawSuccessful(response.message));
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(deleteWithdrawFailed(response.message));
		}
	} catch (error) {
		yield put(deleteWithdrawFailed(error));
	}
}

function* CreateWithdrawMainSaga() {
	yield takeEvery(SAVE_WITHDRAW, createWithdrawSaga);
	yield takeEvery(DELETE_WITHDRAW, deleteWithdrawSaga);
}

export default CreateWithdrawMainSaga;
