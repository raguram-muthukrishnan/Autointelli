export const tutorialsData = {
  pageTitle: "Product Tutorials",
  pageSubtitle: "Learn how to use Autointelli products with step-by-step video guides",
  channelLink: "https://www.youtube.com/@autointelli1842",
  
  categories: [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-8-5zm0 18c-3.31-.91-6-4.39-6-8.5V8.3l6-3.6 6 3.6v3.2c0 4.11-2.69 7.59-6 8.5z"/><path d="M10.23 14.83l-2.12-2.12-1.41 1.41 3.53 3.53 7.07-7.07-1.41-1.41z"/></svg>,
      color: "#F0CE1D",
      description: "Essential tutorials to help you get up and running with Autointelli"
    },
    {
      id: "advanced",
      title: "Advanced Features",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>,
      color: "#F0CE1D",
      description: "Deep dive into advanced capabilities and best practices"
    },
    {
      id: "integrations",
      title: "Integrations & Automation",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 7V3H8v4H2v14h20V7h-6zm-6-2h4v2h-4V5zm10 16H4V9h16v12z"/><path d="M9 11h2v8H9zm4 0h2v8h-2z"/></svg>,
      color: "#F0CE1D",
      description: "Connect Autointelli with your existing tools and workflows"
    }
  ],
  
  videos: [
    {
      id: 1,
      title: "Introduction to Autointelli Platform",
      description: "Get started with Autointelli - learn the basics of our IT operations platform and how it can transform your infrastructure management.",
      videoId: "KWC6-iVFpKQ",
      url: "https://youtu.be/KWC6-iVFpKQ?si=PZLm_SlUo9iaKU4k",
      duration: "10:25",
      category: "getting-started",
      tags: ["Introduction", "Platform Overview", "Getting Started"]
    },
    {
      id: 2,
      title: "Setting Up Your First Monitoring Agent",
      description: "Step-by-step guide to installing and configuring monitoring agents across your infrastructure for comprehensive visibility.",
      videoId: "yyR3_n9Ls7c",
      url: "https://youtu.be/yyR3_n9Ls7c?si=Z0LOaKq41BB45fzx",
      duration: "15:30",
      category: "getting-started",
      tags: ["Monitoring", "Agent Setup", "Configuration"]
    },
    {
      id: 3,
      title: "Creating Custom Dashboards and Reports",
      description: "Learn how to build powerful custom dashboards and generate insightful reports tailored to your specific needs.",
      videoId: "m8jkKDjss2E",
      url: "https://youtu.be/m8jkKDjss2E?si=IDZTOI_kouMz8GTv",
      duration: "12:45",
      category: "advanced",
      tags: ["Dashboards", "Reports", "Customization"]
    },
    {
      id: 4,
      title: "Incident Management Workflow",
      description: "Master the complete incident management lifecycle from detection to resolution with automated workflows and escalations.",
      videoId: "kbkoKo2ON1Y",
      url: "https://youtu.be/kbkoKo2ON1Y?si=GyPaO0EOuNe4gvU4",
      duration: "18:20",
      category: "advanced",
      tags: ["Incident Management", "Workflows", "Automation"]
    },
    {
      id: 5,
      title: "Integrating with Slack and MS Teams",
      description: "Connect Autointelli with your team collaboration tools for real-time alerts and seamless communication.",
      videoId: "jQS-Qwr1CBQ",
      url: "https://youtu.be/jQS-Qwr1CBQ?si=6a_FMmXyKXNMteri",
      duration: "8:15",
      category: "integrations",
      tags: ["Slack", "MS Teams", "Integrations", "Alerts"]
    },
    {
      id: 6,
      title: "Automation Scripts and Runbooks",
      description: "Automate repetitive tasks and create intelligent runbooks to streamline your IT operations and reduce manual work.",
      videoId: "p2vJoBH_F0w",
      url: "https://youtu.be/p2vJoBH_F0w?si=ZvAlbPD7xO90cOSb",
      duration: "20:10",
      category: "integrations",
      tags: ["Automation", "Scripts", "Runbooks", "DevOps"]
    }
  ]
};
