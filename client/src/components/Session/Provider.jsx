import { Spin } from 'antd';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthModals } from './AuthModals';

const SessionContext = createContext({});

function SessionProvider({ children }) {
  const navigate = useNavigate();

  const [modalVisible, openModal] = useState(false);
  const [signInVisible, setShowSignIn] = useState(true);
  const [signUpVisible, setShowSignUp] = useState(false);

  const [isLoading, setLoading] = useState(true);
  const [session, setSession] = useState();

  const sessionContextValue = useMemo(() => {
    return {
      session,
      openModal: (visible) => openModal(visible),
      showSignIn: (visible) => setShowSignIn(visible),
      showSignUp: (visible) => setShowSignUp(visible),
      saveSession: (s) => {
        if (s) {
          localStorage.setItem('__session__', s ? JSON.stringify(s) : '{}');
        } else {
          localStorage.removeItem('__session__');
        }

        setSession(s);
        (s === undefined || s.user.role === 'admin') && navigate('/');
      },
      verifySession: () => session?.token !== undefined,
    };
  }, [session, navigate, setShowSignIn]);

  useEffect(() => {
    setSession(JSON.parse(localStorage.getItem('__session__') ?? '{}'));
    setLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <SessionContext.Provider value={sessionContextValue}>
      {children}
      <AuthModals
        openModal={openModal}
        setShowSignIn={setShowSignIn}
        setShowSignUp={setShowSignUp}
        modalVisible={modalVisible}
        signInVisible={signInVisible}
        signUpVisible={signUpVisible}
      />
    </SessionContext.Provider>
  );
}

function useSession() {
  return useContext(SessionContext);
}

export { useSession, SessionProvider };
