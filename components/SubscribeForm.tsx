import { useState } from "react";
import splitbee from "@splitbee/web";

function SubscribeForm({ intent = "subscribe" }) {
  const [email, setEmail] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const subscribe = async (e) => {
    e.preventDefault();

    splitbee.user.set({ email });
    splitbee.track(intent, { email });

    fetch("/api/subscribe", {
      method: "POST",
      body: JSON.stringify({ trigger: { data: { email } } }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then(() => setSubmitted(true))
      .catch(console.error);
  };

  if (submitted)
    return (
      <p className="text-lg text-white">
        {intent == "subscribe"
          ? "Thanks! You'll get notified of new episodes by email."
          : "Thanks! I'll be in touch a few days before the course is ready with early access."}
      </p>
    );

  return (
    <form
      onSubmit={subscribe}
      className="w-full md:w-auto flex flex-col items-center text-center"
    >
      <div className="w-full flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
        <input
          type="email"
          placeholder="Email address"
          onChange={({ target: { value } }) => setEmail(value)}
          className="rounded-md bg-white px-3 py-3 h-10 border-white border text-haiti placeholder-gray-500 focus:ring-razzmatazz focus:border-razzmatazz shadow md:w-72"
          required
          autoComplete="email"
        />
        <button
          type="submit"
          className="bg-razzmatazz text-white px-6 h-10 rounded-md font-medium shadow"
        >
          Sign me up
        </button>
      </div>
    </form>
  );
}

export default SubscribeForm;
