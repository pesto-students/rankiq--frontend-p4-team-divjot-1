import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import UserHistory from '../UserHistory';
import theme from '../../theme/theme';

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
          <BrowserRouter>
            <UserHistory />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
  });

  it('should render without any errors', () => {
    const { asFragment } = tree;
    expect(asFragment()).toMatchSnapshot();
  });

  it('should call navigate on click of result button', () => {
    const resultButton = screen.getByTestId('result1234');
    fireEvent.click(resultButton);
    waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('/result');
    });
  });

  it('should show rank modal when rank button is clicked', () => {
    const rankButton = screen.getByTestId('rank1234');
    fireEvent.click(rankButton);
    waitFor(() => {
      const modalCloseBtn = screen.getByTestId('btnCloseRank');
      expect(modalCloseBtn).toBeInTheDocument();
      fireEvent.click(modalCloseBtn);
      expect(screen.getByTestId('btnCloseRank')).not.toBeInTheDocument();
    });
  });
});

describe('UserHistory- user history is loading', () => {
  let tree;
  let store;
  const storeData = {
    auth: {
      userInfo: { email: 'email', firstName: 'Test Name' },
      accessToken: 'testToken',
    },
    userHistory: {
      loading: true,
      data: [],
    },
  };
  beforeEach(() => {
    store = mockStore(storeData);
    tree = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <UserHistory />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
  });

  it('should render without any errors', () => {
    const { asFragment } = tree;
    expect(asFragment()).toMatchSnapshot();
  });

  it('should show circular loader when data is being loaded', () => {
    expect(screen.queryByTestId('circularProgressHistory')).toBeInTheDocument();
  });
});

describe('UserHistory- error in loading user history', () => {
  let tree;
  let store;
  const storeData = {
    auth: {
      userInfo: { email: 'email', firstName: 'Test Name' },
      accessToken: 'testToken',
    },
    userHistory: {
      loading: false,
      data: [],
      error: 'Test Error',
    },
  };
  beforeEach(() => {
    store = mockStore(storeData);
    tree = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <UserHistory />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
  });

  it('should render without any errors', () => {
    const { asFragment } = tree;
    expect(asFragment()).toMatchSnapshot();
  });

  it('should show circular loader when data is being loaded', () => {
    expect(screen.queryByText('Test Error')).toBeInTheDocument();
  });
});

describe('UserHistory- Unauthorized from server', () => {
  let store;
  const storeData = {
    auth: {
      userInfo: { email: 'email', firstName: 'Test Name' },
      accessToken: 'testToken',
    },
    userHistory: {
      loading: false,
      data: [],
      error: 'Unauthorized',
    },
  };
  beforeEach(() => {
    store = mockStore(storeData);
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <UserHistory />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
  });

  it('should navigate to login page', () => {
    expect(navigate).toHaveBeenLastCalledWith('/login');
  });
});
