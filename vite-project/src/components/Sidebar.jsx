import React from 'react';
import PropTypes from 'prop-types';

export const SidebarItem = ({ icon: Icon, label, active, onClick, children, isFontAwesome }) => {
  return (
    <>
      <div
        onClick={onClick}
        className={`ds-nav-link d-flex justify-content-between align-items-center ${active ? 'active fw-bold' : ''}`}
        style={{ cursor: 'pointer', marginBottom: '4px' }}
      >
        <div className="d-flex align-items-center gap-3">
          {isFontAwesome ? (
             <i className={`fas ${Icon}`} style={{width: '20px', textAlign: 'center'}}></i>
          ) : (
             <Icon size={20} strokeWidth={active ? 2.5 : 1.5} />
          )}
          <span style={{ fontSize: '0.95rem' }}>{label}</span>
        </div>
      </div>
      {children && (
        <div className="d-flex flex-column gap-1 mb-2 mt-1">
          {children}
        </div>
      )}
    </>
  );
};

SidebarItem.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]).isRequired,
  label: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
  isFontAwesome: PropTypes.bool
};

export const Sidebar = ({ brandName = "Studio", brandIcon, items, activeTab, onTabChange, onLogout, isFontAwesome = false }) => {
  return (
    <div className="bg-white border-end d-flex flex-column flex-shrink-0 p-3 ds-sidebar" style={{ height: '100vh', position: 'sticky', top: 0, overflowY: 'auto' }}>
      <div className="mb-5 px-2 d-flex align-items-center gap-2">
        {brandIcon && typeof brandIcon === 'string' ? (
           <i className={`fas ${brandIcon} fa-lg text-primary`}></i>
        ) : brandIcon ? (
           brandIcon
        ) : null}
        <h5 className="fw-bold mb-0 text-primary" style={{ fontFamily: 'var(--font-base)', letterSpacing: '-0.5px' }}>{brandName}</h5>
      </div>
      
      <ul className="nav flex-column mb-auto gap-1">
        {items.map((item, idx) => {
          if (item.isHeader) {
            return <div key={idx} className="mt-4 mb-2 text-muted small px-3 fw-bold text-uppercase" style={{fontSize: '0.75rem', letterSpacing: '0.5px'}}>{item.label}</div>;
          }
          return (
            <li className="nav-item" key={item.id}>
              <SidebarItem
                icon={item.icon}
                label={item.label}
                active={activeTab === item.id}
                onClick={() => onTabChange(item.id)}
                isFontAwesome={isFontAwesome}
                children={item.renderSubmenu && item.renderSubmenu(activeTab, onTabChange)}
              />
            </li>
          );
        })}
      </ul>
      
      <div className="mt-auto border-top pt-3">
        <button onClick={onLogout} className="btn btn-link text-danger text-decoration-none fw-bold small w-100 text-start ps-3">
          <i className="fas fa-sign-out-alt me-2"></i> Log Out
        </button>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  brandName: PropTypes.string,
  brandIcon: PropTypes.any,
  items: PropTypes.array.isRequired,
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  isFontAwesome: PropTypes.bool
};

export default Sidebar;
