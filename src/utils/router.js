const combinePaths = (...paths) => paths.join('/').replace(/\/+/g, '/');

const flattenTabNestedRoutes = (pageRoute, tabRoute, tabNestedRoutes) => tabNestedRoutes.map(tabNestedRoute => ({
  path: combinePaths(pageRoute.path, tabRoute.path, tabNestedRoute.path),
  pagePath: pageRoute.path,
  component: pageRoute.component,
  tab: {
    tabId: tabRoute.tabId,
    component: tabNestedRoute.component,
  },
}));

const flattenTabRoutes = (pageRoute, tabRoutes) => tabRoutes.reduce((accumulatedFlattenedRoutes, nextTabRoute) => {
  let flattenedTabRoutes;

  if (nextTabRoute.routes) {
    flattenedTabRoutes = flattenTabNestedRoutes(pageRoute, nextTabRoute, nextTabRoute.routes);
  } else {
    flattenedTabRoutes = [{
      path: combinePaths(pageRoute.path, nextTabRoute.path),
      pagePath: pageRoute.path,
      component: pageRoute.component,
      tab: {
        tabId: nextTabRoute.tabId,
        component: nextTabRoute.component,
      },
    }];
  }

  return [
    ...accumulatedFlattenedRoutes,
    ...flattenedTabRoutes,
  ];
}, []);

const flattenRoutes = (routes = []) => routes.reduce((accumulatedFlattenedRoutes, nextRoute) => {
  let flattenedNextRoute;

  if (nextRoute.tabs) {
    flattenedNextRoute = flattenTabRoutes(nextRoute, nextRoute.tabs);
  } else {
    flattenedNextRoute = [Object.assign({}, nextRoute, {
      pagePath: nextRoute.path,
    })];
  }

  return [
    ...accumulatedFlattenedRoutes,
    ...flattenedNextRoute,
  ];
}, []);

const parseRoute = (str) => {
  const parts = [];
  str.split('/').forEach((part) => {
    if (part !== '') {
      if (part.indexOf(':') === 0) {
        parts.push({ name: part.replace(':', '') });
      } else parts.push(part);
    }
  });
  return parts;
};

function handleRouteChangeFromFramework7(view, options, changeRouteCallback) {
  if (!view.allowPageChange) return false;

  const url = options.url;
  const pageElement = options.pageElement;

  if ((url && pageElement) || !url || url === '#') {
    return true;
  }

  const inHistory = view.history.indexOf(url) >= 0;
  const inDomCache = view.pagesCache[url];

  if (inHistory && inDomCache) return true;

  return changeRouteCallback(url, view, options);
}

export default class Framework7Router {
  constructor(originalRoutes, framework7, dom7) {
    this.routeChangeHandler = null;
    this.routes = flattenRoutes(originalRoutes);
    this.framework7 = framework7;
    this.dom7 = dom7;

    // Hook router into Framework7 routing events
    const initialPreroute = framework7.params.preroute;

    /* eslint-disable no-param-reassign */
    framework7.params.routes = originalRoutes;
    framework7.params.routerRemoveTimeout = true;
    framework7.params.preroute = (view, options) => {
      let passToVueRouter = true;

      if (initialPreroute && !options.pageElement) {
        passToVueRouter = initialPreroute(view, options);
      }
      if (passToVueRouter) {
        return handleRouteChangeFromFramework7(view, options, this.changeRoute.bind(this));
      }
      return false;
    };
  }

  setRouteChangeHandler(routeChangeHandler) {
    this.routeChangeHandler = routeChangeHandler;
  }

  changeRoute(url, view = null, options) {
    const getMainView = () => this.framework7.views && this.framework7.views.reduce((mainView, nextView) => {
      if (nextView.main) {
        return nextView;
      }
      return mainView;
    }, null);

    const matchingRoute = this.findMatchingRoute(url);

    if (!matchingRoute) return true;

    return this.routeChangeHandler(Object.assign({}, matchingRoute, {
      view: view || getMainView(),
      options,
      router: this,
    }));
  }

  findMatchingRoute(_url) {
    let matchingRoute;
    if (!_url) return matchingRoute;
    const url = `${_url}`; // Insures that the url is of type string so url.split does not crash app in weird situations.

    const routes = this.routes;
    const query = this.dom7.parseUrlQuery(url);
    const hash = url.split('#')[1];
    const params = {};
    const path = url.split('#')[0].split('?')[0];
    const urlParts = path.split('/').filter(part => part !== '');

    for (let i = 0; i < routes.length; i += 1) {
      if (matchingRoute) continue; // eslint-disable-line no-continue
      const route = routes[i];
      const parsedRoute = parseRoute(route.path);
      if (parsedRoute.length !== urlParts.length) continue; // eslint-disable-line no-continue
      let matchedParts = 0;
      for (let j = 0; j < parsedRoute.length; j += 1) {
        if (typeof parsedRoute[j] === 'string' && urlParts[j] === parsedRoute[j]) matchedParts += 1;
        if (typeof parsedRoute[j] === 'object') {
          params[parsedRoute[j].name] = urlParts[j];
          matchedParts += 1;
        }
      }
      if (matchedParts === urlParts.length) {
        matchingRoute = {
          query,
          hash,
          params,
          url,
          path,
          route,
        };
      }
    }
    return matchingRoute;
  }
}
