import { Fragment, useEffect } from "react";
import { Link, Route, useParams, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

// const DUMMY_QUOTES = [
//   { id: "q1", author: "ALAN", text: "Learn React" },
//   { id: "q2", author: "ALANKRIT", text: "Learn Css" },
// ];

const QuoteDetail = () => {
  const params = useParams();
  const match = useRouteMatch();
  const { quoteId } = params;

  const { sendRequest, status, data: loadedQuote, error } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  //const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId);
  if (!loadedQuote.text) {
    return <p>No quote found!!</p>;
  }
  return (
    <Fragment>
      {/*<Route path={`/quotes/${params.quoteId}`} exact>*/}
      <Route path={match.path} exact>
        <div className="centered">
          {/*<Link className="btn--flat" to={`/quotes/${params.quoteId}/comments`}>*/}
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      {/*<Route path={`/quotes/${params.quoteId}/comments`}>*/}
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
