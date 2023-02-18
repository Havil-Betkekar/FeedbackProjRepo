import React from "react"
import { Link } from "react-router-dom";

function AboutIconLink(){
    return(
        <div className="question-icon">
            <Link to={{
                pathname: '/about',
                search: '?sort=name',
                hash:'#hello',
            }}
            >?</Link>
            </div>
    );
}

export default AboutIconLink