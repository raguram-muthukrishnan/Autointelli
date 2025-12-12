import cardIcon1 from '../src/assets/NMS.png';
import cardIcon2 from '../src/assets/OPSDUTY.png';
import cardIcon3 from '../src/assets/FLOW.png';
import cardIcon4 from '../src/assets/SECURITA.png';
import cardIcon5 from '../src/assets/HELPDESK.png';
import cardIcon6 from '../src/assets/ALICE.png';
import cardIcon7 from '../src/assets/ASSET.png';

// Import client logos from Clientlogos folder
import logo2 from '../src/assets/Clientlogos/brila_group.png';
import logo4 from '../src/assets/Clientlogos/election.png';
import logo5 from '../src/assets/Clientlogos/india cements.png';
import logo6 from '../src/assets/Clientlogos/mahindra.png';
import logo7 from '../src/assets/Clientlogos/ministry-and-health-family-welfare.png';
import logo8 from '../src/assets/Clientlogos/motorola.png';
import logo10 from '../src/assets/Clientlogos/Rapiddata.png';
import logo13 from '../src/assets/Clientlogos/sundaramfinance-final.png';
import logo14 from '../src/assets/Clientlogos/UPL.png';
import logo15 from '../src/assets/Clientlogos/accenture.png';
import logo16 from '../src/assets/Clientlogos/Fujitsu-Logo.svg';
import logo17 from '../src/assets/Clientlogos/idea.png';
import logo18 from '../src/assets/Clientlogos/indian_railway.png';
import logo19 from '../src/assets/Clientlogos/Iress_logo.png';
import logo20 from '../src/assets/Clientlogos/kotak.png';
import logo21 from '../src/assets/Clientlogos/L&T.png';
import logo22 from '../src/assets/Clientlogos/Ministry_of_Science_and_Technology_India.svg.png';
import logo23 from '../src/assets/Clientlogos/TNeGA- .png';

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
      { id: 2, src: logo2, alt: "Birla Group", width: 160, height: 70 },
      { id: 15, src: logo15, alt: "Accenture", width: 200, height: 70 },
      { id: 7, src: logo7, alt: "Ministry of Health and Family Welfare", width: 160, height: 70 },
      { id: 6, src: logo6, alt: "Mahindra", width: 200, height: 70 },
      { id: 16, src: logo16, alt: "Fujitsu", width: 200, height: 70 },
      { id: 4, src: logo4, alt: "Election Commission", width: 160, height: 70 },
      { id: 19, src: logo19, alt: "Iress", width: 200, height: 70 },
      { id: 23, src: logo23, alt: "TNeGA", width: 160, height: 70 },
      { id: 5, src: logo5, alt: "India Cements", width: 200, height: 70 },
      { id: 20, src: logo20, alt: "Kotak", width: 200, height: 70 },
      { id: 22, src: logo22, alt: "Ministry of Science and Technology", width: 160, height: 70 },
      { id: 8, src: logo8, alt: "Motorola", width: 200, height: 70 },
      { id: 17, src: logo17, alt: "Idea", width: 160, height: 70 },
      { id: 10, src: logo10, alt: "Rapiddata", width: 200, height: 70 },
      { id: 21, src: logo21, alt: "L&T", width: 200, height: 70 },
      { id: 18, src: logo18, alt: "Indian Railway", width: 160, height: 70 },
      { id: 13, src: logo13, alt: "Sundaram Finance", width: 200, height: 70 },
      { id: 14, src: logo14, alt: "UPL", width: 200, height: 70 },
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

