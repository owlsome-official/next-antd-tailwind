import { ConfigProvider } from "antd";
import thTH from "antd/locale/th_TH";
import { IBM_Plex_Sans_Thai } from "next/font/google";
import "../styles/globals.css";

const fontRegularIBMPlexSansThai = IBM_Plex_Sans_Thai({
  weight: ["400", "700"],
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }) {
  return (
    <ConfigProvider
      locale={thTH}
      theme={{
        token: {
          colorPrimary: "#00F5C0",
          wireframe: true,
        },
      }}
    >
      <main
        className={`${fontRegularIBMPlexSansThai.className} flex flex-col min-h-screen`}
      >
        <Component {...pageProps} />
      </main>
    </ConfigProvider>
  );
}

export default MyApp;

{
  /* // ## pre-snippet for recoil. ## //
  import { RecoilRoot } from "recoil";
  function MyApp({ Component, pageProps }) {
    return (
      <RecoilRoot>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Component {...pageProps} />
        </React.Suspense>
        </RecoilRoot>
        <Component {...pageProps} />
    )
  }
  */
}
