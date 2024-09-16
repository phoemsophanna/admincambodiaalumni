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
import { createWithdraw, fetchWithdrawDetail, resetWithdrawShowDetail } from "../../../store/actions";
import withRouter from "../../../Components/Common/withRouter";
import { api } from "../../../config";
import CountUp from "react-countup";
import TableContainer from "../../../Components/Common/TableContainer";
import Loader from "../../../Components/Common/Loader";

const WithdrawForm = (props) => {
	const { id } = useParams();
	document.title = `Withdraw: ${id ? "Edit" : "create"} | Admin & Dashboards`;
	// Custom Tabs Bordered
	const [customActiveTab, setcustomActiveTab] = useState("1");
	const toggleCustom = (tab) => {
		if (customActiveTab !== tab) {
			setcustomActiveTab(tab);
		}
	};
	const dispatch = useDispatch();

	const createWithdrawSelector = createSelector(
		(state) => state.CreateWithdrawReducer,
		(layout) => layout
	);
	const useWithdrawSelect = useSelector(createWithdrawSelector);
	const createWithdrawDetailSelector = createSelector(
		(state) => state.WithdrawDetailReducer,
		(layout) => ({
			withdraw: layout.withdraw,
			isLoading: layout.isLoading,
		})
	);
	const { withdraw, isLoading } = useSelector(createWithdrawDetailSelector);

	useEffect(() => {
		if (id) dispatch(fetchWithdrawDetail(id));

		return () => {
			dispatch(resetWithdrawShowDetail());
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
								<span className="fw-medium ">
									{donor.row.original.donor?.email || "Undefined"} | {donor.row.original.donor?.phoneNumber || "Undefined"}
								</span>
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
				Cell: (donor) => (
					<div className="d-flex align-items-center">
						<div className="flex-grow-1">
							<p className="mb-0">
								<span className="fw-medium text-muted">{donor.row.original.donationDate}</span>
							</p>
						</div>
					</div>
				),
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
			},
		],
		[]
	);

	const withdrawValidation = useFormik({
		enableReinitialize: true,

		initialValues: {
			id: id || "",
			isInNeed: withdraw?.campaign?.isInNeed === 1 ? true : false,
			isTrending: withdraw?.campaign?.isTrending === 1 ? true : false,
			isLatest: withdraw?.campaign?.isLatest === 1 ? true : false,
			allowEdit: withdraw?.campaign?.allowEdit === 1 ? true : false,
			status: withdraw?.campaign?.status || "",
			ordering: withdraw?.campaign?.ordering || 0,
		},
		onSubmit: (values) => {
			dispatch(createWithdraw(values, props.router.navigate));
		},
	});

	const handleApproveWithdraw = () => {
		const payload = {
			id: id,
			withdrawStatus: "APPROVE",
		};
		dispatch(createWithdraw(payload, props.router.navigate));
	};
	const handleRejectWithdraw = () => {
		const payload = {
			id: id,
			withdrawStatus: "REJECT",
		};
		dispatch(createWithdraw(payload, props.router.navigate));
	};

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="Withdraw Menu" pageTitle="Dashboard" pageLink="/withdraw-menu" />
					<Row>
						<Col lg={12}>
							<Card>
								<CardHeader>
									<Row className="justify-content-between align-items-center gy-3">
										<Col lg={3}>
											<h5 className="mt-2">Withdraw Detail</h5>
										</Col>
										<Col className="col-lg-auto">
											<div className="d-md-flex text-nowrap gap-2">
												<Link className="btn btn-outline-dark" to="/withdraw-menu">
													<i className="ri-arrow-go-back-line me-1 align-bottom"></i> Back
												</Link>
											</div>
										</Col>
									</Row>
								</CardHeader>
							</Card>
						</Col>
					</Row>
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
																Campaign Title :
															</th>
															<td className="text-muted">
																<p className="mb-0">{withdraw?.campaign?.campaignTile}</p>
																<p className="mb-0">{withdraw?.campaign?.campaignTileKm}</p>
															</td>
														</tr>
														<tr>
															<th className="ps-0" scope="row" style={{ width: "160px" }}>
																Campaign Category :
															</th>
															<td className="text-muted">{withdraw?.campaign?.campaignCategory?.name}</td>
														</tr>
														<tr>
															<th className="ps-0" scope="row" style={{ width: "160px" }}>
																Location :
															</th>
															<td className="text-muted">{withdraw?.campaign?.location}</td>
														</tr>
														<tr>
															<th className="ps-0" scope="row" style={{ width: "160px" }}>
																City/Province :
															</th>
															<td className="text-muted">{withdraw?.campaign?.city}</td>
														</tr>

														<tr>
															<th className="ps-0" scope="row" style={{ width: "160px" }}>
																Reference Link :
															</th>
															<td className="text-muted">{withdraw?.campaign?.referenceLink}</td>
														</tr>
														<tr>
															<th className="ps-0" scope="row" style={{ width: "160px" }}>
																Full Story :
															</th>
														</tr>
														<tr>
															<td colSpan={2} className="text-muted bg-light rounded">
																<div dangerouslySetInnerHTML={{ __html: withdraw?.campaign?.fullStoryKm }}></div>
															</td>
														</tr>
														<tr>
															<td style={{ padding: "2px" }}></td>
														</tr>
														<tr>
															<td colSpan={2} className="text-muted bg-light rounded">
																<div dangerouslySetInnerHTML={{ __html: withdraw?.campaign?.fullStory }}></div>
															</td>
														</tr>
													</tbody>
												</Table>
											</div>
											<h5 className="card-title mt-3 mb-3">Additional Information</h5>
											<div className="table-responsive">
												<Table className="table-borderless mb-0">
													<tbody>
														<tr>
															<th className="ps-0" scope="row">
																Use of Funds :
															</th>
														</tr>
														<tr>
															<td colSpan={2} className="text-muted bg-light rounded">
																<p>{withdraw?.campaign?.additionalInformation}</p>
															</td>
														</tr>
														<tr>
															<td style={{ padding: "2px" }}></td>
														</tr>
														<tr>
															<td colSpan={2} className="text-muted bg-light rounded">
																<p>{withdraw?.campaign?.additionalInformationKm}</p>
															</td>
														</tr>
														<tr>
															<th className="ps-0" scope="row">
																Involvement :
															</th>
														</tr>
														<tr>
															<td colSpan={2} className="text-muted bg-light rounded">
																<p>{withdraw?.campaign?.involvement}</p>
															</td>
														</tr>
														<tr>
															<td style={{ padding: "2px" }}></td>
														</tr>
														<tr>
															<td colSpan={2} className="text-muted bg-light rounded">
																<p>{withdraw?.campaign?.involvementKm}</p>
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
																	{withdraw?.campaign?.withdrawGallery?.map((img, index) => (
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
																<a href={withdraw?.campaign?.videoLink} target="_blank" rel="noreferrer">
																	{withdraw?.campaign?.videoLink}
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
																	{withdraw?.campaign?.videoFile ? (
																		<video height="320" controls style={{ width: "100%", backgroundColor: "black" }}>
																			<source src={`${api.FILE_URI}${withdraw?.campaign?.videoFile}`} type="video/mp4" />
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
															<td className="text-muted">${withdraw?.campaign?.goal?.toFixed(2)} USD</td>
														</tr>
														<tr>
															<th className="ps-0" scope="row" style={{ width: "160px" }}>
																Start Date :
															</th>
															<td className="text-muted">{withdraw?.campaign?.startDate}</td>
														</tr>
														<tr>
															<th className="ps-0" scope="row" style={{ width: "160px" }}>
																End Date :
															</th>
															<td className="text-muted">{withdraw?.campaign?.endDate}</td>
														</tr>
														<tr>
															<th className="ps-0" scope="row" style={{ width: "160px" }}>
																Gratitude :
															</th>
															<td className="text-muted">
																<p>{withdraw?.campaign?.gratitude}</p>
																<p>{withdraw?.campaign?.gratitudeKm}</p>
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
																			src={`${api.FILE_URI}${withdraw?.campaign?.profile}`}
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
															<td className="text-muted">{withdraw?.campaign?.fullName}</td>
														</tr>
														<tr>
															<th className="ps-0" scope="row" style={{ width: "160px" }}>
																Phone Number :
															</th>
															<td className="text-muted">{withdraw?.campaign?.phoneNumber}</td>
														</tr>
														<tr>
															<th className="ps-0" scope="row" style={{ width: "160px" }}>
																Document Type :
															</th>
															<td className="text-muted">{withdraw?.campaign?.documentType?.toUpperCase()}</td>
														</tr>
														<tr>
															<th className="ps-0" scope="row" style={{ width: "160px" }}>
																Identity Number :
															</th>
															<td className="text-muted">{withdraw?.campaign?.identityNumber}</td>
														</tr>
														<tr>
															<td colSpan={2} className="text-muted">
																<div className="row border border-dashed gx-2 p-2 mb-2">
																	{withdraw?.campaign?.idCardFront ? (
																		<div className="col-4">
																			<img src={`${api.FILE_URI}${withdraw?.campaign?.idCardFront}`} alt="" className="img-fluid rounded" />
																		</div>
																	) : null}
																	{withdraw?.campaign?.idCardBack ? (
																		<div className="col-4">
																			<img src={`${api.FILE_URI}${withdraw?.campaign?.idCardBack}`} alt="" className="img-fluid rounded" />
																		</div>
																	) : null}
																	{withdraw?.campaign?.passport ? (
																		<div className="col-4">
																			<img src={`${api.FILE_URI}${withdraw?.campaign?.passport}`} alt="" className="img-fluid rounded" />
																		</div>
																	) : null}
																</div>
															</td>
														</tr>
														<tr>
															<th className="ps-0" scope="row" style={{ width: "160px" }}>
																Location :
															</th>
															<td className="text-muted">{withdraw?.campaign?.location}</td>
														</tr>
														<tr>
															<th className="ps-0" scope="row" style={{ width: "160px" }}>
																City/Province :
															</th>
															<td className="text-muted">{withdraw?.campaign?.city}</td>
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
															<td className="text-muted">{withdraw?.campaign?.receiveByBank?.toUpperCase()}</td>
														</tr>
														<tr>
															<th className="ps-0" scope="row" style={{ width: "160px" }}>
																Account Name :
															</th>
															<td className="text-muted">{withdraw?.campaign?.accountName}</td>
														</tr>
														<tr>
															<th className="ps-0" scope="row" style={{ width: "160px" }}>
																Account Number :
															</th>
															<td className="text-muted">{withdraw?.campaign?.accountNumber}</td>
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
															<td className="text-muted">{withdraw?.campaign?.creator?.name}</td>
														</tr>
														<tr>
															<th className="ps-0" scope="row" style={{ width: "160px" }}>
																Email :
															</th>
															<td className="text-muted">{withdraw?.campaign?.creator?.email}</td>
														</tr>
														<tr>
															<th className="ps-0" scope="row" style={{ width: "160px" }}>
																Phone Number :
															</th>
															<td className="text-muted">{withdraw?.campaign?.creator?.phoneNumber}</td>
														</tr>
														<tr>
															<th className="ps-0" scope="row" style={{ width: "160px" }}>
																Created At :
															</th>
															<td className="text-muted">{withdraw?.campaign?.created_at}</td>
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
																		<CountUp start={0} end={withdraw?.campaign?.goal} decimals={2} separator={","} prefix={"$"} duration={3} />
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
																		<CountUp start={0} end={withdraw?.campaign?.totalRaised} decimals={2} separator={","} prefix={"$"} duration={3} />
																	</h4>
																</div>
																<div className="flex-shrink-0 align-self-end">
																	<span className={`badge bg-success-subtle text-success`}>
																		{(withdraw?.campaign?.totalRaised / withdraw?.campaign?.goal) * 100 > 0 ? (
																			<i className={"align-middle me-1 ri-arrow-up-s-fill"}></i>
																		) : null}
																		{Math.round((withdraw?.campaign?.totalRaised / withdraw?.campaign?.goal) * 100)} %<span></span>
																	</span>
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
																		<CountUp
																			start={0}
																			end={withdraw?.campaign?.totalDonation}
																			decimals={0}
																			separator={","}
																			prefix={""}
																			duration={3}
																		/>
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
																		<i className={"align-middle ri-heart-line"}></i>
																	</span>
																</div>
																<div className="flex-grow-1 ms-3">
																	<p className="text-uppercase fw-semibold fs-12 text-muted mb-1">Total Reaction</p>
																	<h4 className=" mb-0">
																		{" "}
																		<CountUp
																			start={0}
																			end={withdraw?.campaign?.totalReaction}
																			decimals={0}
																			separator={","}
																			prefix={""}
																			duration={3}
																		/>
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
																		data={withdraw?.campaign?.donations || []}
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
								<CardHeader>
									<strong>Withdraw Information</strong>
								</CardHeader>
								<CardBody>
									<div className="table-responsive">
										<Table className="table-borderless mb-0">
											<tbody>
												<tr>
													<th className="ps-0" scope="row" style={{ width: "160px" }}>
														Withdraw Status
													</th>
													<td className="text-muted">
														:{" "}
														{withdraw?.withdrawStatus === "PENDING" ? (
															<span className="badge bg-warning-subtle text-warning">PENDING</span>
														) : withdraw?.withdrawStatus === "APPROVE" ? (
															<span className="badge bg-success-subtle text-success">APPROVED</span>
														) : withdraw?.withdrawStatus === "REJECT" ? (
															<span className="badge bg-danger-subtle text-danger">REJECTED</span>
														) : null}
													</td>
												</tr>
												<tr>
													<th className="ps-0" scope="row" style={{ width: "160px" }}>
														Request By
													</th>
													<td className="text-muted">: {withdraw?.requestFrom?.name}</td>
												</tr>
												<tr>
													<th className="ps-0" scope="row" style={{ width: "160px" }}>
														Request Date
													</th>
													<td className="text-muted">: {withdraw?.requestDate}</td>
												</tr>
												<tr>
													<th className="ps-0" scope="row" style={{ width: "160px" }}>
														Campaign Total Raised
													</th>
													<td className="text-muted">: ${withdraw?.campaign?.totalRaised?.toFixed(2)}</td>
												</tr>
												<tr>
													<th className="ps-0" scope="row" style={{ width: "160px" }}>
														Current Balance
													</th>
													<td className="text-muted">
														: $
														{withdraw?.withdrawStatus === "PENDING"
															? (withdraw?.campaign?.balance + withdraw?.requestAmount)?.toFixed(2)
															: withdraw?.campaign?.balance?.toFixed(2)}
													</td>
												</tr>
												<tr>
													<th className="ps-0" scope="row" style={{ width: "160px" }}>
														Request Amount
													</th>
													<td className="text-muted">: ${withdraw?.requestAmount?.toFixed(2)}</td>
												</tr>
												{withdraw?.withdrawStatus === "REJECT" && (
													<tr>
														<th className="ps-0" scope="row" style={{ width: "160px" }}>
															Reject By
														</th>
														<td className="text-muted">: {withdraw?.approveFrom?.name}</td>
													</tr>
												)}
												{withdraw?.withdrawStatus === "REJECT" && (
													<tr>
														<th className="ps-0" scope="row" style={{ width: "160px" }}>
															Reject Date
														</th>
														<td className="text-muted">: {withdraw?.approveDate}</td>
													</tr>
												)}
												{withdraw?.withdrawStatus === "APPROVE" && (
													<tr>
														<th className="ps-0" scope="row" style={{ width: "160px" }}>
															Approve By
														</th>
														<td className="text-muted">: {withdraw?.approveFrom?.name}</td>
													</tr>
												)}
												{withdraw?.withdrawStatus === "APPROVE" && (
													<tr>
														<th className="ps-0" scope="row" style={{ width: "160px" }}>
															Approve Date
														</th>
														<td className="text-muted">: {withdraw?.approveDate}</td>
													</tr>
												)}
											</tbody>
										</Table>
									</div>
								</CardBody>
							</Card>
							<Card>
								<CardHeader>
									<strong>Payment Detail</strong>
								</CardHeader>
								<CardBody>
									<div className="table-responsive">
										<Table className="table-borderless mb-0">
											<tbody>
												<tr>
													<th className="ps-0" scope="row" style={{ width: "160px" }}>
														Account Name
													</th>
													<td className="text-muted">: {withdraw?.accountName}</td>
												</tr>
												<tr>
													<th className="ps-0" scope="row" style={{ width: "160px" }}>
														Account Number
													</th>
													<td className="text-muted">: {withdraw?.accountNumber}</td>
												</tr>
											</tbody>
										</Table>
									</div>
								</CardBody>
							</Card>
							<div className="text-start mb-4">
								{withdraw?.withdrawStatus === "PENDING" &&
									(useWithdrawSelect.isLoading ? (
										<Button type="button" color="primary" className="btn-load">
											<span className="d-flex align-items-center">
												<Spinner size="sm" className="flex-shrink-0">
													Loading...
												</Spinner>
												<span className="flex-grow-1 ms-2">Loading...</span>
											</span>
										</Button>
									) : (
										<>
											<Button type="button" color="primary" className="btn-label" onClick={() => handleApproveWithdraw()}>
												<i className="ri-check-line label-icon align-middle fs-16 me-2"></i> APPROVE
											</Button>{" "}
											<Button type="button" color="danger" className="btn-label btn-danger" onClick={() => handleRejectWithdraw()}>
												<i className="ri-close-line label-icon align-middle fs-16 me-2"></i> REJECT
											</Button>
										</>
									))}
							</div>
						</Col>
					</Row>
				</Container>
			</div>
		</React.Fragment>
	);
};

export default withRouter(WithdrawForm);
