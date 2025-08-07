import React, { useState } from 'react';

/**
 * SettingsPage renders an application settings view inspired by the design
 * provided. Users can toggle dark mode or biometric authentication and see
 * account details like their email. Other actions like reset password or
 * logout are stubbed with alerts to indicate where functionality would
 * normally go.
 */
function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [biometric, setBiometric] = useState(false);

  return (
    <div className="settings-page">
      {/* Header */}
      <div className="page-header">Settings</div>
      {/* Smash Vault Pro section */}
      <div className="settings-section">
        <h4>Smash Vault Pro</h4>
        <div
          className="settings-row link-row"
          onClick={() => alert('Manage subscription not implemented')}
        >
          <span>Manage Subscription</span>
        </div>
      </div>
      {/* Account Settings */}
      <div className="settings-section">
        <h4>Account Settings</h4>
        <div className="settings-row">
          <span>Dark Mode</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>
        <div
          className="settings-row link-row"
          onClick={() => alert('Edit profile details not implemented')}
        >
          <span>Edit Profile Details</span>
        </div>
        <div className="settings-row">
          <span>Biometric Authentication</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={biometric}
              onChange={(e) => setBiometric(e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>
        <div className="settings-row">
          <span>Email</span>
          <span className="value">user@example.com</span>
        </div>
        <div
          className="settings-row link-row"
          onClick={() => alert('Reset password not implemented')}
        >
          <span>Reset Password</span>
        </div>
        <div
          className="settings-row link-row"
          onClick={() => alert('Logout not implemented')}
        >
          <span>Logout</span>
        </div>
      </div>
      {/* Permissions */}
      <div className="settings-section">
        <h4>Permissions</h4>
        <div className="settings-row">
          <div>
            <div className="label">Notifications</div>
            <div className="value">Receive notifications for new smashes and updates.</div>
          </div>
          <span className="not-granted">Not Granted</span>
        </div>
        <div className="settings-row">
          <div>
            <div className="label">Storage</div>
            <div className="value">Storage access needed to select images from local storage.</div>
          </div>
          <span className="not-granted">Not Granted</span>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
