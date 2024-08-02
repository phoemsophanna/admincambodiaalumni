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
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Link, useParams } from "react-router-dom";

import * as Yup from "yup";
import { useFormik } from "formik";

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
import { createPerformance, fetchPerformanceDetail, resetPerformanceShowDetail } from "../../../store/actions";
import withRouter from "../../../Components/Common/withRouter";
import { api } from "../../../config";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const PerformanceForm = (props) => {
	const { id } = useParams();
	document.title = `How It Work: ${id ? "Edit" : "create"} | Admin & Dashboards`;
	const dispatch = useDispatch();
	const [file, setFile] = useState([]);
	const [titleTap, settitleTap] = useState("ENG");
	const titleTapToggle = (tab) => {
		if (titleTap !== tab) {
			settitleTap(tab);
		}
	};

	const createPerformanceSelector = createSelector(
		(state) => state.CreatePerformanceReducer,
		(layout) => layout
	);
	const usePerformanceSelect = useSelector(createPerformanceSelector);
	const createPerformanceDetailSelector = createSelector(
		(state) => state.PerformanceDetailReducer,
		(layout) => ({
			performance: layout.performance,
			isLoading: layout.isLoading,
		})
	);
	const { performance, isLoading } = useSelector(createPerformanceDetailSelector);

	useEffect(() => {
		if (id) dispatch(fetchPerformanceDetail(id));

		return () => {
			dispatch(resetPerformanceShowDetail());
		};
	}, [id, dispatch]);

	useEffect(() => {
		if (performance) {
			if (performance.image) {
				setFile([
					{
						source: performance.image,
						options: {
							type: "local",
						},
					},
				]);
			} else {
				setFile([]);
			}
		}
	}, [performance]);

	const performanceValidation = useFormik({
		enableReinitialize: true,

		initialValues: {
			id: id || "",
			title: performance ? performance.title : "",
			titleKh: performance ? performance.titleKh : "",
			description: performance ? performance.description : "",
			descriptionKh: performance ? performance.descriptionKh : "",
			ordering: performance ? performance.ordering : 0,
			isActive: performance ? (performance.isActive === 1 ? true : false) : true,
			image: performance ? performance.image : "",
		},
		validationSchema: Yup.object({
			title: Yup.string().required("Please Enter Title"),
		}),
		onSubmit: (values) => {
			values.image = file?.length > 0 ? file[0]?.serverId : "";
			dispatch(createPerformance(values, props.router.navigate));
		},
	});

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="How It Work" pageTitle="Dashboard" pageLink="/how-it-work" />
					<Row>
						<Col lg={12}>
							<Card>
								<CardHeader>
									<Row className="justify-content-between align-items-center gy-3">
										<Col lg={3}>
											<h5 className="mt-2">{id ? "Edit" : "Create"} Form</h5>
										</Col>
										<Col className="col-lg-auto">
											<div className="d-md-flex text-nowrap gap-2">
												<Link className="btn btn-outline-dark" to="/how-it-work">
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
							performanceValidation.handleSubmit();
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
													<Label className="form-label" htmlFor="performance-title-input">
														Title <small className="text-danger">(Required)</small>
													</Label>
													<Input
														type="text"
														className="form-control"
														id="performance-title-input"
														placeholder="Enter title"
														name="title"
														onChange={performanceValidation.handleChange}
														onBlur={performanceValidation.handleBlur}
														value={performanceValidation.values.title}
														invalid={performanceValidation.touched.title && performanceValidation.errors.title ? true : false}
													/>
													{performanceValidation.touched.title && performanceValidation.errors.title ? (
														<FormFeedback type="invalid">{performanceValidation.errors.title}</FormFeedback>
													) : null}
												</div>
												<div className="mb-3">
													<Label className="form-label" htmlFor="description-input">
														Description
													</Label>
													<textarea
														className="form-control"
														id="description-input"
														rows="3"
														placeholder="Enter description"
														name="description"
														onChange={performanceValidation.handleChange}
														onBlur={performanceValidation.handleBlur}
														value={performanceValidation.values.description}
													></textarea>
												</div>
											</TabPane>
											<TabPane tabId="KHM" id="khm">
												<div className="mb-3">
													<Label className="form-label" htmlFor="performance-titleKh-input">
														Title <small className="text-danger">(Required)</small>
													</Label>
													<Input
														type="text"
														className="form-control"
														id="performance-titleKh-input"
														placeholder="Enter title"
														name="titleKh"
														onChange={performanceValidation.handleChange}
														onBlur={performanceValidation.handleBlur}
														value={performanceValidation.values.titleKh}
														invalid={performanceValidation.touched.titleKh && performanceValidation.errors.titleKh ? true : false}
													/>
													{performanceValidation.touched.titleKh && performanceValidation.errors.titleKh ? (
														<FormFeedback type="invalid">{performanceValidation.errors.titleKh}</FormFeedback>
													) : null}
												</div>
												<div className="mb-3">
													<Label className="form-label" htmlFor="descriptionKh-input">
														Description
													</Label>
													<textarea
														className="form-control"
														id="descriptionKh-input"
														rows="3"
														placeholder="Enter descriptionKh"
														name="descriptionKh"
														onChange={performanceValidation.handleChange}
														onBlur={performanceValidation.handleBlur}
														value={performanceValidation.values.descriptionKh}
													></textarea>
												</div>
											</TabPane>
										</TabContent>

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
														server={`${api.BASE_URL}/save-image/performance`}
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
								<Card>
									<CardBody>
										<div className="mb-3">
											<Label className="form-label" htmlFor="performance-ordering-input">
												Ordering
											</Label>
											<Input
												type="number"
												className="form-control"
												id="performance-ordering-input"
												placeholder="Enter performance ordering"
												name="ordering"
												onChange={performanceValidation.handleChange}
												onBlur={performanceValidation.handleBlur}
												value={performanceValidation.values.ordering}
											/>
										</div>
									</CardBody>
								</Card>
								<Card>
									<CardHeader>
										<div className="fw-bold">Published</div>
									</CardHeader>
									<CardBody>
										<div className="form-check form-switch form-switch-md mb-3" dir="ltr">
											<Input
												type="checkbox"
												className="form-check-input"
												id="isActive"
												name="isActive"
												onChange={performanceValidation.handleChange}
												onBlur={performanceValidation.handleBlur}
												checked={performanceValidation.values.isActive}
											/>
											<Label className="form-check-label" for="isActive">
												Status: <span className="fw-bolder">{performanceValidation.values.isActive ? "Active" : "In-Active"}</span>
											</Label>
										</div>
									</CardBody>
								</Card>
							</Col>
							<Col lg={12}>
								<div className="text-start mb-4">
									{usePerformanceSelect.isLoading ? (
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
									<Link className="btn btn-label btn-danger" to="/how-it-work">
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

export default withRouter(PerformanceForm);
