# Moment - Personal Desktop Application

Moment is a cross-platform desktop application built with Next.js and Tauri, featuring diary management, todo lists, and financial tracking capabilities.

## ✨ Features

- 📝 Diary Management: Record and manage personal diaries
- ✅ Todo Lists: Create and manage task lists
- 💰 Financial Tracking: Monitor and manage personal finances
- 📅 Calendar View: Intuitive calendar interface
- 🎨 Modern UI: Elegant interface based on Material-UI
- 🔒 Local Storage: Secure local data storage
- 🚀 Cross-Platform: Support for Windows, macOS, and Linux

## 🚀 Quick Start

### System Requirements

- Node.js 20 or higher
- Rust 1.70 or higher
- System Dependencies:
  - Windows: [Microsoft Visual Studio C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)
  - macOS: Xcode Command Line Tools
  - Linux: See [Tauri Documentation](https://tauri.app/v1/guides/getting-started/prerequisites)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/moment.git
cd moment
```

2. Install dependencies:
```bash
npm install
```

3. Initialize the database:
```bash
npx prisma generate
```

### Development

Run the development server:
```bash
npm run dev
```

This will start both the Next.js development server and the Tauri application.

### Building

Build for production:
```bash
npm run build
npm run build:tauri
```

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/) - React Framework
- [Tauri](https://tauri.app/) - Build cross-platform desktop apps
- [Material-UI](https://mui.com/) - UI Component Library
- [Prisma](https://www.prisma.io/) - Database ORM
- [FullCalendar](https://fullcalendar.io/) - Calendar Component
- [TypeScript](https://www.typescriptlang.org/) - Type-Safe JavaScript

## 📦 Project Structure

```
moment/
├── app/                # Next.js application
│   ├── api/           # API routes
│   ├── components/    # React components
│   └── lib/          # Utility functions and configs
├── src-tauri/         # Tauri related code
├── prisma/           # Database models and migrations
└── public/           # Static assets
```

## 🤝 Contributing

Contributions are welcome! Feel free to submit a Pull Request or create an Issue.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tauri](https://tauri.app/)
- [Material-UI](https://mui.com/)
- [FullCalendar](https://fullcalendar.io/)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
