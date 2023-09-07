import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPhotos, setFilteredPhotos] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/photos")
      .then((response) => {
        //console.log(response);
        setPhotos(response.data);
        //console.log(setPhotos)
      })
      .catch((error) => {
        console.error("Error fetching photos: ", error);
      });
  }, []);

  /*const filteredPhotos = photos.filter(photo =>
        photo.title.toLowerCase().includes(searchTerm.toLowerCase())
        );*/
  useEffect(() => {
    const filtered = photos.filter((photo) =>
      photo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPhotos(filtered);
  }, [photos, searchTerm]);

  return (
    <div className="main">
      <div className="header">
        <h1>Photo Gallery</h1>
        <input
          type="text"
          placeholder="Search by title.."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      <div className="container">
        <div className="row">
          {filteredPhotos.map((photo) => {
            return (
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="col-4" key={photo.id}>
                  <img
                    src={photo.thumbnailUrl}
                    className="image"
                    alt={photo.title}
                  />
                  <span>{photo.title}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
