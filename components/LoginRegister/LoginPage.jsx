// src/components/LoginRegister/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, Eye, EyeOff, X, Calendar, Phone} from 'lucide-react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../ui/dialog';
import styles from './LoginPage.module.css';
import axios from 'axios';

// API base URL
const API_URL = 'http://127.0.0.1:8000/api/';

// Loader
const CircularLoader = ({ onClose, isLoading }) => (
    <div className={styles.loaderContainer}>
        <div className={styles.loaderBackground}></div>
        
        <motion.button
            className={styles.floatingCloseButton}
            onClick={onClose}
            disabled={isLoading}
            aria-label="Close"
            animate={{
                y: [0, -4, 0, 4, 0],
            }}
            transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        >
            <X size={24} />
        </motion.button>

        <div className={styles.loaderCenter}>
            {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className={styles.loaderBar} style={{ '--bar-index': i }}></div>
            ))}
        </div>
    </div>
);

// Strength
const checkPasswordStrength = (password) => {
    let strength = 0;
    const requirements = [
        { regex: /.{8,}/, weight: 25 },
        { regex: /[A-Z]/, weight: 25 },
        { regex: /[a-z]/, weight: 25 },
        { regex: /[0-9]/, weight: 25 },
    ];
    requirements.forEach(req => { if (req.regex.test(password)) strength += req.weight; });
    return Math.min(strength, 100);
};

