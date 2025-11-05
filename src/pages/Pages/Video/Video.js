import React from "react";
import {
	Button,
	Card,
	CardHeader,
	Col,
	Container,
	Form,
	CardBody,
	Input,
	Label,
	Modal,
	ModalBody,
	ModalHeader,
	Nav, NavItem, NavLink,
	Row,
	Spinner, TabPane, TabContent
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableList from "./TableList";
import { useState } from "react";
import withRouter from "../../../Components/Common/withRouter";

import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
	createVideo,
	deleteVideo,
	fetchVideoDetail,
	refreshVideoList,
	resetCreateVideoFlag,
	resetVideoShowDetail,
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
import classnames from "classnames";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Video = () => {
	document.title = "Video | Admin & Dashboards";
	const dispatch = useDispatch();
	const [UID, setUID] = useState(null);

	const createVideoSelector = createSelector(
		(state) => state.CreateVideoReducer,
		(layout) => layout
	);
	const createVideoDetailSelector = createSelector(
		(state) => state.VideoDetailReducer,
		(layout) => layout
	);

	const useCreateVideoSelect = useSelector(createVideoSelector);
	const campaignCategoryDetail = useSelector(createVideoDetailSelector);

	const campaignCategoryValidation = useFormik({
		enableReinitialize: true,

		initialValues: {
			id: campaignCategoryDetail.campaignCategory?.id || "",
			link: campaignCategoryDetail.campaignCategory?.link || "",
			ordering: campaignCategoryDetail.campaignCategory?.ordering || "",
			isActive: campaignCategoryDetail.campaignCategory ? (campaignCategoryDetail.campaignCategory.isActive == 1 ? true : false) : true,
		},
		onSubmit: (values) => {
			dispatch(createVideo(values));
		},
	});

	const [modal_backdrop, setmodal_backdrop] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);

	function closeModal() {
		setmodal_backdrop(false);
		campaignCategoryValidation.resetForm();
		dispatch(resetVideoShowDetail());
	}

	const handleRefresh = () => {
		dispatch(refreshVideoList());
	};

	const handleShowVideoDetail = (campaignCategoryId) => {
		setmodal_backdrop(true);
		dispatch(fetchVideoDetail(campaignCategoryId));
	};

	const handleDeleteVideo = () => {
		if (UID) {
			dispatch(deleteVideo(UID));
		}
	};

	useEffect(() => {
		if (useCreateVideoSelect.success && !useCreateVideoSelect.isLoading) {
			dispatch(resetCreateVideoFlag());
			setmodal_backdrop(false);
			campaignCategoryValidation.resetForm();
			dispatch(resetVideoShowDetail());
			setDeleteModal(false);
			dispatch(refreshVideoList());
		}
	}, [dispatch, campaignCategoryValidation, setDeleteModal, useCreateVideoSelect, campaignCategoryDetail]);

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="Video" pageTitle="Dashboard" />
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
								onShowDetail={handleShowVideoDetail}
								onDeleteVideo={(id) => {
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
				onDeleteClick={handleDeleteVideo}
				onCloseClick={() => setDeleteModal(false)}
				isLoading={useCreateVideoSelect.isLoading}
			/>
			<Modal
				isOpen={modal_backdrop}
				toggle={() => {
					closeModal();
				}}
				backdrop={"static"}
				id="staticBackdrop"
				centered
				size="md"
			>
				<ModalHeader className="bg-light p-3 text-light" toggle={closeModal}>
					{campaignCategoryDetail.campaignCategory ? "Update Video" : "Create Video"}
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
						<Card>
							<CardBody>
								<div className="row">
									<div className="col-12 col-md-12">
										<div className="mb-2">
											<Label htmlFor="link" className="form-label">
												Link
											</Label>
											<Input
												id="link"
												name="link"
												type="text"
												className="form-control"
												placeholder="Enter link"
												onChange={campaignCategoryValidation.handleChange}
												onBlur={campaignCategoryValidation.handleBlur}
												value={campaignCategoryValidation.values.link || ""}
											/>
										</div>
									</div>
								</div>

								<div className="row">
									<div className="col-12 col-md-12">
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
									</div>
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
										Status: <span className="fw-bolder">{campaignCategoryValidation.values.isActive ? "Active " : "In-Active "}</span>
									</Label>
								</div>
								{" "}

							</CardBody>
						</Card>
						<div className="text-end">
							<Button type="button" color="light" className="btn-label" onClick={closeModal}>
								<i className="ri-close-line label-icon align-middle fs-16 me-2"></i> Discus
							</Button>{" "}
							{useCreateVideoSelect.isLoading ? (
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

export default withRouter(Video);
