import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { CREATE_MEMBERINFORMATION, DELETE_MEMBERINFORMATION } from "./actionTypes";
import { postCreateMemberInformation } from "../../../helpers/fakebackend_helper";
import { createMemberInformationFailed, createMemberInformationSuccessful, deleteMemberInformationFailed, deleteMemberInformationSuccessful } from "./actions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function* createMemberInformationSaga({ payload: { member, history } }) {
	try {
		const response = yield call(postCreateMemberInformation, member);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(createMemberInformationSuccessful(response.message));
			history("/member-management");
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(createMemberInformationFailed(response.message));
		}
	} catch (error) {
		yield put(createMemberInformationFailed(error));
	}
}

function* CreateMemberInformationMainSaga() {
	yield takeEvery(CREATE_MEMBERINFORMATION, createMemberInformationSaga);
}

export default CreateMemberInformationMainSaga;
