import { useState } from "react";

const FormHome = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        console.log(data);
    }

    return (
        <>
            <form className="flex flex-col gap-4 w-full max-w-sm mx-auto mt-10" onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="email" className="text-gray-700">Email</label>
                <input type="email" name="email" id="email" className="border border-gray-300 p-2 rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label htmlFor="password" className="text-gray-700">Password</label>
                <input type="password" name="password" id="password" className="border border-gray-300 p-2 rounded" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
            </form>
        </>
    )
}

export default FormHome;