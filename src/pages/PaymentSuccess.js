import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, X, Loader2 } from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState('checking');
  const [attempts, setAttempts] = useState(0);

  const pollStatus = useCallback(async () => {
    if (!sessionId || attempts >= 5) {
      if (attempts >= 5) setStatus('timeout');
      return;
    }

    try {
      const res = await axios.get(`${API}/checkout/status/${sessionId}`);
      if (res.data.payment_status === 'paid') {
        setStatus('success');
      } else if (res.data.status === 'expired') {
        setStatus('expired');
      } else {
        setAttempts(prev => prev + 1);
        setTimeout(pollStatus, 2000);
      }
    } catch {
      setStatus('error');
    }
  }, [sessionId, attempts]);

  useEffect(() => {
    pollStatus();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6" data-testid="payment-success-page">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] text-center"
      >
        {status === 'checking' && (
          <>
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-cyan-400/10 flex items-center justify-center">
              <Loader2 size={28} className="text-cyan-400 animate-spin" />
            </div>
            <h2 className="font-heading text-xl text-white tracking-wide mb-2" data-testid="payment-status-text">
              Verifying Payment
            </h2>
            <p className="font-body text-sm text-white/40">Please wait while we confirm your payment...</p>
          </>
        )}

        {status === 'success' && (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
            >
              <Check size={28} className="text-green-400" />
            </motion.div>
            <h2 className="font-heading text-xl text-white tracking-wide mb-2" data-testid="payment-status-text">
              Registration Complete!
            </h2>
            <p className="font-body text-sm text-white/40 mb-8">
              Welcome to Ekatva 2026! Check your email for confirmation details.
            </p>
            <button
              onClick={() => navigate('/')}
              data-testid="payment-home-btn"
              className="px-6 py-3 rounded-full font-body text-sm text-white bg-gradient-to-r from-cyan-500/80 to-purple-600/80 hover:from-cyan-500 hover:to-purple-600 transition-all"
            >
              Back to Home
            </button>
          </>
        )}

        {(status === 'error' || status === 'timeout' || status === 'expired') && (
          <>
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
              <X size={28} className="text-red-400" />
            </div>
            <h2 className="font-heading text-xl text-white tracking-wide mb-2" data-testid="payment-status-text">
              {status === 'expired' ? 'Session Expired' : 'Payment Verification Failed'}
            </h2>
            <p className="font-body text-sm text-white/40 mb-8">
              {status === 'expired'
                ? 'Your payment session has expired. Please try again.'
                : 'We couldn\'t verify your payment. Please contact support if you were charged.'}
            </p>
            <button
              onClick={() => navigate('/')}
              data-testid="payment-retry-btn"
              className="px-6 py-3 rounded-full font-body text-sm text-white border border-white/10 hover:border-white/30 transition-all"
            >
              Try Again
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
}
