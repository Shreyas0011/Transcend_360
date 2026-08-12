export interface ServicePortal {
  id: string;
  title: string;
  description: string;
  features: string[];
  status: 'active' | 'coming_soon' | 'future';
  url?: string;
  category: string;
  iconName: string;
  gradient: string;
}

export interface Announcement {
  id: string;
  title: string;
  description: string;
  category: 'Hostel' | 'Facilities' | 'Transportation' | 'Academic' | 'General' | 'Emergency';
  priority: 'High' | 'Medium' | 'Low';
  date: string;
  postedBy: string;
}

export interface ActivityLog {
  id: string;
  user: string;
  role: string;
  action: string;
  details: string;
  time: string;
  category: 'hostel' | 'facility' | 'transport' | 'announcement';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  category: 'hostel' | 'facility' | 'transport' | 'general';
  read: boolean;
  actionUrl?: string;
}

// Integrated and future portals list
export const servicePortals: ServicePortal[] = [
  {
    id: 'facilities',
    title: 'Facilities Management',
    description: 'Manage room bookings, auditorium reservations, sports facilities, and campus infrastructure requests.',
    features: ['Room Booking', 'Auditorium Booking', 'Sports Facilities', 'Approval Workflow'],
    status: 'active',
    url: '/facilities',
    category: 'Infrastructure',
    iconName: 'Building2',
    gradient: 'from-blue-600/20 via-blue-500/10 to-transparent'
  },
  {
    id: 'hostel',
    title: 'Hostel Management',
    description: 'Manage hostel operations digitally with meal booking, leave requests, notifications, and attendance tracking.',
    features: ['Meal Booking', 'Leave Requests', 'Attendance', 'Hostel Notices'],
    status: 'active',
    url: '/hostel',
    category: 'Student Life',
    iconName: 'Home',
    gradient: 'from-amber-600/20 via-amber-500/10 to-transparent'
  },
  {
    id: 'transportation',
    title: 'Transportation Management',
    description: 'Manage transportation services, routes, buses, and travel requests.',
    features: ['Bus Tracking', 'Route Management', 'Travel Requests', 'Transport Notifications'],
    status: 'active',
    url: '/transportation',
    category: 'Logistics',
    iconName: 'Bus',
    gradient: 'from-purple-600/20 via-purple-500/10 to-transparent'
  },
  {
    id: 'alumni',
    title: 'Alumni Portal',
    description: 'Connect with former graduates, network, track success stories, and manage donation workflows.',
    features: ['Alumni Directory', 'Mentorship Matching', 'Career Networking', 'Giving & Funding'],
    status: 'future',
    category: 'Community',
    iconName: 'GraduationCap',
    gradient: 'from-gray-700/20 to-transparent'
  },
  {
    id: 'placement',
    title: 'Placement Portal',
    description: 'Empowering students to land their dream jobs with companies, schedules, resume building and mock assessments.',
    features: ['Resume Builder', 'Drive Scheduling', 'Interview Invites', 'Job Listings'],
    status: 'future',
    category: 'Career',
    iconName: 'Briefcase',
    gradient: 'from-gray-700/20 to-transparent'
  },
  {
    id: 'inventory',
    title: 'Inventory Portal',
    description: 'Centralized cataloging and distribution system for campus utilities, lab equipment, and stationary.',
    features: ['Lab Equipment Booking', 'Item Requests', 'Stock Audit', 'Vendor Registry'],
    status: 'future',
    category: 'Operations',
    iconName: 'Package',
    gradient: 'from-gray-700/20 to-transparent'
  },
  {
    id: 'studentservices',
    title: 'Student Services',
    description: 'Gateway for transcripts, ID cards, certificates, scholarships, and general academic support applications.',
    features: ['Transcript Request', 'Scholarship Apply', 'ID Card Issuing', 'Grievance Redressal'],
    status: 'future',
    category: 'Student Life',
    iconName: 'Users',
    gradient: 'from-gray-700/20 to-transparent'
  },
  {
    id: 'lms',
    title: 'Learning Management System',
    description: 'Interactive classrooms, coursework submittals, virtual tests, grading systems and digital libraries.',
    features: ['Course Materials', 'Assignment Uploads', 'Online Tests', 'Gradebook View'],
    status: 'future',
    category: 'Academic',
    iconName: 'BookOpen',
    gradient: 'from-gray-700/20 to-transparent'
  },
  {
    id: 'events',
    title: 'Event Management',
    description: 'Orchestrating campus fests, conferences, tech hackathons, and guest lectures with custom registrations.',
    features: ['Event Ticketing', 'Stall Bookings', 'Volunteer Management', 'Sponsorship Portal'],
    status: 'future',
    category: 'Community',
    iconName: 'CalendarRange',
    gradient: 'from-gray-700/20 to-transparent'
  },
  {
    id: 'hr',
    title: 'HR & Staff Management',
    description: 'Staff payroll, leave workflows, evaluation cycles, recruitment tracking, and internal communications.',
    features: ['Payroll & Payslips', 'Leave Approval', 'Evaluation Metrics', 'Recruitment Pipeline'],
    status: 'future',
    category: 'Operations',
    iconName: 'FileBadge',
    gradient: 'from-gray-700/20 to-transparent'
  }
];

