import { useState, useEffect } from "react";

export default function UserSearch () {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const userAPI = async () => {
            try {
                setLoading(true);

                const URL = "https://jsonplaceholder.typicode.com/users";
                const res = await fetch(URL);

                if (!res.ok) {
                    setError("could not fetch data");
                    return;
                }

                const data = await res.json();
                setUsers(data);
            } catch ( e ) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        void userAPI();
    }, []);

    const filteredSearch =
        users.filter((user) => user.name.toLowerCase().includes(inputValue.toLowerCase()));

    if (loading) return <div>fetching users...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <div>
                <h1>Hello world!</h1>
            </div>
            <section>
                <form>
                    <fieldset>
                        <legend>user search</legend>
                        <input
                            type={"text"}
                            title={"user search"}
                            placeholder={'search user'}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            list={'filteredQueryList'}
                        />

                        {filteredSearch.length === 0 ? (
                            <p>No users found</p>
                            ) : (
                                <ul>
                                    {filteredSearch.map((results) => (
                                        <li key={results.id}>{results.name}</li>
                                    ))}
                                </ul>
                             )
                        }

                    </fieldset>
                </form>
            </section>
        </>
    )
}
