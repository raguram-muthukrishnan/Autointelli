export const knowledgeBaseData = {
  pageTitle: "Knowledge Base",
  pageSubtitle: "Find answers, guides, and best practices for Autointelli IT-Ops",
  
  sections: [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-8-5zm0 18c-3.31-.91-6-4.39-6-8.5V8.3l6-3.6 6 3.6v3.2c0 4.11-2.69 7.59-6 8.5z"/><path d="M10.23 14.83l-2.12-2.12-1.41 1.41 3.53 3.53 7.07-7.07-1.41-1.41z"/></svg>,
      color: "#F0CE1D",
      articles: [
        {
          id: 1,
          title: "What Is Autointelli IT-Ops and How Does It Work?",
          description: "A high-level overview of the platform's monitoring, automation, and alerting capabilities.",
          content: "Autointelli IT-Ops is a comprehensive platform designed to streamline IT operations through intelligent monitoring, automation, and alerting..."
        },
        {
          id: 2,
          title: "How to Create Your Autointelli Account",
          description: "Step-by-step guide for new users to sign up and access the dashboard.",
          content: "Creating your Autointelli account is simple and takes just a few minutes..."
        },
        {
          id: 3,
          title: "System Requirements for Installing Agents",
          description: "Covers OS compatibility, ports to open, network prerequisites, and resource requirements.",
          content: "Before installing Autointelli agents, ensure your systems meet the following requirements..."
        },
        {
          id: 4,
          title: "How to Install the Autointelli Monitoring Agent",
          description: "Download link, installation commands, and verification steps.",
          content: "Installing the monitoring agent is straightforward. Follow these steps..."
        },
        {
          id: 5,
          title: "How to Add Your First Server to Autointelli",
          description: "Onboarding servers/services and validating metric ingestion.",
          content: "Once your agent is installed, you can start adding servers to monitor..."
        },
        {
          id: 6,
          title: "Navigating the Autointelli Dashboard",
          description: "Introduction to Modules: Monitoring, Incidents, Automation, Logs, Integrations.",
          content: "The Autointelli dashboard is your central hub for all IT operations..."
        },
        {
          id: 7,
          title: "User Roles and Permissions Explained",
          description: "Overview of Admin, Operator, and Viewer-level access.",
          content: "Autointelli uses role-based access control to ensure security and proper delegation..."
        },
        {
          id: 8,
          title: "How to Configure Your First Alert Rule",
          description: "Creating a threshold-based rule with recipients and escalation options.",
          content: "Alert rules help you stay informed about critical system events..."
        },
        {
          id: 9,
          title: "Connecting Cloud Platforms (AWS/Azure/GCP)",
          description: "How to connect Autointelli to cloud accounts for resource discovery.",
          content: "Integrate your cloud infrastructure for comprehensive monitoring..."
        },
        {
          id: 10,
          title: "Understanding Tags, Groups, and Resource Organization",
          description: "Best practices for structuring large infrastructures.",
          content: "Proper organization is key to managing complex IT environments..."
        }
      ]
    },
    {
      id: "incident-management",
      title: "Incident Management",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16v2h2v-2h-2zm0-6v4h2v-4h-2z"/></svg>,
      color: "#F0CE1D",
      articles: [
        {
          id: 11,
          title: "How to Raise a New Incident",
          description: "Form fields, severity levels, and examples of good descriptions.",
          content: "Creating effective incident reports ensures faster resolution..."
        },
        {
          id: 12,
          title: "Understanding the Incident Lifecycle",
          description: "Stages from Open → Triage → Work-in-progress → Resolved → Closed.",
          content: "Every incident follows a structured lifecycle to ensure proper handling..."
        },
        {
          id: 13,
          title: "How to Acknowledge or Reassign an Incident",
          description: "Actions operators can take when notifications arrive.",
          content: "Quick acknowledgment and proper assignment are crucial for incident response..."
        },
        {
          id: 14,
          title: "How Escalation Policies Work",
          description: "Automatic escalations, timelines, and severity mapping.",
          content: "Escalation policies ensure critical incidents get the attention they need..."
        },
        {
          id: 15,
          title: "Auto-Ticketing: How Alerts Convert Into Incidents",
          description: "Explains integration between alert engine and incident module.",
          content: "Autointelli automatically creates incidents from critical alerts..."
        },
        {
          id: 16,
          title: "How to Attach Logs, Screenshots, and Evidence to an Incident",
          description: "Improves triaging accuracy and response speed.",
          content: "Adding context to incidents helps teams resolve issues faster..."
        },
        {
          id: 17,
          title: "Viewing Incident History and Timeline",
          description: "Understanding activity logs and communication trails.",
          content: "Track every action taken during an incident's lifecycle..."
        },
        {
          id: 18,
          title: "Creating a Post-Mortem Report",
          description: "Templates: impact summary, RCA, corrective/preventive actions.",
          content: "Post-mortems help teams learn from incidents and prevent recurrence..."
        },
        {
          id: 19,
          title: "How to Subscribe or Unsubscribe from Incident Notifications",
          description: "Email, SMS, and Slack notification tuning.",
          content: "Customize your notification preferences to stay informed without being overwhelmed..."
        },
        {
          id: 20,
          title: "Incident Priority Matrix (How Severity Is Determined)",
          description: "Business-impact vs technical-impact mapping.",
          content: "Understanding incident severity helps prioritize response efforts..."
        }
      ]
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg>,
      color: "#F0CE1D",
      articles: [
        {
          id: 21,
          title: "Agent Offline / Error Code 1001 – How to Fix",
          description: "Causes include network issues, wrong keys, service not running.",
          content: "When agents go offline, follow these diagnostic steps..."
        },
        {
          id: 22,
          title: "High CPU Usage Alert — Diagnostic Steps",
          description: "Process inspection, logs, auto-remediation steps.",
          content: "High CPU usage can indicate various issues. Here's how to diagnose..."
        },
        {
          id: 23,
          title: "Memory Leak Troubleshooting Guide",
          description: "Identifying runaway processes, heap dumps, app profiling basics.",
          content: "Memory leaks can degrade system performance over time..."
        },
        {
          id: 24,
          title: "Disk Full Alerts — How to Clean and Prevent",
          description: "Using log rotation, deleting temp files, expanding volumes.",
          content: "Running out of disk space requires immediate action..."
        },
        {
          id: 25,
          title: "Website / Service Down — Quick Recovery Checklist",
          description: "Ping → Port check → Logs → Restart workflows.",
          content: "When services go down, follow this systematic approach..."
        },
        {
          id: 26,
          title: "Network Latency Issues — How to Diagnose",
          description: "Using traceroute, netstat, MTU checks, packet loss indicators.",
          content: "Network latency can impact application performance..."
        },
        {
          id: 27,
          title: "Application Logs Not Appearing in Dashboard",
          description: "Agent log path, permissions, parser configuration.",
          content: "If logs aren't showing up, check these common issues..."
        },
        {
          id: 28,
          title: "Alerts Triggering Too Frequently — How to Tune Rules",
          description: "Thresholds, stability windows, anomaly detection.",
          content: "Alert fatigue is real. Here's how to optimize your rules..."
        },
        {
          id: 29,
          title: "Unable to Access Dashboard — Login & MFA Issues",
          description: "Account lock, reset password, 2FA troubleshooting.",
          content: "Having trouble logging in? Try these solutions..."
        },
        {
          id: 30,
          title: "API Rate-Limit Error — Why It Happens and Fixes",
          description: "Usage burst, batching, recommended retry strategies.",
          content: "Rate limits protect system stability. Here's how to work within them..."
        }
      ]
    },
    {
      id: "tools-integrations",
      title: "Tools & Integrations",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M16 7V3H8v4H2v14h20V7h-6zm-6-2h4v2h-4V5zm10 16H4V9h16v12z"/><path d="M9 11h2v8H9zm4 0h2v8h-2z"/></svg>,
      color: "#F0CE1D",
      articles: [
        {
          id: 31,
          title: "How to Integrate Autointelli with Slack",
          description: "Step-by-step connection, channel mapping, and sample notifications.",
          content: "Slack integration brings alerts directly to your team channels..."
        },
        {
          id: 32,
          title: "Integrating MS Teams for Incident Notifications",
          description: "Webhook creation and configuration.",
          content: "Microsoft Teams integration keeps your team informed..."
        },
        {
          id: 33,
          title: "Setting Up Email Alerts and SMTP Settings",
          description: "Authentication, ports, test email workflow.",
          content: "Configure email notifications for critical alerts..."
        },
        {
          id: 34,
          title: "Adding Autointelli to PagerDuty",
          description: "Escalation sync and incident mirroring.",
          content: "PagerDuty integration enhances your incident response workflow..."
        },
        {
          id: 35,
          title: "How to Use Webhooks for Custom Notifications",
          description: "Payload structure, headers, retry logic.",
          content: "Webhooks enable custom integrations with any system..."
        },
        {
          id: 36,
          title: "Using Autointelli APIs — Authentication and Endpoints",
          description: "Tokens, examples, pagination, limits.",
          content: "The Autointelli API provides programmatic access to all features..."
        },
        {
          id: 37,
          title: "Automating Routine Tasks With Scripts",
          description: "Scheduling, on-demand runs, script logs.",
          content: "Automation reduces manual work and improves consistency..."
        },
        {
          id: 38,
          title: "Connecting CI/CD Tools (Jenkins, GitHub Actions)",
          description: "Triggering automation jobs from pipelines.",
          content: "Integrate Autointelli into your deployment workflows..."
        },
        {
          id: 39,
          title: "Integration with Cloud Services (AWS SSM, Azure Monitor)",
          description: "Importing metrics, logs, resource inventory.",
          content: "Cloud integrations provide comprehensive visibility..."
        },
        {
          id: 40,
          title: "Custom Dashboard Widgets — How to Build and Publish",
          description: "Metrics, logs, alerts, tabular data, charts.",
          content: "Create custom visualizations for your specific needs..."
        }
      ]
    },
    {
      id: "policies-security",
      title: "Policies & Security",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>,
      color: "#F0CE1D",
      articles: [
        {
          id: 41,
          title: "Password and MFA Policy",
          description: "Minimum requirements, expiry, 2FA enforcement.",
          content: "Strong authentication is the first line of defense..."
        },
        {
          id: 42,
          title: "Data Retention Policy for Logs & Metrics",
          description: "What gets stored, duration, archival rules.",
          content: "Understanding data retention helps with compliance and storage planning..."
        },
        {
          id: 43,
          title: "Backup & Disaster Recovery Policy",
          description: "Backup schedule, failover systems, recovery steps.",
          content: "Disaster recovery ensures business continuity..."
        },
        {
          id: 44,
          title: "User Access Control & Role-Based Permissions",
          description: "Who can create alerts, who can deploy scripts, etc.",
          content: "Proper access control prevents unauthorized actions..."
        },
        {
          id: 45,
          title: "Audit Logs — What Is Recorded and How to View",
          description: "User actions, login attempts, configuration changes.",
          content: "Audit logs provide accountability and security insights..."
        },
        {
          id: 46,
          title: "Compliance Standards (ISO, SOC2, GDPR alignment)",
          description: "Data handling, encryption, privacy practices.",
          content: "Autointelli adheres to industry compliance standards..."
        },
        {
          id: 47,
          title: "Security Best Practices for Servers Being Monitored",
          description: "Firewall rules, recommended ports, agent security.",
          content: "Secure your monitored infrastructure with these practices..."
        },
        {
          id: 48,
          title: "Incident Response Policy (Security Incidents)",
          description: "How security breaches are escalated and resolved.",
          content: "Security incidents require special handling procedures..."
        },
        {
          id: 49,
          title: "Vulnerability Management Workflow",
          description: "Patch cycles, scans, remediation policies.",
          content: "Proactive vulnerability management reduces security risks..."
        },
        {
          id: 50,
          title: "Encryption Practices (At Rest & In Transit)",
          description: "TLS usage, storage encryption, key management.",
          content: "Data encryption protects sensitive information..."
        }
      ]
    },
    {
      id: "advanced",
      title: "Advanced / Miscellaneous",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>,
      color: "#F0CE1D",
      articles: [
        {
          id: 51,
          title: "Building Custom Metrics With Autointelli",
          description: "Push metrics from apps via API.",
          content: "Custom metrics provide application-specific insights..."
        },
        {
          id: 52,
          title: "How to Create Automated Runbooks",
          description: "Decision-tree workflows, conditional actions.",
          content: "Runbooks automate complex operational procedures..."
        },
        {
          id: 53,
          title: "Scaling Infrastructure — Adding Nodes & Clusters",
          description: "Load distribution and agent considerations.",
          content: "Scale your monitoring infrastructure as you grow..."
        },
        {
          id: 54,
          title: "Using Anomaly Detection for Smarter Alerts",
          description: "Machine learning-based deviation detection.",
          content: "Anomaly detection reduces false positives and catches unusual patterns..."
        },
        {
          id: 55,
          title: "SRE Best Practices for Using Autointelli",
          description: "Error budgets, SLO/SLI tracking.",
          content: "Site Reliability Engineering principles enhance operational excellence..."
        },
        {
          id: 56,
          title: "Multi-Region Setup — How to Configure",
          description: "Separate dashboards, failover behavior.",
          content: "Multi-region deployments provide redundancy and performance..."
        },
        {
          id: 57,
          title: "Log Parsing & Custom Log Pipelines",
          description: "Regex rules, JSON parsing, field extraction.",
          content: "Custom log parsing extracts valuable insights from unstructured data..."
        },
        {
          id: 58,
          title: "Deploying Scripts at Scale (100+ Servers)",
          description: "Parallel execution, safety checks.",
          content: "Execute automation across large server fleets safely..."
        },
        {
          id: 59,
          title: "Creating Templates for Common Incidents",
          description: "Reusable checklists for repetitive issues.",
          content: "Templates speed up incident resolution for known issues..."
        },
        {
          id: 60,
          title: "Infrastructure Cost Optimization Dashboard",
          description: "Viewing unused resources, over-provisioned systems.",
          content: "Optimize cloud spending with visibility into resource utilization..."
        }
      ]
    }
  ]
};
