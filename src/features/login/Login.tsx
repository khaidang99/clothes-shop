import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

import configFirebase from "config/firebase-config";
import { useEffect, useState } from "react";
import { LocationState } from "types";

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/signedIn",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
};

function Login() {
  const dispatch = useDispatch();
  const location = useLocation();
  const state = location.state as LocationState;
  const navigate = useNavigate();
  const valueForm = {
    email: "",
    password: "",
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setIsSignedIn(!!user);
        console.log(user);

        if (user) {
          Cookie.set("token", user.getIdToken());
        }
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  if (!isSignedIn) {
    return (
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    );
  }
  return (
    <div>
      <h1>My App</h1>
      <p>Welcome ! You are now signed-in!</p>
      <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
    </div>
  );

  //   const onFinish = async (values: valuesLogin) => {
  //     await dispatch(fetchLogin(values));
  //     navigate(location.state ? state.from.pathname : "/");
  //   };

  //   return (
  //     <div className="page-login pt-5">
  //       <Form
  //         onFinish={onFinish}
  //         initialValues={valueForm}
  //         validateMessages={validateMessages}
  //         labelCol={{ span: 8 }}
  //         wrapperCol={{ span: 8 }}
  //       >
  //         <InputField
  //           name="email"
  //           label="email"
  //           placeholder="email"
  //           type="email"
  //           rules={[{ required: true }]}
  //         />
  //         <InputField
  //           name="password"
  //           label="password"
  //           placeholder="password"
  //           rules={[{ required: true }]}
  //           type="password"
  //         />
  //         <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
  //           <Button type="primary" htmlType="submit">
  //             Submit
  //           </Button>
  //         </Form.Item>
  //       </Form>
  //     </div>
  //   );
}

export default Login;
