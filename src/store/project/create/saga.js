import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { SAVE_PROJECT, DELETE_PROJECT } from "./actionTypes";
import { deleteProject, postCreateProject } from "../../../helpers/fakebackend_helper";
import { createProjectFailed, createProjectSuccessful, deleteProjectFailed, deleteProjectSuccessful } from "./actions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function* createProjectSaga({ payload: { project, history } }) {
	try {
		const response = yield call(postCreateProject, project);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(createProjectSuccessful(response.message));
			history("/project-menu");
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(createProjectFailed(response.message));
		}
	} catch (error) {
		yield put(createProjectFailed(error));
	}
}

function* deleteProjectSaga({ payload: { projectId } }) {
	try {
		const response = yield call(deleteProject, projectId);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(deleteProjectSuccessful(response.message));
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(deleteProjectFailed(response.message));
		}
	} catch (error) {
		yield put(deleteProjectFailed(error));
	}
}

function* CreateProjectMainSaga() {
	yield takeEvery(SAVE_PROJECT, createProjectSaga);
	yield takeEvery(DELETE_PROJECT, deleteProjectSaga);
}

export default CreateProjectMainSaga;
