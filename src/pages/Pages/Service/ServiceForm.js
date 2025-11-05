import React, { useEffect, useRef, useState } from "react";
// import { Button, Card, Nav, NavItem, NavLink, CardBody, TabContent, TabPane, CardHeader, Col, Container, Form, FormFeedback, Input, Label, Row, Spinner } from "reactstrap";
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
	TabPane,
} from "reactstrap";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Link, useParams } from "react-router-dom";
import TinymceEditor from "../../../Components/Common/TinymceEditor";
import classnames from "classnames";
import * as Yup from "yup";
import { useFormik } from "formik";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import {
	createService,
	fetchCampaignCategoryList,
	fetchServiceDetail,
	resetCampaignCategoryList,
	resetServiceShowDetail,
} from "../../../store/actions";
import withRouter from "../../../Components/Common/withRouter";
import { api } from "../../../config";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const ServiceForm = (props) => {
	const { id } = useParams();
	document.title = `Service: ${id ? "Edit" : "create"} | Admin & Dashboards`;
	// function store វានៅក្នុង redux store វាអាចទាញយកនិងកែប្រែវាបាន
	const dispatch = useDispatch();
	const [file, setFile] = useState([]);
	const [contentDesc, setContentDesc] = useState("");
	const [contentDescKh, setContentDescKh] = useState("");
	const [titleTap, settitleTap] = useState("ENG");
	const titleTapToggle = (tab) => {
		if (titleTap !== tab) {
			settitleTap(tab);
		}
	};
	const durationRef = useRef(null);
	const [fromDate, setFromDate] = useState(null);
	const [toDate, setToDate] = useState(null);

	// Create selector for use in another place 
	const createServiceSelector = createSelector(
		(state) => state.CreateServiceReducer, // this is get from reducer of create function
		(layout) => layout
	);
	const useServiceSelect = useSelector(createServiceSelector);
	// 

	const createServiceDetailSelector = createSelector(
		(state) => state.ServiceDetailReducer,
		(layout) => ({
			service: layout.service,
			isLoading: layout.isLoading,
		})
	);
	
	const { service, isLoading } = useSelector(createServiceDetailSelector);

	const handleEditorChange = (e) => {
		setContentDesc(e.target.getContent());
	};

	const handleDatePicker = (e) => {
		setFromDate(e?.length > 0 ? e[0] : null);
		setToDate(e?.length > 1 ? e[1] : null);
	};

	useEffect(() => {
		if (id) dispatch(fetchServiceDetail(id));

		return () => {
			dispatch(resetServiceShowDetail());
		};
	}, [id, dispatch]);

	useEffect(() => {
		if (service) {
			setContentDesc(service.content);
			setFromDate(service.fromDate ? new Date(service.fromDate) : null);
			setToDate(service.toDate ? new Date(service.toDate) : null);
			if (service.image) {
				setFile([
					{
						source: service.image,
						options: {
							type: "local",
						},
					},
				]);
			} else {
				setFile([]);
			}
		} else {
			setContentDesc("");
		}
	}, [service]);

	const serviceValidation = useFormik({
		enableReinitialize: true,

		initialValues: {
			id: id || "",
			title: service ? service.title : "",
			titleKh: service ? service.titleKh : "",
			content: service ? service.content : "",
			contentKh: service ? service.contentKh : "",
			// category_id: service ? service.category_id : "",
			// websiteLink: service ? service.websiteLink : "",
			// facebookLink: service ? service.facebookLink : "",
			// instagramLink: service ? service.instagramLink : "",
			// telegramLink: service ? service.telegramLink : "",
			ordering: service ? service.ordering : 0,
			inProgress: service ? (service.inProgress === 1 ? true : false) : true,
			isActive: service ? (service.isActive == 1 ? true : false) : true,
			isDisplayHomepage: service ? (service.isDisplayHomepage === 1 ? true : false) : false,
			image: service ? service.image : "",
		},
		validationSchema: Yup.object({
			title: Yup.string().required("Please Enter Title"),
		}),
		onSubmit: (values) => {
			values.fromDate = fromDate;
			values.toDate = toDate;
			values.content = contentDesc;
			values.contentKh = contentDescKh;
			values.image = file?.length > 0 ? file[0]?.serverId : "";
			dispatch(createService(values, props.router.navigate));
		},
	});

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="Service Menu" pageTitle="Dashboard" pageLink="/services-menu" />
					<Row>
						<Col lg={12}>
							<Card>
								<CardHeader>
									<Row className="justify-content-between align-items-center gy-3">
										<Col lg={3}>
											<h5 className="mt-2">{id ? "Edit" : "Create"} Service</h5>
										</Col>
										<Col className="col-lg-auto">
											<div className="d-md-flex text-nowrap gap-2">
												<Link className="btn btn-outline-dark" to="/services-menu">
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
							serviceValidation.handleSubmit();
							return false;
						}}
						action="#"
					>
						<Row>
							<Col lg={8}>
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
									<CardBody>
										<TabContent activeTab={titleTap}>
											<TabPane tabId="ENG" id="eng">
												<div className="mb-3">
													<Label className="form-label" htmlFor="news-title-input">
														Service Title <small className="text-danger">(Required)</small>
													</Label>
													<Input
														type="text"
														className="form-control"
														id="news-title-input"
														placeholder="Enter news title"
														name="title"
														onChange={serviceValidation.handleChange}
														onBlur={serviceValidation.handleBlur}
														value={serviceValidation.values.title}
														invalid={serviceValidation.touched.title && serviceValidation.errors.title ? true : false}
													/>
													{serviceValidation.touched.title && serviceValidation.errors.title ? (
														<FormFeedback type="invalid">{serviceValidation.errors.title}</FormFeedback>
													) : null}
												</div>
												
												<div className="mb-3">
													<Label>Content</Label>
													<TinymceEditor onUploadImage={handleEditorChange} initDataValue={contentDesc} />
												</div>
											</TabPane>
											<TabPane tabId="KHM" id="khm">
												<div className="mb-3">
													<Label className="form-label" htmlFor="news-titleKh-input">
														ចំណងជើង <small className="text-danger">(Required)</small>
													</Label>
													<Input
														type="text"
														className="form-control"
														id="news-titleKh-input"
														placeholder="ប​ញ្ចូ​ល​ចំ​ណង​ជើង"
														name="titleKh"
														onChange={serviceValidation.handleChange}
														onBlur={serviceValidation.handleBlur}
														value={serviceValidation.values.titleKh}
														invalid={serviceValidation.touched.titleKh && serviceValidation.errors.titleKh ? true : false}
													/>
													{serviceValidation.touched.titleKh && serviceValidation.errors.titleKh ? (
														<FormFeedback type="invalid">{serviceValidation.errors.titleKh}</FormFeedback>
													) : null}
												</div>
												<div className="mb-3">
													<Label>អត្ថបទ</Label>
													<TinymceEditor onUploadImage={handleEditorChange} initDataValue={contentDescKh} />
												</div>
											</TabPane>
										</TabContent>

										<div className="mb-3">
											<Label className="form-label" htmlFor="thumbnail-input">
												Thumbnail (140x70 px)
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
														server={`${api.BASE_URL}/save-image/service`}
														className="filepond filepond-input-multiple"
														stylePanelLayout="compact"
													/>
												</div>
											</div>
										</div>
									</CardBody>
								</Card>
							</Col>
							<Col lg={4}>
								{/* <Card>
									<CardHeader>
										<div className="fw-bold">Service's Link</div>
									</CardHeader>
									<CardBody>
										<div className="form-icon mb-3">
											<Input
												type="text"
												className="form-control form-control-icon"
												placeholder="Enter link"
												name="websiteLink"
												onChange={serviceValidation.handleChange}
												onBlur={serviceValidation.handleBlur}
												value={serviceValidation.values.websiteLink || ""}
											/>
											<i className="ri-global-line"></i>
										</div>
										<div className="form-icon mb-3">
											<Input
												type="text"
												className="form-control form-control-icon"
												placeholder="Enter link"
												name="facebookLink"
												onChange={serviceValidation.handleChange}
												onBlur={serviceValidation.handleBlur}
												value={serviceValidation.values.facebookLink || ""}
											/>
											<i className="ri-facebook-circle-line"></i>
										</div>
										<div className="form-icon mb-3">
											<Input
												type="text"
												className="form-control form-control-icon"
												placeholder="Enter link"
												name="instagramLink"
												onChange={serviceValidation.handleChange}
												onBlur={serviceValidation.handleBlur}
												value={serviceValidation.values.instagramLink || ""}
											/>
											<i className="ri-instagram-line"></i>
										</div>
										<div className="form-icon mb-3">
											<Input
												type="text"
												className="form-control form-control-icon"
												placeholder="Enter link"
												name="telegramLink"
												onChange={serviceValidation.handleChange}
												onBlur={serviceValidation.handleBlur}
												value={serviceValidation.values.telegramLink || ""}
											/>
											<i className="ri-telegram-line"></i>
										</div>
									</CardBody>
								</Card> */}
								<Card>
									<CardBody>
										<div className="mb-3">
											<Label className="form-label" htmlFor="service-ordering-input">
												Ordering
											</Label>
											<Input
												type="number"
												className="form-control"
												id="service-ordering-input"
												placeholder="Enter service ordering"
												name="ordering"
												onChange={serviceValidation.handleChange}
												onBlur={serviceValidation.handleBlur}
												value={serviceValidation.values.ordering}
											/>
										</div>

										{/* <div className="form-check form-switch form-switch-md" dir="ltr">
											<Input
												type="checkbox"
												className="form-check-input"
												id="isDisplayHomepage"
												name="isDisplayHomepage"
												onChange={serviceValidation.handleChange}
												onBlur={serviceValidation.handleBlur}
												checked={serviceValidation.values.isDisplayHomepage}
											/>
											<Label className="form-check-label" for="isDisplayHomepage">
												Display Homepage: <span className="fw-bolder">{serviceValidation.values.isDisplayHomepage ? "Show" : "Hide"}</span>
											</Label>
										</div> */}
										<div className="form-check form-switch form-switch-md mb-3" dir="ltr">
											<Input
												type="checkbox"
												className="form-check-input"
												id="isActive"
												name="isActive"
												onChange={serviceValidation.handleChange}
												onBlur={serviceValidation.handleBlur}
												checked={serviceValidation.values.isActive}
											/>
											<Label className="form-check-label" for="isActive">
												Status: <span className="fw-bolder">{serviceValidation.values.isActive ? "Active" : "In-Active"}</span>
											</Label>
										</div>
									</CardBody>
								</Card>
							</Col>
							<Col lg={12}>
								<div className="text-start mb-4">
									{useServiceSelect.isLoading ? (
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
											<i className="ri-save-3-line label-icon align-middle fs-16 me-2"></i> Save Service
										</Button>
									)}{" "}
									<Link className="btn btn-label btn-danger" to="/service-menu">
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

export default withRouter(ServiceForm);
