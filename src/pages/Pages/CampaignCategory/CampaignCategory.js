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
import classnames from "classnames";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const CampaignCategory = () => {
	document.title = "Project Category | Admin & Dashboards";
	const dispatch = useDispatch();
	const [titleTap, settitleTap] = useState("ENG");
	const titleTapToggle = (tab) => {
		if (titleTap !== tab) {
			settitleTap(tab);
		}
	};
	const [UID, setUID] = useState(null);
	const [file, setFile] = useState([]);
	const [file2, setFile2] = useState([]);

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
			nameCh: campaignCategoryDetail.campaignCategory?.nameCh || "",
			desc: campaignCategoryDetail.campaignCategory?.desc || "",
			descKh: campaignCategoryDetail.campaignCategory?.descKh || "",
			descCh: campaignCategoryDetail.campaignCategory?.descCh || "",
			image: campaignCategoryDetail.campaignCategory?.image || "",
			thumbnail: campaignCategoryDetail.campaignCategory?.thumbnail || "",
			color: campaignCategoryDetail.campaignCategory?.color || "",
			ordering: campaignCategoryDetail.campaignCategory?.ordering || "",
			isActive: campaignCategoryDetail.campaignCategory ? (campaignCategoryDetail.campaignCategory.isActive == 1 ? true : false) : true,
			isDisplayHomePage: campaignCategoryDetail.campaignCategory ? (campaignCategoryDetail.campaignCategory.isDisplayHomePage == 1 ? true : false) : true,
		},
		onSubmit: (values) => {
			values.image = file?.length > 0 ? file[0]?.serverId : "";
			values.thumbnail = file2?.length > 0 ? file2[0]?.serverId : "";
			dispatch(createCampaignCategory(values));
		},
	});

	const [modal_backdrop, setmodal_backdrop] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);

	function closeModal() {
		setmodal_backdrop(false);
		campaignCategoryValidation.resetForm();
		setFile([]);
		setFile2([]);
		settitleTap("ENG");
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
			setFile2([]);
			settitleTap("ENG");
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
	useEffect(() => {
		if (campaignCategoryDetail.campaignCategory && campaignCategoryDetail.campaignCategory.thumbnail) {
			setFile2([
				{
					source: campaignCategoryDetail.campaignCategory.thumbnail,
					options: {
						type: "local",
					},
				},
			]);
		} else {
			setFile2([]);
		}
	}, [campaignCategoryDetail, setFile2]);

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="Project Category" pageTitle="Dashboard" />
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
				size="md"
			>
				<ModalHeader className="bg-light p-3 text-light" toggle={closeModal}>
					{campaignCategoryDetail.campaignCategory ? "Update Project Category" : "Create Project Category"}
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
							<CardHeader>
								<div className="align-items-center d-flex">
									<div className="flex-shrink-0">
										<Nav tabs className="nav justify-content-end nav-tabs-custom rounded card-header-tabs border-bottom-0">
											<NavItem>
												<NavLink
													style={{ cursor: "pointer" }}
													className={classnames({ active: titleTap === "ENG" })}
													onClick={() => {
														titleTapToggle("ENG");
													}}
												>
													English
												</NavLink>
											</NavItem>
											<NavItem>
												<NavLink
													style={{ cursor: "pointer" }}
													className={classnames({ active: titleTap === "KHM" })}
													onClick={() => {
														titleTapToggle("KHM");
													}}
												>
													Khmer
												</NavLink>
											</NavItem>
											<NavItem>
												<NavLink
													style={{ cursor: "pointer" }}
													className={classnames({ active: titleTap === "CH" })}
													onClick={() => {
														titleTapToggle("CH");
													}}
												>
													Chinese
												</NavLink>
											</NavItem>
										</Nav>
									</div>
								</div>
							</CardHeader>
							<CardBody>
								<TabContent activeTab={titleTap}>
									<TabPane tabId="ENG" id="eng">
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
										<div className="mb-3">
											<Label className="form-label" htmlFor="description-input">
												Description
											</Label>
											<textarea
												className="form-control"
												id="description-input"
												rows="3"
												placeholder="Enter description"
												name="desc"
												onChange={campaignCategoryValidation.handleChange}
												onBlur={campaignCategoryValidation.handleBlur}
												value={campaignCategoryValidation.values.desc}
											></textarea>
										</div>
									</TabPane>
									<TabPane tabId="KHM" id="khm">
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
										<div className="mb-3">
											<Label className="form-label" htmlFor="description-input">
												Description
											</Label>
											<textarea
												className="form-control"
												id="description-input"
												rows="3"
												placeholder="Enter description"
												name="descKh"
												onChange={campaignCategoryValidation.handleChange}
												onBlur={campaignCategoryValidation.handleBlur}
												value={campaignCategoryValidation.values.descKh}
											></textarea>
										</div>
									</TabPane>
									<TabPane tabId="CH" id="ch">
										<div className="mb-2">
											<Label htmlFor="name" className="form-label">
												Name in Chinese
											</Label>
											<Input
												id="name"
												name="nameCh"
												type="text"
												className="form-control"
												placeholder="Enter name"
												onChange={campaignCategoryValidation.handleChange}
												onBlur={campaignCategoryValidation.handleBlur}
												value={campaignCategoryValidation.values.nameCh || ""}
											/>
										</div>
										<div className="mb-3">
											<Label className="form-label" htmlFor="description-input">
												Description
											</Label>
											<textarea
												className="form-control"
												id="description-input"
												rows="3"
												placeholder="Enter description"
												name="descCh"
												onChange={campaignCategoryValidation.handleChange}
												onBlur={campaignCategoryValidation.handleBlur}
												value={campaignCategoryValidation.values.descCh}
											></textarea>
										</div>
									</TabPane>
								</TabContent>

								<div className="row">
									<div className="col-12 col-md-6">
										<div className="mb-2">
											<Label htmlFor="color" className="form-label">
												Color
											</Label>
											<Input
												id="color"
												name="color"
												type="text"
												className="form-control"
												placeholder="Enter color"
												onChange={campaignCategoryValidation.handleChange}
												onBlur={campaignCategoryValidation.handleBlur}
												value={campaignCategoryValidation.values.color || ""}
											/>
										</div>
									</div>
									<div className="col-12 col-md-6">
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

								<div className="row">
									<div className="col-md-6 col-12">
										<Label className="form-label">
											Icon (600x600 Pixel)
										</Label>
										<div style={{ width: "100%" }}>
											<FilePond
												labelIdle='<span class="filepond--label-action">600 x 600 <br/>pixel</span>'
												files={file}
												onupdatefiles={setFile}
												allowMultiple={false}
												maxFiles={1}
												name="file"
												server={`${api.BASE_URL}/save-image/campaign-categories`}
												className="filepond filepond-input-multiple"
												stylePanelLayout="compact"
												styleLoadIndicatorPosition="center bottom"
												styleButtonRemoveItemPosition="center bottom"
												styleProgressIndicatorPosition="center bottom"
											/>
										</div>
									</div>
									<div className="col-md-6 col-12">
										<Label className="form-label">
											Thumbnail (631x375 Pixel)
										</Label>
										<div style={{ width: "100%" }}>
											<FilePond
												labelIdle='<span class="filepond--label-action">600 x 600 <br/>pixel</span>'
												files={file2}
												onupdatefiles={setFile2}
												allowMultiple={false}
												maxFiles={1}
												name="file"
												server={`${api.BASE_URL}/save-image/campaign-categories`}
												className="filepond filepond-input-multiple"
												stylePanelLayout="compact"
												styleLoadIndicatorPosition="center bottom"
												styleButtonRemoveItemPosition="center bottom"
												styleProgressIndicatorPosition="center bottom"
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
								<div className="form-check form-switch form-switch-md mb-2" dir="ltr">
									<Input
										type="checkbox"
										className="form-check-input"
										id="isDisplayHomePage"
										name="isDisplayHomePage"
										onChange={campaignCategoryValidation.handleChange}
										onBlur={campaignCategoryValidation.handleBlur}
										checked={campaignCategoryValidation.values.isDisplayHomePage}
									/>
									<Label className="form-check-label" for="isDisplayHomePage">
										Display on Homepage?: <span className="fw-bolder">{campaignCategoryValidation.values.isDisplayHomePage ? "Display" : "Hide"}</span>
									</Label>
								</div>

							</CardBody>
						</Card>
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
