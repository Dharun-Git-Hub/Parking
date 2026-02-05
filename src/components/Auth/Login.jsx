import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import SheetyServices from '../../service/sheetyservice'

export default function Login() {

  const navigate = useNavigate();
  const { login, user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false)

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      return setError("Email and password are required");
    }

    try {
      setLoading(true);

      const result = await SheetyServices.loginUser(email, password, remember);
      console.log(result)
      if (result) {
        setLoading(true);
        console.log('User Data: ', result)
        login(result, remember);
        setLoading(false);
        navigate("/dashboard")
      }
      else {
        setError(result.error || "Login failed");
      }
    } catch (err) {
      console.log(err)
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 text-white font-display antialiased overflow-x-hidden w-screen h-screen">
      <div className="flex w-full h-full">

        {/* Left Hero Section */}
        <div className="hidden lg:flex w-1/2 relative bg-gradient-to-br from-slate-900 via-purple-900/40 to-slate-900 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105 "
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBcwSxNEDsOPJkxoTvrWUNRo4IDJ14-4ZSI0KYRn_vo1nXDoZkrF2UBnNKNSua4apXPTDpbmoP70sb8GAor_OTwMBVhnMsUXBKMxRUW6LOhoz3dakc-MGyvM-2NOcIAWCy2mN76Ivpx0-ffeLET2-S9PG1H9hzD8hreAsUaunGcUVep440KEWgrOxvqkBtOZEpKC_lwoXyNgigt-x6KHvGq5ExYL668hJpo9g4klePjNcUXMv54aK6BvXbnhhCWuL43jKsdqsLGbmjH")',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-purple-950/50 to-transparent" />

          <div className="relative z-10 flex flex-col justify-end p-16 w-full">
            <div className="flex items-center gap-3 mb-6 text-white">
              <div className="size-10 bg-gradient-to-r from-purple-600 to-cyan-600 backdrop-blur-sm rounded-lg flex items-center justify-center border border-purple-500/30">
                <span className="material-symbols-outlined text-white text-[24px]">

                </span>
              </div>
              <span className="text-xl font-bold tracking-tight">
                SmartPark
              </span>
            </div>

            <h2 className="text-4xl font-bold mb-4 leading-tight text-white">
              Find Parking<br />
              Made Easy
            </h2>
            <p className="text-slate-300 text-lg max-w-lg">
              Book parking spaces instantly with real-time availability, secure payments, and complete peace of mind.
            </p>
          </div>
        </div>

        {/* Right Login Section */}
        <div className="flex flex-1 flex-col justify-center items-center px-6 py-12 lg:px-20 xl:px-32 relative">

          {/* Mobile Logo */}
          <div className="lg:hidden absolute top-8 left-6 flex items-center gap-2">
            <div className="size-8 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-lg">

              </span>
            </div>
            <span className="font-bold text-lg text-white">SmartPark</span>
          </div>

          <div className="w-full max-w-[440px] space-y-8">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl font-black tracking-[-0.033em] mb-2">
                Welcome Back
              </h1>
              <p className="text-slate-400 text-sm">
                Please enter your details to access your account.
              </p>
            </div>

            {error && <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg text-sm">{error}</div>}

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email or Username
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3.5 text-gray-500">
                      <span className="material-symbols-outlined text-[20px]">

                      </span>
                    </span>
                    <input
                      id="email"
                      type="text"
                      placeholder="Enter your email"
                      className="flex h-12 w-full rounded-lg border border-slate-700 bg-slate-800 px-11 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-purple-600"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label htmlFor="password" className="text-sm font-medium">
                      Password
                    </label>
                    <a href="#" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                      Forgot Password?
                    </a>
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-3.5 text-gray-500">
                      <span className="material-symbols-outlined text-[20px]">

                      </span>
                    </span>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="flex h-12 w-full rounded-lg border border-slate-700 bg-slate-800 px-11 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-purple-600"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-3.5 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {showPassword ? '' : ''}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Remember */}
              <div className="flex items-center space-x-2">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-purple-600 focus:ring-purple-600/50 cursor-pointer"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <label
                  htmlFor="remember"
                  className="text-sm text-slate-400 cursor-pointer"
                >
                  Remember for 30 days
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full h-12 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-medium hover:from-purple-700 hover:to-cyan-700 transition-all shadow-lg shadow-purple-600/20 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>

              {/* Footer */}
              <div className="text-center text-sm">
                <span className="text-slate-400">
                  Don't have an account?{" "}
                </span>
                <a onClick={() => navigate('/register')} className="text-cyan-400 font-medium hover:text-cyan-300 transition-colors cursor-pointer">
                  Sign up
                </a>
              </div>
            </form>
          </div>

          <div className="absolute bottom-6 text-xs text-gray-400 dark:text-gray-600">
            © 2023 Smart Parking Systems Inc.
          </div>
        </div>
      </div>
    </div>
  );
}
