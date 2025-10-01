# 🎓 No Code LMS Builder with Aptos Payments

## 🌟 Overview
A comprehensive full-stack Learning Management System (LMS) that enables educators to create, manage, and monetize online courses without any coding knowledge. Built with Next.js and integrated with Aptos blockchain for secure cryptocurrency payments.

## 📝 Description
This project is a complete no-code learning management system that integrates Aptos payments, allowing users to:
- **Create and manage courses** with an intuitive drag-and-drop interface
- **Accept payments** in APT cryptocurrency through secure blockchain transactions
- **Build beautiful course pages** with rich content and interactive elements
- **Manage students and track progress** through a comprehensive dashboard
- **Customize pricing and content** with flexible course builder tools

## 🚀 Vision
To democratize online education by providing an accessible, secure, and powerful platform that enables anyone to become an online educator, while leveraging blockchain technology for transparent and efficient payments.

## 🔮 Future Scope
- **AI-powered content generation** for course materials
- **Advanced analytics dashboard** with learner insights
- **Mobile application** for iOS and Android
- **Multi-language support** for global accessibility
- **Integration with external tools** (Zoom, Google Drive, etc.)
- **NFT certificates** for course completion
- **Decentralized storage** for course content
- **Community features** with forums and peer-to-peer learning

## ✨ Features

### 🏗️ Course Creation & Management
- **Visual Course Builder** - Intuitive drag-and-drop interface
- **Rich Content Editor** - Add videos, text, images, and interactive elements
- **Lesson Organization** - Structure content with sections and chapters
- **Preview Mode** - Test your course before publishing
- **Draft/Publish System** - Control course visibility

### 💰 Aptos Blockchain Integration
- **Secure APT Payments** - Accept payments in Aptos cryptocurrency
- **Smart Contract Integration** - Automated payment processing
- **Wallet Connection** - Support for Petra, Martian, and Pontem wallets
- **Transaction Verification** - Real-time payment confirmation
- **Low Transaction Fees** - Efficient blockchain transactions

### 👨‍🏫 Instructor Dashboard
- **Course Analytics** - Track student enrollment and progress
- **Revenue Tracking** - Monitor earnings and payment history
- **Student Management** - View and manage enrolled students
- **Performance Metrics** - Course ratings and feedback

### 🎨 User Experience
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Professional UI** - Modern and intuitive interface
- **Fast Loading** - Optimized performance with Next.js
- **SEO Optimized** - Better discoverability for courses

### 🔐 Authentication & Security
- **Secure Login/Signup** - Protected user accounts
- **Session Management** - Persistent user sessions
- **Role-based Access** - Different permissions for instructors and students
- **Data Protection** - Secure handling of user information

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Aptos CLI (for smart contract deployment)
- Git

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/codeREDxbt/NoCodeLMSbuilder-withAptosPayments.git
   cd NoCodeLMSbuilder-withAptosPayments
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   ```bash
   cp .env.example .env.local
   # Configure your environment variables
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:3000`

## 📱 Application Structure

### 🏠 Homepage (`/`)
- Hero section with call-to-action
- Feature highlights
- Course showcase
- Pricing information

### 🔐 Authentication
- **Sign In** (`/auth/signin`) - User login
- **Sign Up** (`/auth/signup`) - New user registration

### 📚 Course Management
- **Course Listing** (`/courses`) - Browse all available courses
- **Course Details** (`/course/[id]`) - Detailed course information
- **Course Builder** (`/builder`) - Create and edit courses

### 📊 Dashboard (`/dashboard`)
- Course management interface
- Analytics and statistics
- Student enrollment tracking
- Revenue monitoring

### 💳 Pricing (`/pricing`)
- Subscription plans
- Feature comparison
- Payment options

## 🔗 Contract Address
**Aptos Testnet:** `0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef`
*(Contract will be deployed and address updated)*

## 🚀 Deployment Instructions

### Smart Contract Deployment
1. **Install Aptos CLI:**
   ```bash
   curl -fsSL "https://aptos.dev/scripts/install_cli.py" | python3
   ```

