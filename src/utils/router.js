function findMatchingRoute(url, routes, $$) {
  var matchingRoute;

  if (!url) return matchingRoute;

  var query = $$.parseUrlQuery(url);
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

// Parse Route
function parseRoute(str) {
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


// Preroute
function preroute(view, options, routes, routeChangeHandler, $$) {
  if (!view.allowPageChange) return false;

  var url = options.url;
  var pageElement = options.pageElement;

  if (url && pageElement || !url || url === '#') {
    return true;
  }

  var matchingRoute = findMatchingRoute(url, routes, $$);
  var inHistory = view.history.indexOf(url) >= 0;
  var inDomCache = view.pagesCache[url];

  if (inHistory && inDomCache) return true;
  if (!matchingRoute) return true;

  return routeChangeHandler(matchingRoute, view, options);    
}

export default class Framework7Router {
  constructor(dom7, routes, initialPreroute) {
    var initialPreroute = initialPreroute;

    this.routeChangeHandler = null;
    this.$$ = dom7;
    this.routes = routes || [];
    this.initialPreroute = initialPreroute;
  }

  prerouteHook(view, params) {
    var passToVueRouter = true;

    if (this.initialPreroute) {
      passToVueRouter = this.initialPreroute(view, params);
    }

    if (passToVueRouter) return preroute(view, params, this.routes, this.routeChangeHandler, this.$$);
    else return false;            
  }

  getFramework7RoutingParams() {
    return {
      preroute: this.prerouteHook.bind(this),
      routes: this.routes,
      routerRemoveTimeout: true
    };
  }

  setRouteChangeHandler(routeChangeHandler) {        
    this.routeChangeHandler = routeChangeHandler;
  }
}