import Cookies from "js-cookie";
import { COOKIES_OPTIONS } from "utils/constants";

const StorageTypes = ["localStorage", "sessionStorage", "Cookies", ""];
const [LocalStorageType, SessionStorageType, CookiesType, DefaultType] =
  StorageTypes;
const getMethodByStoreType = (storeType) => {
  let store = {};
  return {
    set(key, value) {
      switch (storeType) {
        case LocalStorageType:
          window.localStorage.setItem(key, JSON.stringify(value));
          break;
        case SessionStorageType:
          window.sessionStorage.setItem(key, JSON.stringify(value));
          break;
        case CookiesType:
          Cookies.set(key, JSON.stringify(value), COOKIES_OPTIONS);
          break;
        default:
          store[key] = value;
      }
    },
    get(key) {
      switch (storeType) {
        case LocalStorageType:
          let lValue = window.localStorage.getItem(key);
          return lValue ? JSON.parse(lValue) : "";
        case SessionStorageType:
          let sValue = window.sessionStorage.getItem(key);
          return sValue ? JSON.parse(sValue) : "";
        case CookiesType:
          let cValue = Cookies.get(key);
          return cValue ? JSON.parse(cValue) : "";
        default:
          return store[key];
      }
    },
    remove(key) {
      switch (storeType) {
        case LocalStorageType:
          window.localStorage.clear(key);
          break;
        case SessionStorageType:
          window.sessionStorage.clear(key);
          break;
        case CookiesType:
          Cookies.remove(key);
          break;
        default:
          delete store[key];
      }
    },
    extend(key) {
      if (storeType === CookiesType) {
        let v = this.get(key);
        this.set(key, v);
      } else {
        throw Error("'extend' is not defined for current 'storeType'");
      }
    },
  };
};
export const UtilsStorage = (() => ({
  LocalStorage: getMethodByStoreType(LocalStorageType),
  SessionStorage: getMethodByStoreType(SessionStorageType),
  Cookies: getMethodByStoreType(CookiesType),
  Default: getMethodByStoreType(DefaultType),
  Use(storeType) {
    if (StorageTypes.includes(storeType)) {
      return getMethodByStoreType(storeType);
    }
    throw Error("'Use' method need to specific an 'storeType' as parameter");
  },
}))();
