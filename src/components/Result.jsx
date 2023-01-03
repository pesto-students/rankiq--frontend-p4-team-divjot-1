import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isExamInfoPresentSelector } from '../selectors';

function Result() {
  const navigate = useNavigate();
  const isExamInfoPresent = useSelector(isExamInfoPresentSelector);
  useEffect(() => {
    if (!isExamInfoPresent) {
      navigate('/dashboard');
    }
  }, [navigate, isExamInfoPresent]);
  return <div>Result Page</div>;
}

export default Result;
