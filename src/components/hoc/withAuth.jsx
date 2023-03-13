import { encodeURL } from "js-base64";
import { useRouter } from "next/router";

import { AUTH_PATH, LANDING_PATH, STORAGE_KEY_TOKEN } from "utils/constants";
import { UtilsStorage } from "utils/storage";

export const withAuthRequired = (Component) => {
  return (props) => {
    const router = useRouter();
    let isAuthenticated = !!UtilsStorage.Cookies.get(STORAGE_KEY_TOKEN);
    if (!isAuthenticated) {
      router.push(
        `${AUTH_PATH}?redirect=${encodeURL(window.location.pathname)}`
      );
      return;
    }
    return <Component {...props} />;
  };
};

export const withAuthSkipped = (Component) => {
  return (props) => {
    const router = useRouter();
    let isAuthenticated = !!UtilsStorage.Cookies.get(STORAGE_KEY_TOKEN);
    if (isAuthenticated) {
      router.push(LANDING_PATH);
      return null;
    }
    return <Component {...props} />;
  };
};
