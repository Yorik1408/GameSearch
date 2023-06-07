import { type AppType } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { Inter } from 'next/font/google';

import '~/styles/globals.css';
import { api } from '~/utils/api';
import { AppLayout } from '~/layouts/AppLayout';

const inter = Inter({
  subsets: ['latin'],
});

const MyApp: AppType = ({ Component, pageProps }) => (
  <>
    <style jsx global>
      {`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}
    </style>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </ThemeProvider>
  </>
);

export default api.withTRPC(MyApp);
