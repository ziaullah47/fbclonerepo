import React, { FormEvent, useContext, useState } from "react"
import { Form, Input, Button, Modal, ModalHeader, ModalBody, Row, Col, FormGroup, Label } from "reactstrap";
import { ACCESS_TOKEN_COOKIE_NAME, COOKIE_PATH } from "../common/Constants";
import { AlertVariant, ILoginRequest, ISignUpRequest } from "../common/types";
import { axiosErrorParser } from "../common/utils/ErrorParser";
import {AlertContext} from "../contexts/AlertContext";
import { AuthContext } from "../contexts/AuthContext";
import AuthService from "../services/AuthService";
import CookieService from "../services/CookieService";
import FlashAlert from "./FlashAlert";

interface IRegisterForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    day: number;
    month: string;
    year: number;
    gender: string;
}

const LoginAndRegistration: React.FunctionComponent = () => {

    const authService = new AuthService();
    const cookieService = new CookieService();
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    
    const TODAY = new Date();
    const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    
    const [modal, setModal] = useState<boolean>(false);
    const initialRegFormState = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        day: TODAY.getDate(),
        month: MONTHS[TODAY.getMonth()],
        year: TODAY.getFullYear(),
        gender: ""
    }
    const initialLogInFormState = {
        email: "",
        password: ""
    }
    const [registerForm, setRegisterForm] = useState<IRegisterForm>(initialRegFormState);
    const [loginForm, setLoginForm] = useState<ILoginRequest>(initialLogInFormState);

    const [regErrors, setRegErrors] = useState<string[]>([]);
    const [loginErrors, setLoginErrors] = useState<string[]>([]);

    const toggle = () => setModal(!modal);

    const getYears = () => {
        var d = TODAY.getFullYear();
        var years = [];
        for (var i = d; i >= d - 116; i--) {
            years.push(<option key={i}>{i}</option>);
        }
        return years;
    }
    const getMonths = () => {
        var m = [];
        for (var i = 0; i < MONTHS.length; i++) {
            m.push(<option key={i}>{MONTHS[i]}</option>)
        }
        return m;
    }
    const getDays = () => {
        var days = [];
        for (var i = 1; i <= 31; i++) {
            days.push(<option key={i}>{i}</option>)
        }
        return days;
    }

    const loginOnSubmit = (e: FormEvent) => {
        e.preventDefault();
        authService.logIn(loginForm).then(resp => {

            var date = new Date();
            var expiresIn = new Date(date.getTime() + resp.data.expiresIn);
            cookieService.set(ACCESS_TOKEN_COOKIE_NAME, resp.data.accessToken, {
                path: COOKIE_PATH,
                expires: expiresIn
            })
            authContext.login();

        }).catch(err => {
            setLoginErrors(axiosErrorParser(err));
        });
    }

    const registerOnSubmit = (e: FormEvent) => {
        e.preventDefault();
        var bd = new Date(registerForm.day, MONTHS.indexOf(registerForm.month), registerForm.year);
        var data: ISignUpRequest = { ...registerForm, birthday: bd };

        authService.signup(data).then(resp => {
            setRegisterForm(initialRegFormState);
            toggle();
            alertContext.show("Login with new credentials.");
        }).catch(err => {
            setRegErrors(axiosErrorParser(err));
        })
    }

    return (
        <div className="home-wrapper">
            <div className="home-content">
                <div className="left-content">
                    <h1 className="text-primary">Facebook</h1>
                    <p>Connect with friends and the world around you on Facebook.</p>
                </div>
                <div className="right-content">
                    <div className="signin-signup">
                        <div className="sign-in-form">
                            <Form onSubmit={loginOnSubmit}>
                                {loginErrors.length ? <FlashAlert variant={AlertVariant.DANGER} errors={loginErrors} /> : null}
                                <Input type="email" className="mb-2" placeholder="Email" onChange={e => setLoginForm({ ...loginForm, email: e.target.value })} />
                                <Input type="password" className="mb-2" placeholder="Password" onChange={e => setLoginForm({ ...loginForm, password: e.target.value })} />
                                <Button type="submit" className="mb-2" size="lg" color="primary" block>Log In</Button>
                            </Form>
                            <a href="/">Forgot Password?</a>
                        </div>
                        <div className="dropdown-divider py-2"></div>
                        <div className="d-flex justify-content-center">
                            <button type="button"
                                className="sign-up-btn btn btn-success btn-lg"
                                onClick={toggle}>
                                Create New Account
                            </button>
                        </div>
                    </div>
                    <p>Create a Page for a celebrity, band or business.</p>
                </div>

                {/* Modal */}

                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>
                        <div>Sign Up <br /> <small className="text-secondary">It's quick and easy</small></div>
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={registerOnSubmit}>

                            {regErrors.length ? <FlashAlert variant={AlertVariant.DANGER} errors={regErrors} /> : null}

                            <Row form className="mb-2">
                                <Col md={6}>
                                    <Input type="text" placeholder="First Name" onChange={e => setRegisterForm({ ...registerForm, firstName: e.target.value })} />
                                </Col>
                                <Col md={6}>
                                    <Input type="text" placeholder="Last Name" required onChange={e => setRegisterForm({ ...registerForm, lastName: e.target.value })} />
                                </Col>
                            </Row>
                            <Row form className="mb-2">
                                <Col>
                                    <Input type="email" placeholder="Email or Phone Number" required onChange={e => setRegisterForm({ ...registerForm, email: e.target.value })} />
                                </Col>
                            </Row>
                            <Row form className="mb-2">
                                <Col>
                                    <Input type="password" placeholder="New Password" required onChange={e => setRegisterForm({ ...registerForm, password: e.target.value })} />
                                </Col>
                            </Row>
                            <FormGroup>
                                <label>Birthday</label>
                                <Row form className="mb-2">
                                    <Col md={4}>
                                        <Input type="select" name="select" value={registerForm.month} required onChange={e => setRegisterForm({ ...registerForm, month: e.target.value })}>
                                            {getMonths()}
                                        </Input>
                                    </Col>
                                    <Col md={4}>
                                        <Input type="select" value={registerForm.day} required onChange={e => setRegisterForm({ ...registerForm, day: +e.target.value })}>
                                            {getDays()}
                                        </Input>
                                    </Col>
                                    <Col md={4}>
                                        <Input type="select" value={registerForm.year} required min={TODAY.getFullYear() - 10} onChange={e => setRegisterForm({ ...registerForm, year: +e.target.value })}>
                                            {getYears()}
                                        </Input>
                                    </Col>
                                </Row>
                            </FormGroup>

                            <FormGroup>
                                <label>Gender</label>
                                <Row form className="mb-2">
                                    <Col md={6}>
                                        <FormGroup check className="gender d-flex justify-content-center">
                                            <Label check>
                                                Male {' '}<Input type="radio" name="gender" className="gender-radio" required onChange={e => setRegisterForm({ ...registerForm, gender: "Male" })} />
                                            </Label>
                                        </FormGroup>
                                    </Col>

                                    <Col md={6}>
                                        <FormGroup check className="gender d-flex justify-content-center">
                                            <Label check>
                                                <span>Female</span> <Input type="radio" name="gender" className="gender-radio" required onChange={e => setRegisterForm({ ...registerForm, firstName: "Female" })} />
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </FormGroup>

                            <small>
                                By clicking Sign Up, you agree to our Terms. Learn how we collect, use and share your data in our Data Policy and how we use cookies and similar technology in our Cookies Policy. You may receive SMS Notifications from us and can opt out any time.
                            </small>
                            <div className="d-flex justify-content-center">
                                <Button type="submit" color="success" size="lg">Sign Up</Button>
                            </div>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
            <footer className="home-footer">
                <a href="/">English (US)</a>
                <a href="/">English (US)</a>
                <a href="/">English (US)</a>
                <a href="/">English (US)</a>
                <a href="/">English (US)</a>
                <a href="/">English (US)</a>
                <a href="/">English (US)</a>
                <a href="/">English (US)</a>
                <a href="/">English (US)</a>
                <a href="/">English (US)</a>
                <a href="/">English (US)</a>
                <a href="/">English (US)</a>
                <a href="/">English (US)</a>
                <a href="/">English (US)</a>
                <a href="/">English (US)</a>
                <a href="/">English (US)</a>
                <a href="/">English (US)</a>
                <a href="/">English (US)</a>
                <a href="/">English (US)</a>
                <a href="/">English (US)</a>
                <a href="/">English (US)</a>
                <a href="/">English (US)</a>
                <a href="/">English (US)</a>
                <a href="/">English (US)</a>
                <a href="/">English (US)</a>
                <a href="/">English (US)</a>
                <a href="/">English (US)</a>
                <a href="/">English (US)</a>
                <a href="/">English (US)</a>
                <a href="/">English (US)</a>
                <a href="/">English (US)</a>
                <a href="/">English (US)</a>
                <a href="/">English (US)</a>
                <a href="/">English (US)</a>
                <a href="/">English (US)</a>
                <a href="/">English (US)</a>
                <a href="/">English (US)</a>
                <a href="/">English (US)</a>
                <a href="/">English (US)</a>
            </footer>
        </div>
    );
}
export default LoginAndRegistration;