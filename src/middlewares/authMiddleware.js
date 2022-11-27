import firebase from '../helpers/firebase';

const checkAuth = (roles) => async (req, res, next) => {
  // Get token from headers
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(400).json({ message: 'Provide a token' });
    }

    // Get user from token
    const user = await firebase.auth().verifyIdToken(token);

    // Check for correct role
    if (!roles.includes(user.role)) {
      throw new Error('Invalid role');
    }

    // We can inject data into the request if needed.
    req.firebaseUid = user.uid;

    return next();
  } catch (error) {
    return res.status(401).json({ message: error.toString() });
  }
};

export default checkAuth;
