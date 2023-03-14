import { CONTENT_API, SERVER_BASE_API } from '../constants/endpoints';
import { ANSWERSHEER_LABELS } from '../constants/exam';

const markPerQue = 1;
const negativeMarks = 1 / 3;

const getArrayFromCollection = (collection) =>
  Array.prototype.slice.call(collection);

const getQuestionDetails = (questionPanel, index) => {
  const rightAns =
    questionPanel.getElementsByClassName('rightAns')[0].innerText;

  const statusTable = questionPanel.getElementsByClassName('menu-tbl')[0];
  let questionStatus = '';
  let chosenOption = '';
  const statusRows = getArrayFromCollection(
    statusTable.getElementsByTagName('tr')
  );

  statusRows.forEach((status) => {
    const statusInnerText = status.innerText;
    let [label, value] = statusInnerText.split(':');
    label = label.trim();
    value = value.trim();
    if (label === 'Chosen Option') {
      chosenOption = value;
    }
    if (label === 'Status') {
      questionStatus = value;
    }
  });
  if (questionStatus === 'Answered') {
    if (rightAns.includes(chosenOption)) {
      questionStatus = 'Correct';
    } else {
      questionStatus = 'Incorrect';
    }
  }

  return {
    questionNo: index + 1,
    rightAnswer: rightAns,
    status: questionStatus,
    chosenOption,
  };
};

const getSectionDetails = (section) => {
  const sectionTitle =
    section.getElementsByClassName('section-lbl')[0].innerText;
  const questionsArray = getArrayFromCollection(
    section.getElementsByClassName('questionPnlTbl')
  );

  const sectionPerformance = questionsArray.map((questionPanel, i) =>
    getQuestionDetails(questionPanel, i)
  );

  const correctCount = sectionPerformance.filter(
    (que) => que.status === 'Correct'
  ).length;
  const incorrectCount = sectionPerformance.filter(
    (que) => que.status === 'Incorrect'
  ).length;
  const unAnsweredCount = sectionPerformance.filter(
    (que) =>
      que.status === 'Not Answered' ||
      que.status === 'Not Attempted and Marked For Review'
  ).length;

  const sectionMarks =
    correctCount * markPerQue - incorrectCount * negativeMarks;

  return {
    sectionTitle,
    questions: sectionPerformance,
    correctCount,
    incorrectCount,
    unAnsweredCount,
    sectionMarks,
  };
};
const getValue = (label, values) =>
  values?.find((v) => v.label === label)?.value;
export const getPrimaryDetails = (doc) => {
  const primaryDetails = doc.getElementsByClassName('main-info-pnl')[0];
  const primaryDetailsRows = primaryDetails.getElementsByTagName('tr');
  const primaryRows = getArrayFromCollection(primaryDetailsRows);
  const details = primaryRows.map((row) => {
    const cells = row.getElementsByTagName('td');
    return { label: cells[0].innerText, value: cells[1].innerText };
  });
  const { ROLL_NO, NAME, CENTER, DATE, TIME, SUB } = ANSWERSHEER_LABELS;
  const primaryObj = {
    rollNumber: getValue(ROLL_NO, details),
    name: getValue(NAME, details),
    center: getValue(CENTER, details),
    date: getValue(DATE, details),
    time: getValue(TIME, details),
    subject: getValue(SUB, details),
  };
  return primaryObj;
};

export const getExamDetailsFromHtml = async (reqUrl) => {
  const response = await fetch(
    `${SERVER_BASE_API}${CONTENT_API.GET_CONTENT}${reqUrl}`
  );

  if (!response.ok) {
    throw new Error('Invalid Url');
  }
  const text = await response.text();
  const parsedHtml = new DOMParser();
  const doc = parsedHtml.parseFromString(text, 'text/html');
  if (doc.getElementsByClassName('main-info-pnl').length === 0) {
    throw new Error('Invalid Url');
  }
  const primaryDetails = getPrimaryDetails(doc);
  const sections = getArrayFromCollection(
    doc.getElementsByClassName('section-cntnr')
  );
  const sectionDetails = sections.map((section) => {
    return getSectionDetails(section);
  });

  return {
    primaryDetails,
    sectionDetails,
  };
};