2. **Initialize Aptos account:**
   ```bash
   aptos init
   ```

3. **Deploy the contract:**
   ```bash
   aptos move publish --package-dir sources/
   ```

### Web Application Deployment
1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel/Netlify:**
   ```bash
   npm run deploy
   ```

## 🎯 Key Pages & Navigation

| Page | Route | Description |
|------|-------|-------------|
| Homepage | `/` | Landing page with features |
| Sign In | `/auth/signin` | User authentication |
| Sign Up | `/auth/signup` | User registration |
| Dashboard | `/dashboard` | Instructor control panel |
| Courses | `/courses` | Browse all courses |
| Course Detail | `/course/[id]` | Individual course page |
| Course Builder | `/builder` | Create/edit courses |
| Pricing | `/pricing` | Subscription plans |

## 🎮 Interactive Features

### ✅ Working Functionalities
- **User Authentication** - Complete login/signup flow
- **Course Creation** - Full course builder with lessons
- **Course Browsing** - Filter and search courses
- **Payment Integration** - Aptos wallet connection
- **Responsive Design** - Mobile-friendly interface
- **Navigation** - Smooth routing between pages
- **Form Validation** - Real-time input validation
- **Dashboard Analytics** - Course statistics display

### 🔄 User Flow
1. **New User Journey:**
   - Visit homepage → Sign up → Access dashboard → Create course → Publish

2. **Student Journey:**
   - Browse courses → View details → Connect wallet → Pay with APT → Access content

3. **Instructor Journey:**
   - Login → Dashboard → Course builder → Add content → Set pricing → Publish

## 🔧 Technical Stack
- **Frontend:** Next.js 14, React, TypeScript
- **Styling:** Tailwind CSS, Radix UI
- **Blockchain:** Aptos, Move Language
- **State Management:** React Hooks, Local Storage
- **Icons:** Lucide React
- **Authentication:** Custom implementation
- **Deployment:** Vercel (Web), Aptos Network (Smart Contracts)

## � Demo Access

**Try the live platform with pre-configured demo accounts:**

### 🎭 Demo User Accounts
- **👨‍🏫 Instructor Account**
  - Email: `instructor@demo.com`
  - Password: `demo123`
  - Role: Course creator with full dashboard access

- **👩‍🎓 Student Account**
  - Email: `student@demo.com` 
  - Password: `demo123`
  - Role: Learner with enrollment and progress tracking

- **👑 Admin Account**
  - Email: `admin@demo.com`
  - Password: `demo123`
  - Role: Platform administrator with system management

### 🎯 Demo Features
- **One-click login** buttons for instant access
- **Role-based dashboards** with customized content
- **Sample course data** and analytics
- **Simulated payments** and transactions
- **Interactive course builder** experience

## 🌐 Deployment

### 📦 Vercel Deployment (Recommended)
This project is optimized for Vercel deployment:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Deploy to production"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com) and import your repository
   - Vercel auto-detects Next.js configuration
   - Deployment happens automatically

3. **Environment Setup** (Optional)
   ```bash
   # Copy environment template
   cp .env.example .env.local
   
   # Configure for production in Vercel dashboard
   NEXT_PUBLIC_APP_URL=your-deployed-url
   NEXT_PUBLIC_DEMO_MODE=true
   ```

### 🔧 Other Platforms
Compatible with:
- **Netlify** - Static site deployment
- **Railway** - Full-stack hosting
- **DigitalOcean** - App platform
- **AWS Amplify** - Serverless deployment

## �📸 Screenshots
![Deployment Screenshot](image-1.png)
*Aptos smart contract deployment confirmation*

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support
For support and questions:
- Create an issue on GitHub
- Join our Discord community
- Email: support@nocodeLMS.com

## 🙏 Acknowledgments
- Aptos Labs for blockchain infrastructure
- Vercel for hosting platform
- Open source community for tools and libraries

---

**🌟 Star this repository if you find it helpful!**