import { useEffect, useState } from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import AddItem from "./components/AddItem";
import SearchItem from "./components/SearchItem";

function App() {
  const API_URL = "http://localhost:3500/items"; // URL to fetch items from the local JSON server

  const [search, setSearch] = useState("");
  const [newItem, setNewItem] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]); // Load the app initially with an empty array

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Did not receive expected data");
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null); // Reset fetch error if data is fetched successfully
      } catch (err) {
        console.log(err.message);
        setFetchError(err.message); // Set fetch error if there is an issue
      } finally {
        setIsLoading(false); // Set loading to false after fetching data
      }
    };

    setTimeout(() => {
      (async () => await fetchItems())();
    }, 3000); // Simulate a delay of 3 seconds before fetching data
  }, []);

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItems(listItems);
    // console.log(listItems);
  };

  const handleCheck = (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);
  };

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
  };

  const handleSubmit = (e) => {
    // console.log("submitted");
    e.preventDefault();
    if (!newItem) return;
    // if new item is added
    addItem(newItem);
    setNewItem("");
  };

  return (
    <>
      <Header />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} setSearch={setSearch} />

      <main>
        {isLoading && <p>Loading data ...</p>}
        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}

        {!fetchError && !isLoading && (
          <Content
            items={items.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </main>
      <Footer length={items.length} />
    </>
  );
}

export default App;

// npx json-server -p 3500 -w data/db.json
