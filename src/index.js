import ReactDOM from 'react-dom';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { createHashHistory } from 'history';
// store相关
import { Provider } from 'react-redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { init } from '@rematch/core';
import createLoadingPlugin from '@rematch/loading';
import immerPlugin from '@rematch/immer';
import Home from "./pages/home";
import './common.sass';

renderReactApp();


// 渲染入口模块
function renderReactApp() {
  const history = createHashHistory();
  const middleware = routerMiddleware(history);

  const store = init({
    models: {},
    plugins: [
      createLoadingPlugin({}),
      immerPlugin(),
    ],
    redux: {
      reducers: {
        router: routerReducer,
      },
      middlewares: [middleware],
    },
  });


  const App = () => (
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
        </Routes>
      </HashRouter>
    </Provider>
  );

  ReactDOM.render(<App />, document.getElementById('root'));
}
