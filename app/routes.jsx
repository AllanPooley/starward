import React from 'react';
import {
  BLOG_SLUG,
  CATEGORY_SLUG,
  AUTHOR_SLUG,
  SEARCH_SLUG,
  CART_SLUG,
  STORE_SLUG,
  STORE_PRODUCTS_SLUG
} from './config/app';
import { fetchWPData, fetchWooCommerceData } from './fetch-data';
import { Loading } from './components/Content/Loading';
import App from './containers/App';

function asyncComponent(getComponent) {
  return class AsyncComponent extends React.Component {
    static Component = null;
    state = { Component: AsyncComponent.Component };

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(({ default: Component }) => {
          AsyncComponent.Component = Component;
          this.setState({ Component });
        }).catch(err => console.error(err));
      }
    }

    render() {
      const { Component } = this.state;
      if (Component) {
        return <Component {...this.props} />;
      }
      return <Loading />;
    }
  };
}

const getComponent = (name) => {
  return asyncComponent(() => import(/* webpackChunkName: "[request]" */ `./containers/${name}`));
};

export default [{
  component: App,
  routes: [{
    path: `/${BLOG_SLUG}/page/:page`,
    name: 'Blog',
    fetchData: fetchWPData,
    component: getComponent('Blog'),
  }, {
    path: `/${BLOG_SLUG}/:post`,
    name: 'BlogPost',
    fetchData: fetchWPData,
    component: getComponent('BlogPost'),
  }, {
    path: `/${BLOG_SLUG}`,
    name: 'Blog',
    fetchData: fetchWPData,
    component: getComponent('Blog'),
  }, {
    path: `/${CATEGORY_SLUG}/:slug/page/:page`,
    name: 'Category',
    fetchData: fetchWPData,
    component: getComponent('Category'),
  }, {
    path: `/${CATEGORY_SLUG}/:slug`,
    name: 'Category',
    fetchData: fetchWPData,
    component: getComponent('Category'),
  }, {
    path: `/${AUTHOR_SLUG}/:name/page/:page`,
    name: 'Author',
    fetchData: fetchWPData,
    component: getComponent('Author'),
  }, {
    path: `/${AUTHOR_SLUG}/:name`,
    name: 'Author',
    fetchData: fetchWPData,
    component: getComponent('Author'),
  }, {
    path: `/${SEARCH_SLUG}`,
    name: 'Search',
    fetchData: fetchWPData,
    component: getComponent('Search'),
  }, {
    path: `/${STORE_SLUG}/:category`,
    name: 'ProductCategory',
    fetchData: fetchWooCommerceData,
    component: asyncComponent(() => import(/* webpackChunkName: "ProductCategory" */ './containers/ProductCategory')),
  }, {
    path: `/${STORE_SLUG}/:category/page/:page`,
    name: 'ProductCategory',
    fetchData: fetchWooCommerceData,
    component: asyncComponent(() => import(/* webpackChunkName: "ProductCategory" */ './containers/ProductCategory')),
  }, {
    path: `/${STORE_PRODUCTS_SLUG}/:product`,
    name: 'Product',
    fetchData: fetchWooCommerceData,
    component: asyncComponent(() => import(/* webpackChunkName: "Product" */ './containers/Product')),
  }, {
    path: `/${CART_SLUG}`,
    name: 'Cart',
    fetchData: fetchWPData,
    component: asyncComponent(() => import(/* webpackChunkName: "Cart" */ './containers/Cart')),
  }, {
    path: '*',
    name: 'Page',
    fetchData: fetchWPData,
    component: getComponent('Page'),
  }]
}];
