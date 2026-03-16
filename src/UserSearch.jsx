import { useState, useEffect } from "react";

export default function UserSearch () {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userAPI = async () => {
            try {
                setLoading(true);

                const URL = "https://jsonplaceholder.typicode.com/users";
                const res = await fetch(URL);

                if (!res.ok) return 'could not fetch users';

                const data = await res.json();
                setUsers(data);
                console.log(setUsers);
            } catch ( e ) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        userAPI();
    }, [users]);

    if (loading) return <div>fetching users...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <div>
                <h1>Hello world!</h1>
            </div>
        </>
    )
}
