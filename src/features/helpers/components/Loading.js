function Loading() {
  return (
    <img
      className="loading"
      src={process.env.PUBLIC_URL + '/assets/loading.svg'}
      alt="loading"
    />
  );
}

export default Loading;
