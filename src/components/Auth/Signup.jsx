import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import SheetyServices from '../../service/sheetyservice'

export default function SignUp() {

  const navigate = useNavigate()
  const { register } = useAuth();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getPasswordStrength = () => {
    if (password.length === 0) return 0;
    if (password.length < 6) return 1;
    if (password.length < 10) return 2;
    return 4;
  };

  const strength = getPasswordStrength();

  const strengthText =
    strength <= 1 ? "Password is weak" :
      strength === 2 ? "Password is medium" :
        "Password is strong";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      return setError("All fields are required");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setLoading(true);

      const result = await SheetyServices.registerUser({
        name,
        email,
        password,
        role: 'user',
        remember
      });

      console.log('Result: ', result)

      if (result?.parkingUser) {
        const userData = result.parkingUser;
        register(userData);
        navigate("/dashboard");
      } else {
        setError(result?.error || "Signup failed");
      }
    } catch (err) {
      console.log(err)
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 font-sans text-white w-screen h-screen overflow-x-hidden flex flex-col">

      {/* Top Navigation */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-purple-500/20 px-6 lg:px-10 py-3 bg-gradient-to-r from-slate-900 via-purple-900/20 to-slate-900 flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="size-8 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold tracking-[-0.015em]">SmartPark</h2>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-sm font-medium text-[#617589] dark:text-[#9ca3af]">
            Already a member?
          </span>
          <button onClick={() => navigate('/')} className="h-12 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600  hover:from-purple-600/50 hover:to-cyan-600/50 text-purple-100 text-sm font-bold transition-all">
            Sign In
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex justify-center py-8 px-4 lg:px-8">
        <div className="w-full max-w-[1024px] flex-1">
          <div className="grid lg:grid-cols-2 gap-12 items-start lg:items-center h-full">

            {/* Left Visual */}
            <div className="hidden lg:flex relative rounded-2xl overflow-hidden min-h-[600px] shadow-lg group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCB-el89KSHtKf2UgI2Ia9fBgcACXh5WN0-xwNpOjui4bmjbzcWeQnj07eVfGJMPGPhPRkkChFjQ_gVCa4O97fcENfTV7rTTs2yfiZopoAzmYysQKiLYMVT4ijQ1jDRtysRE_OcXdJSqVRD9wWrFMyCOK6qUW92vG4kBX-zR-qQQrXGkVQgccrp3e0irINNL7Vx-pbl08UVJMiBe_JZM33Ck0v6bYHKIe2Esd8lirnA9kE8H9PGgV-Ly16D1E2YdnAK7k2MaaS_2aMK"
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="relative z-20 mt-auto p-10 text-white">
                <div className="mb-4 size-12 rounded-full bg-white/20 backdrop-blur-md border border-white/10 flex items-center justify-center">
                  {/* <span className="material-symbols-outlined text-2xl">
                    local_parking
                  </span> */}
                </div>
                <h3 className="text-3xl font-bold mb-2">
                  Smart parking for modern cities.
                </h3>
                <p className="text-white/80 text-lg">
                  Find, reserve, and pay for parking spots in real-time. Join
                  thousands of users saving time every day.
                </p>
              </div>
            </div>

            {/* Right Form */}
            <div className="flex flex-col max-w-[480px] mx-auto w-full">
              <div className="text-center mb-8">
                <h1 className="text-[32px] font-bold tracking-tight">
                  Create your account
                </h1>
                <p className="text-[#617589] dark:text-[#9ca3af] pt-2">
                  Manage your parking seamlessly.
                </p>
              </div>

              {error && <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg text-sm">{error}</div>}

              {/* Social Buttons */}
              <div className="flex flex-col gap-3 mb-6">
                <button className="h-12 rounded-lg border border-[#dbe0e6] dark:border-[#2a3846] bg-white dark:bg-[#1a2632] hover:bg-gray-50 dark:hover:bg-[#23303e] flex items-center justify-center gap-3 transition-colors">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkPNJEldzOXuayvnoVGj5wF0fsl3X25cy0d2pa5thaKimM53cRnd50r7Na75G-0Zj-Nkw7-5PXjkL9BeylxS6OgaRDtU1jaf9SzivbXxwTve1rkTmEKfFg-_u64Lgwf88IBZV578AlGqxmk_CkgTZO6Lg5pgxYoDvb3twyM-Xt0Bb1QTSGbqQi5JoUXM1qCjj7N_jfJj3sPQdoLJBMeihsdGQjdgIQWkf7dFzH4dVC8DQoJRqDdZbum1Jg3RiZQTs4MoeqrEoWdMEV"
                    className="size-5"
                    alt=""
                  />
                  <span className="font-medium">Sign up with Google</span>
                </button>

                <button className="h-12 rounded-lg border border-[#dbe0e6] dark:border-[#2a3846] bg-white dark:bg-[#1a2632] hover:bg-gray-50 dark:hover:bg-[#23303e] flex items-center justify-center gap-3 transition-colors">
                  <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.8 11.2C17.8 14.5 20.7 15.6 20.8 15.6C20.8 15.7 20.3 17.2 19.2 18.9C18.2 20.3 17.2 21.7 15.6 21.7C14.1 21.7 13.6 20.8 11.9 20.8C10.1 20.8 9.6 21.7 8.2 21.7C6.6 21.7 5.5 20.3 4.5 18.8C2.5 15.9 1 11.6 4 11.6C4.8 11.6 6.3 12.1 7.2 12.1C8.1 12.1 9.2 11.4 10.3 11.3C11.5 11.2 14.7 11.2 17.8 11.2Z" />
                  </svg>
                  <span className="font-medium">Sign up with Apple</span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative flex items-center justify-center mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#e5e7eb] dark:border-[#2a3846]" />
                </div>
                <span className="relative bg-[#f6f7f8] dark:bg-[#101922] px-4 text-sm text-[#617589] dark:text-[#9ca3af]">
                  Or continue with email
                </span>
              </div>

              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1">
                  <label htmlFor="fullname" className="text-sm font-medium">
                    Full Name
                  </label>
                  <input
                    id="fullname"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="h-12 rounded-lg border border-[#dbe0e6] dark:border-[#2a3846] bg-white dark:bg-[#1a2632] px-4 text-base focus:border-[#9333ea] focus:ring-1 focus:ring-[#9333ea]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="h-12 rounded-lg border border-[#dbe0e6] dark:border-[#2a3846] bg-white dark:bg-[#1a2632] px-4 text-base focus:border-[#9333ea] focus:ring-1 focus:ring-[#9333ea]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>

                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 w-full rounded-lg border border-[#dbe0e6] dark:border-[#2a3846] bg-white dark:bg-[#1a2632] px-4 pr-12 text-base focus:border-[#9333ea] focus:ring-1 focus:ring-[#9333ea] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#617589] hover:text-gray-900"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {showPassword ? '' : ''}
                      </span>
                    </button>
                  </div>

                  {/* Strength Bar */}
                  <div className="flex gap-1 h-1 mt-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`flex-1 rounded-full ${strength >= level
                          ? strength <= 1
                            ? "bg-red-400"
                            : strength === 2
                              ? "bg-yellow-400"
                              : "bg-green-400"
                          : "bg-[#e5e7eb] dark:bg-[#2a3846]"
                          }`}
                      />
                    ))}
                  </div>

                  {password.length > 0 && (
                    <span
                      className={`text-xs mt-0.5 ${strength <= 1
                        ? "text-red-500"
                        : strength === 2
                          ? "text-yellow-500"
                          : "text-green-500"
                        }`}
                    >
                      {strengthText}
                    </span>
                  )}
                </div>


                <div className="flex flex-col gap-1">
                  <label htmlFor="confirm_password" className="text-sm font-medium">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirm_password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-12 w-full rounded-lg border border-[#dbe0e6] dark:border-[#2a3846] bg-white dark:bg-[#1a2632] px-4 pr-12 focus:border-[#9333ea] focus:ring-1 focus:ring-[#9333ea]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="size-4 rounded border-gray-300 text-[#9333ea] focus:ring-[#9333ea]"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  <label htmlFor="remember" className="text-sm text-[#617589] dark:text-[#9ca3af]">
                    Remember me
                  </label>
                </div>

                <div className="flex items-start gap-3 mt-2">
                  <input
                    id="terms"
                    type="checkbox"
                    required
                    className="mt-1 size-4 rounded border-gray-300 text-[#9333ea] focus:ring-[#9333ea]"
                  />
                  <label htmlFor="terms" className="text-sm text-[#617589] dark:text-[#9ca3af]">
                    By creating an account, you agree to our{" "}
                    <a href="#" className="text-[#9333ea] font-medium hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-[#9333ea] font-medium hover:underline">
                      Privacy Policy
                    </a>.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 h-12 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white text-base font-bold shadow-lg shadow-purple-500/20 transition-all disabled:opacity-50"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>

              </form>

              <div className="mt-8 text-center text-sm text-[#617589] dark:text-[#9ca3af]">
                © 2026 SmartPark Inc. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
