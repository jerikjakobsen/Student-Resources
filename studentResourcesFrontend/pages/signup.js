import {Formik,Form, ErrorMessage} from 'formik'
import axios from "axios"
import * as yup from "yup"
const signupSchema = yup.object().shape({
    username: yup.string()
    .min(3, "Must be longer than 3 characters")
    .max(20, "Must be shorter than 20 characters")
    .required("Required"),
    email: yup.string().email("Invalid Email").required("Required"),
    password: yup.string()
    .min(6, "Must be longer than 6 characters")
    .max(30, "Must be shorter than 30 characters")
    .matches(new RegExp("[a-z]"), {message: "Must contain a lowercase character"})
    .matches(new RegExp("[A-Z]"),{message: "Must contain an uppercase character"})
    .matches(new RegExp("[0-9]"),{message: "Must contain a digit"})
    .required("Required"),
    confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match').required("Required")
})

//Do validation
class signup extends React.Component {

    submit = (data, {setSubmitting}) => {
        setSubmitting(true);
        axios.post("/createUser", {
            username: data.username,
            email: data.email,
            password: data.password,
            schoolID: ""
        })
        .then(res => {
            console.log(res)
            setSubmitting(false)
        })
        .catch(err => {
            console.log(err)
            setSubmitting(false)
        })
    }
    
    render() {
        return (
            <div className= "mainBody">
                    <div className="createAccountMain">
                        <h1 style={{position: "absolute",top: "1rem", fontSize: "35px" }}>Create an Account</h1>
                        <div className="container">
                        <Formik 
                        initialValues = {{email: "", password: "", username: "", confirmPassword: ""}} 
                        validationSchema={signupSchema}
                        onSubmit={this.submit}
                        >
                            {({values, handleChange, handleBlur, isSubmitting, errors}) => (
                                <Form >
                                    <div className="fields">
                                        <label htmlFor="username">Username</label>
                                        <input id="username" name="username" type="text" value={values.username} onChange={handleChange} onBlur={handleBlur} />
                            {errors.username ? <div className="error">{errors.username}</div> : null}
                                    </div>
                                    <div className="fields">
                                        <label>Email</label>
                                        <input name="email" type="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
                                        {errors.email ? <div className="error">{errors.email}</div> : null}
                                    </div>
                                    <div className="fields">
                                        <label>Password</label>
                                        <input name="password" type="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
                                        {errors.password ? <div className="error">{errors.password}</div> : null}

                                    </div>
                                    <div className="fields">
                                        <label>Confirm Password</label>
                                        <input name="confirmPassword" type="password" value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} />
                                        {errors.confirmPassword ? <div className="error">{errors.confirmPassword}</div> : null}

                                    </div>
                                    <div className="buttonContainer">
                                        <button disabled={isSubmitting} type="submit">Sign Up</button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                        </div>
                    </div>
            <style jsx>{`
                .createAccountMain {
                    width: 60%;
                    height: 100%;
                    margin: 5rem 0 auto 0;
                    background: blue;
                    margin-bottom: 25px;
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    align-items: center;
                    border-radius: 10px;
                    background: rgb(201, 222, 255);
                    -webkit-box-shadow: 1px 0px 14px 3px rgba(0,0,0,0.75);
                    -moz-box-shadow: 1px 0px 14px 3px rgba(0,0,0,0.75);
                    box-shadow: 1px 0px 14px 3px rgba(0,0,0,0.75);
                }
                .mainBody {
                    height: 40rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .container {
                    margin: auto 0 auto 0;
                    padding-top: 35px
                }
                input {
                    align-self: flex-start;
                    border-color: rgba(256,256,256, 0);
                    background-color: rgba(256,256,256, 0);
                    border-bottom: 1px solid black;
                    transition: border-bottom .3s;
                    width: 20rem;
                    font-size: 18px;
                }
                input:focus {
                    outline: none;
                    border-bottom: 1px solid white;
                }
                label {
                    align-self: flex-start;
                    font-size: 25px;
                    display: inline-block;
                    margin-bottom: 16px
                }
                .fields {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin: 0 0 1rem 0;
                    position: relative;
                }
                .buttonContainer {
                    display: flex;
                    align-items: center;
                    justify-content: center
                }
                button {
                    border: 1px solid rgba(0,0,0, 1);
                    border-radius: 10px;
                    background-color: rgba(0,0,0,0);
                    width: 40%;
                    height: 2rem;
                    -webkit-box-shadow: 0px 0px 1px 1px rgba(0,0,0,0.75);
                    -moz-box-shadow: 0px 0px 1px 1px rgba(0,0,0,0.75);
                    box-shadow: 0px 0px 1px 1px rgba(0,0,0,0.75);
                }
                button:active {
                    outline: none;
                    background-color: rgb(182, 205, 242);
                    -webkit-box-shadow: inset 0px 0px 1px 1px rgba(0,0,0,0.75);
                    -moz-box-shadow: inset 0px 0px 1px 1px rgba(0,0,0,0.75);
                    box-shadow: inset 0px 0px 1px 1px rgba(0,0,0,0.75);
                }
                button:hover {
                    cursor: pointer
                }
                button:focus {
                    outline:none
                }
                .error {
                    position: absolute;
                    display: flex;
                    left: 100%
                }
            `}</style>
            </div>
        )
    }
}

export default signup