export const setSeenBy = (arr) => {
  const seenBy = arr.map((id) => ({ [id]: false }));
  return seenBy;
};

export const setDate = (createdAt) => {
  let date = '';
  const currentDate = new Date();
  const createdAtDate = new Date(createdAt);

  const diffInDays = (a, b) => {
    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / MS_PER_DAY);
  };

  const days = diffInDays(createdAtDate, currentDate);

  if (days === 0) date = 'Today';
  else if (days === 1) date = 'Yesterday';
  else if (days < 7) {
    date = createdAtDate
      .toLocaleString('en-us', { weekday: 'long' })
      .toUpperCase();
  } else {
    date = createdAtDate.toLocaleString('en-AU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
  return date;
};

export const setTime = (createdAt) => {
  const date = new Date(createdAt);
  const time = date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  return time;
};

export const setMessageClass = ({ content, attachedFiles }) => {
  let msgClass;
  const docs = attachedFiles?.length;

  if (!content && docs) {
    if (docs <= 1) msgClass = 'singleDoc';
    else if (docs >= 4) msgClass = 'multiDoc';
  } else if (content) {
    if (docs === 1) msgClass = 'singleDocWithText';
  }

  return msgClass;
};
export const handleDocuments = (result) => {
  let src;
  let type;

  if (result.includes('image') || result.includes('video')) {
    src = result;
    type = 'photo/video';
  } else if (
    result.includes('.csv') ||
    result.includes(
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) ||
    result.includes('.application/vnd.ms-excel') ||
    result.includes('excel')
  ) {
    src = process.env.PUBLIC_URL + '/assets/excel.svg';
    type = 'excel';
  } else if (
    result.includes(
      'application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) ||
    result.includes('word')
  ) {
    src = process.env.PUBLIC_URL + '/assets/word.svg';
    type = 'word';
  } else if (result.includes('pdf')) {
    src = process.env.PUBLIC_URL + '/assets/pdf.svg';
    type = 'pdf';
  } else {
    src = process.env.PUBLIC_URL + '/assets/random.svg';
    type = 'random';
  }

  return { src, type };
};
