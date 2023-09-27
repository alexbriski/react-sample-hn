import "./App.css";
import { useEffect, useState } from "react";
import { BiUpvote, BiTimeFive } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { getTimeDiffFromNow } from "./utils";

const API_URL = "https://hacker-news.firebaseio.com/v0";

const App = ({ itemsToDisplay = 30 }) => {
  const [stories, setStories] = useState();

  useEffect(() => {
    const getStories = async () => {
      fetch(`${API_URL}/topstories.json`)
        .then((response) => response.json())
        .then((ids) => {
          let storyPromises = [];
          ids = ids.slice(0, itemsToDisplay);
          ids.forEach((id) =>
            storyPromises.push(
              fetch(`${API_URL}/item/${id}.json`).then((response) => response.json())
            )
          );
          Promise.all(storyPromises).then((values) => {
            setStories(values);
          });
        })
        .catch((e) => console.log(e));
    };
    getStories();
  }, [itemsToDisplay]);

  return (
    <>
      <h1 className="title">Hacker News Redesigned</h1>
      {!stories && (
        <>
          <div data-testid="loading" className="loading">
            Loading...
          </div>
        </>
      )}
      {stories &&
        stories.map((story) => (
          <div key={story.id} className="card">
            <div className="upvoteSection">
              <BiUpvote className="upvoteIcon" />
            </div>
            <div className="detailSection">
              <div className="detailTop">
                {story.title}
                <span className="detailText"> ({story.url})</span>
              </div>
              <div className="detailBottom detailText">
                <div className="comments">
                  <FaRegComment className="icon" />
                  Comments
                </div>
                <div className="detailBottomItem">
                  <BiUpvote className="icon" />
                  {story.score}
                </div>
                <div className="detailBottomItem">
                  <CgProfile className="icon" /> {story.by}
                </div>
                <div className="detailBottomItem">
                  <BiTimeFive className="icon" /> {getTimeDiffFromNow(story.time)}
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default App;
