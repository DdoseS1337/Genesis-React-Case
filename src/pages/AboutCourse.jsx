import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCoursesById } from "../api";
import { Preloader } from "../components/Preloader";
import Hls from "hls.js";

function Course() {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  function handleLessonClick(lesson) {
    if (lesson.status === "unlocked") {
      setSelectedLesson(lesson);

      const selectedLessons =
        JSON.parse(localStorage.getItem("selectedLessons")) || [];
      if (!selectedLessons.includes(lesson.id)) {
        selectedLessons.push(lesson.id);
        localStorage.setItem(
          "selectedLessons",
          JSON.stringify(selectedLessons)
        );
      }
    } else {
      alert("Lesson is locked");
    }
  }

  useEffect(() => {
    getCoursesById(courseId).then((data) => setCourse(data));
  }, [courseId]);

  useEffect(() => {
    if (selectedLesson) {
      const hls = new Hls();
      hls.loadSource(selectedLesson.link);
      hls.attachMedia(videoRef.current);
      videoRef.current.play();
    } else if (
      course.meta &&
      course.meta.courseVideoPreview &&
      Hls.isSupported()
    ) {
      const hls = new Hls();
      hls.loadSource(course.meta.courseVideoPreview.link);
      hls.attachMedia(videoRef.current);
    }

    if (videoRef.current) {
      videoRef.current.addEventListener("error", (e) => {
        console.error("Error", e.target.error);
      });
    }
  }, [course.meta, selectedLesson]);

  let selectedLessonVideoUrl = "";
  if (selectedLesson) {
    selectedLessonVideoUrl = selectedLesson.link;
  }

  return (
    <>
      {!course.id ? (
        <Preloader />
      ) : (
        <div className="course">
          <h1>{course.title}</h1>
          {course.meta && course.meta.courseVideoPreview ? (
            <div>
              <video ref={videoRef} controls />
            </div>
          ) : (
            <p>Loading video...</p>
          )}
          <table className="centered">
            <thead>
              <tr>
                <th>Lessons</th>
              </tr>
            </thead>
            <tbody>
              {course.lessons.map((item) => (
                <tr key={item.id} onClick={() => handleLessonClick(item)}>
                  <td>{item.title}</td>
                  <td>
                    <img
                      className="lessons-img"
                      src={`${item.previewImageLink}/lesson-${item.order}.webp`}
                      alt={item.title}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectedLesson && (
            <div className="video-container">
              <h2 style={{ color: "green" }}>
                Lesson : {selectedLesson.title}
              </h2>
              <button
                className="waves-effect waves-light btn-small"
                onClick={() => setSelectedLesson(null)}
                style={{ float: "right" }}
              >
                Close video
              </button>
              {selectedLessonVideoUrl && (
                <video src={selectedLessonVideoUrl} ref={videoRef} controls />
              )}
            </div>
          )}
        </div>
      )}

      <button className="btn" onClick={() => navigate(-1)}>
        {" "}
        Go back
      </button>
    </>
  );
}

export { Course };
