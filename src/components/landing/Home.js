import React from 'react';
import Header from './Header';
import Section from './Section';
import Footer from './Footer';


const Home = () => {
    return (
        <div>

            <Header/>

            <div className="container text-muted">
                <h2 className="display-4 text-center py-5 my-4">Project Technologies</h2>
                <Section/>
                <Footer/>
            </div>

        </div>
    );
};



export default Home;
