import { useState, FormEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { 
  signup, 
  selectSignupStatus, 
  selectAuthError,
  clearError,
  clearStatuses 
} from '../../store/slices/authSlice';
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import type { SignupData } from "../../types/auth";

// Form validation interface
interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  terms?: string;
}

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  
  const dispatch = useAppDispatch();
  const signupStatus = useAppSelector(selectSignupStatus);
  const signupError = useAppSelector(selectAuthError);
  const navigate = useNavigate();

  // Clear errors when component mounts
  useEffect(() => {
    dispatch(clearError());
    dispatch(clearStatuses());
    
    // Cleanup on unmount
    return () => {
      dispatch(clearError());
      dispatch(clearStatuses());
    };
  }, [dispatch]);

  // Handle signup status changes
  useEffect(() => {
    if (signupStatus === 'succeeded') {
      toast.success('Account created successfully! Welcome aboard! 🎉', {
        duration: 4000,
        position: 'top-right',
      });
      navigate("/dashboard"); // or wherever you want to redirect
    } else if (signupStatus === 'failed' && signupError) {
      toast.error(signupError, {
        duration: 4000,
        position: 'top-right',
      });
    }
  }, [signupStatus, signupError, navigate]);

  // Form validation
  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    // Username validation
    if (!username.trim()) {
      errors.username = "Username is required";
    } else if (username.length < 3) {
      errors.username = "Username must be at least 3 characters";
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      errors.username = "Username can only contain letters, numbers, and underscores";
    }

    // Email validation
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      errors.password = "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }

    // Terms validation
    if (!isChecked) {
      errors.terms = "You must agree to the Terms and Conditions";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Clear previous errors
    setFormErrors({});
    dispatch(clearError());

    // Validate form
    if (!validateForm()) {
      toast.error('Please fix the errors in the form', {
        duration: 3000,
        position: 'top-right',
      });
      return;
    }

    try {
      // Show loading toast
      const loadingToast = toast.loading('Creating your account...', {
        position: 'top-right',
      });

      const signupData: SignupData = {
        email: email.trim().toLowerCase(),
        password,
        username: username.trim(), // Assuming backend expects 'name' instead of 'username'
   
      };

      const resultAction = await dispatch(signup(signupData));
      console.log('Signup result:', resultAction);
      
      // Dismiss loading toast
      toast.dismiss(loadingToast);

      if (signup.fulfilled.match(resultAction)) {
        // Success is handled in useEffect
        console.log('Signup successful:', resultAction.payload);
      } else if (signup.rejected.match(resultAction)) {
        // Error is handled in useEffect
        console.error('Signup failed:', resultAction.payload);
      }
    } catch (error) {
      console.error('Unexpected error during signup:', error);
      toast.error('An unexpected error occurred. Please try again.', {
        duration: 4000,
        position: 'top-right',
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    // Clear field-specific error when user starts typing
    if (formErrors[field as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }));
    }

    switch (field) {
      case 'username':
        setUsername(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
    if (formErrors.terms) {
      setFormErrors(prev => ({ ...prev, terms: undefined }));
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="w-full max-w-md mx-auto mb-5 sm:pt-10"></div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign Up
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign up!
            </p>
          </div>
          
          <div>
            {/* Social buttons section - you can add your social login buttons here */}
            <div className="relative py-3 sm:py-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2">
                  Or
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="space-y-5">
                {/* Username Field */}
                <div>
                  <Label>
                    User Name<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    className={formErrors.username ? 'border-red-500 focus:border-red-500' : ''}
                  />
                  {formErrors.username && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {formErrors.username}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <Label>
                    Email<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={formErrors.email ? 'border-red-500 focus:border-red-500' : ''}
                 
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {formErrors.email}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <Label>
                    Password<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={formErrors.password ? 'border-red-500 focus:border-red-500 pr-12' : 'pr-12'}
                      
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2 hover:opacity-70 transition-opacity"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </button>
                  </div>
                  {formErrors.password && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {formErrors.password}
                    </p>
                  )}
                </div>

                {/* Terms and Conditions */}
                <div>
                  <div className="flex items-start gap-3">
                    <Checkbox
                      className="w-5 h-5 mt-0.5"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                    <div className="flex-1">
                      <p className="font-normal text-gray-500 dark:text-gray-400">
                        By creating an account means you agree to the{" "}
                        <Link 
                          to="/terms" 
                          className="text-gray-800 dark:text-white/90 hover:underline"
                        >
                          Terms and Conditions
                        </Link>
                        {" "}and our{" "}
                        <Link 
                          to="/privacy" 
                          className="text-gray-800 dark:text-white hover:underline"
                        >
                          Privacy Policy
                        </Link>
                      </p>
                      {formErrors.terms && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {formErrors.terms}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-brand-500"
                    disabled={signupStatus === "loading"}
                  >
                    {signupStatus === "loading" ? (
                      <>
                        <svg 
                          className="w-4 h-4 mr-2 animate-spin" 
                          fill="none" 
                          viewBox="0 0 24 24"
                        >
                          <circle 
                            className="opacity-25" 
                            cx="12" 
                            cy="12" 
                            r="10" 
                            stroke="currentColor" 
                            strokeWidth="4"
                          />
                          <path 
                            className="opacity-75" 
                            fill="currentColor" 
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Creating Account...
                      </>
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400 hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
