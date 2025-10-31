import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../util/auth';
import { LoadingOverlay } from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authContext = useContext(AuthContext);

  async function signUpHandler({email, password}) {
    setIsAuthenticating(true);
    try{
      const token = await createUser(email, password);
      authContext.authenticate(token);
    } catch(error) {
       Alert.alert('Signing up failed!', 'Could not sign up');
       setIsAuthenticating(false);
    }
  }

  if(isAuthenticating) {
    return <LoadingOverlay message='Creating user...'/>
  }

  return <AuthContent onAuthenticate={signUpHandler}/>;
}

export default SignupScreen;
