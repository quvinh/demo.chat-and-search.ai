import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { Navbar } from "@/components/Navbar";

export default function Data() {
  const router = useRouter();

  const [apiKey, setApiKey] = useState<string>("");
  const [actionAdd, setActionAdd] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleSaveContent = async () => {
    if (!title || !content) {
      alert("Tiêu đề(title) và Nội dung(content) không được để trống!");
    } else {
      const response = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, url, content }),
      });

      console.log("response", response.json())
    }
  };

  useEffect(() => {
    const PG_KEY = localStorage.getItem("PG_KEY");
    setApiKey(PG_KEY ?? "");

    if (!PG_KEY) {
      router.push("/");
    }
  }, []);

  return (
    <>
      {apiKey ? (
        <>
          <Head>
            <title>Data</title>
            <meta name="description" content={`Data training`} />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex-1 overflow-auto">
              <div className="mx-auto flex h-full w-full flex-col items-center px-3 pt-4 sm:pt-8">
                {actionAdd ? (
                  <div className="w-full max-w-[750px] mb-2">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                      <h3 className="text-center">New content</h3>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="title"
                        >
                          (*)Title
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="title"
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Please enter title"
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="url"
                        >
                          Url
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="url"
                          type="text"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          placeholder="Please enter url"
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="content"
                        >
                          (*)Content
                        </label>
                        <textarea
                          id="content"
                          rows={4}
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Write your content here..."
                        ></textarea>
                      </div>

                      <div className="flex items-center justify-between">
                        <button
                          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          type="button"
                          onClick={() => setActionAdd(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          type="button"
                          onClick={handleSaveContent}
                        >
                          Save
                        </button>
                      </div>
                    </form>
                    <hr />
                  </div>
                ) : (
                  <button
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mb-2"
                    onClick={() => setActionAdd(true)}
                  >
                    New content
                  </button>
                )}
                <table className="border-collapse border border-slate-900 w-full">
                  <thead>
                    <tr>
                      <th className="border w-1/10 px-4 py-2">STT</th>
                      <th className="border w-1/10 px-4 py-2">ID</th>
                      <th className="border w-1/10 px-4 py-2">Title</th>
                      <th className="border w-1/10 px-4 py-2">Url</th>
                      <th className="border w-5/10 px-4 py-2">Content</th>
                      <th className="border w-1/10 px-4 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-4 py-2">1</td>
                      <td className="border px-4 py-2">11</td>
                      <td className="border px-4 py-2">
                        A Long and Winding Tour of the History of UI Frameworks
                        and Tools and the Impact on Design
                      </td>
                      <td className="border px-4 py-2">Indiana.vn</td>
                      <td className="border px-4 py-2">
                        A Long and Winding Tour of the History of UI Frameworks
                        and Tools and the Impact on Design
                      </td>
                      <td className="border px-4 py-2">
                        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                          Edit
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 overflow-auto">
          <div className="mx-auto flex h-full w-full max-w-[750px] flex-col items-center px-3 pt-4 sm:pt-8">
            <p>Key not found! Redirect...</p>
          </div>
        </div>
      )}
    </>
  );
}
