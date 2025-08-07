import React, { useState } from 'react';

/**
 * ProfilePage displays the user (self) information and a set of cards for
 * managing various aspects of the application: private gallery, positions,
 * locations and partner characteristics. It includes an edit dialog for
 * updating the self profile (name, birthday and optional photo).  
 *
 * Props:
 *   goToSettings: function to call when the settings gear is clicked.
 */
function ProfilePage({ goToSettings, self, setSelf, onImport, onExport }) {
  // Local UI state for editing and import/export modals
  const [isEditing, setIsEditing] = useState(false);
  const [isImportExportOpen, setIsImportExportOpen] = useState(false);

  // Handle saving edits; close dialog when done
  const handleSave = () => {
    setSelf({ ...self });
    setIsEditing(false);
  };

  // Render the edit dialog/modal
  const renderEditDialog = () => (
    <div className="modal-overlay" onClick={() => setIsEditing(false)}>
      <div
        className="edit-dialog"
        onClick={(e) => e.stopPropagation() /* prevent overlay close on inner click */}
      >
        <h3>Edit Profile</h3>
        {/* Photo upload */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {self.photo ? (
            <img
              src={self.photo}
              alt="profile"
              className="profile-photo"
            />
          ) : (
            <div className="profile-placeholder">{self.name.charAt(0).toUpperCase()}</div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                  setSelf((prev) => ({ ...prev, photo: ev.target.result }));
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>
        {/* Name field */}
        <label>Name</label>
        <input
          type="text"
          value={self.name}
          onChange={(e) => setSelf((prev) => ({ ...prev, name: e.target.value }))}
        />
        {/* Birthday field */}
        <label>Birthday</label>
        <input
          type="date"
          value={self.birthday}
          onChange={(e) => setSelf((prev) => ({ ...prev, birthday: e.target.value }))}
        />
        <div className="actions">
          <button className="btn cancel" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
          <button className="btn" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );

  // Render the import/export dialog
  const renderImportExportDialog = () => (
    <div className="modal-overlay" onClick={() => setIsImportExportOpen(false)}>
      <div className="edit-dialog" onClick={(e) => e.stopPropagation()}>
        <h3>Import / Export Data</h3>
        <p style={{ fontSize: '0.8rem', color: '#b0b8da' }}>
          You can export your current data to a file or import a previously
          exported file. Importing will replace your current partners and
          profile.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button className="btn" onClick={onExport}>
            Export Data
          </button>
          <label className="btn" style={{ textAlign: 'center' }}>
            Import Data
            <input
              type="file"
              accept="application/json"
              style={{ display: 'none' }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onImport(file);
                setIsImportExportOpen(false);
              }}
            />
          </label>
          <button className="btn cancel" onClick={() => setIsImportExportOpen(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="profile-page">
      {/* Header with title and settings icon */}
      <div className="page-header">
        My Profile
        <span className="settings-icon" onClick={goToSettings}>
          ⚙️
        </span>
      </div>
      {/* Grid of profile management cards */}
      <div className="profile-grid">
        {/* Self card */}
        <div className="profile-card" onClick={() => setIsEditing(true)}>
          {self.photo ? (
            <img src={self.photo} alt={self.name} className="profile-photo" />
          ) : (
            <div className="profile-placeholder">
              {self.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="title">{self.name}</div>
          <div className="subtitle">View and edit your profile</div>
        </div>
        {/* Other management cards */}
        <div className="profile-card" onClick={() => alert('Private Gallery not implemented')}>Private Gallery</div>
        <div className="profile-card" onClick={() => alert('Positions manager not implemented')}>Positions</div>
        <div className="profile-card" onClick={() => alert('Locations manager not implemented')}>Locations</div>
        <div className="profile-card" onClick={() => alert('Partner Characteristics not implemented')}>Partner Characteristics</div>
        <div className="profile-card" onClick={() => setIsImportExportOpen(true)}>
          Import/Export
        </div>
      </div>
      {isEditing && renderEditDialog()}
      {isImportExportOpen && renderImportExportDialog()}
    </div>
  );
}

export default ProfilePage;
