"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Leaf,
  Lock,
  Mail,
  Phone,
  RefreshCw,
  ShieldCheck,
  X,
} from "lucide-react";

import { buttonStyles } from "@/components/ui/button";
import { apiLogin, apiSignup } from "@/lib/auth-client";
import {
  validateEmail,
  validateIdentifier,
  validateLoginPassword,
  validateMobile,
  validatePassword,
} from "@/lib/auth-validation";
import { useAuth } from "@/lib/use-auth";
import type { Lang } from "@/lib/use-language";
import { getDisplayName } from "@/lib/user-display";
import { cn } from "@/lib/utils";

type Mode = "login" | "signup";
type SignupStep = "details" | "password" | "done";

interface AuthModalProps {
  open: boolean;
  mode: Mode;
  next: string;
  lang: Lang;
  onClose: () => void;
  onSwitchMode: (mode: Mode) => void;
}

const T: Record<Lang, Record<string, string>> = {
  en: {
    login_title: "Welcome back",
    login_sub: "Sign in to your farm dashboard",
    signup_title: "Create your account",
    signup_sub: "Join Kisan Sathi in a few steps",
    identifier: "Mobile number or email",
    mobile: "Mobile number",
    email: "Email",
    password: "Password",
    confirm: "Confirm password",
    captcha: "Enter the code below",
    login_btn: "Login",
    continue_btn: "Continue",
    verify_btn: "Verify code",
    create_btn: "Create account",
    new_here: "New to the app?",
    have_account: "Already have an account?",
    signup_link: "Sign up",
    login_link: "Login",
    forgot: "Forgot password?",
    please_wait: "Please wait...",
    captcha_mismatch: "The code you entered does not match.",
    terms: "By continuing you agree to our terms and privacy policy.",
    otp_title: "Verify your email",
    otp_sub: "We sent a 6-digit code to",
    otp_label: "Enter the 6-digit code",
    resend: "Resend code",
    resent: "A new code has been sent.",
    pw_title: "Set your password",
    pw_sub: "Choose a strong password to secure your account",
    pw_rule: "At least 8 characters, 1 number, and 1 special character.",
    done_title: "Account created!",
    done_sub: "You can now log in with your credentials.",
    go_login: "Go to login",
    back: "Back",
    dev_note: "Demo mode: your code is",
  },
  hi: {
    login_title: "वापसी पर स्वागत है",
    login_sub: "अपने डैशबोर्ड में साइन इन करें",
    signup_title: "अपना खाता बनाएं",
    signup_sub: "कुछ चरणों में किसान साथी से जुड़ें",
    identifier: "मोबाइल नंबर या ईमेल",
    mobile: "मोबाइल नंबर",
    email: "ईमेल",
    password: "पासवर्ड",
    confirm: "पासवर्ड की पुष्टि करें",
    captcha: "नीचे दिया कोड दर्ज करें",
    login_btn: "लॉगिन",
    continue_btn: "आगे बढ़ें",
    verify_btn: "कोड सत्यापित करें",
    create_btn: "खाता बनाएं",
    new_here: "ऐप पर नए हैं?",
    have_account: "पहले से खाता है?",
    signup_link: "साइन अप",
    login_link: "लॉगिन",
    forgot: "पासवर्ड भूल गए?",
    please_wait: "कृपया प्रतीक्षा करें...",
    captcha_mismatch: "दर्ज किया गया कोड मेल नहीं खाता।",
    terms: "आगे बढ़ने पर आप हमारी शर्तों और गोपनीयता नीति से सहमत होते हैं।",
    otp_title: "अपना ईमेल सत्यापित करें",
    otp_sub: "हमने 6 अंकों का कोड भेजा है",
    otp_label: "6 अंकों का कोड दर्ज करें",
    resend: "कोड फिर से भेजें",
    resent: "नया कोड भेज दिया गया है।",
    pw_title: "अपना पासवर्ड सेट करें",
    pw_sub: "अपने खाते को सुरक्षित रखने के लिए मजबूत पासवर्ड चुनें",
    pw_rule: "कम से कम 8 अक्षर, 1 अंक और 1 विशेष अक्षर।",
    done_title: "खाता बन गया!",
    done_sub: "अब आप अपने विवरण से लॉगिन कर सकते हैं।",
    go_login: "लॉगिन पर जाएं",
    back: "पीछे",
    dev_note: "डेमो मोड: आपका कोड है",
  },
};

function makeCaptcha(): string {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 5; i += 1) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

