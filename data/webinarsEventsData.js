export const webinarsEventsData = [
  {
    id: 1,
    title: 'Getting Started with Autointelli NMS',
    description: 'Learn the basics of network monitoring and observability with Autointelli NMS. We will cover installation, configuration, and basic dashboard creation.',
    type: 'Webinar',
    technology: 'NMS',
    useCase: 'Monitoring',
    date: '2024-12-15',
    time: '2:00 PM EST',
    speaker: 'John Smith',
    image: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: '#'
  },
  {
    id: 2,
    title: 'Automating IT Operations with IntelliFlow',
    description: 'Discover how to automate complex IT workflows and reduce manual tasks. See real-world examples of automation in action.',
    type: 'Webinar',
    technology: 'IntelliFlow',
    useCase: 'Automation',
    date: '2024-12-20',
    time: '3:00 PM EST',
    speaker: 'Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: '#'
  },
  {
    id: 3,
    title: 'Autointelli User Conference 2024',
    description: 'Join us for our annual user conference. Connect with peers, learn from experts, and see the future of Autointelli.',
    type: 'Event',
    technology: 'All',
    useCase: 'General',
    date: '2024-11-10',
    time: '9:00 AM EST',
    speaker: 'Multiple',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: '#'
  },
  {
    id: 4,
    title: 'Security Best Practices with Autointelli Securita',
    description: 'Secure remote access and session management best practices. Protect your infrastructure from threats.',
    type: 'Webinar',
    technology: 'Securita',
    useCase: 'Security',
    date: '2024-12-22',
    time: '1:00 PM EST',
    speaker: 'Mike Davis',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: '#'
  },
  {
    id: 5,
    title: 'AI-Powered Support with Alice AI',
    description: 'Leverage AI to provide intelligent self-service support to your users. Reduce ticket volume and improve user satisfaction.',
    type: 'Webinar',
    technology: 'Alice AI',
    useCase: 'AI',
    date: '2024-12-25',
    time: '4:00 PM EST',
    speaker: 'Emily Chen',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: '#'
  },
  {
    id: 6,
    title: 'DevOps Summit 2024',
    description: 'A gathering of DevOps professionals to discuss the latest trends and technologies.',
    type: 'Event',
    technology: 'General',
    useCase: 'DevOps',
    date: '2024-10-05',
    time: '10:00 AM EST',
    speaker: 'Various',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: '#'
  },
  {
    id: 7,
    title: 'IT Asset Management Strategies',
    description: 'Optimize your IT asset lifecycle and reduce costs. Learn how to track and manage your hardware and software assets.',
    type: 'Webinar',
    technology: 'IntelliAsset',
    useCase: 'Asset Management',
    date: '2024-12-28',
    time: '2:30 PM EST',
    speaker: 'Robert Wilson',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: '#'
  },
  {
    id: 8,
    title: 'Building a Modern Service Desk',
    description: 'Transform your IT service desk with modern tools and practices. Improve agent productivity and customer experience.',
    type: 'Webinar',
    technology: 'IntelliDesk',
    useCase: 'Service Desk',
    date: '2024-12-30',
    time: '3:30 PM EST',
    speaker: 'Lisa Anderson',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: '#'
  }
];

export const filterOptions = {
  types: ['Webinar', 'Event'],
  technologies: ['NMS', 'IntelliFlow', 'Securita', 'Alice AI', 'IntelliAsset', 'IntelliDesk', 'General'],
  useCases: ['Monitoring', 'Automation', 'Security', 'AI', 'Asset Management', 'Service Desk', 'DevOps', 'General'],
  years: ['2024', '2025']
};
