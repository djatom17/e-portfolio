import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

const AddExperience = props => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        facebook: '',
        linkedin: '',
        skills: '',
        introduce: '',
    })

    const {name, email, facebook, linkedin, skills, introduce} = formData;

    const handleChange = text => e => {
        setFormData({ ...formData, [text]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log("button clicked");
    };

    return (
        <div className={"login"}>
            <div className={"container"}>
                <div className={"row"}>
                    <div className="col-mid-8 m-auto">
                        <h1 className="display-4 text-center">Setup your profile page</h1>
                        <p className={"lead text-center"}>
                            Wellcome, tell us your basic info so we can set you up!
                        </p>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type={"text"}
                                    className={"form-control form-control-lg"}
                                    placeholder="Email"
                                    name={"email"}
                                    value={email}
                                    onChange={handleChange( 'email')}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type={"text"}
                                    className={"form-control form-control-lg"}
                                    placeholder="name"
                                    name={"name"}
                                    value={name}
                                    onChange={handleChange( 'name')}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type={"facebook"}
                                    className={"form-control form-control-lg"}
                                    placeholder="facebook"
                                    name={"facebook"}
                                    value={facebook}
                                    onChange={handleChange( 'facebook')}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type={"linkedin"}
                                    className={"form-control form-control-lg"}
                                    placeholder="linkedin"
                                    name={"linkedin"}
                                    value={linkedin}
                                    onChange={handleChange( 'linkedin')}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type={"skills"}
                                    className={"form-control form-control-lg"}
                                    placeholder="your area of experties e.g C, Java"
                                    name={"skills"}
                                    value={skills}
                                    onChange={handleChange( 'skills')}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type={"linkedin"}
                                    className={"form-control form-control-lg"}
                                    placeholder="write a short bio to introduce yourself"
                                    name={"introduce"}
                                    value={introduce}
                                    onChange={handleChange( 'introduce')}
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

export default AddExperience;
