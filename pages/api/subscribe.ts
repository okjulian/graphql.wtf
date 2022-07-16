import type { NextApiRequest, NextApiResponse } from "next";

interface Req extends NextApiRequest {
  body: {
    trigger: {
      data: {
        email: string;
      };
    };
  };
}
export default async (req: Req, res: NextApiResponse) => {
  try {
    const { email } = req.body?.trigger?.data;

    const response = await fetch("https://www.getrevue.co/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${process.env.REVUE_API_KEY}`,
      },
      body: JSON.stringify({
        email,
      }),
    });

    if (!response.ok) {
      res.status(400).json({ message: "Could not subscribe user" });
      return;
    }

    res.status(201).json({ message: "Subscribed" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};
