function Button(name, ...props) {
  return (
    <div className="md:py-5 ">
      <button
        {...props}
        className="rounded-full py-2 w-full text-center bg-white outline-none hover:ring hover:ring-sky-200 text-primary text-base font-bold"
      >
        {name}
      </button>
    </div>
  );
}

export default Button;
