"use client";
import "react-toastify/dist/ReactToastify.css";
import "simplebar-react/dist/simplebar.min.css";
import "flatpickr/dist/themes/light.css";
import "react-svg-map/lib/index.css";
import "leaflet/dist/leaflet.css";
import "./scss/app.scss";

import store from "../store";
import AuthProvider from "@/components/Provider";
import './globals.css'
import StoreProvider from "@/components/storeprov";



export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name='viewport'content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'/>
          <link href="https://fonts.cdnfonts.com/css/nexa-bold" rel="stylesheet"/>
          <link href="https://fonts.cdnfonts.com/css/dalek-pinpoint" rel="stylesheet"/>
          <link href="/favicon.ico" rel="shortcut icon" />
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
          <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;1,700&family=Poppins:wght@300&family=Tilt+Warp&display=swap" rel="stylesheet"/>
          <link href="https://fonts.googleapis.com/css2?family=Goldman&display=swap" rel="stylesheet"/>
          <link href="https://fonts.cdnfonts.com/css/brittany-signature" rel="stylesheet"/>
          <link rel="manifest" href="/manifest.json"  />
          <meta name="application-name" content="PWA App" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="PWA App" />
          <meta name="description" content="Best PWA App in the world" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-config" content="/icons/browserconfig.xml" />
          <meta name="msapplication-TileColor" content="#2B5797" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#000000" />

          <link rel="apple-touch-icon" href="/ico.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/ico.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/ico.png" />
          <link rel="apple-touch-icon" sizes="167x167" href="/ico.png" />

          <link rel="icon" type="image/png" sizes="32x32" href="/ico.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/ico.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/ico.png" color="#5bbad5" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />

        </head>
          
        <body className="font-inter  custom-tippy dashcode-app">
          <AuthProvider>
            <StoreProvider store={store}>
              {children}
              </StoreProvider>
          </AuthProvider>
        </body>
      </html>
    </>
  );
}
