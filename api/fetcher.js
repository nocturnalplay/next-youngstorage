export const Fetcher = async (props) => {
  const { path, method, body, headers } = props;
  const data = await fetch(`${process.env.API + path}`, {
    method,
    body: JSON.stringify(body),
    credentials: "include",
  }).then((res) => res.json());
  return data;
};
