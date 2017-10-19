import React from 'react';
import reactjs from '../../img/reactjs.jpg';
import reactrouter4 from '../../img/reactrouter4.jpg';
import bootstrap4 from '../../img/bootstrap4.jpg';
import webpack from '../../img/webpack.png';

const Section = () => {
    return (

        <section className="row">
            <div className="col-md-6 col-lg-3">
                <div className="card">
                    <a href="https://facebook.github.io/react" target="_blank">
                        <img src={reactjs} className="card-img-top img-fluid" alt="ReactJS"/>
                    </a>
                    <div className="card-block">
                        <h3 className="card-title">ReactJS</h3>
                        <p>ReactJS/Redux using the ES2015 (ES6) syntax.</p>
                    </div>
                </div>
            </div>


            <div className="col-md-6 col-lg-3">
                <div className="card">
                    <a href="https://webpack.js.org/" target="_blank">
                        <img src={webpack} className="card-img-top img-fluid" alt="Webpack"/>
                    </a>
                    <div className="card-block">
                        <h3 className="card-title">Webpack</h3>
                        <p>Module Builder</p>
                    </div>
                </div>
            </div>

            <div className="col-md-6 col-lg-3">
                <div className="card">
                    <a href="https://reacttraining.com/react-router" target="_blank">
                        <img src={reactrouter4} className="card-img-top img-fluid" alt="React Router"/>
                    </a>
                    <div className="card-block">
                        <h3 className="card-title">React Router 4</h3>
                        <p>Declarative routing for ReactJS apps.</p>
                    </div>
                </div>
            </div>

            <div className="col-md-6 col-lg-3">
                <div className="card">
                    <a href="http://v4-alpha.getbootstrap.com" target="_blank">
                    <img src={bootstrap4} className="card-img-top img-fluid" alt="Bootstrap 4" />
                    </a>
                    <div className="card-block">
                        <h3 className="card-title">Bootstrap 4</h3>
                        <p>A framework for styling apps for all screen sizes.</p>
                    </div>
                </div>
            </div>

        </section>
    );
};



export default Section;
