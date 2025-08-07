import React from 'react';

/**
 * PartnersPage renders a grid of partner cards. Each card shows a partner's
 * name, smash count and rating. At the end of the grid there is an
 * "Add Partner" card that triggers the callback passed in via props.
 *
 * The grid is set to always have at least three columns, even on large
 * screens. If there are more partners than can fit in a row, they wrap to
 * the next line. The CSS lives in App.css.
 */
function PartnersPage({ partners, onAddPartner }) {
  return (
    <div className="partners-page">
      <div className="page-header">Partners</div>
      <div className="partner-grid">
        {partners.map((p) => (
          <div key={p.id} className="partner-card">
            {p.avatar ? (
              <img src={p.avatar} alt={p.name} />
            ) : (
              <div className="partner-card-placeholder">
                {p.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="partner-name">{p.name}</div>
            <div className="partner-stats">
              {p.smashes} Smashes • {p.rating ? p.rating.toFixed(1) : '–'} ★
            </div>
          </div>
        ))}
        {/* Add partner tile */}
        <div className="partner-card add-partner-card" onClick={onAddPartner}>
          <div className="partner-card-placeholder">+</div>
          <div className="partner-name">Add Partner</div>
        </div>
      </div>
    </div>
  );
}

export default PartnersPage;
