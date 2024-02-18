import { useState } from "react";
import { FcGoogle } from "react-icons/fc";


const Login = () => {
    const[gender, setGender] =useState("");
    const[data, setDate] = useState("");
  return (
    <div className="login">
        <main>
            <h1 className="header">Login</h1>

            <div>
                <label> Gender</label>
                <select 
                aria-label="label for the select" 
                value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value=""> Select Gender</option>
                    <option value="male"> Male</option>
                    <option value="female"> Female</option>
                </select>
            </div>
            <div>
                <label> Date of Birth</label>
                <input 
                type="data" 
                placeholder="DOB"
                 value={data}
                 onChange={(e) => setDate(e.target.value)}
                  />
            </div>
            <div>
                <p>Already Signed In once</p>
                <button type="button">
                    <FcGoogle/><span> Sign in with Google</span>
                </button>
            </div>
        </main>
    </div>
  );
};

export default Login;