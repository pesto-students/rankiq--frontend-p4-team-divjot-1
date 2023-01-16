import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import theme from '../../theme/theme';
import Rank from '../Rank';

const mockStore = configureStore([thunk]);
describe('Rank.jsx - data is present ', () => {
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
            <Rank rollNumber="1234" />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
  });

  it('should render without any errors', () => {
    const { asFragment } = tree;
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Rank.jsx - data is loading ', () => {
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
      loading: true,
      error: null,
      data: {},
    },
  };
  beforeEach(() => {
    store = mockStore(storeData);
    tree = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Rank rollNumber="1234" />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
  });

  it('should render without any errors', () => {
    const { asFragment } = tree;
    expect(asFragment()).toMatchSnapshot();
  });

  it('should show loader', () => {
    expect(screen.getByTestId('rankProgress')).toBeInTheDocument();
  });
});

describe('Rank.jsx - Error fetching fata ', () => {
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
      error: 'Rank Error',
      data: {},
    },
  };
  beforeEach(() => {
    store = mockStore(storeData);
    tree = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Rank rollNumber="1234" />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
  });

  it('should render without any errors', () => {
    const { asFragment } = tree;
    expect(asFragment()).toMatchSnapshot();
  });

  it('should show loader', () => {
    expect(screen.getByText('Rank Error')).toBeInTheDocument();
  });
});
