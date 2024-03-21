function Upload(imageProfile, ...rest) {
  return (
    <div className="flex flex-col gap-y-3 md:flex-row md:gap-x-3">
      <input
        type="file"
        {...rest}
        className="file:rounded-full file:bg-white file:border file:border-sky-200 file:text-primary file:text-sm file:font-bold"
      />
      {imageProfile && (
        <div className="md:w-40 md:h-40 w-20 h-20 rounded-full ring ring-sky-300 overflow-hidden flex justify-center items-center">
          <img src={imageProfile} />
        </div>
      )}
    </div>
  );
}

export default Upload;
