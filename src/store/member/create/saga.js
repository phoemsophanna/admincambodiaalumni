import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { CREATE_MEMBER, DELETE_MEMBER } from "./actionTypes";
import { deleteMember, postCreateMember } from "../../../helpers/fakebackend_helper";
import { createMemberFailed, createMemberSuccessful, deleteMemberFailed, deleteMemberSuccessful } from "./actions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function* createMemberSaga({ payload: { member } }) {
	try {
		const response = yield call(postCreateMember, member);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(createMemberSuccessful(response.message));
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(createMemberFailed(response.message));
		}
	} catch (error) {
		yield put(createMemberFailed(error));
	}
}

function* deleteMemberSaga({ payload: { memberId } }) {
	try {
		const response = yield call(deleteMember, memberId);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(deleteMemberSuccessful(response.message));
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(deleteMemberFailed(response.message));
		}
	} catch (error) {
		yield put(deleteMemberFailed(error));
	}
}

function* CreateMemberMainSaga() {
	yield takeEvery(CREATE_MEMBER, createMemberSaga);
	yield takeEvery(DELETE_MEMBER, deleteMemberSaga);
}

export default CreateMemberMainSaga;
