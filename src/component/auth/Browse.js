import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import placeholder from './../../img/placeholder.png';
import placeholder2 from './../../img/placeholder2.png';


const Browse = props => {
  return (
      <div className="browse">
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <p className="lead">
                        {' '}
                        Browse to your heart's content!
                    </p>
                    <div className="container browse-outer">

                      <div className="container browse-inner">
                        <div className="container browse-profile-picture">
                          <img src={placeholder}/>
                        </div>
                        <div className="container browse-profile-summary">
                        <h1 className="browse-name">
                        Anuja Nautreel
                        </h1>
                        <p className="browse-details">
                        Lead 3D Artist @ UnrealVirtualGames
                        </p>
                        <p className="browse-details">
                        Master of Animation @ RMIT
                        </p>
                        <p className="browse-details">
                        Bachelor of Design @ University of Melbourne
                        </p>

                        </div>
                      </div>


                      <div className="container browse-inner">
                        <div className="container browse-profile-picture">
                          <img src={placeholder2}/>
                        </div>
                        <div className="container browse-profile-summary">
                        <h1 className="browse-name">
                        John Smith
                        </h1>
                        <p className="browse-details">
                        Machine Learning Engineer @ UnrealMachineLearning
                        </p>
                        <p className="browse-details">
                        Master of IT @ La Trobe University
                        </p>
                        <p className="browse-details">
                        Bachelor of Science @ University of Melbourne
                        </p>
                        </div>
                      </div>

                    </div>
                </div>
            </div>
        </div>
      </div>
  );
};

export default Browse;
