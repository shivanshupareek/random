import { useState, useEffect } from "react";

export default function UserSearch () {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [searchFilter, setSearchFilter] = useState('');

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
                console.log(data);
            } catch ( e ) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        void userAPI();
    }, []);


    function handleInput (e) {
        setInputValue(e.target.value);

        const filteredSearch = users.filter((user) => user.name.toLowerCase().includes(e.target.value.toLowerCase()));
        setSearchFilter(filteredSearch);
    }

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
                            onChange={handleInput}
                            list={'filteredQueryList'}
                        />
                        {searchFilter.length > 0 ? searchFilter.map((results) => {
                           return <datalist id={'filteredQueryList'}>
                               <option value={results.name} key={results.id}/>
                           </datalist>
                        }): ''}

                    </fieldset>
                </form>
            </section>
        </>
    )
}
