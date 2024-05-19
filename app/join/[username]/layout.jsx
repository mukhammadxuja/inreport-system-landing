export async function generateMetadata({ params }) {
  return {
    title:
      params.username[0].toUpperCase() +
      params.username.slice(1) +
      " wants to invite you to Showcase.ai",
    description: params.username + " wants to invite you to Showcase.ai",
  };
}

export default function JoinLayout({ children }) {
  return <div>{children}</div>;
}
