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
	createPartner,
	deletePartner,
	fetchPartnerDetail,
	refreshPartnerList,
	resetCreatePartnerFlag,
	resetPartnerShowDetail,
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

const Partner = () => {
	document.title = "Partner | Admin & Dashboards";
	const dispatch = useDispatch();
	const [UID, setUID] = useState(null);
	const [file, setFile] = useState([]);

	const createPartnerSelector = createSelector(
		(state) => state.CreatePartnerReducer,
		(layout) => layout
	);
	const createPartnerDetailSelector = createSelector(
		(state) => state.PartnerDetailReducer,
		(layout) => layout
	);

	const useCreatePartnerSelect = useSelector(createPartnerSelector);
	const partnerDetail = useSelector(createPartnerDetailSelector);

	const partnerValidation = useFormik({
		enableReinitialize: true,

		initialValues: {
			id: partnerDetail.partner?.id || "",
			title: partnerDetail.partner?.title || "",
			ordering: partnerDetail.partner?.ordering || 0,
			isActive: partnerDetail.partner ? (partnerDetail.partner.isActive ? true : false) : true,
			image: partnerDetail.partner?.image || "",
		},
		onSubmit: (values) => {
			values.image = file?.length > 0 ? file[0]?.serverId : "";
			dispatch(createPartner(values));
		},
	});

	const [modal_backdrop, setmodal_backdrop] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);

	function closeModal() {
		setmodal_backdrop(false);
		partnerValidation.resetForm();
		setFile([]);
		dispatch(resetPartnerShowDetail());
	}

	const handleRefresh = () => {
		dispatch(refreshPartnerList());
	};

	const handleShowPartnerDetail = (partnerId) => {
		setmodal_backdrop(true);
		dispatch(fetchPartnerDetail(partnerId));
	};

	const handleDeletePartner = () => {
		if (UID) {
			dispatch(deletePartner(UID));
		}
	};

	useEffect(() => {
		if (useCreatePartnerSelect.success && !useCreatePartnerSelect.isLoading) {
			dispatch(resetCreatePartnerFlag());
			setmodal_backdrop(false);
			partnerValidation.resetForm();
			setFile([]);
			dispatch(resetPartnerShowDetail());
			setDeleteModal(false);
			dispatch(refreshPartnerList());
		}
	}, [dispatch, partnerValidation, setDeleteModal, useCreatePartnerSelect, partnerDetail]);

	useEffect(() => {
		if (partnerDetail.partner && partnerDetail.partner.image) {
			setFile([
				{
					source: partnerDetail.partner.image,
					options: {
						type: "local",
					},
				},
			]);
		} else {
			setFile([]);
		}
	}, [partnerDetail, setFile]);

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="Partner Management" pageTitle="Dashboard" />
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
								onShowDetail={handleShowPartnerDetail}
								onDeletePartner={(id) => {
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
				onDeleteClick={handleDeletePartner}
				onCloseClick={() => setDeleteModal(false)}
				isLoading={useCreatePartnerSelect.isLoading}
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
					{partnerDetail.partner ? "Update Partner" : "Create Partner"}
				</ModalHeader>

				<ModalBody>
					<Form
						onSubmit={(e) => {
							e.preventDefault();
							partnerValidation.handleSubmit();
							return false;
						}}
						action="#"
						autoComplete="off"
					>
						<div className="text-center">
							<div className="profile-partner position-relative d-inline-block mx-auto  mb-2">
								<div style={{ width: "120px", height: "120px" }}>
									<FilePond
										labelIdle='<span class="filepond--label-action">Choose Profile Image</span>'
										files={file}
										onupdatefiles={setFile}
										allowMultiple={false}
										maxFiles={1}
										name="file"
										server={`${api.BASE_URL}/save-image/partner-profile`}
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
								onChange={partnerValidation.handleChange}
								onBlur={partnerValidation.handleBlur}
								value={partnerValidation.values.title || ""}
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
								onChange={partnerValidation.handleChange}
								onBlur={partnerValidation.handleBlur}
								value={partnerValidation.values.ordering || ""}
							/>
						</div>

						<div className="form-check form-switch form-switch-md mb-2" dir="ltr">
							<Input
								type="checkbox"
								className="form-check-input"
								id="isActive"
								name="isActive"
								onChange={partnerValidation.handleChange}
								onBlur={partnerValidation.handleBlur}
								checked={partnerValidation.values.isActive}
							/>
							<Label className="form-check-label" for="isActive">
								Status: <span className="fw-bolder">{partnerValidation.values.isActive ? "Active" : "In-Active"}</span>
							</Label>
						</div>

						<div className="text-end">
							<Button type="button" color="light" className="btn-label" onClick={closeModal}>
								<i className="ri-close-line label-icon align-middle fs-16 me-2"></i> Discus
							</Button>{" "}
							{useCreatePartnerSelect.isLoading ? (
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

export default withRouter(Partner);
