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
import TinymceEditor from "../../../Components/Common/TinymceEditor";

import withRouter from "../../../Components/Common/withRouter";
import LayoutNav from "./LayoutNav";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const AboutPage = () => {
	document.title = "Site Setting: About Page | Admin & Dashboard";
	const [titleTap, settitleTap] = useState("ENG");
	const titleTapToggle = (tab) => {
		if (titleTap !== tab) {
			settitleTap(tab);
		}
	};
	const dispatch = useDispatch();
	const [file, setFile] = useState([]);
	const [fileTwo, setFileTwo] = useState([]);
	const [fileFive, setFileFive] = useState([]);
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
		setFileTwo([]);
		setFileFive([]);
		setDes("");
		setDesKh("");
		setDesCh("");
		dispatch(getSiteSetting("ABOUT_PAGE"));
		return () => {
			dispatch(resetSiteSettingFlag());
		};
	}, [dispatch]);

	const settingForm = useFormik({
		enableReinitialize: true,

		initialValues: {
			type: "ABOUT_PAGE",
			introTitle: siteSetting ? siteSetting.introTitle : "",
			introTitleKh: siteSetting ? siteSetting.introTitleKh : "",
			introTitleCh: siteSetting ? siteSetting.introTitleCh : "",
			introDesc: siteSetting ? siteSetting.introDesc : "",
			introDescKh: siteSetting ? siteSetting.introDescKh : "",
			introDescCh: siteSetting ? siteSetting.introDescCh : "",
			introHighlight: siteSetting ? siteSetting.introHighlight : "",
			introHighlightKh: siteSetting ? siteSetting.introHighlightKh : "",
			introHighlightCh: siteSetting ? siteSetting.introHighlightCh : "",
			successfulCampaign: siteSetting ? siteSetting.successfulCampaign : 0,
			amazingDonors: siteSetting ? siteSetting.amazingDonors : 0,
			donorTrusted: siteSetting ? siteSetting.donorTrusted : 0,
			thumbnailTwo: siteSetting ? siteSetting.thumbnailTwo : "",

			cardTitle1: siteSetting ? siteSetting.cardTitle1 : "",
			cardTitleKh1: siteSetting ? siteSetting.cardTitleKh1 : "",
			cardTitleCh1: siteSetting ? siteSetting.cardTitleCh1 : "",
			cardDesc1: siteSetting ? siteSetting.cardDesc1 : "",
			cardDescKh1: siteSetting ? siteSetting.cardDescKh1 : "",
			cardDescCh1: siteSetting ? siteSetting.cardDescCh1 : "",
			cardIcon1: siteSetting ? siteSetting.cardIcon1 : "",

			cardTitle2: siteSetting ? siteSetting.cardTitle2 : "",
			cardTitleKh2: siteSetting ? siteSetting.cardTitleKh2 : "",
			cardTitleCh2: siteSetting ? siteSetting.cardTitleCh2 : "",
			cardDesc2: siteSetting ? siteSetting.cardDesc2 : "",
			cardDescKh2: siteSetting ? siteSetting.cardDescKh2 : "",
			cardDescCh2: siteSetting ? siteSetting.cardDescCh2 : "",
			cardIcon2: siteSetting ? siteSetting.cardIcon2 : "",

			cardTitle3: siteSetting ? siteSetting.cardTitle3 : "",
			cardTitleKh3: siteSetting ? siteSetting.cardTitleKh3 : "",
			cardTitleCh3: siteSetting ? siteSetting.cardTitleCh3 : "",
			cardDesc3: siteSetting ? siteSetting.cardDesc3 : "",
			cardDescKh3: siteSetting ? siteSetting.cardDescKh3 : "",
			cardDescCh3: siteSetting ? siteSetting.cardDescCh3 : "",
			cardIcon3: siteSetting ? siteSetting.cardIcon3 : "",

			bannerDesc: siteSetting ? siteSetting.bannerDesc : "",
			bannerDescKh: siteSetting ? siteSetting.bannerDescKh : "",
			bannerDescCh: siteSetting ? siteSetting.bannerDescCh : "",
			bannerLabel: siteSetting ? siteSetting.bannerLabel : "",
			bannerLabelKh: siteSetting ? siteSetting.bannerLabelKh : "",
			bannerLabelCh: siteSetting ? siteSetting.bannerLabelCh : "",
			bannerLinkTo: siteSetting ? siteSetting.bannerLinkTo : "",
			thumbnail: siteSetting ? siteSetting.thumbnail : "",

			totalDonation: siteSetting ? siteSetting.totalDonation : 0,
			projectClosed: siteSetting ? siteSetting.projectClosed : 0,
			happyPeople: siteSetting ? siteSetting.happyPeople : 0,
			ourVolunteer: siteSetting ? siteSetting.ourVolunteer : 0,

			professionalVolunteer: siteSetting ? siteSetting.professionalVolunteer : "",
			professionalVolunteerKh: siteSetting ? siteSetting.professionalVolunteerKh : "",
			professionalVolunteerCh: siteSetting ? siteSetting.professionalVolunteerCh : "",

			ourDonors: siteSetting ? siteSetting.ourDonors : "",
			ourDonorsKh: siteSetting ? siteSetting.ourDonorsKh : "",
			ourDonorsCh: siteSetting ? siteSetting.ourDonorsCh : "",
			thumbnailFive: siteSetting ? siteSetting.thumbnailFive : "",
		},
		onSubmit: (values) => {
			values.introDesc = des;
			values.introDescKh = desKh;
			values.introDescCh = desCh;
			values.thumbnail = file?.length > 0 ? file[0]?.serverId : siteSetting.thumbnail;
			values.thumbnailTwo = fileTwo?.length > 0 ? fileTwo[0]?.serverId : siteSetting.thumbnailTwo;
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
		setFileFive([]);
		setDes("");
		setDesKh("");
		setDesCh("");
		dispatch(getSiteSetting("ABOUT_PAGE"));
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
			if (siteSetting.thumbnailFive) {
				setFileFive([{ source: siteSetting.thumbnailFive, options: { type: "local" } }]);
			} else {
				setFileFive([]);
			}
			setDes(siteSetting.introDesc);
			setDesKh(siteSetting.introDescKh);
			setDesCh(siteSetting.introDescCh);
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
														<TabPane tabId="ENG" id="eng-i">
															<div className="mb-3">
																<Label className="form-label" htmlFor="introTitle-input">
																	Intro Title
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="introTitle-input"
																	placeholder="Enter text"
																	name="introTitle"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.introTitle}
																/>
															</div>
															<div className="mb-3">
																<Label className="form-label" htmlFor="introDesc-input">
																	Intro Description
																</Label>
																<TinymceEditor onUploadImage={handleEditorChange} initDataValue={des} />
																{/* <textarea
																	className="form-control"
																	id="introDesc-input"
																	rows="5"
																	placeholder="Enter text"
																	name="introDesc"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.introDesc}
																></textarea> */}
															</div>
															<div className="mb-3">
																<Label className="form-label" htmlFor="introHighlight-input">
																	Intro Highlight
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="introHighlight-input"
																	placeholder="Enter text"
																	name="introHighlight"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.introHighlight}
																/>
															</div>
														</TabPane>
														<TabPane tabId="KHM" id="khm-i">
															<div className="mb-3">
																<Label className="form-label" htmlFor="introTitleKh-input">
																	Intro Title
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="introTitleKh-input"
																	placeholder="Enter text"
																	name="introTitleKh"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.introTitleKh}
																/>
															</div>
															<div className="mb-3">
																<Label className="form-label" htmlFor="introDescKh-input">
																	Intro Description
																</Label>
																<TinymceEditor onUploadImage={handleEditorKhChange} initDataValue={desKh} />
																{/* <textarea
																	className="form-control"
																	id="introDescKh-input"
																	rows="5"
																	placeholder="Enter text"
																	name="introDescKh"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.introDescKh}
																></textarea> */}
															</div>
															<div className="mb-3">
																<Label className="form-label" htmlFor="introHighlightKh-input">
																	Intro Highlight
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="introHighlightKh-input"
																	placeholder="Enter text"
																	name="introHighlightKh"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.introHighlightKh}
																/>
															</div>
														</TabPane>
														<TabPane tabId="CH" id="ch-i">
															<div className="mb-3">
																<Label className="form-label" htmlFor="introTitleCh-input">
																	Intro Title
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="introTitleCh-input"
																	placeholder="Enter text"
																	name="introTitleCh"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.introTitleCh}
																/>
															</div>
															<div className="mb-3">
																<Label className="form-label" htmlFor="introDescCh-input">
																	Intro Description
																</Label>
																<TinymceEditor onUploadImage={handleEditorChChange} initDataValue={desCh} />
																{/* <textarea
																	className="form-control"
																	id="introDescKh-input"
																	rows="5"
																	placeholder="Enter text"
																	name="introDescCh"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.introDescCh}
																></textarea> */}
															</div>
															<div className="mb-3">
																<Label className="form-label" htmlFor="introHighlightCh-input">
																	Intro Highlight
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="introHighlightCh-input"
																	placeholder="Enter text"
																	name="introHighlightCh"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.introHighlightCh}
																/>
															</div>
														</TabPane>
													</TabContent>

													<div className="mb-3">
														<Label className="form-label" htmlFor="successfulCampaign-input">
															Success Campaign
														</Label>
														<Input
															type="text"
															className="form-control"
															id="successfulCampaign-input"
															placeholder="Enter text"
															name="successfulCampaign"
															onChange={settingForm.handleChange}
															onBlur={settingForm.handleBlur}
															value={settingForm.values.successfulCampaign}
														/>
													</div>
													<div className="mb-3">
														<Label className="form-label" htmlFor="amazingDonors-input">
															Amazing Donors
														</Label>
														<Input
															type="text"
															className="form-control"
															id="amazingDonors-input"
															placeholder="Enter text"
															name="amazingDonors"
															onChange={settingForm.handleChange}
															onBlur={settingForm.handleBlur}
															value={settingForm.values.amazingDonors}
														/>
													</div>
													<div className="mb-3">
														<Label className="form-label" htmlFor="donorTrusted-input">
															Donor Trust
														</Label>
														<Input
															type="text"
															className="form-control"
															id="donorTrusted-input"
															placeholder="Enter text"
															name="donorTrusted"
															onChange={settingForm.handleChange}
															onBlur={settingForm.handleBlur}
															value={settingForm.values.donorTrusted}
														/>
													</div>
												</Col>
												<Col xl={4}>
													<div className="mb-3">
														<Label className="form-label" htmlFor="thumbnail-input">
															Thumbnail (1920x960 px)
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
																</TabPane>
																<TabPane tabId="CH" id="ch1">
																	<div className="mb-3">
																		<Label className="form-label" htmlFor="cardTitleCh1-input">
																			Title
																		</Label>
																		<Input
																			type="text"
																			className="form-control"
																			id="cardTitleCh1-input"
																			placeholder="Enter text"
																			name="cardTitleCh1"
																			onChange={settingForm.handleChange}
																			onBlur={settingForm.handleBlur}
																			value={settingForm.values.cardTitleCh1}
																		/>
																	</div>
																	<div className="mb-3">
																		<Label className="form-label" htmlFor="cardDescCh1-input">
																			Description
																		</Label>
																		<textarea
																			className="form-control"
																			id="cardDescCh1-input"
																			rows="5"
																			placeholder="Enter text"
																			name="cardDescCh1"
																			onChange={settingForm.handleChange}
																			onBlur={settingForm.handleBlur}
																			value={settingForm.values.cardDescCh1}
																		></textarea>
																	</div>
																</TabPane>
															</TabContent>
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
																</TabPane>
																<TabPane tabId="CH" id="ch1">
																	<div className="mb-3">
																		<Label className="form-label" htmlFor="cardTitleCh2-input">
																			Title
																		</Label>
																		<Input
																			type="text"
																			className="form-control"
																			id="cardTitleCh2-input"
																			placeholder="Enter text"
																			name="cardTitleCh2"
																			onChange={settingForm.handleChange}
																			onBlur={settingForm.handleBlur}
																			value={settingForm.values.cardTitleCh2}
																		/>
																	</div>
																	<div className="mb-3">
																		<Label className="form-label" htmlFor="cardDescCh2-input">
																			Description
																		</Label>
																		<textarea
																			className="form-control"
																			id="cardDescCh2-input"
																			rows="5"
																			placeholder="Enter text"
																			name="cardDescCh2"
																			onChange={settingForm.handleChange}
																			onBlur={settingForm.handleBlur}
																			value={settingForm.values.cardDescCh2}
																		></textarea>
																	</div>
																</TabPane>
															</TabContent>

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
																</TabPane>
																<TabPane tabId="CH" id="ch1">
																	<div className="mb-3">
																		<Label className="form-label" htmlFor="cardTitleCh3-input">
																			Title
																		</Label>
																		<Input
																			type="text"
																			className="form-control"
																			id="cardTitleCh3-input"
																			placeholder="Enter text"
																			name="cardTitleCh3"
																			onChange={settingForm.handleChange}
																			onBlur={settingForm.handleBlur}
																			value={settingForm.values.cardTitleCh3}
																		/>
																	</div>
																	<div className="mb-3">
																		<Label className="form-label" htmlFor="cardDescCh3-input">
																			Description
																		</Label>
																		<textarea
																			className="form-control"
																			id="cardDescCh3-input"
																			rows="5"
																			placeholder="Enter text"
																			name="cardDescCh3"
																			onChange={settingForm.handleChange}
																			onBlur={settingForm.handleBlur}
																			value={settingForm.values.cardDescCh3}
																		></textarea>
																	</div>
																</TabPane>
															</TabContent>

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
														<TabPane tabId="CH" id="ch1">
															<div className="mb-3">
																<Label className="form-label" htmlFor="ourDonorsCh-input">
																	Our Donors
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="ourDonorsCh-input"
																	placeholder="Enter text"
																	name="ourDonorsCh"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.ourDonorsCh}
																/>
															</div>
														</TabPane>
													</TabContent>
												</Col>
												<Col xl={12}>
													<div className="mb-3">
														<Label className="form-label" htmlFor="thumbnail-input">
															Thumbnail (1920x960 px)
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
														<TabPane tabId="CH" id="ch">
															<div className="mb-3">
																<Label className="form-label" htmlFor="bannerDesc-input">
																	Banner Description
																</Label>
																<textarea
																	className="form-control"
																	id="bannerDesc-input"
																	rows="5"
																	placeholder="Enter text"
																	name="bannerDescCh"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.bannerDescCh}
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
																	name="bannerLabelCh"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.bannerLabelCh}
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
															Thumbnail (1920x1200 px)
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
												<Col xl={3}>
													<div className="mb-3">
														<Label className="form-label" htmlFor="totalDonation-input">
															Total Donation
														</Label>
														<Input
															type="text"
															className="form-control"
															id="totalDonation-input"
															placeholder="Enter text"
															name="totalDonation"
															onChange={settingForm.handleChange}
															onBlur={settingForm.handleBlur}
															value={settingForm.values.totalDonation}
														/>
													</div>
												</Col>
												<Col xl={3}>
													<div className="mb-3">
														<Label className="form-label" htmlFor="projectClosed-input">
															Project Closed
														</Label>
														<Input
															type="text"
															className="form-control"
															id="projectClosed-input"
															placeholder="Enter text"
															name="projectClosed"
															onChange={settingForm.handleChange}
															onBlur={settingForm.handleBlur}
															value={settingForm.values.projectClosed}
														/>
													</div>
												</Col>
												<Col xl={3}>
													<div className="mb-3">
														<Label className="form-label" htmlFor="happyPeople-input">
															Happy People
														</Label>
														<Input
															type="text"
															className="form-control"
															id="happyPeople-input"
															placeholder="Enter text"
															name="happyPeople"
															onChange={settingForm.handleChange}
															onBlur={settingForm.handleBlur}
															value={settingForm.values.happyPeople}
														/>
													</div>
												</Col>
												<Col xl={3}>
													<div className="mb-3">
														<Label className="form-label" htmlFor="ourVolunteer-input">
															Our Volunteer
														</Label>
														<Input
															type="text"
															className="form-control"
															id="ourVolunteer-input"
															placeholder="Enter text"
															name="ourVolunteer"
															onChange={settingForm.handleChange}
															onBlur={settingForm.handleBlur}
															value={settingForm.values.ourVolunteer}
														/>
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
																<Label className="form-label" htmlFor="professionalVolunteer-input">
																	Our Team
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="professionalVolunteer-input"
																	placeholder="Enter text"
																	name="professionalVolunteer"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.professionalVolunteer}
																/>
															</div>
														</TabPane>
														<TabPane tabId="KHM" id="khm1">
															<div className="mb-3">
																<Label className="form-label" htmlFor="professionalVolunteerKh-input">
																	Our Team
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="professionalVolunteerKh-input"
																	placeholder="Enter text"
																	name="professionalVolunteerKh"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.professionalVolunteerKh}
																/>
															</div>
														</TabPane>
														<TabPane tabId="KHM" id="khm1">
															<div className="mb-3">
																<Label className="form-label" htmlFor="professionalVolunteerCh-input">
																	Our Team
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="professionalVolunteerCh-input"
																	placeholder="Enter text"
																	name="professionalVolunteerCh"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.professionalVolunteerCh}
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

export default withRouter(AboutPage);
