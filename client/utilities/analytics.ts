import ReactGa from 'react-ga';
import Router from 'next/router';
import qs from 'qs';
import { DEV, GA_TRACKING_ID } from "@constants/environment";

export function initializeGoogleAnalytics() {
  if(DEV || !GA_TRACKING_ID) return;

  ReactGa.initialize(GA_TRACKING_ID, { debug: DEV });
  ReactGa.pageview([Router.pathname, qs.stringify(Router.query)].join('?'));
}