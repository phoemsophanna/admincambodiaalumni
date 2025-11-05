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
	NavItem, NavLink,
	Row,
	Spinner, TabContent, TabPane
} from "reactstrap";
import { api } from "../../../config";
import { useDispatch, useSelector } from "react-redux";
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
import TinymceEditor from "../../../Components/Common/TinymceEditor";
import classnames from "classnames";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const TermOfService = () => {
	document.title = "Term Of Service | Admin & Dashboard";
	const [titleTap, settitleTap] = useState("ENG");
	const titleTapToggle = (tab) => {
		if (titleTap !== tab) {
			settitleTap(tab);
		}
	};
	const dispatch = useDispatch();
	const [contentDesc, setContentDesc] = useState("");
	const [contentDescKh, setContentDescKh] = useState("");
	const [contentDescCh, setContentDescCh] = useState("");

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

	const handleEditorChange = (e) => {
		setContentDesc(e.target.getContent());
	};

	const handleEditorChange2 = (e) => {
		setContentDescKh(e.target.getContent());
	};

	const handleEditorChange3 = (e) => {
		setContentDescCh(e.target.getContent());
	};

	useEffect(() => {
		dispatch(getSiteSetting("TERM_SERVICE"));
		return () => {
			dispatch(resetSiteSettingFlag());
		};
	}, [dispatch]);

	const settingForm = useFormik({
		enableReinitialize: true,

		initialValues: {
			type: "TERM_SERVICE",
			description: siteSetting ? siteSetting.description : "",
			descriptionKh: siteSetting ? siteSetting.descriptionKh : "",
			descriptionCh: siteSetting ? siteSetting.descriptionCh : ""
		},
		onSubmit: (values) => {
			values.description = contentDesc;
			values.descriptionKh = contentDescKh;
			values.descriptionCh = contentDescCh;
			dispatch(saveSiteSetting(values));
			if (!isLoading && success) {
				refreshForm();
			}
		},
	});

	const refreshForm = () => {
		dispatch(getSiteSetting("TERM_SERVICE"));
	};

	useEffect(() => {
		if (siteSetting) {
			setContentDesc(siteSetting.description);
			setContentDescKh(siteSetting.descriptionKh);
			setContentDescCh(siteSetting.descriptionCh);
		} else {
			setContentDesc("");
			setContentDescKh("");
			setContentDescCh("");
		}
	}, [siteSetting]);

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="Term of Service" pageTitle="Dashboard" pageLink="/" />
					<Row>
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
														<TabPane tabId="ENG" id="eng">
															<div className="mb-3">
																<Label className="form-label" htmlFor="description-input">
																	Description
																</Label>
																<TinymceEditor onUploadImage={handleEditorChange} initDataValue={contentDesc} />
															</div>
														</TabPane>
														<TabPane tabId="KHM" id="khm">
															<div className="mb-3">
																<Label className="form-label" htmlFor="description-input-Kh">
																	Description
																</Label>
																<TinymceEditor onUploadImage={handleEditorChange2} initDataValue={contentDescKh} />
															</div>
														</TabPane>
														<TabPane tabId="CH" id="ch">
															<div className="mb-3">
																<Label className="form-label" htmlFor="description-input-Ch">
																	Description
																</Label>
																<TinymceEditor onUploadImage={handleEditorChange3} initDataValue={contentDescCh} />
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

export default withRouter(TermOfService);
