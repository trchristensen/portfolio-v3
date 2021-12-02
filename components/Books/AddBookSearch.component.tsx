import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import useSWR, { useSWRConfig } from "swr";
import fetcher from "lib/fetcher";
import { Form, FormState } from "lib/types";
// import SuccessMessage from 'components/SuccessMessage';
// import ErrorMessage from 'components/ErrorMessage';
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner.component";
import BookEntry from "./BookEntry.component";
import CounterInput from "components/CounterInput/CounterInput.component";

import AsyncSelect from "react-select/async";

function SearchResult({ book }) {
  return (
    <div>
      <div className="w-full flex py-2 border-b">{book.title}</div>
      <div className="w-full flex">{book.author}</div>
    </div>
  );
}

function AutocompleteSearch({ onSelect }) {
  const [inputValue, setValue] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);
  const [timer, setTimer] = useState(null);

  const changeDelay = (change) => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setTimer(
      setTimeout(() => {
        console.log(change);
      }, 300)
    );
  };

  // handle input change event
  const handleInputChange = (value) => {
    changeDelay(setValue(value));
  };

  // handle selection
  const handleChange = (value) => {
    console.log('VALUE', value)

    setSelectedValue(value);
    onSelect(value);
  };

  //   load options using API call
  const loadOptions = async (value) => {
    const results = await fetch(`/api/books/api-search?query=${value}`)
      .then((res) => res.json())
      .catch((err) => console.error(err));
    return results;
  };

  return (
    <div className="w-full flex flex-col">
      <AsyncSelect
        placeholder="📕 Start typing to search for a book..."
        className="w-full"
        cacheOptions
        defaultOptions
        value={selectedValue}
        getOptionLabel={(e) => `${e.title} by ${e.author}`}
        getOptionValue={(e) => e.id}
        loadOptions={loadOptions}
        onInputChange={handleInputChange}
        onChange={handleChange}
      />
      <div className="w-full">
        <div className="BookResult__Card flex flex-row gap-2 p-4">
          {selectedValue?.cover && (
            <div className="BookResult__Image-wrapper w-[100px]">
              <img
                src={selectedValue.cover}
              />
            </div>
          )}
          <div className="BookResult__Content flex flex-col y-gap-2">
            <p className="BookResult__Title font-bold text-lg text-gray-600 dark:text-gray-400">
              {selectedValue?.title}
            </p>
            <p className="BookResult__Author text-sm text-gray-600 dark:text-gray-400">
              {selectedValue?.author}
            </p>
            {selectedValue?.publish_date && (
              <p className="BookResult__Published text-xs mb-1 mt-3 italic text-gray-600 dark:text-gray-400">
                First published:{" "}
                {
                  selectedValue?.publish_date[
                    selectedValue?.publish_date.length - 1
                  ]
                }
              </p>
            )}
            {selectedValue?.subjects && (
              <p className="BookResult__Subjects text-gray-300 dark:text-gray-700 text-xs">
                {selectedValue?.subjects.join(", ")}
              </p>
            )}
          </div>
        </div>
        {JSON.stringify(selectedValue)}
      </div>
    </div>
  );
}

export default function AddBookSearch({ session }) {
  const { mutate } = useSWRConfig();
  const [form, setForm] = useState<FormState>({ state: Form.Initial });

  const [bookData, setBookData] = useState<any>();
  const [comment, setComment] = useState<string>();
  const [rating, setRating] = useState<number>(0);

  const onCounterChange = (counterValue) => {
    setRating(counterValue);
  };

  const clearForm = () => {
    setBookData(null);
    setComment("");
    setRating(0);
  };

  const leaveEntry = async (e) => {
    e.preventDefault();
    setForm({ state: Form.Loading });

    const res = await fetch("/api/books", {
      body: JSON.stringify({
        bookData,
        comment,
        rating,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const { error } = await res.json();
    if (error) {
      setForm({
        state: Form.Error,
        message: error,
      });
      return;
    }

    mutate("/api/books");
    setForm({
      state: Form.Success,
      message: `Book has been added to the list!`,
    });
  };

  return (
    <>
      <div className="AddBook border border-blue-200 rounded p-6 my-4 w-full dark:border-gray-800 bg-blue-50 dark:bg-blue-opaque">
        <h5 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100">
          Add a book
        </h5>
        <p className="my-1 text-gray-800 dark:text-gray-200">
          You must be me, in order to add a new book.
        </p>
        {!session && (
          // eslint-disable-next-line @next/next/no-html-link-for-pages
          <a
            href="/api/auth/signin/github"
            className="flex items-center justify-center my-4 font-bold h-8 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded w-28"
            onClick={(e) => {
              e.preventDefault();
              signIn("github");
            }}
          >
            Login
          </a>
        )}
        {session?.user && (
          <div className="AddBook__form">
            <form
              className="relative my-4 text-gray-900 dark:text-gray-100 flex flex-col gap-2"
              onSubmit={leaveEntry}
            >
              <div className="w-full flex">
                <AutocompleteSearch onSelect={(value) => setBookData(value)} />
              </div>
              <div className="flex flex-row justify-between gap-4">
                <div className="w-auto flex justify-end">
                  <CounterInput
                    onCounterChange={onCounterChange}
                    min={0}
                    max={5}
                    step={0.5}
                  />
                </div>
              </div>
              <input
                value={comment}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setComment(e.target.value)
                }
                aria-label="Book description"
                placeholder="Book description..."
                required
                className="pl-4 pr-32 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full border-gray-300 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
              <button
                className="flex items-center justify-center px-4 pt-1 font-medium h-8 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded w-28"
                type="submit"
              >
                {form.state === Form.Loading ? <LoadingSpinner /> : "Add Book"}
              </button>
            </form>
          </div>
        )}
        {form.state === Form.Error
          ? // <ErrorMessage>{form.message}</ErrorMessage>
            console.log("error")
          : form.state === Form.Success
          ? console.log("success")
          : // <SuccessMessage>{form.message}</SuccessMessage>
            null}
      </div>
    </>
  );
}
