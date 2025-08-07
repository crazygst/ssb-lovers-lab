import React, { useState } from 'react';
import './App.css';

// Components for each section of the app
import PartnersPage from './PartnersPage';
import ProfilePage from './ProfilePage';
import SettingsPage from './SettingsPage';

/*
 * Main application component for the Nexus-like app.  
 *
 * The app uses a simple tabbed navigation system instead of a full router to keep
 * dependencies minimal. Each tab corresponds to a top level view: Smashes
 * (orbits), Partners, Analytics and Profile. Only Partners and Profile are
 * fleshed out here per the requirements.  
 */
function App() {
  // Current active tab. Start on the partners tab since that's the most
  // visually engaging page. Available values: 'smashes', 'partners',
  // 'analytics', 'profile', 'settings'.
  const [activeTab, setActiveTab] = useState('partners');

  // State for partners list and self profile. These are loaded from
  // localStorage on first render to persist data between sessions. Each
  // partner has an id, name, smashes count, rating and optional avatar.
  const [partners, setPartners] = useState(() => {
    const stored = window.localStorage.getItem('partners');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // If parsing fails, fall back to default sample data
      }
    }
    return [
      { id: 1, name: 'IB', smashes: 64, rating: 4.2, avatar: null },
      { id: 2, name: 'Mark', smashes: 8, rating: 3.3, avatar: null },
      { id: 3, name: 'RF', smashes: 5, rating: 5.0, avatar: null },
      { id: 4, name: 'Random M', smashes: 16, rating: 4.4, avatar: null },
      { id: 5, name: 'SSB', smashes: 34, rating: 3.2, avatar: null },
      { id: 6, name: 'A ogrr', smashes: 0, rating: 0, avatar: null },
      { id: 7, name: 'T', smashes: 0, rating: 0, avatar: null },
      { id: 8, name: 'Test 4', smashes: 0, rating: 0, avatar: null },
    ];
  });

  // Self profile state; persisted in localStorage as well
  const [selfProfile, setSelfProfile] = useState(() => {
    const stored = window.localStorage.getItem('selfProfile');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        /* ignore parse failure */
      }
    }
    return { name: 'Self', birthday: '', photo: null };
  });

  // Persist partners and self profile whenever they change
  React.useEffect(() => {
    try {
      window.localStorage.setItem('partners', JSON.stringify(partners));
    } catch {
      /* ignore storage errors */
    }
  }, [partners]);

  React.useEffect(() => {
    try {
      window.localStorage.setItem('selfProfile', JSON.stringify(selfProfile));
    } catch {
      /* ignore storage errors */
    }
  }, [selfProfile]);

  // Handler to add a new partner via a prompt.
  const handleAddPartner = () => {
    const name = window.prompt('Enter partner name');
    if (!name) return;
    const newPartner = {
      id: Date.now(),
      name,
      smashes: 0,
      rating: 0,
      avatar: null,
    };
    setPartners([...partners, newPartner]);
  };

  // Export current app data to a JSON file. This will trigger a download
  // containing partners and self profile. If running in an environment
  // where downloads are unsupported, it instead shows the JSON for copy.
  const handleExportData = () => {
    const data = { partners, self: selfProfile };
    const json = JSON.stringify(data, null, 2);
    try {
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'nexus-data.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      window.prompt('Copy the following JSON and save it manually:', json);
    }
  };

  // Import app data from a file input. Accepts a File object and parses
  // JSON to update partners and self profile. On error a message is shown.
  const handleImportData = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (parsed.partners && Array.isArray(parsed.partners)) {
          setPartners(parsed.partners);
        }
        if (parsed.self) {
          setSelfProfile(parsed.self);
        }
        alert('Data imported successfully');
      } catch (err) {
        alert('Failed to import data: invalid file format');
      }
    };
    reader.readAsText(file);
  };

  // Render the currently selected tab content.
  const renderContent = () => {
    switch (activeTab) {
      case 'partners':
        return <PartnersPage partners={partners} onAddPartner={handleAddPartner} />;
      case 'profile':
        return (
          <ProfilePage
            goToSettings={() => setActiveTab('settings')}
            self={selfProfile}
            setSelf={setSelfProfile}
            onImport={handleImportData}
            onExport={handleExportData}
          />
        );
      case 'settings':
        return <SettingsPage />;
      case 'smashes':
        return (
          <div className="placeholder">Smashes (orbits) view coming soon.</div>
        );
      case 'analytics':
        return (
          <div className="placeholder">Analytics view coming soon.</div>
        );
      default:
        return null;
    }
  };

  // Helper for nav items
  const NavItem = ({ label, tabKey }) => (
    <div
      className={`nav-item ${activeTab === tabKey ? 'active' : ''}`}
      onClick={() => setActiveTab(tabKey)}
    >
      {label}
    </div>
  );

  return (
    <div className="app-container">
      {/* Primary content area */}
      <div className="content-area">{renderContent()}</div>
      {/* Bottom navigation bar */}
      <nav className="nav-bar">
        <NavItem label="Smashes" tabKey="smashes" />
        <NavItem label="Partners" tabKey="partners" />
        <NavItem label="Analytics" tabKey="analytics" />
        <NavItem label="Profile" tabKey="profile" />
      </nav>
    </div>
  );
}

export default App;
