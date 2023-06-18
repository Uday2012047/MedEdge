import { getCsrfToken, signIn } from "next-auth/react";
import Router from "next/router";
import { useState } from "react";

export default function SignIn({ csrfToken }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(true);
  const [otptext, setOtptext] = useState();
  const [enteredotp, setEnteredotp] = useState();
  const [message, setMessage] = useState(null);

  function generateOTP() {
    var minm = 100000;
    var maxm = 999999;
    return Math.floor(Math
      .random() * (maxm - minm + 1)) + minm;
  }


  const signinUser = async (e) => {
    e.preventDefault();
    let options = {
      redirect: false,
      email,
      name,
      firstname,
      lastname,
      phone,
      role,
      password,
    };
    const res = await signIn("credentials", options);
    setMessage(null);
    if (res?.error) {
      setMessage(res.error);
    } else {
      return Router.push("/profile");
    }
  };
  const signupPatient = async (e) => {
    e.preventDefault();
    if (otptext != enteredotp) {
      setMessage("Wrong OTP");
      return;
    }
    setMessage(null);
    const res = await fetch("/api/registerpatient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        firstname,
        lastname,
        phone,
        role: "patient",
        password,
      }),
    });
    let data = await res.json();
    if (data.message) {
      setMessage(data.message);
    }
    if (data.message == "Registered successfully") {
      let options = {
        redirect: false,
        email,
        firstname,
        lastname,
        phone,
        role: "patient",
        password,
      };
      setRole("patient");
      const res = await signIn("credentials", options);
      return Router.push("/profile");
    }
  };
  const signupDoctor = async (e) => {
    e.preventDefault();
    if (otptext != enteredotp) {
      setMessage("Wrong OTP");
      return;
    }
    setMessage(null);

    const res = await fetch("/api/registerdoctor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        firstname,
        lastname,
        phone,
        role: "doctor",
        password,
      }),
    });
    let data = await res.json();
    if (data.message) {
      setMessage(data.message);
    }
    if (data.message == "Registered successfully") {
      let options = {
        redirect: false,
        email,
        firstname,
        lastname,
        phone,
        role: "doctor",
        password,
      };
      setRole("doctor");
      const res = await signIn("credentials", options);
      return Router.push("/profile");
    }
  };
  const signupLab = async (e) => {
    e.preventDefault();
    setMessage(null);
    const res = await fetch("/api/registerlab", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        phone,
        role: "lab",
        password,
      }),
    });
    let data = await res.json();
    if (data.message) {
      setMessage(data.message);
    }
    if (data.message == "Registered successfully") {
      let options = {
        redirect: false,
        email,
        name,
        phone,
        role: "lab",
        password,
      };
      const res = await signIn("credentials", options);
      setRole("lab");
      return Router.push("/");
    }
  };
  const sendotp = async (e) => {
    const otpnum = generateOTP();
    const number = "91" + phone
    const chatid = `${number}@c.us`
    const msg = `Your OTP is ${otpnum}`
    const res = await fetch("https://api.green-api.com/waInstance7103832087/sendMessage/9037e1378e404f429d9b24934c7282c7786a8e8a0ef14ee294", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatId: chatid,
        message: msg,
      }),
    });
    console.log(otpnum);
    setOtptext(otpnum);
    setOtp(false);
  }

  return (
    // method="post" action="/api/auth/callback/credentials"
    <>
      {/* Sign In */}
      <form>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <label>
          Email
          <input
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <p style={{ color: "red" }}>{message}</p>
        <button type="submit" onClick={(e) => signinUser(e)}>
          Sign in
        </button>
      </form>
      {/* Register as a Patient */}
      <form>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <label>
          Email
          <input
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          First Name
          <input
            name="firstname"
            type="text"
            onChange={(e) => setFirstname(e.target.value)}
          />
        </label>
        <label>
          Last Name
          <input
            name="lastname"
            type="text"
            onChange={(e) => setLastname(e.target.value)}
          />
        </label>
        <label>
          Phone Number
          <input
            name="phone"
            type="text"
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button disabled={otp} type="submit" onClick={(e) => signupPatient(e)}>
          Register as a Patient
        </button>
        <p style={{ color: "red" }}>{message}</p>
      </form>
      <br />
      <button onClick={(e) => sendotp(e)}>
        Send OTP
      </button>
      <label>
        OTP
        <input
          disabled={otp}
          name="otp"
          type="password"
          onChange={(e) => setEnteredotp(e.target.value)}
        />
      </label>
      {/* Register as a Doctor */}
      <form>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <label>
          Email
          <input
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          First Name
          <input
            name="firstname"
            type="text"
            onChange={(e) => setFirstname(e.target.value)}
          />
        </label>
        <label>
          Last Name
          <input
            name="lastname"
            type="text"
            onChange={(e) => setLastname(e.target.value)}
          />
        </label>
        <label>
          Phone Number
          <input
            name="phone"
            type="text"
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button onClick={(e) => sendotp(e)}>
          Send OTP
        </button>
        <label>
          OTP
          <input
            disabled={otp}
            name="otp"
            type="password"
            onChange={(e) => setEnteredotp(e.target.value)}
          />
        </label>
        <p style={{ color: "red" }}>{message}</p>
        <button type="submit" onClick={(e) => signupDoctor(e)}>
          Register as a Doctor
        </button>
      </form>
      {/* Register as a Lab */}
      <form>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <label>
          Email
          <input
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Laboratory Name
          <input
            name="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Phone Number
          <input
            name="phone"
            type="text"
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button onClick={(e) => sendotp(e)}>
          Send OTP
        </button>
        <label>
          OTP
          <input
            disabled={otp}
            name="otp"
            type="password"
            onChange={(e) => setEnteredotp(e.target.value)}
          />
        </label>
        <p style={{ color: "red" }}>{message}</p>
        <button type="submit" onClick={(e) => signupLab(e)}>
          Register as a Lab
        </button>
      </form>
    </>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
