import cardIcon1 from '../src/assets/NMS.png';
import cardIcon2 from '../src/assets/OPSDUTY.png';
import cardIcon3 from '../src/assets/FLOW.png';
import cardIcon4 from '../src/assets/SECURITA.png';
import cardIcon5 from '../src/assets/HELPDESK.png';
import cardIcon6 from '../src/assets/ALICE.png';
import cardIcon7 from '../src/assets/ASSET.png';

// Import client logos from bc removed folder (background removed versions)
import logo1 from '../bc removed/access health.png';
import logo3 from '../bc removed/election.png';
import logo4 from '../bc removed/india cements.png';
import logo5 from '../bc removed/mahindra.png';
import logo7 from '../bc removed/motorola.png';
import logo9 from '../bc removed/royal sundaram.png';

export const opsData = {
  title: "MONITOR AND MANAGE ALL YOUR IT INFRA OPERATIONS",
  subtitle: "With the Increasing Complexity of Today’s Heterogeneous Networks, It Has Become Imperative for Organizations to Invest In a Robust IT Operations Platform. ",

  title2: "A Single Platform to Automate and Manage Your Entire IT Ecosystem",
  subtitle2: "Master the complexity of modern IT with an integrated suite that revolutionizes support, manages assets with precision, and reduces workloads with AI-powered self-service.",
  
  illustrationText: {
    text1: "AUTOINTELLI",
    text2: "ITOPS"
  },

  illustrationText2: {
    text1: "COMPLETE",
    text2: "MANAGEMENT SUITE"
  },

  rectangleCards: [
    {
      icon: cardIcon5,
      title: "Intelligent Helpdesk Solution",
      subtext: "Revolutionize your support with an AI-powered, multi-channel ticketing system designed to streamline workflows and boost efficiency."
    },
    {
      icon: cardIcon7,
      title: "IT ASSET MANAGEMENT",
      subtext: "Track, manage, and optimize your IT hardware and software assets from acquisition to retirement with precision and intelligence."
    },
    {
      icon: cardIcon6,
      title: "AI-Powered Employee Self-Service",  
      subtext: "Empower your employees with an intelligent AI assistant that instantly resolves IT issues, resets passwords, and answers policy questions."
    },
    {
      icon: cardIcon4,
      title: "CLOUD MANAGEMENT",
      subtext: "Simplify and optimize your cloud operations with our comprehensive management solutions."
    },
  ],

  trustedBy: {
    title: "Trusted By",
    subtext: "Chosen by enterprises that demand reliability, security, and scale.",
    logos: [
      { id: 1, src: logo1, alt: "Access Health" },
      { id: 3, src: logo3, alt: "Election" },
      { id: 4, src: logo4, alt: "India Cements" },
      { id: 5, src: logo5, alt: "Mahindra" },
      { id: 7, src: logo7, alt: "Motorola" },
      { id: 9, src: logo9, alt: "Royal Sundaram" },
    ]
  },

  cards: [
    {
      icon: cardIcon1,
      title: "Unified Network Observability",
      paragraph: "Gain a 360° view of your hybrid IT infrastructure's health and performance with a single, unified monitoring platform."
    },
    {
      icon: cardIcon2,
      title: "Intelligent Alert Management",
      paragraph: "Integrate all your monitoring tools to suppress alert noise , correlate events, and trigger automated remediation playbooks."
    },
    {
      icon: cardIcon3,
      title: "IT Process Automation",
      paragraph: "Streamline complex, cross-team runbooks into reliable, auditable workflows to remove manual toil and accelerate operations."
    },
    {
      icon: cardIcon4,
      title: "Secure Remote Access",
      paragraph: "Access your systems and applications securely from anywhere, using just a web browser with no software installation required."
    }
  ],

  // New section for the Team Component
  teamSection: {
    title: "EVERY TEAM CAN DISCOVER A WAY FORWARD",
    subtitle: "Do not let your application slowdown impacts your business. Align Autointelli according to your environment and achieve trailblazing results.",
    boxes: [
      {
        title: "Aggregate Everything",
        subtitle: "Reduce Noise, Correlate Events",
        description: "Reduce noise through Event Deduplication & Filtration"
      },
      {
        title: "Correlate & Analyse",
        subtitle: "Improve Operating Efficiency",
        description: "Analyze your alert, Automate First level Remediation and Reduce MTTR"
      },
      {
        title: "Automate",
        subtitle: "Automate without limits",
        description: "Scale IT Operations with 100s of Pre-define Automation templates"
      }
    ]
  }
};