export function AuthModal({
  open,
  mode,
  next,
  lang,
  onClose,
  onSwitchMode,
}: AuthModalProps) {
  const router = useRouter();
  const { signIn } = useAuth();
  const t = T[lang];

  // Shared fields
  const [identifier, setIdentifier] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");

  const [signupStep, setSignupStep] = useState<SignupStep>("details");
  const [info, setInfo] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Inline, per-field errors shown in red beneath each input.
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const setFieldError = (key: string, msg: string | null) =>
    setFieldErrors((prev) => {
      const next = { ...prev };
      if (msg) next[key] = msg;
      else delete next[key];
      return next;
    });

  const resetAll = () => {
    setError(null);
    setInfo(null);
    setFieldErrors({});
    setCaptcha(makeCaptcha());
    setCaptchaInput("");
    setPassword("");
    setConfirm("");
    setSignupStep("details");
    setShowPassword(false);
    setShowConfirm(false);
  };

  // Reset transient state when opening or switching modes.
  useEffect(() => {
    if (open) resetAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, mode]);

  // Lock scroll + close on Escape.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const err =
      validateIdentifier(identifier) || validateLoginPassword(password);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const session = await apiLogin(identifier.trim(), password);
      signIn(session);
      onClose();
      // Trigger the one-time "Welcome, <name>" splash on the next screen.
      window.sessionStorage.setItem("ks-welcome-name", getDisplayName(session.user));
      // First-time farmers complete their profile once before the dashboard.
      if (!session.user.onboarded) {
        router.push(`/onboarding?next=${encodeURIComponent(next || "/dashboard")}`);
      } else {
        router.push(next || "/dashboard");
      }
    } catch (err2) {
      setError(err2 instanceof Error ? err2.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  // Signup step 1: mobile + email + captcha -> go to password.
  const handleDetails = (e: React.FormEvent) => {
    e.preventDefault();
    const err =
      validateMobile(mobile) ||
      validateEmail(email) ||
      (captchaInput.trim().toUpperCase() !== captcha
        ? t.captcha_mismatch
        : null);
    if (err) {
      setError(err);
      if (captchaInput.trim().toUpperCase() !== captcha) {
        setCaptcha(makeCaptcha());
        setCaptchaInput("");
      }
      return;
    }
    setError(null);
    setInfo(null);
    setSignupStep("password");
  };

  // Signup step 2: set password -> create account -> back to login.
  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const pwErr = validatePassword(password);
    const confirmErr =
      !confirm
        ? "Please confirm your password."
        : password !== confirm
          ? "Passwords do not match."
          : null;
    setFieldError("password", pwErr);
    setFieldError("confirm", confirmErr);
    if (pwErr || confirmErr) {
      setError(null);
      return;
    }
    setError(null);
    setLoading(true);
    try {
      // Account is created in the backend; the user is NOT signed in here -
      // they are sent to the login screen to sign in with the new password.
      await apiSignup({
        mobile: mobile.trim(),
        email: email.trim(),
        password,
        confirmPassword: confirm,
      });
      setSignupStep("done");
      setInfo(null);
    } catch (err2) {
      setError(err2 instanceof Error ? err2.message : "Could not create account.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100";
  const fieldWrap = "space-y-1.5 text-sm font-medium text-slate-700";

  const headerTitle =
    mode === "login"
      ? t.login_title
      : signupStep === "password"
        ? t.pw_title
        : signupStep === "done"
          ? t.done_title
          : t.signup_title;

  const headerSub =
    mode === "login"
      ? t.login_sub
      : signupStep === "password"
        ? t.pw_sub
        : signupStep === "done"
          ? t.done_sub
          : t.signup_sub;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
      />

      <div className="relative z-10 max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl scroll-slim sm:rounded-3xl sm:p-7">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-white">
            <Leaf className="h-5 w-5" />
          </span>
          <div>
            <p className="text-lg font-bold text-slate-900">{headerTitle}</p>
            <p className="text-xs text-slate-500">{headerSub}</p>
          </div>
        </div>

        {/* Signup progress indicator */}
        {mode === "signup" && signupStep !== "done" ? (
          <div className="mt-4 flex items-center gap-2">
            {(["details", "password"] as SignupStep[]).map((s, i) => {
              const order = ["details", "password"];
              const active = order.indexOf(signupStep) >= i;
              return (
                <span
                  key={s}
                  className={cn(
                    "h-1.5 flex-1 rounded-full transition",
                    active ? "bg-emerald-500" : "bg-slate-200",
                  )}
                />
              );
            })}
          </div>
        ) : null}

        {error ? (
          <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
            {error}
          </div>
        ) : null}

        {info ? (
          <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            {info}
          </div>
        ) : null}

        {/* ---------------- LOGIN ---------------- */}
        {mode === "login" ? (
          <form onSubmit={handleLogin} className="mt-5 space-y-4">
            <label className={fieldWrap}>
              <span className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-600" />
                {t.identifier}
              </span>
              <input
                autoFocus
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className={inputClass}
                placeholder="98765 43210"
              />
            </label>

            <label className={fieldWrap}>
              <span className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-emerald-600" />
                {t.password}
              </span>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={cn(inputClass, "pr-12")}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </label>

            <div className="flex justify-end">
              <Link
                href="/auth/forgot-password"
                onClick={onClose}
                className="text-xs font-semibold text-emerald-700 hover:underline"
              >
                {t.forgot}
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={buttonStyles("primary", "w-full justify-center")}
            >
              {loading ? t.please_wait : t.login_btn}
              {!loading ? <ArrowRight className="h-4 w-4" /> : null}
            </button>

            <p className="text-center text-sm text-slate-500">
              {t.new_here}{" "}
              <button
                type="button"
                onClick={() => onSwitchMode("signup")}
                className="font-semibold text-emerald-700 hover:underline"
              >
                {t.signup_link}
              </button>
            </p>
          </form>
        ) : null}

        {/* ---------- SIGNUP STEP 1: DETAILS + CAPTCHA ---------- */}
        {mode === "signup" && signupStep === "details" ? (
          <form onSubmit={handleDetails} className="mt-5 space-y-4">
            <label className={fieldWrap}>
              <span className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-600" />
                {t.mobile}
              </span>
              <input
                autoFocus
                inputMode="numeric"
                maxLength={10}
                value={mobile}
                onChange={(e) =>
                  setMobile(e.target.value.replace(/[^\d]/g, ""))
                }
                className={inputClass}
                placeholder="9876543210"
              />
            </label>

            <label className={fieldWrap}>
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-600" />
                {t.email}
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="ramesh@example.com"
              />
            </label>

            {/* Captcha */}
            <div className={fieldWrap}>
              <span>{t.captcha}</span>
              <div className="flex items-center gap-3">
                <span className="select-none rounded-2xl border border-slate-200 bg-slate-100 px-4 py-2.5 font-mono text-lg font-bold tracking-[0.35em] text-slate-700 line-through decoration-slate-300">
                  {captcha}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setCaptcha(makeCaptcha());
                    setCaptchaInput("");
                  }}
                  aria-label="Refresh code"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
              <input
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                className={cn(inputClass, "uppercase tracking-widest")}
                placeholder="Enter code"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={buttonStyles("primary", "w-full justify-center")}
            >
              {loading ? t.please_wait : t.continue_btn}
              {!loading ? <ArrowRight className="h-4 w-4" /> : null}
            </button>

            <p className="text-center text-xs leading-5 text-slate-400">
              {t.terms}
            </p>

            <p className="text-center text-sm text-slate-500">
              {t.have_account}{" "}
              <button
                type="button"
                onClick={() => onSwitchMode("login")}
                className="font-semibold text-emerald-700 hover:underline"
              >
                {t.login_link}
              </button>
            </p>
          </form>
        ) : null}

        {/* ---------- SIGNUP STEP 2: PASSWORD ---------- */}
        {mode === "signup" && signupStep === "password" ? (
          <form onSubmit={handleSetPassword} className="mt-5 space-y-4">
            <label className={fieldWrap}>
              <span className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-emerald-600" />
                {t.password}
              </span>
              <div className="relative">
                <input
                  autoFocus
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    const value = e.target.value;
                    setPassword(value);
                    setFieldError("password", validatePassword(value));
                    if (confirm) {
                      setFieldError(
                        "confirm",
                        value !== confirm ? "Passwords do not match." : null,
                      );
                    }
                  }}
                  className={cn(
                    inputClass,
                    "pr-12",
                    fieldErrors.password &&
                      "border-rose-400 focus:border-rose-400 focus:ring-rose-100",
                  )}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {fieldErrors.password ? (
                <p className="text-xs font-medium text-rose-600">
                  {fieldErrors.password}
                </p>
              ) : null}
            </label>

            <label className={fieldWrap}>
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                {t.confirm}
              </span>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => {
                    const value = e.target.value;
                    setConfirm(value);
                    setFieldError(
                      "confirm",
                      !value
                        ? null
                        : value !== password
                          ? "Passwords do not match."
                          : null,
                    );
                  }}
                  className={cn(
                    inputClass,
                    "pr-12",
                    fieldErrors.confirm &&
                      "border-rose-400 focus:border-rose-400 focus:ring-rose-100",
                    confirm && !fieldErrors.confirm &&
                      "border-emerald-400 focus:border-emerald-400",
                  )}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((s) => !s)}
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {showConfirm ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {fieldErrors.confirm ? (
                <p className="text-xs font-medium text-rose-600">
                  {fieldErrors.confirm}
                </p>
              ) : confirm && password && confirm === password ? (
                <p className="text-xs font-medium text-emerald-600">
                  Passwords match.
                </p>
              ) : null}
            </label>

            <p className="rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-500">
              {t.pw_rule}
            </p>

            <button
              type="submit"
              disabled={loading}
              className={buttonStyles("primary", "w-full justify-center")}
            >
              {loading ? t.please_wait : t.create_btn}
              {!loading ? <ArrowRight className="h-4 w-4" /> : null}
            </button>
          </form>
        ) : null}

        {/* ---------- SIGNUP STEP 4: DONE ---------- */}
        {mode === "signup" && signupStep === "done" ? (
          <div className="mt-6 space-y-5 text-center">
            <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-9 w-9" />
            </span>
            <button
              type="button"
              onClick={() => onSwitchMode("login")}
              className={buttonStyles("primary", "w-full justify-center")}
            >
              {t.go_login}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
