import {API_URL, TOKEN} from './config';

const options = {
	method: 'GET',
	headers: {
	  Authorization: `Bearer ${TOKEN}`,
	}
  };
const getCourses = async() => {
	const response = await fetch(API_URL,options);
	return await response.json();
}

const getCoursesById = async(id) => {
	const response = await fetch(API_URL + id, options);
	return await response.json();

}

export { getCourses , getCoursesById} 