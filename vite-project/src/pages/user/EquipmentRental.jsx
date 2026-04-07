import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Collapse } from 'react-bootstrap';
import {
  Search, ArrowLeft, ShoppingCart, Check, Star,
  Camera, Aperture, Plane, Zap, Mic, Package, Grid3X3,
  ChevronDown, Calendar, Filter
} from 'lucide-react';
import { MOCK_EQUIPMENT, EQUIPMENT_CATEGORIES } from '../../data/mockEquipment';
import '../../styles/rental.css';

/* ─── ICON MAP ─── */
const ICON_MAP = {
  grid: Grid3X3,
  camera: Camera,
  aperture: Aperture,
  plane: Plane,
  zap: Zap,
  mic: Mic,
  package: Package,
};

/* ───────────────────────────────────────────────────────────── */
/*  EQUIPMENT RENTAL PAGE                                       */
/* ───────────────────────────────────────────────────────────── */
const EquipmentRental = ({ onBack }) => {
  /* ── FILTER & SORT STATE ── */
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all'); // all | available | booked
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  /* ── UI INTERACTION STATE ── */
  const [showFilter, setShowFilter] = useState(null); // 'categories' | 'period' | 'availability' | null
  const [addedItems, setAddedItems] = useState({}); // { [itemId]: boolean }

  const toggleFilter = (filterName) => {
    setShowFilter(prev => prev === filterName ? null : filterName);
  };

  /* ── FILTERED EQUIPMENT ── */
  const filteredEquipment = useMemo(() => {
    let items = [...MOCK_EQUIPMENT];

    if (activeCategory !== 'all') items = items.filter((item) => item.category === activeCategory);
    if (statusFilter !== 'all') items = items.filter((item) => item.status === statusFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter((item) =>
        item.name.toLowerCase().includes(q) ||
        item.specs.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    }
    
    // Sort alphabetically by default for grid consistency
    items.sort((a, b) => a.name.localeCompare(b.name));
    return items;
  }, [activeCategory, statusFilter, searchQuery]);

  /* ── RENTAL COST CALC ── */
  const rentalDays = useMemo(() => {
    if (!startDate || !endDate) return 0;
    const diff = new Date(endDate) - new Date(startDate);
    return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0;
  }, [startDate, endDate]);

  /* ── ADD TO CART (WITH FEEDBACK) ── */
  const handleAddToCart = useCallback((e, item) => {
    if (item.status === 'booked') return;
    
    // Set added state
    setAddedItems(prev => ({ ...prev, [item.id]: true }));
    
    // Revert after 2 seconds
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [item.id]: false }));
    }, 2000);
  }, []);

  /* ── FORMAT PRICE ── */
  const formatPrice = (p) => `₹${p.toLocaleString('en-IN')}`;

  /* ── CATEGORY LABEL MAP ── */
  const categoryLabels = {
    camera: 'Camera',
    lens: 'Lens',
    drone: 'Drone / Action',
    lighting: 'Lighting',
    audio: 'Audio',
    accessory: 'Accessory',
  };

  return (
    <div className="rental-root">
      <Container className="py-5" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
        
        {/* ── HEADER ─────────────────────────────────────────── */}
        <header className="rental-header mb-2" id="rental-header">
          <div className="rental-header__left">
            <nav className="rental-breadcrumb" aria-label="Breadcrumb">
              <a href="#" onClick={(e) => { e.preventDefault(); onBack && onBack(); }}>
                Home
              </a>
              <span className="rental-breadcrumb__sep">›</span>
              <span className="rental-breadcrumb__current">Rent Equipment</span>
            </nav>
            <h1 className="rental-header__title">Premium Rental Shop</h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div className="rental-search" id="rental-search">
              <Search size={16} className="rental-search__icon" />
              <input
                type="text"
                placeholder="Search gear by name or specs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search equipment"
              />
            </div>
          </div>
        </header>

        {/* ── SLIDE-DOWN FILTER BAR ──────────────────────────── */}
        <div className="rental-filter-bar mb-4">
          <button 
            className={`rental-filter-btn ${showFilter === 'categories' ? 'active' : ''}`}
            onClick={() => toggleFilter('categories')}
          >
            <Grid3X3 size={16} /> Categories <ChevronDown size={14} className="ms-1" />
          </button>
          
          <button 
            className={`rental-filter-btn ${showFilter === 'period' ? 'active' : ''}`}
            onClick={() => toggleFilter('period')}
          >
            <Calendar size={16} /> Rental Period <ChevronDown size={14} className="ms-1" />
          </button>
          
          <button 
            className={`rental-filter-btn ${showFilter === 'availability' ? 'active' : ''}`}
            onClick={() => toggleFilter('availability')}
          >
            <Filter size={16} /> Availability <ChevronDown size={14} className="ms-1" />
          </button>
        </div>

        {/* Collapse: Categories */}
        <Collapse in={showFilter === 'categories'}>
          <div id="filter-categories-collapse">
            <div className="rental-filter-panel mb-4">
              <div className="rental-cat-list">
                {EQUIPMENT_CATEGORIES.map((cat) => {
                  const IconComp = ICON_MAP[cat.icon] || Grid3X3;
                  return (
                    <div
                      key={cat.id}
                      className={`rental-cat-item ${activeCategory === cat.id ? 'active' : ''}`}
                      onClick={() => { setActiveCategory(cat.id); setShowFilter(null); }}
                    >
                      <IconComp size={24} />
                      <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{cat.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Collapse>

        {/* Collapse: Rental Period */}
        <Collapse in={showFilter === 'period'}>
          <div id="filter-period-collapse">
            <div className="rental-filter-panel mb-4">
              <div className="rental-date-group">
                <div className="rental-date-input-wrapper">
                  <span className="rental-date-label">Start Date</span>
                  <input
                    type="date"
                    className="rental-date-input"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="rental-date-input-wrapper">
                  <span className="rental-date-label">End Date</span>
                  <input
                    type="date"
                    className="rental-date-input"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate}
                  />
                </div>
                {rentalDays > 0 && (
                  <div style={{ color: 'var(--rs-gold)', fontWeight: 600, marginTop: '20px' }}>
                    {rentalDays} day{rentalDays > 1 ? 's' : ''} Selected
                  </div>
                )}
              </div>
            </div>
          </div>
        </Collapse>

        {/* Collapse: Availability */}
        <Collapse in={showFilter === 'availability'}>
          <div id="filter-availability-collapse">
            <div className="rental-filter-panel mb-4">
              <div className="rental-status-group">
                {[
                  { key: 'all', label: 'Show All', dotClass: 'all' },
                  { key: 'available', label: 'Available', dotClass: 'available' },
                  { key: 'booked', label: 'Booked', dotClass: 'booked' },
                ].map((s) => (
                  <button
                    key={s.key}
                    className={`rental-status-btn ${statusFilter === s.key ? 'active' : ''}`}
                    onClick={() => { setStatusFilter(s.key); setShowFilter(null); }}
                  >
                    <span className={`rental-status-dot rental-status-dot--${s.dotClass}`} />
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Collapse>

        {/* ── GRID LAYOUT ────────────────────────────────────── */}
        <div className="mb-3" style={{ color: 'var(--rs-cream-dim)', fontSize: '0.85rem' }}>
          Showing <strong style={{ color: 'var(--rs-gold)' }}>{filteredEquipment.length}</strong> items
          {rentalDays > 0 && ` · Cost calculated for ${rentalDays} days`}
        </div>

        <Row className="g-4 justify-content-center">
          {filteredEquipment.length > 0 ? (
            filteredEquipment.map((item) => (
              <Col lg={4} md={6} sm={12} key={item.id}>
                <article className="rental-card">
                  {/* Image Area */}
                  <div className="rental-card__image-wrap">
                    <img
                      className="rental-card__image"
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                    />
                    <div className="rental-card__image-overlay" />

                    {/* Left Status Badge */}
                    <span className={`rental-card__status rental-card__status--${item.status}`}>
                      {item.status === 'available' ? 'Available' : 'Booked'}
                    </span>

                    {/* Right Rating Badge */}
                    <span className="rental-card__rating">
                      <Star size={12} fill="#C5A059" stroke="none" />
                      {item.rating}
                    </span>
                  </div>

                  {/* Details Area */}
                  <div className="rental-card__body">
                    <div className="rental-card__category">
                      {categoryLabels[item.category] || item.category}
                    </div>
                    <h3 className="rental-card__name">{item.name}</h3>
                    <p className="rental-card__specs">{item.specs}</p>

                    <div className="rental-card__price-row">
                      <div>
                        <span className="rental-card__price">{formatPrice(item.price)}</span>
                        <span className="rental-card__price-unit">/ day</span>
                        {rentalDays > 0 && (
                          <div style={{ fontSize: '0.8rem', color: 'var(--rs-cream-dim)', marginTop: '4px' }}>
                            Total: <span style={{color: 'var(--rs-gold)'}}>{formatPrice(item.price * rentalDays)}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* CTA Layout */}
                    <button
                      className={`rental-card__cta ${
                        item.status === 'booked' 
                          ? 'rental-card__cta--booked' 
                          : addedItems[item.id] 
                            ? 'rental-card__cta--added' 
                            : 'rental-card__cta--available'
                      }`}
                      onClick={(e) => handleAddToCart(e, item)}
                      disabled={item.status === 'booked' || addedItems[item.id]}
                    >
                      {item.status === 'booked' ? (
                        'Currently Booked'
                      ) : addedItems[item.id] ? (
                        <>
                          <Check size={16} /> Added!
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={16} /> Add to Cart
                        </>
                      )}
                    </button>
                  </div>
                </article>
              </Col>
            ))
          ) : (
            <div className="rental-empty">
              <Search size={48} className="rental-empty__icon" />
              <h3 className="rental-empty__title">No equipment found</h3>
              <p className="rental-empty__text" style={{ color: 'var(--rs-cream-dim)' }}>
                Try adjusting your filters or search query.
              </p>
            </div>
          )}
        </Row>

      </Container>
    </div>
  );
};

EquipmentRental.propTypes = {
  onBack: PropTypes.func,
};

export default EquipmentRental;