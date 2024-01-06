import {NextApiRequest, NextApiResponse} from "next";

interface ApiRequest extends NextApiRequest {
  query: {
    postalCode: string;
    reset: "false" | "true";
  };
}

export default async function handler(req: ApiRequest, res: NextApiResponse) {
  if (req.query.reset === "true") {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/craftsmen/reset`, { method: 'POST' })
  }
  const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/craftsmen?postalcode=${req.query.postalCode}`)
  const craftsmen = await data.json()
  res.send({ data: { craftsmen: craftsmen, type: 'success'} })
}
