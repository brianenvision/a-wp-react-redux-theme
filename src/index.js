require('./sass/styles.scss');

import 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';

import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import {createLogger} from 'redux-logger';
import {routerMiddleware, connectRouter, ConnectedRouter} from 'connected-react-router';

import rootReducer from './reducers';

const history = createBrowserHistory();
const store = createStore(
	connectRouter(history)(rootReducer),
	compose(
		applyMiddleware(
			routerMiddleware(history),
			promise(),
			thunk,
			createLogger()
		)
	)
);

import Blog from './containers/blog';
import Search from './containers/search';
import Category from './containers/category';
import Tag from './containers/tag';
import Single from './containers/single';

import {SITEBASE} from './actions';

ReactDom.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Switch>
				<Route exact path={`${SITEBASE}/`} component={Blog}/>
				<Route path={`${SITEBASE}/page/:pageNum`} component={Blog}/>
				<Route path={`${SITEBASE}/search/:term`} component={Search}/>
				<Route path={`${SITEBASE}/category/:slug/page/:pageNum`} component={Category}/>
				<Route path={`${SITEBASE}/category/:slug`} component={Category}/>
				<Route path={`${SITEBASE}/category/:parent/:slug/page/:pageNum`} component={Category}/>
				<Route path={`${SITEBASE}/category/:parent/:slug`} component={Category}/>
				<Route path={`${SITEBASE}/tag/:slug/page/:pageNum`} component={Tag}/>
				<Route path={`${SITEBASE}/tag/:slug`} component={Tag}/>
				<Route path="*" component={Single}/>
			</Switch>
		</ConnectedRouter>
	</Provider>,
	document.getElementById('react-main')
);
