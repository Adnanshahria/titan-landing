import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff } from "lucide-react";

const ADMIN_PASS = "Technotechbd";

const AdminLogin = ({ onAuth }: { onAuth: () => void }) => {
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASS) {
      sessionStorage.setItem("admin-auth", "1");
      onAuth();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4">
      <motion.form
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        onSubmit={submit}
        className="glass-card rounded-2xl p-8 w-full max-w-sm gradient-border"
      >
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange to-orange-glow flex items-center justify-center mx-auto mb-6">
          <Lock className="text-secondary-foreground" size={24} />
        </div>
        <h1 className="font-heading text-2xl font-bold text-primary-foreground uppercase text-center mb-6">Admin Access</h1>
        <div className="relative">
          <input
            type={show ? "text" : "password"}
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Enter password"
            className="w-full glass-card text-primary-foreground rounded-xl px-4 py-3 pr-10 text-sm focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange/30 transition-all"
          />
          <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-steel hover:text-primary-foreground">
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {error && <p className="text-destructive text-xs mt-2 text-center">Incorrect password</p>}
        <button
          type="submit"
          className="w-full mt-4 bg-gradient-to-r from-orange to-orange-glow text-secondary-foreground font-heading font-semibold py-3 rounded-full uppercase tracking-wider transition-all hover:shadow-lg hover:shadow-orange/20"
        >
          Enter
        </button>
      </motion.form>
    </div>
  );
};

export default AdminLogin;
