import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import '../../styles/Form.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('donor');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!role || !email || !password) {
        setError('Please provide all fields');
        setLoading(false);
        return;
      }

      // Sign in with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Get user data from Firestore to verify role
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        
        // Verify the role matches
        if (userData.role !== role) {
          setError(`This account is registered as a ${userData.role}, not a ${role}`);
          await auth.signOut(); // Sign out if role doesn't match
          setLoading(false);
          return;
        }

        // Store user data in localStorage if needed
        localStorage.setItem('user', JSON.stringify({
          uid: user.uid,
          email: user.email,
          role: userData.role,
          ...userData
        }));

        // Navigate to appropriate page based on role
        switch (userData.role) {
          case 'donor':
            navigate('/donor-dashboard');
            break;
          case 'admin':
            navigate('/admin-dashboard');
            break;
          case 'hospital':
            navigate('/hospital-dashboard');
            break;
          case 'organization':
            navigate('/organization-dashboard');
            break;
          default:
            navigate('/');
        }
      } else {
        setError('User data not found. Please contact support.');
        await auth.signOut();
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // Provide user-friendly error messages
      if (error.code === 'auth/invalid-credential') {
        setError('Invalid email or password');
      } else if (error.code === 'auth/user-not-found') {
        setError('No account found with this email');
      } else if (error.code === 'auth/wrong-password') {
        setError('Incorrect password');
      } else if (error.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please try again later');
      } else {
        setError(error.message || 'Failed to login. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-header">
            <h1>🩸 Blood Bank Login</h1>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <div className="mb-3">
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                name="role"
                id="donorRadio"
                value="donor"
                checked={role === 'donor'}
                onChange={(e) => setRole(e.target.value)}
              />
              <label htmlFor="donorRadio" className="form-check-label">
                Donor
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                name="role"
                id="adminRadio"
                value="admin"
                checked={role === 'admin'}
                onChange={(e) => setRole(e.target.value)}
              />
              <label htmlFor="adminRadio" className="form-check-label">
                Admin
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                name="role"
                id="hospitalRadio"
                value="hospital"
                checked={role === 'hospital'}
                onChange={(e) => setRole(e.target.value)}
              />
              <label htmlFor="hospitalRadio" className="form-check-label">
                Hospital
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                name="role"
                id="organizationRadio"
                value="organization"
                checked={role === 'organization'}
                onChange={(e) => setRole(e.target.value)}
              />
              <label htmlFor="organizationRadio" className="form-check-label">
                Organization
              </label>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <div className="mt-3 text-center">
            Don't have an account? <Link to="/register">Register</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
