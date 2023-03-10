import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CircularProgress from '@mui/material/CircularProgress';
import * as Sentry from '@sentry/react';

import React from 'react';

function CenterCircularProgress() {
  return (
    <Dialog open>
      <DialogContent>
        <div data-testid="circularProgress">
          <CircularProgress />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Sentry.withProfiler(CenterCircularProgress, {
  name: 'CircularProgress',
});
