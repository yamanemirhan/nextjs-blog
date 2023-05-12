import Navbar from '@/components/Navbar';

import Provider from '@/components/Provider';

import './globals.css';

export const metadata = {
  title: 'Blog',
  description: 'Share Blogs',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <main className="relative z-10 flex justify-center items-center flex-col max-w-7xl mx-auto sm:px-16 px-6">
            <Navbar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
