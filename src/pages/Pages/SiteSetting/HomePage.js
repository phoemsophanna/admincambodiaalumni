import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Col,
	Container,
	Form,
	Input,
	Label,
	Nav,
	NavItem,
	NavLink,
	Row,
	Spinner,
	TabContent,
	TabPane,
} from "reactstrap";
import { api } from "../../../config";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { getSiteSetting, resetSiteSettingFlag, saveSiteSetting } from "../../../store/actions";
import { createSelector } from "reselect";
import BreadCrumb from "../../../Components/Common/BreadCrumb";

import withRouter from "../../../Components/Common/withRouter";
import LayoutNav from "./LayoutNav";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const HomePage = () => {
	document.title = "Site Setting: Home Page | Admin & Dashboard";
	const [titleTap, settitleTap] = useState("ENG");
	const titleTapToggle = (tab) => {
		if (titleTap !== tab) {
			settitleTap(tab);
		}
	};
	const dispatch = useDispatch();
	const [file, setFile] = useState([]);
	const [fileTwo, setFileTwo] = useState([]);
	const [fileThree, setFileThree] = useState([]);
	const [fileFour, setFileFour] = useState([]);
	const [fileFive, setFileFive] = useState([]);

	const siteSettingSelector = createSelector(
		(state) => state.SiteSettingReducer,
		(layout) => ({
			siteSetting: layout.siteSetting,
			message: layout.message,
			isLoading: layout.isLoading,
			success: layout.success,
			error: layout.error,
		})
	);
	const { siteSetting, message, isLoading, success, error } = useSelector(siteSettingSelector);

	useEffect(() => {
		setFile([]);
		dispatch(getSiteSetting("HOME_PAGE"));
		return () => {
			dispatch(resetSiteSettingFlag());
		};
	}, [dispatch]);

	const settingForm = useFormik({
		enableReinitialize: true,

		initialValues: {
			type: "HOME_PAGE",
			latestProject: siteSetting ? siteSetting.latestProject : "",
			latestProjectKh: siteSetting ? siteSetting.latestProjectKh : "",
			bannerDesc: siteSetting ? siteSetting.bannerDesc : "",
			bannerDescKh: siteSetting ? siteSetting.bannerDescKh : "",
			bannerLabel: siteSetting ? siteSetting.bannerLabel : "",
			bannerLabelKh: siteSetting ? siteSetting.bannerLabelKh : "",
			bannerLinkTo: siteSetting ? siteSetting.bannerLinkTo : "",
			thumbnail: siteSetting ? siteSetting.thumbnail : "",
			cardTitle1: siteSetting ? siteSetting.cardTitle1 : "",
			cardTitleKh1: siteSetting ? siteSetting.cardTitleKh1 : "",
			cardDesc1: siteSetting ? siteSetting.cardDesc1 : "",
			cardDescKh1: siteSetting ? siteSetting.cardDescKh1 : "",
			cardLabel1: siteSetting ? siteSetting.cardLabel1 : "",
			cardLabelKh1: siteSetting ? siteSetting.cardLabelKh1 : "",
			cardIcon1: siteSetting ? siteSetting.cardIcon1 : "",
			cardLinkTo1: siteSetting ? siteSetting.cardLinkTo1 : "",
			cardIsShow1: siteSetting ? (siteSetting.cardIsShow1 === 1 || siteSetting.cardIsShow1 === true ? true : false) : true,
			thumbnailTwo: siteSetting ? siteSetting.thumbnailTwo : "",
			cardTitle2: siteSetting ? siteSetting.cardTitle2 : "",
			cardTitleKh2: siteSetting ? siteSetting.cardTitleKh2 : "",
			cardDesc2: siteSetting ? siteSetting.cardDesc2 : "",
			cardDescKh2: siteSetting ? siteSetting.cardDescKh2 : "",
			cardLabel2: siteSetting ? siteSetting.cardLabel2 : "",
			cardLabelKh2: siteSetting ? siteSetting.cardLabelKh2 : "",
			cardIcon2: siteSetting ? siteSetting.cardIcon2 : "",
			cardLinkTo2: siteSetting ? siteSetting.cardLinkTo2 : "",
			cardIsShow2: siteSetting ? (siteSetting.cardIsShow2 === 1 || siteSetting.cardIsShow2 === true ? true : false) : true,
			thumbnailThree: siteSetting ? siteSetting.thumbnailThree : "",
			cardTitle3: siteSetting ? siteSetting.cardTitle3 : "",
			cardTitleKh3: siteSetting ? siteSetting.cardTitleKh3 : "",
			cardDesc3: siteSetting ? siteSetting.cardDesc3 : "",
			cardDescKh3: siteSetting ? siteSetting.cardDescKh3 : "",
			cardLabel3: siteSetting ? siteSetting.cardLabel3 : "",
			cardLabelKh3: siteSetting ? siteSetting.cardLabelKh3 : "",
			cardIcon3: siteSetting ? siteSetting.cardIcon3 : "",
			cardLinkTo3: siteSetting ? siteSetting.cardLinkTo3 : "",
			cardIsShow3: siteSetting ? (siteSetting.cardIsShow3 === 1 || siteSetting.cardIsShow3 === true ? true : false) : true,
			thumbnailFour: siteSetting ? siteSetting.thumbnailFour : "",
			ourDonors: siteSetting ? siteSetting.ourDonors : "",
			ourDonorsKh: siteSetting ? siteSetting.ourDonorsKh : "",
			thumbnailFive: siteSetting ? siteSetting.thumbnailFive : "",
			getDailyUpdate: siteSetting ? siteSetting.getDailyUpdate : "",
			getDailyUpdateKh: siteSetting ? siteSetting.getDailyUpdateKh : "",
		},
		onSubmit: (values) => {
			values.thumbnail = file?.length > 0 ? file[0]?.serverId : siteSetting.thumbnail;
			values.thumbnailTwo = fileTwo?.length > 0 ? fileTwo[0]?.serverId : siteSetting.thumbnailTwo;
			values.thumbnailThree = fileThree?.length > 0 ? fileThree[0]?.serverId : siteSetting.thumbnailThree;
			values.thumbnailFour = fileFour?.length > 0 ? fileFour[0]?.serverId : siteSetting.thumbnailFour;
			values.thumbnailFive = fileFive?.length > 0 ? fileFive[0]?.serverId : siteSetting.thumbnailFive;
			dispatch(saveSiteSetting(values));
			if (!isLoading && success) {
				refreshForm();
			}
		},
	});

	const refreshForm = () => {
		setFile([]);
		setFileTwo([]);
		setFileThree([]);
		setFileFour([]);
		dispatch(getSiteSetting("HOME_PAGE"));
	};

	useEffect(() => {
		if (siteSetting) {
			if (siteSetting.thumbnail) {
				setFile([{ source: siteSetting.thumbnail, options: { type: "local" } }]);
			} else {
				setFile([]);
			}
			if (siteSetting.thumbnailTwo) {
				setFileTwo([{ source: siteSetting.thumbnailTwo, options: { type: "local" } }]);
			} else {
				setFileTwo([]);
			}
			if (siteSetting.thumbnailThree) {
				setFileThree([{ source: siteSetting.thumbnailThree, options: { type: "local" } }]);
			} else {
				setFileThree([]);
			}
			if (siteSetting.thumbnailFour) {
				setFileFour([{ source: siteSetting.thumbnailFour, options: { type: "local" } }]);
			} else {
				setFileFour([]);
			}
			if (siteSetting.thumbnailFive) {
				setFileFive([{ source: siteSetting.thumbnailFive, options: { type: "local" } }]);
			} else {
				setFileFive([]);
			}
		}
	}, [siteSetting]);

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="Site Setting" pageTitle="Dashboard" pageLink="/" />
					<Row>
						<Col xs={12}>
							<Card>
								<CardBody>
									<LayoutNav />
								</CardBody>
							</Card>
						</Col>
						<Col xl={12}>
							<Form
								onSubmit={(e) => {
									e.preventDefault();
									settingForm.handleSubmit();
									return false;
								}}
								action="#"
							>
								{/* <h5 className="fs-14 mb-3">General</h5> */}
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
												</Nav>
											</div>
										</div>
									</CardHeader>
								</Card>
								<Card>
									<CardBody>
										{isLoading ? (
											<span className="d-flex align-items-center">
												<Spinner size="sm" className="flex-shrink-0">
													Loading...
												</Spinner>
												<span className="flex-grow-1 ms-2">Loading...</span>
											</span>
										) : (
											<Row>
												<Col xl={12}>
													<TabContent activeTab={titleTap}>
														<TabPane tabId="ENG" id="eng1">
															<div className="mb-3">
																<Label className="form-label" htmlFor="latestProject-input">
																	Latest Project
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="latestProject-input"
																	placeholder="Enter text"
																	name="latestProject"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.latestProject}
																/>
															</div>
														</TabPane>
														<TabPane tabId="KHM" id="khm1">
															<div className="mb-3">
																<Label className="form-label" htmlFor="latestProjectKh-input">
																	Latest Project
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="latestProjectKh-input"
																	placeholder="Enter text"
																	name="latestProjectKh"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.latestProjectKh}
																/>
															</div>
														</TabPane>
													</TabContent>
												</Col>
											</Row>
										)}
									</CardBody>
								</Card>
								<Card>
									<CardBody>
										{isLoading ? (
											<span className="d-flex align-items-center">
												<Spinner size="sm" className="flex-shrink-0">
													Loading...
												</Spinner>
												<span className="flex-grow-1 ms-2">Loading...</span>
											</span>
										) : (
											<Row>
												<Col xl={8}>
													<TabContent activeTab={titleTap}>
														<TabPane tabId="ENG" id="eng">
															<div className="mb-3">
																<Label className="form-label" htmlFor="bannerDesc-input">
																	Banner Description
																</Label>
																<textarea
																	className="form-control"
																	id="bannerDesc-input"
																	rows="5"
																	placeholder="Enter text"
																	name="bannerDesc"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.bannerDesc}
																></textarea>
															</div>
															<div className="mb-3">
																<Label className="form-label" htmlFor="bannerLabel-input">
																	Banner Label
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="bannerLabel-input"
																	placeholder="Enter text"
																	name="bannerLabel"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.bannerLabel}
																/>
															</div>
														</TabPane>
														<TabPane tabId="KHM" id="khm">
															<div className="mb-3">
																<Label className="form-label" htmlFor="bannerDesc-input">
																	Banner Description
																</Label>
																<textarea
																	className="form-control"
																	id="bannerDesc-input"
																	rows="5"
																	placeholder="Enter text"
																	name="bannerDescKh"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.bannerDescKh}
																></textarea>
															</div>
															<div className="mb-3">
																<Label className="form-label" htmlFor="bannerLabel-input">
																	Banner Label
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="bannerLabel-input"
																	placeholder="Enter text"
																	name="bannerLabelKh"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.bannerLabelKh}
																/>
															</div>
														</TabPane>
													</TabContent>

													<div className="mb-3">
														<Label className="form-label" htmlFor="bannerLinkTo-input">
															Banner Link To
														</Label>
														<Input
															type="text"
															className="form-control"
															id="bannerLinkTo-input"
															placeholder="Enter text"
															name="bannerLinkTo"
															onChange={settingForm.handleChange}
															onBlur={settingForm.handleBlur}
															value={settingForm.values.bannerLinkTo}
														/>
													</div>
												</Col>
												<Col xl={4}>
													<div className="mb-3">
														<Label className="form-label" htmlFor="thumbnail-input">
															Thumbnail
														</Label>
														<div className="position-relative d-block mx-auto">
															<div style={{ width: "100%" }}>
																<FilePond
																	labelIdle='<span class="filepond--label-action">Choose Image</span>'
																	files={file}
																	onupdatefiles={setFile}
																	allowMultiple={false}
																	maxFiles={1}
																	name="file"
																	server={`${api.BASE_URL}/save-image/site-setting`}
																	className="filepond filepond-input-multiple"
																/>
															</div>
														</div>
													</div>
												</Col>
											</Row>
										)}
									</CardBody>
								</Card>
								<Row>
									<Col xl={4}>
										<Card>
											<CardBody>
												{isLoading ? (
													<span className="d-flex align-items-center">
														<Spinner size="sm" className="flex-shrink-0">
															Loading...
														</Spinner>
														<span className="flex-grow-1 ms-2">Loading...</span>
													</span>
												) : (
													<Row>
														<Col xl={12}>
															<TabContent activeTab={titleTap}>
																<TabPane tabId="ENG" id="eng1">
																	<div className="mb-3">
																		<Label className="form-label" htmlFor="cardTitle1-input">
																			Title
																		</Label>
																		<Input
																			type="text"
																			className="form-control"
																			id="cardTitle1-input"
																			placeholder="Enter text"
																			name="cardTitle1"
																			onChange={settingForm.handleChange}
																			onBlur={settingForm.handleBlur}
																			value={settingForm.values.cardTitle1}
																		/>
																	</div>
																	<div className="mb-3">
																		<Label className="form-label" htmlFor="cardDesc1-input">
																			Description
																		</Label>
																		<textarea
																			className="form-control"
																			id="cardDesc1-input"
																			rows="5"
																			placeholder="Enter text"
																			name="cardDesc1"
																			onChange={settingForm.handleChange}
																			onBlur={settingForm.handleBlur}
																			value={settingForm.values.cardDesc1}
																		></textarea>
																	</div>
																	<div className="mb-3">
																		<Label className="form-label" htmlFor="cardLabel1-input">
																			Label
																		</Label>
																		<Input
																			type="text"
																			className="form-control"
																			id="cardLabel1-input"
																			placeholder="Enter text"
																			name="cardLabel1"
																			onChange={settingForm.handleChange}
																			onBlur={settingForm.handleBlur}
																			value={settingForm.values.cardLabel1}
																		/>
																	</div>
																</TabPane>
																<TabPane tabId="KHM" id="khm1">
																	<div className="mb-3">
																		<Label className="form-label" htmlFor="cardTitleKh1-input">
																			Title
																		</Label>
																		<Input
																			type="text"
																			className="form-control"
																			id="cardTitleKh1-input"
																			placeholder="Enter text"
																			name="cardTitleKh1"
																			onChange={settingForm.handleChange}
																			onBlur={settingForm.handleBlur}
																			value={settingForm.values.cardTitleKh1}
																		/>
																	</div>
																	<div className="mb-3">
																		<Label className="form-label" htmlFor="cardDescKh1-input">
																			Description
																		</Label>
																		<textarea
																			className="form-control"
																			id="cardDescKh1-input"
																			rows="5"
																			placeholder="Enter text"
																			name="cardDescKh1"
																			onChange={settingForm.handleChange}
																			onBlur={settingForm.handleBlur}
																			value={settingForm.values.cardDescKh1}
																		></textarea>
																	</div>
																	<div className="mb-3">
																		<Label className="form-label" htmlFor="cardLabelKh1-input">
																			Label
																		</Label>
																		<Input
																			type="text"
																			className="form-control"
																			id="cardLabelKh1-input"
																			placeholder="Enter text"
																			name="cardLabelKh1"
																			onChange={settingForm.handleChange}
																			onBlur={settingForm.handleBlur}
																			value={settingForm.values.cardLabelKh1}
																		/>
																	</div>
																</TabPane>
															</TabContent>

															<div className="mb-3">
																<Label className="form-label" htmlFor="cardLinkTo1-input">
																	Link To
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="cardLinkTo1-input"
																	placeholder="Enter text"
																	name="cardLinkTo1"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.cardLinkTo1}
																/>
															</div>
															<div className="mb-3">
																<Label className="form-label" htmlFor="cardIcon1-input">
																	Icon
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="cardIcon1-input"
																	placeholder="Enter text"
																	name="cardIcon1"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.cardIcon1}
																/>
															</div>
															<div className="form-check form-switch form-switch-md mb-3" dir="ltr">
																<Input
																	type="checkbox"
																	className="form-check-input"
																	id="cardIsShow1"
																	name="cardIsShow1"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	checked={settingForm.values.cardIsShow1}
																/>
																<Label className="form-check-label" for="cardIsShow1">
																	Display: <span className="fw-bolder">{settingForm.values.cardIsShow1 ? "SHOW" : "HIDE"}</span>
																</Label>
															</div>
														</Col>
														<Col xl={12}>
															<div className="mb-3">
																<Label className="form-label" htmlFor="thumbnail-input">
																	Thumbnail
																</Label>
																<div className="position-relative d-block mx-auto">
																	<div style={{ width: "100%" }}>
																		<FilePond
																			labelIdle='<span class="filepond--label-action">Choose Image</span>'
																			files={fileTwo}
																			onupdatefiles={setFileTwo}
																			allowMultiple={false}
																			maxFiles={1}
																			name="file"
																			server={`${api.BASE_URL}/save-image/site-setting`}
																			className="filepond filepond-input-multiple"
																		/>
																	</div>
																</div>
															</div>
														</Col>
													</Row>
												)}
											</CardBody>
										</Card>
									</Col>
									<Col xl={4}>
										<Card>
											<CardBody>
												{isLoading ? (
													<span className="d-flex align-items-center">
														<Spinner size="sm" className="flex-shrink-0">
															Loading...
														</Spinner>
														<span className="flex-grow-1 ms-2">Loading...</span>
													</span>
												) : (
													<Row>
														<Col xl={12}>
															<TabContent activeTab={titleTap}>
																<TabPane tabId="ENG" id="eng1">
																	<div className="mb-3">
																		<Label className="form-label" htmlFor="cardTitle2-input">
																			Title
																		</Label>
																		<Input
																			type="text"
																			className="form-control"
																			id="cardTitle2-input"
																			placeholder="Enter text"
																			name="cardTitle2"
																			onChange={settingForm.handleChange}
																			onBlur={settingForm.handleBlur}
																			value={settingForm.values.cardTitle2}
																		/>
																	</div>
																	<div className="mb-3">
																		<Label className="form-label" htmlFor="cardDesc2-input">
																			Description
																		</Label>
																		<textarea
																			className="form-control"
																			id="cardDesc2-input"
																			rows="5"
																			placeholder="Enter text"
																			name="cardDesc2"
																			onChange={settingForm.handleChange}
																			onBlur={settingForm.handleBlur}
																			value={settingForm.values.cardDesc2}
																		></textarea>
																	</div>
																	<div className="mb-3">
																		<Label className="form-label" htmlFor="cardLabel2-input">
																			Label
																		</Label>
																		<Input
																			type="text"
																			className="form-control"
																			id="cardLabel2-input"
																			placeholder="Enter text"
																			name="cardLabel2"
																			onChange={settingForm.handleChange}
																			onBlur={settingForm.handleBlur}
																			value={settingForm.values.cardLabel2}
																		/>
																	</div>
																</TabPane>
																<TabPane tabId="KHM" id="khm1">
																	<div className="mb-3">
																		<Label className="form-label" htmlFor="cardTitleKh2-input">
																			Title
																		</Label>
																		<Input
																			type="text"
																			className="form-control"
																			id="cardTitleKh2-input"
																			placeholder="Enter text"
																			name="cardTitleKh2"
																			onChange={settingForm.handleChange}
																			onBlur={settingForm.handleBlur}
																			value={settingForm.values.cardTitleKh2}
																		/>
																	</div>
																	<div className="mb-3">
																		<Label className="form-label" htmlFor="cardDescKh2-input">
																			Description
																		</Label>
																		<textarea
																			className="form-control"
																			id="cardDescKh2-input"
																			rows="5"
																			placeholder="Enter text"
																			name="cardDescKh2"
																			onChange={settingForm.handleChange}
																			onBlur={settingForm.handleBlur}
																			value={settingForm.values.cardDescKh2}
																		></textarea>
																	</div>
																	<div className="mb-3">
																		<Label className="form-label" htmlFor="cardLabelKh2-input">
																			Label
																		</Label>
																		<Input
																			type="text"
																			className="form-control"
																			id="cardLabelKh2-input"
																			placeholder="Enter text"
																			name="cardLabelKh2"
																			onChange={settingForm.handleChange}
																			onBlur={settingForm.handleBlur}
																			value={settingForm.values.cardLabelKh2}
																		/>
																	</div>
																</TabPane>
															</TabContent>

															<div className="mb-3">
																<Label className="form-label" htmlFor="cardLinkTo2-input">
																	Link To
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="cardLinkTo2-input"
																	placeholder="Enter text"
																	name="cardLinkTo2"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.cardLinkTo2}
																/>
															</div>
															<div className="mb-3">
																<Label className="form-label" htmlFor="cardIcon2-input">
																	Icon
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="cardIcon2-input"
																	placeholder="Enter text"
																	name="cardIcon2"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.cardIcon2}
																/>
															</div>
															<div className="form-check form-switch form-switch-md mb-3" dir="ltr">
																<Input
																	type="checkbox"
																	className="form-check-input"
																	id="cardIsShow2"
																	name="cardIsShow2"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	checked={settingForm.values.cardIsShow2}
																/>
																<Label className="form-check-label" for="cardIsShow2">
																	Display: <span className="fw-bolder">{settingForm.values.cardIsShow2 ? "SHOW" : "HIDE"}</span>
																</Label>
															</div>
														</Col>
														<Col xl={12}>
															<div className="mb-3">
																<Label className="form-label" htmlFor="thumbnail-input">
																	Thumbnail
																</Label>
																<div className="position-relative d-block mx-auto">
																	<div style={{ width: "100%" }}>
																		<FilePond
																			labelIdle='<span class="filepond--label-action">Choose Image</span>'
																			files={fileThree}
																			onupdatefiles={setFileThree}
																			allowMultiple={false}
																			maxFiles={1}
																			name="file"
																			server={`${api.BASE_URL}/save-image/site-setting`}
																			className="filepond filepond-input-multiple"
																		/>
																	</div>
																</div>
															</div>
														</Col>
													</Row>
												)}
											</CardBody>
										</Card>
									</Col>
									<Col xl={4}>
										<Card>
											<CardBody>
												{isLoading ? (
													<span className="d-flex align-items-center">
														<Spinner size="sm" className="flex-shrink-0">
															Loading...
														</Spinner>
														<span className="flex-grow-1 ms-2">Loading...</span>
													</span>
												) : (
													<Row>
														<Col xl={12}>
															<TabContent activeTab={titleTap}>
																<TabPane tabId="ENG" id="eng1">
																	<div className="mb-3">
																		<Label className="form-label" htmlFor="cardTitle3-input">
																			Title
																		</Label>
																		<Input
																			type="text"
																			className="form-control"
																			id="cardTitle3-input"
																			placeholder="Enter text"
																			name="cardTitle3"
																			onChange={settingForm.handleChange}
																			onBlur={settingForm.handleBlur}
																			value={settingForm.values.cardTitle3}
																		/>
																	</div>
																	<div className="mb-3">
																		<Label className="form-label" htmlFor="cardDesc3-input">
																			Description
																		</Label>
																		<textarea
																			className="form-control"
																			id="cardDesc3-input"
																			rows="5"
																			placeholder="Enter text"
																			name="cardDesc3"
																			onChange={settingForm.handleChange}
																			onBlur={settingForm.handleBlur}
																			value={settingForm.values.cardDesc3}
																		></textarea>
																	</div>
																	<div className="mb-3">
																		<Label className="form-label" htmlFor="cardLabel3-input">
																			Label
																		</Label>
																		<Input
																			type="text"
																			className="form-control"
																			id="cardLabel3-input"
																			placeholder="Enter text"
																			name="cardLabel3"
																			onChange={settingForm.handleChange}
																			onBlur={settingForm.handleBlur}
																			value={settingForm.values.cardLabel3}
																		/>
																	</div>
																</TabPane>
																<TabPane tabId="KHM" id="khm1">
																	<div className="mb-3">
																		<Label className="form-label" htmlFor="cardTitleKh3-input">
																			Title
																		</Label>
																		<Input
																			type="text"
																			className="form-control"
																			id="cardTitleKh3-input"
																			placeholder="Enter text"
																			name="cardTitleKh3"
																			onChange={settingForm.handleChange}
																			onBlur={settingForm.handleBlur}
																			value={settingForm.values.cardTitleKh3}
																		/>
																	</div>
																	<div className="mb-3">
																		<Label className="form-label" htmlFor="cardDescKh3-input">
																			Description
																		</Label>
																		<textarea
																			className="form-control"
																			id="cardDescKh3-input"
																			rows="5"
																			placeholder="Enter text"
																			name="cardDescKh3"
																			onChange={settingForm.handleChange}
																			onBlur={settingForm.handleBlur}
																			value={settingForm.values.cardDescKh3}
																		></textarea>
																	</div>
																	<div className="mb-3">
																		<Label className="form-label" htmlFor="cardLabelKh3-input">
																			Label
																		</Label>
																		<Input
																			type="text"
																			className="form-control"
																			id="cardLabelKh3-input"
																			placeholder="Enter text"
																			name="cardLabelKh3"
																			onChange={settingForm.handleChange}
																			onBlur={settingForm.handleBlur}
																			value={settingForm.values.cardLabelKh3}
																		/>
																	</div>
																</TabPane>
															</TabContent>

															<div className="mb-3">
																<Label className="form-label" htmlFor="cardLinkTo3-input">
																	Link To
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="cardLinkTo3-input"
																	placeholder="Enter text"
																	name="cardLinkTo3"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.cardLinkTo3}
																/>
															</div>
															<div className="mb-3">
																<Label className="form-label" htmlFor="cardIcon3-input">
																	Icon
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="cardIcon3-input"
																	placeholder="Enter text"
																	name="cardIcon3"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.cardIcon3}
																/>
															</div>
															<div className="form-check form-switch form-switch-md mb-3" dir="ltr">
																<Input
																	type="checkbox"
																	className="form-check-input"
																	id="cardIsShow3"
																	name="cardIsShow3"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	checked={settingForm.values.cardIsShow3}
																/>
																<Label className="form-check-label" for="cardIsShow3">
																	Display: <span className="fw-bolder">{settingForm.values.cardIsShow3 ? "SHOW" : "HIDE"}</span>
																</Label>
															</div>
														</Col>
														<Col xl={12}>
															<div className="mb-3">
																<Label className="form-label" htmlFor="thumbnail-input">
																	Thumbnail
																</Label>
																<div className="position-relative d-block mx-auto">
																	<div style={{ width: "100%" }}>
																		<FilePond
																			labelIdle='<span class="filepond--label-action">Choose Image</span>'
																			files={fileFour}
																			onupdatefiles={setFileFour}
																			allowMultiple={false}
																			maxFiles={1}
																			name="file"
																			server={`${api.BASE_URL}/save-image/site-setting`}
																			className="filepond filepond-input-multiple"
																		/>
																	</div>
																</div>
															</div>
														</Col>
													</Row>
												)}
											</CardBody>
										</Card>
									</Col>
								</Row>

								<Card>
									<CardBody>
										{isLoading ? (
											<span className="d-flex align-items-center">
												<Spinner size="sm" className="flex-shrink-0">
													Loading...
												</Spinner>
												<span className="flex-grow-1 ms-2">Loading...</span>
											</span>
										) : (
											<Row>
												<Col xl={12}>
													<TabContent activeTab={titleTap}>
														<TabPane tabId="ENG" id="eng1">
															<div className="mb-3">
																<Label className="form-label" htmlFor="ourDonors-input">
																	Our Donors
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="ourDonors-input"
																	placeholder="Enter text"
																	name="ourDonors"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.ourDonors}
																/>
															</div>
														</TabPane>
														<TabPane tabId="KHM" id="khm1">
															<div className="mb-3">
																<Label className="form-label" htmlFor="ourDonorsKh-input">
																	Our Donors
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="ourDonorsKh-input"
																	placeholder="Enter text"
																	name="ourDonorsKh"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.ourDonorsKh}
																/>
															</div>
														</TabPane>
													</TabContent>
												</Col>
												<Col xl={12}>
													<div className="mb-3">
														<Label className="form-label" htmlFor="thumbnail-input">
															Thumbnail
														</Label>
														<div className="position-relative d-block mx-auto">
															<div style={{ width: "100%" }}>
																<FilePond
																	labelIdle='<span class="filepond--label-action">Choose Image</span>'
																	files={fileFive}
																	onupdatefiles={setFileFive}
																	allowMultiple={false}
																	maxFiles={1}
																	name="file"
																	server={`${api.BASE_URL}/save-image/site-setting`}
																	className="filepond filepond-input-multiple"
																/>
															</div>
														</div>
													</div>
												</Col>
											</Row>
										)}
									</CardBody>
								</Card>

								<Card>
									<CardBody>
										{isLoading ? (
											<span className="d-flex align-items-center">
												<Spinner size="sm" className="flex-shrink-0">
													Loading...
												</Spinner>
												<span className="flex-grow-1 ms-2">Loading...</span>
											</span>
										) : (
											<Row>
												<Col xl={12}>
													<TabContent activeTab={titleTap}>
														<TabPane tabId="ENG" id="eng1">
															<div className="mb-3">
																<Label className="form-label" htmlFor="getDailyUpdate-input">
																	Get Daily Updates
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="getDailyUpdate-input"
																	placeholder="Enter text"
																	name="getDailyUpdate"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.getDailyUpdate}
																/>
															</div>
														</TabPane>
														<TabPane tabId="KHM" id="khm1">
															<div className="mb-3">
																<Label className="form-label" htmlFor="getDailyUpdateKh-input">
																	Get Daily Updates
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="getDailyUpdateKh-input"
																	placeholder="Enter text"
																	name="getDailyUpdateKh"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.getDailyUpdateKh}
																/>
															</div>
														</TabPane>
													</TabContent>
												</Col>
											</Row>
										)}
									</CardBody>
								</Card>

								<div className="text-start mb-4">
									{isLoading ? (
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
									)}{" "}
									<Button color="dark" className="btn" outline onClick={() => refreshForm()}>
										<i className="ri-refresh-line me-1 align-bottom"></i> Refresh
									</Button>
								</div>
							</Form>
						</Col>
					</Row>
				</Container>
			</div>
		</React.Fragment>
	);
};

export default withRouter(HomePage);
