import React from "react";
import {
	Badge,
	Button,
	Card,
	CardBody,
	CardHeader,
	Col,
	Container,
	Form,
	FormFeedback,
	Input,
	Label,
	Modal,
	ModalBody,
	ModalHeader,
	Row,
	Spinner,
	FormGroup
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableList from "./TableList";
import { useState } from "react";
import Select from "react-select";
import withRouter from "../../../Components/Common/withRouter";
import logoImage from "../../../assets/images/history.png";
import logoImage2 from "../../../assets/images/application.png";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
	createMemberInformation,
	fetchMemberInformationDetail,
	resetMemberInformationShowDetail,
} from "../../../store/actions";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import { createSelector } from "reselect";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../../config";
import { locations } from "../../../common/data";
import { languages } from "prismjs";
import { useReactToPrint } from "react-to-print";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const MemberDetail = (props) => {
	const { id } = useParams();
	document.title = "Member Detail | Admin & Dashboards";
	const dispatch = useDispatch();
	const [address, setAddress] = useState({});
	const [placeBirth, setPlaceBirth] = useState({});
	const [dayDo, setDayDo] = useState({});

	const createMemberInformationDetailSelector = createSelector(
		(state) => state.MemberInformationDetailReducer,
		(layout) => ({
			memberInformation: layout.memberInformation,
			isLoading: layout.isLoading
		})
	);

	const componentRef = React.useRef(null);

	const handleAfterPrint = React.useCallback(() => {
		console.log("`onAfterPrint` called");
	}, []);

	const handleBeforePrint = React.useCallback(() => {
		console.log("`onBeforePrint` called");
		return Promise.resolve();
	}, []);

	const printFn = useReactToPrint({
		contentRef: componentRef,
		documentTitle: "AwesomeFileName",
		pageStyle: `
			@page { margin: 0; }
		`,
		onAfterPrint: handleAfterPrint,
		onBeforePrint: handleBeforePrint,
	});

	const { memberInformation, isLoading } = useSelector(createMemberInformationDetailSelector);

	useEffect(() => {
		setPlaceBirth(JSON.parse(memberInformation?.member_information?.placeBirth ? memberInformation?.member_information?.placeBirth : "{}"));
		setAddress(JSON.parse(memberInformation?.member_information?.city ? memberInformation?.member_information?.city : "{}"));
		setDayDo(JSON.parse(memberInformation?.member_information?.dayDo ? memberInformation?.member_information?.dayDo : "{}"));
	}, [memberInformation])

	useEffect(() => {
		dispatch(fetchMemberInformationDetail(id));
		return () => {
			dispatch(resetMemberInformationShowDetail());
		};
	}, [dispatch]);

	console.log(logoImage);

	return (
		<React.Fragment>
			<div className="page-content member-information">
				<div className="container-fluid">
					<button className="btn btn-primary mb-3" onClick={printFn}>Print</button>
				</div>
				<div className="container-fluid" ref={componentRef}>
					{/* <BreadCrumb title="ប្រវត្តិរូបសង្ខេប" pageTitle="Dashboard" /> */}
					<div>
						<Row>
							<Col lg={12}>
								<Card>
									<CardHeader style={{borderBottom: "none"}}>
										<Row className="justify-content-between align-items-center gy-3">
											<Col lg={12}>
												<img style={{width: "100%"}} src={logoImage2} alt="icon" />
											</Col>
											<Col lg={12}>
												<ul style={{ listStyle: 'none', fontSize: '16px',paddingBottom: "200px",paddingLeft: "70px",paddingRight: "70px"}}>
													<li style={{fontFamily: "'Roboto','Siemreap'", marginBottom: "5px"}}>
														<span style={{marginRight: "30px"}}> </span> នាម និងគោត្តនាម៖ <span style={{padding: "0 30px"}}>{memberInformation?.member_information?.fullname}</span> 
														អក្សរឡាតាំង <span style={{padding: "0 20px"}}>{memberInformation?.member_information?.latinName}</span>
													</li>
													<li style={{fontFamily: "'Roboto','Siemreap'", marginBottom: "5px"}}>
														ភេទ <span style={{padding: "0 10px"}}>{memberInformation?.member_information?.gender ? (memberInformation?.member_information?.gender == "male" ? "ប្រុស" : "ស្រី") : "គ្មាន"}</span>
														អាយុ <span style={{padding: "0 10px"}}>{memberInformation?.member_information?.age}</span> ឆ្នាំ
														កាន់អត្តសញ្ញាណប័ណ្ណលេខ 
														<span style={{padding: "0 20px"}}>{memberInformation?.member_information?.identityNumber}</span>
														មានទីលំនៅបច្ចុប្បន្ន
													</li>
													<li style={{fontFamily: "'Roboto','Siemreap'", marginBottom: "5px"}}>
															ផ្ទះលេខ<span style={{padding: "0 20px"}}>{address?.houseNumber || "គ្មាន"}</span>
															ផ្លូវលេខ<span style={{padding: "0 20px"}}>{address?.streetNumber || "គ្មាន"}</span>
															ភូមិ<span style={{padding: "0 20px"}}>{address?.phum || "គ្មាន"}</span>
															ឃុំ/សង្កាត់<span style={{padding: "0 20px"}}>{address?.sangkat || "គ្មាន"}</span>
															ស្រុក/ខណ្ឌ
													</li>
													<li style={{fontFamily: "'Roboto','Siemreap'", marginBottom: "10px"}}>
															<span style={{padding: "0 30px 0 0"}}>{address?.khan || "គ្មាន"}</span>
															រាជធានី/ខេត្ត<span style={{padding: "0 20px"}}>{memberInformation?.member_information?.location || "គ្មាន"}</span>
													</li>
													<li style={{fontFamily: "'Roboto','Moul'", textAlign: "center", marginBottom: "10px"}}>
														សូមគោរពជូន
													</li>
													<li style={{fontFamily: "'Roboto','Moul'", textAlign: "center", marginBottom: "10px"}}>
														លោក ប្រធានសមាគមអតីតសិស្ស-និស្សិតនៅកម្ពុជា
													</li>
													<li style={{fontFamily: "'Roboto','Siemreap'", marginBottom: "5px"}}>
														<span style={{fontFamily: "'Roboto','Moul'"}}>កម្មវត្ថុ ៖ </span> សំណើរសុំចូលជាសមាជិករបស់សមាគមអតីតសិស្ស-និស្សិតនៅកម្ពុជា ។
													</li>
													<li style={{fontFamily: "'Roboto','Siemreap'", marginBottom: "5px", lineHeight: "2.3"}}>
														<span style={{marginRight: "33px"}}> </span> សេចក្ដីដូចបានជម្រាបជូនក្នុងកម្មវត្ថុខាងលើ ខ្ញុំបាទ/នាងខ្ញុំមានកិត្តិយស សូមគោរពជម្រាបជូន
														លោក <span style={{fontFamily: "'Roboto','Moul'"}}> ប្រធាន </span> 
														មេត្តាជ្រាបថា ៖ ខ្ញុំបាទ/នាងខ្ញុំមានសេចក្ដីរីករាយ
														និងស្រលាញ់ពេញចិត្តការងារសង្គមដោយចង់ចូលរួមជាមួយសមាគមនូវរាល់ការងារសង្គមទាំងអស់ ។ ខ្ញុំបាទ/នាងខ្ញុំ សូមសន្យាថា នឹងគោរពតាម
														លក្ខន្តិកៈ និងបទបញ្ជាផ្ទៃក្នុងរបស់សមាគម ព្រមទាំងសូមធានា និងអះអាងថា ខ្ញុំបាទ/នាងខ្ញុំពុំមានពិរុទ្ធភាព និង
														ជាប់ពាក់ព័ន្ធចលនាណាមួយប្រឆាំងនិងច្បាប់រដ្ឋឡើយ ។
													</li>
													<li style={{fontFamily: "'Roboto','Siemreap'", marginBottom: "5px", lineHeight: "2.3"}}>
														<span style={{marginRight: "33px"}}> </span> 
														អាស្រ័យដូចបានជម្រាបជូនខាងលើ សូមលោក <span style={{fontFamily: "'Roboto','Moul'"}}>ប្រធាន </span>
														មេត្តាពិនិត្យ និងសម្រេចឱ្យខ្ញុំបាទ/នាងខ្ញុំបានចូលជាសមាជិកសមាគម ដោយក្ដីអនុគ្រោះបំផុត ។
													</li>
													<li style={{fontFamily: "'Roboto','Siemreap'", marginBottom: "5px"}}>
														<span style={{marginRight: "33px"}}> </span> 
														សូមលោក<span style={{fontFamily: "'Roboto','Moul'"}}> ប្រធាន </span> 
														មេត្តាទទួលនូវការគោរពដ៏ស្មោះអំពីខ្ញុំបាទ/នាងខ្ញុំ ។
													</li>
												</ul>
												<div style={{position: "absolute",right: "15px",textAlign: "center",bottom: "80px"}}>
													<ul style={{ listStyle: 'none', fontSize: '16px'}}>
														<li style={{fontFamily: "'Roboto','Siemreap'", marginBottom: "5px"}}>
															ថ្ងៃ<span style={{padding: "0 10px"}}>{dayDo?.khmerDay || " "}</span>
															ខែ<span style={{padding: "0 10px"}}>{dayDo?.khmerMonth || " "}</span>
															ឆ្នាំ<span style={{padding: "0 10px"}}>{dayDo?.khmerYear || " "}</span>
															ព.ស<span style={{padding: "0 0px 0 10px"}}>{dayDo?.khmerYears || " "}</span>
														</li>
														<li style={{fontFamily: "'Roboto','Siemreap'", marginBottom: "5px"}}>
															ធ្វើនៅ<span style={{padding: "0 10px"}}>{dayDo?.placeDo || " "}</span>
															ថ្ងៃទី<span style={{padding: "0 10px"}}>{dayDo?.latinDay || " "}</span>
															ខែ<span style={{padding: "0 10px"}}>{dayDo?.latinMonth || " "}</span>
															ឆ្នាំ<span style={{padding: "0 10px 0px 10px"}}>{dayDo?.latinYear || " "}</span>
														</li>
														<li style={{fontFamily: "'Roboto','Siemreap'", marginBottom: "5px"}}>
															ហត្ថលេខាឬស្នាមមេដៃ និងឈ្មោះសាមីខ្លួន
														</li>
													</ul>
												</div>

												<div style={{position: "absolute",left: "80px",textAlign: "center",bottom: "40px"}}>
													<ul style={{ listStyle: 'none', fontSize: '16px'}}>
														<li style={{fontFamily: "'Roboto','Siemreap'", marginBottom: "5px"}}>
															បានឃើញ និងយល់ព្រម
														</li>
														<li style={{fontFamily: "'Roboto','Siemreap'", marginBottom: "5px"}}>
															រាជធានីភ្នំពេញ ថ្ងៃទី........ខែ........ឆ្នាំ.......
														</li>
														<li style={{fontFamily: "'Roboto','Moul'", marginBottom: "5px"}}>
															ប្រធានសមាគម
														</li>
													</ul>
												</div>
											</Col>
										</Row>
									</CardHeader>
								</Card>
							</Col>
						</Row>
					</div>
					<div>
						<Row>
							<Col lg={12}>
								<Card>
									<CardHeader style={{borderBottom: "none"}}>
										<Row className="justify-content-between align-items-center gy-3">
											<Col lg={12}>
												<img style={{width: "100%"}} src={logoImage} alt="icon" />
											</Col>
											<Col lg={12}>
												<ul style={{ listStyle: 'none', fontSize: '16px'}}>
													<li style={{fontFamily: "'Roboto','Siemreap'", marginBottom: "5px"}}>
														<span style={{marginRight: "10px"}}>១.</span> នាម និងគោត្តនាម៖ <span style={{padding: "0 30px"}}>{memberInformation?.member_information?.fullname}</span> ភេទ <span style={{padding: "0 20px"}}>{memberInformation?.member_information?.gender ? (memberInformation?.member_information?.gender == "male" ? "ប្រុស" : "ស្រី") : "គ្មាន"}</span>
														ជាអក្សរឡាតាំង <span style={{padding: "0 20px"}}>{memberInformation?.member_information?.latinName}</span>
													</li>
													<li style={{fontFamily: "'Roboto','Siemreap'", marginBottom: "5px"}}>
														<span style={{marginRight: "33px"}}> </span> ស្ថានភាពគ្រួសារ ៖ <span  style={{padding: "0 30px"}} className="custom-check">នៅលីវ 
															{
																memberInformation?.member_information?.marital == "single" ? (
																	<span className="active"></span>
																) : (
																	<span></span>
																)
															}
														</span>

														<span  style={{padding: "0 30px"}} className="custom-check">រៀបការរួច 
															{
																memberInformation?.member_information?.marital == "marry" ? (
																	<span className="active"></span>
																) : (
																	<span></span>
																)
															}
														</span>
													</li>
													<li style={{fontFamily: "'Roboto','Siemreap'", marginBottom: "5px"}}>
														<span style={{marginRight: "10px"}}>២.</span>  ថ្ងៃខែឆ្នាំកំណើត៖ <div style={{display: "inline-block"}} dangerouslySetInnerHTML={{ __html: memberInformation?.member_information?.datebirth }} />
													</li>
													<li style={{fontFamily: "'Roboto','Siemreap'", marginBottom: "5px"}}>
														<span style={{marginRight: "33px"}}> </span> កាន់អត្តសញ្ញាណប័ណ្ណលេខ 
															<span style={{padding: "0 20px"}}>{memberInformation?.member_information?.identityNumber}</span>
															<div style={{display: "inline-block"}} dangerouslySetInnerHTML={{ __html: memberInformation?.member_information?.dateIndenity }} />
													</li>
													<li style={{fontFamily: "'Roboto','Siemreap'", marginBottom: "5px"}}>
														<span style={{marginRight: "33px"}}> </span> ទីកន្លែងកំណើត៖
															ផ្ទះលេខ<span style={{padding: "0 20px"}}>{placeBirth?.birthHouseNumber || "គ្មាន"}</span>
															ផ្លូវលេខ<span style={{padding: "0 20px"}}>{placeBirth?.birthStreetNumber || "គ្មាន"}</span>
															ក្រុមទី<span style={{padding: "0 20px"}}>{placeBirth?.birthTeamNumber || "គ្មាន"}</span>
															ភូមិ<span style={{padding: "0 20px"}}>{placeBirth?.birthPhum || "គ្មាន"}</span>
													</li>
													<li style={{fontFamily: "'Roboto','Siemreap'", marginBottom: "5px"}}>
														<span style={{marginRight: "33px"}}> </span>
															ឃុំ/សង្កាត់<span style={{padding: "0 20px"}}>{placeBirth?.birthSangkat || "គ្មាន"}</span>
															ស្រុក/ខណ្ឌ<span style={{padding: "0 20px"}}>{placeBirth?.birthKhan || "គ្មាន"}</span>
															រាជធានី/ខេត្ត<span style={{padding: "0 20px"}}>{placeBirth?.birthCity || "គ្មាន"}</span>
													</li>
													<li style={{fontFamily: "'Roboto','Siemreap'", marginBottom: "5px"}}>
														<span style={{marginRight: "10px"}}>៣.</span> ឪពុកឈ្មោះ ៖  
														<span style={{padding: "0 30px"}}>{memberInformation?.member_information?.father?.fatherName || "គ្មាន"}</span>
														អាយុ<span style={{padding: "0 20px"}}>{memberInformation?.member_information?.father?.fatherAge || "គ្មាន"}</span>
														ឆ្នាំ មុខរបរ ៖ <span style={{padding: "0 30px"}}>{memberInformation?.member_information?.father?.fatherJob || "គ្មាន"}</span>
													</li>
													<li style={{fontFamily: "'Roboto','Siemreap'", marginBottom: "5px"}}>
														<span style={{marginRight: "33px"}}> </span> ម្ដាយឈ្មោះ ៖  
														<span style={{padding: "0 30px"}}>{memberInformation?.member_information?.mother?.motherName || "គ្មាន"}</span>
														អាយុ<span style={{padding: "0 20px"}}>{memberInformation?.member_information?.mother?.motherAge || "គ្មាន"}</span>
														ឆ្នាំ មុខរបរ ៖ <span style={{padding: "0 30px"}}>{memberInformation?.member_information?.mother?.motherJob || "គ្មាន"}</span>
													</li>
													<li style={{fontFamily: "'Roboto','Siemreap'", marginBottom: "5px"}}>
														<span style={{marginRight: "10px"}}>៤.</span> កំរិតនៃការអប់រំ ៖  
														<span style={{padding: "0 30px"}}>{memberInformation?.member_information?.education || "គ្មាន"}</span>
													</li>
													<li style={{fontFamily: "'Roboto','Siemreap'", marginBottom: "5px"}}>
														<span style={{marginRight: "10px"}}>៥.</span> ភាសាបរទេស ៖  
														<span style={{padding: "0 30px"}}>{memberInformation?.member_information?.languages || "គ្មាន"}</span>
													</li>
													<li style={{fontFamily: "'Roboto','Siemreap'", marginBottom: "5px"}}>
														<span style={{marginRight: "10px"}}>៦.</span>  ការងារ ឬតួនាទីបច្ចុប្បន្ន ៖
														<span style={{padding: "0 30px"}}>{memberInformation?.member_information?.job || "គ្មាន"}</span>
													</li>
													<li style={{fontFamily: "'Roboto','Siemreap'", marginBottom: "5px"}}>
														<span style={{marginRight: "10px"}}>៧.</span> អាសយដ្ឋានបច្ចុប្បន្ន៖
															ផ្ទះលេខ<span style={{padding: "0 20px"}}>{address?.houseNumber || "គ្មាន"}</span>
															ផ្លូវលេខ<span style={{padding: "0 20px"}}>{address?.streetNumber || "គ្មាន"}</span>
															ក្រុមទី<span style={{padding: "0 20px"}}>{address?.teamNumber || "គ្មាន"}</span>
															ភូមិ<span style={{padding: "0 20px"}}>{address?.phum || "គ្មាន"}</span>
													</li>
													<li style={{fontFamily: "'Roboto','Siemreap'", marginBottom: "5px"}}>
														<span style={{marginRight: "33px"}}> </span>
															ឃុំ/សង្កាត់<span style={{padding: "0 20px"}}>{address?.sangkat || "គ្មាន"}</span>
															ស្រុក/ខណ្ឌ<span style={{padding: "0 20px"}}>{address?.khan || "គ្មាន"}</span>
															រាជធានី/ខេត្ត<span style={{padding: "0 20px"}}>{memberInformation?.member_information?.location || "គ្មាន"}</span>
													</li>
													<li style={{fontFamily: "'Roboto','Siemreap'", marginBottom: "5px"}}>
														<span style={{marginRight: "33px"}}> </span> ទូរស័ព្ទលេខ ៖  
														<span style={{padding: "0 30px"}}>{memberInformation?.member_information?.phone || "គ្មាន"}</span>
													</li>
													<li style={{fontFamily: "'Roboto','Siemreap'", marginBottom: "5px"}}>
														<span style={{marginRight: "33px"}}> </span> Email:
														<span style={{padding: "0 30px"}}>{memberInformation?.email || "គ្មាន"}</span>
														Facebook:
														<span style={{padding: "0 30px"}}>{memberInformation?.member_information?.facebook || "គ្មាន"}</span>
													</li>
													<li style={{fontFamily: "'Roboto','Siemreap'", marginBottom: "5px"}}>
														<span style={{marginRight: "10px"}}>៨.</span> តើអ្នកបាននិងកំពុងចូលរួមសកម្មភាពបម្រើឲ្យចលនាណាមួយនៅក្រៅប្រទេស ឬក្នុងប្រទេស ដើម្បី
													</li>
													<li style={{fontFamily: "'Roboto','Siemreap'", marginBottom: "5px"}}>
														<span style={{marginRight: "33px"}}> </span> ប្រឆាំងនឹងមនុស្សជាតិដែរឫទេ?
														<span  style={{padding: "0 30px"}} className="custom-check">បានចូលរួម 
															{
																memberInformation?.member_information?.againstHumanity == "agree" ? (
																	<span className="active"></span>
																) : (
																	<span></span>
																)
															}
														</span>

														<span  style={{padding: "0 30px"}} className="custom-check">មិនបានចូលរួម 
															{
																memberInformation?.member_information?.againstHumanity == "disagree" ? (
																	<span className="active"></span>
																) : (
																	<span></span>
																)
															}
														</span>
													</li>
													<li style={{fontFamily: "'Roboto','Siemreap'", marginBottom: "5px"}}>
														<span style={{marginRight: "10px"}}>៩.</span>  ខ្ញុំបាទ/នាងខ្ញុំសុំធានា និងអះអាងថា មិនយកតួនាទីជាសមាជិក ឫសកម្មភាពសមាគម ទៅបម្រើផល ប្រយោជន៍ឲ្យ
													</li>
													<li style={{fontFamily: "'Roboto','Siemreap'", marginBottom: "5px"}}>
														<span style={{marginRight: "33px"}}> </span> គណបក្សនយោបាយណាមួយឡើយ ។
													</li>
													<li style={{fontFamily: "'Roboto','Siemreap'", marginBottom: "5px"}}>
														<span style={{marginRight: "33px"}}> </span> ខ្ញុំបាទ/នាងខ្ញុំ សូមធានា និងអះអាងថា អ្វីដែលបានរាបរាប់ខាងលើសុទ្ធតែជាការពិតទាំងអស់ បើសិន
														មានចំណុច
													</li>
													<li style={{fontFamily: "'Roboto','Siemreap'", marginBottom: "5px"}}>
														<span style={{marginRight: "33px"}}> </span> ណាមួយមិនពិត ខ្ញុំបាទ/នាងខ្ញុំសូមទទួលខុសត្រូវចំពោះមុខច្បាប់ជាធរមានដោយខ្លួនឯង ។
													</li>
												</ul>
												<div style={{position: "absolute",right: "15px",marginTop: "15px",textAlign: "center"}}>
													<ul style={{ listStyle: 'none', fontSize: '16px'}}>
														<li style={{fontFamily: "'Roboto','Siemreap'", marginBottom: "5px"}}>
															ថ្ងៃ<span style={{padding: "0 10px"}}>{dayDo?.khmerDay || " "}</span>
															ខែ<span style={{padding: "0 10px"}}>{dayDo?.khmerMonth || " "}</span>
															ឆ្នាំ<span style={{padding: "0 10px"}}>{dayDo?.khmerYear || " "}</span>
															ព.ស<span style={{padding: "0 0px 0 10px"}}>{dayDo?.khmerYears || " "}</span>
														</li>
														<li style={{fontFamily: "'Roboto','Siemreap'", marginBottom: "5px"}}>
															ធ្វើនៅ<span style={{padding: "0 10px"}}>{dayDo?.placeDo || " "}</span>
															ថ្ងៃទី<span style={{padding: "0 10px"}}>{dayDo?.latinDay || " "}</span>
															ខែ<span style={{padding: "0 10px"}}>{dayDo?.latinMonth || " "}</span>
															ឆ្នាំ<span style={{padding: "0 10px 0px 10px"}}>{dayDo?.latinYear || " "}</span>
														</li>
														<li style={{fontFamily: "'Roboto','Siemreap'", marginBottom: "5px"}}>
															ហត្ថលេខាឬស្នាមមេដៃ និងឈ្មោះសាមីខ្លួន
														</li>
													</ul>
												</div>
											</Col>
										</Row>
									</CardHeader>
								</Card>
							</Col>
						</Row>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default withRouter(MemberDetail);
