// 이메일 형식 검증 (폼 공통)
// 실무용 "충분히 정확한" 정규식: 공백 없는 local@domain.tld 형태.
// 전체 RFC 5322 는 과하므로 사용하지 않는다.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** 앞뒤 공백을 제거한 뒤 이메일 형식이 유효한지 반환한다. */
export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim());
}
