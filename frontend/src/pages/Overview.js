import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  AlertTriangle,
  Bug,
  Server,
  TrendingUp,
  TrendingDown,
  Activity,
  Globe,
  Bell,
  Search,
  X,
  Trash2,
  RotateCcw,
  Lock,
  AlertOctagon
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line
} from 'recharts';
import './Overview.css';
import useEventStream from '../hooks/useEventStream';

const API_BASE_URL = process.env.REACT_APP_BACKEND_API_URL || 'http://localhost:8000';

const DEFAULT_OVERVIEW_DATA = {
  stats: {
    activeThreats: { value: 0, change: '0%', trend: 'up' },
    alertsToday: { value: 0, change: '0%', trend: 'up' },
    vulnerabilities: { value: 0, change: '0%', trend: 'up' },
    protectedAssets: { value: 0, change: '0%', trend: 'up' }
  },
  threatActivity: [],
  severityDistribution: [],
  attackTypes: [],
  networkTraffic: [],
  recentAlerts: [],
  threatOrigins: []
};

const asArray = (value) => (Array.isArray(value) ? value : []);

const Overview = () => {
  const navigate = useNavigate();
  const [overviewData, setOverviewData] = useState(DEFAULT_OVERVIEW_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [assetCount, setAssetCount] = useState(0);

  // Reset All modal state
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [resetPassword, setResetPassword] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  const handleResetAll = async () => {
    if (!resetPassword.trim()) {
      setResetError('Please enter your password.');
      return;
    }
    setResetLoading(true);
    setResetError('');
    try {
      // Get the currently logged-in user's email from localStorage
      const stored = localStorage.getItem('userProfile');
      const profile = stored ? JSON.parse(stored) : {};
      const email = (profile.email || '').trim();
      if (!email) {
        setResetError('Could not determine the logged-in user. Please log in again.');
        setResetLoading(false);
        return;
      }
      const response = await fetch(`${API_BASE_URL}/api/reset-all`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password: resetPassword }),
      });
      const data = await response.json();
      if (!response.ok) {
        setResetError(data.message || 'Reset failed. Please try again.');
        setResetLoading(false);
        return;
      }
      setResetSuccess(true);
      setResetPassword('');
      // Refresh overview data after reset
      setTimeout(() => {
        setIsResetModalOpen(false);
        setResetSuccess(false);
        fetchOverview();
      }, 2000);
    } catch (err) {
      setResetError('Server error. Please try again later.');
    } finally {
      setResetLoading(false);
    }
  };

  // Notifications state
  const [notifications, setNotifications] = useState([]);
  const [notificationsLoading, setNotificationsLoading] = useState(false);

  const fetchAssetCount = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/assets`, { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setAssetCount(Array.isArray(data) ? data.length : 0);
      }
    } catch { /* silently fail */ }
  };

  const fetchOverview = async () => {
    setErrorMessage('');
    try {
      const response = await fetch(`${API_BASE_URL}/api/overview`);
      let payload = {};
      try {
        payload = await response.json();
      } catch (error) {
        payload = {};
      }

      if (!response.ok) {
        throw new Error(payload.message || 'Failed to load overview data.');
      }

      setOverviewData({
        stats: payload.stats || DEFAULT_OVERVIEW_DATA.stats,
        threatActivity: asArray(payload.threatActivity),
        severityDistribution: asArray(payload.severityDistribution),
        attackTypes: asArray(payload.attackTypes),
        networkTraffic: asArray(payload.networkTraffic),
        recentAlerts: asArray(payload.recentAlerts).filter(
          (alert) => !(alert.message || '').toLowerCase().includes('session hijacking')
        ),
        threatOrigins: asArray(payload.threatOrigins)
      });
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNotifications = useCallback(async () => {
    setNotificationsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/notifications`);
      if (response.ok) {
        const data = await response.json();
        setNotifications(asArray(data.notifications));
      }
    } catch (err) {
      // Silently fail – notifications are non-critical
    } finally {
      setNotificationsLoading(false);
    }
  }, []);

  const dismissNotification = async (notifId) => {
    // Optimistic removal
    setNotifications((prev) => prev.filter((n) => n.id !== notifId));
    try {
      await fetch(`${API_BASE_URL}/api/notifications/${notifId}`, {
        method: 'DELETE'
      });
    } catch {
      // Re-fetch if the delete failed
      fetchNotifications();
    }
  };

  const clearAllNotifications = async () => {
    setNotifications([]);
    try {
      await fetch(`${API_BASE_URL}/api/notifications`, {
        method: 'DELETE'
      });
    } catch {
      fetchNotifications();
    }
  };

  const todayName = new Date().toLocaleDateString('en-US', { weekday: 'short' });
  const threatsToday = (overviewData.threatActivity ?? []).find(d => d.name === todayName)?.threats ?? 0;
  const yesterdayName = new Date(Date.now() - 86400000).toLocaleDateString('en-US', { weekday: 'short' });
  const threatsYesterday = (overviewData.threatActivity ?? []).find(d => d.name === yesterdayName)?.threats ?? 0;
  const threatsTodayChange = (() => {
    if (threatsYesterday <= 0) return threatsToday > 0 ? '+100%' : '0%';
    const pct = Math.round(((threatsToday - threatsYesterday) / threatsYesterday) * 100);
    return (pct >= 0 ? '+' : '') + pct + '%';
  })();
  const threatsTodayTrend = threatsToday >= threatsYesterday ? 'up' : 'down';

  const stats = [
    {
      title: 'Active Threats',
      value: String(overviewData.stats.activeThreats?.value ?? 0),
      change: overviewData.stats.activeThreats?.change || '0%',
      trend: overviewData.stats.activeThreats?.trend || 'up',
      icon: Shield,
      color: 'red'
    },
    {
      title: 'Threats Today',
      value: String(threatsToday),
      change: threatsTodayChange,
      trend: threatsTodayTrend,
      icon: AlertTriangle,
      color: 'yellow'
    },
    {
      title: 'Vulnerabilities',
      value: String(overviewData.stats.vulnerabilities?.value ?? 0),
      change: overviewData.stats.vulnerabilities?.change || '0%',
      trend: overviewData.stats.vulnerabilities?.trend || 'up',
      icon: Bug,
      color: 'orange'
    },
    {
      title: 'Assets',
      value: String(assetCount),
      sub: 'Monitored assets',
      icon: Server,
      color: 'cyan',
      path: '/assets'
    }
  ];

  const threatData = overviewData.threatActivity;
  const severityData = overviewData.severityDistribution;
  const attackTypesData = overviewData.attackTypes;
  const networkData = overviewData.networkTraffic;
  const recentAlerts = overviewData.recentAlerts;
  const threatOrigins = overviewData.threatOrigins;
  const maxOriginCount = Math.max(...threatOrigins.map((item) => item.count || 0), 1);

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const searchContainerRef = useRef(null);

  const searchableItems = [
    { title: 'Security Overview', path: '/overview', type: 'Page', keywords: ['dashboard', 'home', 'stats'] },
    { title: 'Threat Activity', path: '/overview', hash: '#threat-activity', type: 'Section', keywords: ['charts', 'graphs', 'detected', 'blocked'] },
    { title: 'Severity Distribution', path: '/overview', hash: '#severity-distribution', type: 'Section', keywords: ['pie chart', 'severity'] },
    { title: 'Attack Names', path: '/overview', hash: '#attack-names', type: 'Section', keywords: ['bar chart', 'types'] },
    { title: 'Network Traffic', path: '/overview', hash: '#network-traffic', type: 'Section', keywords: ['line chart', 'inbound', 'outbound'] },
    { title: 'Recent Alerts', path: '/overview', hash: '#recent-alerts', type: 'Section', keywords: ['notifications', 'logs'] },
    { title: 'Threat Origins', path: '/overview', hash: '#threat-origins', type: 'Section', keywords: ['globe', 'map', 'ip'] },
    { title: 'Threats', path: '/threats', type: 'Page', keywords: ['alerts', 'incidents', 'attacks', 'security'] },
    { title: 'Vulnerabilities', path: '/vulnerabilities', type: 'Page', keywords: ['cve', 'bugs', 'exploits'] },
    { title: 'Attack Frequency', path: '/vulnerabilities', hash: '#attack-frequency', type: 'Section', keywords: ['bar chart', 'cve'] },
    { title: 'Attack Share', path: '/vulnerabilities', hash: '#attack-share', type: 'Section', keywords: ['doughnut chart', 'pie', 'cve'] },
    { title: 'Attack Timeline', path: '/vulnerabilities', hash: '#attack-timeline', type: 'Section', keywords: ['line chart', 'trend', 'cve'] },
    { title: 'Target IP vs Attack Type', path: '/vulnerabilities', hash: '#target-ip', type: 'Section', keywords: ['matrix', 'table', 'cve'] },
    { title: 'Assets', path: '/assets', type: 'Page', keywords: ['servers', 'endpoints', 'devices'] },
    { title: 'Threat Map', path: '/threat-map', type: 'Page', keywords: ['globe', 'origins', 'world'] },
    { title: 'Reports', path: '/reports', type: 'Page', keywords: ['analytics', 'data', 'export', 'logs'] },
    { title: 'AI Assistant', path: '/ai-assistant', type: 'Page', keywords: ['bot', 'chat', 'help', 'artificial intelligence'] },
    { title: 'Blockchain', path: '/blockchain', type: 'Page', keywords: ['crypto', 'ledger', 'decentralized'] },
    { title: 'Settings', path: '/settings', type: 'Page', keywords: ['preferences', 'profile', 'account', 'theme'] },
    { title: 'Profile Settings', path: '/settings', hash: '#profile', type: 'Section', keywords: ['user', 'avatar', 'name', 'email'] },
    { title: 'Security Settings', path: '/settings', hash: '#security', type: 'Section', keywords: ['password', '2fa', 'sessions'] },
    { title: 'Notification Preferences', path: '/settings', hash: '#notifications', type: 'Section', keywords: ['email', 'push', 'alerts'] },
    { title: 'Appearance', path: '/settings', hash: '#appearance', type: 'Section', keywords: ['theme', 'dark mode', 'colors'] },
    { title: 'Integrations', path: '/settings', hash: '#integrations', type: 'Section', keywords: ['slack', 'splunk', 'siem'] },
    { title: 'API Keys', path: '/settings', hash: '#api', type: 'Section', keywords: ['tokens', 'developer'] }
  ];

  const filteredItems = searchableItems.filter(item => 
    searchQuery && (
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  );

  const handleSearchSelect = (item) => {
    if (item.path === '/overview' && item.hash) {
      const el = document.getElementById(item.hash.substring(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(item.path + (item.hash || ''));
    }
    setIsSearchOpen(false);
    setSearchQuery('');
  };



  // SSE-driven refresh: refetch when backend pushes an event
  useEventStream('alerts.changed', () => fetchOverview());
  useEventStream('logs.received', () => fetchOverview());
  useEventStream('notifications.new', () => fetchNotifications());

  useEffect(() => {
    fetchOverview();
    fetchNotifications();
    fetchAssetCount();

    // Fallback safety-net poll (60s) in case SSE connection drops
    const pollTimer = setInterval(() => {
      fetchOverview();
      fetchNotifications();
    }, 60000);

    // Fast poll for asset count so card stays in sync with Assets page
    const assetPollTimer = setInterval(() => {
      fetchAssetCount();
    }, 10000);

    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(pollTimer);
      clearInterval(assetPollTimer);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const unreadCount = notifications.length;

  return (
    <>
    <div className="overview">
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">Security Overview</h1>
          <p className="page-subtitle">Real-time security monitoring and threat analysis</p>
        </div>
        <div className="header-search" ref={searchContainerRef}>
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            ref={searchRef}
            placeholder="Search alerts, incidents, logs..." 
            className="search-input" 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => { if (searchQuery) setIsSearchOpen(true); }}
          />
          <span className="search-shortcut">⌘K</span>
          
          {isSearchOpen && searchQuery && (
            <div className="search-dropdown-menu">
              {filteredItems.length > 0 ? (
                filteredItems.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="search-dropdown-item"
                    onClick={() => handleSearchSelect(item)}
                  >
                    <span className="search-item-title">{item.title}</span>
                    <span className="search-item-type">{item.type}</span>
                  </div>
                ))
              ) : (
                <div className="search-dropdown-empty">No results found for "{searchQuery}"</div>
              )}
            </div>
          )}
        </div>

        <div className="header-actions">

          <div className="notification-container" ref={notificationRef}>
            <button
              className={`notification-trigger ${isNotificationOpen ? 'active' : ''}`}
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="notification-badge">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {isNotificationOpen && (
              <div className="notification-dropdown-menu">
                <div className="dropdown-header">
                  <span>Notifications</span>
                  {notifications.length > 0 && (
                    <button
                      className="clear-all-btn"
                      onClick={clearAllNotifications}
                      title="Clear all notifications"
                    >
                      <Trash2 size={14} />
                      Clear all
                    </button>
                  )}
                </div>
                <div className="notification-list">
                  {notificationsLoading && notifications.length === 0 && (
                    <div className="notification-empty">Loading...</div>
                  )}
                  {!notificationsLoading && notifications.length === 0 && (
                    <div className="notification-empty">
                      <Bell size={28} className="notification-empty-icon" />
                      <span>No notifications</span>
                      <span className="notification-empty-sub">
                        You're all caught up!
                      </span>
                    </div>
                  )}
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`notification-item ${notif.severity}`}
                    >
                      <div className="notification-item-header">
                        <span className={`severity-dot ${notif.severity}`}></span>
                        <span className="notification-message">{notif.message}</span>
                        <button
                          className="notification-dismiss"
                          onClick={(e) => {
                            e.stopPropagation();
                            dismissNotification(notif.id);
                          }}
                          title="Dismiss"
                        >
                          <X size={14} />
                        </button>
                      </div>
                      <div className="notification-footer">
                        <span className="notification-source">{notif.source}</span>
                        <span className="notification-time">{notif.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="view-all-link" onClick={() => setIsNotificationOpen(false)}>
                  Close
                </button>
              </div>
            )}
          </div>

          <div className="status-badge">
            <span className="status-dot green"></span>
            Production
          </div>
          <button
            className="btn btn-danger-outline"
            onClick={() => {
              setIsResetModalOpen(true);
              setResetError('');
              setResetPassword('');
              setResetSuccess(false);
              setShowResetPassword(false);
            }}
          >
            <RotateCcw size={16} />
            Reset All
          </button>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`stat-card stat-${stat.color}`}
            onClick={() => stat.path && navigate(stat.path)}
            style={{ cursor: stat.path ? 'pointer' : 'default' }}
          >
            <div className="stat-icon">
              <stat.icon size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-title">{stat.title}</span>
              <div className="stat-value-row">
                <span className="stat-value">{stat.value}</span>
                {stat.trend && (
                  <span className={`stat-change ${stat.trend}`}>
                    {stat.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {stat.change}
                  </span>
                )}
              </div>
              {stat.sub && <span className="stat-sub">{stat.sub}</span>}
            </div>
          </div>
        ))}
      </div>

      {isLoading && <div className="card">Loading overview data...</div>}
      {!isLoading && errorMessage && <div className="card">{errorMessage}</div>}

      <div className="charts-row">
        <div className="card chart-card large" id="threat-activity">
          <div className="card-header">
            <h3 className="card-title">Threat Activity</h3>
            <div className="chart-legend">
              <span className="legend-item">
                <span className="legend-dot cyan"></span>
                Detected
              </span>
              <span className="legend-item">
                <span className="legend-dot green"></span>
                Blocked
              </span>
            </div>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={threatData}>
                <defs>
                  <linearGradient id="threatGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="blockedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a5a" />
                <XAxis dataKey="name" stroke="#6a6a8a" />
                <YAxis stroke="#6a6a8a" />
                <Tooltip
                  contentStyle={{
                    background: '#1a1a3a',
                    border: '1px solid #2a2a5a',
                    borderRadius: '8px'
                  }}
                  itemStyle={{ color: '#fff' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Area
                  type="monotone"
                  dataKey="threats"
                  stroke="#00d4ff"
                  fill="url(#threatGradient)"
                  strokeWidth={2}
                  isAnimationActive={true}
                  animationDuration={900}
                  animationEasing="ease-out"
                />
                <Area
                  type="monotone"
                  dataKey="blocked"
                  stroke="#10b981"
                  fill="url(#blockedGradient)"
                  strokeWidth={2}
                  isAnimationActive={true}
                  animationDuration={900}
                  animationEasing="ease-out"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card chart-card" id="severity-distribution">
          <div className="card-header">
            <h3 className="card-title">Severity Distribution</h3>
          </div>
          <div className="chart-container pie-chart">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  isAnimationActive={true}
                  animationDuration={900}
                  animationEasing="ease-out"
                >
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: '#1a1a3a',
                    border: '1px solid #2a2a5a',
                    borderRadius: '8px'
                  }}
                  itemStyle={{ color: '#fff' }}
                  labelStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="pie-legend">
              {severityData.map((item, index) => (
                <div key={index} className="pie-legend-item">
                  <span className="pie-dot" style={{ background: item.color }}></span>
                  <span className="pie-label">{item.name}</span>
                  <span className="pie-value">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="charts-row">
        <div className="card chart-card" id="attack-names">
          <div className="card-header">
            <h3 className="card-title">Attack Names</h3>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={attackTypesData} layout="vertical" margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a5a" />
                <XAxis type="number" stroke="#6a6a8a" />
                <YAxis dataKey="type" type="category" stroke="#6a6a8a" width={90} tick={{ fontSize: 10 }} interval={0} />
                <Tooltip
                  contentStyle={{
                    background: '#1a1a3a',
                    border: '1px solid #2a2a5a',
                    borderRadius: '8px'
                  }}
                  itemStyle={{ color: '#fff' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar
                  dataKey="count"
                  radius={[0, 4, 4, 0]}
                  isAnimationActive={true}
                  animationDuration={900}
                  animationEasing="ease-out"
                >
                  {attackTypesData.map((entry, index) => {
                    const colors = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#06b6d4', '#f43f5e', '#84cc16', '#a855f7'];
                    return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card chart-card" id="network-traffic">
          <div className="card-header">
            <h3 className="card-title">Network Traffic</h3>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={networkData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a5a" />
                <XAxis dataKey="time" stroke="#6a6a8a" />
                <YAxis stroke="#6a6a8a" />
                <Tooltip
                  contentStyle={{
                    background: '#1a1a3a',
                    border: '1px solid #2a2a5a',
                    borderRadius: '10px'
                  }}
                  itemStyle={{ color: '#fff' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Line
                  type="monotone"
                  dataKey="inbound"
                  stroke="#00d4ff"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={true}
                  animationDuration={900}
                  animationEasing="ease-out"
                />
                <Line
                  type="monotone"
                  dataKey="outbound"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={true}
                  animationDuration={900}
                  animationEasing="ease-out"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bottom-row">
        <div className="card alerts-card" id="recent-alerts">
          <div className="card-header">
            <h3 className="card-title">Recent Alerts</h3>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="alerts-list">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className={`alert-item alert-${alert.type}`}>
                <div className="alert-indicator"></div>
                <div className="alert-content">
                  <p className="alert-message">{alert.message}</p>
                  <div className="alert-meta">
                    <span className="alert-source">{alert.source}</span>
                    <span className="alert-time">{alert.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card threats-origin-card" id="threat-origins">
          <div className="card-header">
            <h3 className="card-title">
              <Globe size={18} />
              Threat Origins
            </h3>
          </div>
          <div className="threats-list">
            {threatOrigins.map((origin, index) => (
              <div key={index} className="threat-origin-item">
                <span className="threat-ip">{origin.ip}</span>
                <div className="threat-bar-container">
                  <div
                    className="threat-bar"
                    style={{ width: `${((origin.count || 0) / maxOriginCount) * 100}%` }}
                  ></div>
                </div>
                <span className="threat-count">{origin.count}</span>
              </div>
            ))}
          </div>
          <div className="world-map-placeholder">
            <Activity size={48} className="map-icon" />
            <span>Live Threat Map</span>
          </div>
        </div>
      </div>
    </div>

      {/* ── Reset All Confirmation Modal ── */}
      {isResetModalOpen && (
        <div className="reset-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) { setIsResetModalOpen(false); setResetPassword(''); setResetError(''); } }}>
          <div className="reset-modal">
            <div className="reset-modal-header">
              <div className="reset-modal-icon">
                <AlertOctagon size={28} />
              </div>
              <h2 className="reset-modal-title">Reset All Data</h2>
              <button className="reset-modal-close" onClick={() => { setIsResetModalOpen(false); setResetPassword(''); setResetError(''); }}>
                <X size={20} />
              </button>
            </div>

            {resetSuccess ? (
              <div className="reset-success-state">
                <div className="reset-success-icon">
                  <svg className="reset-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle className="reset-checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                    <path className="reset-checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                  </svg>
                </div>
                <p className="reset-success-text">All data has been reset successfully!</p>
              </div>
            ) : (
              <>
                <div className="reset-modal-warning">
                  <p>This action will <strong>permanently delete</strong> all of the following:</p>
                  <ul className="reset-warning-list">
                    <li><Trash2 size={14} /> All alerts &amp; threat statuses (DB)</li>
                    <li><Trash2 size={14} /> All report runs &amp; PDF files</li>
                    <li><Trash2 size={14} /> All senders &amp; notifications</li>
                    <li><Trash2 size={14} /> All input logs (input.log)</li>
                    <li><Trash2 size={14} /> All alert data in Excel files (alerts.xlsx)</li>
                    <li><Trash2 size={14} /> Blockchain reset to genesis block</li>
                  </ul>
                  <p className="reset-warning-note">Tables &amp; files remain intact. Only data is erased. This cannot be undone.</p>
                </div>      

                <div className="reset-password-group">
                  <label className="reset-password-label">
                    <Lock size={14} />
                    Confirm your password to proceed
                  </label>
                  <div className="reset-password-input-wrap">
                    <input
                      type={showResetPassword ? 'text' : 'password'}
                      className={`reset-password-input ${resetError ? 'has-error' : ''}`}
                      placeholder="Enter your current password"
                      value={resetPassword}
                      onChange={(e) => { setResetPassword(e.target.value); setResetError(''); }}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleResetAll(); }}
                      autoFocus
                    />
                    <button
                      type="button"
                      className="reset-show-pw-btn"
                      onClick={() => setShowResetPassword(!showResetPassword)}
                    >
                      {showResetPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                  {resetError && <p className="reset-error-msg">{resetError}</p>}
                </div>

                <div className="reset-modal-actions">
                  <button
                    className="btn-reset-cancel"
                    onClick={() => { setIsResetModalOpen(false); setResetPassword(''); setResetError(''); }}
                  >
                    Cancel
                  </button>
                  <button
                    className={`btn-reset-confirm ${resetLoading ? 'loading' : ''}`}
                    onClick={handleResetAll}
                    disabled={resetLoading}
                  >
                    {resetLoading ? (
                      <span className="reset-spinner"></span>
                    ) : (
                      <RotateCcw size={15} />
                    )}
                    {resetLoading ? 'Resetting...' : 'Reset All Data'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Overview;
