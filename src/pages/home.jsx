import { useState, useEffect } from "react";
import { getCourses } from "../api";
import { Preloader } from "../components/Preloader";
import { CourseList } from "../components/CourseList";
function Home() {
	const [catalog, setCatalog] = useState([]);
	useEffect(() => {
		getCourses().then((data) => {
		setCatalog(data.courses);
	  });
	}, []);
	return (  <>{
		!catalog.length ? 
		(<Preloader />) : 
		( <>
		<CourseList catalog={catalog} totalCourses={catalog.length}/>
		</> ) 
	}</>
	  );
  }
  export { Home };
