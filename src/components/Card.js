import React from 'react';
import '../styles/Card.css';
import { Row, Col } from 'react-bootstrap';

export default function Card(props) {
  const handleOpenUrl = (url) => {
    window.open(url, '_blank');
  }

  return (
    <div className="card-result">
      <div className="card-result-img">
        <img src={props.url_avatar} className="card-result-img-profile" alt="Avatar User" />
      </div>

      <div className="card-result-repo">
        <div
          className="card-result-repo-name"
          onClick={() => handleOpenUrl(props.url_repo)}
        >Repo: {props.name}</div>
        <div
          className="card-result-repo-username"
          onClick={() => handleOpenUrl(`https://github.com/${props.username}`)}
        >
          <b>User: {props.username}</b>
        </div>
      </div>

      <div className="card-result-repo-description">Description: {props.description}</div>

      <Row className="card-repo-details">
        <Col className="card-repo-details-watchers">Watchers: {props.watchers}</Col>
        <Col className="card-repo-details-stars">Stars: {props.stars}</Col>
        <Col className="card-repo-details-forks">Forks: {props.forks}</Col>
      </Row>
    </div>
  );
}
