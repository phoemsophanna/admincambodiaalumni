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
	Nav,
	NavItem,
	NavLink,
	Row,
	Spinner,
	TabPane,
	TabContent,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableList from "./TableList";
import { useState } from "react";
import withRouter from "../../../Components/Common/withRouter";

import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createTeam, deleteTeam, fetchTeamDetail, refreshTeamList, resetCreateTeamFlag, resetTeamShowDetail } from "../../../store/actions";

import { createSelector } from "reselect";
import { useEffect } from "react";
import DeleteModal from "../../../Components/Common/DeleteModal";
import { api } from "../../../config";
import TinymceEditor from "../../../Components/Common/TinymceEditor";

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

const Team = () => {
	document.title = "Campaign Category | Admin & Dashboards";
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
	const [des, setDes] = useState("");
	const [desKh, setDesKh] = useState("");
	const [desCh, setDesCh] = useState("");

	const handleEditorChange = (e) => {
		setDes(e.target.getContent());
	};

	const handleEditorKhChange = (e) => {
		setDesKh(e.target.getContent());
	};

	const handleEditorChChange = (e) => {
		setDesCh(e.target.getContent());
	};

	const createTeamSelector = createSelector(
		(state) => state.CreateTeamReducer,
		(layout) => layout
	);
	const createTeamDetailSelector = createSelector(
		(state) => state.TeamDetailReducer,
		(layout) => layout
	);

	const useCreateTeamSelect = useSelector(createTeamSelector);
	const teamDetail = useSelector(createTeamDetailSelector);

	const teamValidation = useFormik({
		enableReinitialize: true,
		initialValues: {
			id: teamDetail.team?.id || "",
			name: teamDetail.team?.name || "",
			nameKh: teamDetail.team?.nameKh || "",
			nameCh: teamDetail.team?.nameCh || "",
			position: teamDetail.team?.position || "",
			positionKh: teamDetail.team?.positionKh || "",
			positionCh: teamDetail.team?.positionCh || "",
			desc: teamDetail.team?.desc || "",
			descKh: teamDetail.team?.descKh || "",
			descCh: teamDetail.team?.descCh || "",
			image: teamDetail.team?.image || "",
			facebookLink: teamDetail.team?.facebookLink || "",
			instagramLink: teamDetail.team?.instagramLink || "",
			linkedinLink: teamDetail.team?.linkedinLink || "",
			telegramLink: teamDetail.team?.telegramLink || "",
			ordering: teamDetail.team?.ordering || "",
			isActive: teamDetail.team ? (teamDetail.team.isActive ? true : false) : true,
		},
		onSubmit: (values) => {
			values.desc = des;
			values.descKh = desKh;
			values.descCh = desCh;
			values.image = file?.length > 0 ? file[0]?.serverId : "";
			values.thumbnail = file2?.length > 0 ? file2[0]?.serverId : "";
			dispatch(createTeam(values));
		},
	});

	const [modal_backdrop, setmodal_backdrop] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);

	function closeModal() {
		setmodal_backdrop(false);
		teamValidation.resetForm();
		setFile([]);
		setFile2([]);
		setDes("");
		setDesKh("");
		setDesCh("");
		settitleTap("ENG");
		dispatch(resetTeamShowDetail());
	}

	const handleRefresh = () => {
		dispatch(refreshTeamList());
	};

	const handleShowTeamDetail = (teamId) => {
		setmodal_backdrop(true);
		dispatch(fetchTeamDetail(teamId));
	};

	const handleDeleteTeam = () => {
		if (UID) {
			dispatch(deleteTeam(UID));
		}
	};

	useEffect(() => {
		if (useCreateTeamSelect.success && !useCreateTeamSelect.isLoading) {
			dispatch(resetCreateTeamFlag());
			setmodal_backdrop(false);
			teamValidation.resetForm();
			setFile([]);
			setFile2([]);
			setDes("");
			setDesKh("");
			setDesCh("");
			settitleTap("ENG");
			dispatch(resetTeamShowDetail());
			setDeleteModal(false);
			dispatch(refreshTeamList());
		}
	}, [dispatch, teamValidation, setDeleteModal, useCreateTeamSelect, teamDetail]);

	useEffect(() => {
		if (teamDetail.team && teamDetail.team.image) {
			setFile([
				{
					source: teamDetail.team.image,
					options: {
						type: "local",
					},
				},
			]);
		} else {
			setFile([]);
		}

	}, [teamDetail, setFile]);

	useEffect(()=>{
		setDes(teamDetail?.team?.desc ? teamDetail.team.desc : "");
		setDesKh(teamDetail?.team?.descKh ? teamDetail.team.descKh : "");
		setDesCh(teamDetail?.team?.descCh ? teamDetail.team.descCh : "");
	}, [teamDetail])

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="Team" pageTitle="Dashboard" />
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
								onShowDetail={handleShowTeamDetail}
								onDeleteTeam={(id) => {
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
				onDeleteClick={handleDeleteTeam}
				onCloseClick={() => setDeleteModal(false)}
				isLoading={useCreateTeamSelect.isLoading}
			/>
			<Modal
				isOpen={modal_backdrop}
				toggle={() => {
					closeModal();
				}}
				backdrop={"static"}
				id="staticBackdrop"
				centered
				size="lg"
			>
				<ModalHeader className="bg-light p-3 text-light" toggle={closeModal}>
					{teamDetail.team ? "Update Team" : "Create Team"}
				</ModalHeader>

				<ModalBody>
					<Form
						onSubmit={(e) => {
							e.preventDefault();
							teamValidation.handleSubmit();
							return false;
						}}
						action="#"
						autoComplete="off"
					>
						<div className="row justify-content-center">
							<div className="col-4">
								<div style={{ width: "125px", height: "125px" }}>
									<FilePond
										labelIdle='<span class="filepond--label-action">600 x 600 <br/>pixel</span>'
										files={file}
										onupdatefiles={setFile}
										allowMultiple={false}
										maxFiles={1}
										name="file"
										server={`${api.BASE_URL}/save-image/teams`}
										className="filepond filepond-input-multiple"
										stylePanelLayout="compact circle"
										styleLoadIndicatorPosition="center bottom"
										styleButtonRemoveItemPosition="center bottom"
										styleProgressIndicatorPosition="center bottom"
									/>
								</div>
							</div>
						</div>
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
										<Row>
											<Col md={6}>
												<div className="mb-2">
													<Label htmlFor="name" className="form-label">
														Full Name
													</Label>
													<Input
														id="name"
														name="name"
														type="text"
														className="form-control"
														placeholder="Enter name"
														onChange={teamValidation.handleChange}
														onBlur={teamValidation.handleBlur}
														value={teamValidation.values.name || ""}
													/>
												</div>
											</Col>
											<Col md={6}>
												<div className="mb-2">
													<Label htmlFor="position" className="form-label">
														Position
													</Label>
													<Input
														id="position"
														name="position"
														type="text"
														className="form-control"
														placeholder="Enter position"
														onChange={teamValidation.handleChange}
														onBlur={teamValidation.handleBlur}
														value={teamValidation.values.position || ""}
													/>
												</div>
											</Col>
										</Row>
										<div className="mb-3">
											<Label className="form-label" htmlFor="description-input">
												Description
											</Label>
											<TinymceEditor onUploadImage={handleEditorChange} initDataValue={des} />
											{/* <textarea
												className="form-control"
												id="description-input"
												rows="5"
												placeholder="Enter description"
												name="desc"
												onChange={teamValidation.handleChange}
												onBlur={teamValidation.handleBlur}
												value={teamValidation.values.desc}
											></textarea> */}
										</div>
									</TabPane>
									<TabPane tabId="KHM" id="khm">
										<Row>
											<Col md={6}>
												<div className="mb-2">
													<Label htmlFor="nameKh" className="form-label">
														Full Name
													</Label>
													<Input
														id="nameKh"
														name="nameKh"
														type="text"
														className="form-control"
														placeholder="Enter name"
														onChange={teamValidation.handleChange}
														onBlur={teamValidation.handleBlur}
														value={teamValidation.values.nameKh || ""}
													/>
												</div>
											</Col>
											<Col md={6}>
												<div className="mb-2">
													<Label htmlFor="positionKh" className="form-label">
														Position
													</Label>
													<Input
														id="positionKh"
														name="positionKh"
														type="text"
														className="form-control"
														placeholder="Enter positionKh"
														onChange={teamValidation.handleChange}
														onBlur={teamValidation.handleBlur}
														value={teamValidation.values.positionKh || ""}
													/>
												</div>
											</Col>
										</Row>
										<div className="mb-3">
											<Label className="form-label" htmlFor="description-input">
												Description
											</Label>
											<TinymceEditor onUploadImage={handleEditorKhChange} initDataValue={desKh} />
											{/* <textarea
												className="form-control"
												id="description-input"
												rows="2"
												placeholder="Enter description"
												name="descKh"
												onChange={teamValidation.handleChange}
												onBlur={teamValidation.handleBlur}
												value={teamValidation.values.descKh}
											></textarea> */}
										</div>
									</TabPane>
									<TabPane tabId="CH" id="ch">
										<Row>
											<Col md={6}>
												<div className="mb-2">
													<Label htmlFor="nameCh" className="form-label">
														Full Name
													</Label>
													<Input
														id="nameCh"
														name="nameCh"
														type="text"
														className="form-control"
														placeholder="Enter name"
														onChange={teamValidation.handleChange}
														onBlur={teamValidation.handleBlur}
														value={teamValidation.values.nameCh || ""}
													/>
												</div>
											</Col>
											<Col md={6}>
												<div className="mb-2">
													<Label htmlFor="positionCh" className="form-label">
														Position
													</Label>
													<Input
														id="positionCh"
														name="positionCh"
														type="text"
														className="form-control"
														placeholder="Enter positionCh"
														onChange={teamValidation.handleChange}
														onBlur={teamValidation.handleBlur}
														value={teamValidation.values.positionCh || ""}
													/>
												</div>
											</Col>
										</Row>
										<div className="mb-3">
											<Label className="form-label" htmlFor="description-input">
												Description
											</Label>
											<TinymceEditor onUploadImage={handleEditorChChange} initDataValue={desCh} />
											{/* <textarea
												className="form-control"
												id="description-input"
												rows="2"
												placeholder="Enter description"
												name="descKh"
												onChange={teamValidation.handleChange}
												onBlur={teamValidation.handleBlur}
												value={teamValidation.values.descKh}
											></textarea> */}
										</div>
									</TabPane>
								</TabContent>
								<div className="row">
									<div className="col-12 col-md-6">
										<div className="form-icon mb-3">
											<Input
												type="text"
												className="form-control form-control-icon"
												placeholder="Enter link"
												name="facebookLink"
												onChange={teamValidation.handleChange}
												onBlur={teamValidation.handleBlur}
												value={teamValidation.values.facebookLink || ""}
											/>
											<i className="ri-facebook-circle-line"></i>
										</div>
									</div>
									<div className="col-12 col-md-6">
										<div className="form-icon mb-3">
											<Input
												type="text"
												className="form-control form-control-icon"
												placeholder="Enter link"
												name="instagramLink"
												onChange={teamValidation.handleChange}
												onBlur={teamValidation.handleBlur}
												value={teamValidation.values.instagramLink || ""}
											/>
											<i className="ri-instagram-line"></i>
										</div>
									</div>
									<div className="col-12 col-md-6">
										<div className="form-icon mb-3">
											<Input
												type="text"
												className="form-control form-control-icon"
												placeholder="Enter link"
												name="telegramLink"
												onChange={teamValidation.handleChange}
												onBlur={teamValidation.handleBlur}
												value={teamValidation.values.telegramLink || ""}
											/>
											<i className="ri-telegram-line"></i>
										</div>
									</div>
									<div className="col-12 col-md-6">
										<div className="form-icon mb-3">
											<Input
												type="text"
												className="form-control form-control-icon"
												placeholder="Enter link"
												name="linkedinLink"
												onChange={teamValidation.handleChange}
												onBlur={teamValidation.handleBlur}
												value={teamValidation.values.linkedinLink || ""}
											/>
											<i className="ri-linkedin-line"></i>
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
												onChange={teamValidation.handleChange}
												onBlur={teamValidation.handleBlur}
												value={teamValidation.values.ordering || ""}
											/>
										</div>
									</div>
									<div className="col-12 col-md-6">
										<div className="form-check form-switch form-switch-md mb-2 mt-4" dir="ltr">
											<Input
												type="checkbox"
												className="form-check-input"
												id="isActive"
												name="isActive"
												onChange={teamValidation.handleChange}
												onBlur={teamValidation.handleBlur}
												checked={teamValidation.values.isActive}
											/>
											<Label className="form-check-label" for="isActive">
												Status: <span className="fw-bolder">{teamValidation.values.isActive ? "Active " : "In-Active "}</span>
											</Label>
										</div>
									</div>
								</div>
							</CardBody>
						</Card>
						<div className="text-end">
							<Button type="button" color="light" className="btn-label" onClick={closeModal}>
								<i className="ri-close-line label-icon align-middle fs-16 me-2"></i> Discus
							</Button>{" "}
							{useCreateTeamSelect.isLoading ? (
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

export default withRouter(Team);
