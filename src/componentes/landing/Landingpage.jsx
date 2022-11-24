import React from "react";
import { Link } from 'react-router-dom';
import './landingStyles.css';
import quiz from '../../survey-sample.json';

export default function LandingPage() {

    return (
        <div className="page">
            <div id="text">
                <div className="log">
                    <img id="landignimg" src="https://media-exp1.licdn.com/dms/image/C4D0BAQEEraT_DmE2PA/company-logo_200_200/0/1657054487377?e=1677110400&v=beta&t=hmUFD8ZiyR2TQhDjovcRL_lMXhDl_x2OsFT6l108ztw" alt="quiz" />
                    <h1>Bienvenido al quiz</h1>
                    <h2>{quiz.title}</h2>
                    <Link to='/form'>
                        <button className="Button">Comenza el quiz aquí</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
