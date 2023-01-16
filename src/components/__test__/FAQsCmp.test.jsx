import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';

import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import FAQsCmp from '../FAQsCmp';
import theme from '../../theme/theme';

const mockStore = configureStore([thunk]);
const navigate = vi.fn();
vi.mock('react-router-dom', async () => {
  return {
    ...(await vi.importActual('react-router-dom')),
    useNavigate: () => navigate,
  };
});

describe('FAQsCmp.jsx', () => {
  let tree;
  let store;
  const storeData = {
    auth: {
      userInfo: {},
      accessToken: 'testToken',
      loading: false,
    },
  };

  beforeEach(() => {
    store = mockStore(storeData);
    tree = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <FAQsCmp />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
  });

  it('should render without any errors', () => {
    expect(tree.asFragment()).toMatchSnapshot();
  });
});
