// A comprehensive, centralized data source for all product pages.
// Each product now has a detailed structure following the 13-part template.

// Import product images
import nmsImage from '../src/assets/Products/nms.webp';
import opsDutyImage from '../src/assets/Products/opsduty.webp';
import intelliFlowImage from '../src/assets/Products/intelliflow.webp';
import aliceImage from '../src/assets/Products/alice.png';

export const productsData = 

{
  "pageHero": {
    "title": "The Autointelli AIOps Platform",
    "subtitle": "A unified suite of tools to monitor your infrastructure, automate responses, secure access, and streamline IT operations from end to end. Gain full visibility and control to prevent downtime and drive business efficiency."
  },
  "products": [
    {
      "id": "nms",
      "name": "Autointelli NMS (360)",
      "hero": {
        "headline": "AI-Powered Monitoring for the Modern Hybrid Network",
        "subheadline": "Gain unified, real-time observability across your entire infrastructure to resolve issues faster and guarantee reliability.",
        "image": nmsImage,
        "ctaPrimary": "Schedule a Demo",
        "ctaSecondary": "Watch Overview",
        "microStats": [
          { "value": "80%", "label": "Alert Noise Reduction" },
          { "value": "60%", "label": "MTTR Improvement" },
          { "value": "99.95%", "label": "Target Availability" }
        ]
      },
      "intro": {
        "problem": "Today's hybrid networks are complex and chaotic. Disparate tools create blind spots, alert storms overwhelm clients, and manual troubleshooting is too slow, putting your business at risk.",
        "solution": "Autointelli NMS replaces the chaos with clarity. It provides a single, intelligent platform that unifies observability, correlates data, and uses AI to deliver actionable insights, transforming your IT operations from reactive to proactive."
      },
      "platformOverview": {
        "headline": "The Complete 360° Network Monitoring Experience",
        "summary": "Autointelli Network Monitoring delivers unified, real-time observability across switches, routers, firewalls, load balancers, cloud VNets/VPCs, and critical on-prem services. It correlates telemetry, detects anomalies, and prioritizes incidents so ITOps can resolve issues faster.",
        "capabilities": [
          "Proactive, AI-assisted visibility and control",
          "Unified view for hybrid and multi-cloud environments",
          "Topology-aware event correlation and anomaly detection"
        ],
        "diagram": nmsImage
      },
      "whatItMonitors": {
        "headline": "Comprehensive Coverage Across Your Entire IT Ecosystem",
        "categories": [
          { "icon": "💻", "name": "Network Devices", "description": "Routers, switches, firewalls, VPNs, WLCs, SD-WAN edges." },
          { "icon": "↔️", "name": "Interfaces & Links", "description": "Utilization, errors, discards, QoS queues, and link flaps." },
          { "icon": "⚙️", "name": "Services & Apps", "description": "DNS, DHCP, web services, and synthetic availability checks." },
          { "icon": "☁️", "name": "Cloud & Hybrid", "description": "AWS, Azure, and GCP network constructs, gateways, and peering." },
          { "icon": "🛡️", "name": "Security Signals", "description": "Firewall trends, VPN status, configuration drift, and policy changes." },
          { "icon": "🚀", "name": "Paths & Performance", "description": "Hop-by-hop loss, jitter, and latency via active tests and flow data." }
        ]
      },
      "architecture": {
        "headline": "Designed for Scale, Speed, and Security",
        "layers": [
          { "name": "Collectors", "description": "Lightweight collectors for SNMP, APIs, Flow, Syslog, and streaming telemetry." },
          { "name": "Data Pipeline", "description": "Enriches, deduplicates, and suppresses noise before correlation." },
          { "name": "AI & Correlation Engine", "description": "Topology-aware event correlation and anomaly detection." },
          { "name": "Visualization & APIs", "description": "Real-time dashboards, topology maps, and REST APIs." }
        ],
        "integrations": "Includes key integrations with ITSM, SIEM, and collaboration platforms."
      },
      "keyFeatures": {
        "headline": "Everything You Need to Keep Your Network Predictable",
        "features": [
          { "title": "Unified Discovery & Inventory", "description": "Multi-vendor discovery via SNMP, SSH, and cloud APIs with auto-classification." },
          { "title": "Real-Time Health & Performance", "description": "Track interface-level KPIs and device health (CPU, memory, temp)." },
          { "title": "Topology & Dependency Mapping", "description": "Visualize L2/L3 topology, service dependency graphs, and estimate blast-radius." },
          { "title": "Intelligent Alerting & AIOps", "description": "Seasonality-aware baselines and automatic anomaly detection to reduce alert fatigue." },
          { "title": "Change Awareness & Compliance", "description": "Configuration backup, versioning, drift alerts, and policy compliance checks." },
          { "title": "Runbooks & Automation Hooks", "description": "Trigger push-button remediations and automation scripts directly from alerts." }
        ]
      },
      "benefitsByRole": {
        "headline": "Why Every Client Loves Autointelli NMS",
        "roles": [
          {
            "name": "Network Operations (NOC)",
            "benefit": "Faster MTTR and dramatic noise reduction.",
            "points": ["Topology-aware correlation shortens triage.", "Deduplication reduces alert floods by up to 80%.", "Runbooks provide context for first-call resolution."]
          },
          {
            "name": "SRE / Platform Teams",
            "benefit": "Confidence in SLOs and proactive capacity planning.",
            "points": ["End-to-end latency and packet-loss visibility protects user experience.", "Percentile-based trending avoids over/under-provisioning.", "APIs integrate with CI/CD and IaC workflows."]
          },
          {
            "name": "Security & Compliance",
            "benefit": "Enhanced governance and faster incident containment.",
            "points": ["Config drift detection curbs unauthorized changes.", "Continuous policy checks for SNMPv3, AAA, and crypto.", "Merge security events with network health for context."]
          },
          {
            "name": "Leadership (CIO/CTO)",
            "benefit": "Reduced risk and data-driven cost optimization.",
            "points": ["Proactive detection lowers outage minutes and SLA penalties.", "Data-driven capacity planning optimizes spending.", "Executive dashboards translate technical status into business impact."]
          }
        ]
      },
      "integrations": {
        "headline": "Seamlessly Integrates with Your Existing Stack",
        "description": "Our API-driven, 'no lock-in' design ensures Autointelli NMS works with the tools you already use, from ITSM and collaboration to observability and security platforms.",
        "logos": ["Prometheus", "Grafana", "ServiceNow", "Jira", "Slack", "Microsoft Teams", "Splunk", "Elastic"]
      },
      "deploymentAndSecurity": {
        "headline": "Enterprise-Ready Deployment and Security",
        "sections": [
          { "icon": "☁️", "title": "Deployment & Scalability", "description": "Deploy on-prem, in a private cloud, or as a SaaS solution. Horizontally scalable collectors ensure resilience and performance." },
          { "icon": "🔒", "title": "Security & Governance", "description": "Features RBAC, SSO/SAML, MFA, and per-tenant isolation. All data is protected with TLS in transit and encryption at rest." }
        ]
      },
      "useCases": {
        "headline": "Trusted for Every Network Challenge",
        "cases": [
          { "icon": "🔥", "title": "Datacenter Outage Triage", "description": "Instantly identify root cause and impact radius to accelerate incident response." },
          { "icon": "🌐", "title": "WAN/SD-WAN Brownout Detection", "description": "Proactively detect and remediate path performance issues before they impact users." },
          { "icon": "🏢", "title": "Wireless Experience Assurance", "description": "Ensure reliable WiFi in high-density venues with AP/WLC health and client metrics." },
          { "icon": "🔐", "title": "Compliance & Config Governance", "description": "Continuously audit configurations and enforce security policies across your network." }
        ]
      },
      "whyAutointelli": {
        "headline": "Why Choose Autointelli?",
        "pillars": [
          { "icon": "🌍", "title": "Complete Coverage", "description": "From physical links to cloud overlays in one unified platform." },
          { "icon": "👨‍💻", "title": "Operator-Centric Design", "description": "Built for real-world workflows to make engineers' lives easier." },
          { "icon": "🔌", "title": "Open by Design", "description": "APIs, exporters, and webhooks prevent vendor lock-in and simplify integration." },
          { "icon": "🤖", "title": "AI-Assisted Triage", "description": "Powerful AIOps focuses your organization on what truly matters, reducing noise." }
        ]
      },
      "roi": {
        "headline": "Proven Results from Real Deployments",
        "stats": [
          { "value": 60, "unit": "%", "label": "Reduction in MTTR" },
          { "value": 80, "unit": "%", "label": "Alert Noise Reduction" },
          { "value": 25, "unit": "%", "label": "Capacity Headroom Gained" },
          { "value": 99.95, "unit": "%", "label": "Achieved Availability" }
        ]
      },
      "finalCta": {
        "headline": "Ready to Experience Autointelli NMS?",
        "subheadline": "See how AI-driven monitoring transforms visibility and uptime.",
        "buttons": [
          { "text": "See How It Works", "type": "primary" },
          { "text": "Contact Us", "type": "secondary" }
        ]
      },
      "slug": "/products/nms"
    },
    {
      "id": "incident-response",
      "name": "Autointelli OpsDuty",
      "slug": "/products/incident-response",
      "hero": {
        "headline": "Unified Incident Response and Alert Management",
        "subheadline": "Aggregate events from any monitoring tool, reduce alert noise with dynamic policies, and automate remediation.",
        "image": opsDutyImage,
        "ctaPrimary": "Request a Demo",
        "ctaSecondary": "Learn More",
        "microStats": [
          { "value": "90%", "label": "Alert Noise Reduction" },
          { "value": "100%", "label": "Automated Ticketing" },
          { "value": "75%", "label": "Faster Remediation" }
        ]
      },
      "intro": {
        "problem": "Multiple monitoring tools create alert storms, overwhelming operations and hiding critical issues. Manual event correlation and ticketing is slow, error-prone, and inefficient.",
        "solution": "Autointelli Incident Response acts as a central manager for all your alerts. It intelligently aggregates events, filters noise based on dynamic policies, and integrates seamlessly with ITSM and automation tools to streamline the entire response lifecycle."
      },
      "platformOverview": {
        "headline": "From Alert Chaos to Actionable Intelligence",
        "summary": "A dynamic, policy-based Event Aggregation and Incident Response Platform that integrates with any monitoring tool. It provides a unified alert window, reduces noise, and connects to automation runbooks for automated remediation.",
        "capabilities": [
          "Universal integration with monitoring tools",
          "Advanced event aggregation and noise reduction",
          "Automated ITSM ticketing and remediation workflows"
        ],
        "diagram": opsDutyImage
      },
      "whatItMonitors": {
        "headline": "Centralized Management for Your Entire Observability Stack",
        "categories": [
          { "icon": "📥", "name": "Alert Ingestion", "description": "Integrates with any monitoring tool to provide a unified alert window." },
          { "icon": "📉", "name": "Event Aggregation", "description": "Reduces alert noise through intelligent, policy-based aggregation." },
          { "icon": "🎟️", "name": "ITSM Integration", "description": "Provides semi or fully automatic ticketing with leading ITSM platforms." },
          { "icon": "⚙️", "name": "Automated Remediation", "description": "Triggers automation runbooks to resolve issues without manual intervention." },
          { "icon": "🗓️", "name": "Maintenance Filtering", "description": "Automatically drops alerts during scheduled maintenance windows." }
        ]
      },
      "architecture": {
        "headline": "The Central Hub for Your Monitoring Ecosystem",
        "layers": [
          { "name": "Integration Layer", "description": "Connectors for all major monitoring platforms and ITSM tools." },
          { "name": "Aggregation & Filtration Engine", "description": "Policy-based engine to de-duplicate, correlate, and suppress alerts." },
          { "name": "Automation Engine", "description": "Connects incidents to remediation runbooks for automated resolution." },
          { "name": "Unified Dashboard", "description": "A single pane of glass for all alerts and incident response activities." }
        ],
        "integrations": "Connects to your monitoring, ITSM, and automation tools."
      },
      "keyFeatures": {
        "headline": "Designed for Efficient Operations",
        "features": [
          { "title": "Unified Alert Window", "description": "Integrates with any monitoring tool to provide a single view of all alerts." },
          { "title": "Event Aggregation & Noise Reduction", "description": "A powerful event aggregation platform that helps significantly reduce alert noise." },
          { "title": "Maintenance Window Filtration", "description": "Allows for event filtrations to automatically drop alerts during maintenance periods." },
          { "title": "Automated ITSM Ticketing", "description": "Deep integration with ITSM tools for semi or fully automatic incident ticketing." },
          { "title": "Runbook Automation", "description": "Connects incidents with automation runbooks for automated remediation of issues." }
        ]
      },
      "benefitsByRole": {
        "headline": "Transforming Operations for Every Client",
        "roles": [
          {
            "name": "NOC / ITOps",
            "benefit": "Drastically reduced alert fatigue and faster triage.",
            "points": ["Focus only on critical, actionable alerts.", "Eliminate manual ticket creation.", "Resolve issues faster with integrated automation."]
          },
          {
            "name": "SRE / DevOps",
            "benefit": "Automate routine incident responses to focus on reliability.",
            "points": ["Trigger automated remediation for common failures.", "Integrate with CI/CD pipelines for release monitoring.", "Maintain SLOs by reducing MTTR."]
          },
          {
            "name": "IT Leadership",
            "benefit": "Improved operational stability and efficiency.",
            "points": ["Gain clear metrics on incident volume and resolution times.", "Optimize resource allocation by automating L1 tasks.", "Ensure consistent incident response processes."]
          }
        ]
      },
      "integrations": {
        "headline": "Connects to Any Tool in Your Stack",
        "description": "Our platform is tool-agnostic, designed to integrate seamlessly with the monitoring, ITSM, and automation solutions you already have.",
        "logos": ["ServiceNow", "Jira", "Zabbix", "Prometheus", "Slack", "Autointelli Flow"]
      },
      "deploymentAndSecurity": {
        "headline": "Secure and Scalable by Design",
        "sections": [
          { "icon": "☁️", "title": "Flexible Deployment", "description": "Available as a SaaS or on-premises solution to fit your infrastructure strategy." },
          { "icon": "🔒", "title": "Enterprise Security", "description": "Includes RBAC, audit logs, and secure integrations to protect your data." }
        ]
      },
      "useCases": {
        "headline": "Solving Key Incident Management Challenges",
        "cases": [
          { "icon": "🔕", "title": "Alert Storm Suppression", "description": "Automatically group and suppress noisy alerts during major incidents." },
          { "icon": "⚙️", "title": "Automated Service Restarts", "description": "Trigger a runbook to restart a failed service upon receiving a critical alert." },
          { "icon": "🎟️", "title": "Intelligent Ticketing", "description": "Create enriched, high-priority tickets in your ITSM tool automatically." },
          { "icon": "🗓️", "title": "Change-Aware Alerting", "description": "Suppress alerts from systems undergoing planned maintenance." }
        ]
      },
      "whyAutointelli": {
        "headline": "The Smarter Way to Manage Incidents",
        "pillars": [
          { "icon": "🔧", "title": "Tool Agnostic", "description": "Works with your existing tools, providing a unified layer of intelligence." },
          { "icon": "🎯", "title": "Policy-Driven", "description": "Highly flexible and customizable rules for aggregation and routing." },
          { "icon": "🤖", "title": "Automation-First", "description": "Designed to connect alerts directly to automated remediation." },
          { "icon": "📊", "title": "Actionable Insights", "description": "Turns chaotic alert data into clear, actionable incidents." }
        ]
      },
      "roi": {
        "headline": "Tangible Business Outcomes",
        "stats": [
          { "value": 90, "unit": "%", "label": "Reduction in Alert Noise" },
          { "value": 50, "unit": "%+", "label": "Improvement in MTTR" },
          { "value": 80, "unit": "%", "label": "Fewer Manual Tickets" }
        ]
      },
      "finalCta": {
        "headline": "Ready to Tame Your Alert Chaos?",
        "subheadline": "See how Autointelli Incident Response can bring calm and clarity to your operations.",
        "buttons": [
          { "text": "See How It Works", "type": "primary" },
          { "text": "Contact Us", "type": "secondary" }
        ]
      }
    },
    {
      "id": "flow",
      "name": "IntelliFlow",
      "slug": "/products/flow",
      "hero": {
        "headline": "Automate and Orchestrate Complex IT Processes",
        "subheadline": "Standardize, accelerate, and de-risk IT operations with an event-driven, human-aware automation platform.",
        "image": intelliFlowImage,
        "ctaPrimary": "Explore Use Cases",
        "ctaSecondary": "Get a Demo",
        "microStats": [
          { "value": "70%", "label": "MTTR Reduction" },
          { "value": "80%", "label": "Automation Coverage" },
          { "value": "50%", "label": "Fewer Failed Changes" }
        ]
      },
      "intro": {
        "problem": "Manual, repetitive IT processes are slow, error-prone, and drain valuable engineering time. Complex, cross-team runbooks are difficult to execute consistently, leading to long resolution times and compliance risks.",
        "solution": "Autointelli Flow streamlines these complex runbooks into reliable, auditable workflows. It connects your entire toolchain—monitoring, ITSM, cloud, and security—to eliminate manual toil while keeping humans in the loop for critical decisions."
      },
      "platformOverview": {
        "headline": "The Central Nervous System for Your IT Operations",
        "summary": "Autointelli IT Process Orchestration (Flow) is a business service management platform that automates frequent and mundane IT activities. From incident response to user onboarding, Flow provides a visual designer to build, execute, and audit any workflow.",
        "capabilities": [
          "Low-code visual workflow designer",
          "Event-driven triggers from any source",
          "Human-in-the-loop approvals and interactions"
        ],
        "diagram": intelliFlowImage
      },
      "whatItMonitors": {
        "headline": "Orchestrate Any Process Across Your Entire Stack",
        "categories": [
          { "icon": "🔥", "name": "Incident Response", "description": "Enrichment, triage, auto-remediation, and post-incident tasks." },
          { "icon": "🔄", "name": "Change & Release", "description": "Standard changes, blue/green deployments, and CAB approvals." },
          { "icon": "💻", "name": "Provisioning & Config", "description": "VM, cluster, and application provisioning and config drift fixes." },
          { "icon": "👤", "name": "Service Desk", "description": "User on/offboarding, access requests, and password resets." },
          { "icon": "🛡️", "name": "Security & Compliance", "description": "Patch cycles, vulnerability response, and evidence capture." },
          { "icon": "💰", "name": "FinOps & Housekeeping", "description": "Cloud cost cleanup, scheduled rightsizing, and log management." }
        ]
      },
      "architecture": {
        "headline": "A Scalable and Secure Automation Engine",
        "layers": [
          { "name": "Visual Workflow Designer", "description": "Drag-and-drop interface with branching, loops, and error handling." },
          { "name": "Event Bus", "description": "Listens for triggers from webhooks, queues, alerts, and schedules." },
          { "name": "Scalable Workers", "description": "Stateless runners execute scripts, APIs, and infrastructure modules." },
          { "name": "Secrets Vault", "description": "Encrypted credential store with rotation and scoped access." }
        ],
        "integrations": "Out-of-the-box connectors for ServiceNow, Jira, Slack, Teams, Ansible, Terraform, AWS, Azure, GCP, and more."
      },
      "keyFeatures": {
        "headline": "Powerful Features for Reliable Automation at Scale",
        "features": [
          { "title": "Low-Code Workflow Builder", "description": "Use readable blocks, templates, and versioning for safe iteration, with diff and rollback capabilities." },
          { "title": "Event-Driven Automation", "description": "Initiate workflows from alerts (NMS/SIEM), tickets (ITSM), Git commits, chat commands, or schedules." },
          { "title": "Human-in-the-Loop", "description": "Incorporate interactive approvals, data collection forms, and pause/resume steps with fallback paths." },
          { "title": "Auto-Remediation Library", "description": "Utilize pre-built, guarded actions like restarting services, clearing caches, or failing over a VIP." },
          { "title": "Compliance & Governance", "description": "Enforce RBAC, separation of duties, and least-privilege runners with immutable audit logs." },
          { "title": "Self-Service Portal", "description": "Empower users to easily trigger approved automation workflows on demand." }
        ]
      },
      "benefitsByRole": {
        "headline": "Empowering Every Team with Automation",
        "roles": [
          {
            "name": "ITOps / NOC",
            "benefit": "Faster recovery and operational consistency.",
            "points": ["Cut MTTR by eliminating guesswork with repeatable playbooks.", "Auto-enrich incidents to route them to the right automation.", "Ensure golden path execution across all shifts."]
          },
          {
            "name": "SRE / Platform",
            "benefit": "Massive toil reduction and safer deployments.",
            "points": ["Automate repetitive runbooks to free up time for reliability engineering.", "Orchestrate rollouts with verifications and quick rollbacks.", "Integrate with GitOps and CI/CD pipelines."]
          },
          {
            "name": "Service Desk",
            "benefit": "Self-service at scale and error-free fulfillment.",
            "points": ["Offer catalog items with approval workflows that provision and close tickets automatically.", "Use data validation and guardrails to reduce rework."]
          },
          {
            "name": "Leadership (CIO/CISO)",
            "benefit": "Reduced risk and significant cost savings.",
            "points": ["Lower manual errors and enable faster, measured recoveries.", "Translate automation coverage into FTE hours saved and lower outage costs.", "Gain transparency with value-realization dashboards."]
          }
        ]
      },
      "integrations": {
        "headline": "Connect Your Entire Toolchain",
        "description": "With out-of-the-box connectors for the tools your engineers use every day, Flow becomes the central automation fabric for your organization.",
        "logos": ["ServiceNow", "Jira", "Slack", "Microsoft Teams", "GitHub", "Jenkins", "Ansible", "Terraform", "AWS", "Azure", "GCP", "Kubernetes"]
      },
      "deploymentAndSecurity": {
        "headline": "Flexible Deployment with Enterprise-Grade Security",
        "sections": [
          { "icon": "☁️", "title": "Deployment Models", "description": "Deploy On-Prem, in a private cloud, or as a SaaS solution with horizontally scaling, stateless workers." },
          { "icon": "🔒", "title": "Security & Policy", "description": "Enforce SSO/SAML, MFA, RBAC, and mandatory approvals with an encrypted secrets vault and immutable logs." }
        ]
      },
      "useCases": {
        "headline": "Proven Solutions for Common IT Challenges",
        "cases": [
          { "icon": "🔧", "title": "Auto-Remediate Alerts", "description": "Automatically fix common issues like 'disk full' or 'service hung' with optional approvals for high-risk actions." },
          { "icon": "👤", "title": "Zero-Touch User Onboarding", "description": "Automate the entire process: create identity, assign groups, provision mailboxes, and grant app access." },
          { "icon": "🚀", "title": "Orchestrated Kubernetes Rollouts", "description": "Manage progressive delivery, run verifications, notify teams, and automatically roll back on SLO breach." },
          { "icon": "🗓️", "title": "Automated 'Patch Tuesday'", "description": "Orchestrate patching across thousands of servers with pre/post health checks and staged canaries." }
        ]
      },
      "whyAutointelli": {
        "headline": "Why Choose Autointelli Flow?",
        "pillars": [
          { "icon": "🤝", "title": "Human-Aware Automation", "description": "Keeps people in control for critical decisions while removing the toil." },
          { "icon": "🔌", "title": "Deep Toolchain Coverage", "description": "Ships with the connectors that engineers actually use every day." },
          { "icon": "🛡️", "title": "Built-in Safety Rails", "description": "Provides guarded execution, idempotency, and checkpoints for production-grade reliability." },
          { "icon": "📈", "title": "Proven at Scale", "description": "Designed for thousands of concurrent runs across complex hybrid environments." }
        ]
      },
      "roi": {
        "headline": "Measure the Impact of Automation",
        "stats": [
          { "value": 70, "unit": "%", "label": "Reduction in MTTR" },
          { "value": 80, "unit": "%", "label": "Automation Coverage" },
          { "value": 50, "unit": "%", "label": "Fewer Failed Changes" },
          { "value": 1000, "unit": "s", "label": "of Hours/Year Saved" }
        ]
      },
      "finalCta": {
        "headline": "Ready to Automate Your Operations?",
        "subheadline": "Discover how Autointelli Flow can make reliable operations your default.",
        "buttons": [
          { "text": "See How It Works", "type": "primary" },
          { "text": "Contact Us", "type": "secondary" }
        ]
      }
    },
    {
      "id": "securita",
      "name": "Autointelli Securita",
      "slug": "/products/securita",
      "hero": {
        "headline": "Access Your Apps and Infrastructure, From Anywhere",
        "subheadline": "A cutting-edge remote access platform for secure, instant, and hassle-free connectivity using only a web browser. No installs, just log in.",
        "image": intelliFlowImage,
        "ctaPrimary": "Get Secure Access",
        "ctaSecondary": "Watch Demo",
        "microStats": [
          { "value": "Zero", "label": "Client Installs" },
          { "value": "100%", "label": "Browser-Based" },
          { "value": "Zero", "label": "Trust Security" }
        ]
      },
      "intro": {
        "problem": "Traditional remote access relies on clunky VPNs and agent installations that are difficult to manage, create security vulnerabilities, and provide a poor user experience for employees and third parties.",
        "solution": "Securita revolutionizes remote access. It provides instant, secure, browser-based connectivity to all your systems—Windows, Linux, and macOS. It's built on a Zero Trust model, ensuring strict identity verification for every session."
      },
      "platformOverview": {
        "headline": "The Future of Remote Access is Here",
        "summary": "Securita is a Privileged Access Control Platform that helps you connect your devices and apps securely. It empowers businesses with efficient connectivity from anywhere, anytime, using just a modern web browser—no installations, no hassle.",
        "capabilities": [
          "Clientless, browser-based remote access gateway",
          "TLS encrypted communication and session recording",
          "Multi-platform support for Windows, Linux, and macOS"
        ],
        "diagram": intelliFlowImage
      },
      "whatItMonitors": {
        "headline": "Unified Access to Your Entire Environment",
        "categories": [
          { "icon": "💻", "name": "Windows Systems", "description": "Secure RDP access directly in the browser." },
          { "icon": "🐧", "name": "Linux Systems", "description": "Browser-based SSH and terminal access." },
          { "icon": "🍏", "name": "macOS Systems", "description": "Seamless remote access to macOS environments." },
          { "icon": "☁️", "name": "Cloud & On-Prem", "description": "Connect to any resource regardless of its location." },
          { "icon": "🗄️", "name": "Databases & APIs", "description": "Securely access internal services without exposing ports." },
          { "icon": "👨‍💻", "name": "Dev Environments", "description": "Provide developers secure access to their environments from anywhere." }
        ]
      },
      "architecture": {
        "headline": "Secure, Scalable, and Simple by Design",
        "layers": [
          { "name": "Browser-Based Gateway", "description": "The single entry point for all remote access, requiring no client software." },
          { "name": "Zero Trust Security Model", "description": "Enforces strict identity verification and encryption for every connection." },
          { "name": "Session Recording & Playback", "description": "Provides full auditability and monitoring of all remote sessions." },
          { "name": "Distributed Access Servers", "description": "Ensures high-speed, low-latency connectivity for a global workforce." }
        ],
        "integrations": "Integrates with your identity providers for seamless authentication."
      },
      "keyFeatures": {
        "headline": "Features Built for the Modern, Secure Enterprise",
        "features": [
          { "title": "Browser-Based Access", "description": "Connect to desktops and applications through any modern web browser. No software installation is required." },
          { "title": "Zero Trust Security", "description": "Ensure secure connections with strict identity verification, advanced encryption, and multi-factor authentication." },
          { "title": "Multi-Platform Compatibility", "description": "Seamlessly connect to Windows, Linux, and macOS systems with support for all major remote access protocols." },
          { "title": "Real-Time Monitoring & Analytics", "description": "Track sessions, generate detailed reports, and maintain full control over access with built-in activity logging." },
          { "title": "Session Recording & Playback", "description": "Record all remote sessions for audit, compliance, and training purposes with a simple playback interface." },
          { "title": "Mobile-Ready", "description": "Utilize a fully responsive design for secure access from desktops, tablets, and smartphones." }
        ]
      },
      "benefitsByRole": {
        "headline": "Who Should Use Securita?",
        "roles": [
          {
            "name": "Enterprises",
            "benefit": "Simplify IT operations and secure remote access for all teams.",
            "points": ["Eliminate VPN management overhead.", "Securely onboard third-party contractors.", "Ensure compliance with full session auditing."]
          },
          {
            "name": "IT Professionals",
            "benefit": "Provide efficient, secure remote support without compromise.",
            "points": ["Instantly access any machine without pre-installed agents.", "Share and collaborate on sessions.", "Monitor and terminate suspicious activity in real-time."]
          },
          {
            "name": "Developers",
            "benefit": "Access development environments securely from anywhere, anytime.",
            "points": ["Work on any machine without installing tools locally.", "Isolate development environments from the public internet.", "Improve productivity with high-speed connectivity."]
          },
          {
            "name": "Educational Institutions",
            "benefit": "Enable secure and efficient remote learning and lab access.",
            "points": ["Provide students with browser-based access to lab computers.", "Simplify IT management for remote education.", "Ensure a secure learning environment."]
          }
        ]
      },
      "integrations": {
        "headline": "Works with Your Identity Provider",
        "description": "Securita integrates with standard identity and access management solutions to enforce your existing security policies.",
        "logos": ["Okta", "Azure AD", "SAML", "LDAP"]
      },
      "deploymentAndSecurity": {
        "headline": "Scalable, Customizable, and Secure",
        "sections": [
          { "icon": "📈", "title": "Scalable and Customizable", "description": "Built to grow with your business, from small teams to global enterprises, with custom integration options." },
          { "icon": "🔒", "title": "Enterprise-Grade Security", "description": "Features advanced encryption, MFA, access controls, and built-in activity logging and session monitoring." }
        ]
      },
      "useCases": {
        "headline": "Secure Access for Every Scenario",
        "cases": [
          { "icon": "🏢", "title": "Secure Employee Remote Access", "description": "Replace your corporate VPN with a simpler, more secure browser-based solution." },
          { "icon": "🤝", "title": "Third-Party Vendor Access", "description": "Grant temporary, audited access to contractors without exposing your network." },
          { "icon": "헬", "title": "Remote IT Support", "description": "Provide instant, on-demand support to any device, anywhere." },
          { "icon": "🏫", "title": "Virtual Computer Labs", "description": "Enable students to access university software and desktops from their own devices." }
        ]
      },
      "whyAutointelli": {
        "headline": "Why Securita?",
        "pillars": [
          { "icon": "🔒", "title": "Secure", "description": "Built with the latest security standards, including Zero Trust and MFA, to protect your data." },
          { "icon": "👍", "title": "Simple", "description": "Browser-based access ensures a frictionless, hassle-free experience for all users." },
          { "icon": "🌐", "title": "Scalable", "description": "From small teams to global enterprises, Securita adapts to your needs." },
          { "icon": "💬", "title": "Supportive", "description": "Dedicated customer support to assist you at every step of your journey." }
        ]
      },
      "roi": {
        "headline": "Achieve a Stronger Security Posture and Lower Costs",
        "stats": [
          { "value": 90, "unit": "%", "label": "Reduction in Attack Surface" },
          { "value": 75, "unit": "%", "label": "Lower IT Overhead" },
          { "value": 50, "unit": "%", "label": "Faster User Onboarding" }
        ]
      },
      "finalCta": {
        "headline": "Ready for a Simpler, More Secure Way to Work?",
        "subheadline": "Discover how browser-based access can transform your organization.",
        "buttons": [
          { "text": "See How It Works", "type": "primary" },
          { "text": "Contact Us", "type": "secondary" }
        ]
      }
    },
    {
      "id": "alice-ai",
      "name": "Alice AI",
      "slug": "/products/alice-ai",
      "hero": {
        "headline": "Your Smartest AI Assistant, Anytime, Anywhere!",
        "subheadline": "An intelligent, conversational AI ChatBot designed to streamline workplace tasks, automate IT support, and enhance the digital employee experience.",
        "image": aliceImage,
        "ctaPrimary": "Meet Alice",
        "ctaSecondary": "See Use Cases",
        "microStats": [
          { "value": "24/7", "label": "Instant Support" },
          { "value": "L1", "label": "Ticket Automation" },
          { "value": "100+", "label": "Integrations" }
        ]
      },
      "intro": {
        "problem": "Employees face constant delays dealing with routine IT issues like password resets, software access, and policy questions. Traditional support is slow and manual, disrupting productivity and overwhelming IT teams.",
        "solution": "Alice AI transforms the employee experience by providing an intelligent, conversational assistant that delivers instant solutions. Alice automates routine tasks, answers questions in real-time, and empowers employees to resolve issues themselves, reducing downtime and boosting productivity."
      },
      "platformOverview": {
        "headline": "Conversational AI for the Modern Workplace",
        "summary": "Alice AI is an Agentic AI Platform and digital assistant for your employees. Powered by advanced AI, Alice delivers instant solutions—from executing infrastructure tasks and resetting passwords to answering HR policy questions—all through a simple chat interface.",
        "capabilities": [
          "Agent-based automation for IT tasks",
          "Natural language querying for documents and policies",
          "Multi-channel access via Teams, Telegram, and web"
        ],
        "diagram": aliceImage
      },
      "whatItMonitors": {
        "headline": "Automating Tasks, Empowering Employees",
        "categories": [
          { "icon": "🔑", "name": "Instant IT Support", "description": "Resolve common issues like password resets or software access instantly without a helpdesk ticket." },
          { "icon": "❓", "name": "Answer Queries", "description": "Instantly answer employee questions about HR policies, leave policies, and company information." },
          { "icon": "📄", "name": "Document Querying", "description": "Get quick, accurate answers from company documents like policies, manuals, and knowledge bases." },
          { "icon": "⚙️", "name": "Infrastructure Tasks", "description": "Handle tasks like service restarts, network checks, and service management via chat commands." },
          { "icon": "🤖", "name": "Agent-Based Automation", "description": "Utilize intelligent agents to handle complex, multi-step tasks across various IT tools." }
        ]
      },
      "architecture": {
        "headline": "A Scalable, Intelligent Agentic AI Platform",
        "layers": [
          { "name": "Multi-Channel Interface", "description": "Engage with Alice on platforms employees already use, like Microsoft Teams, Telegram, or web." },
          { "name": "Conversational AI Engine", "description": "Understands natural language to accurately interpret user requests." },
          { "name": "Agentic Automation Framework", "description": "Orchestrates multiple agents and tools to fulfill complex requests." },
          { "name": "Backend Integration Layer", "description": "Robust architecture integrates with 100+ IT and business tools." }
        ],
        "integrations": "Connects with Active Directory, Windows Server, HR systems, and more."
      },
      "keyFeatures": {
        "headline": "Alice AI's Powerful Capabilities",
        "features": [
          { "title": "Agent-Based Automation", "description": "Intelligent agents handle tasks like password resets, network checks, and service management, reducing IT workload." },
          { "title": "Instant IT Support", "description": "Resolve common IT issues like password resets or software access instantly, without waiting for a helpdesk." },
          { "title": "Document Querying", "description": "Get quick answers from company documents like policies or manuals, making information access effortless." },
          { "title": "Multi-Channel Access", "description": "Use Alice AI on Telegram, Microsoft Teams, or web interfaces for convenient, anytime support." },
          { "title": "Scalable Architecture", "description": "Built with a robust architecture, Alice AI scales to support 100+ agents and integrates with various IT Tools." }
        ]
      },
      "benefitsByRole": {
        "headline": "Benefits for Employees and the Business",
        "roles": [
          {
            "name": "Employees",
            "benefit": "Instant, frustration-free support, 24/7.",
            "points": ["Get immediate answers and resolve issues without waiting.", "Access support on the go from any device.", "Stay productive and focused on high-value work."]
          },
          {
            "name": "IT Teams",
            "benefit": "Significant reduction in L1 tickets and manual tasks.",
            "points": ["Automate repetitive requests to reduce workload.", "Free up time to focus on more strategic IT initiatives.", "Provide consistent, accurate support around the clock."]
          },
          {
            "name": "HR & Operations",
            "benefit": "Streamlined access to information and policies.",
            "points": ["Provide instant answers to common HR and policy questions.", "Reduce the administrative burden on HR staff.", "Ensure all employees have access to the latest information."]
          },
          {
            "name": "Leadership",
            "benefit": "Increased productivity and an improved employee experience.",
            "points": ["Boost overall workforce productivity by reducing IT friction.", "Enhance the digital employee experience to improve retention.", "See a clear ROI through time and cost savings."]
          }
        ]
      },
      "integrations": {
        "headline": "Connects to Your Entire Workplace Ecosystem",
        "description": "Alice AI integrates with the essential IT, HR, and communication tools your business relies on.",
        "logos": ["Microsoft Teams", "Telegram", "Active Directory", "ServiceNow", "SharePoint"]
      },
      "deploymentAndSecurity": {
        "headline": "Enterprise-Ready and Secure",
        "sections": [
          { "icon": "☁️", "title": "Flexible Deployment", "description": "Available as a secure cloud service or on-premises for maximum control." },
          { "icon": "🔒", "title": "Secure and Compliant", "description": "Built with enterprise-grade security to protect sensitive data and interactions." }
        ]
      },
      "useCases": {
        "headline": "Real-World Examples of Alice in Action",
        "cases": [
          { "icon": "🔑", "title": "Effortless Password Resets", "description": "Reset forgotten AD or application passwords in seconds through a simple, guided conversation." },
          { "icon": "📄", "title": "Simplifying HR Policies", "description": "Ask questions like 'What are the types of leave available?' and get instant, accurate answers." },
          { "icon": "⚙️", "title": "Executing Infrastructure Tasks", "description": "Request a service restart on a Windows server and have Alice handle it for you seamlessly." },
          { "icon": "💡", "title": "On-Demand Knowledge Access", "description": "Find information buried in company wikis or manuals just by asking Alice a question." }
        ]
      },
      "whyAutointelli": {
        "headline": "Why Choose Alice AI?",
        "pillars": [
          { "icon": "🤖", "title": "Reduces IT Workload", "description": "Automates the most common and repetitive support requests." },
          { "icon": "😊", "title": "Enhances Employee Experience", "description": "Provides the instant, consumer-grade support employees expect." },
          { "icon": "🚀", "title": "Boosts Productivity", "description": "Minimizes downtime and keeps employees focused on their work." },
          { "icon": "⚡", "title": "Provides Instant Solutions", "description": "Delivers real-time answers and actions, not just links or tickets." }
        ]
      },
      "roi": {
        "headline": "A Clear Return on Investment",
        "stats": [
          { "value": 70, "unit": "%", "label": "Reduction in L1 Tickets" },
          { "value": 24, "unit": "/7", "label": "Virtual Worker Availability" },
          { "value": 1000, "unit": "s", "label": "of Employee Hours Saved" }
        ]
      },
      "finalCta": {
        "headline": "Ready to Give Your Employees a Smarter Assistant?",
        "subheadline": "See how Alice AI can transform your workplace support.",
        "buttons": [
          { "text": "See How It Works", "type": "primary" },
          { "text": "Contact Us", "type": "secondary" }
        ]
      }
    },
    {
      "id": "it-desk",
      "name": "IntelliDesk",
      "slug": "/products/it-desk",
      "hero": {
        "headline": "Revolutionize Your Customer and IT Support",
        "subheadline": "A next-generation intelligent helpdesk platform designed to streamline operations, boost efficiency, and deliver exceptional support experiences.",
        "image": intelliFlowImage,
        "ctaPrimary": "Get Started Today",
        "ctaSecondary": "View Features",
        "microStats": [
          { "value": "50%", "label": "Faster Resolution Time" },
          { "value": "AI", "label": "Powered Automation" },
          { "value": "All", "label": "Channels Unified" }
        ]
      },
      "intro": {
        "problem": "Traditional helpdesks are siloed and inefficient. Managing support across email, web, and chat is chaotic, leading to slow response times, frustrated users, and overworked agents.",
        "solution": "Autointelli Intellidesk replaces the chaos with a unified, AI-powered platform. It centralizes all support channels, automates routine tasks with intelligent workflows, and empowers users with a self-service knowledge base, leading to dramatically higher efficiency and satisfaction."
      },
      "platformOverview": {
        "headline": "The Intelligent Helpdesk Solution for Modern Teams",
        "summary": "Autointelli IT Desk is a simple yet powerful IT Service Desk Platform that helps you solve incidents and service requests efficiently. It combines multi-channel ticketing, AI-powered automation, a dynamic knowledge base, and comprehensive reporting into one easy-to-use solution.",
        "capabilities": [
          "Multi-channel ticketing from email, web, social, and chat",
          "AI-powered ticket categorization, priority, and routing",
          "Integrated knowledge base and customer self-service portals"
        ],
        "diagram": intelliFlowImage
      },
      "whatItMonitors": {
        "headline": "Managing the Entire Support Lifecycle",
        "categories": [
          { "icon": "🎟️", "name": "Ticket Management", "description": "Centralize and manage all support requests from any channel in one place." },
          { "icon": "🤖", "name": "Automation Workflows", "description": "Automate responses, trigger workflows, and route tickets intelligently." },
          { "icon": "📚", "name": "Knowledge Management", "description": "Build and maintain a dynamic knowledge base to enable self-service." },
          { "icon": "📊", "name": "Reporting & Analytics", "description": "Track SLAs, agent performance, and customer satisfaction with customizable dashboards." },
          { "icon": "👥", "name": "Customer Management", "description": "Maintain a complete view of customer interactions and history." },
          { "icon": "⏳", "name": "Escalation Management", "description": "Define and automate escalation rules to ensure timely resolutions." }
        ]
      },
      "architecture": {
        "headline": "Customizable, Scalable, and Secure",
        "layers": [
          { "name": "Multi-Channel Input", "description": "Seamlessly integrate with email, web forms, social media, and chat." },
          { "name": "AI Triage & Routing Engine", "description": "Intelligently categorizes, prioritizes, and assigns tickets to the right agent." },
          { "name": "Agent & Collaboration UI", "description": "An intuitive interface with internal notes and team collaboration tools." },
          { "name": "Integration Ecosystem", "description": "An API-first design allows for easy connection to CRM, telephony, and other tools." }
        ],
        "integrations": "Connects with your CRM, telephony systems, and other productivity tools."
      },
      "keyFeatures": {
        "headline": "A Feature-Rich Platform for World-Class Support",
        "features": [
          { "title": "Multi-Channel Ticketing", "description": "Seamless integration with email, web forms, social media, and chat with centralized ticket management." },
          { "title": "AI-Powered Automation", "description": "Intelligent ticket categorization, priority assignment, automated responses, and smart routing." },
          { "title": "Knowledge Base & Self-Service", "description": "A dynamic knowledge base with AI suggestions and customer self-service portals for quick resolutions." },
          { "title": "Collaboration & Reporting", "description": "Team collaboration tools, customizable dashboards, and comprehensive reporting on SLAs and performance." },
          { "title": "Customizable & Scalable", "description": "Fully customizable queues, processes, and UI with role-based access control that scales to enterprise-level operations." },
          { "title": "Multi-Tenancy Capability", "description": "Manage multiple departments or clients from a single platform with complete data separation." }
        ]
      },
      "benefitsByRole": {
        "headline": "Benefits of Autointelli Intellidesk",
        "roles": [
          {
            "name": "Support Agents",
            "benefit": "Enhanced efficiency and streamlined workflows.",
            "points": ["Reduce manual data entry and repetitive tasks.", "Focus on solving complex problems instead of ticket routing.", "Collaborate easily with other team members."]
          },
          {
            "name": "Customers / Employees",
            "benefit": "A superior and consistent support experience.",
            "points": ["Get faster responses and resolutions.", "Find answers quickly through self-service options.", "Receive personalized support across all touchpoints."]
          },
          {
            "name": "Managers",
            "benefit": "Data-driven decisions and cost savings.",
            "points": ["Track KPIs like CSAT, FCR, and response times.", "Optimize resource allocation and agent workload.", "Lower operational costs with automation and self-service."]
          },
          {
            "name": "Business",
            "benefit": "Seamless scalability and robust security.",
            "points": ["Grow without limits and easily onboard new teams.", "Ensure GDPR, HIPAA, and ISO-compliant data protection.", "Rely on an enterprise-grade, cloud-based infrastructure."]
          }
        ]
      },
      "integrations": {
        "headline": "Connects with Your Business-Critical Tools",
        "description": "Our API-first design makes it easy to integrate with your CRM, telephony systems, productivity tools, and more.",
        "logos": ["Salesforce", "Twilio", "Slack", "Jira"]
      },
      "deploymentAndSecurity": {
        "headline": "Enterprise-Grade, Secure, and Compliant",
        "sections": [
          { "icon": "☁️", "title": "Cloud-Based Scalability", "description": "Reliable and accessible cloud-based platform that scales from small teams to high-volume enterprises." },
          { "icon": "🔒", "title": "Security & Compliance", "description": "Features GDPR, HIPAA, and ISO-compliant data protection, audit trails, and secure access controls." }
        ]
      },
      "useCases": {
        "headline": "Versatile for Any Support Scenario",
        "cases": [
          { "icon": "🛒", "title": "E-Commerce Customer Support", "description": "Handle high-volume inquiries about orders, returns, and products with automated tracking and personalized responses." },
          { "icon": "💻", "title": "Internal IT Helpdesk", "description": "Streamline IT support by categorizing hardware/software issues, assigning to specialists, and tracking resolutions with SLAs." },
          { "icon": "🤝", "title": "Sales & Onboarding Support", "description": "Assist new customers during onboarding with guided self-service, chat integration, and follow-up tickets." },
          { "icon": "🚚", "title": "Field Service Coordination", "description": "Manage on-site support requests by scheduling technicians and updating customers in real-time." }
        ]
      },
      "whyAutointelli": {
        "headline": "The Intellidesk Advantage",
        "pillars": [
          { "icon": "💡", "title": "Intelligent Automation", "description": "Leverages AI to reduce manual work and increase agent productivity." },
          { "icon": "🌐", "title": "Unified Platform", "description": "Brings all your support channels and tools into one cohesive experience." },
          { "icon": "😊", "title": "Focus on Experience", "description": "Designed to deliver exceptional outcomes for both customers and agents." },
          { "icon": "📊", "title": "Data-Driven", "description": "Provides the actionable insights you need to continuously improve your support operations." }
        ]
      },
      "roi": {
        "headline": "Proven Impact on Support Operations",
        "stats": [
          { "value": 50, "unit": "%", "label": "Reduction in Resolution Time" },
          { "value": 40, "unit": "%", "label": "Lower Operational Costs" },
          { "value": 30, "unit": "%", "label": "Increase in CSAT" }
        ]
      },
      "finalCta": {
        "headline": "Ready to Elevate Your Helpdesk?",
        "subheadline": "Get in touch for a demo and see how Intellidesk can transform your support.",
        "buttons": [
          { "text": "See How It Works", "type": "primary" },
          { "text": "Contact Us", "type": "secondary" }
        ]
      }
    },
    {
      "id": "asset",
      "name": "Autointelli Asset",
      "slug": "/products/asset",
      "hero": {
        "headline": "Master Your Assets with IntelliAsset",
        "subheadline": "A cutting-edge IT asset management platform to track, manage, and optimize your hardware, software, and licenses with precision and intelligence.",
        "image": intelliFlowImage,
        "ctaPrimary": "Get Started Today",
        "ctaSecondary": "Take a Tour",
        "microStats": [
          { "value": "100%", "label": "Asset Visibility" },
          { "value": "Audit", "label": "Ready Compliance" },
          { "value": "Mobile", "label": "Enabled Tracking" }
        ]
      },
      "intro": {
        "problem": "Manual asset tracking with spreadsheets is inefficient, inaccurate, and risky. It leads to asset loss, over-purchasing of software licenses, and non-compliance during audits.",
        "solution": "IntelliAsset provides a powerful, simple-to-use platform to automate asset tracking from acquisition to retirement. Gain full, real-time visibility into your entire asset inventory, ensure software license compliance, and make data-driven decisions to optimize costs."
      },
      "platformOverview": {
        "headline": "Advanced Asset and License Management, Simplified",
        "summary": "IntelliAsset is a simple to use yet powerful IT Asset and License Management Platform. It provides at-a-glance access to your overall asset, license, accessories, and consumables inventory, with features like one-click check-in/check-out and automated notifications.",
        "capabilities": [
          "Full asset lifecycle tracking from acquisition to retirement",
          "Software license compliance management and reporting",
          "Mobile-friendly barcode and QR code scanning for audits"
        ],
        "diagram": intelliFlowImage
      },
      "whatItMonitors": {
        "headline": "Complete Visibility Over All Your Organizational Assets",
        "categories": [
          { "icon": "💻", "name": "IT Hardware", "description": "Track laptops, servers, peripherals, and network devices with full lifecycle history." },
          { "icon": "📜", "name": "Software Licenses", "description": "Monitor licenses, seats, and renewal dates to ensure compliance and avoid overspending." },
          { "icon": "🪑", "name": "Office Equipment", "description": "Manage physical assets like printers, furniture, and other equipment." },
          { "icon": "🔌", "name": "Accessories", "description": "Keep track of keyboards, mice, monitors, and other accessories assigned to users." },
          { "icon": "📦", "name": "Consumables", "description": "Monitor inventory levels of consumables like printer toner and office supplies." }
        ]
      },
      "architecture": {
        "headline": "Flexible, Integrated, and Secure by Design",
        "layers": [
          { "name": "Mobile Scanning Interface", "description": "Use any mobile device for fast check-in/check-out and inventory audits via barcode/QR codes." },
          { "name": "Centralized Asset Database", "description": "A single source of truth for all asset information, with customizable fields." },
          { "name": "Reporting & Analytics Engine", "description": "Generate custom dashboards and detailed reports on utilization, depreciation, and compliance." },
          { "name": "API & Directory Integration", "description": "Connect with LDAP, Active Directory, and ERP systems via a RESTful API." }
        ],
        "integrations": "Connects with your identity providers and ERP systems."
      },
      "keyFeatures": {
        "headline": "Everything You Need for Total Asset Control",
        "features": [
          { "title": "Comprehensive Asset Tracking", "description": "Track assets from acquisition to retirement with a full lifecycle history and audit logs." },
          { "title": "Barcode & QR Code Integration", "description": "Enable fast check-in/check-out and streamlined inventory audits via mobile scanning." },
          { "title": "Software License Management", "description": "Track licenses, seats, and renewal dates with automated expiration alerts and compliance reports." },
          { "title": "Asset Assignment System", "description": "Assign assets to users, teams, or locations and track custody with real-time availability status." },
          { "title": "Advanced Reporting & Analytics", "description": "Utilize custom dashboards and detailed utilization and depreciation reports for data-driven decisions." },
          { "title": "Email Notifications", "description": "Receive automated alerts for expiring warranties, license renewals, and low inventory." }
        ]
      },
      "benefitsByRole": {
        "headline": "Benefits of IntelliAsset for Your Organization",
        "roles": [
          {
            "name": "IT Managers",
            "benefit": "Cost optimization and streamlined operations.",
            "points": ["Eliminate manual tracking errors and prevent asset loss.", "Prevent over-purchasing of hardware and software.", "Simplify inventory audits and reporting."]
          },
          {
            "name": "Finance & Procurement",
            "benefit": "Actionable insights for budgeting and planning.",
            "points": ["Use utilization data to inform purchasing decisions.", "Track depreciation for accurate accounting.", "Optimize budget allocation based on real-world usage."]
          },
          {
            "name": "Security & Compliance",
            "benefit": "Enhanced security and regulatory compliance.",
            "points": ["Ensure software license compliance to avoid penalties.", "Generate audit-ready reports with a single click.", "Enforce security with role-based access controls."]
          },
          {
            "name": "Business",
            "benefit": "A scalable and flexible platform that grows with you.",
            "points": ["Choose between cloud or on-premises deployment.", "Supports an unlimited number of assets and users.", "Grows with your organization's needs."]
          }
        ]
      },
      "integrations": {
        "headline": "Integrates with Your Core Systems",
        "description": "IntelliAsset connects to your directory services, ERP, and other business systems via our RESTful API for a seamless workflow.",
        "logos": ["LDAP", "Active Directory", "ERP", "REST API"]
      },
      "deploymentAndSecurity": {
        "headline": "Scalable and Secure for Any Organization",
        "sections": [
          { "icon": "☁️", "title": "Flexible Deployment", "description": "Choose between cloud or on-premises deployment options to fit your needs. Supports unlimited assets and users." },
          { "icon": "🔒", "title": "Enhanced Security", "description": "Features role-based access with granular permissions, 2FA support, and encrypted data storage." }
        ]
      },
      "useCases": {
        "headline": "Trusted Across Diverse Industries and Scenarios",
        "cases": [
          { "icon": "💻", "title": "IT Hardware Management", "description": "Effortlessly track laptops, servers, and peripherals with barcode scanning and user assignments." },
          { "icon": "📜", "title": "Software License Compliance", "description": "Monitor software licenses to prevent overuse, track renewals, and generate compliance reports for audits." },
          { "icon": "🏢", "title": "Remote Workforce Asset Management", "description": "Track assets assigned to remote employees with mobile scanning and real-time status updates." },
          { "icon": "📋", "title": "Audit & Compliance Reporting", "description": "Simplify audits with detailed asset histories and exportable reports tailored to regulatory requirements." }
        ]
      },
      "whyAutointelli": {
        "headline": "The IntelliAsset Difference",
        "pillars": [
          { "icon": "🎯", "title": "Precision", "description": "Eliminates manual errors and provides a single source of truth for your asset inventory." },
          { "icon": "👍", "title": "Simplicity", "description": "An intuitive interface and mobile-first design make asset management easy for everyone." },
          { "icon": "💰", "title": "Cost Efficiency", "description": "Prevents asset loss and over-purchasing to deliver a clear return on investment." },
          { "icon": "🛡️", "title": "Compliance", "description": "Makes software license management and audit reporting effortless." }
        ]
      },
      "roi": {
        "headline": "Tangible Returns on Better Asset Management",
        "stats": [
          { "value": 20, "unit": "%", "label": "Reduction in Over-Purchasing" },
          { "value": 100, "unit": "%", "label": "Audit-Ready Compliance" },
          { "value": 80, "unit": "%", "label": "Faster Inventory Audits" }
        ]
      },
      "finalCta": {
        "headline": "Ready to Streamline Your Asset Management?",
        "subheadline": "Reach out for a demo and see how IntelliAsset can bring precision and intelligence to your operations.",
        "buttons": [
          { "text": "See How It Works", "type": "primary" },
          { "text": "Contact Us", "type": "secondary" }
        ]
      }
    }
  ]
}