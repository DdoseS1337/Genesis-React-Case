import {Link} from 'react-router-dom';
function CourseItem(props) {
	const {id, title, description, previewImageLink, lessonsCount, meta, rating } =
	  props;
	const skills = meta.skills || [];
	return (
	  <div className="card">
		  <div className="card-image">
			<img src={previewImageLink + '/cover.webp'} alt={description} />
		  </div>
		  <div className="card-content">
		  <span className="card-title">{title}</span>
			<p>Description : {description}</p>
		  <h6>Lessons count = {lessonsCount}</h6>
		  <table className="centered">
          <thead>
            <tr>
              <th>Skills</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((item, index) => (
              <tr key={index}>
                <td>{item}</td>
              </tr>
            ))}
          </tbody>
        </table>
		<h6>
				Rating = {rating}
		</h6>
		  </div>
		  <div className="card-action">
			<Link to={`/course/${id}`} className="btn">
			  Watch course
			</Link>
		</div>
	  </div>
	);
  }

  export { CourseItem }