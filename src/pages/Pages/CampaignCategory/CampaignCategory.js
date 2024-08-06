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
	createCampaignCategory,
	deleteCampaignCategory,
	fetchCampaignCategoryDetail,
	refreshCampaignCategoryList,
	resetCreateCampaignCategoryFlag,
	resetCampaignCategoryShowDetail,
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

const CampaignCategory = () => {
	document.title = "Campaign Category | Admin & Dashboards";
	const dispatch = useDispatch();
	const [UID, setUID] = useState(null);
	const [file, setFile] = useState([]);

	const createCampaignCategorySelector = createSelector(
		(state) => state.CreateCampaignCategoryReducer,
		(layout) => layout
	);
	const createCampaignCategoryDetailSelector = createSelector(
		(state) => state.CampaignCategoryDetailReducer,
		(layout) => layout
	);

	const useCreateCampaignCategorySelect = useSelector(createCampaignCategorySelector);
	const campaignCategoryDetail = useSelector(createCampaignCategoryDetailSelector);

	const campaignCategoryValidation = useFormik({
		enableReinitialize: true,

		initialValues: {
			id: campaignCategoryDetail.campaignCategory?.id || "",
			name: campaignCategoryDetail.campaignCategory?.name || "",
			nameKh: campaignCategoryDetail.campaignCategory?.nameKh || "",
			image: campaignCategoryDetail.campaignCategory?.image || "",
			ordering: campaignCategoryDetail.campaignCategory?.ordering || "",
			isActive: campaignCategoryDetail.campaignCategory ? (campaignCategoryDetail.campaignCategory.isActive ? true : false) : true,
		},
		onSubmit: (values) => {
			values.image = file?.length > 0 ? file[0]?.serverId : "";
			dispatch(createCampaignCategory(values));
		},
	});

	const [modal_backdrop, setmodal_backdrop] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);

	function closeModal() {
		setmodal_backdrop(false);
		campaignCategoryValidation.resetForm();
		setFile([]);
		dispatch(resetCampaignCategoryShowDetail());
	}

	const handleRefresh = () => {
		dispatch(refreshCampaignCategoryList());
	};

	const handleShowCampaignCategoryDetail = (campaignCategoryId) => {
		setmodal_backdrop(true);
		dispatch(fetchCampaignCategoryDetail(campaignCategoryId));
	};

	const handleDeleteCampaignCategory = () => {
		if (UID) {
			dispatch(deleteCampaignCategory(UID));
		}
	};

	useEffect(() => {
		if (useCreateCampaignCategorySelect.success && !useCreateCampaignCategorySelect.isLoading) {
			dispatch(resetCreateCampaignCategoryFlag());
			setmodal_backdrop(false);
			campaignCategoryValidation.resetForm();
			setFile([]);
			dispatch(resetCampaignCategoryShowDetail());
			setDeleteModal(false);
			dispatch(refreshCampaignCategoryList());
		}
	}, [dispatch, campaignCategoryValidation, setDeleteModal, useCreateCampaignCategorySelect, campaignCategoryDetail]);

	useEffect(() => {
		if (campaignCategoryDetail.campaignCategory && campaignCategoryDetail.campaignCategory.image) {
			setFile([
				{
					source: campaignCategoryDetail.campaignCategory.image,
					options: {
						type: "local",
					},
				},
			]);
		} else {
			setFile([]);
		}
	}, [campaignCategoryDetail, setFile]);

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="Campaign Category" pageTitle="Dashboard" />
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
								onShowDetail={handleShowCampaignCategoryDetail}
								onDeleteCampaignCategory={(id) => {
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
				onDeleteClick={handleDeleteCampaignCategory}
				onCloseClick={() => setDeleteModal(false)}
				isLoading={useCreateCampaignCategorySelect.isLoading}
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
					{campaignCategoryDetail.campaignCategory ? "Update Campaign Category" : "Create Campaign Category"}
				</ModalHeader>

				<ModalBody>
					<Form
						onSubmit={(e) => {
							e.preventDefault();
							campaignCategoryValidation.handleSubmit();
							return false;
						}}
						action="#"
						autoComplete="off"
					>
						<div className="text-center">
							<div className="profile-partner position-relative d-inline-block mx-auto  mb-2">
								<div style={{ width: "120px", height: "120px" }}>
									<FilePond
										labelIdle='<span class="filepond--label-action">600 x 600 <br/>pixel</span>'
										files={file}
										onupdatefiles={setFile}
										allowMultiple={false}
										maxFiles={1}
										name="file"
										server={`${api.BASE_URL}/save-image/campaign-categories`}
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
								Name in English
							</Label>
							<Input
								id="name"
								name="name"
								type="text"
								className="form-control"
								placeholder="Enter name"
								onChange={campaignCategoryValidation.handleChange}
								onBlur={campaignCategoryValidation.handleBlur}
								value={campaignCategoryValidation.values.name || ""}
							/>
						</div>
						<div className="mb-2">
							<Label htmlFor="name" className="form-label">
								Name in Khmer
							</Label>
							<Input
								id="name"
								name="nameKh"
								type="text"
								className="form-control"
								placeholder="Enter name"
								onChange={campaignCategoryValidation.handleChange}
								onBlur={campaignCategoryValidation.handleBlur}
								value={campaignCategoryValidation.values.nameKh || ""}
							/>
						</div>
						<div className="mb-2">
							<Label htmlFor="ordering" className="form-label">
								Ordering
							</Label>
							<Input
								id="ordering"
								name="ordering"
								type="text"
								className="form-control"
								placeholder="Enter ordering"
								onChange={campaignCategoryValidation.handleChange}
								onBlur={campaignCategoryValidation.handleBlur}
								value={campaignCategoryValidation.values.ordering || ""}
							/>
						</div>

						<div className="form-check form-switch form-switch-md mb-2" dir="ltr">
							<Input
								type="checkbox"
								className="form-check-input"
								id="isActive"
								name="isActive"
								onChange={campaignCategoryValidation.handleChange}
								onBlur={campaignCategoryValidation.handleBlur}
								checked={campaignCategoryValidation.values.isActive}
							/>
							<Label className="form-check-label" for="isActive">
								Status: <span className="fw-bolder">{campaignCategoryValidation.values.isActive ? "Active" : "In-Active"}</span>
							</Label>
						</div>
						<div className="text-end">
							<Button type="button" color="light" className="btn-label" onClick={closeModal}>
								<i className="ri-close-line label-icon align-middle fs-16 me-2"></i> Discus
							</Button>{" "}
							{useCreateCampaignCategorySelect.isLoading ? (
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

export default withRouter(CampaignCategory);
