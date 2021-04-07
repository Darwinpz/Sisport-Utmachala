
import React, { useState } from "react";

export default function Login({ onLogin }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    };


    return (

        <form className='form' onSubmit={handleSubmit}>
            <div className="form-group">
            <input
                    placeholder="Cédula"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    className="form-control"
                />
            </div>

            <div className="form-group">
            <input
                    type="password"
                    placeholder="Clave"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="form-control"
                />
            </div>

            <button className="btn btn-block btn-primary">Login</button>
        </form>

    )


}