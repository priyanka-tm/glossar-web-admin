// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import { apiInstance } from './httpClient';
import { getData, getToken } from './utils/comman';

// ----------------------------------------------------------------------

export default function App() {
  const user = getData();

  Object.assign(apiInstance.defaults.headers, {
    Authorization: user?.token
  });
  console.log('token-----', getToken());
  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Router />
    </ThemeConfig>
  );
}
