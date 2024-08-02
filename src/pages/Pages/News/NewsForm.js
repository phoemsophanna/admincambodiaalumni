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
	TabPane,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Link, useParams } from "react-router-dom";
import TinymceEditor from "../../../Components/Common/TinymceEditor";

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
import { createNews, fetchNewsDetail, resetNewsShowDetail } from "../../../store/actions";
import withRouter from "../../../Components/Common/withRouter";
import { api } from "../../../config";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const NewsForm = (props) => {
	const { id } = useParams();
	document.title = `Article: ${id ? "Edit" : "create"} | Admin & Dashboards`;
	const dispatch = useDispatch();
	const [titleTap, settitleTap] = useState("ENG");
	const titleTapToggle = (tab) => {
		if (titleTap !== tab) {
			settitleTap(tab);
		}
	};
	const [file, setFile] = useState([]);
	const [contentDesc, setContentDesc] = useState("");
	const [contentDescKh, setContentDescKh] = useState("");

	const createNewsSelector = createSelector(
		(state) => state.CreateNewsReducer,
		(layout) => layout
	);
	const useNewsSelect = useSelector(createNewsSelector);
	const createNewsDetailSelector = createSelector(
		(state) => state.NewsDetailReducer,
		(layout) => ({
			news: layout.news,
			isLoading: layout.isLoading,
		})
	);
	const { news, isLoading } = useSelector(createNewsDetailSelector);

	const handleEditorChange = (e) => {
		setContentDesc(e.target.getContent());
	};
	const handleEditorChangeKh = (e) => {
		setContentDescKh(e.target.getContent());
	};

	useEffect(() => {
		if (id) dispatch(fetchNewsDetail(id));

		return () => {
			dispatch(resetNewsShowDetail());
		};
	}, [id, dispatch]);

	useEffect(() => {
		if (news) {
			setContentDesc(news.content);
			if (news.image) {
				setFile([
					{
						source: news.image,
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
	}, [news]);

	const newsValidation = useFormik({
		enableReinitialize: true,

		initialValues: {
			id: id || "",
			title: news ? news.title : "",
			titleKh: news ? news.titleKh : "",
			summary: news ? news.summary : "",
			summaryKh: news ? news.summaryKh : "",
			content: news ? news.content : "",
			contentKh: news ? news.contentKh : "",
			type: news ? news.type : "",
			ordering: news ? news.ordering : 0,
			isActive: news ? (news.isActive === 1 ? true : false) : true,
			isDisplayHomepage: news ? (news.isDisplayHomepage === 1 ? true : false) : false,
			image: news ? news.image : "",
		},
		validationSchema: Yup.object({
			title: Yup.string().required("Please Enter Title"),
		}),
		onSubmit: (values) => {
			values.content = contentDesc;
			values.contentKh = contentDescKh;
			values.image = file?.length > 0 ? file[0]?.serverId : "";
			dispatch(createNews(values, props.router.navigate));
		},
	});

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="News & Event" pageTitle="Dashboard" pageLink="/news-menu" />
					<Row>
						<Col lg={12}>
							<Card>
								<CardHeader>
									<Row className="justify-content-between align-items-center gy-3">
										<Col lg={3}>
											<h5 className="mt-2">{id ? "Edit" : "Create"} Article</h5>
										</Col>
										<Col className="col-lg-auto">
											<div className="d-md-flex text-nowrap gap-2">
												<Link className="btn btn-outline-dark" to="/news-menu">
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
							newsValidation.handleSubmit();
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
														News Title <small className="text-danger">(Required)</small>
													</Label>
													<Input
														type="text"
														className="form-control"
														id="news-title-input"
														placeholder="Enter news title"
														name="title"
														onChange={newsValidation.handleChange}
														onBlur={newsValidation.handleBlur}
														value={newsValidation.values.title}
														invalid={newsValidation.touched.title && newsValidation.errors.title ? true : false}
													/>
													{newsValidation.touched.title && newsValidation.errors.title ? (
														<FormFeedback type="invalid">{newsValidation.errors.title}</FormFeedback>
													) : null}
												</div>
												<div className="mb-3">
													<Label className="form-label" htmlFor="summary-input">
														Summary
													</Label>
													<textarea
														className="form-control"
														id="summary-input"
														rows="3"
														placeholder="Enter summary"
														name="summary"
														onChange={newsValidation.handleChange}
														onBlur={newsValidation.handleBlur}
														value={newsValidation.values.summary}
													></textarea>
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
														onChange={newsValidation.handleChange}
														onBlur={newsValidation.handleBlur}
														value={newsValidation.values.titleKh}
														invalid={newsValidation.touched.titleKh && newsValidation.errors.titleKh ? true : false}
													/>
													{newsValidation.touched.titleKh && newsValidation.errors.titleKh ? (
														<FormFeedback type="invalid">{newsValidation.errors.titleKh}</FormFeedback>
													) : null}
												</div>
												<div className="mb-3">
													<Label className="form-label" htmlFor="summaryKh-input">
														អត្ថបទសង្ខេប
													</Label>
													<textarea
														className="form-control"
														id="summaryKh-input"
														rows="3"
														placeholder="បញ្ចូលអត្ថបទសង្ខេប"
														name="summaryKh"
														onChange={newsValidation.handleChange}
														onBlur={newsValidation.handleBlur}
														value={newsValidation.values.summaryKh}
													></textarea>
												</div>
												<div className="mb-3">
													<Label>Content</Label>
													<TinymceEditor onUploadImage={handleEditorChangeKh} initDataValue={contentDescKh} />
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
														server={`${api.BASE_URL}/save-image/news`}
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
										<FormGroup className="mb-3">
											<Label for="select-news-type">Select Type</Label>
											<Input
												className="form-select p-2"
												id="select-news-type"
												name="type"
												type="select"
												onChange={newsValidation.handleChange}
												value={newsValidation.values.type}
											>
												<option value="NEWS" selected>
													NEWS
												</option>
												<option value="EVENT">EVENT</option>
											</Input>
										</FormGroup>
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
												onChange={newsValidation.handleChange}
												onBlur={newsValidation.handleBlur}
												value={newsValidation.values.ordering}
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
												onChange={newsValidation.handleChange}
												onBlur={newsValidation.handleBlur}
												checked={newsValidation.values.isActive}
											/>
											<Label className="form-check-label" for="isActive">
												Status: <span className="fw-bolder">{newsValidation.values.isActive ? "Active" : "In-Active"}</span>
											</Label>
										</div>
										<div className="form-check form-switch form-switch-md" dir="ltr">
											<Input
												type="checkbox"
												className="form-check-input"
												id="isDisplayHomepage"
												name="isDisplayHomepage"
												onChange={newsValidation.handleChange}
												onBlur={newsValidation.handleBlur}
												checked={newsValidation.values.isDisplayHomepage}
											/>
											<Label className="form-check-label" for="isDisplayHomepage">
												Display Homepage: <span className="fw-bolder">{newsValidation.values.isDisplayHomepage ? "Show" : "Hide"}</span>
											</Label>
										</div>
									</CardBody>
								</Card>
							</Col>
							<Col lg={12}>
								<div className="text-start mb-4">
									{useNewsSelect.isLoading ? (
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
									<Link className="btn btn-label btn-danger" to="/news-menu">
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

export default withRouter(NewsForm);