// Component
// --- NEW: Accept onLoginSuccess prop ---
const LoginPage = ({ isOpen, onClose, onLoginSuccess }) => {
    const [viewMode, setViewMode] = useState('login');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [phno, setPhno] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordProgress, setPasswordProgress] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(''); 

    useEffect(() => {
        if (isOpen) {
            switchMode('login'); 
        } else {
            setTimeout(() => { setIsLoading(false); }, 300);
        }
    }, [isOpen]);


    useEffect(() => {
        const progress = checkPasswordStrength(password);
        setPasswordProgress(progress);
    }, [password]);

    // Login
    const handleLogin = async (e) => {
        e.preventDefault();
        const loginPasswordStrength = checkPasswordStrength(password);
        if (loginPasswordStrength < 100) {
            setError('Password does not meet requirements.');
            return;
        }
        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post(`${API_URL}login/`, {
                username: name, 
                password: password,
            });
            
            console.log('Login successful:', response.data);
            
            // --- NEW: Store token and username, call handler ---
            localStorage.setItem('authToken', response.data.token); 
            localStorage.setItem('username', name); // Store the username
            onLoginSuccess(name); // Pass username to App.jsx
            // ---
            
            setIsLoading(false);
            // onClose(); // onLoginSuccess now handles closing

        } catch (err) {
            console.error('Login failed:', err.response?.data);
            setError(err.response?.data?.non_field_errors?.[0] || 'Login failed. Please check credentials.');
            setIsLoading(false);
        }
    };

    // Register
    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (passwordProgress < 100) {
            setError('Password does not meet requirements.');
            return;
        }
        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post(`${API_URL}register/`, {
                username: name, 
                dob: dob,
                phno: phno,
                email: email,
                password: password,
            });

            console.log('Registration successful:', response.data);
            
            // Auto-login after successful registration
            await handleLogin(e); 
            
        } catch (err) {
            console.error('Registration failed:', err.response?.data);
            let apiError = 'Registration failed. Please try again.';
            if (err.response?.data?.username) {
                apiError = `Username: ${err.response.data.username[0]}`;
            } else if (err.response?.data?.email) {
                apiError = `Email: ${err.response.data.email[0]}`;
            }
            setError(apiError);
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    // Mode
    const switchMode = (newMode) => {
        setName('');
        setEmail('');
        setDob('');
        setPhno('');
        setPassword('');
        setConfirmPassword('');
        setPasswordProgress(0); 
        setShowPassword(false);
        setShowConfirmPassword(false);
        setIsLoading(false);
        setError(''); 
        setViewMode(newMode);
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordProgress(checkPasswordStrength(newPassword));
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent 
                className={styles.dialogContentFullscreen} 
                onInteractOutside={(e) => {
                    if (isLoading) { e.preventDefault(); }
                }}
            >
                <DialogTitle className="sr-only">
                    {viewMode === 'login' ? 'Login' : 'Register'}
                </DialogTitle>
                <DialogDescription className="sr-only">
                    {viewMode === 'login' 
                        ? 'Login to your MiArtz account.' 
                        : 'Create a new MiArtz account.'}
                </DialogDescription>
                
                <CircularLoader onClose={onClose} isLoading={isLoading} />

                <div className={styles.formContainer}>
                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ 
                                color: '#ff8a8a', 
                                textAlign: 'center', 
                                marginBottom: '1rem', 
                                fontSize: '0.9rem',
                                fontWeight: '500'
                            }}
                        >
                            {error}
                        </motion.div>
                    )}

                    {viewMode === 'login' && (
                        <>
                            <div className={styles.title}>Login</div>
                            
                            <form onSubmit={handleLogin} className={styles.form}>
                                <div className={styles.inputGroup}>
                                    <input 
                                        type="text" 
                                        placeholder="User Name" 
                                        className={styles.inputField} 
                                        value={name} 
                                        onChange={(e) => setName(e.target.value)} 
                                        required 
                                        disabled={isLoading}
                                    />
                                    <User className={styles.inputIcon} size={20} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        placeholder="Password" 
                                        className={styles.inputField} 
                                        value={password} 
                                        onChange={handlePasswordChange} 
                                        required 
                                        disabled={isLoading}
                                    />
                                    <Lock className={styles.inputIcon} size={20} />
                                    <button type="button" onClick={togglePasswordVisibility} className={styles.eyeIcon} aria-label={showPassword ? "Hide password" : "Show password"} disabled={isLoading}>
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                <div className={styles.forgotPasswordLinkContainer}>
                                    <a href="#" className={`${styles.forgotPasswordLink} ${isLoading ? styles.disabledLink : ''}`}>
                                        Forgot your password?
                                    </a>
                                </div>
                                <button type="submit" className={`${styles.loginButton} ${isLoading ? styles.loginButtonLoading : ''}`} disabled={passwordProgress < 100 || isLoading}>
                                    <span className={styles.loginButtonText}>Login</span>
                                    {!isLoading && <div className={styles.loginButtonProgress} style={{ width: `${passwordProgress}%` }}></div>}
                                    {isLoading && <div className={styles.loginButtonProgressLoading}></div>}
                                </button>
                            </form>
                            <div className={styles.signUpLinkContainer}>
                                Don't have an account?{' '}
                                <button onClick={() => switchMode('register')} className={styles.switchModeButton} disabled={isLoading}>
                                    Sign Up
                                </button>
                            </div>
                        </>
                    )}

                    {viewMode === 'register' && (
                        <>
                            
                            <div className={styles.title}>Register</div>
                            
                            <form onSubmit={handleRegister} className={styles.form}>
                                <div className={styles.inputGroup}>
                                    <input type="text" placeholder="User Name" className={styles.inputField} value={name} onChange={(e) => setName(e.target.value)} required disabled={isLoading}/>
                                    <User className={styles.inputIcon} size={20} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <input type="email" placeholder="Email" className={styles.inputField} value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading}/>
                                    <Mail className={styles.inputIcon} size={20} />
                                </div>
                                 <div className={styles.inputGroup}>
                                    <input type="number" placeholder="Phone Number" className={styles.inputField} value={phno} onChange={(e) => setPhno(e.target.value)} required disabled={isLoading}/>
                                    <Phone className={styles.inputIcon} size={20} />
                                </div>
                                 <div className={styles.inputGroup}>
                                    <input type="date" placeholder="Date of Birth" className={styles.inputField} value={dob} onChange={(e) => setDob(e.target.value)} required disabled={isLoading}/>
                                    <Calendar className={styles.inputIcon} size={20} />
                                </div>


                                <div className={styles.inputGroup}>
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        placeholder="Password (8+ chars, A-Z, a-z, 0-9)" 
                                        className={styles.inputField} 
                                        value={password} 
                                        onChange={handlePasswordChange} 
                                        required 
                                        disabled={isLoading}
                                    />
                                    <Lock className={styles.inputIcon} size={20} />
                                    <button type="button" onClick={togglePasswordVisibility} className={styles.eyeIcon} aria-label={showPassword ? "Hide password" : "Show password"} disabled={isLoading}>
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                <div className={styles.inputGroup}>
                                    <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" className={styles.inputField} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required disabled={isLoading}/>
                                    <Lock className={styles.inputIcon} size={20} />
                                    <button type="button" onClick={toggleConfirmPasswordVisibility} className={styles.eyeIcon} aria-label={showConfirmPassword ? "Hide password" : "Show password"} disabled={isLoading}>
                                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                <button type="submit" className={`${styles.loginButton} ${isLoading ? styles.loginButtonLoading : ''}`} disabled={passwordProgress < 100 || password !== confirmPassword || isLoading}>
                                    <span className={styles.loginButtonText}>Register</span>
                                     {!isLoading && <div className={styles.loginButtonProgress} style={{ width: `${passwordProgress}%` }}></div>}
                                    {isLoading && <div className={styles.loginButtonProgressLoading}></div>}
                                 </button>
                            </form>
                            <div className={styles.signUpLinkContainer}>
                                Already have an account?{' '}
                                <button onClick={() => switchMode('login')} className={styles.switchModeButton} disabled={isLoading}>
                                    Login
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default LoginPage;