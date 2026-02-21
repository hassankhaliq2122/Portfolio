import React, { useState, useEffect, useCallback } from "react";
import {
  BarChart3,
  Users,
  Flame,
  TrendingUp,
  Calendar,
  Search,
  Trash2,
  Eye,
  X,
  Loader2,
  ChevronDown,
  LogOut,
} from "lucide-react";
import "./AdminLeads.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const AdminLeads = () => {
  // Auth
  const [token, setToken] = useState(localStorage.getItem("admin_token") || "");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Data
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // Filters
  const [filters, setFilters] = useState({
    priority: "",
    status: "",
    budgetRange: "",
    country: "",
    search: "",
  });

  // Modals
  const [deleteModal, setDeleteModal] = useState(null);
  const [viewLead, setViewLead] = useState(null);

  // Toast
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Auth request helper
  const authFetch = useCallback(
    async (url, options = {}) => {
      const res = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...options.headers,
        },
      });
      if (res.status === 401) {
        setToken("");
        localStorage.removeItem("admin_token");
        throw new Error("Session expired. Please log in again.");
      }
      return res;
    },
    [token],
  );

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setToken(data.token);
      localStorage.setItem("admin_token", data.token);
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("admin_token");
  };

  // Fetch stats
  const fetchStats = useCallback(async () => {
    try {
      const res = await authFetch(`${API_URL}/api/leads/stats`);
      const data = await res.json();
      if (res.ok) setStats(data);
    } catch (err) {
      console.error("Stats fetch error:", err.message);
    }
  }, [authFetch]);

  // Fetch leads
  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: currentPage, limit: 20 });
      Object.entries(filters).forEach(([k, v]) => {
        if (v) params.append(k, v);
      });
      const res = await authFetch(`${API_URL}/api/leads?${params}`);
      const data = await res.json();
      if (res.ok) {
        setLeads(data.leads);
        setTotalCount(data.totalCount);
        setTotalPages(data.totalPages);
      }
    } catch (err) {
      console.error("Leads fetch error:", err.message);
    } finally {
      setLoading(false);
    }
  }, [authFetch, currentPage, filters]);

  useEffect(() => {
    if (token) {
      fetchStats();
      fetchLeads();
    }
  }, [token, fetchStats, fetchLeads]);

  // Update lead status
  const updateLeadStatus = async (id, status) => {
    try {
      const res = await authFetch(`${API_URL}/api/leads/${id}`, {
        method: "PUT",
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l._id === id ? { ...l, status } : l)),
        );
        fetchStats();
        showToast(`Status updated to "${status}"`);
      }
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  // Delete lead
  const deleteLead = async (id) => {
    try {
      const res = await authFetch(`${API_URL}/api/leads/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l._id !== id));
        setDeleteModal(null);
        fetchStats();
        showToast("Lead deleted successfully");
      }
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  // Mark as read
  const markAsRead = async (lead) => {
    if (lead.isRead) return;
    try {
      await authFetch(`${API_URL}/api/leads/${lead._id}`, {
        method: "PUT",
        body: JSON.stringify({ isRead: true }),
      });
      setLeads((prev) =>
        prev.map((l) => (l._id === lead._id ? { ...l, isRead: true } : l)),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      priority: "",
      status: "",
      budgetRange: "",
      country: "",
      search: "",
    });
    setCurrentPage(1);
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "High":
        return "priority-high";
      case "Medium":
        return "priority-medium";
      default:
        return "priority-low";
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // LOGIN SCREEN
  if (!token) {
    return (
      <div className="leads-login-page">
        <div className="leads-login-card">
          <div className="leads-login-header">
            <div className="leads-login-icon">
              <BarChart3 size={28} />
            </div>
            <h1>Lead Management</h1>
            <p>Sign in to access your CRM dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="leads-login-form">
            <div className="leads-login-field">
              <label>Email</label>
              <input
                type="email"
                placeholder="admin@company.com"
                value={loginForm.email}
                onChange={(e) =>
                  setLoginForm((p) => ({ ...p, email: e.target.value }))
                }
                required
              />
            </div>
            <div className="leads-login-field">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm((p) => ({ ...p, password: e.target.value }))
                }
                required
              />
            </div>
            {loginError && (
              <div className="leads-login-error">{loginError}</div>
            )}
            <button
              type="submit"
              className="leads-login-btn"
              disabled={loginLoading}
            >
              {loginLoading ? (
                <Loader2 size={18} className="spin" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // DASHBOARD
  return (
    <div className="leads-dashboard">
      {/* Toast */}
      {toast && (
        <div className={`leads-toast ${toast.type}`}>{toast.message}</div>
      )}

      {/* Header */}
      <header className="leads-topbar">
        <div className="leads-topbar-left">
          <BarChart3 size={24} className="leads-topbar-icon" />
          <h1>Lead Management</h1>
        </div>
        <button onClick={handleLogout} className="leads-logout-btn">
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </header>

      <div className="leads-content">
        {/* Stats Cards */}
        {stats ? (
          <div className="leads-stats-grid">
            <div className="leads-stat-card">
              <div className="leads-stat-icon stat-total">
                <Users size={20} />
              </div>
              <div className="leads-stat-info">
                <span className="leads-stat-number">{stats.total}</span>
                <span className="leads-stat-label">Total Leads</span>
              </div>
            </div>
            <div className="leads-stat-card">
              <div className="leads-stat-icon stat-high">
                <Flame size={20} />
              </div>
              <div className="leads-stat-info">
                <span className="leads-stat-number">{stats.highPriority}</span>
                <span className="leads-stat-label">High Priority</span>
              </div>
            </div>
            <div className="leads-stat-card">
              <div className="leads-stat-icon stat-converted">
                <TrendingUp size={20} />
              </div>
              <div className="leads-stat-info">
                <span className="leads-stat-number">{stats.converted}</span>
                <span className="leads-stat-label">Converted</span>
              </div>
            </div>
            <div className="leads-stat-card">
              <div className="leads-stat-icon stat-month">
                <Calendar size={20} />
              </div>
              <div className="leads-stat-info">
                <span className="leads-stat-number">{stats.thisMonth}</span>
                <span className="leads-stat-label">This Month</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="leads-stats-grid">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="leads-stat-card skeleton" />
            ))}
          </div>
        )}

        {/* Analytics */}
        {stats && stats.monthlyData && stats.monthlyData.length > 0 && (
          <div className="leads-analytics-section">
            <div className="leads-analytics-card">
              <h3>Leads Per Month</h3>
              <div className="leads-chart">
                {stats.monthlyData.map((m, i) => {
                  const maxCount = Math.max(
                    ...stats.monthlyData.map((d) => d.count),
                    1,
                  );
                  const height = (m.count / maxCount) * 100;
                  return (
                    <div key={i} className="leads-chart-bar-wrapper">
                      <span className="leads-chart-count">{m.count}</span>
                      <div
                        className="leads-chart-bar"
                        style={{ height: `${Math.max(height, 8)}%` }}
                      />
                      <span className="leads-chart-label">
                        {MONTHS[m._id.month - 1]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="leads-analytics-card leads-conversion-card">
              <h3>Conversion Rate</h3>
              <div className="leads-conversion-ring">
                <svg viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="10"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="url(#convGrad)"
                    strokeWidth="10"
                    strokeDasharray={`${(stats.conversionRate / 100) * 314} 314`}
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                  />
                  <defs>
                    <linearGradient id="convGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="leads-conversion-pct">
                  {stats.conversionRate}%
                </span>
              </div>
              <p className="leads-conversion-sub">
                {stats.converted} of {stats.total} leads converted
              </p>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="leads-filters">
          <div className="leads-search-wrapper">
            <Search size={16} className="leads-search-icon" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="leads-search-input"
            />
          </div>
          <div className="leads-filter-selects">
            <select
              value={filters.priority}
              onChange={(e) => handleFilterChange("priority", e.target.value)}
            >
              <option value="">All Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
            >
              <option value="">All Status</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Converted">Converted</option>
              <option value="Closed">Closed</option>
            </select>
            <select
              value={filters.budgetRange}
              onChange={(e) =>
                handleFilterChange("budgetRange", e.target.value)
              }
            >
              <option value="">All Budgets</option>
              <option value="$2k – $5k">$2k – $5k</option>
              <option value="$5k – $10k">$5k – $10k</option>
              <option value="$10k – $20k">$10k – $20k</option>
              <option value="$20k+">$20k+</option>
              <option value="Not sure yet">Not sure yet</option>
            </select>
            {Object.values(filters).some(Boolean) && (
              <button onClick={clearFilters} className="leads-clear-btn">
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Leads Table */}
        <div className="leads-table-wrapper">
          {loading ? (
            <div className="leads-table-loading">
              <Loader2 size={32} className="spin" />
              <p>Loading leads...</p>
            </div>
          ) : leads.length === 0 ? (
            <div className="leads-empty">
              <Users size={48} />
              <h3>No leads found</h3>
              <p>
                {Object.values(filters).some(Boolean)
                  ? "Try adjusting your filters"
                  : "Leads will appear here when someone submits the contact form"}
              </p>
            </div>
          ) : (
            <>
              <table className="leads-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Country</th>
                    <th>Budget</th>
                    <th>Priority</th>
                    <th>Score</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead._id} className={!lead.isRead ? "unread" : ""}>
                      <td>
                        <div className="leads-name-cell">
                          {!lead.isRead && <div className="unread-dot" />}
                          <div>
                            <span className="leads-name">{lead.name}</span>
                            <span className="leads-email">{lead.email}</span>
                          </div>
                        </div>
                      </td>
                      <td>{lead.country}</td>
                      <td>
                        <span className="leads-budget">{lead.budgetRange}</span>
                      </td>
                      <td>
                        <span
                          className={`leads-priority-badge ${getPriorityClass(lead.priority)}`}
                        >
                          {lead.priority}
                        </span>
                      </td>
                      <td>
                        <span className="leads-score">{lead.leadScore}/12</span>
                      </td>
                      <td>
                        <div className="leads-status-select-wrapper">
                          <select
                            value={lead.status}
                            onChange={(e) =>
                              updateLeadStatus(lead._id, e.target.value)
                            }
                            className={`leads-status-select status-${lead.status.toLowerCase()}`}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Converted">Converted</option>
                            <option value="Closed">Closed</option>
                          </select>
                          <ChevronDown
                            size={12}
                            className="leads-status-chevron"
                          />
                        </div>
                      </td>
                      <td className="leads-date">
                        {formatDate(lead.createdAt)}
                      </td>
                      <td>
                        <div className="leads-actions">
                          <button
                            onClick={() => {
                              setViewLead(lead);
                              markAsRead(lead);
                            }}
                            className="leads-action-btn view"
                            title="View Details"
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            onClick={() => setDeleteModal(lead)}
                            className="leads-action-btn delete"
                            title="Delete"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="leads-pagination">
                  <span className="leads-pagination-info">
                    Showing {(currentPage - 1) * 20 + 1}–
                    {Math.min(currentPage * 20, totalCount)} of {totalCount}
                  </span>
                  <div className="leads-pagination-btns">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => p - 1)}
                    >
                      Previous
                    </button>
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => p + 1)}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* View Lead Modal */}
      {viewLead && (
        <div className="leads-modal-overlay" onClick={() => setViewLead(null)}>
          <div className="leads-modal" onClick={(e) => e.stopPropagation()}>
            <div className="leads-modal-header">
              <h2>Lead Details</h2>
              <button
                onClick={() => setViewLead(null)}
                className="leads-modal-close"
              >
                <X size={20} />
              </button>
            </div>
            <div className="leads-modal-body">
              <div className="leads-modal-badges">
                <span
                  className={`leads-priority-badge ${getPriorityClass(viewLead.priority)}`}
                >
                  {viewLead.priority} Priority
                </span>
                <span className="leads-score-badge">
                  Score: {viewLead.leadScore}/12
                </span>
              </div>
              <div className="leads-modal-grid">
                <div className="leads-modal-field">
                  <label>Name</label>
                  <p>{viewLead.name}</p>
                </div>
                <div className="leads-modal-field">
                  <label>Email</label>
                  <p>{viewLead.email}</p>
                </div>
                <div className="leads-modal-field">
                  <label>Company</label>
                  <p>{viewLead.company || "Not provided"}</p>
                </div>
                <div className="leads-modal-field">
                  <label>Country</label>
                  <p>{viewLead.country}</p>
                </div>
                <div className="leads-modal-field">
                  <label>Budget</label>
                  <p>{viewLead.budgetRange}</p>
                </div>
                <div className="leads-modal-field">
                  <label>Project Type</label>
                  <p>{viewLead.projectType}</p>
                </div>
                <div className="leads-modal-field">
                  <label>Status</label>
                  <p>{viewLead.status}</p>
                </div>
                <div className="leads-modal-field">
                  <label>Date</label>
                  <p>{formatDate(viewLead.createdAt)}</p>
                </div>
              </div>
              <div className="leads-modal-message">
                <label>Message</label>
                <p>{viewLead.message}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div
          className="leads-modal-overlay"
          onClick={() => setDeleteModal(null)}
        >
          <div
            className="leads-modal leads-modal-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="leads-modal-header">
              <h2>Delete Lead</h2>
              <button
                onClick={() => setDeleteModal(null)}
                className="leads-modal-close"
              >
                <X size={20} />
              </button>
            </div>
            <div className="leads-modal-body">
              <p className="leads-delete-text">
                Are you sure you want to delete the lead from{" "}
                <strong>{deleteModal.name}</strong>? This action cannot be
                undone.
              </p>
              <div className="leads-delete-actions">
                <button
                  onClick={() => setDeleteModal(null)}
                  className="leads-cancel-btn"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteLead(deleteModal._id)}
                  className="leads-confirm-delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLeads;
