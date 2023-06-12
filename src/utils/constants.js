// GUI Pages
export const LANDING_PATH = "/";
export const AUTH_PATH = "/auth";
export const SIGNOUT_PATH = "/signout";
export const LIST_PATH = "/list";

// Network
export const EXPIRED_TOKEN_TEXT = "Token is expired";
export const SUCCESS_TEXT = "บันทึกข้อมูลสำเร็จ";
export const BAD_REQUEST_TEXT =
  "ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบข้อมูลและลองใหม่อีกครั้ง";
export const NOT_FOUND_TEXT = "ไม่พบข้อมูล";
export const SERVER_INTERNAL_ERROR_TEXT =
  "ระบบขัดข้อง กรุณาลองใหม่อีกครั้งในภายหลัง";

// iAuthen
export const IAUTHEN_WRONG_USERNAME_PASSWORD_TEXT =
  "รหัสพนักงานหรือรหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบข้อมูลและลองใหม่อีกครั้ง";
export const IAUTHEN_PASSWORD_EXPIRED_TEXT =
  "รหัสผ่าน iAuthen ของท่านหมดอายุ ระบบกำลังนำท่านเข้าสู่หน้าเว็บ iAuthen เพื่อเปลี่ยนรหัสผ่าน ภายใน 3 วินาที";
export const IAUTHEN_NEW_USER_TEXT =
  "ท่านเป็นผู้ใช้ iAuthen ใหม่ ระบบกำลังนำท่านเข้าสู่หน้าเว็บ iAuthen เพื่อลงทะเบียน ภายใน 3 วินาที";

// Notification Config
export const DEFAULT_NOTIFICATION_CONFIG = {
  style: {
    top: 75, // px
  },
  duration: 5, // second
};

// Storages
export const STORAGE_KEY_TOKEN = "tkn";
export const STORAGE_KEY_EMPLOYEE_INFO = "emi";
export const STORAGE_KEY_IS_EXISING_USER = "eusr";
export const COOKIES_OPTIONS = { expires: 15 / 24 / 60 }; // 15 Minutes
