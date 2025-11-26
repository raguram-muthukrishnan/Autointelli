import React, { useState, useRef, useEffect } from 'react';
import './DateTimePicker.css';

const DateTimePicker = ({ value, onChange, label, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState({ hour: '12', minute: '00', period: 'PM' });
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [view, setView] = useState('date'); // 'date' or 'time'
  const pickerRef = useRef(null);

  useEffect(() => {
    if (value) {
      const date = new Date(value);
      setSelectedDate(date);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      setSelectedTime({
        hour: (hours % 12 || 12).toString().padStart(2, '0'),
        minute: minutes.toString().padStart(2, '0'),
        period: hours >= 12 ? 'PM' : 'AM'
      });
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonthLastDay - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, prevMonthLastDay - i)
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        date: new Date(year, month, i)
      });
    }

    // Next month days
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        date: new Date(year, month + 1, i)
      });
    }

    return days;
  };

  const formatDisplayValue = () => {
    if (!selectedDate) return placeholder || 'Select date and time';
    
    const dateStr = selectedDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    
    return `${dateStr} at ${selectedTime.hour}:${selectedTime.minute} ${selectedTime.period}`;
  };

  const handleDateSelect = (dayObj) => {
    setSelectedDate(dayObj.date);
    setView('time');
  };

  const handleTimeChange = (type, value) => {
    setSelectedTime(prev => ({ ...prev, [type]: value }));
  };

  const handleConfirm = () => {
    if (selectedDate) {
      const date = new Date(selectedDate);
      let hours = parseInt(selectedTime.hour);
      if (selectedTime.period === 'PM' && hours !== 12) hours += 12;
      if (selectedTime.period === 'AM' && hours === 12) hours = 0;
      
      date.setHours(hours);
      date.setMinutes(parseInt(selectedTime.minute));
      
      const isoString = date.toISOString();
      onChange(isoString);
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    setSelectedDate(null);
    setSelectedTime({ hour: '12', minute: '00', period: 'PM' });
    onChange('');
    setIsOpen(false);
  };

  const changeMonth = (direction) => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  const days = getDaysInMonth(currentMonth);
  const monthYear = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="datetime-picker-wrapper" ref={pickerRef}>
      {label && <label className="datetime-label">{label}</label>}
      
      <div className="datetime-input" onClick={() => setIsOpen(!isOpen)}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        <span className={selectedDate ? 'has-value' : 'placeholder'}>
          {formatDisplayValue()}
        </span>
        {selectedDate && (
          <button
            className="clear-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
          >
            ×
          </button>
        )}
      </div>

      {isOpen && (
        <div className="datetime-dropdown">
          <div className="datetime-tabs">
            <button
              className={`tab-btn ${view === 'date' ? 'active' : ''}`}
              onClick={() => setView('date')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              Date
            </button>
            <button
              className={`tab-btn ${view === 'time' ? 'active' : ''}`}
              onClick={() => setView('time')}
              disabled={!selectedDate}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              Time
            </button>
          </div>

          {view === 'date' ? (
            <div className="calendar-view">
              <div className="calendar-header">
                <button className="nav-btn" onClick={() => changeMonth(-1)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6"/>
                  </svg>
                </button>
                <span className="month-year">{monthYear}</span>
                <button className="nav-btn" onClick={() => changeMonth(1)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </button>
              </div>

              <div className="calendar-weekdays">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <div key={day} className="weekday">{day}</div>
                ))}
              </div>

              <div className="calendar-days">
                {days.map((dayObj, index) => (
                  <button
                    key={index}
                    className={`day-btn ${!dayObj.isCurrentMonth ? 'other-month' : ''} ${
                      isToday(dayObj.date) ? 'today' : ''
                    } ${isSelected(dayObj.date) ? 'selected' : ''}`}
                    onClick={() => handleDateSelect(dayObj)}
                  >
                    {dayObj.day}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="time-view">
              <div className="time-display">
                <div className="time-segment">
                  <button
                    className="time-arrow"
                    onClick={() => {
                      const newHour = (parseInt(selectedTime.hour) % 12) + 1;
                      handleTimeChange('hour', newHour.toString().padStart(2, '0'));
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="18 15 12 9 6 15"/>
                    </svg>
                  </button>
                  <input
                    type="text"
                    className="time-input"
                    value={selectedTime.hour}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      if (val === '' || (parseInt(val) >= 1 && parseInt(val) <= 12)) {
                        handleTimeChange('hour', val.padStart(2, '0'));
                      }
                    }}
                    maxLength={2}
                  />
                  <button
                    className="time-arrow"
                    onClick={() => {
                      const newHour = parseInt(selectedTime.hour) - 1 || 12;
                      handleTimeChange('hour', newHour.toString().padStart(2, '0'));
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </button>
                </div>

                <span className="time-separator">:</span>

                <div className="time-segment">
                  <button
                    className="time-arrow"
                    onClick={() => {
                      const newMin = (parseInt(selectedTime.minute) + 1) % 60;
                      handleTimeChange('minute', newMin.toString().padStart(2, '0'));
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="18 15 12 9 6 15"/>
                    </svg>
                  </button>
                  <input
                    type="text"
                    className="time-input"
                    value={selectedTime.minute}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      if (val === '' || (parseInt(val) >= 0 && parseInt(val) <= 59)) {
                        handleTimeChange('minute', val.padStart(2, '0'));
                      }
                    }}
                    maxLength={2}
                  />
                  <button
                    className="time-arrow"
                    onClick={() => {
                      const newMin = (parseInt(selectedTime.minute) - 1 + 60) % 60;
                      handleTimeChange('minute', newMin.toString().padStart(2, '0'));
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </button>
                </div>

                <div className="time-segment">
                  <button
                    className="time-arrow"
                    onClick={() => handleTimeChange('period', selectedTime.period === 'AM' ? 'PM' : 'AM')}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="18 15 12 9 6 15"/>
                    </svg>
                  </button>
                  <div className="period-display">{selectedTime.period}</div>
                  <button
                    className="time-arrow"
                    onClick={() => handleTimeChange('period', selectedTime.period === 'AM' ? 'PM' : 'AM')}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="quick-times">
                <button
                  className="quick-time-btn"
                  onClick={() => setSelectedTime({ hour: '09', minute: '00', period: 'AM' })}
                >
                  9:00 AM
                </button>
                <button
                  className="quick-time-btn"
                  onClick={() => setSelectedTime({ hour: '12', minute: '00', period: 'PM' })}
                >
                  12:00 PM
                </button>
                <button
                  className="quick-time-btn"
                  onClick={() => setSelectedTime({ hour: '03', minute: '00', period: 'PM' })}
                >
                  3:00 PM
                </button>
                <button
                  className="quick-time-btn"
                  onClick={() => setSelectedTime({ hour: '06', minute: '00', period: 'PM' })}
                >
                  6:00 PM
                </button>
              </div>
            </div>
          )}

          <div className="datetime-actions">
            <button className="action-btn cancel" onClick={() => setIsOpen(false)}>
              Cancel
            </button>
            <button
              className="action-btn confirm"
              onClick={handleConfirm}
              disabled={!selectedDate}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateTimePicker;
