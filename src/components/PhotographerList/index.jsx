import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePhotographers } from "../../hooks/usePhotographers";

import "./styles.css";

const PhotographerList = () => {
  const { loading, photographers, getPhotographerList } = usePhotographers();

  useEffect(() => {
    getPhotographerList();
  }, []);

  return (
    <div className="safe">
      <div className="photographers__list">
        <h2>Photographers</h2>
        <ul>
          {loading && <p>Loading...</p>}
          {photographers.map((item) => (
            <li key={item.id}>
              <Link to={`/photographers/${item.id}`}>
                <div className="list__item">
                  <h4>{item.fullName}</h4>
                  <Link to={`/portfolio/${item.id}`}>
                    <button>View Portfolio</button>
                  </Link>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PhotographerList;
