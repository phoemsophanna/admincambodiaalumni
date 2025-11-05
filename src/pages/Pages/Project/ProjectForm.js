import React, { useEffect, useRef, useState } from "react";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, Input, Label, Row, Spinner } from "reactstrap";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Link, useParams } from "react-router-dom";
import TinymceEditor from "../../../Components/Common/TinymceEditor";

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
	createProject,
	fetchCampaignCategoryList,
	fetchProjectDetail,
	resetCampaignCategoryList,
	resetProjectShowDetail,
} from "../../../store/actions";
import withRouter from "../../../Components/Common/withRouter";
import { api } from "../../../config";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const ProjectForm = (props) => {
	const { id } = useParams();
	document.title = `Project: ${id ? "Edit" : "create"} | Admin & Dashboards`;
	const dispatch = useDispatch();
	const [file, setFile] = useState([]);
	const [contentDesc, setContentDesc] = useState("");
	const [campaignCategory, setCampaignCategory] = useState("");
	const durationRef = useRef(null);
	const [fromDate, setFromDate] = useState(null);
	const [toDate, setToDate] = useState(null);

	const createProjectSelector = createSelector(
		(state) => state.CreateProjectReducer,
		(layout) => layout
	);
	const useProjectSelect = useSelector(createProjectSelector);
	const createProjectDetailSelector = createSelector(
		(state) => state.ProjectDetailReducer,
		(layout) => ({
			project: layout.project,
			isLoading: layout.isLoading,
		})
	);
	const { project, isLoading } = useSelector(createProjectDetailSelector);
	const campaignCategoryListSelector = createSelector(
		(state) => state.CampaignCategoryListReducer,
		(layout) => ({ campaignCategories: layout.campaignCategories })
	);
	const { campaignCategories } = useSelector(campaignCategoryListSelector);

	const handleEditorChange = (e) => {
		setContentDesc(e.target.getContent());
	};

	const handleSelect = (e) => {
		setCampaignCategory(e);
	};

	const handleDatePicker = (e) => {
		setFromDate(e?.length > 0 ? e[0] : null);
		setToDate(e?.length > 1 ? e[1] : null);
	};

	useEffect(() => {
		if (id) dispatch(fetchProjectDetail(id));

		return () => {
			dispatch(resetProjectShowDetail());
		};
	}, [id, dispatch]);
	useEffect(() => {
		dispatch(fetchCampaignCategoryList());
		return () => {
			dispatch(resetCampaignCategoryList());
		};
	}, [dispatch]);

	useEffect(() => {
		if (project) {
			setContentDesc(project.content);
			setCampaignCategory(project.campaignCategory);
			setFromDate(project.fromDate ? new Date(project.fromDate) : null);
			setToDate(project.toDate ? new Date(project.toDate) : null);
			if (project.image) {
				setFile([
					{
						source: project.image,
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
	}, [project]);

	const projectValidation = useFormik({
		enableReinitialize: true,

		initialValues: {
			id: id || "",
			title: project ? project.title : "",
			content: project ? project.content : "",
			category_id: project ? project.category_id : "",
			websiteLink: project ? project.websiteLink : "",
			facebookLink: project ? project.facebookLink : "",
			instagramLink: project ? project.instagramLink : "",
			telegramLink: project ? project.telegramLink : "",
			ordering: project ? project.ordering : 0,
			inProgress: project ? (project.inProgress === 1 ? true : false) : true,
			isActive: project ? (project.isActive == 1 ? true : false) : true,
			isDisplayHomepage: project ? (project.isDisplayHomepage === 1 ? true : false) : false,
			image: project ? project.image : "",
		},
		validationSchema: Yup.object({
			title: Yup.string().required("Please Enter Title"),
		}),
		onSubmit: (values) => {
			values.category_id = campaignCategory ? campaignCategory.value : null;
			values.fromDate = fromDate;
			values.toDate = toDate;
			values.content = contentDesc;
			values.image = file?.length > 0 ? file[0]?.serverId : "";
			dispatch(createProject(values, props.router.navigate));
		},
	});

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="Project Menu" pageTitle="Dashboard" pageLink="/project-menu" />
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
												<Link className="btn btn-outline-dark" to="/project-menu">
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
							projectValidation.handleSubmit();
							return false;
						}}
						action="#"
					>
						<Row>
							<Col lg={8}>
								<Card>
									<CardBody>
										<Row>
											<Col lg={12}>
												<div className="mb-3">
													<Label className="form-label" htmlFor="project-title-input">
														Project Title <small className="text-danger">(Required)</small>
													</Label>
													<Input
														type="text"
														className="form-control"
														id="project-title-input"
														placeholder="Enter project title"
														name="title"
														onChange={projectValidation.handleChange}
														onBlur={projectValidation.handleBlur}
														value={projectValidation.values.title || ""}
														invalid={projectValidation.touched.title && projectValidation.errors.title ? true : false}
													/>
													{projectValidation.touched.title && projectValidation.errors.title ? (
														<FormFeedback type="invalid">{projectValidation.errors.title}</FormFeedback>
													) : null}
												</div>
											</Col>
											<Col lg={12}>
												<div className="mb-3">
													<Label htmlFor="select-campaign-categories" className="form-label">
														Campaign Category
													</Label>
													<Select
														isClearable={true}
														value={campaignCategory}
														onChange={handleSelect}
														options={campaignCategories.map((el) => ({ value: el.id, label: el.name }))}
													/>
												</div>
											</Col>
											<Col lg={12}>
												<div className="form-check form-switch form-switch-md mb-3" dir="ltr">
													<Input
														type="checkbox"
														className="form-check-input"
														id="inProgress"
														name="inProgress"
														onChange={projectValidation.handleChange}
														onBlur={projectValidation.handleBlur}
														checked={projectValidation.values.inProgress}
													/>
													<Label className="form-check-label" for="inProgress">
														Progress: <span className="fw-bolder">{projectValidation.values.inProgress ? "In Progress" : "Completed"}</span>
													</Label>
												</div>
											</Col>
											<Col lg={12}>
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
																server={`${api.BASE_URL}/save-image/project`}
																className="filepond filepond-input-multiple"
																stylePanelLayout="compact"
															/>
														</div>
													</div>
												</div>
											</Col>
										</Row>
									</CardBody>
								</Card>
							</Col>
							<Col lg={4}>
								<Card>
									<CardHeader>
										<div className="fw-bold">Project's Link</div>
									</CardHeader>
									<CardBody>
										<div className="form-icon mb-3">
											<Input
												type="text"
												className="form-control form-control-icon"
												placeholder="Enter link"
												name="websiteLink"
												onChange={projectValidation.handleChange}
												onBlur={projectValidation.handleBlur}
												value={projectValidation.values.websiteLink || ""}
											/>
											<i className="ri-global-line"></i>
										</div>
										<div className="form-icon mb-3">
											<Input
												type="text"
												className="form-control form-control-icon"
												placeholder="Enter link"
												name="facebookLink"
												onChange={projectValidation.handleChange}
												onBlur={projectValidation.handleBlur}
												value={projectValidation.values.facebookLink || ""}
											/>
											<i className="ri-facebook-circle-line"></i>
										</div>
										<div className="form-icon mb-3">
											<Input
												type="text"
												className="form-control form-control-icon"
												placeholder="Enter link"
												name="instagramLink"
												onChange={projectValidation.handleChange}
												onBlur={projectValidation.handleBlur}
												value={projectValidation.values.instagramLink || ""}
											/>
											<i className="ri-instagram-line"></i>
										</div>
										<div className="form-icon mb-3">
											<Input
												type="text"
												className="form-control form-control-icon"
												placeholder="Enter link"
												name="telegramLink"
												onChange={projectValidation.handleChange}
												onBlur={projectValidation.handleBlur}
												value={projectValidation.values.telegramLink || ""}
											/>
											<i className="ri-telegram-line"></i>
										</div>
									</CardBody>
								</Card>
								<Card>
									<CardBody>
										<div className="mb-3">
											<Label className="form-label" htmlFor="project-ordering-input">
												Ordering
											</Label>
											<Input
												type="number"
												className="form-control"
												id="project-ordering-input"
												placeholder="Enter project ordering"
												name="ordering"
												onChange={projectValidation.handleChange}
												onBlur={projectValidation.handleBlur}
												value={projectValidation.values.ordering}
											/>
										</div>

										<div className="form-check form-switch form-switch-md" dir="ltr">
											<Input
												type="checkbox"
												className="form-check-input"
												id="isDisplayHomepage"
												name="isDisplayHomepage"
												onChange={projectValidation.handleChange}
												onBlur={projectValidation.handleBlur}
												checked={projectValidation.values.isDisplayHomepage}
											/>
											<Label className="form-check-label" for="isDisplayHomepage">
												Display Homepage: <span className="fw-bolder">{projectValidation.values.isDisplayHomepage ? "Show" : "Hide"}</span>
											</Label>
										</div>
										<div className="form-check form-switch form-switch-md mb-3" dir="ltr">
											<Input
												type="checkbox"
												className="form-check-input"
												id="isActive"
												name="isActive"
												onChange={projectValidation.handleChange}
												onBlur={projectValidation.handleBlur}
												checked={projectValidation.values.isActive}
											/>
											<Label className="form-check-label" for="isActive">
												Status: <span className="fw-bolder">{projectValidation.values.isActive ? "Active" : "In-Active"}</span>
											</Label>
										</div>
									</CardBody>
								</Card>
							</Col>
							<Col lg={12}>
								<div className="text-start mb-4">
									{useProjectSelect.isLoading ? (
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
											<i className="ri-save-3-line label-icon align-middle fs-16 me-2"></i> Save Project
										</Button>
									)}{" "}
									<Link className="btn btn-label btn-danger" to="/project-menu">
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

export default withRouter(ProjectForm);
