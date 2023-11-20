import {NextApiRequest, NextApiResponse} from "next";

interface ApiRequest extends NextApiRequest {
  query: {
    postalCode: string;
  };
}

export default async function handler(req: ApiRequest, res: NextApiResponse) {
  const data = await fetch(`http://localhost:5000/craftsmen?postalcode=${req.query.postalCode}`)
  const craftsmen = await data.json()
  res.send({ data: { craftsmen: craftsmen, type: 'success'} })
}
