import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { CREATE_TECHNOLOGY, DELETE_TECHNOLOGY } from "./actionTypes";
import { deleteTechnology, postCreateTechnology } from "../../../helpers/fakebackend_helper";
import { createTechnologyFailed, createTechnologySuccessful, deleteTechnologyFailed, deleteTechnologySuccessful } from "./actions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function* createTechnologySaga({ payload: { technology } }) {
	try {
		const response = yield call(postCreateTechnology, technology);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(createTechnologySuccessful(response.message));
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(createTechnologyFailed(response.message));
		}
	} catch (error) {
		yield put(createTechnologyFailed(error));
	}
}

function* deleteTechnologySaga({ payload: { technologyId } }) {
	try {
		const response = yield call(deleteTechnology, technologyId);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(deleteTechnologySuccessful(response.message));
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(deleteTechnologyFailed(response.message));
		}
	} catch (error) {
		yield put(deleteTechnologyFailed(error));
	}
}

function* CreateTechnologyMainSaga() {
	yield takeEvery(CREATE_TECHNOLOGY, createTechnologySaga);
	yield takeEvery(DELETE_TECHNOLOGY, deleteTechnologySaga);
}

export default CreateTechnologyMainSaga;
