import { useState } from "react";
import { Link } from "react-router-dom";
import { resetPassword } from "../../services/authService";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      await resetPassword(email);
      setMessage("Password reset email sent! Please check your inbox.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md border rounded-lg p-6 space-y-4"
      >
        <h1 className="text-3xl font-bold text-center">
          Forgot Password
        </h1>

        {message && (
          <p className="text-green-600 text-sm">
            {message}
          </p>
        )}

        {error && (
          <p className="text-red-500 text-sm">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border rounded p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded"
        >
          Send Reset Link
        </button>

        <p className="text-center text-sm">
          <Link
            to="/login"
            className="text-blue-600 hover:underline"
          >
            Back to Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default ForgotPassword;