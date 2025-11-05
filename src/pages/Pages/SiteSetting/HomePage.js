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
	const [fileSix, setFileSix] = useState([]);
	const [fileSeven, setFileSeven] = useState([]);
	const [des, setDes] = useState("");
	const [desKh, setDesKh] = useState("");
	const [desCh, setDesCh] = useState("");

	const handleEditorChange = (e) => {
		setDes(e.target.getContent());
	};

	const handleEditorKhChange = (e) => {
		setDesKh(e.target.getContent());
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
		setFileThree([]);
		setFileFour([]);
		setFileFive([]);
		setFileSix([]);
		setFileSeven([]);
		dispatch(getSiteSetting("HOME_PAGE"));
		return () => {
			dispatch(resetSiteSettingFlag());
		};
	}, [dispatch]);

	// const handleEditorChange = (e) => {
	// 	setContentDesc(e.target.getContent());
	// };

	const settingForm = useFormik({
		enableReinitialize: true,

		initialValues: {
			type: "HOME_PAGE",
			subtitle: siteSetting ? siteSetting.subtitle : "",
			subtitleKh: siteSetting ? siteSetting.subtitleKh : "",
			subtitleCh: siteSetting ? siteSetting.subtitleCh : "",
			title: siteSetting ? siteSetting.title : "",
			titleKh: siteSetting ? siteSetting.titleKh : "",
			titleCh: siteSetting ? siteSetting.titleCh : "",
			des: siteSetting ? siteSetting.des : "",
			desKh: siteSetting ? siteSetting.desKh : "",
			desCh: siteSetting ? siteSetting.desCh : "",
			latestProject: siteSetting ? siteSetting.latestProject : "",
			latestProjectKh: siteSetting ? siteSetting.latestProjectKh : "",
			latestProjectCh: siteSetting ? siteSetting.latestProjectCh : "",
			bannerDesc: siteSetting ? siteSetting.bannerDesc : "",
			bannerDescKh: siteSetting ? siteSetting.bannerDescKh : "",
			bannerDescCh: siteSetting ? siteSetting.bannerDescCh : "",
			bannerLabel: siteSetting ? siteSetting.bannerLabel : "",
			bannerLabelKh: siteSetting ? siteSetting.bannerLabelKh : "",
			bannerLabelCh: siteSetting ? siteSetting.bannerLabelCh : "",
			bannerLinkTo: siteSetting ? siteSetting.bannerLinkTo : "",
			thumbnail: siteSetting ? siteSetting.thumbnail : "",
			cardTitle1: siteSetting ? siteSetting.cardTitle1 : "",
			cardTitleKh1: siteSetting ? siteSetting.cardTitleKh1 : "",
			cardTitleCh1: siteSetting ? siteSetting.cardTitleCh1 : "",
			cardDesc1: siteSetting ? siteSetting.cardDesc1 : "",
			cardDescKh1: siteSetting ? siteSetting.cardDescKh1 : "",
			cardDescCh1: siteSetting ? siteSetting.cardDescCh1 : "",
			cardLabel1: siteSetting ? siteSetting.cardLabel1 : "",
			cardLabelKh1: siteSetting ? siteSetting.cardLabelKh1 : "",
			cardLabelCh1: siteSetting ? siteSetting.cardLabelCh1 : "",
			cardIcon1: siteSetting ? siteSetting.cardIcon1 : "",
			cardLinkTo1: siteSetting ? siteSetting.cardLinkTo1 : "",
			cardIsShow1: siteSetting ? (siteSetting.cardIsShow1 === 1 || siteSetting.cardIsShow1 === true ? true : false) : true,
			thumbnailTwo: siteSetting ? siteSetting.thumbnailTwo : "",
			cardTitle2: siteSetting ? siteSetting.cardTitle2 : "",
			cardTitleKh2: siteSetting ? siteSetting.cardTitleKh2 : "",
			cardTitleCh2: siteSetting ? siteSetting.cardTitleCh2 : "",
			cardDesc2: siteSetting ? siteSetting.cardDesc2 : "",
			cardDescKh2: siteSetting ? siteSetting.cardDescKh2 : "",
			cardDescCh2: siteSetting ? siteSetting.cardDescCh2 : "",
			cardLabel2: siteSetting ? siteSetting.cardLabel2 : "",
			cardLabelKh2: siteSetting ? siteSetting.cardLabelKh2 : "",
			cardLabelCh2: siteSetting ? siteSetting.cardLabelCh2 : "",
			cardIcon2: siteSetting ? siteSetting.cardIcon2 : "",
			cardLinkTo2: siteSetting ? siteSetting.cardLinkTo2 : "",
			cardIsShow2: siteSetting ? (siteSetting.cardIsShow2 === 1 || siteSetting.cardIsShow2 === true ? true : false) : true,
			thumbnailThree: siteSetting ? siteSetting.thumbnailThree : "",
			cardTitle3: siteSetting ? siteSetting.cardTitle3 : "",
			cardTitleKh3: siteSetting ? siteSetting.cardTitleKh3 : "",
			cardTitleCh3: siteSetting ? siteSetting.cardTitleCh3 : "",
			cardDesc3: siteSetting ? siteSetting.cardDesc3 : "",
			cardDescKh3: siteSetting ? siteSetting.cardDescKh3 : "",
			cardDescCh3: siteSetting ? siteSetting.cardDescCh3 : "",
			cardLabel3: siteSetting ? siteSetting.cardLabel3 : "",
			cardLabelKh3: siteSetting ? siteSetting.cardLabelKh3 : "",
			cardLabelCh3: siteSetting ? siteSetting.cardLabelCh3 : "",
			cardIcon3: siteSetting ? siteSetting.cardIcon3 : "",
			cardLinkTo3: siteSetting ? siteSetting.cardLinkTo3 : "",
			cardIsShow3: siteSetting ? (siteSetting.cardIsShow3 === 1 || siteSetting.cardIsShow3 === true ? true : false) : true,
			thumbnailFour: siteSetting ? siteSetting.thumbnailFour : "",
			ourDonors: siteSetting ? siteSetting.ourDonors : "",
			ourDonorsKh: siteSetting ? siteSetting.ourDonorsKh : "",
			ourDonorsCh: siteSetting ? siteSetting.ourDonorsCh : "",
			thumbnailFive: siteSetting ? siteSetting.thumbnailFive : "",
			thumbnailSix: siteSetting ? siteSetting.thumbnailSix : "",
			thumbnailSeven: siteSetting ? siteSetting.thumbnailSeven : "",
			getDailyUpdate: siteSetting ? siteSetting.getDailyUpdate : "",
			getDailyUpdateKh: siteSetting ? siteSetting.getDailyUpdateKh : "",
			getDailyUpdateCh: siteSetting ? siteSetting.getDailyUpdateCh : "",
			footerDesc: siteSetting ? siteSetting.footerDesc : "",
			footerDescKh: siteSetting ? siteSetting.footerDescKh : "",
			footerDescCh: siteSetting ? siteSetting.footerDescCh : "",
		},
		onSubmit: (values) => {
			values.des = des;
			values.desKh = desKh;
			values.desCh = desCh;
			values.thumbnail = file?.length > 0 ? file[0]?.serverId : siteSetting.thumbnail;
			values.thumbnailTwo = fileTwo?.length > 0 ? fileTwo[0]?.serverId : siteSetting.thumbnailTwo;
			values.thumbnailThree = fileThree?.length > 0 ? fileThree[0]?.serverId : siteSetting.thumbnailThree;
			values.thumbnailFour = fileFour?.length > 0 ? fileFour[0]?.serverId : siteSetting.thumbnailFour;
			values.thumbnailFive = fileFive?.length > 0 ? fileFive[0]?.serverId : siteSetting.thumbnailFive;
			values.thumbnailSix = fileSix?.length > 0 ? fileSix[0]?.serverId : siteSetting.thumbnailSix;
			values.thumbnailSeven = fileSeven?.length > 0 ? fileSeven[0]?.serverId : siteSetting.thumbnailSeven;
			console.log(values);
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
		setFileFive([]);
		setFileSix([]);
		setFileSeven([]);
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
			if (siteSetting.thumbnailSix) {
				setFileSix([{ source: siteSetting.thumbnailSix, options: { type: "local" } }]);
			} else {
				setFileSix([]);
			}
			if (siteSetting.thumbnailSix) {
				setFileSeven([{ source: siteSetting.thumbnailSeven, options: { type: "local" } }]);
			} else {
				setFileSeven([]);
			}
			setDes(siteSetting.des);
			setDesKh(siteSetting.desKh);
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
														<TabPane tabId="ENG" id="eng1">
															<div className="mb-3">
																<Label className="form-label" htmlFor="subtitle-input">
																	Subtitle
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="subtitle-input"
																	placeholder="Enter text"
																	name="subtitle"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.subtitle}
																/>
															</div>

															<div className="mb-3">
																<Label className="form-label" htmlFor="title-input">
																	Title
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="title-input"
																	placeholder="Enter text"
																	name="title"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.title}
																/>
															</div>

															<div className="mb-3">
																<Label className="form-label" htmlFor="des-input">
																	Description
																</Label>
																<TinymceEditor onUploadImage={handleEditorChange} initDataValue={des} />
																{/* <textarea
																	className="form-control"
																	id="des-input"
																	rows="5"
																	placeholder="Enter text"
																	name="des"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.des}
																></textarea> */}
															</div>
														</TabPane>
														<TabPane tabId="KHM" id="khm1">
															<div className="mb-3">
																<Label className="form-label" htmlFor="subtitleKh-input">
																	Subtitle
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="subtitleKh-input"
																	placeholder="Enter text"
																	name="subtitleKh"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.subtitleKh}
																/>
															</div>

															<div className="mb-3">
																<Label className="form-label" htmlFor="titleKh-input">
																	Title
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="titleKh-input"
																	placeholder="Enter text"
																	name="titleKh"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.titleKh}
																/>
															</div>

															<div className="mb-3">
																<Label className="form-label" htmlFor="deskh-input">
																	Description
																</Label>
																<TinymceEditor onUploadImage={handleEditorKhChange} initDataValue={desKh} />
																{/* <textarea
																	className="form-control"
																	id="deskh-input"
																	rows="5"
																	placeholder="Enter text"
																	name="desKh"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.desKh}
																></textarea> */}
															</div>
														</TabPane>
														<TabPane tabId="CH" id="ch1">
															<div className="mb-3">
																<Label className="form-label" htmlFor="subtitleCh-input">
																	Subtitle
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="subtitleCh-input"
																	placeholder="Enter text"
																	name="subtitleCh"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.subtitleCh}
																/>
															</div>

															<div className="mb-3">
																<Label className="form-label" htmlFor="titleCh-input">
																	Title
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="titleCh-input"
																	placeholder="Enter text"
																	name="titleCh"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.titleCh}
																/>
															</div>

															<div className="mb-3">
																<Label className="form-label" htmlFor="desch-input">
																	Description
																</Label>
																<TinymceEditor onUploadImage={handleEditorKhChange} initDataValue={desCh} />
																{/* <textarea
																	className="form-control"
																	id="deskh-input"
																	rows="5"
																	placeholder="Enter text"
																	name="desKh"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.desKh}
																></textarea> */}
															</div>
														</TabPane>
													</TabContent>
												</Col>
												<Col xl={4}>
													<div className="mb-3">
														<Label className="form-label" htmlFor="thumbnail-input">
															Thumbnail (550x640 px)
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
														<TabPane tabId="CH" id="ch1">
															<div className="mb-3">
																<Label className="form-label" htmlFor="latestProjectCh-input">
																	Latest Project
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="latestProjectCh-input"
																	placeholder="Enter text"
																	name="latestProjectCh"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.latestProjectCh}
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
								<Row hidden>
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
																	<div className="mb-3">
																		<Label className="form-label" htmlFor="cardLabelCh1-input">
																			Label
																		</Label>
																		<Input
																			type="text"
																			className="form-control"
																			id="cardLabelCh1-input"
																			placeholder="Enter text"
																			name="cardLabelCh1"
																			onChange={settingForm.handleChange}
																			onBlur={settingForm.handleBlur}
																			value={settingForm.values.cardLabelCh1}
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
																	Thumbnail (630x375 px)
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
																	<div className="mb-3">
																		<Label className="form-label" htmlFor="cardLabelCh2-input">
																			Label
																		</Label>
																		<Input
																			type="text"
																			className="form-control"
																			id="cardLabelCh2-input"
																			placeholder="Enter text"
																			name="cardLabelCh2"
																			onChange={settingForm.handleChange}
																			onBlur={settingForm.handleBlur}
																			value={settingForm.values.cardLabelCh2}
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
																	Thumbnail (630x375 px)
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
																	<div className="mb-3">
																		<Label className="form-label" htmlFor="cardLabelCh3-input">
																			Label
																		</Label>
																		<Input
																			type="text"
																			className="form-control"
																			id="cardLabelCh3-input"
																			placeholder="Enter text"
																			name="cardLabelCh3"
																			onChange={settingForm.handleChange}
																			onBlur={settingForm.handleBlur}
																			value={settingForm.values.cardLabelCh3}
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
																	Thumbnail (630x375 px)
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
															Thumbnail (1280x768 px)
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
														<TabPane tabId="CH" id="ch1">
															<div className="mb-3">
																<Label className="form-label" htmlFor="getDailyUpdateCh-input">
																	Get Daily Updates
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="getDailyUpdateCh-input"
																	placeholder="Enter text"
																	name="getDailyUpdateCh"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.getDailyUpdateCh}
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
										<Row>
											<Col xl={12}>
												<div className="mb-3">
													<Label className="form-label" htmlFor="thumbnail-input">
														Footer Thumbnail (1920x768 px)
													</Label>
													<div className="position-relative d-block mx-auto">
														<div style={{ width: "100%" }}>
															<FilePond
																labelIdle='<span class="filepond--label-action">Choose Image</span>'
																files={fileSix}
																onupdatefiles={setFileSix}
																allowMultiple={false}
																maxFiles={1}
																name="file"
																server={`${api.BASE_URL}/save-image/site-setting`}
																className="filepond filepond-input-multiple"
															/>
														</div>
													</div>
												</div>

												<TabContent activeTab={titleTap}>
													<TabPane tabId="ENG" id="eng1">
														<div className="mb-3">
															<Label className="form-label" htmlFor="des-footer-input">
																Description
															</Label>
															<textarea
																className="form-control"
																id="des-footer-input"
																rows="5"
																placeholder="Enter text"
																name="footerDesc"
																onChange={settingForm.handleChange}
																onBlur={settingForm.handleBlur}
																value={settingForm.values.footerDesc}
															></textarea>
														</div>
													</TabPane>
													<TabPane tabId="KHM" id="khm1">
														<div className="mb-3">
															<Label className="form-label" htmlFor="des-footer-kh-input">
																Description
															</Label>
															<textarea
																className="form-control"
																id="des-footer-kh-input"
																rows="5"
																placeholder="Enter text"
																name="footerDescKh"
																onChange={settingForm.handleChange}
																onBlur={settingForm.handleBlur}
																value={settingForm.values.footerDescKh}
															></textarea>
														</div>
													</TabPane>
													<TabPane tabId="CH" id="ch1">
														<div className="mb-3">
															<Label className="form-label" htmlFor="des-footer-ch-input">
																Description
															</Label>
															<textarea
																className="form-control"
																id="des-footer-ch-input"
																rows="5"
																placeholder="Enter text"
																name="footerDescCh"
																onChange={settingForm.handleChange}
																onBlur={settingForm.handleBlur}
																value={settingForm.values.footerDescCh}
															></textarea>
														</div>
													</TabPane>
												</TabContent>
											</Col>
										</Row>
									</CardBody>
								</Card>

								<Card>
									<CardBody>
										<Row>
											<Col xl={12}>
												<div className="mb-3">
													<Label className="form-label" htmlFor="thumbnail-input">
														Login Thumbnail (860x660 px)
													</Label>
													<div className="position-relative d-block mx-auto">
														<div style={{ width: "100%" }}>
															<FilePond
																labelIdle='<span class="filepond--label-action">Choose Image</span>'
																files={fileSeven}
																onupdatefiles={setFileSeven}
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
