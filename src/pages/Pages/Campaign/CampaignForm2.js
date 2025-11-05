import React, { useEffect, useMemo, useState } from "react";
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Col,
	Container,
	Form,
	FormGroup,
	Input,
	Label,
	Nav,
	NavItem,
	NavLink,
	Row,
	Spinner,
	TabContent,
	Table,
	TabPane,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Link, useParams } from "react-router-dom";
import classnames from "classnames";

import { useFormik } from "formik";

import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import {
	createCampaign,
	fetchCampaignDetail,
	resetCampaignShowDetail,
} from "../../../store/actions";
import withRouter from "../../../Components/Common/withRouter";
import { api } from "../../../config";
import CountUp from "react-countup";
import TableContainer from "../../../Components/Common/TableContainer";
import Loader from "../../../Components/Common/Loader";

const CampaignForm2 = (props) => {
	const { id } = useParams();
	document.title = `Campaign: ${id ? "Edit" : "create"} | Admin & Dashboards`;
	// Custom Tabs Bordered
	const [customActiveTab, setcustomActiveTab] = useState("1");
	const toggleCustom = (tab) => {
		if (customActiveTab !== tab) {
			setcustomActiveTab(tab);
		}
	};
	const dispatch = useDispatch();

	const createCampaignSelector = createSelector(
		(state) => state.CreateCampaignReducer,
		(layout) => layout
	);
	const useCampaignSelect = useSelector(createCampaignSelector);
	const createCampaignDetailSelector = createSelector(
		(state) => state.CampaignDetailReducer,
		(layout) => ({
			campaign: layout.campaign,
			isLoading: layout.isLoading,
		})
	);
	const { campaign, isLoading } = useSelector(createCampaignDetailSelector);

	useEffect(() => {
		if (id) dispatch(fetchCampaignDetail(id));

		return () => {
			dispatch(resetCampaignShowDetail());
		};
	}, [id, dispatch]);

	const columns = useMemo(
		() => [
			{
				Header: "ID",
				accessor: "id",
				Cell: (contact) => <span className="fw-semibold">{parseInt(contact.row.id) + 1}</span>,
				filterable: false,
			},
			{
				Header: "Donor",
				accessor: "donorId",
				filterable: false,
				Cell: (donor) => (
					<div className="d-flex align-items-center">
						<div className="flex-shrink-0 me-3">
							<div className="avatar-sm bg-light rounded p-1 d-flex align-items-center">
								{donor.row.original.donor?.image ? (
									<img src={api.FILE_URI + donor.row.original.donor?.image} alt="" className="img-fluid d-block" />
								) : (
									<div className="mx-auto w-100 h-100">
										<div className="avatar-title bg-success-subtle text-success fs-24">
											<i className="mdi mdi-image-filter-hdr"></i>
										</div>
									</div>
								)}
							</div>
						</div>
						<div className="flex-grow-1">
							<h5 className="fs-14 mb-1">
								<Link to="#" className="text-body">
									{donor.row.original.donor?.name || "Anonymous"}
								</Link>
							</h5>
							<p className="text-muted mb-0 text-truncate" style={{ width: "200px" }}>
								<span className="fw-medium ">{donor.row.original.donor?.email || "Undefined"} | {donor.row.original.donor?.phoneNumber || "Undefined"}</span>
							</p>
						</div>
					</div>
				),
			},
			{
				Header: "Amount",
				accessor: "amount",
				filterable: false,
				Cell: (donor) => <span className="fw-semibold">${donor.row.original.amount?.toFixed(2)} USD</span>,
			},
			{
				Header: "Payment Method",
				accessor: "paymentMethod",
				filterable: false,
				Cell: (donor) => <span className="fw-semibold">{donor.row.original.paymentMethod?.toUpperCase()}</span>,
			},
			{
				Header: "Donation Date",
				accessor: "donationDate",
				filterable: false,
				Cell: (donor) => <div className="d-flex align-items-center">
				<div className="flex-grow-1">
					<p className="mb-0">
						<span className="fw-medium text-muted">{donor.row.original.donationDate}</span>
					</p>
				</div>
			</div>,
			},
			
			{
				// End Table
				Header: "Status",
				accessor: "status",
				filterable: false,
				Cell: (donor) => (
					<>
						{donor.row.original.isConfirmAgreement === 1 ? (
							<span className="badge bg-success-subtle text-success">Confirm Payment</span>
						) : (
							<span className="badge bg-danger-subtle text-danger">Payment Decline</span>
						)}
					</>
				),
			}
		],
		[]
	);

	const campaignValidation = useFormik({
		enableReinitialize: true,

		initialValues: {
			id: id || "",
			isInNeed: campaign?.isInNeed === 1 ? true : false,
			isTrending: campaign?.isTrending === 1 ? true : false,
			isLatest: campaign?.isLatest === 1 ? true : false,
			allowEdit: campaign?.allowEdit === 1 ? true : false,
			status: campaign?.status || "",
			ordering: campaign?.ordering || 0,
		},
		onSubmit: (values) => {
			dispatch(createCampaign(values, props.router.navigate));
		},
	});

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="Campaign Menu" pageTitle="Dashboard" pageLink="/campaign-menu" />
					<Row>
						<Col lg={12}>
							<Card>
								<CardHeader>
									<Row className="justify-content-between align-items-center gy-3">
										<Col lg={3}>
											<h5 className="mt-2">{id ? "Edit" : "Create"} Campaign</h5>
										</Col>
										<Col className="col-lg-auto">
											<div className="d-md-flex text-nowrap gap-2">
												<Link className="btn btn-outline-dark" to="/campaign-menu">
													<i className="ri-arrow-go-back-line me-1 align-bottom"></i> Back
												</Link>
											</div>
										</Col>
									</Row>
								</CardHeader>
							</Card>
						</Col>
					</Row>

					<Form
						onSubmit={(e) => {
							e.preventDefault();
							campaignValidation.handleSubmit();
							return false;
						}}
						action="#"
					>
						<Row>
							<Col lg={8}>
								<Card>
									<CardBody>
										<Nav tabs className="nav nav-tabs nav-tabs-custom nav-success nav-justified mb-3">
											<NavItem>
												<NavLink
													style={{ cursor: "pointer" }}
													className={classnames({
														active: customActiveTab === "1",
													})}
													onClick={() => {
														toggleCustom("1");
													}}
												>
													Campaign
												</NavLink>
											</NavItem>
											<NavItem>
												<NavLink
													style={{ cursor: "pointer" }}
													className={classnames({
														active: customActiveTab === "2",
													})}
													onClick={() => {
														toggleCustom("2");
													}}
												>
													Media
												</NavLink>
											</NavItem>
											<NavItem>
												<NavLink
													style={{ cursor: "pointer" }}
													className={classnames({
														active: customActiveTab === "3",
													})}
													onClick={() => {
														toggleCustom("3");
													}}
												>
													Goal
												</NavLink>
											</NavItem>
											<NavItem>
												<NavLink
													style={{ cursor: "pointer" }}
													className={classnames({
														active: customActiveTab === "4",
													})}
													onClick={() => {
														toggleCustom("4");
													}}
												>
													Profile
												</NavLink>
											</NavItem>
											<NavItem>
												<NavLink
													style={{ cursor: "pointer" }}
													className={classnames({
														active: customActiveTab === "5",
													})}
													onClick={() => {
														toggleCustom("5");
													}}
												>
													Donation Record
												</NavLink>
											</NavItem>
										</Nav>

										<TabContent activeTab={customActiveTab} className="text-muted">
											<TabPane tabId="1" id="home1">
												<h5 className="card-title mb-3">Campaign</h5>
												<div className="table-responsive">
													<Table className="table-borderless mb-0">
														<tbody>
															<tr>
																<th className="ps-0" scope="row" style={{ width: "160px" }}>
																	Campaign Category :
																</th>
																<td className="text-muted">{campaign?.campaignCategory?.name}</td>
															</tr>
															<tr>
																<th className="ps-0" scope="row" style={{ width: "160px" }}>
																	Location :
																</th>
																<td className="text-muted">{campaign?.location}</td>
															</tr>
															<tr>
																<th className="ps-0" scope="row" style={{ width: "160px" }}>
																	City/Province :
																</th>
																<td className="text-muted">{campaign?.city}</td>
															</tr>
															<tr>
																<th className="ps-0" scope="row" style={{ width: "160px" }}>
																	Campaign Title :
																</th>
																<td className="text-muted">
																	<p className="mb-0">{campaign?.campaignTile}</p>
																	<p className="mb-0">{campaign?.campaignTileKm}</p>
																</td>
															</tr>
															<tr>
																<th className="ps-0" scope="row" style={{ width: "160px" }}>
																	Reference Link :
																</th>
																<td className="text-muted">{campaign?.referenceLink}</td>
															</tr>
															<tr>
																<th className="ps-0" scope="row" style={{ width: "160px" }}>
																	Full Story :
																</th>
															</tr>
															<tr>
																<td colSpan={2} className="text-muted">
																	<div dangerouslySetInnerHTML={{ __html: campaign?.fullStoryKm }}></div>
																	<div dangerouslySetInnerHTML={{ __html: campaign?.fullStory }}></div>
																</td>
															</tr>
														</tbody>
													</Table>
												</div>
												<h5 className="card-title mb-3">Additional Information</h5>
												<div className="table-responsive">
													<Table className="table-borderless mb-0">
														<tbody>
															<tr>
																<th className="ps-0" scope="row">
																	Use of Funds :
																</th>
															</tr>
															<tr>
																<td colSpan={2} className="text-muted">
																	<p>{campaign?.additionalInformation}</p>
																	<p>{campaign?.additionalInformationKm}</p>
																</td>
															</tr>
															<tr>
																<th className="ps-0" scope="row">
																	Involvement :
																</th>
															</tr>
															<tr>
																<td colSpan={2} className="text-muted">
																	<p>{campaign?.involvement}</p>
																	<p>{campaign?.involvementKm}</p>
																</td>
															</tr>
														</tbody>
													</Table>
												</div>
											</TabPane>
											<TabPane tabId="2">
												<div className="table-responsive">
													<Table className="table-borderless mb-0">
														<tbody>
															<tr>
																<th className="ps-0" scope="row">
																	Gallery :
																</th>
															</tr>
															<tr>
																<td colSpan={2} className="text-muted">
																	<div className="row border border-dashed gx-2 p-2 mb-2">
																		{campaign?.campaignGallery?.map((img, index) => (
																			<div className="col-4" key={index}>
																				<img src={`${api.FILE_URI}${img}`} alt="" className="img-fluid rounded" />
																			</div>
																		))}
																	</div>
																</td>
															</tr>
															<tr>
																<th className="ps-0" scope="row">
																	Video Link :
																</th>
															</tr>
															<tr>
																<td colSpan={2} className="text-muted">
																	<a href={campaign?.videoLink} target="_blank" rel="noreferrer">
																		{campaign?.videoLink}
																	</a>
																</td>
															</tr>
															<tr>
																<th className="ps-0" scope="row">
																	Video :
																</th>
															</tr>
															<tr>
																<td colSpan={2} className="text-muted">
																	<div className=" border border-dashed gx-2 p-2 mb-2">
																		{campaign?.videoFile ? (
																			<video height="320" controls style={{ width: "100%", backgroundColor: "black" }}>
																				<source src={`${api.FILE_URI}${campaign?.videoFile}`} type="video/mp4" />
																			</video>
																		) : null}
																	</div>
																</td>
															</tr>
														</tbody>
													</Table>
												</div>
											</TabPane>
											<TabPane tabId="3">
												<div className="table-responsive">
													<Table className="table-borderless mb-0">
														<tbody>
															<tr>
																<th className="ps-0" scope="row" style={{ width: "160px" }}>
																	Goal :
																</th>
																<td className="text-muted">${campaign?.goal?.toFixed(2)} USD</td>
															</tr>
															<tr>
																<th className="ps-0" scope="row" style={{ width: "160px" }}>
																	Start Date :
																</th>
																<td className="text-muted">{campaign?.startDate}</td>
															</tr>
															<tr>
																<th className="ps-0" scope="row" style={{ width: "160px" }}>
																	End Date :
																</th>
																<td className="text-muted">{campaign?.endDate}</td>
															</tr>
															<tr>
																<th className="ps-0" scope="row" style={{ width: "160px" }}>
																	Gratitude :
																</th>
																<td className="text-muted">
																	<p>{campaign?.gratitude}</p>
																	<p>{campaign?.gratitudeKm}</p>
																</td>
															</tr>
														</tbody>
													</Table>
												</div>
											</TabPane>
											<TabPane tabId="4">
												<div className="table-responsive">
													<Table className="table-borderless mb-0">
														<tbody>
															<tr>
																<th className="ps-0" scope="row">
																	Profile :
																</th>
															</tr>
															<tr>
																<td colSpan={2} className="text-muted">
																	<div className="row border border-dashed gx-2 p-2 mb-2">
																		<div className="col-4">
																			<img
																				src={`${api.FILE_URI}${campaign?.profile}`}
																				alt=""
																				className="rounded-circle avatar-xl"
																				style={{ objectFit: "cover" }}
																			/>
																		</div>
																	</div>
																</td>
															</tr>
															<tr>
																<th className="ps-0" scope="row" style={{ width: "160px" }}>
																	Full Name :
																</th>
																<td className="text-muted">{campaign?.fullName}</td>
															</tr>
															<tr>
																<th className="ps-0" scope="row" style={{ width: "160px" }}>
																	Phone Number :
																</th>
																<td className="text-muted">{campaign?.phoneNumber}</td>
															</tr>
															<tr>
																<th className="ps-0" scope="row" style={{ width: "160px" }}>
																	Document Type :
																</th>
																<td className="text-muted">{campaign?.documentType?.toUpperCase()}</td>
															</tr>
															<tr>
																<th className="ps-0" scope="row" style={{ width: "160px" }}>
																	Identity Number :
																</th>
																<td className="text-muted">{campaign?.identityNumber}</td>
															</tr>
															<tr>
																<td colSpan={2} className="text-muted">
																	<div className="row border border-dashed gx-2 p-2 mb-2">
																		{campaign?.idCardFront ? (
																			<div className="col-4">
																				<img src={`${api.FILE_URI}${campaign?.idCardFront}`} alt="" className="img-fluid rounded" />
																			</div>
																		) : null}
																		{campaign?.idCardBack ? (
																			<div className="col-4">
																				<img src={`${api.FILE_URI}${campaign?.idCardBack}`} alt="" className="img-fluid rounded" />
																			</div>
																		) : null}
																		{campaign?.passport ? (
																			<div className="col-4">
																				<img src={`${api.FILE_URI}${campaign?.passport}`} alt="" className="img-fluid rounded" />
																			</div>
																		) : null}
																	</div>
																</td>
															</tr>
															<tr>
																<th className="ps-0" scope="row" style={{ width: "160px" }}>
																	Location :
																</th>
																<td className="text-muted">{campaign?.location}</td>
															</tr>
															<tr>
																<th className="ps-0" scope="row" style={{ width: "160px" }}>
																	City/Province :
																</th>
																<td className="text-muted">{campaign?.city}</td>
															</tr>
														</tbody>
													</Table>
												</div>
												<h5 className="card-title mt-3 mb-2">Bank Account to Receive Funds</h5>
												<div className="table-responsive">
													<Table className="table-borderless mb-0">
														<tbody>
															<tr>
																<th className="ps-0" scope="row" style={{ width: "160px" }}>
																	Payment Method :
																</th>
																<td className="text-muted">{campaign?.receiveByBank?.toUpperCase()}</td>
															</tr>
															<tr>
																<th className="ps-0" scope="row" style={{ width: "160px" }}>
																	Account Name :
																</th>
																<td className="text-muted">{campaign?.accountName}</td>
															</tr>
															<tr>
																<th className="ps-0" scope="row" style={{ width: "160px" }}>
																	Account Number :
																</th>
																<td className="text-muted">{campaign?.accountNumber}</td>
															</tr>
														</tbody>
													</Table>
												</div>
												<h5 className="card-title mt-3 mb-2">Create By</h5>
												<div className="table-responsive">
													<Table className="table-borderless mb-0">
														<tbody>
															<tr>
																<th className="ps-0" scope="row" style={{ width: "160px" }}>
																	Name :
																</th>
																<td className="text-muted">{campaign?.creator?.name}</td>
															</tr>
															<tr>
																<th className="ps-0" scope="row" style={{ width: "160px" }}>
																	Email :
																</th>
																<td className="text-muted">{campaign?.creator?.email}</td>
															</tr>
															<tr>
																<th className="ps-0" scope="row" style={{ width: "160px" }}>
																	Phone Number :
																</th>
																<td className="text-muted">{campaign?.creator?.phoneNumber}</td>
															</tr>
															<tr>
																<th className="ps-0" scope="row" style={{ width: "160px" }}>
																	Created At :
																</th>
																<td className="text-muted">{campaign?.created_at}</td>
															</tr>
														</tbody>
													</Table>
												</div>
											</TabPane>
											<TabPane tabId="5">
												<Row>
													<Col lg={3} md={6}>
														<Card>
															<CardBody>
																<div className="d-flex align-items-center">
																	<div className="avatar-sm flex-shrink-0">
																		<span className="avatar-title bg-light text-primary shadow rounded-circle fs-3">
																			<i className={"align-middle ri-flag-line"}></i>
																		</span>
																	</div>
																	<div className="flex-grow-1 ms-3">
																		<p className="text-uppercase fw-semibold fs-12 text-muted mb-1">Goal</p>
																		<h4 className=" mb-0">
																			{" "}
																			<CountUp start={0} end={campaign?.goal} decimals={2} separator={","} prefix={"$"} duration={3} />
																		</h4>
																	</div>
																</div>
															</CardBody>
														</Card>
													</Col>
													<Col lg={3} md={6}>
														<Card>
															<CardBody>
																<div className="d-flex align-items-center">
																	<div className="avatar-sm flex-shrink-0">
																		<span className="avatar-title bg-light text-primary shadow rounded-circle fs-3">
																			<i className={"align-middle ri-coins-line"}></i>
																		</span>
																	</div>
																	<div className="flex-grow-1 ms-3">
																		<p className="text-uppercase fw-semibold fs-12 text-muted mb-1">Total Raised</p>
																		<h4 className=" mb-0">
																			{" "}
																			<CountUp start={0} end={campaign?.totalRaised} decimals={2} separator={","} prefix={"$"} duration={3} />
																		</h4>
																	</div>
																</div>
															</CardBody>
														</Card>
													</Col>
													<Col lg={3} md={6}>
														<Card>
															<CardBody>
																<div className="d-flex align-items-center">
																	<div className="avatar-sm flex-shrink-0">
																		<span className="avatar-title bg-light text-primary shadow rounded-circle fs-3">
																			<i className={"align-middle ri-hand-coin-line"}></i>
																		</span>
																	</div>
																	<div className="flex-grow-1 ms-3">
																		<p className="text-uppercase fw-semibold fs-12 text-muted mb-1">Total Donation</p>
																		<h4 className=" mb-0">
																			{" "}
																			<CountUp start={0} end={campaign?.totalDonation} decimals={0} separator={","} prefix={""} duration={3} />
																		</h4>
																	</div>
																</div>
															</CardBody>
														</Card>
													</Col>
													<Col lg={3} md={6}>
														<Card>
															<CardBody>
																<div className="d-flex align-items-center">
																	<div className="avatar-sm flex-shrink-0">
																		<span className="avatar-title bg-light text-primary shadow rounded-circle fs-3">
																			<i className={"align-middle ri-coin-line"}></i>
																		</span>
																	</div>
																	<div className="flex-grow-1 ms-3">
																		<p className="text-uppercase fw-semibold fs-12 text-muted mb-1">Total Tips</p>
																		<h4 className=" mb-0">
																			{" "}
																			<CountUp start={0} end={campaign?.totalTip} decimals={2} separator={","} prefix={"$"} duration={3} />
																		</h4>
																	</div>
																</div>
															</CardBody>
														</Card>
													</Col>
													<Col xs={12}>
														<Card id="contactList">
															<CardBody className="pt-0">
																<div>
																	{!isLoading ? (
																		<TableContainer
																			columns={columns}
																			data={campaign?.donations || []}
																			isGlobalFilter={false}
																			isAddUserList={false}
																			customPageSize={8}
																			className="custom-header-css"
																			divClass="table-responsive table-card mb-2"
																			tableClass="align-middle table-nowrap"
																			theadClass="table-light"
																			isContactsFilter={true}
																			SearchPlaceholder="Search for contact..."
																			isPagination={true}
																		/>
																	) : (
																		<Loader error={true} />
																	)}
																</div>
															</CardBody>
														</Card>
													</Col>
												</Row>
											</TabPane>
										</TabContent>
									</CardBody>
								</Card>
							</Col>
							<Col lg={4}>
								<Card>
									<CardBody>
										<FormGroup>
											<Label for="exampleSelect">Campaign Status</Label>
											<Input
												id="exampleSelect"
												className="form-control"
												name="status"
												onChange={campaignValidation.handleChange}
												value={campaignValidation.values.status}
												type="select"
											>
												<option disabled>{campaignValidation.values.status}</option>
												<option value="COMPLETE">Approve</option>
												<option value="REJECTED">REJECTED</option>
												<option value="FAILED">FAILED</option>
												<option value="INACTIVE">INACTIVE</option>
												<option value="COMPLETE">ACTIVE</option>
											</Input>
										</FormGroup>
										<div className="form-check form-switch form-switch-md" dir="ltr">
											<Input
												type="checkbox"
												className="form-check-input"
												id="isInNeed"
												name="isInNeed"
												onChange={campaignValidation.handleChange}
												onBlur={campaignValidation.handleBlur}
												checked={campaignValidation.values.isInNeed}
											/>
											<Label className="form-check-label" for="isInNeed">
												Is campaign in need: <span className="fw-bolder">{campaignValidation.values.isInNeed ? "TRUE" : "FALSE"}</span>
											</Label>
										</div>
										<div className="form-check form-switch form-switch-md" dir="ltr">
											<Input
												type="checkbox"
												className="form-check-input"
												id="isTrending"
												name="isTrending"
												onChange={campaignValidation.handleChange}
												onBlur={campaignValidation.handleBlur}
												checked={campaignValidation.values.isTrending}
											/>
											<Label className="form-check-label" for="isTrending">
												Is campaign trending: <span className="fw-bolder">{campaignValidation.values.isTrending ? "TRUE" : "FALSE"}</span>
											</Label>
										</div>
										<div className="form-check form-switch form-switch-md" dir="ltr">
											<Input
												type="checkbox"
												className="form-check-input"
												id="isLatest"
												name="isLatest"
												onChange={campaignValidation.handleChange}
												onBlur={campaignValidation.handleBlur}
												checked={campaignValidation.values.isLatest}
											/>
											<Label className="form-check-label" for="isLatest">
												Is latest: <span className="fw-bolder">{campaignValidation.values.isLatest ? "TRUE" : "FALSE"}</span>
											</Label>
										</div>
										<div className="form-check form-switch form-switch-md" dir="ltr">
											<Input
												type="checkbox"
												className="form-check-input"
												id="allowEdit"
												name="allowEdit"
												onChange={campaignValidation.handleChange}
												onBlur={campaignValidation.handleBlur}
												checked={campaignValidation.values.allowEdit}
											/>
											<Label className="form-check-label" for="allowEdit">
												Allow Edit: <span className="fw-bolder">{campaignValidation.values.allowEdit ? "TRUE" : "FALSE"}</span>
											</Label>
										</div>
										<div className="my-3">
											<Label className="form-label" htmlFor="campaign-ordering-input">
												Ordering
											</Label>
											<Input
												type="number"
												className="form-control"
												id="campaign-ordering-input"
												placeholder="Enter campaign ordering"
												name="ordering"
												onChange={campaignValidation.handleChange}
												onBlur={campaignValidation.handleBlur}
												value={campaignValidation.values.ordering}
											/>
										</div>
									</CardBody>
								</Card>
								<div className="text-start mb-4">
									{useCampaignSelect.isLoading ? (
										<Button type="button" color="primary" className="btn-load">
											<span className="d-flex align-items-center">
												<Spinner size="sm" className="flex-shrink-0">
													Loading...
												</Spinner>
												<span className="flex-grow-1 ms-2">Loading...</span>
											</span>
										</Button>
									) : (
										<Button type="button" color="primary" className="btn-label" onClick={() => campaignValidation.handleSubmit()}>
											<i className="ri-save-3-line label-icon align-middle fs-16 me-2"></i> Save Campaign
										</Button>
									)}{" "}
									<Link className="btn btn-label btn-danger" to="/campaign-menu">
										<i className="ri-close-line label-icon align-middle fs-16 me-2"></i> Discus
									</Link>
								</div>
							</Col>
						</Row>
					</Form>
				</Container>
			</div>
		</React.Fragment>
	);
};

export default withRouter(CampaignForm2);
