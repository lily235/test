"use client";
import './App.css';

import { useState } from 'react';

function validURL(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

function generateURL() {
  let r = (Math.random() + 1).toString(36).substring(7);
  //return "https://shortest.url/" + r;
  return "http://localhost:3000/api/" + r;
}

let nextId = 0;
export let urlMappings = [
  {
    id: 99,
    url: "https://ohshitgit.com/",
    shortUrl: "http://localhost:3000/api/rp6c5",
  },
];

export default function App() {
  const [isSubmited, setIsSubmited] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  //const [urlMappings, setUrlMappings] = useState([]);

  function handleShorten() {
    if (validURL(urlInput)) {
      if (urlMappings.find((u) => u.url === urlInput)) {
        alert("already have one!");
        setUrlInput("");
      } else {
        let shortUrl = generateURL();
        // setUrlMappings([
        //   ...urlMappings,
        //   { id: nextId++, url: urlInput, shortUrl: shortUrl },
        // ]);
        urlMappings.push({ id: nextId++, url: urlInput, shortUrl: shortUrl });

        setIsSubmited(!isSubmited);
        setUrlInput(shortUrl);
        console.log(urlMappings);
      }
    } else {
      alert("!please enter a URL!");
      setUrlInput("");
      console.log(urlMappings);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(urlInput).then(function (x) {
      alert("Link copied to clipboard: " + urlInput);
    });

    setIsSubmited(!isSubmited);
    setUrlInput("");
  }

  function handleUrlInput(e) {
    setUrlInput(e.target.value);
  }

  return (
    <>
      <h1>YOUR SHORTENED LINK:</h1>
      <input
        className="url"
        placeholder="PASTE URL,SHORTEN & SHARE"
        value={urlInput}
        onChange={handleUrlInput}
        disabled={isSubmited}
      />
      <button onClick={isSubmited ? handleCopy : handleShorten}>
        {isSubmited ? "COPY" : "SHORTEN"}
      </button>
      {isSubmited ? (
        <p>
          View info & stats at <a href={urlInput}>{urlInput}</a>
        </p>
      ) : (
        <p>Shortest.url is a Free URL shortener.</p>
      )}
    </>
  );
}
