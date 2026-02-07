export const VALIDATION_MESSAGES = {
  NAME: {
    INVALID: 'กรุณากรอกเฉพาะภาษาไทยหรือภาษาอังกฤษ',
    DISPLAY_NAME_INVALID: 'กรุณากรอกเฉพาะภาษาไทยหรือภาษาอังกฤษและตัวเลข',
  },
  USERNAME: {
    REQUIRED: 'กรุณากรอกชื่อผู้ใช้',
    MIN_LENGTH: 'ชื่อผู้ใช้ต้องมีความยาวอย่างน้อย 4 ตัวอักษร',
    INVALID: 'ชื่อผู้ใช้ห้ามมีอักษรพิเศษ (ใช้ได้แค่ A-Z และ 0-9)',
  },

  EMAIL: {
    REQUIRED: 'กรุณากรอกอีเมล',
    INVALID_FORMAT: 'รูปแบบอีเมลไม่ถูกต้อง',
  },

  PASSWORD: {
    REQUIRED: 'กรุณากรอกรหัสผ่าน',
    MIN_LENGTH: 'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร',
    INVALID: 'รหัสผ่านต้องประกอบด้วยตัวพิมพ์ใหญ่ และตัวเลขอย่างน้อย 1 ตัว',
  },
} as const;

export const DB_ERROR_CODES = {
  UNIQUE_VIOLATION: '23505',
  FOREIGN_KEY_VIOLATION: '23503',
} as const;

export const DB_VALIDATION_MESSAGES: Record<string, string> = {
  [DB_ERROR_CODES.UNIQUE_VIOLATION]: 'ชื่อผู้ใช้งานหรืออีเมลมีอยู่แล้วในระบบ',
  [DB_ERROR_CODES.FOREIGN_KEY_VIOLATION]: 'ข้อมูลอ้างอิงไม่ถูกต้อง',
};
