import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import App from '../App';
import theme from '../theme/theme';
import '../services/i18n';

vi.mock('../components/Result.jsx', () => ({
  Result: vi.fn(() => <div>Result component</div>),
}));

const mockStore = configureStore([thunk]);
const navigate = vi.fn();
vi.mock('react-router-dom', async () => {
  return {
    ...(await vi.importActual('react-router-dom')),
    useNavigate: () => navigate,
  };
});

describe('UserHistory- user history is present', () => {
  let tree;
  let store;
  const storeData = {
    auth: {
      userInfo: { email: 'email', firstName: 'Test Name' },
      accessToken: 'testToken',
    },
    userHistory: {
      loading: false,
      data: [
        { rollNumber: '1234', mark: 50 },
        { rollNumber: '4567', mark: 11 },
      ],
    },
    rankData: {
      loading: false,
      error: null,
      data: {
        overall: { rank: 1, overall: 12 },
        zone: { rank: 1, overall: 12 },
        zoneCategory: { rank: 1, overall: 12 },
        zoneShift: { rank: 1, overall: 12 },
        zoneShiftCategory: { rank: 1, overall: 12 },
        rawMarks: 12.12,
        zoneSelected: 'test zone',
      },
    },
  };
  beforeEach(() => {
    store = mockStore(storeData);
    tree = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Provider>
    );
  });

  it('shoudl render without any errors', () => {
    expect(tree.asFragment()).toMatchSnapshot();
  });
});
