import React, { useEffect, useState } from "react";
import { useSession, signOut, getSession } from "next-auth/react";
import axios from "axios";
import Router, { useRouter } from "next/router";
function PatientProfile() {
  const router = useRouter();
  const query = router.query;
  const [profile, setProfile] = useState();
  const { data: session } = useSession();
  const emailt = session.user.email;

  const [age, setAge] = useState();
  const [address, setAddress] = useState();
  const [bloodgroup, setBloodgroup] = useState();
  const [pincode, setPincode] = useState();

  const fetchData = () => {
    const url = `http://localhost:3000/api/getpatientprofile/?email=${emailt}`;
    return axios.get(url)
      .then((response) => {
        setProfile(response.data)
        setAge(response.data.age)
        setAddress(response.data.address)
        setBloodgroup(response.data.bloodgroup)
        setPincode(response.data.pincode)
      });
  }
  useEffect(() => {
    fetchData();
  }, []);
  const updateProfile = async (e) => {
    e.preventDefault();
    const email = session.user.email;
    const res = await fetch(`http://localhost:3000/api/updatepatientprofile/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, address, age, pincode, bloodgroup }),
    });
    Router.reload();
  };


  return (<div>
    <div>{profile?.firstname}</div>
    <div>{profile?.lastname}</div>
    <div>{profile?.email}</div>
    <div>{profile?.phone}</div>
    <label>
      Age
      <input
        name="age"
        type="text"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
    </label>
    <label>
      Pincode
      <input
        name="age"
        type="text"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
      />
    </label>
    <label>
      Address
      <input
        name="age"
        type="text"
        value={age}
        onChange={(e) => setAddress(e.target.value)}
      />
    </label>
    <label>
      Blood Group
      <input
        name="age"
        type="text"
        value={bloodgroup}
        onChange={(e) => setBloodgroup(e.target.value)}
      />
    </label>
    <button type="submit" onClick={(e) => updateProfile(e)}>Submit</button>
  </div>);
}

export default PatientProfile;
// export async function getServerSideProps() {
//   const session = await getSession(context);
//   const email = session.user.email;
//   const profile = await fetch(
//     `http://localhost:3000/api/getpatientprofile/?email=${email}`
//   ).then((res) => res.json());
//   return {
//     props: {
//       session,
//       check,
//       profile,
//       email,
//     },
//   };
// }
