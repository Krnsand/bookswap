
let currentUserId: string | null = null;

export function loginFake(userId: string) {
  currentUserId = userId;
}

export function logoutFake() {
  currentUserId = null;
}

export function getCurrentUserId() {
  return currentUserId;
}
