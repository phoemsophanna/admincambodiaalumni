import React from "react";
import { Button, Card, CardHeader, Col, Container, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, Row, Spinner } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableList from "./TableList";
import { useState } from "react";
import withRouter from "../../../Components/Common/withRouter";

import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
	createTechnology,
	deleteTechnology,
	fetchTechnologyDetail,
	refreshTechnologyList,
	resetCreateTechnologyFlag,
	resetTechnologyShowDetail,
} from "../../../store/actions";

import { createSelector } from "reselect";
import { useEffect } from "react";
import DeleteModal from "../../../Components/Common/DeleteModal";
import { api } from "../../../config";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Technology = () => {
	document.title = "Technology | Admin & Dashboards";
	const dispatch = useDispatch();
	const [UID, setUID] = useState(null);
	const [file, setFile] = useState([]);

	const createTechnologySelector = createSelector(
		(state) => state.CreateTechnologyReducer,
		(layout) => layout
	);
	const createTechnologyDetailSelector = createSelector(
		(state) => state.TechnologyDetailReducer,
		(layout) => layout
	);

	const useCreateTechnologySelect = useSelector(createTechnologySelector);
	const technologyDetail = useSelector(createTechnologyDetailSelector);

	const technologyValidation = useFormik({
		enableReinitialize: true,

		initialValues: {
			id: technologyDetail.technology?.id || "",
			title: technologyDetail.technology?.title || "",
			ordering: technologyDetail.technology?.ordering || 0,
			isActive: technologyDetail.technology ? (technologyDetail.technology.isActive ? true : false) : true,
			image: technologyDetail.technology?.image || "",
		},
		onSubmit: (values) => {
			values.image = file?.length > 0 ? file[0]?.serverId : "";
			dispatch(createTechnology(values));
		},
	});

	const [modal_backdrop, setmodal_backdrop] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);

	function closeModal() {
		setmodal_backdrop(false);
		technologyValidation.resetForm();
		setFile([]);
		dispatch(resetTechnologyShowDetail());
	}

	const handleRefresh = () => {
		dispatch(refreshTechnologyList());
	};

	const handleShowTechnologyDetail = (technologyId) => {
		setmodal_backdrop(true);
		dispatch(fetchTechnologyDetail(technologyId));
	};

	const handleDeleteTechnology = () => {
		if (UID) {
			dispatch(deleteTechnology(UID));
		}
	};

	useEffect(() => {
		if (useCreateTechnologySelect.success && !useCreateTechnologySelect.isLoading) {
			dispatch(resetCreateTechnologyFlag());
			setmodal_backdrop(false);
			technologyValidation.resetForm();
			setFile([]);
			dispatch(resetTechnologyShowDetail());
			setDeleteModal(false);
			dispatch(refreshTechnologyList());
		}
	}, [dispatch, technologyValidation, setDeleteModal, useCreateTechnologySelect, technologyDetail]);

	useEffect(() => {
		if (technologyDetail.technology && technologyDetail.technology.image) {
			setFile([
				{
					source: technologyDetail.technology.image,
					options: {
						type: "local",
					},
				},
			]);
		} else {
			setFile([]);
		}
	}, [technologyDetail, setFile]);

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="Technology Management" pageTitle="Dashboard" />
					<Row>
						<Col lg={12}>
							<Card>
								<CardHeader>
									<Row className="justify-content-between align-items-center gy-3">
										<Col lg={3}>
											<Button
												color="primary"
												className="btn add-btn"
												data-bs-toggle="modal"
												data-bs-target="#showModal"
												onClick={() => setmodal_backdrop(true)}
											>
												<i className="ri-add-fill me-1 align-bottom"></i> Create New
											</Button>
										</Col>
										<Col className="col-lg-auto">
											<div className="d-md-flex text-nowrap gap-2">
												<Button color="dark" className="btn" outline onClick={handleRefresh}>
													<i className="ri-refresh-line me-1 align-bottom"></i> Refresh
												</Button>
											</div>
										</Col>
									</Row>
								</CardHeader>
							</Card>
						</Col>
					</Row>

					<Row>
						<Col lg={12}>
							<TableList
								onShowDetail={handleShowTechnologyDetail}
								onDeleteTechnology={(id) => {
									setDeleteModal(true);
									setUID(id);
								}}
							/>
						</Col>
					</Row>
				</Container>
			</div>
			<DeleteModal
				show={deleteModal}
				onDeleteClick={handleDeleteTechnology}
				onCloseClick={() => setDeleteModal(false)}
				isLoading={useCreateTechnologySelect.isLoading}
			/>
			<Modal
				isOpen={modal_backdrop}
				toggle={() => {
					closeModal();
				}}
				backdrop={"static"}
				id="staticBackdrop"
				centered
			>
				<ModalHeader className="bg-light p-3 text-light" toggle={closeModal}>
					{technologyDetail.technology ? "Update Technology" : "Create Technology"}
				</ModalHeader>

				<ModalBody>
					<Form
						onSubmit={(e) => {
							e.preventDefault();
							technologyValidation.handleSubmit();
							return false;
						}}
						action="#"
						autoComplete="off"
					>
						<div className="text-center">
							<div className="profile-technology position-relative d-inline-block mx-auto  mb-2">
								<div style={{ width: "120px", height: "120px" }}>
									<FilePond
										labelIdle='<span class="filepond--label-action">Choose Profile Image</span>'
										files={file}
										onupdatefiles={setFile}
										allowMultiple={false}
										maxFiles={1}
										name="file"
										server={`${api.BASE_URL}/save-image/technology-profile`}
										className="filepond filepond-input-multiple"
										stylePanelLayout="compact circle"
										styleLoadIndicatorPosition="center bottom"
										styleButtonRemoveItemPosition="center bottom"
										styleProgressIndicatorPosition="center bottom"
									/>
								</div>
							</div>
						</div>
						<div className="mb-2">
							<Label htmlFor="name" className="form-label">
								Title
							</Label>
							<Input
								id="title"
								name="title"
								type="text"
								className="form-control"
								placeholder="Enter title"
								onChange={technologyValidation.handleChange}
								onBlur={technologyValidation.handleBlur}
								value={technologyValidation.values.title || ""}
							/>
						</div>

						<div className="mb-2">
							<Label htmlFor="ordering-input" className="form-label">
								Ordering
							</Label>
							<Input
								type="number"
								className="form-control"
								id="ordering-input"
								placeholder="Enter ordering"
								name="ordering"
								onChange={technologyValidation.handleChange}
								onBlur={technologyValidation.handleBlur}
								value={technologyValidation.values.ordering || ""}
							/>
						</div>

						<div className="form-check form-switch form-switch-md mb-2" dir="ltr">
							<Input
								type="checkbox"
								className="form-check-input"
								id="isActive"
								name="isActive"
								onChange={technologyValidation.handleChange}
								onBlur={technologyValidation.handleBlur}
								checked={technologyValidation.values.isActive}
							/>
							<Label className="form-check-label" for="isActive">
								Status: <span className="fw-bolder">{technologyValidation.values.isActive ? "Active" : "In-Active"}</span>
							</Label>
						</div>

						<div className="text-end">
							<Button type="button" color="light" className="btn-label" onClick={closeModal}>
								<i className="ri-close-line label-icon align-middle fs-16 me-2"></i> Discus
							</Button>{" "}
							{useCreateTechnologySelect.isLoading ? (
								<Button color="primary" className="btn-load">
									<span className="d-flex align-items-center">
										<Spinner size="sm" className="flex-shrink-0">
											Loading...
										</Spinner>
										<span className="flex-grow-1 ms-2">Loading...</span>
									</span>
								</Button>
							) : (
								<Button type="submit" color="primary" className="btn-label">
									<i className="ri-save-3-line label-icon align-middle fs-16 me-2"></i> Save
								</Button>
							)}
						</div>
					</Form>
				</ModalBody>
			</Modal>
		</React.Fragment>
	);
};

export default withRouter(Technology);
