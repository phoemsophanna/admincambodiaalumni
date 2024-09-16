import React from "react";
import {
	Badge,
	Button,
	Card,
	CardBody,
	CardHeader,
	Col,
	Container,
	Form,
	FormFeedback,
	Input,
	Label,
	Modal,
	ModalBody,
	ModalHeader,
	Row,
	Spinner,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableList from "./TableList";
import { useState } from "react";
import Select from "react-select";
import withRouter from "../../../Components/Common/withRouter";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
	createMember,
	deleteMember,
	fetchMemberDetail,
	refreshMemberList,
	resetCreateMemberFlag,
	resetMemberShowDetail,
} from "../../../store/actions";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import { createSelector } from "reselect";
import { useEffect } from "react";
import DeleteModal from "../../../Components/Common/DeleteModal";
import { api } from "../../../config";
import CountUp from "react-countup";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Member = () => {
	document.title = "Member | Admin & Dashboards";
	const dispatch = useDispatch();
	const [UID, setUID] = useState(null);
	const [file, setFile] = useState([]);
	const [closePassword, setClosePassword] = useState(false);
	const options = [
		{ value: "MEMBER", label: "MEMBER" },
		{ value: "ORGANIZATION", label: "ORGANIZATION" },
	];
	const [memberType, setMemberType] = useState("");
	const handleSelect = (e) => {
		setMemberType(e);
	};
	const optionLoginWith = [
		{ value: 1, label: "Phone Number" },
		{ value: 2, label: "Email" },
	];
	const [loginWith, setLoginWith] = useState(0);
	const handleSelectLoginWith = (e) => {
		setLoginWith(e);
	};

	const createMemberSelector = createSelector(
		(state) => state.CreateMemberReducer,
		(layout) => layout
	);
	const createMemberDetailSelector = createSelector(
		(state) => state.MemberDetailReducer,
		(layout) => layout
	);

	const useCreateMemberSelect = useSelector(createMemberSelector);
	const memberDetail = useSelector(createMemberDetailSelector);

	const memberValidation = useFormik({
		enableReinitialize: true,

		initialValues: {
			id: memberDetail.member?.id || "",
			name: memberDetail.member?.name || "",
			firstName: memberDetail.member?.firstName || "",
			lastName: memberDetail.member?.lastName || "",
			email: memberDetail.member?.email || "",
			phoneNumber: memberDetail.member?.phoneNumber || "",
			memberType: memberDetail.member?.memberType || "",
			loginWith: memberDetail.member?.loginWith || "",
			password: "",
			isActive: memberDetail.member ? (memberDetail.member.isActive ? true : false) : true,
			image: memberDetail.member?.image || "",
		},
		validationSchema: Yup.object({
			password: memberDetail.member ? Yup.string().notRequired() : Yup.string().required("Please Enter Password"),
		}),
		onSubmit: (values) => {
			values.memberType = memberType ? memberType.value : null;
			values.loginWith = loginWith ? loginWith.value : null;
			values.image = file?.length > 0 ? file[0]?.serverId : "";
			values.name = `${values.firstName} ${values.lastName}`;
			dispatch(createMember(values));
		},
	});

	const [modal_backdrop, setmodal_backdrop] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);

	function closeModal() {
		setmodal_backdrop(false);
		memberValidation.resetForm();
		setFile([]);
		dispatch(resetMemberShowDetail());
		setClosePassword(false);
	}

	const handleRefresh = () => {
		dispatch(refreshMemberList());
	};

	const handleShowMemberDetail = (memberId) => {
		setmodal_backdrop(true);
		setClosePassword(true);
		dispatch(fetchMemberDetail(memberId));
	};

	const handleDeleteMember = () => {
		if (UID) {
			dispatch(deleteMember(UID));
		}
	};

	useEffect(() => {
		if (useCreateMemberSelect.success && !useCreateMemberSelect.isLoading) {
			dispatch(resetCreateMemberFlag());
			setmodal_backdrop(false);
			memberValidation.resetForm();
			setFile([]);
			dispatch(resetMemberShowDetail());
			setClosePassword(false);
			setDeleteModal(false);
			dispatch(refreshMemberList());
		}
	}, [dispatch, memberValidation, setDeleteModal, useCreateMemberSelect, memberDetail]);

	useEffect(() => {
		if (memberDetail.member?.memberType) {
			setMemberType({ value: memberDetail.member?.memberType, label: memberDetail.member?.memberType });
		}
		if (memberDetail.member?.loginWith) {
			setLoginWith({
				value: memberDetail.member?.loginWith,
				label:
					memberDetail.member?.loginWith === 1
						? "Phone Number"
						: memberDetail.member?.loginWith === 2
						? "Email"
						: memberDetail.member?.loginWith === 3
						? "Gmail"
						: null,
			});
		}
		if (memberDetail.member && memberDetail.member.image) {
			setFile([
				{
					source: memberDetail.member.image,
					options: {
						type: "local",
					},
				},
			]);
		} else {
			setFile([]);
		}
	}, [memberDetail]);

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="Member Management" pageTitle="Dashboard" />
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
								onShowDetail={handleShowMemberDetail}
								onDeleteMember={(id) => {
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
				onDeleteClick={handleDeleteMember}
				onCloseClick={() => setDeleteModal(false)}
				isLoading={useCreateMemberSelect.isLoading}
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
					{memberDetail.member ? "Update Member" : "Create Member"}
				</ModalHeader>

				<ModalBody>
					<Row>
						<Col lg={6}>
							<Form
								onSubmit={(e) => {
									e.preventDefault();
									memberValidation.handleSubmit();
									return false;
								}}
								action="#"
								autoComplete="off"
							>
								<div className="text-center">
									<div className="profile-member position-relative d-inline-block mx-auto  mb-2">
										<div style={{ width: "120px", height: "120px" }}>
											<FilePond
												labelIdle='<span class="filepond--label-action">Choose Profile Image</span>'
												files={file}
												onupdatefiles={setFile}
												allowMultiple={false}
												maxFiles={1}
												name="file"
												server={`${api.BASE_URL}/save-image/member-profile`}
												className="filepond filepond-input-multiple"
												stylePanelLayout="compact circle"
												styleLoadIndicatorPosition="center bottom"
												styleButtonRemoveItemPosition="center bottom"
												styleProgressIndicatorPosition="center bottom"
											/>
										</div>
									</div>
								</div>
								{useCreateMemberSelect?.error ? <small className="text-danger">{useCreateMemberSelect?.message}</small> : null}
								<div className="mb-2">
									<Label htmlFor="firstName" className="form-label">
										First Name
									</Label>
									<Input
										id="firstName"
										name="firstName"
										type="text"
										className="form-control"
										placeholder="Enter first name"
										onChange={memberValidation.handleChange}
										onBlur={memberValidation.handleBlur}
										value={memberValidation.values.firstName || ""}
										disabled={memberDetail.member}
									/>
								</div>
								<div className="mb-2">
									<Label htmlFor="lastName" className="form-label">
										Last Name
									</Label>
									<Input
										id="lastName"
										name="lastName"
										type="text"
										className="form-control"
										placeholder="Enter last name"
										onChange={memberValidation.handleChange}
										onBlur={memberValidation.handleBlur}
										value={memberValidation.values.lastName || ""}
										disabled={memberDetail.member}
									/>
								</div>
								<div className="mb-2">
									<Label htmlFor="loginWith" className="form-label">
										Login With
									</Label>
									<Select
										isClearable={true}
										value={loginWith}
										onChange={handleSelectLoginWith}
										options={optionLoginWith}
										isDisabled={memberDetail.member}
									/>
								</div>
								<div className="mb-2">
									<Label htmlFor="emailInput" className="form-label">
										Email address
									</Label>
									<Input
										type="email"
										className="form-control"
										id="emailInput"
										placeholder="Enter email"
										name="email"
										onChange={memberValidation.handleChange}
										onBlur={memberValidation.handleBlur}
										value={memberValidation.values.email || ""}
										disabled={memberDetail.member}
									/>
								</div>
								<div className="mb-2">
									<Label htmlFor="phoneNumber" className="form-label">
										Phone number
									</Label>
									<Input
										type="text"
										className="form-control"
										id="phoneNumber"
										placeholder="Enter phone number"
										name="phoneNumber"
										onChange={memberValidation.handleChange}
										onBlur={memberValidation.handleBlur}
										value={memberValidation.values.phoneNumber || ""}
										disabled={memberDetail.member}
									/>
								</div>
								{!memberDetail.member ? (
									<div className="mb-2">
										<Label htmlFor="passwordInput" className="form-label">
											Password{" "}
											{memberDetail.member ? (
												closePassword ? (
													<span className="badge border border-warning text-warning" role="button" onClick={() => setClosePassword(false)}>
														Change Password
													</span>
												) : (
													<span className="badge border border-secondary text-secondary" role="button" onClick={() => setClosePassword(true)}>
														Close Password
													</span>
												)
											) : (
												<small className="text-danger">(Required)</small>
											)}
										</Label>
										<Input
											type="password"
											className="form-control"
											id="passwordInput"
											placeholder="Enter password"
											name="password"
											onChange={memberValidation.handleChange}
											onBlur={memberValidation.handleBlur}
											value={memberValidation.values.password || ""}
											autoComplete="new-password"
											invalid={memberValidation.touched.password && memberValidation.errors.password ? true : false}
											disabled={closePassword}
										/>
										{memberValidation.touched.password && memberValidation.errors.password ? (
											<FormFeedback type="invalid">{memberValidation.errors.password}</FormFeedback>
										) : null}
									</div>
								) : null}

								<div className="mb-2">
									<Label htmlFor="memberType" className="form-label">
										Member Type
									</Label>
									<Select isClearable={true} value={memberType} onChange={handleSelect} options={options} />
								</div>

								<div className="form-check form-switch form-switch-md mb-2" dir="ltr">
									<Input
										type="checkbox"
										className="form-check-input"
										id="isActive"
										name="isActive"
										onChange={memberValidation.handleChange}
										onBlur={memberValidation.handleBlur}
										checked={memberValidation.values.isActive}
									/>
									<Label className="form-check-label" for="isActive">
										Status: <span className="fw-bolder">{memberValidation.values.isActive ? "Active" : "In-Active"}</span>
									</Label>
								</div>
								<div className="text-end">
									<Button type="button" color="light" className="btn-label" onClick={closeModal}>
										<i className="ri-close-line label-icon align-middle fs-16 me-2"></i> Discus
									</Button>{" "}
									{useCreateMemberSelect.isLoading ? (
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
						</Col>
						<Col lg={6} className="bg-light py-3 px-2 rounded">
							<Row>
								<Col lg={6} md={6}>
									<Card>
										<CardBody>
											<div className="d-flex align-items-center">
												<div className="flex-grow-1 ms-3">
													<p className="text-uppercase fw-semibold fs-12 text-muted mb-1">Fund Raised</p>
													<h4 className=" mb-0">
														{" "}
														<CountUp start={0} end={memberDetail?.member?.totalRaised} decimals={2} separator={","} prefix={"$"} duration={3} />
													</h4>
												</div>
											</div>
										</CardBody>
									</Card>
								</Col>
								<Col lg={6} md={6}>
									<Card>
										<CardBody>
											<div className="d-flex align-items-center">
												<div className="flex-grow-1 ms-3">
													<p className="text-uppercase fw-semibold fs-12 text-muted mb-1">Donation</p>
													<h4 className=" mb-0">
														{" "}
														<CountUp start={0} end={memberDetail?.member?.totalDonation} decimals={2} separator={","} prefix={"$"} duration={1} />
													</h4>
												</div>
											</div>
										</CardBody>
									</Card>
								</Col>
								<Col lg={6} md={6}>
									<Card>
										<CardBody>
											<div className="d-flex align-items-center">
												<div className="flex-grow-1 ms-3">
													<p className="text-uppercase fw-semibold fs-12 text-muted mb-1">Withdraw</p>
													<h4 className=" mb-0">
														{" "}
														<CountUp start={0} end={memberDetail?.member?.totalWithdraw} decimals={2} separator={","} prefix={"$"} duration={3} />
													</h4>
												</div>
											</div>
										</CardBody>
									</Card>
								</Col>
								<Col lg={6} md={6}>
									<Card>
										<CardBody>
											<div className="d-flex align-items-center">
												<div className="flex-grow-1 ms-3">
													<p className="text-uppercase fw-semibold fs-12 text-muted mb-1">Balance</p>
													<h4 className=" mb-0">
														{" "}
														<CountUp start={0} end={memberDetail?.member?.totalBalance} decimals={2} separator={","} prefix={"$"} duration={1} />
													</h4>
												</div>
											</div>
										</CardBody>
									</Card>
								</Col>
								<Col lg={6} md={6}>
									<Card>
										<CardBody>
											<div className="d-flex align-items-center">
												<div className="flex-grow-1 ms-3">
													<p className="text-uppercase fw-semibold fs-12 text-muted mb-1">Campaigns</p>
													<h4 className=" mb-0">
														{" "}
														<CountUp start={0} end={memberDetail?.member?.campaignCount} decimals={0} separator={","} prefix={""} duration={1} />
													</h4>
												</div>
											</div>
										</CardBody>
									</Card>
								</Col>
								<Col lg={6} md={6}>
									<Card>
										<CardBody>
											<div className="d-flex align-items-center">
												<div className="flex-grow-1 ms-3">
													<p className="text-uppercase fw-semibold fs-12 text-muted mb-1">Donors</p>
													<h4 className=" mb-0">
														{" "}
														<CountUp start={0} end={memberDetail?.member?.totalDonors} decimals={0} separator={","} prefix={""} duration={3} />
													</h4>
												</div>
											</div>
										</CardBody>
									</Card>
								</Col>
								<Col lg={12}>
									<Label className="form-label" style={{ fontSize: "1rem", fontWeight: "600", textDecoration: "underline" }}>
										Identity Card
									</Label>
									<div className="row border border-dashed gx-2 mb-3">
										{memberDetail?.member?.idCardFront && memberDetail?.member?.idType === "ID_CARD" ? (
											<div className="col-6">
												<img src={api.FILE_URI + memberDetail?.member?.idCardFront} alt="" className="img-fluid rounded" />
											</div>
										) : null}
										{memberDetail?.member?.idCardBack && memberDetail?.member?.idType === "ID_CARD" ? (
											<div className="col-6">
												<img src={api.FILE_URI + memberDetail?.member?.idCardBack} alt="" className="img-fluid rounded" />
											</div>
										) : null}
										{memberDetail?.member?.passport && memberDetail?.member?.idType === "PASSPORT" ? (
											<div className="col-6">
												<img src={api.FILE_URI + memberDetail?.member?.passport} alt="" className="img-fluid rounded" />
											</div>
										) : null}
									</div>
								</Col>
								<Col lg={12}>
									<Label className="form-label" style={{ fontSize: "1rem", fontWeight: "600", textDecoration: "underline" }}>
										Bank Account
									</Label>
									<div className="row gx-2">
										<div className="col-6">
											<div
												style={{
													backgroundColor: "#e0e0e0",
													textAlign: "center",
													fontWeight: "500",
													borderRadius: "6px",
													color: "#5d5d5d",
													fontSize: "14px",
													width: "100%",
													padding: "9px",
												}}
											>
												{memberDetail?.member?.accountName}
											</div>
										</div>
										<div className="col-6">
											<div
												style={{
													backgroundColor: "#e0e0e0",
													textAlign: "center",
													fontWeight: "500",
													borderRadius: "6px",
													color: "#5d5d5d",
													fontSize: "14px",
													width: "100%",
													padding: "9px",
												}}
											>
												{memberDetail?.member?.accountNumber}
											</div>
										</div>
									</div>
								</Col>
							</Row>
						</Col>
					</Row>
				</ModalBody>
			</Modal>
		</React.Fragment>
	);
};

export default withRouter(Member);
