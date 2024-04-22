import * as client from "./client";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const [profile, setProfile] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    role: "USER",
  });
  const navigate = useNavigate();

  const fetchProfile = async () => {
    const account = await client.profile();
    const aId = account._id;
    const user = await client.findUserById(aId);
    if (user.dob) {
      const date = new Date(user.dob);
      user.dob = date.toISOString().split("T")[0];
    }
    console.log(user);
    setProfile(user);
  };

  const save = async () => {
    if (
      !profile.username ||
      !profile.password ||
      profile.username === "" ||
      profile.password === ""
    ) {
      window.alert("Please enter username and password");
      return;
    }
    await client.updateUser(profile);
    await fetchProfile();
    window.alert("Profile updated");
  };

  const signout = async () => {
    await client.signout();
    navigate("/Kanbas/Account/Signin");
  };

  useEffect(() => {
    fetchProfile().then();
  }, []);

  return (
    <div>
      <h1>Profile</h1>

      {profile && (
        <div>
          <input
            value={profile.username}
            placeholder="username"
            className="mb-1"
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
          />
          <br />
          <input
            value={profile.password}
            placeholder="password"
            className="mb-1"
            onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })
            }
          />
          <br />
          <input
            value={profile.firstName}
            className="mb-1"
            placeholder="first name"
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
          />
          <br />
          <input
            placeholder="last name"
            value={profile.lastName}
            className="mb-1"
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
          />
          <br />
          <input
            value={profile.dob}
            className="mb-1"
            type="date"
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
          />
          <br />
          <input
            placeholder="email"
            value={profile.email}
            className="mb-1"
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <br />
          <select
            className="mb-1"
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
          <br />
          <button className="btn btn-success mb-1" onClick={save}>
            Save
          </button>
          <br />
          <button className="btn btn-danger mb-1" onClick={signout}>
            Signout
          </button>
          <br />
          <Link to="/Kanbas/Account/Admin/Users" className="btn btn-warning">
            All Users
          </Link>
        </div>
      )}
    </div>
  );
}
