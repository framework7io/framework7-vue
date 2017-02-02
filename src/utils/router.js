const combinePaths = (...paths) => {
  return paths.join('/').replace(/\/+/g, '/');
}

const flattenTabNestedRoutes = (pageRoute, tabRoute, tabNestedRoutes) => {
	return tabNestedRoutes.map(tabNestedRoute => {
    return {
      path: combinePaths(pageRoute.path, tabRoute.path, tabNestedRoute.path),
      pagePath: pageRoute.path,
      component: pageRoute.component,
      tab: {
        tabId: tabRoute.tabId,
        component: tabNestedRoute.component
      }
    }
	});
};

const flattenTabRoutes = (pageRoute, tabRoutes) => {
	return tabRoutes.reduce((accumulatedFlattenedRoutes, nextTabRoute) => {
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
					component: nextTabRoute.component
				}
			}];
		}

		return  [
			...accumulatedFlattenedRoutes,
			...flattenedTabRoutes
		];
	}, []);
};

const flattenRoutes = (routes) => {
	return routes.reduce((accumulatedFlattenedRoutes, nextRoute) => {
		let flattenedNextRoute;

		if (nextRoute.tabs) {
			flattenedNextRoute = flattenTabRoutes(nextRoute, nextRoute.tabs);
		} else {
			flattenedNextRoute = [Object.assign({}, nextRoute, {
        pagePath: nextRoute.path
      })];
		}

		return [
			...accumulatedFlattenedRoutes,
			...flattenedNextRoute
		];
	}, []);
};

const parseRoute = str => {
  var parts = [];
  str.split('/').forEach(function (part) {
    if (part !== '') {
      if (part.indexOf(':') === 0) {
        parts.push({name: part.replace(':', '')});
      }
      else parts.push(part);
    }
  });
  return parts;
}

function handleRouteChangeFromFramework7(view, options, changeRouteCallback) {
  if (!view.allowPageChange) return false;

  var url = options.url;
  var pageElement = options.pageElement;

  if (url && pageElement || !url || url === '#') {
    return true;
  }

  var inHistory = view.history.indexOf(url) >= 0;
  var inDomCache = view.pagesCache[url];

  if (inHistory && inDomCache) return true;

  return changeRouteCallback(url, view, options);
}

export default class Framework7Router {
  constructor(originalRoutes, framework7, dom7) {
    this.routeChangeHandler = null;
    this.routes = flattenRoutes(originalRoutes);
    this.framework7 = framework7;
    this.dom7 = dom7;

    //Hook router into Framework7 routing events
    const initialPreroute = framework7.params.preroute;

    framework7.params.routes = originalRoutes;
    framework7.params.routerRemoveTimeout = true;
    framework7.params.preroute = (view, options) => {
      var passToVueRouter = true;

      if (initialPreroute) {
        passToVueRouter = initialPreroute(view, options);
      }

      if (passToVueRouter) {
        return handleRouteChangeFromFramework7(view, options, this.changeRoute.bind(this));
      } else {
        return false;
      }
    };
  }

  setRouteChangeHandler(routeChangeHandler) {
    this.routeChangeHandler = routeChangeHandler;
  }

  changeRoute(url, view = null, options) {
    const getMainView = () => this.framework7.views && this.framework7.views.reduce((mainView, nextView) => {
        if (nextView.main) {
            return nextView;
        } else {
            return mainView;
        }
    }, null);

    const matchingRoute = this.findMatchingRoute(url);

    if (!matchingRoute) return true;

    return this.routeChangeHandler(
      Object.assign({}, matchingRoute, {
        view: view || getMainView(),
        options
      })
    );
  }

  findMatchingRoute(url) {
    var matchingRoute;
    if (!url) return matchingRoute;

    var routes = this.routes;
    var query = this.dom7.parseUrlQuery(url);
    var hash = url.split('#')[1];
    var params = {};
    var path = url.split('#')[0].split('?')[0];
    var urlParts = path.split('/').filter(function (part) {
      if (part !== '') return part;
    });

    var i, j, k;
    for (i = 0; i < routes.length; i++) {
      if (matchingRoute) continue;
      var route = routes[i];
      var parsedRoute = parseRoute(route.path);
      if (parsedRoute.length !== urlParts.length) continue;
      var matchedParts = 0;
      for (j = 0; j < parsedRoute.length; j++) {
          if (typeof parsedRoute[j] === 'string' && urlParts[j] === parsedRoute[j]) matchedParts ++;
          if (typeof parsedRoute[j] === 'object') {
            params[parsedRoute[j].name] = urlParts[j];
            matchedParts ++;
          }
      }
      if (matchedParts === urlParts.length) {
        matchingRoute = {
          query: query,
          hash: hash,
          params: params,
          url: url,
          path: path,
          route: route
        };
      }
    }
    return matchingRoute;
  }
}