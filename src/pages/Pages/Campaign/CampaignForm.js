import React, { useEffect, useRef, useState } from "react";
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Col,
	Container,
	Form,
	FormFeedback,
	FormGroup,
	Input,
	Label,
	Nav,
	NavItem,
	NavLink,
	Row,
	Spinner,
	TabContent,
	TabPane
} from "reactstrap";
import Select from 'react-select'
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Link, useParams } from "react-router-dom";
import TinymceEditor from "../../../Components/Common/TinymceEditor";

import * as Yup from "yup";
import axios from "axios";
import { useFormik, validateYupSchema } from "formik";
import classnames from "classnames";
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { createCampaign, fetchCampaignDetail, resetCampaignShowDetail, fetchCampaignCategoryList, resetCampaignCategoryList } from "../../../store/actions";
import withRouter from "../../../Components/Common/withRouter";
import { api } from "../../../config";
import { selectOptions } from "@testing-library/user-event/dist/cjs/utility/selectOptions.js";
import { options } from "@fullcalendar/core/preact.js";
import { type } from "@testing-library/user-event/dist/cjs/utility/type.js";
import { locations } from "../../../common/data";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const CampaignForm = (props) => {
	const { id } = useParams();
	document.title = `Campaign: ${id ? "Edit" : "create"} | Admin & Dashboards`;
	const dispatch = useDispatch();
	const [titleTap, settitleTap] = useState("ENG");
	const titleTapToggle = (tab) => {
		if (titleTap !== tab) {
			settitleTap(tab);
		}
	};
	const [contentDesc, setContentDesc] = useState("");
	const [contentDescKh, setContentDescKh] = useState("");
	const [contentDescCh, setContentDescCh] = useState("");
	const [campaignCategory, setCampaignCategory] = useState(null);
	const [customActiveTab, setcustomActiveTab] = useState("1");
	const [location, setLocation] = useState();

	const [campaignGallery, setCampaignGallery] = useState([]);
	const [fileVideos, setFileVideos] = useState([]);
	const [fileProfile, setFileProfile] = useState([]);

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

	const campaignCategoryListSelector = createSelector(
		(state) => state.CampaignCategoryListReducer,
		(layout) => ({ campaignCategories: layout.campaignCategories })
	);
	const { campaignCategories } = useSelector(campaignCategoryListSelector);

	const handleEditorChange = (e) => {
		setContentDesc(e.target.getContent());
	};
	const handleEditorChangeKh = (e) => {
		setContentDescKh(e.target.getContent());
	};
	const handleEditorChangeCh = (e) => {
		setContentDescCh(e.target.getContent());
	};

	useEffect(() => {
		dispatch(fetchCampaignCategoryList());
		return () => {
			dispatch(resetCampaignCategoryList());
		};
	}, [dispatch]);

	useEffect(() => {
		if (id) dispatch(fetchCampaignDetail(id));

		return () => {
			dispatch(resetCampaignShowDetail());
		};
	}, [id, dispatch]);

	useEffect(() => {
		if (campaign) {
			setContentDesc(campaign.fullStory);
			setContentDescKh(campaign.fullStoryKm);
			setContentDescCh(campaign.fullStoryCh);
			setCampaignCategory(campaign.campaignCategoryId);
			setLocation({value: campaign.location,label: campaign.location});
			setCampaignGallery(
				campaign?.campaignGallery?.length > 0 ? campaign?.campaignGallery?.map((img) => ({ source: img, options: { type: "local" } })) : []
			);

			setFileProfile(campaign?.profile?.length > 0 ? [{source: campaign.profile, options: {type: "local"}}] : []);

			if (campaign.videoFile) {
				setFileVideos([
					{
						source: campaign.videoFile,
						options: {
							type: "local",
						},
					},
				]);
			} else {
				setFileVideos([]);
			}
		} else {
			setContentDesc("");
			setContentDescKh("");
			setContentDescCh("");
		}
	}, [campaign]);

	const campaignValidation = useFormik({
		enableReinitialize: true,

		initialValues: {
			id: id || "",
			creatorId: campaign ? campaign.creatorId : "1",
			campaignCategoryId: campaign ? campaign.campaignCategoryId : "",
			location: campaign ? campaign.location : "",
			city: campaign ? campaign.city : "",
			campaignTileKm: campaign ? campaign.campaignTileKm : "",
			campaignTileCh: campaign ? campaign.campaignTileCh : "",
			campaignTile: campaign ? campaign.campaignTile : "",
			referenceLink: campaign ? campaign.referenceLink : "",
			videoLink: campaign ? campaign.videoLink : "",
			goal: campaign ? campaign.goal : "",
			startDate: campaign ? campaign.startDate : "",
			endDate: campaign ? campaign.endDate : "",
			gratitude: campaign ? campaign.gratitude : "",
			gratitudeKm: campaign ? campaign.gratitudeKm : "",
			gratitudeCh: campaign ? campaign.gratitudeCh : "",
			fullStory: campaign ? campaign.fullStory : "",
			fullStoryKm: campaign ? campaign.fullStoryKm : "",
			fullStoryCh: campaign ? campaign.fullStoryCh : "",
			additionalInformation: campaign ? campaign.additionalInformation : "",
			additionalInformationKm: campaign ? campaign.additionalInformationKm : "",
			additionalInformationCh: campaign ? campaign.additionalInformationCh : "",
			involvement: campaign ? campaign.involvement : "",
			involvementKm: campaign ? campaign.involvementKm : "",
			involvementCh: campaign ? campaign.involvementCh : "",
			campaignGallery: campaign ? campaign.campaignGallery : "",
			videoFile: campaign ? campaign.videoFile :  "",
			fullName: campaign ? campaign.fullName : "",
			status: campaign ? campaign.status : "COMPLETE",
			profile: campaign ? campaign.profile : "",
			ordering: campaign ? campaign.ordering : 0,
			isActive: campaign ? (campaign.isActive == 1 ? true : false) : true,
			isInNeed: campaign ? (campaign.isInNeed == 1 ? true : false) : true,
			isLatest: campaign ? (campaign.isLatest == 1 ? true : false) : true,
		},
		validationSchema: Yup.object({
			campaignTile: Yup.string().required("Please Enter Title"),
			campaignCategoryId: Yup.string().required("Please Select Category"),
		}),
		onSubmit: (values) => {
			values.fullStory = contentDesc;
			values.fullStoryKm = contentDescKh;
			values.fullStoryCh = contentDescCh;
			values.campaignCategoryId = campaignCategory;
			values.campaignGallery = campaignGallery?.length > 0 ? campaignGallery.map((file) => file.serverId) : [];
			values.videoFile = fileVideos?.length > 0 ? fileVideos[0].serverId : "";
			values.profile = fileProfile?.length > 0 ? fileProfile[0].serverId : "";
			dispatch(createCampaign(values, props.router.navigate));
		},
	});

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="Project & Event" pageTitle="Dashboard" pageLink="/campaign-menu" />
					<Row>
						<Col lg={12}>
							<Card>
								<CardHeader>
									<Row className="justify-content-between align-items-center gy-3">
										<Col lg={3}>
											<h5 className="mt-2">{id ? "Edit" : "Create"} Project</h5>
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
							<Col xl={12}>
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
									{/* <CardBody>
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
	
										</Nav>
									</CardBody> */}
								</Card>
								<TabContent activeTab={customActiveTab} className="text-muted">
									<TabPane tabId="1" id="home1">
										<Card>
											<CardBody>
												<div className="mb-3 mt-3">
													<label htmlFor="exampleFormControlInput1" className="form-label main-label">
														Project Category
													</label>

													<Input
														className="form-select p-2"
														id="select-news-type"
														name="campaignCategoryId"
														type="select"
														onChange={(e) => {
																console.log(e.target.value);
																setCampaignCategory(e.target.value);
																campaignValidation.handleChange(e);
															}
														}
														value={campaignCategory}
													>
														<option value="">-- Selected Category --</option>
														{campaignCategories?.map((el) => (
															<option key={el.id} value={el.id}>
															{el.name}
															</option>
														))}
													</Input>


													{!campaignCategory ? (
														<div className="text-danger">Please select category</div>
													) : null}
												</div>
												<div className="mb-3">
													<label htmlFor="exampleFormControlInput1" className="form-label main-label">
														Location
													</label>
													<div>
														{/* <input
															type="text"
															className="form-control"
															placeholder="Location"
															aria-label="Location"
															aria-describedby="button-addon2"
															name="location"
															onChange={campaignValidation.handleChange}
															value={campaignValidation.values.location}
														/> */}
														<Select
															options={locations}
															className="campaign-select-input"
															placeholder="Select Location"
															isClearable={true}
															isSearchable={true}
															onChange={setLocation}
															name="location"
															value={location}
															invalid={campaignValidation.values.location ? true : false}
														/>
														{/* <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => setLocationPicker(true)}>
															<i className="fas fa-map-marker-alt"></i>
														</button> */}
													</div>
												</div>
												<div className="mb-3">
													<label htmlFor="exampleFormControlInput1" className="form-label main-label">
														Address
													</label>
													<input
														type="text"
														className="form-control"
														id="exampleFormControlInput1"
														placeholder="Enter Address"
														name="city"
														onChange={campaignValidation.handleChange}
														value={campaignValidation.values.city}
													/>
												</div>
												<TabContent activeTab={titleTap}>
													<TabPane tabId="ENG" id="eng">
														<div className="mb-3">
															<Label className="form-label" htmlFor="campaignTile-input">
																Title
															</Label>
															<Input
																type="text"
																className="form-control"
																id="campaignTile-input"
																placeholder="Enter Title English"
																name="campaignTile"
																onChange={campaignValidation.handleChange}
																onBlur={campaignValidation.handleBlur}
																value={campaignValidation.values.campaignTile}
															/>
															{campaignValidation.errors?.campaignTile ? (
																<div className="text-danger">Please input title</div>
															) : null}
														</div>
														{
															campaignValidation.values.ordering != -2 ? (
																<>
																	<div className="mb-3">
																		<Label>Full Story</Label>
																		<TinymceEditor onUploadImage={handleEditorChange} initDataValue={contentDesc} />
																	</div>
																	<div className="mb-3">
																		<Label>Additional Information</Label>
																		<Input
																			type="text"
																			className="form-control"
																			id="additionalInformation-input"
																			placeholder="Enter additionalInformation English"
																			name="additionalInformation"
																			onChange={campaignValidation.handleChange}
																			onBlur={campaignValidation.handleBlur}
																			value={campaignValidation.values.additionalInformation}
																		/>
																	</div>
																	<div className="mb-3">
																		<Label>Your Involvement</Label>
																		<Input
																			type="text"
																			className="form-control"
																			id="involvement-input"
																			placeholder="Enter involvement English"
																			name="involvement"
																			onChange={campaignValidation.handleChange}
																			onBlur={campaignValidation.handleBlur}
																			value={campaignValidation.values.involvement}
																		/>
																	</div>
																</>
															) : ""
														}
													</TabPane>
													<TabPane tabId="KHM" id="khm">
														<div className="mb-3">
															<Label className="form-label" htmlFor="campaignTileKm-input">
																Title
															</Label>
															<Input
																type="text"
																className="form-control"
																id="campaignTileKm-input"
																placeholder="Enter Title Khmer"
																name="campaignTileKm"
																onChange={campaignValidation.handleChange}
																onBlur={campaignValidation.handleBlur}
																value={campaignValidation.values.campaignTileKm}
															/>
														</div>
														{
															campaignValidation.values.ordering != -2 ? (<>
																<div className="mb-3">
																	<Label>Full Story</Label>
																	<TinymceEditor onUploadImage={handleEditorChangeKh} initDataValue={contentDescKh} />
																</div>
																<div className="mb-3">
																	<Label>Additional Information</Label>
																	<Input
																		type="text"
																		className="form-control"
																		id="additionalInformationKm-input"
																		placeholder="Enter additionalInformation Khmer"
																		name="additionalInformationKm"
																		onChange={campaignValidation.handleChange}
																		onBlur={campaignValidation.handleBlur}
																		value={campaignValidation.values.additionalInformationKm}
																	/>
																</div>
																<div className="mb-3">
																	<Label>Your Involvement</Label>
																	<Input
																		type="text"
																		className="form-control"
																		id="involvementKm-input"
																		placeholder="Enter involvement Khmer"
																		name="involvementKm"
																		onChange={campaignValidation.handleChange}
																		onBlur={campaignValidation.handleBlur}
																		value={campaignValidation.values.involvementKm}
																	/>
																</div>
															</>) : "" 
														}
													</TabPane>
													<TabPane tabId="CH" id="ch">
														<div className="mb-3">
															<Label className="form-label" htmlFor="campaignTileCh-input">
																Title
															</Label>
															<Input
																type="text"
																className="form-control"
																id="campaignTileCh-input"
																placeholder="Enter Title Chinese"
																name="campaignTileCh"
																onChange={campaignValidation.handleChange}
																onBlur={campaignValidation.handleBlur}
																value={campaignValidation.values.campaignTileCh}
															/>
														</div>
														{
															campaignValidation.values.ordering != -2 ? (<>
																<div className="mb-3">
																	<Label>Full Story</Label>
																	<TinymceEditor onUploadImage={handleEditorChangeCh} initDataValue={contentDescCh} />
																</div>
																<div className="mb-3">
																	<Label>Additional Information</Label>
																	<Input
																		type="text"
																		className="form-control"
																		id="additionalInformationCh-input"
																		placeholder="Enter additionalInformation Chinese"
																		name="additionalInformationCh"
																		onChange={campaignValidation.handleChange}
																		onBlur={campaignValidation.handleBlur}
																		value={campaignValidation.values.additionalInformationCh}
																	/>
																</div>
																<div className="mb-3">
																	<Label>Your Involvement</Label>
																	<Input
																		type="text"
																		className="form-control"
																		id="involvementCh-input"
																		placeholder="Enter involvement Chinese"
																		name="involvementCh"
																		onChange={campaignValidation.handleChange}
																		onBlur={campaignValidation.handleBlur}
																		value={campaignValidation.values.involvementCh}
																	/>
																</div>
															</>) : ""
														}
													</TabPane>
												</TabContent>

												<div className="mb-3">
													<Label className="form-label" htmlFor="referenceLink-input">
														Reference Link
													</Label>
													<Input
														type="text"
														className="form-control"
														id="referenceLink-input"
														placeholder="Enter Link"
														name="referenceLink"
														onChange={campaignValidation.handleChange}
														onBlur={campaignValidation.handleBlur}
														value={campaignValidation.values.referenceLink}
													/>
												</div>
											</CardBody>
										</Card>
									</TabPane>
									<TabPane tabId="1" id="media1">
										<Card>
											<CardBody>
												<div className="mb-3">
													<Label className="form-label" htmlFor="thumbnail-input">
														Photo (1024 x 692 px)
													</Label>
													<div className="position-relative d-block mx-auto">
														<div style={{ width: "100%" }}>
															<FilePond
																labelIdle='<span class="filepond--label-action">Choose Image</span>'
																files={campaignGallery}
																onupdatefiles={setCampaignGallery}
																allowMultiple={true}
																maxFiles={5}
																name="file"
																server={`${api.BASE_URL}/save-image/campaign`}
																className="filepond filepond-input-multiple"
																stylePanelLayout="compact"
															/>
														</div>
														{campaignValidation.errors?.campaignGallery ? (
															<div className="text-danger">Please input image</div>
														) : null}
													</div>
												</div>
												<div className="mb-3">
													<label htmlFor="exampleFormControlInput1" className="form-label main-label">
														Video
													</label>
													<div className="card-upload-video">
														<div className="form-floating">
															<input
																type="text"
																className="form-control"
																id="videoLink"
																placeholder="http://..."
																name="videoLink"
																onChange={campaignValidation.handleChange}
																value={campaignValidation.values.videoLink}
															/>
															<label htmlFor="videoLink">Video Link</label>
														</div>
														<span className="card-upload-video-hr" style={{textAlign: "center",display: "block",width: "100%"}}>OR</span>
														<FilePond
															files={fileVideos}
															onupdatefiles={setFileVideos}
															allowMultiple={true}
															maxFiles={1}
															storeAsFile={true}
															server={`${api.BASE_URL}/save-image/campaign`}
															name="file"
															labelIdle='Drag & Drop video or <span className="filepond--label-action">Browse</span>'
														/>
													</div>
												</div>
											</CardBody>
										</Card>
									</TabPane>
									<TabPane tabId="1" id="goal1">
										<Card>
											<CardBody>
												<div className="mb-3">
													<Label className="form-label" htmlFor="goal-input">
														Goal
													</Label>
													<Input
														type="number"
														className="form-control"
														id="goal-input"
														placeholder="Enter goal"
														name="goal"
														onChange={campaignValidation.handleChange}
														onBlur={campaignValidation.handleBlur}
														value={campaignValidation.values.goal}
													/>
												</div>
												<div className="mb-3">
													<Row>
														<Col lg={6}>
															<Label className="form-label" htmlFor="startDate">
																Start Date
															</Label>
															<Input
																type="date"
																placeholder="enter date"
																name="startDate"
																id="startDate"
																onChange={campaignValidation.handleChange}
																value={campaignValidation.values.startDate}
															/>
															{campaignValidation.errors.startDate && campaignValidation.touched.startDate ? (
																<div className="text-danger">{campaignValidation.errors.startDate}</div>
															) : null}
														</Col>
														<Col lg={6}>
															<Label className="form-label" htmlFor="endDate">
																End Date
															</Label>
															<Input
																type="date"
																placeholder="enter date"
																name="endDate"
																id="endDate"
																onChange={campaignValidation.handleChange}
																value={campaignValidation.values.endDate}
															/>
															{campaignValidation.errors.endDate && campaignValidation.touched.endDate ? (
																<div className="text-danger">{campaignValidation.errors.endDate}</div>
															) : null}
														</Col>
													</Row>
												</div>
												<TabContent activeTab={titleTap}>
													<TabPane tabId="ENG" id="eng">
														<div className="mb-3">
															<Label className="form-label" htmlFor="gratitude-input">
																Gratitude to the donor
															</Label>
															<Input
																type="text"
																className="form-control"
																id="gratitude-input"
																placeholder="Enter Title English"
																name="gratitude"
																onChange={campaignValidation.handleChange}
																onBlur={campaignValidation.handleBlur}
																value={campaignValidation.values.gratitude}
															/>
														</div>
													</TabPane>
													<TabPane tabId="KHM" id="khm">
														<div className="mb-3">
															<Label className="form-label" htmlFor="gratitudeKm-input">
																Gratitude to the donor
															</Label>
															<Input
																type="text"
																className="form-control"
																id="gratitudeKm-input"
																placeholder="Enter Title Khmer"
																name="gratitudeKm"
																onChange={campaignValidation.handleChange}
																onBlur={campaignValidation.handleBlur}
																value={campaignValidation.values.gratitudeKm}
															/>
														</div>
													</TabPane>
													<TabPane tabId="CH" id="ch">
														<div className="mb-3">
															<Label className="form-label" htmlFor="gratitudeCh-input">
																Gratitude to the donor
															</Label>
															<Input
																type="text"
																className="form-control"
																id="gratitudeCh-input"
																placeholder="Enter Title Chinese"
																name="gratitudeCh"
																onChange={campaignValidation.handleChange}
																onBlur={campaignValidation.handleBlur}
																value={campaignValidation.values.gratitudeCh}
															/>
														</div>
													</TabPane>
												</TabContent>
											</CardBody>
										</Card>
									</TabPane>
									<TabPane tabId="1" id="media1">
										<Card>
											<CardBody>
												<Row>
													<Col lg={6}>
														<div className="mb-3">
															<Label className="form-label" htmlFor="fullName-input">
																Create By
															</Label>
															<Input
																type="text"
																className="form-control"
																id="fullName-input"
																placeholder="Enter Create By"
																name="fullName"
																onChange={campaignValidation.handleChange}
																onBlur={campaignValidation.handleBlur}
																value={campaignValidation.values.fullName}
															/>
														</div>
													</Col>
													<Col lg={6}>
														<div className="mb-3">
															<FilePond
																files={fileProfile}
																onupdatefiles={setFileProfile}
																allowMultiple={false}
																maxFiles={1}
																storeAsFile={true}
																server={`${api.BASE_URL}/save-image/campaign`}
																name="file"
																labelIdle='Drag & Drop video or <span className="filepond--label-action">Browse</span>'
															/>
														</div>
													</Col>
												</Row>
											
											</CardBody>
										</Card>
									</TabPane>
								</TabContent>
								{
									campaignValidation.values.ordering != -2 ? (<>
										<Card>
											<CardBody>
												<div className="mb-3">
													<Label className="form-label" htmlFor="news-ordering-input">
														Ordering
													</Label>
													<Input
														type="number"
														className="form-control"
														id="news-ordering-input"
														placeholder="Enter news ordering"
														name="ordering"
														onChange={campaignValidation.handleChange}
														onBlur={campaignValidation.handleBlur}
														value={campaignValidation.values.ordering}
													/>
												</div>
											</CardBody>
										</Card>
									</>) : ""
								}

								{
									campaignValidation.values.ordering != -2 ? (<>
										<Card>
											<CardBody>
												<div className="form-check form-switch form-switch-md mb-3" dir="ltr">
													<Input
														type="checkbox"
														className="form-check-input"
														id="isActive"
														name="isActive"
														onChange={campaignValidation.handleChange}
														onBlur={campaignValidation.handleBlur}
														checked={campaignValidation.values.isActive}
													/>
													<Label className="form-check-label" for="isActive">
														Status: <span className="fw-bolder">{campaignValidation.values.isActive ? "Active" : "In-Active"}</span>
													</Label>
												</div>
												<div className="form-check form-switch form-switch-md mb-3" dir="ltr">
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
														Display Homepage: <span className="fw-bolder">{campaignValidation.values.isLatest ? "Show" : "Hide"}</span>
													</Label>
												</div>

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
													<Label className="form-check-label" for="isTrending">
														In Need: <span className="fw-bolder">{campaignValidation.values.isInNeed ? "Show" : "Hide"}</span>
													</Label>
												</div>
											</CardBody>
										</Card>
									</>) : ""
								}
							</Col>
							<Col>
								<div className="text-start mb-4">
									{useCampaignSelect.isLoading ? (
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
											<i className="ri-save-3-line label-icon align-middle fs-16 me-2"></i> Save News
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

export default withRouter(CampaignForm);
