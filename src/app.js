import Header from "./components/header";
import { useState, useEffect } from "react";

import initialEmails from "./data/emails";

import "./styles/app.css";

function App() {
  // Use initialEmails for state

  const [emails, setEmails] = useState(initialEmails);
  const [filterRead, setFilterRead] = useState();
  const [readIsChecked, setReadIsChecked] = useState(false);
  const [filterStarred, setFilterStarred] = useState();
  const [starredIsChecked, setStarredIsChecked] = useState(false);

  let emailsArr = [];
  if (readIsChecked) emailsArr = filterRead;
  if (starredIsChecked) emailsArr = filterStarred;
  if (starredIsChecked && readIsChecked)
    emailsArr = emails.filter((email) => {
      if (email.starred === true && email.read !== true) return email;
    });

  if (!readIsChecked && !starredIsChecked) emailsArr = emails;

  useEffect(() => {
    setFilterStarred(emails.filter((email) => email.starred === true));
  }, []);

  const toggleRead = (email) => {
    const checkedEmails = emails.map((emailA) => {
      if (emailA === email) {
        return { ...emailA, read: !email.read };
      }
      return emailA;
    });
    setFilterRead(checkedEmails.filter((email) => !email.read === true));
    setFilterStarred(checkedEmails.filter((email) => email.starred === true));
    setEmails(checkedEmails);
  };
  const toggleStar = (email) => {
    const starredEmails = emails.map((emailA) => {
      if (emailA === email) {
        return { ...emailA, starred: !email.starred };
      }
      return emailA;
    });
    setFilterStarred(starredEmails.filter((email) => email.starred === true));
    setFilterRead(starredEmails.filter((email) => !email.read === true));
    setEmails(starredEmails);
  };

  const renderUnreadEmails = () => {
    setFilterRead(emails.filter((email) => email.read !== true));
    setReadIsChecked(!readIsChecked);
    console.log(filterRead);
  };

  const renderStarredEmails = (e) => {
    setFilterStarred(emails.filter((email) => email.starred === true));
    setStarredIsChecked(true);
  };

  console.log("RERENDER:", emailsArr);
  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={`item ${
              !readIsChecked && !starredIsChecked && "active"
            }`}
            onClick={(e) => {
              setStarredIsChecked(false);
              return setReadIsChecked(false);
            }}
          >
            <span className="label">Inbox</span>
            <span className="count">{emails.length}</span>
          </li>
          <li
            className={`item starred ${starredIsChecked && "active"}`}
            id="starred"
            onClick={renderStarredEmails}
          >
            <span>Starred</span>
            <span className="count">{filterStarred?.length}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={readIsChecked}
              onChange={renderUnreadEmails}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        {emailsArr &&
          emailsArr.map((email) => (
            <li key={email.id} className="email">
              <div className="select">
                <input
                  className="select-checkbox"
                  type="checkbox"
                  checked={email.read}
                  onChange={() => toggleRead(email)}
                />
              </div>
              <div className="star">
                <input
                  className="star-checkbox"
                  type="checkbox"
                  checked={email.starred}
                  onChange={() => toggleStar(email)}
                />
              </div>
              <div className="sender">{email.sender}</div>
              <div className="title">{email.title}</div>
            </li>
          ))}
      </main>
    </div>
  );
}

export default App;
