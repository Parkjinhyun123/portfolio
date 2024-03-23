import React, { useEffect, useState } from "react";
import "./Modal.css";
import Slider from "react-slick";
import { getImageUrls } from "./api/firebase";

const Modal = ({ isOpen, onClose, project }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const folderPath = project?.Title;

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const fetchImageUrls = async () => {
      const urls = await getImageUrls(folderPath);
      setImageUrls(urls);
    };

    fetchImageUrls();
  }, [isOpen, project]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  if (!isOpen) return null;
  return (
    <div className="Modal-overlay" onClick={onClose}>
      <div className="Modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="Close-btn">
          X
        </button>
        <div className="Modal-left">
          <div className="ModalCardImg">
            <Slider {...settings}>
              {imageUrls.map((url, index) => (
                <div key={index}>
                  <img src={url} alt={project.Title} />
                </div>
              ))}
            </Slider>
          </div>
          <div className="ModalCard-title">
            <h3>{project.Title}</h3>
            <div>{project.Member}</div>
          </div>
          <h5>배포</h5>
          <a href={project.Link} target="_blank" rel="noopener noreferrer">
            {project.Link}
          </a>
          <h5>Github</h5>
          <a href={project.Github} target="_blank" rel="noopener noreferrer">
            {project.Github}
          </a>
        </div>
        <div className="Modal-right">
          <h4>프로젝트 소개</h4>
          <br />
          <div className="ModalCard-intro">{project.Content}</div>
          <br />
          <br />
          <br />
          <h4>후기</h4>
          <br />
          <div className="ModalCard-intro">{project.review1}</div>
          <br />
          <div className="ModalCard-intro">{project.review2}</div>
        </div>
        <div className="Modal-bottom">
          <div className="Stacks">Stack</div>
          <div>{project.Skills}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
