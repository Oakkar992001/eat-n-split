import { useState } from "react";
import "./App.css";
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
function App() {
  const [selectedFriends, setSelectedFriends] = useState(null);
  function handleSelected(friend) {
    // setSelectedFriends(friend);
    setSelectedFriends(selectedFriends?.id === friend?.id ? null : friend);
    setIsAdd(false);
  }
  function handleSplit(value) {
    console.log(value);
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriends.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
  }
  const [isAdd, setIsAdd] = useState(false);
  function handleAdd() {
    setIsAdd(!isAdd);
  }
  const datas = initialFriends;
  const [friends, setFriends] = useState(datas);
  function addFriend(friend) {
    setFriends([...friends, friend]);
  }
  return (
    <div className="app">
      <div className="sidebar">
        {
          /* {friends.map((data) => (
          <SideBar
            key={data.id}
            id={data.id}
            name={data.name}
            image={data.image}
            balance={data.balance}
          />
        ))} */
          <SideBar
            friends={friends}
            handleSelected={handleSelected}
            selectedFriends={selectedFriends}
          />
        }

        {isAdd && <AddFriend addFriend={addFriend} setIsAdd={setIsAdd} />}
        <button className="button" onClick={handleAdd}>
          {!isAdd ? "Add Friend" : "Close"}
        </button>
      </div>
      <SplitBill selectedFriends={selectedFriends} onSplitBill={handleSplit} />
    </div>
  );
}
function SideBar({ friends, handleSelected, selectedFriends }) {
  // let content;
  // if (balance === 0) {
  //   content = `You and ${name} are even`;
  // }
  // if (balance < 0) {
  //   const newBalance = String(balance).split("-")[1];
  //   content = `You owe ${name} ${newBalance}$`;
  // }
  // if (balance > 0) {
  //   content = `${name} owe you ${balance} $`;
  // }

  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          handleSelected={handleSelected}
          selectedFriends={selectedFriends}
        />
      ))}
    </ul>
    // <ul>
    // <li>
    //   <img src={image} />

    //   <h3>{name}</h3>
    //   <p>{content}</p>
    //   <button className="button">Select</button>
    // </li>
    // </ul>
  );
}
function SplitBill({ selectedFriends, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }
  return (
    <>
      {selectedFriends && (
        <form className="form-split-bill" onSubmit={handleSubmit}>
          <h2>Split a bill with {selectedFriends.name}</h2>

          <label>💰Bill value</label>
          <input
            value={bill}
            onChange={(e) => setBill(Number(e.target.value))}
          />
          <label>🫵Your Expense</label>
          <input
            type="text"
            value={paidByUser}
            onChange={(e) =>
              setPaidByUser(
                Number(e.target.value) > bill
                  ? paidByUser
                  : Number(e.target.value)
              )
            }
          />
          <label>🫂{selectedFriends.name}'s Expense</label>
          <input type="text" value={paidByFriend} disabled />
          <label>😎 Who is paying the bill?</label>
          <select
            value={whoIsPaying}
            onChange={(e) => setWhoIsPaying(e.target.value)}
          >
            <option value="user">You</option>
            <option value={selectedFriends.name}>{selectedFriends.name}</option>
          </select>
          <button className="button">Split Bill</button>
        </form>
      )}
    </>
  );
}
function AddFriend({ addFriend, setIsAdd }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  const id = crypto.randomUUID();
  function handleSubmit(e) {
    e.preventDefault();
    const newDatas = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    addFriend(newDatas);
    setName("");
    setIsAdd(false);
  }

  return (
    <>
      <form className="form-add-friend" onSubmit={handleSubmit}>
        <label>🫂Fri name</label>
        <input onChange={(e) => setName(e.target.value)} value={name} />
        <label>🖼️Image URL</label>
        <input onChange={(e) => setImage(e.target.value)} value={image} />
        <button className="button">Add</button>
      </form>
    </>
  );
}
function Friend({ friend, handleSelected, selectedFriends }) {
  let content;
  let styleContent;
  if (friend.balance === 0) {
    content = `You and ${friend.name} are even`;
  }
  if (friend.balance < 0) {
    const newBalance = String(friend.balance).split("-")[1];
    content = `You owe ${friend.name} ${newBalance}$`;
    styleContent = "red";
  }
  if (friend.balance > 0) {
    content = `${friend.name} owe you ${friend.balance} $`;
    styleContent = "green";
  }
  const isSelected = selectedFriends?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} />

      <h3>{friend.name}</h3>
      <p className={styleContent}>{content}</p>
      <button className="button" onClick={() => handleSelected(friend)}>
        {isSelected ? "Close" : "Select"}
      </button>
    </li>
  );
}
export default App;
