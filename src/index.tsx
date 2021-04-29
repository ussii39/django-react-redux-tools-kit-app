import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { Route, BrowserRouter } from "react-router-dom";
import { Auth } from "./features/auth/Auth";
import Login from "./features/Login/Login";
import Loading from "./features/Loading/Loading";
import Selectlang from "./app/pages/Selectlang";
import Mypage from "./app/pages/Mypage";
import AnswerQuestion from "./app/pages/AnswerQuestion";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route exact path="/" component={Auth} />
        <Route exact path="/tasks" component={App} />
        <Route exact path="/selectLang" component={Selectlang} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/loading" component={Loading} />
        <Route exact path="/Mypage" component={Mypage} />
        <Route exact path="/AnswerQuestion" component={AnswerQuestion} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
