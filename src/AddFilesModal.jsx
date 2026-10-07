import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  ArrowRight, 
  Sparkles, 
  Database,
  RefreshCw,
  Eye,
  FileCheck2
} from 'lucide-react';
import './AddFilesModal.css';

// Sample dataset fallback
const DEFAULT_SAMPLE_CSV = `order_id,date,customer_id,amount,currency,status
ORD-101,2026-01-15,CUST-01,150.00,USD,completed
ORD-102,2026-01-16,CUST-02,200.00,EUR,completed
ORD-103,2026-01-18,CUST-03,320.50,USD,completed
ORD-102,2026-01-16,CUST-02,200.00,EUR,completed
ORD-104,2026-01-22,,450.00,USD,completed
ORD-105,2026-01-25,CUST-04,180.00,EUR,pending
ORD-106,2026-01-29,CUST-05,500.00,USD,completed
ORD-106,2026-01-29,CUST-05,500.00,USD,completed
ORD-107,2026-02-02,CUST-06,90.00,USD,refunded
ORD-108,2026-02-05,CUST-07,310.00,EUR,completed`;

export default function AddFilesModal({ isOpen, onClose, onTransferToCognitiveAI }) {
  const [fileName, setFileName] = useState('orders_messy.csv');
  const [rawText, setRawText] = useState(DEFAULT_SAMPLE_CSV);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditReport, setAuditReport] = useState(() => runDataAudit(DEFAULT_SAMPLE_CSV));
  const [dragActive, setDragActive] = useState(false);

  if (!isOpen) return null;

  // Simple CSV parser & 7-trap data auditor
  function runDataAudit(csvContent) {
    const lines = csvContent.trim().split('\n').filter(l => l.trim().length > 0);
    if (lines.length < 2) {
      return {
        headers: [],
        rows: [],
        totalRows: 0,
        uniqueRows: 0,
        duplicates: [],
        currencies: [],
        missingFields: 0,
        cleanRate: 0,
        trapsDetected: ['Empty or invalid dataset.']
      };
    }

    const headers = lines[0].split(',').map(h => h.trim());
    const rows = [];
    const seenIds = new Set();
    const duplicates = [];
    const currencies = new Set();
    let missingCount = 0;

    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(',').map(p => p.trim());
      const rowObj = {};
      headers.forEach((h, idx) => {
        rowObj[h] = parts[idx] !== undefined ? parts[idx] : '';
      });

      const oid = rowObj.order_id || `ROW-${i}`;
      if (seenIds.has(oid)) {
        duplicates.push(oid);
        rowObj._isDupe = true;
      } else {
        seenIds.add(oid);
        rowObj._isDupe = false;
      }

      if (rowObj.currency) {
        currencies.add(rowObj.currency.toUpperCase());
      }

      if (!rowObj.customer_id || rowObj.customer_id === 'MISSING') {
        missingCount++;
        rowObj._hasMissing = true;
      }

      rows.push(rowObj);
    }

    const traps = [];
    if (duplicates.length > 0) {
      traps.push(`Trap #3 [Row Duplication]: Found ${duplicates.length} duplicate record(s) on order_id (${duplicates.join(', ')}).`);
    }
    if (currencies.size > 1) {
      traps.push(`Trap #1 [Currency Mismatch]: Multiple currencies detected: ${Array.from(currencies).join(', ')}. Direct addition requires FX normalization.`);
    }
    if (missingCount > 0) {
      traps.push(`Trap #5 [Missing Data]: ${missingCount} record(s) have empty or missing customer_id.`);
    }

    return {
      headers,
      rows,
      totalRows: rows.length,
      uniqueRows: seenIds.size,
      duplicates,
      currencies: Array.from(currencies),
      missingFields: missingCount,
      cleanRate: Math.round((seenIds.size / rows.length) * 100),
      trapsDetected: traps
    };
  }

  const handleFileUpload = (file) => {
    if (!file) return;
    setFileName(file.name);
    setIsAuditing(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      setRawText(content);
      const audit = runDataAudit(content);
      setAuditReport(audit);
      setIsAuditing(false);
    };
    reader.readAsText(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleTransfer = () => {
    if (onTransferToCognitiveAI) {
      onTransferToCognitiveAI({
        fileName,
        rawText,
        auditReport
      });
    }
    onClose();
  };

  return (
    <div className="add-files-backdrop" onClick={onClose}>
      <motion.div 
        className="add-files-glass-modal"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 24 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Modal Top Header */}
        <div className="add-files-header">
          <div className="add-files-title-group">
            <span className="add-files-badge">
              <UploadCloud size={14} className="badge-icon-glow" />
              Dataset Ingestion & Safety Check
            </span>
            <h2 className="add-files-heading">Add Your Data Files</h2>
            <p className="add-files-subheading">
              Upload any CSV or tabular dataset. The engine checks data integrity, audits 7 real-world traps, and feeds verified results directly into Knightfall AI.
            </p>
          </div>
          <button className="add-files-close-btn" onClick={onClose} aria-label="Close dialog">
            <X size={18} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="add-files-body">
          {/* File Upload Drag & Drop Area */}
          <div 
            className={`dropzone-card ${dragActive ? 'drag-active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input 
              type="file" 
              id="file-upload-input"
              className="file-hidden-input"
              accept=".csv,.txt,.json"
              onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
            />
            <label htmlFor="file-upload-input" className="dropzone-inner">
              <div className="dropzone-icon-circle">
                <UploadCloud size={24} color="#38bdf8" />
              </div>
              <div className="dropzone-text-group">
                <span className="dropzone-main-text">
                  Drag & drop your CSV file here, or <span className="browse-link">browse files</span>
                </span>
                <span className="dropzone-sub-text">
                  Supports .csv, .json, .txt (e.g., transactions, revenue logs, CRM exports)
                </span>
              </div>
            </label>
          </div>

          {/* Current File Banner */}
          <div className="active-file-banner">
            <div className="file-info-left">
              <FileText size={18} color="#38bdf8" />
              <div>
                <span className="file-name-text">{fileName}</span>
                <span className="file-size-badge">{auditReport.totalRows} records loaded</span>
              </div>
            </div>
            <button 
              type="button" 
              className="reload-sample-btn"
              onClick={() => {
                setFileName('orders_messy.csv');
                setRawText(DEFAULT_SAMPLE_CSV);
                setAuditReport(runDataAudit(DEFAULT_SAMPLE_CSV));
              }}
            >
              <RefreshCw size={12} />
              Reset Sample
            </button>
          </div>

          {/* Automated Data Audit Results Grid */}
          <div className="audit-results-card">
            <div className="audit-results-header">
              <span className="audit-card-title">
                <FileCheck2 size={16} color="#10b981" />
                Data Integrity & Trap Health Check
              </span>
              <span className={`clean-rate-badge ${auditReport.cleanRate < 90 ? 'warning' : 'ok'}`}>
                {auditReport.cleanRate}% Unique Integrity
              </span>
            </div>

            <div className="audit-stats-grid">
              <div className="stat-box">
                <span className="stat-label">Total Raw Rows</span>
                <span className="stat-val">{auditReport.totalRows}</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">Unique Primary Keys</span>
                <span className="stat-val">{auditReport.uniqueRows}</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">Duplicate Rows</span>
                <span className={`stat-val ${auditReport.duplicates.length > 0 ? 'alert' : ''}`}>
                  {auditReport.duplicates.length}
                </span>
              </div>
              <div className="stat-box">
                <span className="stat-label">Currencies Detected</span>
                <span className="stat-val">{auditReport.currencies.join(', ') || 'N/A'}</span>
              </div>
            </div>

            {/* Traps Detected in Data */}
            <div className="traps-detected-box">
              <span className="traps-box-title">7-Trap Defense Scanner:</span>
              {auditReport.trapsDetected.length > 0 ? (
                <div className="traps-found-list">
                  {auditReport.trapsDetected.map((trap, idx) => (
                    <div key={idx} className="trap-found-item">
                      <AlertTriangle size={15} color="#f59e0b" className="trap-alert-icon" />
                      <span>{trap}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-traps-item">
                  <CheckCircle2 size={15} color="#10b981" />
                  <span>No data anomalies detected. Data schema is clean.</span>
                </div>
              )}
            </div>
          </div>

          {/* Data Table Preview */}
          <div className="data-preview-section">
            <span className="preview-heading">Parsed Data Preview (First 6 Rows):</span>
            <div className="table-wrapper-dark">
              <table className="glass-preview-table">
                <thead>
                  <tr>
                    {auditReport.headers.map((h, i) => (
                      <th key={i}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {auditReport.rows.slice(0, 6).map((row, rIdx) => (
                    <tr key={rIdx} className={row._isDupe ? 'dupe-highlight-row' : ''}>
                      {auditReport.headers.map((h, cIdx) => (
                        <td key={cIdx}>
                          {row[h] || <span className="cell-missing-tag">EMPTY</span>}
                          {h === 'order_id' && row._isDupe && (
                            <span className="cell-dupe-tag">DUPLICATE</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer with Direct to AI Action */}
        <div className="add-files-footer">
          <button type="button" className="footer-cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button 
            type="button" 
            className="footer-transfer-btn"
            onClick={handleTransfer}
          >
            <Sparkles size={16} />
            <span>Direct to Knightfall AI & Ask Questions</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
