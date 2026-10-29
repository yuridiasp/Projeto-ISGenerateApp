export type AuthState = "IDLE" | "AUTHENTICATING" | "AUTHENTICATED";

let authState: AuthState = "IDLE";

export function getAuthState(): AuthState {
    return authState;
}

export function startAuthentication(): void {
    authState = "AUTHENTICATING";
}

export function completeAuthentication(): void {
    authState = "AUTHENTICATED";
}

export function resetAuthentication(): void {
    authState = "IDLE";
}

export function isAuthenticated(): boolean {
    return authState === "AUTHENTICATED";
}