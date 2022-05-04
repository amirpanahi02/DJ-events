import { API_URL } from "./../../config/index";

const login = async (req, res) => {
  if (req.method === "POST") {
    const { identifier, password } = JSON.parse(req.body);
    const strapiRes = await fetch(`${API_URL}/auth/local`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ identifier, password }),
    });

    const data = await strapiRes.json();
    strapiRes.ok
      ? res.status(200).json(data)
      : res
          .status(data.statusCode)
          .json({ message: data.message[0].messages[0].message, a: 6 });
  } else {
    res.setHeader("allow"["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default login;
