import React from 'react';
import './TeamSection.css';
import { opsData } from '../../data/data';
const TeamSection = () => {
  // Safely get the data for this section
  const teamData = opsData.teamSection;

  // If the data for this section doesn't exist in opsData.js,
  // return null to prevent the entire app from crashing.
  if (!teamData) {
    console.error("Data for TeamSection is missing from opsData.js!");
    return null;
  }

  const { title, subtitle, boxes } = teamData;

  return (
    <section className="team-section-container">
      <div className="team-section-heading">
        <h2 className="team-section-title">{title}</h2>
        <p className="team-section-subtitle">{subtitle}</p>
      </div>
      <div className="team-section-boxes-wrapper">
        <div className="team-section-boxes">
          {boxes && boxes.map((box, index) => (
            <div key={index} className={`team-box box-${index + 1}`}>
              <h3 className="box-title">{box.title}</h3>
              <p className="box-subtitle">{box.subtitle}</p>
              <p className="box-description">{box.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;

