import React from 'react';

// SVG Icon Components - Brand Yellow Color (#F0CE1D)
const brandColor = "#F0CE1D";

// 1. Unified Discovery & Inventory: Search with database/network
export const DiscoveryInventoryIcon = ({ size = 40, color = brandColor }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="8" stroke={color} strokeWidth="2"/>
    <path d="M21 21l-4.35-4.35" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M11 8v6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 11h6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// 2. Real-Time Health & Performance: Activity/pulse monitoring
export const HealthPerformanceIcon = ({ size = 40, color = brandColor }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// 3. Topology & Dependency Mapping: Git branch/workflow style
export const TopologyMappingIcon = ({ size = 40, color = brandColor }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6" cy="6" r="3" stroke={color} strokeWidth="2"/>
    <circle cx="6" cy="18" r="3" stroke={color} strokeWidth="2"/>
    <circle cx="18" cy="18" r="3" stroke={color} strokeWidth="2"/>
    <path d="M6 9v6" stroke={color} strokeWidth="2"/>
    <path d="M9 18h6" stroke={color} strokeWidth="2"/>
  </svg>
);

// 4. Intelligent Alerting & AIOps: Sparkles for AI intelligence
export const IntelligentAlertingIcon = ({ size = 40, color = brandColor }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3v3m0 12v3m9-9h-3M6 12H3m15.364 6.364l-2.121-2.121M7.757 7.757L5.636 5.636m12.728 0l-2.121 2.121M7.757 16.243l-2.121 2.121" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2"/>
  </svg>
);

// 5. Incident Response & Alert Management: Zap/lightning for fast response
export const IncidentResponseIcon = ({ size = 40, color = brandColor }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// 6. Unified Alert Window: Bell for alerts
export const UnifiedAlertWindowIcon = ({ size = 40, color = brandColor }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// 7. Event Aggregation & Noise Reduction: Filter funnel
export const EventAggregationIcon = ({ size = 40, color = brandColor }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// 8. Maintenance Window Filtration: Calendar with check
export const MaintenanceWindowIcon = ({ size = 40, color = brandColor }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke={color} strokeWidth="2"/>
    <line x1="16" y1="2" x2="16" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <line x1="8" y1="2" x2="8" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <line x1="3" y1="10" x2="21" y2="10" stroke={color} strokeWidth="2"/>
    <path d="M9 16l2 2 4-4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// 9. Automated ITSM Ticketing: Ticket with automation
export const ItsmTicketingIcon = ({ size = 40, color = brandColor }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 0 0-2 2v3a2 2 0 1 1 0 4v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3a2 2 0 1 1 0-4V7a2 2 0 0 0-2-2H5z" stroke={color} strokeWidth="2"/>
  </svg>
);

// 10. Low-Code Workflow Builder: Workflow diagram
export const WorkflowBuilderIcon = ({ size = 40, color = brandColor }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="2" width="8" height="4" rx="1" stroke={color} strokeWidth="2"/>
    <rect x="8" y="10" width="8" height="4" rx="1" stroke={color} strokeWidth="2"/>
    <rect x="8" y="18" width="8" height="4" rx="1" stroke={color} strokeWidth="2"/>
    <path d="M12 6v4m0 4v4" stroke={color} strokeWidth="2"/>
  </svg>
);

// 11. Event-Driven Automation: Play with automation
export const EventDrivenIcon = ({ size = 40, color = brandColor }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
    <polygon points="10 8 16 12 10 16 10 8" fill={color}/>
  </svg>
);

// 12. Human-in-the-Loop: User with checkmark
export const HumanInLoopIcon = ({ size = 40, color = brandColor }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="8.5" cy="7" r="4" stroke={color} strokeWidth="2"/>
    <polyline points="17 11 19 13 23 9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// 13. Auto-Remediation Library: Wrench/tool for fixing
export const AutoRemediationIcon = ({ size = 40, color = brandColor }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// 14. Browser-Based Access: Globe/browser
export const BrowserAccessIcon = ({ size = 40, color = brandColor }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
    <line x1="2" y1="12" x2="22" y2="12" stroke={color} strokeWidth="2"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke={color} strokeWidth="2"/>
  </svg>
);

// 15. Zero Trust Security: Lock for security
export const ZeroTrustIcon = ({ size = 40, color = brandColor }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke={color} strokeWidth="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke={color} strokeWidth="2"/>
  </svg>
);

// 16. Multi-Platform Compatibility: Monitor/laptop
export const MultiPlatformIcon = ({ size = 40, color = brandColor }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke={color} strokeWidth="2"/>
    <line x1="8" y1="21" x2="16" y2="21" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <line x1="12" y1="17" x2="12" y2="21" stroke={color} strokeWidth="2"/>
  </svg>
);

// 17. Monitoring & Analytics: Bar chart for analytics
export const MonitoringAnalyticsIcon = ({ size = 40, color = brandColor }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="18" y1="20" x2="18" y2="10" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <line x1="12" y1="20" x2="12" y2="4" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <line x1="6" y1="20" x2="6" y2="14" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// 18. Agent-Based Automation: Bot/robot
export const AgentAutomationIcon = ({ size = 40, color = brandColor }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="11" width="18" height="10" rx="2" stroke={color} strokeWidth="2"/>
    <circle cx="8" cy="16" r="1.5" fill={color}/>
    <circle cx="16" cy="16" r="1.5" fill={color}/>
    <path d="M9 7h6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 7V11" stroke={color} strokeWidth="2"/>
  </svg>
);

// 19. Instant IT Support: Message circle for support
export const InstantSupportIcon = ({ size = 40, color = brandColor }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// 20. Document Querying: magnifying glass with papers
export const DocumentQueryingIcon = ({ size = 40, color = brandColor }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 2H14L18 6V20C18 21.1 17.1 22 16 22H6C4.9 22 4 21.1 4 20V4C4 2.9 4.9 2 6 2Z" stroke={color} strokeWidth="1.5"/>
    <circle cx="14" cy="14" r="4" stroke={color} strokeWidth="1.5" fill="white"/>
    <path d="M17 17L19 19" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// 21. Multi-Channel Access: Mail/email
export const MultiChannelAccessIcon = ({ size = 40, color = brandColor }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke={color} strokeWidth="2"/>
    <polyline points="22,6 12,13 2,6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// 22. Multi-Channel Ticketing: Layers for multiple channels
export const MultiChannelTicketingIcon = ({ size = 40, color = brandColor }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="12 2 2 7 12 12 22 7 12 2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="2 17 12 22 22 17" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="2 12 12 17 22 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// 23. AI-Powered Automation: Zap for automation power
export const AiPoweredAutomationIcon = ({ size = 40, color = brandColor }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// 24. Knowledge Base & Self-Service: Book for knowledge
export const KnowledgeBaseIcon = ({ size = 40, color = brandColor }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// 25. Collaboration & Reporting: Users for collaboration
export const CollaborationReportingIcon = ({ size = 40, color = brandColor }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="9" cy="7" r="4" stroke={color} strokeWidth="2"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// 26. Asset Tracking: Package/box for assets
export const AssetTrackingIcon = ({ size = 40, color = brandColor }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" stroke={color} strokeWidth="2"/>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke={color} strokeWidth="2"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="12" y1="22.08" x2="12" y2="12" stroke={color} strokeWidth="2"/>
  </svg>
);

// 27. Barcode & QR Code Integration: QR code
export const BarcodeQrIcon = ({ size = 40, color = brandColor }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="7" height="7" stroke={color} strokeWidth="2"/>
    <rect x="14" y="3" width="7" height="7" stroke={color} strokeWidth="2"/>
    <rect x="3" y="14" width="7" height="7" stroke={color} strokeWidth="2"/>
    <rect x="14" y="14" width="7" height="7" stroke={color} strokeWidth="2"/>
  </svg>
);

// 28. Software License Management: File with check
export const LicenseManagementIcon = ({ size = 40, color = brandColor }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="14 2 14 8 20 8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 15l2 2 4-4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// 29. Asset Assignment System: Tag for assignment
export const AssetAssignmentIcon = ({ size = 40, color = brandColor }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="7" y1="7" x2="7.01" y2="7" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Extra icons for fallbacks
export const ComplianceIcon = ({ size = 40, color = brandColor }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 12l2 2 4-4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// 30. Change Awareness & Compliance: Shield with check
export const ChangeAwarenessIcon = ({ size = 40, color = brandColor }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 12l2 2 4-4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// 31. Runbooks & Automation: Book with play button
export const RunbooksAutomationIcon = ({ size = 40, color = brandColor }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polygon points="10,8 10,16 16,12" fill={color}/>
  </svg>
);

// Icon selector function
export const getFeatureIcon = (title, description, idx, resetTracker = false, sectionKey = 'default') => {
  const normalizedTitle = title.toLowerCase();
  
  // Direct mapping based on title
  if (normalizedTitle.includes('discovery') && normalizedTitle.includes('inventory')) return <DiscoveryInventoryIcon />;
  if (normalizedTitle.includes('health') && normalizedTitle.includes('performance')) return <HealthPerformanceIcon />;
  if (normalizedTitle.includes('topology') && normalizedTitle.includes('mapping')) return <TopologyMappingIcon />;
  if (normalizedTitle.includes('alerting') && normalizedTitle.includes('aiops')) return <IntelligentAlertingIcon />;
  if (normalizedTitle.includes('incident') && normalizedTitle.includes('response')) return <IncidentResponseIcon />;
  if (normalizedTitle.includes('unified') && normalizedTitle.includes('alert')) return <UnifiedAlertWindowIcon />;
  if (normalizedTitle.includes('aggregation') && normalizedTitle.includes('noise')) return <EventAggregationIcon />;
  if (normalizedTitle.includes('maintenance') && normalizedTitle.includes('window')) return <MaintenanceWindowIcon />;
  if (normalizedTitle.includes('itsm') && normalizedTitle.includes('ticketing')) return <ItsmTicketingIcon />;
  if (normalizedTitle.includes('workflow') && normalizedTitle.includes('builder')) return <WorkflowBuilderIcon />;
  if (normalizedTitle.includes('event-driven') && normalizedTitle.includes('automation')) return <EventDrivenIcon />;
  if (normalizedTitle.includes('human') && normalizedTitle.includes('loop')) return <HumanInLoopIcon />;
  if (normalizedTitle.includes('auto-remediation') && normalizedTitle.includes('library')) return <AutoRemediationIcon />;
  if (normalizedTitle.includes('browser') && normalizedTitle.includes('access')) return <BrowserAccessIcon />;
  if (normalizedTitle.includes('zero') && normalizedTitle.includes('trust')) return <ZeroTrustIcon />;
  if (normalizedTitle.includes('multi-platform') && normalizedTitle.includes('compatibility')) return <MultiPlatformIcon />;
  if (normalizedTitle.includes('monitoring') && normalizedTitle.includes('analytics')) return <MonitoringAnalyticsIcon />;
  if (normalizedTitle.includes('agent') && normalizedTitle.includes('automation')) return <AgentAutomationIcon />;
  if (normalizedTitle.includes('instant') && normalizedTitle.includes('support')) return <InstantSupportIcon />;
  if (normalizedTitle.includes('document') && normalizedTitle.includes('querying')) return <DocumentQueryingIcon />;
  if (normalizedTitle.includes('multi-channel') && normalizedTitle.includes('access')) return <MultiChannelAccessIcon />;
  if (normalizedTitle.includes('multi-channel') && normalizedTitle.includes('ticketing')) return <MultiChannelTicketingIcon />;
  if (normalizedTitle.includes('ai-powered') && normalizedTitle.includes('automation')) return <AiPoweredAutomationIcon />;
  if (normalizedTitle.includes('knowledge') && normalizedTitle.includes('base')) return <KnowledgeBaseIcon />;
  if (normalizedTitle.includes('collaboration') && normalizedTitle.includes('reporting')) return <CollaborationReportingIcon />;
  if (normalizedTitle.includes('asset') && normalizedTitle.includes('tracking')) return <AssetTrackingIcon />;
  if (normalizedTitle.includes('barcode') && normalizedTitle.includes('qr')) return <BarcodeQrIcon />;
  if (normalizedTitle.includes('license') && normalizedTitle.includes('management')) return <LicenseManagementIcon />;
  if (normalizedTitle.includes('asset') && normalizedTitle.includes('assignment')) return <AssetAssignmentIcon />;

  // Fallback for other titles not explicitly in the list but present in data
  if (normalizedTitle.includes('change') && normalizedTitle.includes('awareness')) return <ChangeAwarenessIcon />;
  if (normalizedTitle.includes('runbook')) return <RunbooksAutomationIcon />;
  if (normalizedTitle.includes('compliance')) return <ComplianceIcon />;
  if (normalizedTitle.includes('self-service')) return <KnowledgeBaseIcon />;
  if (normalizedTitle.includes('recording')) return <MonitoringAnalyticsIcon />;
  if (normalizedTitle.includes('mobile')) return <MultiPlatformIcon />;
  if (normalizedTitle.includes('scalable')) return <WorkflowBuilderIcon />;
  if (normalizedTitle.includes('customizable')) return <WorkflowBuilderIcon />;
  if (normalizedTitle.includes('multi-tenancy')) return <MultiPlatformIcon />;
  if (normalizedTitle.includes('reporting')) return <CollaborationReportingIcon />;
  if (normalizedTitle.includes('email')) return <MultiChannelAccessIcon />;

  // Default fallback
  return <DiscoveryInventoryIcon />;
};
