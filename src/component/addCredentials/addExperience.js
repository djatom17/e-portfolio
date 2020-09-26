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
        instagram: ''
    })

    const {name, email, facebook, linkedin, skills, introduce, instagram} = formData;

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
                            Hello, Lets get started! :)
                        </p>
                        <small className="d-block pb-3">
                            * = required fields
                        </small>
                        <form>
                            <div className="input-group mb-3 ">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">User</span>
                                </div>
                                <input type="text" className="form-control" placeholder="*First Name"/>
                                <input type="text" className="form-control" placeholder="*Last Name"/>
                            </div>
                        </form>
                        <div className="form-group mb-3">
                            <select className="form-control" id="gender">
                                <option>*Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Attack Heliocopter</option>
                            </select>
                        </div>
                        <form>
                            <div className="custom-file mb-3">
                                <input type="file" className="custom-file-input" id="customFile"/>
                                <label className="custom-file-label" htmlFor="customFile">Upload Profile Picture</label>
                            </div>
                        </form>

                        <div className="form-group mb-3">
                            <select className="form-control" id="gender">
                                <option>*Select Professional Status</option>
                                <option>Developer</option>
                                <option>Junior Developer</option>
                                <option>Senior Developer</option>
                                <option>Student || Learning</option>
                                <option>Unemployed</option>
                            </select>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type={"skills"}
                                    className={"form-control form-control-lg"}
                                    placeholder="Area of experties e.g C, Java"
                                    name={"skills"}
                                    value={skills}
                                    onChange={handleChange( 'skills')}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type={"linkedin"}
                                    className={"form-control form-control-lg"}
                                    placeholder="Short Bio"
                                    name={"introduce"}
                                    value={introduce}
                                    onChange={handleChange( 'introduce')}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type={"linkedin"}
                                    className={"form-control form-control-lg"}
                                    placeholder="Your life insperation quote"
                                    name={"introduce"}
                                    value={introduce}
                                    onChange={handleChange( 'introduce')}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type={"linkedin"}
                                    className={"form-control form-control-lg"}
                                    placeholder="Github username"
                                    name={"introduce"}
                                    value={introduce}
                                    onChange={handleChange( 'introduce')}
                                />
                            </div>
                            <small className="d-block pb-3">
                                Add Social Media Contact
                            </small>
                            <div className="form-group">
                                <input
                                    type={"facebook"}
                                    icon="fab fa-facebook"
                                    className={"form-control form-control-lg"}
                                    placeholder="facebook profile URL (optional)"
                                    name={"facebook"}
                                    value={facebook}
                                    onChange={handleChange( 'facebook')}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type={"linkedin"}
                                    className={"form-control form-control-lg"}
                                    placeholder="linkedin profile link URL (optional)"
                                    name={"linkedin"}
                                    value={linkedin}
                                    onChange={handleChange( 'linkedin')}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type={"instagram"}
                                    className={"form-control form-control-lg"}
                                    placeholder="instagram profile link URL (optional)"
                                    name={"instagram"}
                                    value={instagram}
                                    onChange={handleChange( 'instagram')}
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