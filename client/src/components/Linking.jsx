import { Link } from "react-router-dom";

export default function Linking({ question, link, linkTitle }) {
  return (
    <article className='flex__row'>
      <p>{question}</p>
      <p className="link"><Link to={link}>{linkTitle}</Link></p>
    </article>
  );
}