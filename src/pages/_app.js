import { ConfigProvider } from "antd";
import thTH from "antd/locale/th_TH";
import { IBM_Plex_Sans_Thai } from "next/font/google";
import "../styles/globals.css";

const fontRegularIBMPlexSansThai = IBM_Plex_Sans_Thai({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans-thai",
});

const theme = {
  token: {
    colorPrimary: "#5b6b82",
    colorBgBase: "#f8f7f4",
    colorTextBase: "#2d3748",
    colorLink: "#5b6b82",
    borderRadius: 8,
    wireframe: false,
  },
};

function MyApp({ Component, pageProps }) {
  return (
    <ConfigProvider locale={thTH} theme={theme}>
      <main
        className={`${fontRegularIBMPlexSansThai.variable} flex min-h-screen flex-col bg-[#f8f7f4] text-[#2d3748]`}
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
