'use client';

import { useAuth } from '@/hooks/userAuth';
import Cookies from 'js-cookie';
// import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useRef } from 'react';

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: GoogleCredentialResponse) => void;
          }) => void;
          renderButton: (
            element: HTMLElement | null,
            options: {
              theme: string;
              size: string;
              width?: number;
              type?: string;
              text?: string;
              shape?: string;
            }
          ) => void;
        }
      }
    };
    googleSignInInitialized?: boolean;
  }
}

interface GoogleCredentialResponse {
  credential: string;
}

const GoogleSignInButton: React.FC = () => {
  // const router = useRouter();
  const buttonRef = useRef<HTMLDivElement>(null);
  const initAttempted = useRef(false);
  
  const { checkAuth } = useAuth() || {
    checkAuth: async () => {
      console.log('Authentication check active');
      return true;
    }
  };

  const handleCredentialResponse = useCallback(
    async (response: GoogleCredentialResponse) => {
      try {
        console.log('Sending credential to backend...');
        
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            token: response.credential
          })
        });

        console.log('Response status:', res.status);
        
        // Get the raw response text first
        const responseText = await res.text();
        console.log('Raw response:', responseText);
        
        // Try to parse as JSON
        let data;
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error('Failed to parse response as JSON:', parseError);
          throw new Error('Invalid response from server');
        }
        
        console.log('Parsed data:', data);

        if (!res.ok) {
          console.error('Login failed with status:', res.status);
          console.error('Error details:', data);
          throw new Error(data.detail || data.message || data.error || 'Login failed');
        }

        // Set cookies first (add secure/httponly flags for prod if needed)
        Cookies.set('access_token', data.token.access_token, {
          expires: 720 / 1440,
          secure: process.env.NODE_ENV === 'production', // Secure in prod
          sameSite: 'strict'
        });
        
        Cookies.set('bot_user', JSON.stringify(data), {
          expires: 720 / 1440,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });

        // Wait for checkAuth to complete and update the auth state
        await checkAuth();
        
        // Increase delay slightly for prod hydration
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // CRITICAL FIX: Use full redirect to trigger middleware/server validation
        // router.replace('/dashboard'); // Remove this
        window.location.href = '/dashboard'; // Force server roundtrip
      } catch (error) {
        console.error('Login failed:', error);
        alert(`Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }, 
    [checkAuth]
  );

  useEffect(() => {
    const renderGoogleButton = () => {
      if (!buttonRef.current || !window.google) return;

      try {
        // Clear any existing content
        buttonRef.current.innerHTML = '';
        
        window.google.accounts.id.renderButton(
          buttonRef.current,
          {
            theme: 'filled_blue',
            size: 'large',
            text: 'signin',
            shape: 'pill',
          }
        );
      } catch (error) {
        console.error('Error rendering Google button:', error);
      }
    };

    const initializeGoogleSignIn = () => {
      if (initAttempted.current || !window.google) return;
      
      try {
        initAttempted.current = true;
        
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
          callback: handleCredentialResponse,
        });

        renderGoogleButton();
      } catch (error) {
        console.error('Error initializing Google Sign-In:', error);
        initAttempted.current = false;
      }
    };

    // Check if script already exists
    const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
    
    if (existingScript) {
      // Script already loaded, just render the button
      if (window.google) {
        if (!initAttempted.current) {
          initializeGoogleSignIn();
        } else {
          renderGoogleButton();
        }
      } else {
        // Script exists but not loaded yet, wait for it
        existingScript.addEventListener('load', initializeGoogleSignIn);
      }
    } else {
      // Load script for the first time
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleSignIn;
      document.head.appendChild(script);
    }

    // Cleanup is intentionally minimal - we want to keep the script loaded
    return () => {
      // Only clear the button content, not the script
      if (buttonRef.current) {
        buttonRef.current.innerHTML = '';
      }
    };
  }, [handleCredentialResponse]);

  return (
    <div ref={buttonRef} className="inline-flex" />
  );
};

export default GoogleSignInButton;