export const mockAnnouncements: Announcement[] = [
  {
    id: 'a1',
    title: 'Emergency Maintenance: Main Sewer Line Repair',
    description: 'The main sewage line near Blocks C and D is undergoing emergency repairs. Water supply will be temporarily shut off in these blocks from 10:00 PM to 4:00 AM tonight.',
    category: 'Emergency',
    priority: 'High',
    date: '2026-06-19',
    postedBy: 'Campus Warden'
  },
  {
    id: 'a2',
    title: 'Hostel Outing Timings Extended for Fest',
    description: 'In light of the upcoming Transcend Annual Fest, curfew timings for all hostels have been extended to 11:30 PM for June 20th - June 22nd. Please carry your digital ID cards.',
    category: 'Hostel',
    priority: 'High',
    date: '2026-06-19',
    postedBy: 'Chief Warden'
  },
  {
    id: 'a3',
    title: 'Auditorium Booking Restrictions for Convocation',
    description: 'The Main Auditorium will remain booked from June 24th to June 28th for Convocation rehearsals and ceremonies. Students cannot book this facility during this window.',
    category: 'Facilities',
    priority: 'Medium',
    date: '2026-06-18',
    postedBy: 'Facilities Manager'
  },
  {
    id: 'a4',
    title: 'New Night Shuttle Bus Route (Route N-4)',
    description: 'Starting Monday, a new night shuttle bus will run between the Main Campus and the Metro Station every 40 minutes starting from 8:00 PM until midnight.',
    category: 'Transportation',
    priority: 'Medium',
    date: '2026-06-17',
    postedBy: 'Transport In-charge'
  },
  {
    id: 'a5',
    title: 'LMS Server Migration Schedule',
    description: 'The LMS server will be migrated to the new cloud cluster on Saturday night. Expect brief downtime of about 2 hours starting from 1:00 AM.',
    category: 'Academic',
    priority: 'Low',
    date: '2026-06-15',
    postedBy: 'IT Department'
  },
  {
    id: 'a6',
    title: 'Orientation for Placement Drive 2026',
    description: 'A mandatory orientation session for students registering for final placements will be held in the Seminar Hall on June 22nd at 2:00 PM.',
    category: 'General',
    priority: 'Medium',
    date: '2026-06-14',
    postedBy: 'Placement Officer'
  }
];

export const mockActivityLogs: ActivityLog[] = [
  {
    id: 'log1',
    user: 'Shreyas Nair',
    role: 'Student',
    action: 'Hostel leave approved',
    details: 'Weekend leave request for Home Visit approved by Warden.',
    time: '2 hours ago',
    category: 'hostel'
  },
  {
    id: 'log2',
    user: 'Dr. Aarav Sharma',
    role: 'Faculty',
    action: 'Facility booking approved',
    details: 'Seminar Room 2 booked for CSE Guest Lecture on June 22.',
    time: '4 hours ago',
    category: 'facility'
  },
  {
    id: 'log3',
    user: 'Admin System',
    role: 'System',
    action: 'New campus announcement',
    details: 'Curfew extension and new shuttle timings posted to main board.',
    time: '6 hours ago',
    category: 'announcement'
  },
  {
    id: 'log4',
    user: 'Transport Officer',
    role: 'Staff',
    action: 'Transportation update',
    details: 'Shuttle Bus T-8 current route altered due to road repairs near High Road.',
    time: '1 day ago',
    category: 'transport'
  },
  {
    id: 'log5',
    user: 'Shreyas Nair',
    role: 'Student',
    action: 'Meal booking updated',
    details: 'Special Sunday Feast meal booked successfully.',
    time: '1 day ago',
    category: 'hostel'
  },
  {
    id: 'log6',
    user: 'Facilities Manager',
    role: 'Admin',
    action: 'Sports Arena reserved',
    details: 'Basketball Court reserved for Inter-college Selection trials.',
    time: '2 days ago',
    category: 'facility'
  }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Leave Request Approved',
    message: 'Your leave request for 20th-22nd June has been approved by Warden Vikram Rathore.',
    time: '10 mins ago',
    category: 'hostel',
    read: false,
    actionUrl: 'http://hostel.localhost:5173'
  },
  {
    id: 'n2',
    title: 'Room Booking Confirmed',
    message: 'Your booking request for Badminton Court 2 has been confirmed for tomorrow 6:00 PM.',
    time: '1 hour ago',
    category: 'facility',
    read: false,
    actionUrl: 'http://facilities.localhost:5173'
  },
  {
    id: 'n3',
    title: 'Bus Route Updated',
    message: 'Route N-4 has been added to the transportation system. Live tracking will launch shortly.',
    time: '3 hours ago',
    category: 'transport',
    read: true,
    actionUrl: 'http://transportation.localhost:5173'
  },
  {
    id: 'n4',
    title: 'New Hostel Notice',
    message: 'Chief Warden issued an extension of night curfew. Review active guidelines.',
    time: '5 hours ago',
    category: 'hostel',
    read: false,
    actionUrl: '#'
  },
  {
    id: 'n5',
    title: 'Server Migration Window',
    message: 'LMS Portal migration will cause service interruptions this Saturday morning.',
    time: '1 day ago',
    category: 'general',
    read: true
  }
];
