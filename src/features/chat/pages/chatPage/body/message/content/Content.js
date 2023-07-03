import TimeStamp from '../../../../../comp/TimeStamp';

function Content({ content, document, createdAt, seen }) {
  // let docClass;
  // if (!content) {
  //   if (attachedFiles?.length === 1 ) docClass = 'onlyDoc'
  // }
  // const docClass = `${
  //   attachedFiles?.length > 1
  //     ? 'multiDocs'
  //     : attachedFiles?.length === 1 && !content
  //     ? 'onlyDoc'
  //     : 'singleDoc'
  // }`;
  console.log('document', document);
  const docClass = '1';

  const textStyle = {
    wordBreak:
      content?.length >= 30 && !content.includes(' ') ? 'break-word' : 'normal',
  };

  // const text = content && (
  //   <div>
  //     <p className="content" style={textStyle}>
  //       {content}
  //     </p>
  //     <TimeStamp createdAt={createdAt} />
  //   </div>
  // );

  // const textWithImg = attachedFiles.length === 1 && (
  //   <>
  //     <div>
  //       <img
  //         key={new Date()}
  //         className="document"
  //         src={attachedFiles[0]}
  //         alt="x"
  //       />
  //     </div>
  //     {text}
  //   </>
  // );

  // const textWithImgs =
  //   attachedFiles.length >= 2 &&
  //   attachedFiles.map((doc) => (
  //     <div>
  //       <img key={doc} className="multiDocuments" src={doc.src} alt="x" />
  //       <TimeStamp createdAt={createdAt} />
  //     </div>
  //   ));

  return (
    <div className="messageContent">
      {document.src && (
        <div className="onlyDoc" key={new Date()}>
          <img src={document.src} alt={document.name} />
          <TimeStamp createdAt={createdAt} seen={seen} />
        </div>
      )}

      {content && (
        <div>
          <p className="content" style={textStyle}>
            {content}
          </p>
          <TimeStamp createdAt={createdAt} seen={seen} />
        </div>
      )}
    </div>
  );
}

export default Content;
