import React, { useState } from 'react';
import logo from "../assets/logo.png";
import { Link } from "react-router";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY || '');

const plans = [
  {
    name: 'Free',
    price: '€0/month',
    features: [
      'Basic interview questions',
      'Limited coaching feedback',
      'Limited Quiz',
    ],
    height: '500px',
  },
  {
    name: 'Educational Plan',
    price: '€10/month',
    features: [
      'Everything in Free',
      'Personalized feedback',
      'Unlimited Quiz',
      'Mock interviews',
    ],
    height: '500px',
  },
  {
    name: 'Pro Plan',
    price: '€20/month',
    features: [
      'Everything in Educational',
      'Priority support',
      'Advanced interview scenarios',
      'Resume and cover letter reviews',
    ],
    height: '500px',
  },
];

function PaymentForm({ plan, onSuccess }: { plan: string; onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // Demo only: Simulate payment success after short delay
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 1200);
    // In real app, use stripe.confirmCardPayment or similar here
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <Typography variant="subtitle1" gutterBottom>
        Enter your card details for the <b>{plan}</b>.
      </Typography>
      <Box sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2, mb: 2 }}>
        <CardElement options={{ hidePostalCode: true }} />
      </Box>
      {error && <Typography color="error">{error}</Typography>}
      <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading || !stripe || !elements}>
        {loading ? 'Processing...' : 'Confirm Subscription'}
      </Button>
    </form>
  );
}

const PricingPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubscribe = (idx: number) => {
    setSelectedPlan(idx);
    setSuccess(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSuccess(false);
  };

  return (
    <div className="container">
      <header className="header">
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="Logo" className="logo" />
          </Link>
        </div>
        <div className="nav-buttons">
          <Link to="/login" className="nav-button">log in</Link>
          <Link to="/signup" className="nav-button">sign up</Link>
        </div>
      </header>

      <main className="auth-main" style={{ padding: "100px" }}>
        <div className="auth-card" style={{ height: "500px" }}>
          <h3 className="auth-title">Free</h3>
          <h4 className="auth-description">
            - Basic interview questions <br/>
            - Limited coaching feedback <br/>
            - Limited Quiz
          </h4>
          <br/>
          <h2 className="auth-price">€0/month</h2>
          <br/>
          <button className="nav-button" style={{ marginTop: "150px", width: "300px" }} onClick={() => handleSubscribe(0)}>Subscribe</button>
        </div>
        <div className="auth-card" style={{ height: "500px" }}>
          <h3 className="auth-title">Educational Plan</h3>
          <h4 className="auth-description">
            - Everything in Free <br/>
            - Personalized feedback <br/>
            - Unlimited Quiz <br/>
            - Mock interviews
          </h4>
          <br/>
          <h2 className="auth-price">€10/month</h2>
          <br/>
          <button className="nav-button" style={{ marginTop: "120px", width: "300px" }} onClick={() => handleSubscribe(1)}>Subscribe</button>
        </div>
        <div className="auth-card" style={{ height: "500px" }}>
          <h3 className="auth-title">Pro Plan</h3>
          <h4 className="auth-description">
            - Everything in Educational <br/>
            - Priority support <br/>
            - Advanced interview scenarios <br/>
            - Resume and cover letter reviews
          </h4>
          <br/>
          <h2 className="auth-price">€20/month</h2>
          <br/>
          <button className="nav-button" style={{ marginTop: "120px", width: "300px" }} onClick={() => handleSubscribe(2)}>Subscribe</button>
        </div>
      </main>

      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Subscribe to {selectedPlan !== null ? plans[selectedPlan].name : ''}</DialogTitle>
        <DialogContent>
          {success ? (
            <Box textAlign="center" py={4}>
              <Typography variant="h6" color="success.main">Subscription successful!</Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>Thank you for subscribing to the {selectedPlan !== null ? plans[selectedPlan].name : ''}.</Typography>
            </Box>
          ) : (
            <Elements stripe={stripePromise}>
              <PaymentForm plan={selectedPlan !== null ? plans[selectedPlan].name : ''} onSuccess={() => setSuccess(true)} />
            </Elements>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PricingPage;
