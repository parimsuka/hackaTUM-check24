
import { NextApiResponse } from "next";


export default async function handler(_: NextApiResponse, res: NextApiResponse) {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/postcodes`);
  const postcodes = await data.json();
  res.status(200).send({ data: postcodes, type: "success" });
}