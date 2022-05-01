import React, {useEffect} from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';


const About = () => {
return (

      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
          
          </span>
        </p>
        <div className="card-body">
          
          
        </div>
       <br></br>
<h1>Welcome to Silver Socials</h1>
<br></br>
<p>A program of meetup activities aimed at older people in communities across the DC Metro Area. In this application you will find a range of activities 
    delivered by fellow members.</p> 
<br></br>
<p>If you want to meet new people within your community, watch or participate in a range of activities or you know a friend, 
    neighbor or family member who might like to try something new, direct them to Silver Socials.</p> 
<br></br>
<p>Everyone is welcome to come along and try a new activity. 
    Visit our Home page to find a Silver Socials event near you. <Link to={`/`} style={{ fontWeight: 700 }}   className="text-light"
                       >  Home </Link></p>
<br></br>
<p>Silver Socials is community funded, and we welcome donations to keep it going. 
 </p>


      </div>
      
   
  );
};


export default About;
