import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, Input, Label, Row, Spinner } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import { getSiteSetting, resetSiteSettingFlag, saveSiteSetting } from "../../../store/actions";
import { createSelector } from "reselect";
import BreadCrumb from "../../../Components/Common/BreadCrumb";

import withRouter from "../../../Components/Common/withRouter";
import LayoutNav from "./LayoutNav";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { api } from "../../../config";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const ContactUs = () => {
	document.title = "Site Setting: Contact Us | Admin & Dashboard";

	const dispatch = useDispatch();
	const [file, setFile] = useState([]);

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
		dispatch(getSiteSetting("CONTACT"));
		return () => {
			setFile([]);
			dispatch(resetSiteSettingFlag());
		};
	}, [dispatch]);

	const settingForm = useFormik({
		enableReinitialize: true,

		initialValues: {
			type: "CONTACT",
			email1: siteSetting ? siteSetting.email1 : "",
			email2: siteSetting ? siteSetting.email2 : "",
			phoneNumber1: siteSetting ? siteSetting.phoneNumber1 : "",
			phoneNumber2: siteSetting ? siteSetting.phoneNumber2 : "",
			address: siteSetting ? siteSetting.address : "",
			embedMap: siteSetting ? siteSetting.embedMap : "",
			facebookLink: siteSetting ? siteSetting.facebookLink : "",
			instagramLink: siteSetting ? siteSetting.instagramLink : "",
			telegramLink: siteSetting ? siteSetting.telegramLink : "",
			linkedinLink: siteSetting ? siteSetting.linkedinLink : "",
			appId: siteSetting ? siteSetting.appId : "",
			pageId: siteSetting ? siteSetting.pageId : "",
			thumbnail: siteSetting ? siteSetting.thumbnail : "",
		},
		onSubmit: (values) => {
			values.thumbnail = file?.length > 0 ? file[0]?.serverId : siteSetting.thumbnail;
			dispatch(saveSiteSetting(values));
			if (!isLoading && success) {
				refreshForm();
			}
		},
	});

	const refreshForm = () => {
		setFile([]);
		dispatch(getSiteSetting("CONTACT"));
	};

	useEffect(() => {
		if (siteSetting) {
			if (siteSetting.thumbnail) {
				setFile([
					{
						source: siteSetting.thumbnail,
						options: {
							type: "local",
						},
					},
				]);
			} else {
				setFile([]);
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

								{isLoading ? (
									<Row>
										<Col xl={12}>
											<Card>
												<CardBody>
													<span className="d-flex align-items-center">
														<Spinner size="sm" className="flex-shrink-0">
															Loading...
														</Spinner>
														<span className="flex-grow-1 ms-2">Loading...</span>
													</span>
												</CardBody>
											</Card>
										</Col>
									</Row>
								) : (
									<Row>
										<Col xl={8}>
											<Card>
												<CardBody>
													<Row>
														<Col xl={6}>
															<div className="mb-3">
																<Label className="form-label" htmlFor="email1-input">
																	Email 1
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="email1-input"
																	placeholder="Enter text"
																	name="email1"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.email1}
																/>
															</div>
														</Col>
														<Col xl={6}>
															<div className="mb-3">
																<Label className="form-label" htmlFor="email2-input">
																	Email 2
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="email2-input"
																	placeholder="Enter text"
																	name="email2"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.email2}
																/>
															</div>
														</Col>
														<Col xl={6}>
															<div className="mb-3">
																<Label className="form-label" htmlFor="phoneNumber1-input">
																	Phone Number 1
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="phoneNumber1-input"
																	placeholder="Enter text"
																	name="phoneNumber1"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.phoneNumber1}
																/>
															</div>
														</Col>
														<Col xl={6}>
															<div className="mb-3">
																<Label className="form-label" htmlFor="phoneNumber2-input">
																	Phone Number 2
																</Label>
																<Input
																	type="text"
																	className="form-control"
																	id="phoneNumber2-input"
																	placeholder="Enter text"
																	name="phoneNumber2"
																	onChange={settingForm.handleChange}
																	onBlur={settingForm.handleBlur}
																	value={settingForm.values.phoneNumber2}
																/>
															</div>
														</Col>
													</Row>
													<div className="mb-3">
														<Label className="form-label" htmlFor="address-input">
															Address
														</Label>
														<textarea
															className="form-control"
															id="address-input"
															rows="3"
															placeholder="Enter address"
															name="address"
															onChange={settingForm.handleChange}
															onBlur={settingForm.handleBlur}
															value={settingForm.values.address}
														></textarea>
													</div>
													<div className="mb-3">
														<Label className="form-label" htmlFor="embedMap-input">
															Embed Map
														</Label>
														<Input
															type="text"
															className="form-control"
															id="embedMap-input"
															placeholder="Enter text"
															name="embedMap"
															onChange={settingForm.handleChange}
															onBlur={settingForm.handleBlur}
															value={settingForm.values.embedMap}
														/>
													</div>
													<div className="mb-3">
														<iframe
															title="google map"
															src={
																settingForm.values.embedMap ||
																"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102948.35266648312!2d-115.15540073403864!3d36.26047650441708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c8c2b00ad43d33%3A0x22c7fa13f5acf526!2sNorth%20Las%20Vegas%2C%20NV%2C%20USA!5e0!3m2!1sen!2sbd!4v1639919075838!5m2!1sen!2sbd"
															}
															width="100%"
															height="450"
															allowFullScreen=""
															loading="lazy"
														></iframe>
													</div>
												</CardBody>
											</Card>
										</Col>
										<Col xl={4}>
											<Card>
												<CardHeader>
													<div className="fw-bold">Social Media Link</div>
												</CardHeader>
												<CardBody>
													<div className="form-icon mb-3">
														<Input
															type="text"
															className="form-control form-control-icon"
															placeholder="Enter link"
															name="facebookLink"
															onChange={settingForm.handleChange}
															onBlur={settingForm.handleBlur}
															value={settingForm.values.facebookLink || ""}
														/>
														<i className="ri-facebook-circle-line"></i>
													</div>
													<div className="form-icon mb-3">
														<Input
															type="text"
															className="form-control form-control-icon"
															placeholder="Enter link"
															name="instagramLink"
															onChange={settingForm.handleChange}
															onBlur={settingForm.handleBlur}
															value={settingForm.values.instagramLink || ""}
														/>
														<i className="ri-instagram-line"></i>
													</div>
													<div className="form-icon mb-3">
														<Input
															type="text"
															className="form-control form-control-icon"
															placeholder="Enter link"
															name="telegramLink"
															onChange={settingForm.handleChange}
															onBlur={settingForm.handleBlur}
															value={settingForm.values.telegramLink || ""}
														/>
														<i className="ri-telegram-line"></i>
													</div>
													<div className="form-icon mb-3">
														<Input
															type="text"
															className="form-control form-control-icon"
															placeholder="Enter link"
															name="linkedinLink"
															onChange={settingForm.handleChange}
															onBlur={settingForm.handleBlur}
															value={settingForm.values.linkedinLink || ""}
														/>
														<i className="ri-linkedin-line"></i>
													</div>
												</CardBody>
											</Card>
											<Card>
												<CardHeader>
													<div className="fw-bold">Facebook Setting</div>
												</CardHeader>
												<CardBody>
													<div className="input-group mb-3">
														<span className="input-group-text" id="app-id">
															App ID
														</span>
														<Input
															type="text"
															className="form-control"
															id="app-id-input"
															aria-describedby="app-id"
															name="appId"
															onChange={settingForm.handleChange}
															onBlur={settingForm.handleBlur}
															value={settingForm.values.appId || ""}
														/>
													</div>
													<div className="input-group mb-3">
														<span className="input-group-text" id="page-id">
															Page ID
														</span>
														<Input
															type="text"
															className="form-control"
															id="page-id-input"
															aria-describedby="page-id"
															name="pageId"
															onChange={settingForm.handleChange}
															onBlur={settingForm.handleBlur}
															value={settingForm.values.pageId || ""}
														/>
													</div>
												</CardBody>
											</Card>
											<Card>
												<CardHeader>
													<div className="fw-bold">Thumbnail Contact</div>
												</CardHeader>
												<CardBody>
													<div className="mb-3">
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
																	imagePreviewMaxHeight={195}
																/>
															</div>
														</div>
													</div>
												</CardBody>
											</Card>
										</Col>
									</Row>
								)}

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

export default withRouter(ContactUs);
