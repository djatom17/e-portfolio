import React, {useState} from 'react';
import PropTypes from 'prop-types';

const Register = props => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })

    const { name, email, password, password2} = formData;

    const handleChange = text => e => {
        setFormData({ ...formData, [text]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log("button clicked");
        console.log(name, email, password);
    };

    return (
        <div className={"register"}>
            <div className={"container"}>
                <div className={"row"}>
                    <div className="col-mid-8 m-auto">
                        <h1 className="display-4 text-center">Sign Up</h1>
                        <p className={"lead text-center"}>
                            Create your EliteConnector account
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type={"text"}
                                    className={"form-control form-control-lg"}
                                    placeholder="User Name"
                                    name={"name"}
                                    value={name}
                                    onChange={handleChange( 'name')}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type={"email"}
                                    className={"form-control form-control-lg"}
                                    placeholder="Email"
                                    name={"email"}
                                    value={email}
                                    onChange={handleChange ('email')}
                                />
                                <small className="form-text text-muted">
                                    This site uses Gravatar so if you want a profile image,
                                    use a Gravatar email
                                </small>
                            </div>
                            <div className="form-group">
                                <input
                                    type={"password"}
                                    className={"form-control form-control-lg"}
                                    placeholder="Password"
                                    name={"password"}
                                    value={password}
                                    onChange={handleChange( 'password')}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type={"password"}
                                    className={"form-control form-control-lg"}
                                    placeholder="Confirm Password"
                                    name="password2"
                                    value={password2}
                                    onChange={handleChange( 'password2')}
                                />
                            </div>
                            <input
                                type="submit"
                                className="btn btn-info btn-block mt-4"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;